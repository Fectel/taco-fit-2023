import React, {useEffect, useRef, useState} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem} from "@ionic/react";
import {
    addCircleOutline as addIcon,
    cameraOutline as uploadPhotoIcon,
    chevronDownOutline,
    chevronForwardOutline
} from "ionicons/icons";
import {saveNewEquipmentPicture, saveNewMainMenuCarouselImg} from "../../../firebase";
import {CreateNewRecipe} from "../../recipes-page/recipes-page-components";
import RecipesPage2 from "../../recipes-page/recipes-page-2";
import MenuComboPage2 from "../../menu-combo-page/menu-combo-page-2"
import MenuItemPage from "../../menu-combo-page/menu-item-page";
import CustomProteinShakePage from "../../menu-combo-page/custom-protein-shake-page";

export default function MainMenuCarousel(){

    const [ selectedItemId, setSelectedItemId ] = useState("")


    const [recipeImgUrl, setRecipeImgUrl ] = useState("")
    const imageInputRef = useRef();
    const [recipeName , setRecipeName ] = useState("")

    const[ recipePageStep, setRecipePageStep ] = useState("")
    const[ carouselStep, setCarouselStep ] = useState("")

    const [chosenRecipe, setChosenRecipe ] = useState("")

    const [ breakfastMenu, setBreakfastMenu ] = useState([])
    const [ lunchMenu, setLunchMenu ] = useState([])
    const [ dinnerMenu, setDinnerMenu ] = useState([])
    const [ drinksMenu, setDrinksMenu ] = useState([])
    const [ pastriesMenu, setPastriesMenu ] = useState([])
    const [ sidesMenu, setSidesMenu ] = useState([])

    useEffect(() => {
        console.log(recipeImgUrl)
        console.log(chosenRecipe)
    }, [recipeImgUrl, chosenRecipe])


    const handleFileChangeImage = async (event) => {

        console.log(event, recipeName)
        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrl = await saveNewMainMenuCarouselImg(pictureUrlConst, recipeName)

            console.log(imgUrl)
            setRecipeImgUrl(imgUrl)


        }

    };



    const [menuCarouselDropdown , setMenuCarouselDropdown ] = useState(true)
    const [menuCarouselDropdownLunch , setMenuCarouselDropdownLunch ] = useState(true)


    const drinksMenuList = [

        {
            name: "Jamaica",
        },
        {
            name: "Horchata",
        },
        {
            name: "Lemonade",
        },
        {
            name: "Jugo Verde",
        },
        {
            name: "Jugo Rojo",
        },
        {
            name: "",
        },

    ]

    const breakfastComboList = [

        {
            name: "Huevos Rancheros",
            price: 10,
        },
        {
            name: "Omelletes",
            price: 10,
        },
        {
            name: "Chilaquiles",
            price: 10,
        },
        {
            name: "Tetelas",
            price: 10,
        },
        {
            name: "Tamales",
            price: 10,
        },
        {
            name: "Gorditas",
            price: 10,
        },
        {
            name: "Breakfast Burrito"
        },
        {
            name: "Protein Smoothie"
        },


    ]
    const dinnerComboList = [

        {
            name: "Steak",
            price: 15,
        },
        {
            name: "Mac and Cheese",
            price: 10,
        },
        {
            name: "Keto Waffle",
            price: 10,
        },
        {
            name: "Egg Omelettes",
            price: 10,
        },
        {
            name: "Breakfast Sandwiches",
            price: 10,
        },
        {
            name: "Breakfast Burrito"
        },
        {
            name: "Healthy Pastries"
        },


    ]
    const lunchComboList = [

        {
            name: "Keto Baked Chicken Fingers",
        },
        {
            name: "Carne Asada Burrito",
        },
        {
            name: "Turkey Burger"
        },
        {
            name: "Keto Mac and Cheese"
        },
        {
            name: "Tacos"
        },
        {
            name: "Quesadilla"
        },
        {
            name: "Healthy Sandwiches"
        },
        {
            name: "Fish, Steak, Chicken, and Pork "
        },
        {
            name: "Salads"
        },


    ]

    function onMenuItemClick(id){
        setSelectedItemId(id)
        setCarouselStep("display menu combo page")
    }

    function renderMainMenuCarousel(){

        switch (carouselStep) {

            case "":
                return (
                    <div style={{
                        border:"solid thin",
                        overflow: "hidden",
                        height: "80%",
                        overflowY: "scroll"
                    }}>
                        <div>
                            <div
                                // button={true} onClick={() => setMenuCarouselDropdownLunch(!menuCarouselDropdownLunch)}
                                style={{
                                    display: "flex",
                                    width: "fit-content",
                                    margin: "auto",
                                    // border: "solid thin",
                                    textAlign: "center",
                                    // backgroundColor: "red",
                                    height:"fit-content",
                                    // padding: "2em"
                                }}>

                                <div style={{
                                    fontSize: "1.8rem",
                                    fontFamily: "Paytone One, sans-serif"


                                }}>
                                    Breakfast

                                </div>
                                <IonButton
                                    onClick={() => setCarouselStep("add new breakfast recipe")}
                                    size="small" style={{
                                    // width: "2em",
                                    // padding: "0",
                                    // height: "2em",

                                }}>
                                    <div>
                                        <IonIcon size="small" icon={addIcon} />


                                    </div>
                                </IonButton>
                                <div
                                    // onClick={() => setDropDown(false)}

                                    style={{
                                        position:"absolute",
                                        right: "0",
                                        cursor: "pointer"
                                    }}>
                                    {/*<IonIcon*/}
                                    {/*    style={{*/}
                                    {/*        fontSize:"32px"*/}
                                    {/*    }}*/}
                                    {/*    onClick={() => setMenuCarouselDropdown(!menuCarouselDropdown)}*/}
                                    {/*    icon={menuCarouselDropdown === true ? (chevronDownOutline):(chevronForwardOutline) }/>*/}


                                </div>





                            </div>
                            <div style={{height: "fit-content",
                                display: "flex",
                                overflowX: "scroll",
                                backgroundColor: "rgb(250,245,191)"

                            }}>

                                {breakfastMenu.map((item, i) => (
                                    <IonCard   style={{
                                        minWidth: "10em",
                                        padding: "0em",

                                        // backgroundColor: "blue",
                                        width: "9em",
                                        textAlign: "center",
                                        height: "12em",
                                    }}
                                    onClick={() => onMenuItemClick(item.docId)}
                                    >
                                        <IonCardHeader style={{
                                            padding: ".2em",
                                        }}>
                                            <IonCardTitle style={{
                                                // border: "solid thin",
                                                margin: '0',
                                                padding:"0",
                                                fontSize:  ".7rem",
                                                fontFamily: "Paytone One, sans-serif",
                                                height: "3em",

                                            }}>
                                                {item.recipeName}

                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <div
                                                //     style={{width: "15em",
                                                //     margin: "auto",
                                                //     height: "20em",
                                                // }}
                                            >
                                                <div>
                                                    <div style={
                                                        {width: "100%",
                                                            display: "flex",
                                                            height: "5em",
                                                            border: "solid",
                                                            margin: " 0em auto 0"}}>

                                                            <img src={item.recipeImgUrl} />


                                                    </div>

                                                </div>


                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </div>



                            {/*<div>*/}
                            {/*    {menuCarouselDropdown && (*/}
                            {/*        <div >*/}


                            {/*            <div style={{*/}
                            {/*                display: "flex",*/}
                            {/*                padding: "0",*/}
                            {/*                backgroundColor: "red",*/}
                            {/*                height: "13em",*/}
                            {/*                flexWrap: "wrap",*/}
                            {/*                overflowX: "scroll",*/}
                            {/*                overflowY: "scroll",*/}


                            {/*            }}>*/}
                            {/*                {breakfastComboList.map((item, i) => (*/}
                            {/*                    <IonCard   style={{*/}
                            {/*                        minWidth: "9em",*/}
                            {/*                        padding: "0em",*/}

                            {/*                        backgroundColor: "blue",*/}
                            {/*                        width: "9em",*/}
                            {/*                        textAlign: "center",*/}
                            {/*                        height: "fit-content",*/}
                            {/*                    }}>*/}
                            {/*                        <IonCardHeader style={{*/}
                            {/*                            padding: ".2em",*/}
                            {/*                        }}>*/}
                            {/*                            <IonCardTitle style={{*/}
                            {/*                                border: "solid thin",*/}
                            {/*                                margin: '0',*/}
                            {/*                                padding:"0",*/}
                            {/*                                fontSize:  ".7rem",*/}
                            {/*                                fontFamily: "Paytone One, sans-serif",*/}
                            {/*                            }}>*/}
                            {/*                                {item.name}*/}

                            {/*                            </IonCardTitle>*/}
                            {/*                        </IonCardHeader>*/}
                            {/*                        <IonCardContent>*/}
                            {/*                            <div*/}
                            {/*                                //     style={{width: "15em",*/}
                            {/*                                //     margin: "auto",*/}
                            {/*                                //     height: "20em",*/}
                            {/*                                // }}*/}
                            {/*                            >*/}
                            {/*                                <div style={{*/}
                            {/*                                    objectFit: "contain",*/}
                            {/*                                    width: "15em",*/}
                            {/*                                    margin: "auto",*/}
                            {/*                                    height: "3em",*/}
                            {/*                                    border: "solid thin"*/}

                            {/*                                }} ></div>*/}
                            {/*                                /!*<img style={{*!/*/}
                            {/*                                /!*    objectFit: "contain",*!/*/}
                            {/*                                /!*    width: "15em",*!/*/}
                            {/*                                /!*    margin: "auto",*!/*/}
                            {/*                                /!*    height: "8em",*!/*/}

                            {/*                                /!*}} src={protein.imgUrl} />*!/*/}

                            {/*                            </div>*/}
                            {/*                        </IonCardContent>*/}
                            {/*                    </IonCard>*/}
                            {/*                ))}*/}

                            {/*            </div>*/}

                            {/*        </div>*/}
                            {/*    )*/}
                            {/*    }*/}
                            {/*</div>*/}


                        </div>
                        <div>
                            <div
                                // button={true} onClick={() => setMenuCarouselDropdownLunch(!menuCarouselDropdownLunch)}
                                style={{
                                    display: "flex",
                                    width: "fit-content",
                                    margin: "auto",
                                    // border: "solid thin",
                                    textAlign: "center",
                                    // backgroundColor: "red",
                                    height:"fit-content",
                                    // padding: "2em"
                                }}>

                                <div style={{
                                    fontSize: "1.8rem",
                                    fontFamily: "Paytone One, sans-serif"


                                }}>
                                    Lunch

                                </div>
                                <IonButton
                                    onClick={() => setCarouselStep("add new lunch recipe")}
                                    size="small" style={{
                                    // width: "2em",
                                    // padding: "0",
                                    // height: "2em",

                                }}>
                                    <div>
                                        <IonIcon size="small" icon={addIcon} />


                                    </div>
                                </IonButton>
                                <div
                                    // onClick={() => setDropDown(false)}

                                    style={{
                                        position:"absolute",
                                        right: "0",
                                        cursor: "pointer"
                                    }}>
                                    {/*<IonIcon*/}
                                    {/*    style={{*/}
                                    {/*        fontSize:"32px"*/}
                                    {/*    }}*/}
                                    {/*    onClick={() => setMenuCarouselDropdown(!menuCarouselDropdown)}*/}
                                    {/*    icon={menuCarouselDropdown === true ? (chevronDownOutline):(chevronForwardOutline) }/>*/}


                                </div>





                            </div>
                            <div style={{height: "fit-content",
                                display: "flex",
                                overflowX: "scroll",
                                backgroundColor: "rgb(250,245,191)"

                            }}>

                                {lunchMenu.map((item, i) => (
                                    <IonCard   style={{
                                        minWidth: "10em",
                                        padding: "0em",

                                        // backgroundColor: "blue",
                                        width: "9em",
                                        textAlign: "center",
                                        height: "12em",
                                    }}>
                                        <IonCardHeader style={{
                                            padding: ".2em",
                                        }}>
                                            <IonCardTitle style={{
                                                // border: "solid thin",
                                                margin: '0',
                                                padding:"0",
                                                fontSize:  ".7rem",
                                                fontFamily: "Paytone One, sans-serif",
                                                height: "3em",

                                            }}>
                                                {item.recipeName}

                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <div
                                                //     style={{width: "15em",
                                                //     margin: "auto",
                                                //     height: "20em",
                                                // }}
                                            >
                                                <div>
                                                    <div style={
                                                        {width: "100%",
                                                            display: "flex",
                                                            height: "5em",
                                                            border: "solid",
                                                            margin: " 0em auto 0"}}>

                                                        <img src={item.recipeImgUrl} />


                                                    </div>

                                                </div>


                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </div>




                        </div>
                        <div>
                            <div
                                // button={true} onClick={() => setMenuCarouselDropdownLunch(!menuCarouselDropdownLunch)}
                                style={{
                                    display: "flex",
                                    width: "fit-content",
                                    margin: "auto",
                                    // border: "solid thin",
                                    textAlign: "center",
                                    // backgroundColor: "red",
                                    height:"fit-content",
                                    // padding: "2em"
                                }}>

                                <div style={{
                                    fontSize: "1.8rem",
                                    fontFamily: "Paytone One, sans-serif"


                                }}>
                                    Dinner

                                </div>
                                <IonButton
                                    onClick={() => setCarouselStep("add new dinner recipe")}
                                    size="small" style={{
                                    // width: "2em",
                                    // padding: "0",
                                    // height: "2em",

                                }}>
                                    <div>
                                        <IonIcon size="small" icon={addIcon} />


                                    </div>
                                </IonButton>
                                <div
                                    // onClick={() => setDropDown(false)}

                                    style={{
                                        position:"absolute",
                                        right: "0",
                                        cursor: "pointer"
                                    }}>
                                    {/*<IonIcon*/}
                                    {/*    style={{*/}
                                    {/*        fontSize:"32px"*/}
                                    {/*    }}*/}
                                    {/*    onClick={() => setMenuCarouselDropdown(!menuCarouselDropdown)}*/}
                                    {/*    icon={menuCarouselDropdown === true ? (chevronDownOutline):(chevronForwardOutline) }/>*/}


                                </div>





                            </div>
                            <div style={{height: "fit-content",
                                display: "flex",
                                overflowX: "scroll",
                                backgroundColor: "rgb(250,245,191)"

                            }}>

                                {dinnerMenu.map((item, i) => (
                                    <IonCard   style={{
                                        minWidth: "10em",
                                        padding: "0em",

                                        // backgroundColor: "blue",
                                        width: "9em",
                                        textAlign: "center",
                                        height: "12em",
                                    }}>
                                        <IonCardHeader style={{
                                            padding: ".2em",
                                        }}>
                                            <IonCardTitle style={{
                                                // border: "solid thin",
                                                margin: '0',
                                                padding:"0",
                                                fontSize:  ".7rem",
                                                fontFamily: "Paytone One, sans-serif",
                                                height: "3em",

                                            }}>
                                                {item.recipeName}

                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <div
                                                //     style={{width: "15em",
                                                //     margin: "auto",
                                                //     height: "20em",
                                                // }}
                                            >
                                                <div>
                                                    <div style={
                                                        {width: "100%",
                                                            display: "flex",
                                                            height: "5em",
                                                            border: "solid",
                                                            margin: " 0em auto 0"}}>

                                                        <img src={item.recipeImgUrl} />


                                                    </div>

                                                </div>


                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </div>




                        </div>
                        <div>
                            <div
                                // button={true} onClick={() => setMenuCarouselDropdownLunch(!menuCarouselDropdownLunch)}
                                style={{
                                    display: "flex",
                                    width: "fit-content",
                                    margin: "auto",
                                    // border: "solid thin",
                                    textAlign: "center",
                                    // backgroundColor: "red",
                                    height:"fit-content",
                                    // padding: "2em"
                                }}>

                                <div style={{
                                    fontSize: "1.8rem",
                                    fontFamily: "Paytone One, sans-serif"


                                }}>
                                    Healthy Pastries

                                </div>
                                <IonButton
                                    onClick={() => setCarouselStep("add new pastry recipe")}
                                    size="small" style={{
                                    // width: "2em",
                                    // padding: "0",
                                    // height: "2em",

                                }}>
                                    <div>
                                        <IonIcon size="small" icon={addIcon} />


                                    </div>
                                </IonButton>
                                <div
                                    // onClick={() => setDropDown(false)}

                                    style={{
                                        position:"absolute",
                                        right: "0",
                                        cursor: "pointer"
                                    }}>
                                    {/*<IonIcon*/}
                                    {/*    style={{*/}
                                    {/*        fontSize:"32px"*/}
                                    {/*    }}*/}
                                    {/*    onClick={() => setMenuCarouselDropdown(!menuCarouselDropdown)}*/}
                                    {/*    icon={menuCarouselDropdown === true ? (chevronDownOutline):(chevronForwardOutline) }/>*/}


                                </div>





                            </div>
                            <div style={{height: "fit-content",
                                display: "flex",
                                overflowX: "scroll",
                                backgroundColor: "rgb(250,245,191)"

                            }}>

                                {pastriesMenu.map((item, i) => (
                                    <IonCard   style={{
                                        minWidth: "10em",
                                        padding: "0em",

                                        // backgroundColor: "blue",
                                        width: "9em",
                                        textAlign: "center",
                                        height: "12em",
                                    }}>
                                        <IonCardHeader style={{
                                            padding: ".2em",
                                        }}>
                                            <IonCardTitle style={{
                                                // border: "solid thin",
                                                margin: '0',
                                                padding:"0",
                                                fontSize:  ".7rem",
                                                fontFamily: "Paytone One, sans-serif",
                                                height: "3em",

                                            }}>
                                                {item.recipeName}

                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <div
                                                //     style={{width: "15em",
                                                //     margin: "auto",
                                                //     height: "20em",
                                                // }}
                                            >
                                                <div>
                                                    <div style={
                                                        {width: "100%",
                                                            display: "flex",
                                                            height: "5em",
                                                            border: "solid",
                                                            margin: " 0em auto 0"}}>

                                                        <img src={item.recipeImgUrl} />


                                                    </div>

                                                </div>


                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </div>




                        </div>
                        <div>
                            <div
                                // button={true} onClick={() => setMenuCarouselDropdownLunch(!menuCarouselDropdownLunch)}
                                style={{
                                    display: "flex",
                                    width: "fit-content",
                                    margin: "auto",
                                    // border: "solid thin",
                                    textAlign: "center",
                                    // backgroundColor: "red",
                                    height:"fit-content",
                                    // padding: "2em"
                                }}>

                                <div style={{
                                    fontSize: "1.8rem",
                                    fontFamily: "Paytone One, sans-serif"


                                }}>
                                    Drinks

                                </div>
                                <IonButton
                                    onClick={() => setCarouselStep("add new drinks recipe")}
                                    size="small" style={{
                                    // width: "2em",
                                    // padding: "0",
                                    // height: "2em",

                                }}>
                                    <div>
                                        <IonIcon size="small" icon={addIcon} />


                                    </div>
                                </IonButton>
                                <div
                                    // onClick={() => setDropDown(false)}

                                    style={{
                                        position:"absolute",
                                        right: "0",
                                        cursor: "pointer"
                                    }}>
                                    {/*<IonIcon*/}
                                    {/*    style={{*/}
                                    {/*        fontSize:"32px"*/}
                                    {/*    }}*/}
                                    {/*    onClick={() => setMenuCarouselDropdown(!menuCarouselDropdown)}*/}
                                    {/*    icon={menuCarouselDropdown === true ? (chevronDownOutline):(chevronForwardOutline) }/>*/}


                                </div>





                            </div>
                            <div style={{height: "fit-content",
                                display: "flex",
                                overflowX: "scroll",
                                backgroundColor: "rgb(250,245,191)"

                            }}>

                                {drinksMenu.map((item, i) => (
                                    <IonCard   style={{
                                        minWidth: "10em",
                                        padding: "0em",

                                        // backgroundColor: "blue",
                                        width: "9em",
                                        textAlign: "center",
                                        height: "12em",
                                    }}>
                                        <IonCardHeader style={{
                                            padding: ".2em",
                                        }}>
                                            <IonCardTitle style={{
                                                // border: "solid thin",
                                                margin: '0',
                                                padding:"0",
                                                fontSize:  ".7rem",
                                                fontFamily: "Paytone One, sans-serif",
                                                height: "3em",

                                            }}>
                                                {item.recipeName}

                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <div
                                                //     style={{width: "15em",
                                                //     margin: "auto",
                                                //     height: "20em",
                                                // }}
                                            >
                                                <div>
                                                    <div style={
                                                        {width: "100%",
                                                            display: "flex",
                                                            height: "5em",
                                                            border: "solid",
                                                            margin: " 0em auto 0"}}>

                                                        <img src={item.recipeImgUrl} />


                                                    </div>

                                                </div>


                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </div>




                        </div>
                        <div>
                            <div
                                // button={true} onClick={() => setMenuCarouselDropdownLunch(!menuCarouselDropdownLunch)}
                                style={{
                                    display: "flex",
                                    width: "fit-content",
                                    margin: "auto",
                                    // border: "solid thin",
                                    textAlign: "center",
                                    // backgroundColor: "red",
                                    height:"fit-content",
                                    // padding: "2em"
                                }}>

                                <div style={{
                                    fontSize: "1.8rem",
                                    fontFamily: "Paytone One, sans-serif"


                                }}>
                                    Sides

                                </div>
                                <IonButton
                                    onClick={() => setCarouselStep("add new sides recipe")}
                                    size="small" style={{
                                    // width: "2em",
                                    // padding: "0",
                                    // height: "2em",

                                }}>
                                    <div>
                                        <IonIcon size="small" icon={addIcon} />


                                    </div>
                                </IonButton>
                                <div
                                    // onClick={() => setDropDown(false)}

                                    style={{
                                        position:"absolute",
                                        right: "0",
                                        cursor: "pointer"
                                    }}>
                                    {/*<IonIcon*/}
                                    {/*    style={{*/}
                                    {/*        fontSize:"32px"*/}
                                    {/*    }}*/}
                                    {/*    onClick={() => setMenuCarouselDropdown(!menuCarouselDropdown)}*/}
                                    {/*    icon={menuCarouselDropdown === true ? (chevronDownOutline):(chevronForwardOutline) }/>*/}


                                </div>





                            </div>
                            <div style={{height: "fit-content",
                                display: "flex",
                                overflowX: "scroll",
                                backgroundColor: "rgb(250,245,191)"
                            }}>

                                {sidesMenu.map((item, i) => (
                                    <IonCard   style={{
                                        minWidth: "10em",
                                        padding: "0em",

                                        // backgroundColor: "blue",
                                        width: "9em",
                                        textAlign: "center",
                                        height: "12em",
                                    }}>
                                        <IonCardHeader style={{
                                            padding: ".2em",
                                        }}>
                                            <IonCardTitle style={{
                                                // border: "solid thin",
                                                margin: '0',
                                                padding:"0",
                                                fontSize:  ".7rem",
                                                fontFamily: "Paytone One, sans-serif",
                                                height: "3em",

                                            }}>
                                                {item.recipeName}

                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <div
                                                //     style={{width: "15em",
                                                //     margin: "auto",
                                                //     height: "20em",
                                                // }}
                                            >
                                                <div>
                                                    <div style={
                                                        {width: "100%",
                                                            display: "flex",
                                                            height: "5em",
                                                            border: "solid",
                                                            margin: " 0em auto 0"}}>

                                                        <img src={item.recipeImgUrl} />


                                                    </div>

                                                </div>


                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </div>

                        </div>


                    </div>
                )
            break;

            case "add new breakfast recipe":
                console.log(carouselStep, chosenRecipe, breakfastMenu)
                return (
                    <RecipesPage2
                        setCarouselStep={setCarouselStep}
                        setChosenRecipe={setChosenRecipe}
                        chosenRecipe={chosenRecipe}
                        setMenuArray={setBreakfastMenu}
                        menuArray={breakfastMenu}
                    />
                )
                break;
            case "add new lunch recipe":
                return (
                    <RecipesPage2
                        setCarouselStep={setCarouselStep}
                        setChosenRecipe={setChosenRecipe}
                        chosenRecipe={chosenRecipe}
                        setMenuArray={setLunchMenu}
                        menuArray={lunchMenu}
                    />
                )
            case "add new dinner recipe":
                return (
                    <RecipesPage2
                        setCarouselStep={setCarouselStep}
                        setChosenRecipe={setChosenRecipe}
                        chosenRecipe={chosenRecipe}
                        setMenuArray={setDinnerMenu}
                        menuArray={dinnerMenu}
                    />
                )
            case "add new drink recipe":
                return (
                    <RecipesPage2
                        setCarouselStep={setCarouselStep}
                        setChosenRecipe={setChosenRecipe}
                        chosenRecipe={chosenRecipe}
                        setMenuArray={setDrinksMenu}
                        menuArray={drinksMenu}
                    />
                )
            case "add new pastry recipe":
                return (
                    <RecipesPage2
                        setCarouselStep={setCarouselStep}
                        setChosenRecipe={setChosenRecipe}
                        chosenRecipe={chosenRecipe}
                        setMenuArray={setPastriesMenu}
                        menuArray={pastriesMenu}
                    />
                )
            case "add new sides recipe":
                return (
                    <RecipesPage2
                        setCarouselStep={setCarouselStep}
                        setChosenRecipe={setChosenRecipe}
                        chosenRecipe={chosenRecipe}
                        setMenuArray={setSidesMenu}
                        menuArray={sidesMenu}
                    />
                )
            case "display menu combo page":
                console.log(selectedItemId)
                return (
                    // <MenuComboPage2
                    // comboId={selectedItemId}
                    // />
                    <div>
                        <CustomProteinShakePage />
                        <MenuItemPage
                            menuItemId={selectedItemId}
                        />
                    </div>



                )

        }
    }



    return (
        <div>
            {renderMainMenuCarousel()}
        </div>
    )
}