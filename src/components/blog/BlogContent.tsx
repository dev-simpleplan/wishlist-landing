import { Fragment } from "react";
import { getStrapiAssetUrl } from "@/lib/strapi";
import type { BlogBlock } from "@/types/blog";

type BlogContentProps = {
  content: string | BlogBlock[];
};

const getChildText = (children?: BlogBlock[]) =>
  (children ?? [])
    .map((child) => child.text ?? getChildText(child.children))
    .filter(Boolean)
    .join("");

const renderBlock = (block: BlogBlock, index: number) => {
  const text = block.text ?? getChildText(block.children);

  switch (block.type) {
    case "heading": {
      const Tag = block.level === 3 ? "h3" : block.level === 4 ? "h4" : "h2";
      return (
        <Tag key={index} className="mt-10 text-2xl font-bold leading-tight text-foreground first:mt-0">
          {text}
        </Tag>
      );
    }
    case "list":
      if (block.format === "ordered") {
        return (
          <ol key={index} className="list-decimal space-y-3 pl-6 text-lg leading-8 text-muted-foreground">
            {(block.children ?? []).map((item, itemIndex) => (
              <li key={itemIndex}>{getChildText(item.children) || item.text}</li>
            ))}
          </ol>
        );
      }

      return (
        <ul key={index} className="list-disc space-y-3 pl-6 text-lg leading-8 text-muted-foreground">
          {(block.children ?? []).map((item, itemIndex) => (
            <li key={itemIndex}>{getChildText(item.children) || item.text}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-secondary pl-6 text-xl italic leading-8 text-foreground">
          {text}
        </blockquote>
      );
    case "image":
      return block.image ? (
        <figure key={index} className="space-y-3">
          <img
            src={getStrapiAssetUrl(block.image)}
            alt={block.image.alternativeText ?? ""}
            className="w-full rounded-3xl border border-border/70"
          />
          {block.image.alternativeText ? (
            <figcaption className="text-sm text-muted-foreground">{block.image.alternativeText}</figcaption>
          ) : null}
        </figure>
      ) : null;
    case "paragraph":
    case "text":
    default:
      return (
        <p key={index} className="text-lg leading-8 text-muted-foreground">
          {text}
        </p>
      );
  }
};

const BlogContent = ({ content }: BlogContentProps) => {
  if (typeof content === "string") {
    return (
      <div className="space-y-6">
        {content.split("\n").filter(Boolean).map((paragraph, index) => (
          <p key={index} className="text-lg leading-8 text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return <div className="space-y-6">{content.map((block, index) => <Fragment key={index}>{renderBlock(block, index)}</Fragment>)}</div>;
};

export default BlogContent;
