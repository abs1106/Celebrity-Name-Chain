import{
     IonButton,
     IonHeader, 
     IonTitle, 
     IonToolbar, 
     IonPage,
     IonInput,
     } from '@ionic/react';
import { useState } from 'react';

     
     const Game: React.FC = () => { 
     const Game = () => { 
        const [answer, setAnswer] = useState('');
        const handleSubmit = () => {
            setAnswer('')
        }

        return (
            
            <IonPage> 
            <IonHeader> 

            <IonToolbar>
             <IonTitle> This is the game</IonTitle> 
             </IonToolbar> 

             </IonHeader> 

                <IonInput>
                    value = {answer}
                    placeholder = 'Enter an answer'
                    onIonInput = {(e) => setAnswer (e.detail.value ?? '')}
                </IonInput>

             <IonButton expand ="block" onClick= {handleSubmit}>
             play game
             </IonButton>

             </IonPage> 
            
            );
         } 
        }

         export default Game
