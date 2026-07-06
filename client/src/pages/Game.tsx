import {
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonInput,
} from "@ionic/react";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';


const API_URL = import.meta.env.VITE_API_URL ?? "https://football-calamity-sensuous.ngrok-free.dev";


// const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface Celebrity {
  roomCode: string;
  celebrity: string;
}

const Game: React.FC = () => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    // console.log(answer);
  mutation.mutate(answer);
    setAnswer("");
  };
  const mutation = useMutation({
    mutationFn: async (answer: string) => {
    const response = await fetch(`${API_URL}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomCode: "my roomCode",
        answer: answer,
      }),
    });

    if (!response.ok) {
      throw new Error("Answer not allowed");
    }

    return response.json();
  },

  onSuccess: (data) => {
    console.log("Answer is successfully!", data);
  },

  onError: (error) => {
    console.error("NOt able to send Answer:", error);
  },
});



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

      <IonButton expand="block" onClick={handleSubmit}
        disabled={mutation.isPending}>
        Play Game
        {mutation.isPending ? 'Sending...' : 'Sent'}
      </IonButton>
    </IonPage>
  );
};

export default Game;



