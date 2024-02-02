import express, { Request, Response } from "express";
import Bard from "bard-ai";

const app = express();
const port = 8787;

const myBard = new Bard("fQiz8c29m2hU32ilXhIUe2tD62ZVFysZe2nIzBNV7IH2vDP36Yn0uKrfb57QRNbyIDAjdQ.");

app.get("/ask", async (req: Request, res: Response) => {
  const question: string = req.query.question as string;

  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    // Use Bard.JSON format for structured JSON response
    const answer = await myBard.ask(question, { format: Bard.JSON });

    // Access the structured JSON properties, including images
    const { content, images, ids } = answer;

    res.json({ content, images, ids });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing the question." });
  }
});

app.listen(port||process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
