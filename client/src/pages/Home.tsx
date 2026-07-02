import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>  //is one screen of the app*
      <IonHeader> //top navigation bar 
        <IonToolbar>
          <IonTitle>Celebrity Name Chain</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen> //where the user interacts 
        <p>Hello, world!</p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
