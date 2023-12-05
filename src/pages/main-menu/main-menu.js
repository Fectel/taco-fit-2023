import React from "react";
import MainMenuCarousel from "./main-menu-carousel/main-menu-carousel";

export default function MainMenu(){

    return (
        <div style={{
            border: "solid", width: "100%", height: "100%", margin: "auto", overflowY: "scroll"

        }}>

            <MainMenuCarousel />
            {/*<OrderSummaryComponent />*/}
        </div>
    )
}