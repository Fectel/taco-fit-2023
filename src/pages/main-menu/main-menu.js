import React from "react";
import MainMenuCarousel from "./main-menu-carousel/main-menu-carousel";
import MainMenuComboDisplay from "./main-menu-carousel/main-menu-combo-display/main-menu-combo-display";

export default function MainMenu(){

    return (
        <div>
            <div>Main Menu</div>

            <MainMenuCarousel />
            <MainMenuComboDisplay />
        </div>
    )
}