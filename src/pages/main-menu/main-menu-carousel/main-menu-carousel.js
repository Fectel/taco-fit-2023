import React, {useEffect, useRef, useState} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonList} from "@ionic/react";
import {
    addCircleOutline as addIcon, addOutline,
    cameraOutline as uploadPhotoIcon, cartOutline,
    chevronDownOutline,
    chevronForwardOutline, remove
} from "ionicons/icons";
import {saveNewEquipmentPicture, saveNewMainMenuCarouselImg} from "../../../firebase";
import RecipesPage2 from "../../recipes-page/recipes-page-2";
import BurritoMakerComponent, {
    CartDrinksComponent, CartItemPageCartComponent,
    CartSidesComponent,
    CustomizableCartMealComponent, DrinksComponent, OrderCartMealComponent
} from "../../menu-combo-page/burrito-maker/burrito-maker-component";
import MenuItemPage from "../../menu-combo-page/menu-item-page";
import NutrientProgressBar from "../../menu-combo-page/nutrient-progress-bar/nutrient-progress-bar";

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
    const [ cartArray, setCartArray ] = useState([])

    const [ checkoutTotal, setCheckoutTotal ] = useState(0)

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

    function onMenuItemClick(id){
        setSelectedItemId(id)
        setCarouselStep("display menu combo page")
    }
    function onAddMoreToCart(){
        console.log(cartArray, "<= Cart")
        setCarouselStep("")
    }

    function onCheckoutClick(){

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
                        <IonButton
                            style={{
                                padding: ".2em",
                                position: "absolute",
                                cursor: "pointer",
                                right: ".1em",
                                top: ".0em",
                                color: "black",
                                fontColor: "black",
                                fontSize: ".9rem",
                                zIndex: "10",
                                // backgroundColor:"yellow",

                            }}
                            onClick={() => setCarouselStep("cart")}
                        >
                            <IonIcon
                                // onClick={() => setMinimizeOrder(true)}
                                // style={{
                                //     position: "absolute",
                                //     cursor: "pointer",
                                //     right: "1.5em",
                                //     top: ".5em",
                                //     color: "black",
                                //     fontColor: "black",
                                //     fontSize: "1.5rem",
                                //     zIndex: "10",
                                //     backgroundColor:"yellow",
                                // }}
                            icon={cartOutline}></IonIcon>
                        </IonButton>

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

            case "cart":
                let checkTotal = 0;
                console.log(cartArray)
                cartArray.map((meal, i) => {
                    console.log(meal.total)
                    checkTotal = checkTotal + meal.total;

                })

                console.log(checkTotal)
                // setCheckoutTotal(checkTotal)

                return (
                    <IonCard>
                        {cartArray?.map((cartData, i) => (

                            <CarouselCustomizableCartMealComponent
                                data={cartData}
                                cartIndex={i}
                                i={i}
                                cartArray={cartArray}
                                setCartArray={setCartArray}
                                setCarouselStep={setCarouselStep}
                            />
                        ))}
                        <div>
                            <IonButton expand="block"
                                       onClick={() => onAddMoreToCart()}
                            > + Add More</IonButton>
                            <IonButton expand="block" color="warning"
                                       onClick={() => onCheckoutClick()}
                            >Checkout ${checkTotal}

                            </IonButton>
                        </div>
                    </IonCard>
                )

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
                        {/*<MenuItemPage*/}
                        {/*    menuItemId={selectedItemId}*/}
                        {/*/>*/}
                        <BurritoMakerComponent
                            setCarouselStep={setCarouselStep}
                            menuItemId={selectedItemId}
                            cartArray={cartArray}
                            setCartArray={setCartArray}
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


 function CarouselCustomizableCartMealComponent({cartArray, setCartArray,
                                                  setCarouselStep,
                                                  data, i, cartIndex
                                                  // drinksFromFirebase, sidesFromFirebase,

                                              }){
    const [drinksFromFirebase, setDrinksFromFirebase] = useState([...data.drinksFromFirebase])
    const [sidesFromFirebase, setSidesFromFirebase] = useState([...data.sidesFromFirebase])
    const [ showSidesMenu, setShowSidesMenu ] = useState(false)
    const [ showDrinkMenu, setShowDrinkMenu ] = useState(false)

    const [sidesCartArray, setSidesCartArray ] = useState([data.sidesCartArray]);
    const [drinksCartArray, setDrinksCartArray ] = useState([data.drinksCartArray]);

    const [macroStats, setMacroStats] = useState([])

    const [ minimizeOrder, setMinimizeOrder ] = useState(true)

    useEffect(() => {

        console.log("CAERT USE EFFECT", drinksCartArray, sidesCartArray)
        console.log("CAERT USE EFFECT", data.drinksCartArray, data.sidesCartArray)
    },[sidesCartArray, drinksCartArray])

    let tortillaTotal;
    let mainIngredientsTotal;
    let addOnsTotal;
    let drinksTotal;
    let sidesTotal;
    let entreeTotal;

    function sumValuesInArrayOfArrays(arrayOfArrays) {
        // Initialize an object to store the sum
        const sumObject = {};

        // Iterate through each array in the outer array
        arrayOfArrays.forEach((innerArray) => {
            // Iterate through each object in the inner array
            innerArray.forEach((obj) => {
                // Iterate through each key in the object
                Object.keys(obj).forEach((key) => {
                    // Convert the value to a number and add it to the sum
                    const numericValue = Number(obj[key]);
                    if (!isNaN(numericValue)) {
                        sumObject[key] = (sumObject[key] || 0) + numericValue;
                    }
                });
            });
        });

        // Return the object with summed values
        return sumObject;
    }

    function multiplyValuesInArray(array) {
        console.log(array)
        return array?.map((item) => {
            const multipliedItem = {};


            Object.keys(item).forEach((key) => {
                const originalValue = item[key];
                const numericValue = Number(originalValue);

                if (!isNaN(numericValue)
                    && key !== "gramsPerTbsp"
                    && key !== "price"
                    && key !== "total"
                    && key !== "servingSizeGrams"
                    && key !== "unitAmount"
                    && key !== "unitPrice"
                    && key !== "unitGramsOrCups"
                    && key !== "comboAmount"
                ) {
                    switch (item.unitGramsOrCups) {

                        case "oz":
                            multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount;
                            break;
                        case "item":
                            multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount;
                            break;
                        case "grams":
                            multipliedItem[key] = numericValue * item.comboAmount * (item.unitAmount / item.servingSizeGrams);
                            break;
                        case "tsp":
                            multipliedItem[key] = numericValue * item.comboAmount * (((item.gramsPerTbsp / item.servingSizeGrams) * item.unitAmount) / 3);
                            break;
                        case "tbsp":
                            multipliedItem[key] = numericValue * item.comboAmount * ((item.gramsPerTbsp / item.servingSizeGrams) * item.unitAmount);
                            break;
                        case "cups":
                            multipliedItem[key] = (numericValue * ((item.gramsPerTbsp / item.servingSizeGrams) * 16) * item.comboAmount);

                            break;
                    }
                } else {
                    multipliedItem[key] = originalValue;
                }
            });

            return multipliedItem;
        });
    }

    function calculateCartNutritionTotals(){

        let sumResult, sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray, multipliedDrinksArray, multipliedSidesArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat,  carbohydrates = 0;


        multipliedAddOnsArray = multiplyValuesInArray(data.addOnsCartArray);
        console.log(multipliedAddOnsArray);
        multipliedTortillasArray = (data.tortillaOptionsArray);
        console.log(multipliedTortillasArray, data.tortillaOptionsArray);
        multipliedEggsAndMoreArray = multiplyValuesInArray(data.mainIngredientsCartArray);
        console.log(multipliedEggsAndMoreArray);
        multipliedDrinksArray = multiplyValuesInArray(data.drinksCartArray)
        console.log(multipliedDrinksArray)
        multipliedSidesArray = multiplyValuesInArray(data.sidesCartArray)
        console.log(multipliedSidesArray)

        const arrayOfAll = [multipliedAddOnsArray, [multipliedTortillasArray], multipliedEggsAndMoreArray, multipliedDrinksArray, multipliedSidesArray]
        // const arrayOfAll = [multipliedAddOnsArray, [multipliedTortillasArray], multipliedEggsAndMoreArray, multipliedDrinksArray]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);

        console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(arrayOfAll)
        console.log(sumResultAll)

        protein = sumResultAll.protein;
        carbohydrates =  sumResultAll.totalCarbohydrates;
        fat = sumResultAll.totalFat;
        calories = sumResultAll.calories;
        console.log(protein, carbohydrates, fat, calories)


        // if(multipliedArray[i] !== undefined){
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     calories = multipliedArray[i].calories;
        console.log(protein, carbohydrates, fat, calories)
        let stats= ([
            {name: "Protein", value: protein, minimumRecommended: 40, max: 70},
            {name: "Carbs", value: carbohydrates, minimumRecommended: 60, max: 120},
            {name: "Fats", value: fat, minimumRecommended: 50, max: 120},
            {name: "Calories", value: calories, minimumRecommended: 300, max: 1000}])
        console.log(
            "name: Protein, value:", protein,
            "name: Carbs, value:", carbohydrates,
            "name: Fats, value:", fat,
            "name: Calories, value:", calories)

        if (protein > 0 || carbohydrates > 0 || fat > 0 || calories > 0) {
            console.log("Returning!!22")
            return (
                <div style={{width: "4em", margin: "auto"}}>
                    {/*<div style={{fontSize: ".7rem",}}>*/}
                    {/*    <div>Protein {formatToTwoDecimalPlaces(protein)} g</div>*/}
                    {/*    <div>Carbohydrates {formatToTwoDecimalPlaces(carbohydrates)} g</div>*/}
                    {/*    <div>Fat {formatToTwoDecimalPlaces(fat)} g</div>*/}
                    {/*    <div>Calories {formatToTwoDecimalPlaces(calories)}</div>*/}
                    {/*</div>*/}

                    <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>{calories} cals</div>

                    {macroStats !== [] && (
                        <NutrientProgressBar
                            nutritionData={stats}

                        />

                    )}

                </div>


            );
        }
        // }else {
        //     console.log("else")
        //     return <div>else</div>;
        // }



    }

    function calculateAndRenderDrinksNutritionProfile(addOn) {


        function multiplyValuesInArray(item) {
            const multipliedItem = {};


            Object.keys(item).forEach((key) => {
                const originalValue = item[key];
                const numericValue = Number(originalValue);
                // console.log(key,numericValue, item)
                // const mult = 1;
                const mult = item.comboAmount === 0 || item.comboAmount === undefined ? (1):(item.comboAmount)

                if (!isNaN(numericValue)
                    && key !== "gramsPerTbsp"
                    && key !== "price"
                    && key !== "total"
                    && key !== "servingSizeGrams"
                    && key !== "unitAmount"
                    && key !==  "unitPrice"
                    && key !== "unitGramsOrCups"
                    && key !== "comboAmount"
                ) {
                    // console.log(item)

                    switch (item.unitGramsOrCups) {

                        case "oz":
                            multipliedItem[key] = numericValue * mult * item.unitAmount ;
                            break;
                        case "item":
                            multipliedItem[key] = numericValue * mult * item.unitAmount ;
                            break;
                        case "grams":
                            multipliedItem[key] = numericValue  * mult *  (item.unitAmount/item.servingSizeGrams) ;
                            // multipliedItem[key] = numericValue * item.comboAmount * (item.unitAmount/item.servingSizeGrams) ;
                            break;
                        case "tsp":
                            multipliedItem[key] = numericValue * mult * (((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount)/3) ;
                            break;
                        case "tbsp":
                            multipliedItem[key] = numericValue * mult * ((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount) ;
                            break;
                        case "cups":
                            multipliedItem[key] = (numericValue * ((item.gramsPerTbsp/item.servingSizeGrams)*16)*mult) ;

                            break;
                    }
                } else {
                    multipliedItem[key] = originalValue;
                }
            });

            return multipliedItem;
        }

        function sumValuesInArray(arrayOfObjects) {
            // Initialize an object to store the sum
            const sumObject = {};

            // Iterate through each object in the array
            arrayOfObjects.forEach((obj) => {
                // Iterate through each key in the object
                Object.keys(obj).forEach((key) => {
                    // Convert the value to a number and add it to the sum
                    const numericValue = Number(obj[key]);
                    if (!isNaN(numericValue)) {
                        sumObject[key] = (sumObject[key] || 0) + numericValue;
                    }
                });
            });

            // Return the object with summed values
            return sumObject;
        }

        let amount, sumResult, ingredientNutrition, multipliedAddOn;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat, price, carbohydrates = 0;


        // console.log(data)

        multipliedAddOn = multiplyValuesInArray(addOn);


        {
            protein = multipliedAddOn.protein;
            carbohydrates = multipliedAddOn.totalCarbohydrates;
            fat = multipliedAddOn.totalFat;
            calories = multipliedAddOn.calories;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories,)
            let stats = ([
                {name: "Protein", value: protein, minimumRecommended: 40, max: 70},
                {name: "Carbs", value: carbohydrates, minimumRecommended: 60, max: 120},
                {name: "Fats", value: fat, minimumRecommended: 50, max: 120},
                {name: "Calories", value: calories, minimumRecommended: 500, max: 1000}])
            console.log(
                "name: Protein, value:", protein,
                "name: Carbs, value:", carbohydrates,
                "name: Fats, value:", fat,
                "name: Calories, value:", calories)

            if (protein > 0 || carbohydrates > 0 || fat > 0 || calories > 0) {
                console.log("Returning!!")
                return (
                    <div>
                        {/*<div style={{fontSize: ".7rem",}}>*/}
                        {/*    <div>Protein {formatToTwoDecimalPlaces(protein)} g</div>*/}
                        {/*    <div>Carbohydrates {formatToTwoDecimalPlaces(carbohydrates)} g</div>*/}
                        {/*    <div>Fat {formatToTwoDecimalPlaces(fat)} g</div>*/}
                        {/*    <div>Calories {formatToTwoDecimalPlaces(calories)}</div>*/}
                        {/*</div>*/}
                        <div style={{
                            fontSize: ".7rem",
                            width: "fit-content",
                            margin: "auto"
                        }}>{formatToTwoDecimalPlaces(calories)} cals
                            <IonIcon icon={chevronForwardOutline}/>
                            <IonIcon icon={chevronDownOutline}/>
                        </div>

                        {macroStats !== [] && (
                            <NutrientProgressBar
                                nutritionData={stats}

                            />

                        )}

                    </div>


                );
            } else {
                console.log("else 3")
                return null;
            }


            return null;
        }


    }



    function renderCustomizableCartMealComponent(){

        console.log(data)
        tortillaTotal = 0;
        mainIngredientsTotal = 0;
        addOnsTotal = 0;
        drinksTotal = 0;
        sidesTotal = 0;
        tortillaTotal = data.tortillaOptionsArray.comboAmount * data.tortillaOptionsArray.unitPrice;

        data.mainIngredientsCartArray.map((addOn) => {
            mainIngredientsTotal += addOn.comboAmount * addOn.unitPrice
        })
        data.addOnsCartArray?.map((addOn) => {
            addOnsTotal += addOn.comboAmount * addOn.unitPrice
        })
        data.drinksCartArray?.map((addOn) => {
            drinksTotal += addOn.comboAmount * addOn.unitPrice
        })
        data.sidesCartArray?.map((addOn) => {
            sidesTotal += addOn.comboAmount * addOn.unitPrice
        })

        entreeTotal = tortillaTotal + mainIngredientsTotal + addOnsTotal;
        console.log("Cart Array!", cartArray)

        return (
            <div>

                {minimizeOrder ? (
                    <div>
                        <IonIcon
                            onClick={() => setMinimizeOrder(false)}
                            style={{
                                position: "absolute",
                                cursor: "pointer",
                                right: ".6em",
                                fontSize: "1.5rem",
                                zIndex: "10",
                            }} icon={addOutline}></IonIcon>
                        <OrderCartMealComponent
                            i={i}
                            data={cartArray[i]}
                        />
                        {/*<CartItemPageCartComponent sidesCartArray={data.sidesCartArray}*/}
                        {/*                           mainIngredientsCartArray={data.mainIngredientsCartArray}*/}
                        {/*                           addOnsCartArray={data.addOnsCartArray}*/}
                        {/*                           drinksCartArray={data.drinksCartArray}*/}
                        {/*                           tortillaOptionsArray={data.tortillaOptionsArray}*/}
                        {/*/>*/}
                    </div>

                ):(
                    <div style={{display: "flex",
                        // flexDirection: showDrinkMenu || showSidesMenu === true ? ("column"):("row")
                        flexDirection: "column",
                        marginBottom : ".5em",
                    }}>
                        <div style={{textAlign: "center", fontSize: "1.2rem", }}>
                            Meal # {i+1}
                        </div>


                        <IonCard
                            color="medium"
                            style={{height: "fit-content",
                                width: "99%",
                                margin: "auto"
                            }} fill="outline" expand="block"

                            // onClick={() => setCarouselStep("more")}
                        >
                            <IonIcon
                                onClick={() => setMinimizeOrder(true)}
                                style={{
                                    position: "absolute",
                                    cursor: "pointer",
                                    right: "2em",
                                    top: "1em",
                                    color: "black",
                                    fontColor: "black",
                                    fontSize: "1.5rem",
                                    zIndex: "10",
                                    // backgroundColor:"blue",
                                }} icon={remove}></IonIcon>
                            <IonItem button={true} lines="none" style={{  width:"100%"}}>



                                <IonList style={{width: "100%",}}>


                                    <div style={{width:"100%",

                                        textAlign: "center", marginTop:".5em", marginBottom:".5em"}}>
                                        <div style={{fontSize: "1.2rem"}}>
                                            {data.menuItemName}
                                        </div>

                                    </div>


                                    <div style={{
                                        height: "auto",
                                        width: "6em",
                                        fontSize: ".7rem",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        overflow: "hidden",
                                        position: "relative",
                                        margin: "auto",
                                    }}

                                    >

                                        <img style={{ width: "100%",  objectFit: "cover" }} src={data.menuItemImgUrl} alt="music" />
                                    </div>
                                    <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green", width:"fit-content",margin:"auto"}}>
                                        ${(data.entreeTotal).toFixed(2)}
                                    </div>
                                    {calculateCartNutritionTotals()}

                                </IonList>
                            </IonItem>


                        </IonCard>

                        {showDrinkMenu ? (
                            <IonCard style={{ width: "99%", margin: "auto"}}>

                                <IonCardHeader style={{display:"flex", textAlign: "center", fontSize: "1.1rem"}}>
                                    <div>
                                        Drinks
                                    </div>
                                    <IonIcon
                                        onClick={() => setShowDrinkMenu(!showDrinkMenu)}
                                        style={{position: "absolute", cursor: "pointer",  right:  "1.5em", fontSize:"1.5rem"}}icon={remove}></IonIcon>

                                </IonCardHeader>
                                <IonCardContent>
                                    <div style={{
                                        overflowX: "scroll",
                                        // flexWrap: "wrap"
                                        // backgroundColor: "red",
                                        // margin: "auto",
                                        width: "100%",
                                        backgroundColor: "#e1e4e7",
                                        display: "flex",
                                        // gridTemplateColumns:  "1fr 1fr 1fr",
                                        // flex: "1 1 50%",
                                        // flexDirection:"column",
                                        // flexBasis: "content",
                                        // flexWrap: "wrap",
                                        // overflowY: "scroll",
                                        // overflow: "hidden",
                                        height:"100%",
                                        padding: 0,

                                    }}>
                                        {drinksFromFirebase.map((addOn, i) => (
                                            // <div style={{ width:"fit-content", }}>

                                            <CartDrinksComponent
                                                data={addOn}
                                                cartArray={cartArray}
                                                setCartArray={setCartArray}
                                                cartIndex={cartIndex}
                                                i={i}
                                                key={i}
                                                addOnsFromFirebase={drinksFromFirebase}
                                                setAddOnsCartArray={setDrinksCartArray}
                                                addOnsCartArray={drinksCartArray}
                                            />
                                            // </div>

                                        ))}
                                    </div>

                                    <IonButton fill="outline" expand="block"
                                               // onClick={() => setCarouselStep("drinks")}
                                    >+ Drinks</IonButton>

                                </IonCardContent>
                            </IonCard>

                        ):(
                            <IonButton
                                color="medium"
                                style={{height: "fit-content",
                                    width: "99%",
                                }} fill="outline" expand="block" onClick={() => setShowDrinkMenu(!showDrinkMenu)}>
                                <IonItem button={true} lines="none" style={{
                                    display: "flex",flexDirection: "column",width:"100%", padding: "0"}}>

                                    <IonList style={{width: "100%", padding: "0"}}>
                                        <div style={{width:"100%", textAlign: "center"}}>
                                            <div>
                                                Drinks
                                            </div>
                                            <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green"}}>
                                                ${parseFloat(drinksTotal)}
                                            </div>


                                        </div>
                                        <div style={{display:"flex", width: "100%", margin: "auto", overflowX: "scroll",

                                            paddingBottom: "1em"
                                        }}>
                                            {data.drinksCartArray.map((addOn, i) => (

                                                <div  style={{display: "flex", flexDirection: "column",
                                                }}>
                                                    <div style={{width:"2em", height:"fit-content", margin: "auto"}}>
                                                        <img style={{objectFit:"contain"}} src={addOn.imgUrl} />

                                                    </div>
                                                    <div style={{textAlign:"center",
                                                        // backgroundColor: "blue",
                                                        fontSize:".7rem",
                                                    }}>
                                                        <div style={{
                                                            width: "8em",
                                                            // backgroundColor:"red",
                                                            height:"4em",
                                                            whiteSpace: "pre-wrap"


                                                        }}>
                                                            {addOn.ingredientName}

                                                        </div>
                                                        {calculateAndRenderDrinksNutritionProfile(addOn)}


                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </IonList>


                                </IonItem>

                            </IonButton>

                        )}
                        {showSidesMenu ? (
                            <IonCard style={{width: "99%", margin: 'auto'}}>

                                <IonCardHeader style={{display:"flex", textAlign: "center", fontSize: "1.1rem"}}>
                                    <div>
                                        Sides
                                    </div>
                                    <IonIcon
                                        onClick={() => setShowSidesMenu(!showSidesMenu)}
                                        style={{position: "absolute", cursor: "pointer",  right:  "1.5em", fontSize:"1.5rem"}}icon={remove}></IonIcon>

                                </IonCardHeader>
                                <IonCardContent>
                                    <div style={{
                                        overflowX: "scroll",
                                        // flexWrap: "wrap"
                                        // backgroundColor: "red",
                                        // margin: "auto",
                                        width: "100%",
                                        backgroundColor: "#e1e4e7",
                                        display: "flex",
                                        // gridTemplateColumns:  "1fr 1fr 1fr",
                                        // flex: "1 1 50%",
                                        // flexDirection:"column",
                                        // flexBasis: "content",
                                        // flexWrap: "wrap",
                                        // overflowY: "scroll",
                                        // overflow: "hidden",
                                        height:"100%",
                                        padding: 0,

                                    }}>
                                        {sidesFromFirebase.map((addOn, i) => (
                                            // <div style={{ width:"fit-content", }}>

                                            <CartSidesComponent
                                                // options={"tortilla-options"}
                                                data={addOn}
                                                // chosenOption={cho}
                                                cartArray={cartArray}
                                                setCartArray={setCartArray}
                                                cartIndex={cartIndex}
                                                i={i}
                                                key={i}
                                                addOnsFromFirebase={sidesFromFirebase}
                                                setAddOnsCartArray={setSidesCartArray}
                                                addOnsCartArray={sidesCartArray}
                                            />
                                            // </div>

                                        ))}
                                    </div>

                                    <IonButton fill="outline" expand="block"
                                               // onClick={() => setCarouselStep("sides")}
                                    >+ Sides</IonButton>

                                </IonCardContent>
                            </IonCard>

                        ):(
                            <IonButton style={{height: "fit-content",
                                width: "99%",
                            }}
                                       fill="outline"
                                       color="medium"
                                       expand="block" onClick={() => setShowSidesMenu(!showSidesMenu)}>
                                <IonItem button={true} lines="none" style={{  display: "flex", backgroundColor:"black",
                                    flexDirection: "column",
                                    width:"100%"
                                }}
                                >

                                    <IonList style={{width: "100%",}}>
                                        <div style={{width:"100%", textAlign: "center"}}>
                                            <div>
                                                Sides
                                            </div>
                                            <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green"}}>
                                                ${parseFloat(sidesTotal)}
                                            </div>
                                        </div>
                                        <div style={{display:"flex", width: "90%", margin: "auto",
                                            paddingBottom: "1em",
                                            overflowX: "scroll",}}>
                                            {data.sidesCartArray.map((addOn, i) => (

                                                <div  style={{display: "flex", flexDirection: "column",}}>
                                                    <div style={{width:"2em", height:"fit-content", margin:"auto"}}>
                                                        <img style={{objectFit:"contain"}} src={addOn.imgUrl} />

                                                    </div>
                                                    <div style={{textAlign:"center",
                                                        // backgroundColor: "blue",
                                                        fontSize:".7rem",
                                                    }}>
                                                        <div style={{
                                                            width: "8em",
                                                            // backgroundColor:"red",
                                                            height:"4em",
                                                            whiteSpace: "pre-wrap"

                                                        }}>
                                                            {addOn.ingredientName}

                                                        </div>

                                                    </div>
                                                    {calculateAndRenderDrinksNutritionProfile(addOn)}

                                                </div>
                                            ))}
                                        </div>
                                    </IonList>


                                </IonItem
                                >
                            </IonButton>
                        )}

                    </div>

                )}



                {/*<CartItemPageCartComponent sidesCartArray={sidesCartArray}*/}
                {/*                           mainIngredientsCartArray={data.mainIngredientsCartArray}*/}
                {/*                           addOnsCartArray={data.addOnsCartArray}*/}
                {/*                           drinksCartArray={drinksCartArray}*/}
                {/*                           tortillaOptionsArray={data.tortillaOptionsArray}*/}
                {/*                           />*/}



            </div>
        )
    }

    return (<div>
        {renderCustomizableCartMealComponent()}
    </div>)
}