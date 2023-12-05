import React from "react"
import {IonButton, IonCard} from "@ionic/react";

export default function HomePage(){

    function onPickUpClick(){

        console.log(window.location.href)
        window.location.href = "./main-menu"

    }
    function onDeliveryClick(){

    }

    return (
        <div  style={{
            border: "solid",
            margin: "6em auto",
            width: "20em",
            height: "40em",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "blue",

            // justifyContent: "space-around"
            // flexWrap: "wrap"
        }}>
            <div>
                Taco Fit
            </div>


            <div style={{
                border: "solid thin",
                width: "100%",
                margin: "3em auto 0",
                height: "12em",
                backgroundColor: "red"
            }}>
                Photo Gallery
            </div>

            <IonCard style={{ width: "70%",
                height: "18em",
                margin: "3em auto",
                backgroundColor: "red"

                // position: "relative",
            }}>
                <div style={{
                    // border: "solid",
                    margin: "3em auto",
                    height: "12em",
                    width: "14em",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly"

                }}>
                    <IonButton
                        onClick={() => onPickUpClick()}
                        fill="outline" style={{fontSize: "1.1rem", height: "3em"}}>Pick Up</IonButton>
                    <IonButton fill="outline" style={{fontSize: "1.1rem", height: "3em"}}>Delivery</IonButton>


                </div>

            </IonCard>
        </div>
    )
}