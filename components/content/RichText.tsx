import sanitizeHtml from "sanitize-html";

/**
 * An article or guide body written in the admin's rich-text editor.
 *
 * The API stores it already sanitised (backend `core/html.py`); it is cleaned
 * again here against the same allow-list, so a body that reached the database
 * some other way still cannot run script on the public site. This is the one
 * place the site renders HTML it did not write itself.
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "hr", "h2", "h3", "h4",
    "strong", "b", "em", "i", "u", "s", "sub", "sup", "mark", "code", "pre",
    "a", "ul", "ol", "li", "blockquote",
    "figure", "figcaption", "img",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
    "span",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "width", "height", "title"],
    figure: ["class", "style"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan", "scope"],
    ol: ["start", "reversed"],
    p: ["class"],
    span: ["class"],
    pre: ["class"],
    code: ["class"],
  },
  allowedClasses: {
    figure: ["image", "image_resized", "image-style-*", "table"],
    p: ["text-*"],
    span: ["text-*"],
    pre: ["language-*"],
    code: ["language-*"],
  },
  allowedStyles: { figure: { width: [/^\d{1,4}(\.\d+)?(%|px)$/] } },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

export function RichText({ html, className = "" }: { html: string; className?: string }) {
  return (
    <div
      className={`rich-text ${className}`}
      // Sanitised above against an allow-list; see the component comment.
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html, OPTIONS) }}
    />
  );
}
