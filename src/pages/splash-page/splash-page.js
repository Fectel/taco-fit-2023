import React, {useEffect} from "react"
import {auth} from "../../firebase";

export const SplashPage = () => {


    function renderDeliveryOrPickUpButtons(){

    }

    function InstagramMenuPage(){

        const emptyArray = [
            {
                menuCategoryTitle: "Breakfast"
            },
            {
                menuCategoryTitle: "Lunch"
            },
            {
                menuCategoryTitle: "Dinner"
            },
            {
                menuCategoryTitle: "Protein Shakes"
            },
            {
                menuCategoryTitle: "Dessert"
            },
           ]
        const breakfastLunchDinnerArray = [
            {
                menuCategoryTitle: "Breakfast"
            },
            {
                menuCategoryTitle: "Lunch"
            },
            {
                menuCategoryTitle: "Dinner"
            },

           ]
        const morningMenuArray = [
            {
            menuCategoryTitle: "Healthy American Breakfast"
            },
            {
            menuCategoryTitle: "Healthy Mexican Breakfast"
            },
            {
                menuCategoryTitle: "Protein Shakes"
            },
            {
                menuCategoryTitle: "Green Juices + Wellness Shots"
            },
        ]
        const lunchMenuArray = [
            {
            menuCategoryTitle: "Healthy Delicious Sandwiches"
            },
            {
                menuCategoryTitle: "Healthy Mac and Cheese"
            },
            {
                menuCategoryTitle: "Green Juices"
            },
        ]

        return (
            <div>
                <div>
                    Taco Fit
                </div>



                <div
                    style={{
                        border: "solid",
                        margin: "auto",
                        width: "40em",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    {breakfastLunchDinnerArray.map(x => (
                        <div
                            style={{
                                border: "solid",
                                width: "100%",
                                height: "7em",
                            }}
                        >


                            {x.menuCategoryTitle}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        border: "solid",
                        margin: "auto",
                        width: "40em",
                        height: "100%",
                        display: "flex",
                        flexWrap: "wrap"
                    }}
                >
                    {morningMenuArray.map(x => (
                        <div
                            style={{
                                border: "solid",
                                width: "50%",
                                height: "7em",
                            }}
                        >


                            {x.menuCategoryTitle}
                        </div>
                    ))}
                </div>

                {/*<div style={{*/}
                {/*    border: "solid",*/}
                {/*    margin: "auto",*/}
                {/*    width: "40em",*/}
                {/*    height: "100%",*/}
                {/*    display: "flex",*/}
                {/*}}>*/}
                {/*    {emptyArray.map(x => (*/}
                {/*        <div style={{*/}
                {/*            border: "solid",*/}
                {/*            width: "9em",*/}
                {/*            height: "30em",*/}
                {/*        }}>*/}

                {/*            {x.menuCategoryTitle}*/}

                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

            </div>

        )
    }



    return (
        <div>

            <InstagramMenuPage />
        </div>
    )

}


