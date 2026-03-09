const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_SUBMIT_MS = 3000;

const requestLog = new Map<string, number[]>();

type ContactPayload = {
  name?: string;
  email?: string;
  storeName?: string;
  message?: string;
  captchaToken?: string;
  companyWebsite?: string;
  startedAt?: number;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const trimString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const getIp = (req: any) => {
  const header = req.headers["x-forwarded-for"];
  if (Array.isArray(header)) {
    return header[0]?.split(",")[0]?.trim() ?? "unknown";
  }
  if (typeof header === "string") {
    return header.split(",")[0]?.trim() ?? "unknown";
  }
  return req.socket?.remoteAddress ?? "unknown";
};

const isRateLimited = (ip: string, now: number) => {
  const entries = requestLog.get(ip) ?? [];
  const recent = entries.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
};

const verifyTurnstile = async (token: string, remoteIp: string, secret: string) => {
  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error("Captcha verification failed.");
  }

  const data = (await response.json()) as { success?: boolean };
  if (!data.success) {
    throw new Error("Captcha check was not successful.");
  }
};

const forwardMessage = async (payload: {
  name: string;
  email: string;
  storeName: string;
  message: string;
}) => {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Could not submit contact form.");
    }
    return;
  }

  if (!recipient) {
    throw new Error("Missing contact recipient email configuration.");
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      _subject: "RE: WishlistSuite : Contact Us",
    }),
  });

  if (!response.ok) {
    throw new Error("Could not deliver message by email.");
  }
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const ip = getIp(req);
    const now = Date.now();

    if (isRateLimited(ip, now)) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as ContactPayload;

    const name = trimString(body.name);
    const email = trimString(body.email);
    const storeName = trimString(body.storeName);
    const message = trimString(body.message);
    const captchaToken = trimString(body.captchaToken);
    const companyWebsite = trimString(body.companyWebsite);
    const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

    if (companyWebsite) {
      return res.status(200).json({ ok: true });
    }

    if (now - startedAt < MIN_SUBMIT_MS) {
      return res.status(400).json({ error: "Form was submitted too quickly." });
    }

    if (!name || !email || !storeName || !message) {
      return res.status(400).json({ error: "Please complete all required fields." });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!captchaToken) {
        return res.status(400).json({ error: "Captcha token is missing." });
      }

      await verifyTurnstile(captchaToken, ip, turnstileSecret);
    }
    await forwardMessage({ name, email, storeName, message });

    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Submission failed.";
    return res.status(500).json({ error: message });
  }
}
