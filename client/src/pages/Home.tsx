// this is a debug comment
// this is a debug comment

import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Controller, useForm } from "react-hook-form";

type CreateGameForm = {
  roomCode: string;
  celebrity: string;
};

const Home: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<CreateGameForm>({
    defaultValues: {
      roomCode: "",
      celebrity: "",
    },
  });

  const onSubmit = async (data: CreateGameForm) => {
    try {
      const response = await fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to create game.");
        return;
      }

      console.log("Game Created:", result);
      alert("Game created successfully!");

      // Later you can navigate to Game.tsx
      // history.push("/game");

      reset();
    } catch (error) {
      console.error(error);
      alert("Server connection failed.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Celebrity Name Chain</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Create New Game</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="roomCode"
            control={control}
            render={({ field }) => (
              <IonItem>
                <IonLabel position="stacked">
                  Room Code
                </IonLabel>

                <IonInput
                  value={field.value}
                  placeholder="STAR01"
                  onIonInput={(e) =>
                    field.onChange(e.detail.value!)
                  }
                />
              </IonItem>
            )}
          />

          <Controller
            name="celebrity"
            control={control}
            render={({ field }) => (
              <IonItem>
                <IonLabel position="stacked">
                  Starting Celebrity
                </IonLabel>

                <IonInput
                  value={field.value}
                  placeholder="Albert Einstein"
                  onIonInput={(e) =>
                    field.onChange(e.detail.value!)
                  }
                />
              </IonItem>
            )}
          />

          <IonButton
            type="submit"
            expand="block"
            className="ion-margin-top"
          >
            Start Game
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Home;