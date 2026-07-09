import {
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonInput,
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL ?? "https://football-calamity-sensuous.ngrok-free.dev";

interface Celebrity {
  roomCode: string;
  celebrity: string;
}


const Game = () => {
  const { roomCode } = useParams < { roomCode: string }> (); 
  const [ answer, setAnswer ] = useState("")
  const [ message, setMessage ] = useState("")

const{data} = useQuery <Celebrity>({
  queryKey:[roomCode]
  queryFn: () => {
    const response = await fetch(`${API_URL}/games/${roomCode}`);
          if (!response.ok) {
        throw new Error("This answer is not allowed");

          }},
      return response.json()
        });


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
        
          return response.json()
        }),
          
      });
      if (!response.ok) {
        throw new Error("Not Here");}
         return response.json()


    },

    onSuccess: () => {
      setMessage("Finished!");
      setAnswer("");
    },

    onError: () => {
      setMessage("Answer is unable to go out:");
    },
  });

  const handleSubmit = () => {
    if (!answer.trim()) {
      setMessage("Enter an answer.");
      return;
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is the game</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonInput
        value={answer}
        placeholder="Name any celebrity in the world"
        onIonInput={(e) => setAnswer(e.detail.value ?? "")}
      />

      <IonButton
        expand="block"
        onClick={handleSubmit}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Sending have patients" : "Play Game"}
      </IonButton>
              {message && (
          <IonText color="primary">
            <p>{message}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Game;

