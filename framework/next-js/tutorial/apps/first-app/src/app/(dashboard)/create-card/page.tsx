import { revalidatePath } from "next/cache";
import CreateCardForm from "./_component/CreateCardForm";

interface IInitialState {
  isError: boolean;
  message: string;
}

function CreateCard() {
  // CREATE CARD FUNCTION
  const handleSubmit = async (
    initialState: IInitialState,
    formData: FormData,
  ): Promise<IInitialState> => {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      const cardCreationResponse = await fetch(
        "http://localhost:3000/api/card",
        {
          method: "POST",
          body: JSON.stringify({ title, description }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!cardCreationResponse.ok) {
        const errorData = await cardCreationResponse.json();
        return {
          isError: true,
          message: errorData.message || "Failed to create card.",
        };
      }

      revalidatePath("/cards");

      return {
        isError: false,
        message: "Card created successfully!",
      };
    } catch (err) {
      return {
        isError: true,
        message:
          err instanceof Error ? err.message : "An unknown error occurred.",
      };
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold ">Create Card</h1>
      <div className="bg-slate-900 border rounded-lg mt-2 px-4 py-1.5 border-slate-700 size-full shadow-xl shadow-slate-900/30 has-focus:border-slate-600">
        <CreateCardForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default CreateCard;
