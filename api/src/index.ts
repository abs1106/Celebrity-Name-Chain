import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

// Health check — confirms the server is running.
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// TODO: implement the game routes (see the project spec):
//   POST /games          { roomCode, celebrity }          -> start a game
app.post("/games", async (req, res) => {
  try {
    const roomCode = Math.floor(Math.random() * 10000); //generates a room code
    const celeb_zero = "Mike Tyson"; //starting celeb

    const game = await prisma.game.create({ //adds data to the db
      data: {
        room_code: roomCode.toString(), //with db varibale names
        current_celebrity: celeb_zero,
      },
    });
    return res.json(game); //returns the room code and starting celebrity to user

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create a game.",
    });
  }
});

//   GET  /games/:roomCode                                 -> most recent celebrity name
app.get(`games/:roomCode`, async (req, res) => {
 try{ 
  const roomCode = req.params.roomCode; //gets the room code from the url
  const game = await prisma.game.findUnique({ //finds the game in the db
    where: {
      room_code: roomCode.toString(), //with the room code
    

    },
  });
  const userCeleb = 


}


});



//   POST /answers        { roomCode, username, answer }   -> submit an answer
//
// To talk to the database, run `yarn prisma:migrate` first (generates the
// client into src/generated/prisma), then wire it up with the pg adapter.
// See this API's README ("Using Prisma in code") for the exact db.ts snippet.

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
