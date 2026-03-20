import { readFile, writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  const cardFilePath = path.join(process.cwd(), "card.json");

  try {
    const cardDetails = await readFile(cardFilePath, "utf-8");
    const cardJSON =
      cardDetails.trim().length > 0 ? JSON.parse(cardDetails) : [];
    return new Response(JSON.stringify(cardJSON), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Error reading card data",
        error: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function POST(request: Request) {
  let body: { title?: string; description?: string };

  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        message: "Invalid or empty JSON body",
      }),
      { status: 400 },
    );
  }

  const title = body?.title?.trim() ?? "";
  const description = body?.description?.trim() ?? "";

  if (!title || !description)
    return new Response(
      JSON.stringify({
        message: "Title, description is required",
      }),
      {
        status: 400,
      },
    );

  const cardFilePath = path.join(process.cwd(), "card.json");

  let cardJSON: Array<{ id: number; title: string; description: string }> = [];

  try {
    const cardDetails = await readFile(cardFilePath, "utf-8");
    cardJSON = cardDetails.trim().length > 0 ? JSON.parse(cardDetails) : [];
  } catch {
    // If the file does not exist yet or has invalid content, start from an empty list.
    cardJSON = [];
  }

  // APPENDING THE CURRENT DETAILS
  cardJSON.push({
    id: cardJSON.length + 1,
    title,
    description,
  });

  await writeFile(cardFilePath, JSON.stringify(cardJSON, null, 2), "utf-8");

  return new Response(
    JSON.stringify({
      message: "Card created successfully",
    }),
    {
      status: 201,
    },
  );
}
