import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

type Props = {
  text: Document;
};

export const CommunityText = ({ text }: Props) => {
  const options: Options = {
    renderNode: {
      paragraph: (_, children) => {
        return <p className="mb-4">{children}</p>;
      },
      "heading-1": (_, children) => {
        return <h1 className="text-2xl">{children}</h1>;
      },
      "heading-2": (_, children) => {
        return <h2 className="text-xl">{children}</h2>;
      },
      hyperlink: (node, children) => {
        return (
          <a
            className="underline"
            href={node.data.uri}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
    },
  };
  return (
    <div className="mb-8 text-slate-600">
      {text && documentToReactComponents(text, options)}
    </div>
  );
};
