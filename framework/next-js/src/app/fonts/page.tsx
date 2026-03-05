import React from "react";
import { Lavishly_Yours, Fira_Sans } from "next/font/google";

const lavishlyYours = Lavishly_Yours({
  subsets: ["latin"],
  weight: ["400"],
});

const firaSans = Fira_Sans({
  subsets: ["latin"], // Always specify the subsets you need to optimize font loading
  weight: ["400", "800"], // It's important to specify when we are using that font with different weights
  style: "normal", // Could be "normal" or "italic", depending on the styles you want to use
  display: "swap",
});

function FontsPage() {
  return (
    <div className="size-screen p-2">
      <h1 className={`${lavishlyYours.className} text-6xl`}>
        Lavishly Yours Font
      </h1>
      <p className={`${firaSans.className} text-lg mt-4 font-extrabold`}>
        This is an example of using the Fira Sans font from Google Fonts in a
        Next.js application. The font is applied to this paragraph,
        demonstrating how to use custom fonts in your project.
      </p>
    </div>
  );
}

export default FontsPage;
