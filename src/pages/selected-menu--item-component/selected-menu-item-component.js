import React from "react"
import {IonCard, IonCardContent, IonCardHeader, IonIcon} from "@ionic/react";
import {arrowBack} from "ionicons/icons";

export default function SelectedMenuItemComponent(){

    return ( <div style={{
        border: "solid",
        width: "20em",
        height: "30em",
        margin: "auto",

    }}>

        <IonCard style={{
            display: "flex",
        }}>

            <IonIcon icon={arrowBack} style={{
                position: "absolute",
                // display:"flex"
                // textAlign: "center"
            }} />
            <IonCardHeader style={{
                // textAlign: "center",
                // display: "flex",
                backgroundColor: "blue",
                margin: "auto"

            }}>
                <div style={{
                    backgroundColor: "red",
                    fontSize: "1.4rem",
                    textAlign: "center",
                }}>
                    French Toast
                </div>
                <div style={{
                    border: "solid thin",
                    width: "16em",
                    height: "10em",
                    backgroundColor: "yellow"
                }}>
                    {/*<img />*/}
                </div>
            </IonCardHeader>
            <IonCardContent>

            </IonCardContent>
        </IonCard>
    </div>)
}