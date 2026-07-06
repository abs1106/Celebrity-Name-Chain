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

interface Celebrity {
  roomCode: string;
  celebrity: string;
}

const Game: React.FC = () => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    console.log(answer);
    setAnswer("");
  };
  const mutation = useMutation({
    onSuccess: (data) => {
      console.log('Answer sent successfully!', data);
    },
    onError: (error) => {
      console.error('Error sending Answer:', error);
    }
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