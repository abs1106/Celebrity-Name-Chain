import {
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonInput,
} from "@ionic/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const API_URL =
  import.meta.env.VITE_API_URL ?? "https://football-calamity-sensuous.ngrok-free.dev";

const Game: React.FC = () => {
  const [answer, setAnswer] = useState("");

  const roomCode = "123"; 
  const username = "ABC"; 

  const mutation = useMutation({
    mutationFn: async (answer: string) => {
      const response = await fetch(`${API_URL}/games/${roomCode}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          answer: answer,
        }),
      });

      if (!response.ok) {
        throw new Error("Answer not allowed");
      }

      return response.json();
    },

    onSuccess: (data) => {
      console.log("Answer sent successfully!", data);
    },

    onError: (error) => {
      console.error("Not able to send answer:", error);
    },
  });

  const handleSubmit = () => {
    mutation.mutate(answer);
    setAnswer("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is the game</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonInput
        value={answer}
        placeholder="Enter an answer"
        onIonInput={(e) => setAnswer(e.detail.value ?? "")}
      />

      <IonButton
        expand="block"
        onClick={handleSubmit}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Sending..." : "Play Game"}
      </IonButton>
    </IonPage>
  );
};

export default Game;