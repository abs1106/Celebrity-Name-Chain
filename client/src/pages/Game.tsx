import{
     IonButton,
     IonHeader, 
     IonTitle, 
     IonToolbar, 
     IonPage
     } from '@ionic/react';
import { useState } from 'react';

     
     const Game: React.FC = () => { 
     const Game = () => { 
        const [answer, setAnswer] = useState('');
        
        return (
            
            <IonPage> 
            <IonHeader> 

            <IonToolbar>
             <IonTitle> This is the game</IonTitle> 
             </IonToolbar> 

             </IonHeader> 
             <IonButton expand ="block" (click)="()">
             play game
             </IonButton>

             </IonPage> 
            
            );
         } 
        }

         export default Game
