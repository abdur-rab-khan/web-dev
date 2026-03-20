"use client";

import { useState, MouseEvent } from "react";
import UpdateCardForm from "./UpdateCard";

interface ICard {
  id: string;
  title: string;
  description: string;
}

function Card({ id, title, description }: ICard) {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const handleCloseUpdateCardDialog = (e: MouseEvent<HTMLButtonElement>) => {
    setIsUpdateFormOpen(false);
  };

  const deleteCard = async () => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:3000/api/card/${id}`,
        {
          method: "DELETE",
        },
      );
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="h-fit relative w-full shrink-0 rounded border border-slate-800 bg-slate-900 p-4 md:w-72">
      <div className="absolute top-0 right-0 px-2 py-1.5 flex justify-between items-center w-full">
        <button className="cursor-pointer text-lg" onClick={deleteCard}>
          🗑️
        </button>
        <button
          className="cursor-pointer text-lg"
          onClick={() => setIsUpdateFormOpen((prev) => !prev)}
        >
          ✏️
        </button>
      </div>

      <div className="mt-6">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {isUpdateFormOpen && (
        <section
          className="size-full top-0 right-0 flex justify-center items-center bg-black/50 fixed"
          onClick={handleCloseUpdateCardDialog}
        >
          <UpdateCardForm
            id={id}
            title={title}
            description={description}
            onClose={handleCloseUpdateCardDialog}
          />
        </section>
      )}
    </div>
  );
}

export default Card;
