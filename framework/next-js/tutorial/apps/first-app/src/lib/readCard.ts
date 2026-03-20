import "server-only";
import { readFile } from "fs/promises";
import path from "path";

export interface CardRecord {
  id: number;
  title: string;
  description: string;
}

export async function getCards(): Promise<CardRecord[]> {
  const cardFilePath = path.join(process.cwd(), "card.json");

  try {
    const fileData = await readFile(cardFilePath, "utf-8");
    const parsedData = fileData.trim().length > 0 ? JSON.parse(fileData) : [];

    if (!Array.isArray(parsedData)) return [];

    return parsedData.filter((card): card is CardRecord => {
      return (
        typeof card === "object" &&
        card !== null &&
        typeof card.id === "number" &&
        typeof card.title === "string" &&
        typeof card.description === "string"
      );
    });
  } catch {
    return [];
  }
}
