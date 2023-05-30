import React from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";

export default function MainMenuCarousel(){

    return <div style={{
        border:"solid thin",
    }}>
        main menu carousel
        <IonCard   style={{
            minWidth: "18em",
            width: "18em",
            textAlign: "center",
            height: "fit-content",
        }}>
            <IonCardHeader>
                <IonCardTitle style={{
                    fontSize: "1rem"
                }}>
                   recipe item name

                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <div
                    //     style={{width: "15em",
                    //     margin: "auto",
                    //     height: "20em",
                    // }}
                >
                    <div style={{
                        objectFit: "contain",
                        width: "15em",
                        margin: "auto",
                        height: "8em",
                        border: "solid thin"

                    }} ></div>
                    {/*<img style={{*/}
                    {/*    objectFit: "contain",*/}
                    {/*    width: "15em",*/}
                    {/*    margin: "auto",*/}
                    {/*    height: "8em",*/}

                    {/*}} src={protein.imgUrl} />*/}

                </div>
            </IonCardContent>
        </IonCard>
    </div>
}