import { Metadata } from "next";

// This is the example of "static metadata", but we can dynamically generate metadata as well.
export const metadata: Metadata = {
  title: "Meta Page", // This is the title of the page
  description: "This is the meta page", // This is the description of the page
  keywords: ["meta", "page", "nextjs"], // These are the keywords for the page
  openGraph: {
    type: "website",
    title: "Meta Page", // This is the Open Graph title
    description: "This is the meta page", // This is the Open Graph description
    url: "https://example.com/meta", // This is the Open Graph URL
  },
};

function MetaPage() {
  return <div>Hello world</div>;
}

export default MetaPage;
