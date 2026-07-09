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
app.get("/health", (req, res) => {
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

    console.error(error);
    
    return res.status(500).json({
      message: "Failed to create a game.",
    });
  }
});

//   GET  /games/:roomCode/updatedAns -> most recent celebrity name
app.get("/games/:roomCode/updatedAns", async (req, res) => {
  const roomCode = req.params.roomCode; //gets the room code from the url
  
  const game = await prisma.game.findFirst({ //finds the game in the db
    where:{
      room_code: roomCode}, //with the room code
  });

  if (!game) { //if the game doesn't exist
    return res.status(404).json({ //return a 404 error
      message: "Game not found.",
    });
  }

  return res.json({ //returns the current celebrity name to the user
    current_celebrity: game.current_celebrity ,
  });

});

// POST /games/:roomCode/answers
// Player submits their username and celebrity answer.
app.post("/games/:roomCode/answers", async (req, res) => {
  try {

    // ==========================
    // Retrieve user input
    // ==========================
    const roomCode = req.params.roomCode;
    const username = req.body.username;
    const answer = req.body.answer;

    // ==========================
    // Validate required input
    // Make sure the user actually
    // provided a username and answer.
    // ==========================
    if (!username || !answer) {
      return res.status(400).json({
        message: "Username and answer are required.",
      });
    }

    // ==========================
    // Look up the game using the
    // room code supplied in the URL.
    // ==========================
    const game = await prisma.game.findFirst({
      where: {
        room_code: roomCode,
      },
    });

    // ==========================
    // Verify the game exists
    // ==========================
    if (!game) {
      return res.status(404).json({
        message: "Game not found.",
      });
    }

    // ==========================
    // Validate the celebrity chain.
    // The player's answer must begin
    // with the first letter of the
    // previous celebrity's last name.
    // ==========================
    const currentCelebrity = game.current_celebrity;
    const names = currentCelebrity.split(" ");
    const lastName = names[names.length - 1]; // Get the last name of the current celebrity. Some names might have 3 words
    const requiredLetter = lastName[0];
    const answerFirstLetter = answer[0];

    if(answerFirstLetter.toLowerCase() !== requiredLetter.toLowerCase()){
      return res.status(400).json({
        message: `Answer must start with "${requiredLetter}".`,
      });
    }


    // ==========================
    // Save the player's answer
    // into the answers table.
    // ==========================
    const newAnswer = await prisma.answers.create({
      data: {
        userName: username,
        celebrity_name: answer,
        game_id: game.id,
      },
    });

    // ==========================
    // Update the game's current
    // celebrity so the next player
    // continues the chain.
    // ==========================
    const updatedGame = await prisma.game.update({
      where: {
        id: game.id,
      },
      data: {
        current_celebrity: answer,
      },
    });

    // ==========================
    // Return the newly created
    // answer and updated game state
    // back to the frontend.
    // ==========================
    return res.json({
      answer: newAnswer,
      game: updatedGame,
    });

  } catch (error) {
    // ==========================
    // Handle unexpected server or
    // database errors.
    // ==========================
    return res.status(500).json({
      message: "Failed to submit answer.",
    });
  }
});

//
// To talk to the database, run `yarn prisma:migrate` first (generates the
// client into src/generated/prisma), then wire it up with the pg adapter.
// See this API's README ("Using Prisma in code") for the exact db.ts snippet.

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
