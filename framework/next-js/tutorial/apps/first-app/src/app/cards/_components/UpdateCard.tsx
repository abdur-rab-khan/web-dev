import React, { MouseEvent, useState } from "react";

interface IUpdateCardForm {
  id: string;
  title: string;
  description: string;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
}

function UpdateCardForm({ id, title, description, onClose }: IUpdateCardForm) {
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      await fetch(`/api/card/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
        }),
      });

      alert("Card updated successfully!");
      onClose(e as unknown as MouseEvent<HTMLButtonElement>);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div
      className="bg-slate-900 border size-fit rounded-lg mt-2 px-4 py-1.5 border-slate-700 min-w-120  shadow-xl shadow-slate-900/30 has-focus:border-slate-600 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="cursor-pointer text-sm absolute right-2 top-2"
        onClick={onClose}
      >
        ❌
      </button>
      <form onSubmit={handleSubmit} className="mt-4 text-white">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="mt-1 block w-full px-2 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-800"
            required
          />
          <label
            htmlFor="description"
            className="block text-sm font-medium mt-4"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="mt-1 block w-full px-2 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-800"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full text-center py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Card
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCardForm;
