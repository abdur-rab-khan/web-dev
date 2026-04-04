import React from "react";
import Card from "./_components/Card";
import { getCards } from "@/src/lib/readCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Cards",
  description: "A list of cards fetched from the API.",
  keywords: ["cards", "API", "list", "Next.js"],
  icons: "/window.svg",
  pagination: {
    next: "/cards/page/2",
    previous: "/cards/page/1",
  },
};

async function CardsPage() {
  const cards = await getCards();

  return (
    <React.Fragment>
      {!Array.isArray(cards) || cards?.length === 0 ? (
        <p>No cards available.</p>
      ) : (
        cards.map((card, index) => (
          <Card
            key={index}
            id={String(card.id)}
            title={card.title}
            description={card.description}
          />
        ))
      )}
    </React.Fragment>
  );
}

export default CardsPage;
