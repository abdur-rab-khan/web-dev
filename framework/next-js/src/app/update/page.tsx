import React from "react";
import LikeButton from "./_components/LikeButton";
import { redirect } from "next/navigation";

const handleUpdateName = (name: string): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("Name updated to:", name);
      // After updating the name, we can redirect the user to another page, for example, we can redirect to the home page after updating the name.
      resolve();
    }, 2000);
  });

function UpdatePage() {
  // Server action function:
  const updateName = async (formData: FormData): Promise<void> => {
    // "use server" directive is used to indicate that this function is a server action, it can only be called from the client component and it will run on the server.
    "use server";

    const name = formData.get("name") as string;

    await handleUpdateName(name);

    // We could use any such operations like "revalidatePath", "revalidateTag", "cookies", "headers", etc. after performing the server-side logic, but here we will just redirect the user to another page after updating the name.
    redirect("/posts/client");
  };

  const updateLikeCount = async (postId: number): Promise<void> => {
    "use server";
    // Here we can perform any server-side logic, like updating the like count in the database, or calling an external API to update the like count, etc.

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Like count updated for post with ID:", postId);

        const randomNumber = Math.random();

        if (randomNumber < 0.5) {
          reject(new Error("Failed to update like count"));
        } else {
          resolve();
        }
      }, 2000);
    });
  };

  return (
    <div className="p-2 h-screen flex items-center justify-center flex-row ">
      <form>
        <input type="hidden" name="name" value="abdurrabkhan" />
        <button
          type="submit"
          formAction={updateName}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Update Name
        </button>
      </form>
      <div className="ml-4">
        <LikeButton postId={1} toggleLikeCount={updateLikeCount} />
      </div>
    </div>
  );
}

export default UpdatePage;
