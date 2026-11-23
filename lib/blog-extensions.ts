import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

// Shared by the editor (client) and HTML rendering (server) so both agree on
// the document schema.
export const blogExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    link: {
      openOnClick: false,
      autolink: true,
      protocols: ["http", "https", "mailto", "tel"],
      HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
    },
  }),
  Image.configure({ HTMLAttributes: { loading: "lazy" } }),
];
