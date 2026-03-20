import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

interface ICardDetails {
  id: number;
  title: string;
  description: string;
}

export async function PUT(
  request: Request,
  context: RouteContext<"/api/card/[cardId]">,
) {
  try {
    const { cardId } = await context.params;

    if (!cardId) {
      return new Response(
        JSON.stringify({
          message: "Card ID is required",
        }),
        {
          status: 400,
        },
      );
    }

    const parsedCardId = Number(cardId);

    if (!Number.isInteger(parsedCardId) || parsedCardId <= 0) {
      return new Response(
        JSON.stringify({
          message: "Card ID must be a valid positive number",
        }),
        {
          status: 400,
        },
      );
    }

    let reqBody: { title?: string; description?: string };

    try {
      reqBody = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          message: "Invalid JSON body",
        }),
        {
          status: 400,
        },
      );
    }

    const title = reqBody?.title?.trim() ?? "";
    const description = reqBody?.description?.trim() ?? "";

    if (!title && !description) {
      return new Response(
        JSON.stringify({
          message: "Title or description is required",
        }),
        {
          status: 400,
        },
      );
    }

    const cardFile = await readFile(
      path.join(process.cwd(), "card.json"),
      "utf-8",
    );
    const cards: ICardDetails[] =
      cardFile.trim().length > 0 ? JSON.parse(cardFile) : [];

    const cardToUpdate = cards.find(({ id }) => id === parsedCardId);

    if (!cardToUpdate) {
      return new Response(
        JSON.stringify({
          message: "Card with the specified ID does not exist",
        }),
        {
          status: 404,
        },
      );
    }

    const updatedCards = cards.map((card) => {
      if (card.id === parsedCardId) {
        return {
          ...card,
          title: title || card.title,
          description: description || card.description,
        };
      }

      return card;
    });

    await writeFile(
      path.join(process.cwd(), "card.json"),
      JSON.stringify(updatedCards, null, 2),
    );

    // REVALIDATING PATH
    revalidatePath("/cards");

    return new Response(
      JSON.stringify({
        message: "Card updated successfully",
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message:
          err instanceof Error
            ? err.message
            : "An unknown error occurred during updating card",
      }),
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  _: Request,
  context: RouteContext<"/api/card/[cardId]">,
) {
  try {
    const { cardId } = await context.params;

    if (!cardId) {
      return new Response(
        JSON.stringify({
          message: "Card ID is required",
        }),
        {
          status: 400,
        },
      );
    }

    const parsedCardId = Number.parseInt(cardId);

    const readCardFile = await readFile(
      path.join(process.cwd(), "card.json"),
      "utf-8",
    );

    const cardData: ICardDetails[] =
      readCardFile.trim().length > 0 ? JSON.parse(readCardFile) : [];

    if (
      cardData.length === 0 ||
      !cardData.some(({ id }) => id === parsedCardId)
    ) {
      return new Response(
        JSON.stringify({
          message: "Card with the specified ID does not exist",
        }),
        {
          status: 404,
        },
      );
    }

    const removedCardData = cardData.filter(({ id }) => id !== parsedCardId);

    await writeFile(
      path.join(process.cwd(), "card.json"),
      JSON.stringify(removedCardData),
    );

    // REVALIDATE PATH
    revalidatePath("/cards");

    return new Response(
      JSON.stringify({
        message: "Card removed successfully",
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message:
          err instanceof Error
            ? err.message
            : "An unknown error occurred during deleting card",
      }),
      {
        status: 500,
      },
    );
  }
}
