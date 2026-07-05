import {
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonInput,
} from "@ionic/react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

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

      <IonButton expand="block" onClick={handleSubmit}>
        Play Game
      </IonButton>
    </IonPage>
  );
};

export default Game;