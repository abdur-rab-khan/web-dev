import Form from "./_ui/form";

const simulatingPromise = (): Promise<{ error?: string; message?: string }> =>
  new Promise((resolve) => {
    const randomNumber = Math.random();
    setTimeout(() => {
      if (randomNumber < 0.5) {
        resolve({ message: "Success" });
      } else {
        resolve({ error: "Something went wrong" });
      }
    }, 1000);
  });

async function ErrorPage() {
  const response = await simulatingPromise();

  if (response.error) {
    throw new Error(response.error);
  }

  const createPost = async (state: { message: string }, formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate a random success or error response
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      return { message: "Post created successfully!" };
    } else {
      throw new Error("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="size-screen p-1">
      <h1 className="text-2xl">Error Page</h1>
      <Form onSubmit={createPost} />
    </div>
  );
}

export default ErrorPage;
