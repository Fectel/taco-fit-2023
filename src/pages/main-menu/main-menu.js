import React, {useState} from "react";
import MainMenuCarousel from "./main-menu-carousel/main-menu-carousel";
import {IonButton, IonContent, IonIcon, IonPage} from "@ionic/react";
import {add} from "ionicons/icons";
import RiotButton from "../../components/riot-button/riot-button";
import AddOnsComponent from "../../components/add-ons-component/add-ons-component";
import FortnieAddOnsList from "../../components/fornite-add-ons-list/fortnie-add-ons-list";

export default function MainMenu(){

    const menuItems = ["menu item"]

    const menuItem= {
        title: "Carne Asada Burrito",
        imageUrl: "test",
        sizes: ["6oz", "10oz",],
        prices: {
           "6oz": "7.99",
            "10oz": "11.99",
        }


    }
    const [selectedSize, setSelectedSize] = useState(menuItem.sizes[0]); // default to the first size

    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        setSelectedSize(newSize);
    };

    let exAddons = [
        {
            id: 0,
            name: "Sour Cream",
            price: 1.99,
            imageUrl: "gs://taco-fit-c1a55.appspot.com/carousel-menu-item-imgs-ref/Cesar Salad w/ Grilled Chicken"
        },
        {
            id: 1,
            name: "Guacamole",
            price: 1.99,
            imageUrl: "gs://taco-fit-c1a55.appspot.com/carousel-menu-item-imgs-ref/Cesar Salad w/ Grilled Chicken"

        },
    ]

    return (
        <div style={{
            border: "solid", width: "100%", height: "100%", margin: "auto", overflowY: "scroll"

        }}>

            <MainMenuCarousel />

            {/*<div>*/}
            {/*    <h2>{menuItem.title}</h2>*/}
            {/*    <img src={menuItem.imageUrl} alt={menuItem.title} />*/}

            {/*    <div>*/}
            {/*        <label htmlFor="sizeSelector">Select Size:</label>*/}
            {/*        <select id="sizeSelector" value={selectedSize} onChange={handleSizeChange}>*/}
            {/*            {menuItem.sizes.map((size) => (*/}
            {/*                <option key={size} value={size}>*/}
            {/*                    {`${size} - $${menuItem.prices[size]}`}*/}
            {/*                </option>*/}
            {/*            ))}*/}
            {/*        </select>*/}
            {/*    </div>*/}


            {/*</div>*/}
            {/*<div>*/}

                {/*<AddOnsComponent*/}
                {/*    addOns={exAddons}*/}

                {/*/>*/}
                {/*<FortnieAddOnsList addons={exAddons}*/}
                {/*                   // onAddonClick={onAddOnsClick}*/}
                {/*/>*/}
            {/*</div>*/}
            {/*<IonPage>*/}
            {/*    <IonContent className="ion-padding">*/}
            {/*        /!* Display existing menu items *!/*/}
            {/*        {menuItems.map((item, index) => (*/}
            {/*            <div key={index}>{item}</div>*/}
            {/*        ))}*/}

            {/*        /!* Plus button to add new menu item *!/*/}
            {/*        <IonButton*/}
            {/*            // onClick={addMenuItem}*/}
            {/*        >*/}
            {/*            <IonIcon icon={add} />*/}
            {/*        </IonButton>*/}
            {/*    </IonContent>*/}
            {/*</IonPage>*/}
            {/*<OrderSummaryComponent />*/}

        </div>
    )
}