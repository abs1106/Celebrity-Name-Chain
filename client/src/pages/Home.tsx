import React from "react";
import {IonButton,IonContent,IonHeader,IonInput,IonItem,IonLabel,IonPage,IonTitle,IonToolbar,} from "@ionic/react";

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

  const onSubmit = (data: CreateGameForm) => {
    console.log("Create Game:", data);

    // Later:
    // POST /games
    // Then navigate("/game")

    reset();
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
