import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body: string;
    content?: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text py-6 bg-white text-gray-900">
      <Markdown
        children={data.content || data.body}
        remarkPlugins={[remarkGfm]}
      />
    </section>
  );
}
