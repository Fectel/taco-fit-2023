import React, {useEffect, useRef, useState} from "react"
import {
    IonList,
    IonItem,
    IonBackdrop,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonSelect,
    IonSelectOption
} from "@ionic/react";
import {
    addMainMenuItemPicture,
    addToppingToCustomDatabase,
    deleteCustomDoc,
    loadAnyCollectionData,
    loadAnyDocData
} from "../../../firebase";
import {
    add,
    addCircleOutline as addIcon, addOutline,
    arrowDown,
    chevronDownOutline,
    chevronForwardOutline,
    createOutline as editIcon,
    expand, informationCircleOutline, remove,
    removeCircleOutline as subtractIcon, removeOutline,
    searchCircleOutline as searchIcon,
    trashOutline as deleteIcon
} from "ionicons/icons";
import {AddIngredientNutritionalFacts} from "../../recipes-page/recipes-page-components";
import NutrientProgressBar from "../nutrient-progress-bar/nutrient-progress-bar";
import NutritionProgressCircles from "../nutrition-progress-cricles/nutrition-progress-circles";
import OrderSummaryComponent from "../order-summary/order-summary-component";
import CartSummaryComponent from "../cart-summary-component/cart-summary-component";
import CartOrderSummaryComponent from "../order-summary/cart-order-summary-component";



export default function BurritoMakerComponent({menuItemId, setCarouselStep, cartArray, setCartArray}) {

    // const [ menuItemPageSwitchCase, setMenuItemPageSwitchCase ] = useState("")
    const [menuItemPageSwitchCase, setMenuItemPageSwitchCase] = useState("tortilla-selection")
    // const [ menuItemPageSwitchCase, setMenuItemPageSwitchCase ] = useState("Which tortilla would you like?")
    const [addOnsFromFirebase, setAddOnsFromFirebase] = useState([])
    const [drinksFromFirebase, setDrinksFromFirebase] = useState([])
    const [tortillaOptionsFromFirebase, setTortillaOptionsFromFirebase] = useState([])

    const [sidesFromFirebase, setSidesFromFirebase] = useState([])
    const [sidesCartArray, setSidesCartArray] = useState([])
    const [showSidesMenu, setShowSidesMenu] = useState(false)

    const [mainIngredientsFromFirebase, setMainIngredientsFromFirebase] = useState([])
    const imageInputRef = useRef();
    const [menuItemImgUrl, setMenuItemImgUrl] = useState("")
    const [menuItemName, setMenuItemName] = useState("")

    const [tortillaOptionsArray, setTortillaOptionsArray] = useState([]);

    const [chosenTortillaOption, setChosenTortillaOption] = useState("")

    const [mainIngredientsCartArray, setMainIngredientsCartArray] = useState([])

    const [addOnsCartArray, setAddOnsCartArray] = useState([])
    const [drinksCartArray, setDrinksCartArray] = useState([])
    const [eggsAndMoreCartArray, setEggsAndMoreCartArray] = useState([])

    const [eggsAndMoreFromFirebase, setEggsAndMoreFromFirebase] = useState([])

    const [addOnsChange, setAddOnsChange] = useState(false)
    const [minimizeMainIngredients, setMinimizeMainIngredients] = useState(true)
    const [minimizeAddOns, setMinimizeAddOns] = useState(false)
    const [showDrinkMenu, setShowDrinkMenu] = useState(false)

    const [macroStats, setMacroStats] = useState([])

    useEffect(() => {

        console.log(addOnsFromFirebase)
        if (addOnsFromFirebase.length === 0) {
            console.log("Loading Add Ons From FB")
            loadAddOnsFromFirebase()
        }

        loadMenuItemImg()
        console.log(tortillaOptionsArray, addOnsCartArray)
        // console.log(addOnsCartArray)
    }, [tortillaOptionsArray, addOnsCartArray, drinksCartArray])

    async function loadAddOnsFromFirebase() {
        const resultAddOns = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/addOns`)
        let addOnsTemp = [];

        console.log("loadAddOnsFromFirebase", resultAddOns)
        resultAddOns.docs.map(doc => {
            addOnsTemp = [...addOnsTemp, doc.data()]
            console.log(doc.data())

        })
        console.log(addOnsFromFirebase, addOnsTemp)
        setAddOnsFromFirebase([...addOnsTemp])

        const resultTortillaOptions = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/tortilla-options`)
        let tortillaOptionsTemp = [];

        console.log("loadTortillaOptionsFromFirebase", resultTortillaOptions)
        resultTortillaOptions.docs.map(doc => {
            tortillaOptionsTemp = [...tortillaOptionsTemp, doc.data()]
            console.log(doc.data(), tortillaOptionsTemp)

        })
        console.log(tortillaOptionsFromFirebase, tortillaOptionsTemp)
        setTortillaOptionsFromFirebase([...tortillaOptionsTemp])


        const resultEggsAndMoreOptions = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/eggs-and-more-options`)
        let eggsAndMoreOptionsTemp = [];

        console.log("load eggs and more", resultEggsAndMoreOptions)
        resultEggsAndMoreOptions.docs.map(doc => {
            eggsAndMoreOptionsTemp = [...eggsAndMoreOptionsTemp, doc.data()]
            console.log(doc.data(), eggsAndMoreOptionsTemp)

        })
        console.log(eggsAndMoreFromFirebase, eggsAndMoreOptionsTemp)
        setEggsAndMoreFromFirebase([...eggsAndMoreOptionsTemp])

        const resultMainIngredientOptions = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/main-ingredient-options`)
        let mainIngredientOptionsTemp = [];

        console.log("load main ingredients", resultMainIngredientOptions)
        resultMainIngredientOptions.docs.map(doc => {
            mainIngredientOptionsTemp = [...mainIngredientOptionsTemp, doc.data()]
            console.log(doc.data(), mainIngredientOptionsTemp)

        })
        console.log(mainIngredientsFromFirebase, mainIngredientOptionsTemp)
        setMainIngredientsFromFirebase([...mainIngredientOptionsTemp])

        const resultDrinkOptions = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/drinks`)
        let drinkOptionsTemp = [];

        console.log("load main ingredients", resultDrinkOptions)
        resultDrinkOptions.docs.map(doc => {
            drinkOptionsTemp = [...drinkOptionsTemp, doc.data()]
            console.log(doc.data(), drinkOptionsTemp)

        })
        console.log(drinksFromFirebase, drinkOptionsTemp)
        setDrinksFromFirebase([...drinkOptionsTemp])

        const resultSidesOptions = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/sides`)
        let sidesOptionsTemp = [];

        console.log("load sides ingredients", resultSidesOptions)
        resultDrinkOptions.docs.map(doc => {
            sidesOptionsTemp = [...sidesOptionsTemp, doc.data()]
            console.log(doc.data(), sidesOptionsTemp)

        })
        console.log(sidesFromFirebase, sidesOptionsTemp)
        setSidesFromFirebase([...sidesOptionsTemp])
    }

    const handleFileChangeImage = async (event) => {

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrl = await addMainMenuItemPicture(pictureUrlConst, menuItemId,)

            console.log(imgUrl)
            setMenuItemImgUrl(imgUrl)

        }

    };

    async function loadMenuItemImg() {
        const result = await loadAnyDocData(`/recipes-collection/${menuItemId}`)

        console.log(result.data())
        setMenuItemImgUrl(result.data().recipeImgUrl)
        setMenuItemName(result.data().recipeName)
    }

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

    function calculateCartNutritionTotals() {
        console.log(addOnsCartArray, "CALCULATING cart NUTRITION TOTALS")
        console.log(addOnsCartArray)
        let sumResult, sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray,
            multipliedDrinksArray, multipliedSidesArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat, carbohydrates = 0;


        multipliedAddOnsArray = multiplyValuesInArray(addOnsCartArray);
        console.log(multipliedAddOnsArray);
        multipliedTortillasArray = (tortillaOptionsArray);
        console.log(multipliedTortillasArray, tortillaOptionsArray);
        multipliedEggsAndMoreArray = multiplyValuesInArray(mainIngredientsCartArray);
        console.log(multipliedEggsAndMoreArray);
        multipliedDrinksArray = multiplyValuesInArray(drinksCartArray)
        console.log(multipliedDrinksArray)
        multipliedSidesArray = multiplyValuesInArray(sidesCartArray)
        console.log(multipliedSidesArray)

        const arrayOfAll = [multipliedAddOnsArray, [multipliedTortillasArray], multipliedEggsAndMoreArray,]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);

        console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(arrayOfAll)
        console.log(sumResultAll)

        protein = sumResultAll.protein;
        carbohydrates = sumResultAll.totalCarbohydrates;
        fat = sumResultAll.totalFat;
        calories = sumResultAll.calories;
        console.log(protein, carbohydrates, fat, calories)


        // if(multipliedArray[i] !== undefined){
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     calories = multipliedArray[i].calories;
        console.log(protein, carbohydrates, fat, calories)
        let stats = ([
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

                    <div style={{fontSize: ".7rem", width: "fit-content", margin: "auto"}}>{calories} cals</div>

                    <NutrientProgressBar
                        nutritionData={stats}

                    />


                </div>


            );
        }
        // }else {
        //     console.log("else")
        //     return <div>else</div>;
        // }


    }

    function calculateSidesNutritionTotals() {
        console.log(addOnsCartArray, "CALCULATING cart NUTRITION TOTALS")
        console.log(addOnsCartArray)
        let sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray,
            multipliedDrinksArray, multipliedSidesArray;


        let calories, protein, fat, carbohydrates = 0;


        multipliedSidesArray = multiplyValuesInArray(sidesCartArray)
        console.log(multipliedSidesArray)

        const arrayOfAll = [multipliedSidesArray]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);

        console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(arrayOfAll)
        console.log(sumResultAll)

        protein = sumResultAll.protein;
        carbohydrates = sumResultAll.totalCarbohydrates;
        fat = sumResultAll.totalFat;
        calories = sumResultAll.calories;
        console.log(protein, carbohydrates, fat, calories)


        // if(multipliedArray[i] !== undefined){
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     calories = multipliedArray[i].calories;
        console.log(protein, carbohydrates, fat, calories)
        let stats = ([
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

                    <div style={{fontSize: ".7rem", width: "fit-content", margin: "auto"}}>{calories} cals</div>

                    <NutrientProgressBar
                        nutritionData={stats}

                    />


                </div>


            );
        }
        // }else {
        //     console.log("else")
        //     return <div>else</div>;
        // }


    }

    function calculateDrinksNutritionTotals() {

        let sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray,
            multipliedDrinksArray, multipliedSidesArray;


        let calories, protein, fat, carbohydrates = 0;


        multipliedDrinksArray = multiplyValuesInArray(drinksCartArray)
        console.log(multipliedDrinksArray)

        const arrayOfAll = [multipliedDrinksArray]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);

        console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(arrayOfAll)
        console.log(sumResultAll)

        protein = sumResultAll.protein;
        carbohydrates = sumResultAll.totalCarbohydrates;
        fat = sumResultAll.totalFat;
        calories = sumResultAll.calories;
        console.log(protein, carbohydrates, fat, calories)


        // if(multipliedArray[i] !== undefined){
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     calories = multipliedArray[i].calories;
        console.log(protein, carbohydrates, fat, calories)
        let stats = ([
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

                    <div style={{fontSize: ".7rem", width: "fit-content", margin: "auto"}}>{calories} cals</div>

                    <NutrientProgressBar
                        nutritionData={stats}

                    />


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

        function renderMenuItemPage() {
            console.log(tortillaOptionsFromFirebase)
            console.log(eggsAndMoreFromFirebase)
            console.log(addOnsFromFirebase)
            console.log(tortillaOptionsArray)
            console.log(addOnsCartArray)
            console.log(menuItemPageSwitchCase)

            let tortillaTotal = 0;
            let mainIngredientsTotal = 0;
            let addOnsTotal = 0;
            let drinksTotal = 0;
            let sidesTotal = 0;
            let entreeTotal;

            switch (menuItemPageSwitchCase) {

                case "":
                    return (<div style={{
                            display: "flex",
                            width: "100%",
                            backgroundColor: "#7bee6f",
                            padding: "1em",
                            boxSizing: "border-box",
                        }}>


                            <IonCard style={{
                                width: "100%",
                                height: "95%",
                                margin: "auto",
                                position: "relative",
                            }}>
                                <IonCardTitle style={{
                                    textAlign: "center",
                                    marginTop: "1em",
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                }}>
                                    {menuItemName}
                                </IonCardTitle>
                                <div style={{
                                    position: "absolute",
                                    top: "1em",
                                    right: "1em",
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                }}
                                     onClick={() => setCarouselStep("")}
                                >X
                                </div>


                                <IonCardContent style={{padding: ".1em",}}>
                                    <div style={{
                                        height: "fit-content",
                                        width: "100%",
                                        fontSize: ".7rem",
                                        // border: "solid thin",
                                        // margin: ".7em .3em",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        overflow: "hidden",
                                        // backgroundColor: "red",
                                        position: "relative",
                                    }}
                                        // onClick={() => imageInputRef.current.click()}
                                    >
                                        {/*<input type="file" accept="image/*" hidden*/}
                                        {/*       ref={imageInputRef}*/}
                                        {/*       onChange={handleFileChangeImage}*/}
                                        {/*/>*/}

                                        {/*{menuItemImgUrl === "" ? (*/}
                                        {/*    <div style={{*/}
                                        {/*        width: "100%",*/}
                                        {/*        height: "100%",*/}
                                        {/*        display: "flex",*/}
                                        {/*        justifyContent: "center",*/}
                                        {/*        alignItems: "center",*/}
                                        {/*        color: "gray",*/}
                                        {/*    }}>+ Add Image</div>*/}
                                        {/*) : (*/}
                                        <img style={{width: "100%", height: "15em", objectFit: "cover"}}
                                             src={menuItemImgUrl} alt="music"/>
                                        {/*)}*/}
                                    </div>


                                    <IonCard style={{
                                        marginBottom: "1em",
                                    }}>

                                        {tortillaOptionsFromFirebase.length > 1 ? (
                                            <div style={{display: "flex"}}>
                                                <div style={{
                                                    fontSize: "1.4rem",
                                                    lineHeight: "1.7em",
                                                    textAlign: "center",
                                                }}>Choose Your Tortilla
                                                </div>
                                                <IonButton
                                                    // onClick={() => setRecipeIngredientComponentState("add")}
                                                    size="small">
                                                    <div>
                                                        <IonIcon size="small" icon={addIcon}/>


                                                    </div>
                                                </IonButton>
                                            </div>

                                        ) : (
                                            <div style={{
                                                fontSize: "1.4rem",
                                                lineHeight: "1.7em",
                                                textAlign: "center"
                                            }}>Tortilla
                                            </div>
                                        )}

                                        <div style={{
                                            display: "flex",
                                            overflowX: "auto",
                                            // flexWrap: "wrap"
                                            margin: "auto",
                                            width: "100%",
                                            flexDirection: "row",

                                        }}>
                                            {tortillaOptionsFromFirebase.map((addOn, i) => (
                                                // <div style={{ width:"fit-content", }}>

                                                <ChooseComponent
                                                    options={"tortilla-options"}
                                                    data={addOn}
                                                    chosenOption={chosenTortillaOption}
                                                    i={i}
                                                    key={i}
                                                    setChosenOption={setChosenTortillaOption}
                                                    addOnsFromFirebase={tortillaOptionsFromFirebase}
                                                    setAddOnsCartArray={setTortillaOptionsArray}
                                                    addOnsCartArray={tortillaOptionsArray}
                                                />
                                                // </div>

                                            ))}
                                        </div>

                                        <IonButton fill="outline" expand="block"
                                                   onClick={() => setMenuItemPageSwitchCase("tortilla-options")}>+ Add
                                            Tortilla Options</IonButton>

                                        {eggsAndMoreFromFirebase.length > 1 ? (
                                            <div style={{fontSize: "1.5rem", textAlign: "center",}}>Eggs and more</div>
                                        ) : (
                                            <div style={{fontSize: "1.5rem", textAlign: "center",}}>Eggs and more</div>
                                        )}

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
                                            height: "100%",
                                            padding: 0,

                                        }}>
                                            {eggsAndMoreFromFirebase.map((addOn, i) => (
                                                // <div style={{ width:"fit-content", }}>

                                                <AddOnComponent
                                                    // options={"tortilla-options"}
                                                    data={addOn}
                                                    // chosenOption={cho}
                                                    i={i}
                                                    key={i}
                                                    addOnsFromFirebase={eggsAndMoreFromFirebase}
                                                    setAddOnsCartArray={setEggsAndMoreCartArray}
                                                    addOnsCartArray={eggsAndMoreCartArray}
                                                />
                                                // </div>

                                            ))}
                                        </div>

                                        <IonButton fill="outline" expand="block"
                                                   onClick={() => setMenuItemPageSwitchCase("eggsAndMore")}>+ Add
                                            More</IonButton>

                                        {addOnsFromFirebase.length > 1 ? (
                                            <div style={{fontSize: "1.5rem", textAlign: "center",}}>Add Ons</div>
                                        ) : (
                                            <div style={{fontSize: "1.5rem", textAlign: "center",}}>Add Ons</div>
                                        )}

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
                                            height: "100%",
                                            padding: 0,

                                        }}>
                                            {addOnsFromFirebase.map((addOn, i) => (
                                                // <div style={{ width:"fit-content", }}>

                                                <AddOnComponent
                                                    // options={"tortilla-options"}
                                                    data={addOn}
                                                    // chosenOption={cho}
                                                    i={i}
                                                    key={i}
                                                    addOnsFromFirebase={addOnsFromFirebase}
                                                    setAddOnsCartArray={setAddOnsCartArray}
                                                    addOnsCartArray={addOnsCartArray}
                                                />
                                                // </div>

                                            ))}
                                        </div>

                                        <IonButton fill="outline" expand="block"
                                                   onClick={() => setMenuItemPageSwitchCase("addOns")}>+ Add
                                            Ons</IonButton>
                                    </IonCard>

                                    <IonCard>
                                        {/* Additional premium add-ons or other sections go here */}
                                    </IonCard>

                                    {/* More card sections if needed */}

                                    <ItemPageCartComponent
                                        tortillaOptionsArray={tortillaOptionsArray}
                                        eggsAndMoreCartArray={eggsAndMoreCartArray}
                                        addOnsCartArray={addOnsCartArray}
                                        setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                                    />

                                </IonCardContent>
                            </IonCard>
                        </div>


                    )
                case "addOns":
                    return <AddOnsPage
                        addOnsFromFirebase={addOnsFromFirebase}
                        setAddOnsFromFirebase={setAddOnsFromFirebase}
                        setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                        addOnsCartArray={addOnsCartArray}
                        setAddOnsCartArray={setAddOnsCartArray}
                        menuItemId={menuItemId}
                    />
                case "drinks":
                    return <DrinksPage
                        addOnsFromFirebase={drinksFromFirebase}
                        setAddOnsFromFirebase={setDrinksFromFirebase}
                        setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                        addOnsCartArray={drinksCartArray}
                        setAddOnsCartArray={setDrinksCartArray}
                        menuItemId={menuItemId}
                    />
                case "sides":
                    return <SidesPage
                        addOnsFromFirebase={sidesFromFirebase}
                        setAddOnsFromFirebase={setSidesFromFirebase}
                        setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                        addOnsCartArray={sidesCartArray}
                        setAddOnsCartArray={setSidesCartArray}
                        menuItemId={menuItemId}
                    />
                case "main-ingredient-options":
                    return <MainIngredientsPage
                        addOnsFromFirebase={mainIngredientsFromFirebase}
                        setAddOnsFromFirebase={setMainIngredientsFromFirebase}
                        setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                        addOnsCartArray={mainIngredientsCartArray}
                        setAddOnsCartArray={setMainIngredientsCartArray}
                        menuItemId={menuItemId}
                    />

                case "eggsAndMore":
                    return <EggsAndMoreOptionsPage
                        addOnsFromFirebase={eggsAndMoreFromFirebase}
                        setAddOnsFromFirebase={setEggsAndMoreFromFirebase}
                        setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                        addOnsCartArray={eggsAndMoreCartArray}
                        setAddOnsCartArray={setEggsAndMoreCartArray}
                        menuItemId={menuItemId}
                    />
                case "tortilla-options":
                    return <TortillaOptionsPage
                        addOnsFromFirebase={tortillaOptionsFromFirebase}
                        setAddOnsFromFirebase={setTortillaOptionsFromFirebase}
                        setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                        addOnsCartArray={tortillaOptionsArray}
                        setAddOnsCartArray={setTortillaOptionsArray}
                        menuItemId={menuItemId}
                    />
                case "tortilla-selection":
                    return (
                        <IonCard>
                            <IonCardHeader>
                                <IonCard style={{
                                    width: "100%",
                                    height: "95%",
                                    margin: "auto",
                                    position: "relative",
                                }}>
                                    <IonCardTitle style={{
                                        textAlign: "center",
                                        marginTop: "1em",
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}>
                                        {menuItemName}
                                    </IonCardTitle>
                                    <div style={{
                                        position: "absolute",
                                        top: "1em",
                                        right: "1em",
                                        cursor: "pointer",
                                        fontSize: "1.2rem",
                                    }}
                                         onClick={() => setCarouselStep("")}
                                    >X
                                    </div>


                                    <IonCardContent style={{padding: ".1em",}}>
                                        <div style={{
                                            height: "fit-content",
                                            width: "100%",
                                            fontSize: ".7rem",
                                            // border: "solid thin",
                                            // margin: ".7em .3em",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            overflow: "hidden",
                                            // backgroundColor: "red",
                                            position: "relative",
                                        }}

                                        >

                                            <img style={{width: "100%", height: "15em", objectFit: "cover"}}
                                                 src={menuItemImgUrl} alt="music"/>
                                        </div>
                                    </IonCardContent>
                                </IonCard>

                            </IonCardHeader>
                            <IonCardContent>

                                <div>
                                    {tortillaOptionsFromFirebase.length > 1 ? (
                                        <div style={{display: "flex", textAlign: "center"}}>
                                            <IonCardTitle>Which tortilla would you like?</IonCardTitle>


                                        </div>

                                    ) : (
                                        <div style={{
                                            fontSize: "1.4rem",
                                            lineHeight: "1.7em",
                                            textAlign: "center"
                                        }}>Tortilla
                                        </div>
                                    )}

                                    <div style={{
                                        display: "flex",
                                        overflowX: "auto",
                                        // flexWrap: "wrap"
                                        margin: "auto",
                                        width: "100%",
                                        flexDirection: "row",

                                    }}>
                                        {tortillaOptionsFromFirebase.map((addOn, i) => (
                                            // <div style={{ width:"fit-content", }}>

                                            <ChooseComponent
                                                options={"tortilla-options"}
                                                data={addOn}
                                                chosenOption={chosenTortillaOption}
                                                i={i}
                                                key={i}
                                                setChosenOption={setChosenTortillaOption}
                                                addOnsFromFirebase={tortillaOptionsFromFirebase}
                                                setAddOnsCartArray={setTortillaOptionsArray}
                                                addOnsCartArray={tortillaOptionsArray}
                                            />
                                            // </div>

                                        ))}
                                    </div>

                                    <IonButton disabled={Object.keys(chosenTortillaOption).length === 0}
                                               onClick={() => setMenuItemPageSwitchCase("main-ingredients-selection")}
                                               color="warning" expand="block">Continue</IonButton>
                                    <IonButton fill="outline" expand="block"
                                               onClick={() => setMenuItemPageSwitchCase("tortilla-options")}>+ Add
                                        Tortilla Options</IonButton>

                                </div>
                                {/*<ItemPageCartComponent*/}
                                {/*    tortillaOptionsArray={tortillaOptionsArray}*/}
                                {/*    eggsAndMoreCartArray={eggsAndMoreCartArray}*/}
                                {/*    addOnsCartArray={addOnsCartArray}*/}
                                {/*    setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}*/}
                                {/*/>*/}
                            </IonCardContent>

                        </IonCard>
                    )
                case "main-ingredients-selection":
                    return (
                        <IonCard>
                            <IonCardHeader>
                                <IonCard style={{
                                    width: "100%",
                                    height: "95%",
                                    margin: "auto",
                                    position: "relative",
                                }}>
                                    <IonCardTitle style={{
                                        textAlign: "center",
                                        marginTop: "1em",
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}>
                                        {menuItemName}
                                    </IonCardTitle>
                                    <div style={{
                                        position: "absolute",
                                        top: "1em",
                                        right: "1em",
                                        cursor: "pointer",
                                        fontSize: "1.2rem",
                                    }}
                                         onClick={() => setCarouselStep("")}
                                    >X
                                    </div>


                                    <IonCardContent style={{padding: ".1em",}}>
                                        <div style={{
                                            height: "fit-content",
                                            width: "100%",
                                            fontSize: ".7rem",
                                            // border: "solid thin",
                                            // margin: ".7em .3em",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            overflow: "hidden",
                                            // backgroundColor: "red",
                                            position: "relative",
                                        }}

                                        >

                                            <img style={{width: "100%", height: "15em", objectFit: "cover"}}
                                                 src={menuItemImgUrl} alt="music"/>
                                        </div>
                                    </IonCardContent>
                                </IonCard>

                            </IonCardHeader>
                            <IonCardContent>
                                <IonButton fill="outline" expand="block" style={{height: "fit-content",}}
                                           onClick={() => setMenuItemPageSwitchCase("tortilla-selection")}>
                                    <IonItem button={true} lines="none"
                                             style={{width: "100%", display: "flex", flexDirection: "column"}}>

                                        <IonList>
                                            <IonItem style={{
                                                width: "6em",
                                                height: "3em",
                                                margin: "auto",
                                                backgroundColor: "red",
                                            }}>
                                                <img
                                                    style={{objectFit: "contain"}}
                                                    src={chosenTortillaOption.imgUrl}/>

                                            </IonItem>
                                            <div style={{
                                                textAlign: "center",
                                                // backgroundColor: "blue",
                                                width: "100%"
                                            }}>
                                                <div style={{fontSize: ".8rem", fontColor: "rgba(0,0,0,0.6)"}}>
                                                    Tortilla
                                                </div>
                                                <div style={{
                                                    // backgroundColor:"red"
                                                }}>
                                                    {chosenTortillaOption.ingredientName}

                                                </div>
                                            </div>
                                        </IonList>

                                    </IonItem>

                                </IonButton>


                                <div>


                                    <MainIngredientsComponent
                                        addOnsFromFirebase={mainIngredientsFromFirebase}
                                        setAddOnsCartArray={setMainIngredientsCartArray}
                                        addOnsCartArray={mainIngredientsCartArray}
                                        setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                                    />


                                </div>
                            </IonCardContent>

                        </IonCard>
                    )
                case "more":
                    tortillaTotal = 0;
                    mainIngredientsTotal = 0;
                    addOnsTotal = 0;
                    drinksTotal = 0;
                    sidesTotal = 0;
                    tortillaTotal = chosenTortillaOption.comboAmount * chosenTortillaOption.unitPrice;

                    mainIngredientsCartArray.map((addOn) => {
                        mainIngredientsTotal += addOn.comboAmount * addOn.unitPrice
                    })
                    addOnsCartArray.map((addOn) => {
                        addOnsTotal += addOn.comboAmount * addOn.unitPrice
                    })
                    drinksCartArray.map((addOn) => {
                        drinksTotal += addOn.comboAmount * addOn.unitPrice
                    })
                    sidesCartArray.map((addOn) => {
                        sidesTotal += addOn.comboAmount * addOn.unitPrice
                    })

                    entreeTotal = tortillaTotal + mainIngredientsTotal + addOnsTotal;

                    console.log(tortillaTotal, mainIngredientsTotal, addOnsTotal, drinksTotal, sidesTotal, entreeTotal)
                    return (
                        <IonCard>
                            <IonCardHeader>
                                <IonCard style={{
                                    width: "100%",
                                    height: "95%",
                                    margin: "auto",
                                    position: "relative",
                                }}>
                                    <IonCardTitle style={{
                                        textAlign: "center",
                                        marginTop: "1em",
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}>
                                        {menuItemName}
                                    </IonCardTitle>
                                    <div style={{
                                        position: "absolute",
                                        top: "1em",
                                        right: "1em",
                                        cursor: "pointer",
                                        fontSize: "1.2rem",
                                    }}
                                         onClick={() => setCarouselStep("")}
                                    >X
                                    </div>


                                    <IonCardContent style={{padding: ".1em",}}>
                                        <div style={{
                                            height: "fit-content",
                                            width: "100%",
                                            fontSize: ".7rem",
                                            // border: "solid thin",
                                            // margin: ".7em .3em",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            overflow: "hidden",
                                            // backgroundColor: "red",
                                            position: "relative",
                                        }}

                                        >

                                            <img style={{width: "100%", height: "15em", objectFit: "cover"}}
                                                 src={menuItemImgUrl} alt="music"/>
                                        </div>
                                    </IonCardContent>
                                </IonCard>

                            </IonCardHeader>
                            <IonList>
                                <IonButton fill="outline" expand="block" style={{height: "fit-content",}}
                                           onClick={() => setMenuItemPageSwitchCase("tortilla-selection")}>
                                    <IonItem button={true} lines="none"
                                             style={{width: "100%", display: "flex", flexDirection: "column"}}>

                                        <IonList>
                                            <IonItem style={{
                                                width: "6em",
                                                height: "3em",
                                                margin: "auto",
                                                backgroundColor: "red",
                                            }}>
                                                <img
                                                    style={{objectFit: "contain"}}
                                                    src={chosenTortillaOption.imgUrl}/>

                                            </IonItem>
                                            <div style={{
                                                textAlign: "center",
                                                // backgroundColor: "blue",
                                                width: "100%"
                                            }}>
                                                <div style={{fontSize: ".8rem", fontColor: "rgba(0,0,0,0.6)"}}>
                                                    Tortilla
                                                </div>
                                                <div style={{
                                                    // backgroundColor:"red"
                                                }}>
                                                    {chosenTortillaOption.ingredientName}

                                                </div>
                                            </div>
                                        </IonList>

                                    </IonItem>

                                </IonButton>

                                {minimizeMainIngredients ? (
                                    <IonButton fill="outline" expand="block" style={{height: "fit-content",}}
                                               onClick={() => setMinimizeMainIngredients(false)}>
                                        <IonItem button={true} lines="none" style={{width: "100%"}}>
                                            <IonList style={{width: "100%",}}>
                                                <div style={{width: "100%", textAlign: "center"}}>
                                                    <div>
                                                        Main Ingredients
                                                    </div>
                                                </div>
                                                <div style={{display: "flex", width: "100%"}}>
                                                    {mainIngredientsCartArray.map((addOn, i) => (

                                                        <div style={{display: "flex", flexDirection: "column"}}>
                                                            <div style={{width: "2em", height: "100%"}}>
                                                                <img style={{objectFit: "contain"}} src={addOn.imgUrl}/>

                                                            </div>
                                                            <div style={{
                                                                textAlign: "center",
                                                                // backgroundColor: "blue",
                                                                width: "100%"
                                                            }}>
                                                                <div style={{
                                                                    fontSize: ".7rem"
                                                                    // backgroundColor:"red"
                                                                }}>
                                                                    {addOn.ingredientName}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </IonList>

                                        </IonItem>


                                    </IonButton>

                                ) : (
                                    <IonCard>
                                        <IonCardHeader style={{display: "flex"}}>
                                            <div>
                                                Main Ingredients
                                            </div>
                                            <IonIcon
                                                onClick={() => setMinimizeMainIngredients(true)}
                                                style={{position: "absolute", right: "1.5em", fontSize: "1.5rem"}}
                                                icon={remove}></IonIcon>

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
                                                height: "100%",
                                                padding: 0,

                                            }}>
                                                {mainIngredientsFromFirebase.map((addOn, i) => (
                                                    // <div style={{ width:"fit-content", }}>

                                                    <AddOnComponent
                                                        // options={"tortilla-options"}
                                                        data={addOn}
                                                        // chosenOption={cho}
                                                        i={i}
                                                        key={i}
                                                        addOnsFromFirebase={mainIngredientsFromFirebase}
                                                        setAddOnsCartArray={setMainIngredientsCartArray}
                                                        addOnsCartArray={mainIngredientsCartArray}
                                                    />
                                                    // </div>

                                                ))}
                                            </div>

                                            <IonButton
                                                // disabled={Object.keys(chosenTortillaOption).length === 0}
                                                color="warning" expand="block">Continue</IonButton>

                                            <IonButton fill="outline" expand="block"
                                                       onClick={() => setMenuItemPageSwitchCase("eggsAndMore")}>+ Add
                                                More</IonButton>

                                        </IonCardContent>
                                    </IonCard>
                                )}

                                {minimizeAddOns ? (
                                    <IonButton fill="outline" expand="block" style={{height: "fit-content",}}
                                               onClick={() => setMinimizeAddOns(false)}>
                                        <IonItem button={true} lines="none" style={{
                                            display: "flex",
                                            backgroundColor: "black",
                                            flexDirection: "column",
                                            width: "100%"
                                        }}>

                                            <IonList style={{width: "100%",}}>
                                                <div style={{width: "100%", textAlign: "center"}}>
                                                    <div>
                                                        Add Ons
                                                    </div>
                                                </div>
                                                <div style={{display: "flex", width: "100%"}}>
                                                    {addOnsCartArray.map((addOn, i) => (

                                                        <div style={{display: "flex", flexDirection: "column"}}>
                                                            <div style={{width: "2em", height: "100%"}}>
                                                                <img style={{objectFit: "contain"}} src={addOn.imgUrl}/>

                                                            </div>
                                                            <div style={{
                                                                textAlign: "center",
                                                                // backgroundColor: "blue",
                                                                fontSize: ".7rem",
                                                                width: "100%"
                                                            }}>
                                                                <div style={{
                                                                    // backgroundColor:"red"
                                                                }}>
                                                                    {addOn.ingredientName}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </IonList>


                                        </IonItem>
                                    </IonButton>

                                ) : (
                                    <IonCard>

                                        <IonCardHeader style={{display: "flex"}}>
                                            <div>
                                                Add Ons
                                            </div>
                                            <IonIcon
                                                onClick={() => setMinimizeAddOns(true)}
                                                style={{position: "absolute", right: "1.5em", fontSize: "1.5rem"}}
                                                icon={remove}></IonIcon>

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
                                                height: "100%",
                                                padding: 0,

                                            }}>
                                                {addOnsFromFirebase.map((addOn, i) => (
                                                    // <div style={{ width:"fit-content", }}>

                                                    <AddOnComponent
                                                        // options={"tortilla-options"}
                                                        data={addOn}
                                                        // chosenOption={cho}
                                                        i={i}
                                                        key={i}
                                                        addOnsFromFirebase={addOnsFromFirebase}
                                                        setAddOnsCartArray={setAddOnsCartArray}
                                                        addOnsCartArray={addOnsCartArray}
                                                    />
                                                    // </div>

                                                ))}
                                            </div>

                                            <IonButton fill="outline" expand="block"
                                                       onClick={() => setMenuItemPageSwitchCase("addOns")}>+ Add
                                                Ons</IonButton>

                                        </IonCardContent>
                                    </IonCard>
                                )}

                            </IonList>


                            <ItemPageCartComponent
                                tortillaOptionsArray={tortillaOptionsArray}
                                mainIngredientsCartArray={mainIngredientsCartArray}
                                addOnsCartArray={addOnsCartArray}
                                drinksCartArray={drinksCartArray}
                                sidesCartArray={sidesCartArray}
                                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                            />

                            <IonButton fill="outline" expand="block" style={{height: "fit-content",}}
                                       onClick={() => setMinimizeMainIngredients(false)}>
                                <IonItem button={true} lines="none" style={{width: "100%"}}>
                                    <IonList style={{width: "100%",}}>
                                        <div style={{width: "100%", textAlign: "center"}}>
                                            <div>
                                                {menuItemName}
                                            </div>
                                        </div>


                                        <div style={{
                                            height: "auto",
                                            width: "10em",
                                            fontSize: ".7rem",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            overflow: "hidden",
                                            position: "relative",
                                            margin: "auto",
                                        }}

                                        >

                                            <img style={{width: "100%", objectFit: "cover"}} src={menuItemImgUrl}
                                                 alt="music"/>
                                        </div>
                                        <div style={{
                                            fontWeight: "bold",
                                            fontSize: "1.8rem",
                                            color: "green",
                                            width: "fit-content",
                                            margin: "auto"
                                        }}>
                                            ${(entreeTotal).toFixed(2)}
                                        </div>
                                        {calculateCartNutritionTotals()}

                                    </IonList>

                                </IonItem>


                            </IonButton>

                            <div style={{
                                display: "flex",
                                flexDirection: showDrinkMenu || showSidesMenu === true ? ("column") : ("row")
                                // flexDirection: "row",
                            }}>
                                {showDrinkMenu ? (


                                    <IonCard>

                                        <IonCardHeader style={{display: "flex"}}>
                                            <div>
                                                Drinks
                                            </div>
                                            <IonIcon
                                                onClick={() => setShowDrinkMenu(!showDrinkMenu)}
                                                style={{
                                                    position: "absolute",
                                                    cursor: "pointer",
                                                    right: "1.5em",
                                                    fontSize: "1.5rem"
                                                }} icon={remove}></IonIcon>

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
                                                height: "100%",
                                                padding: 0,

                                            }}>
                                                {drinksFromFirebase.map((addOn, i) => (
                                                    // <div style={{ width:"fit-content", }}>

                                                    <DrinksComponent
                                                        // options={"tortilla-options"}
                                                        data={addOn}
                                                        // chosenOption={cho}
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
                                                       onClick={() => setMenuItemPageSwitchCase("drinks")}>+
                                                Drinks</IonButton>

                                        </IonCardContent>
                                    </IonCard>


                                ) : (
                                    <IonButton style={{
                                        height: "fit-content",
                                        width: "100%",
                                    }} fill="outline" expand="block" onClick={() => setShowDrinkMenu(!showDrinkMenu)}>
                                        <IonItem button={true} lines="none" style={{
                                            display: "flex",
                                            backgroundColor: "black",
                                            flexDirection: "column",
                                            width: "100%"
                                        }}>

                                            <IonList style={{width: "100%",}}>
                                                <div style={{width: "100%", textAlign: "center"}}>
                                                    <div>
                                                        Drinks
                                                    </div>
                                                    <div style={{
                                                        fontWeight: "bold",
                                                        fontSize: "1.8rem",
                                                        color: "green"
                                                    }}>
                                                        ${parseFloat(drinksTotal)}
                                                    </div>


                                                </div>
                                                <div style={{display: "flex", width: "100%"}}>
                                                    {drinksCartArray.map((addOn, i) => (

                                                        <div style={{display: "flex", flexDirection: "column"}}>
                                                            <div style={{width: "2em", height: "100%"}}>
                                                                <img style={{objectFit: "contain"}} src={addOn.imgUrl}/>

                                                            </div>
                                                            <div style={{
                                                                textAlign: "center",
                                                                // backgroundColor: "blue",
                                                                fontSize: ".7rem",
                                                            }}>
                                                                <div style={{
                                                                    width: "6em",
                                                                    // backgroundColor: "red",
                                                                    height: "fit-content",

                                                                }}>
                                                                    {addOn.ingredientName}

                                                                </div>
                                                            </div>

                                                            {calculateDrinksNutritionTotals()}
                                                            {calculateAndRenderDrinksNutritionProfile(addOn)}

                                                        </div>
                                                    ))}
                                                </div>
                                            </IonList>


                                        </IonItem>

                                    </IonButton>

                                )}
                                {showSidesMenu ? (
                                    <IonCard>

                                        <IonCardHeader style={{display: "flex"}}>
                                            <div>
                                                Sides
                                            </div>
                                            <IonIcon
                                                onClick={() => setShowSidesMenu(!showSidesMenu)}
                                                style={{
                                                    position: "absolute",
                                                    cursor: "pointer",
                                                    right: "1.5em",
                                                    fontSize: "1.5rem"
                                                }} icon={remove}></IonIcon>

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
                                                height: "100%",
                                                padding: 0,

                                            }}>
                                                {sidesFromFirebase.map((addOn, i) => (
                                                    // <div style={{ width:"fit-content", }}>

                                                    <SidesComponent
                                                        // options={"tortilla-options"}
                                                        data={addOn}
                                                        // chosenOption={cho}
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
                                                       onClick={() => setMenuItemPageSwitchCase("sides")}>+
                                                Sides</IonButton>

                                        </IonCardContent>
                                    </IonCard>

                                ) : (
                                    <IonButton style={{
                                        height: "fit-content",
                                        width: "100%",

                                    }} fill="outline" expand="block" onClick={() => setShowSidesMenu(!showSidesMenu)}>
                                        <IonItem button={true} lines="none" style={{
                                            display: "flex",
                                            backgroundColor: "black",
                                            flexDirection: "column",
                                            width: "100%"
                                        }}>

                                            <IonList style={{width: "100%",}}>
                                                <div style={{width: "100%", textAlign: "center"}}>
                                                    <div>
                                                        Sides
                                                    </div>
                                                    <div style={{
                                                        fontWeight: "bold",
                                                        fontSize: "1.8rem",
                                                        color: "green"
                                                    }}>
                                                        ${parseFloat(sidesTotal)}
                                                    </div>
                                                </div>
                                                <div style={{display: "flex", width: "100%"}}>
                                                    {sidesCartArray.map((addOn, i) => (

                                                        <div style={{display: "flex", flexDirection: "column"}}>
                                                            <div style={{width: "2em", height: "100%"}}>
                                                                <img style={{objectFit: "contain"}} src={addOn.imgUrl}/>

                                                            </div>
                                                            <div style={{
                                                                textAlign: "center",
                                                                // backgroundColor: "blue",
                                                                fontSize: ".7rem",
                                                            }}>
                                                                <div style={{
                                                                    width: "6em",
                                                                    backgroundColor: "red",
                                                                    height: "fit-content",

                                                                }}>
                                                                    {addOn.ingredientName}

                                                                </div>
                                                            </div>
                                                            {calculateSidesNutritionTotals()}

                                                        </div>
                                                    ))}
                                                </div>
                                            </IonList>


                                        </IonItem>

                                    </IonButton>
                                )}

                            </div>
                            <IonButton
                                // style={{height: "fit-content",
                                // width: "100%",}}
                                fill="outline"
                                expand="block"
                                // onClick={() => setShowSidesMenu(!showSidesMenu)}
                            >
                                + Add More Food

                            </IonButton>
                            <IonButton
                                // style={{height: "fit-content",
                                // width: "100%",}}
                                color="warning"
                                // fill="outline"
                                expand="block"
                                // onClick={() => setShowSidesMenu(!showSidesMenu)}
                            >
                                Checkout
                            </IonButton>


                        </IonCard>
                    )
                    break;
                case "order summary":
                    tortillaTotal = 0;
                    mainIngredientsTotal = 0;
                    addOnsTotal = 0;
                    drinksTotal = 0;
                    sidesTotal = 0;
                    tortillaTotal = chosenTortillaOption.comboAmount * chosenTortillaOption.unitPrice;

                    mainIngredientsCartArray.map((addOn) => {
                        mainIngredientsTotal += addOn.comboAmount * addOn.unitPrice
                    })
                    addOnsCartArray.map((addOn) => {
                        addOnsTotal += addOn.comboAmount * addOn.unitPrice
                    })
                    drinksCartArray.map((addOn) => {
                        drinksTotal += addOn.comboAmount * addOn.unitPrice
                    })
                    sidesCartArray.map((addOn) => {
                        sidesTotal += addOn.comboAmount * addOn.unitPrice
                    })

                    entreeTotal = tortillaTotal + mainIngredientsTotal + addOnsTotal;
                    console.log("Cart Array!", cartArray)

                    return (
                        <div>Order Summary

                            <OrderCartComponent
                                cartArray={cartArray}
                                setCartArray={setCartArray}
                                menuItemImgUrl={menuItemImgUrl}
                                drinksFromFirebase={drinksFromFirebase}
                                setDrinksCartArray={setDrinksCartArray}
                                setSidesFromFirebase={setSidesFromFirebase}
                                setSidesCartArray={setSidesCartArray}
                                sidesTotal={sidesTotal}
                                drinksTotal={drinksTotal}
                                sidesFromFirebase={sidesFromFirebase}
                                menuItemName={menuItemName}
                                entreeTotal={entreeTotal}
                                tortillaOptionsArray={tortillaOptionsArray}
                                mainIngredientsCartArray={mainIngredientsCartArray}
                                addOnsCartArray={addOnsCartArray}
                                drinksCartArray={drinksCartArray}
                                sidesCartArray={sidesCartArray}
                                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                                setCarouselStep={setCarouselStep}
                            />


                        </div>
                    )
                    break;

            }
        }

        return (<div>

            {renderMenuItemPage()}
        </div>)
}
function EggsAndMoreOptionsPage({addOnsFromFirebase, setAddOnsFromFirebase,
                        setMenuItemPageSwitchCase, addOnsCartArray, setAddOnsCartArray, menuItemId
                    }){

    function renderTotal(){
        let total = 0;
        addOnsCartArray.map((addOn) => {
            total += addOn.unitAmount * addOn.unitPrice
        })
        return total
    }


    console.log(addOnsCartArray)

    return (
        <div>
            <div style={{
                backgroundColor: "#e1e4e7",
                display: "grid",
                gridTemplateColumns:  "1fr 1fr 1fr",
                // flex: "1 1 50%",
                flexDirection:"column",
                // flexBasis: "content",
                // flexWrap: "wrap",
                // overflowY: "scroll",
                // overflow: "hidden",
                height:"100%",
                padding: 0,
            }}>
                {addOnsFromFirebase.map((x,i) => (
                    <AddOnComponent
                        data={x}
                        i={i}
                        key={i}
                        addOnsFromFirebase={addOnsFromFirebase}
                        setAddOnsCartArray={setAddOnsCartArray}
                        addOnsCartArray={addOnsCartArray}
                    />
                ))

                }
            </div>
            <AddOnCartComponent
                addOnsCartArray={addOnsCartArray}
                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
            />

            <AddEggsAndMoreOptionsComponent
                setAddOnsList={setAddOnsFromFirebase}
                addOnsList={addOnsFromFirebase}
                menuItemId={menuItemId}
            />


        </div>
    )

}
function AddOnsPage({addOnsFromFirebase, setAddOnsFromFirebase,
                        setMenuItemPageSwitchCase, addOnsCartArray, setAddOnsCartArray, menuItemId
                    }){

    function renderTotal(){
        let total = 0;
        addOnsCartArray.map((addOn) => {
            total += addOn.unitAmount * addOn.unitPrice
        })
        return total
    }


    console.log(addOnsCartArray)

    return (
        <div>
            <div style={{
                backgroundColor: "#e1e4e7",
                display: "grid",
                gridTemplateColumns:  "1fr 1fr 1fr",
                // flex: "1 1 50%",
                flexDirection:"column",
                // flexBasis: "content",
                // flexWrap: "wrap",
                // overflowY: "scroll",
                // overflow: "hidden",
                height:"100%",
                padding: 0,
            }}>
                {addOnsFromFirebase.map((x,i) => (
                    <AddOnComponent
                        data={x}
                        i={i}
                        key={i}
                        addOnsFromFirebase={addOnsFromFirebase}
                        setAddOnsCartArray={setAddOnsCartArray}
                        addOnsCartArray={addOnsCartArray}
                    />
                ))

                }
            </div>
            <AddOnCartComponent
                addOnsCartArray={addOnsCartArray}
                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
            />

            <AddToppingsComponent
                setAddOnsList={setAddOnsFromFirebase}
                addOnsList={addOnsFromFirebase}
                menuItemId={menuItemId}
            />


        </div>
    )

}

function MainIngredientsPage({addOnsFromFirebase, setAddOnsFromFirebase,
                        setMenuItemPageSwitchCase, addOnsCartArray, setAddOnsCartArray, menuItemId
                    }){



    console.log(addOnsCartArray)

    return (
        <div>
            <div style={{
                backgroundColor: "#e1e4e7",
                display: "grid",
                gridTemplateColumns:  "1fr 1fr 1fr",
                // flex: "1 1 50%",
                flexDirection:"column",
                // flexBasis: "content",
                // flexWrap: "wrap",
                // overflowY: "scroll",
                // overflow: "hidden",
                height:"100%",
                padding: 0,
            }}>
                {addOnsFromFirebase.map((x,i) => (
                    <AddOnComponent
                        data={x}
                        i={i}
                        key={i}
                        addOnsFromFirebase={addOnsFromFirebase}
                        setAddOnsCartArray={setAddOnsCartArray}
                        addOnsCartArray={addOnsCartArray}
                    />
                ))

                }
            </div>
            <AddOnCartComponent
                addOnsCartArray={addOnsCartArray}
                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
            />

            <AddMainIngredientsOptionsComponent
                setAddOnsList={setAddOnsFromFirebase}
                addOnsList={addOnsFromFirebase}
                menuItemId={menuItemId}
            />


        </div>
    )

}
function DrinksPage({addOnsFromFirebase, setAddOnsFromFirebase,
                        setMenuItemPageSwitchCase, addOnsCartArray, setAddOnsCartArray, menuItemId
                    }){



    console.log(addOnsCartArray)

    return (
        <div>
            <div style={{
                backgroundColor: "#e1e4e7",
                display: "grid",
                gridTemplateColumns:  "1fr 1fr 1fr",
                // flex: "1 1 50%",
                flexDirection:"column",
                // flexBasis: "content",
                // flexWrap: "wrap",
                // overflowY: "scroll",
                // overflow: "hidden",
                height:"100%",
                padding: 0,
            }}>
                {addOnsFromFirebase.map((x,i) => (
                    <DrinksComponent
                        data={x}
                        i={i}
                        key={i}
                        addOnsFromFirebase={addOnsFromFirebase}
                        setAddOnsCartArray={setAddOnsCartArray}
                        addOnsCartArray={addOnsCartArray}
                    />
                ))

                }
            </div>
            <AddOnCartComponent
                addOnsCartArray={addOnsCartArray}
                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
            />

            <AddDrinksComponent
                setAddOnsList={setAddOnsFromFirebase}
                addOnsList={addOnsFromFirebase}
                menuItemId={menuItemId}
            />


        </div>
    )

}
function SidesPage({addOnsFromFirebase, setAddOnsFromFirebase,
                        setMenuItemPageSwitchCase, addOnsCartArray, setAddOnsCartArray, menuItemId
                    }){



    console.log(addOnsCartArray)

    return (
        <div>
            <div style={{
                backgroundColor: "#e1e4e7",
                display: "grid",
                gridTemplateColumns:  "1fr 1fr 1fr",
                // flex: "1 1 50%",
                flexDirection:"column",
                // flexBasis: "content",
                // flexWrap: "wrap",
                // overflowY: "scroll",
                // overflow: "hidden",
                height:"100%",
                padding: 0,
            }}>
                {addOnsFromFirebase.map((x,i) => (
                    <SidesComponent
                        data={x}
                        i={i}
                        key={i}
                        addOnsFromFirebase={addOnsFromFirebase}
                        setAddOnsCartArray={setAddOnsCartArray}
                        addOnsCartArray={addOnsCartArray}
                    />
                ))

                }
            </div>
            <AddOnCartComponent
                addOnsCartArray={addOnsCartArray}
                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
            />

            <AddSidesComponent
                setAddOnsList={setAddOnsFromFirebase}
                addOnsList={addOnsFromFirebase}
                menuItemId={menuItemId}
            />


        </div>
    )

}
function TortillaOptionsPage({addOnsFromFirebase, setAddOnsFromFirebase,
                        setMenuItemPageSwitchCase, addOnsCartArray, setAddOnsCartArray, menuItemId
                    }){

    function renderTotal(){
        let total = 0;
        addOnsCartArray.map((addOn) => {
            total += addOn.unitAmount * addOn.unitPrice
        })
        return total
    }



    return (
        <div>
            <div style={{
                backgroundColor: "#e1e4e7",
                display: "grid",
                gridTemplateColumns:  "1fr 1fr 1fr",
                // flex: "1 1 50%",
                flexDirection:"column",
                // flexBasis: "content",
                // flexWrap: "wrap",
                // overflowY: "scroll",
                // overflow: "hidden",
                height:"100%",
                padding: 0,
            }}>
                {addOnsFromFirebase.map((x,i) => (
                    <AddOnComponent
                        data={x}
                        i={i}
                        key={i}
                        addOnsFromFirebase={addOnsFromFirebase}
                        setAddOnsCartArray={setAddOnsCartArray}
                        addOnsCartArray={addOnsCartArray}
                    />
                ))

                }
            </div>
            <AddOnCartComponent
                addOnsCartArray={addOnsCartArray}
                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
            />

            <AddTortillaOptionsComponent
                setAddOnsList={setAddOnsFromFirebase}
                addOnsList={addOnsFromFirebase}
                menuItemId={menuItemId}
            />


        </div>
    )

}

function AddOnComponent({data, i, addOnsFromFirebase, addOnsCartArray, setAddOnsCartArray

                        }){

    const [comboAmount , setComboAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))
    const [ macroStats, setMacroStats ] = useState([])
    const [ backDrop , setBackDrop ] = useState(data.comboAmount > 0 ? (false):(true))
    const [showNutrients, setShowNutrients ] = useState(true)

    useEffect(() => {
        loadAndFilterAddOns()
        console.log(addOnsCartArray)
    },[addOnsCartArray, data, comboAmount])

    function calculateAndRenderAddOnsNutritionProfile(){


        function multiplyValuesInArray() {
            console.log(addOnsFromFirebase)
            return addOnsFromFirebase?.map((item) => {
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
            });
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
        let amount, sumResult, ingredientNutrition, multipliedArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat, price, carbohydrates = 0;


        console.log(data)

        multipliedArray = multiplyValuesInArray();
        console.log(multipliedArray);
        console.log(multipliedArray[i]);
        // sumResult = sumValuesInArray(multipliedArray);
        // console.log(sumResult);

        if(multipliedArray[i] !== undefined){
            // protein = parseInt(data.protein);
            // carbohydrates =  parseInt(data.totalCarbohydrates);
            // fat = parseInt(data.totalFat);
            // calories = parseInt(data.calories);
            calories = multipliedArray[i].calories;
            protein = multipliedArray[i].protein;
            carbohydrates =  multipliedArray[i].totalCarbohydrates;
            fat = multipliedArray[i].totalFat;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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

                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>
                            {showNutrients == true ? (
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(false)} icon={chevronDownOutline} />
                                    {macroStats !== [] && (
                                        <NutrientProgressBar
                                            nutritionData={stats}

                                        />

                                    )}
                                </div>

                            ):(
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(true)} icon={chevronForwardOutline} />

                                </div>

                            )}
                        </div>


                    </div>


                )
            }else {
                console.log("else")
                return null;
            }

        }else {
            protein = multipliedArray.protein;
            carbohydrates =  multipliedArray.totalCarbohydrates;
            fat = multipliedArray.totalFat;
            calories = multipliedArray.calories;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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
                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>{formatToTwoDecimalPlaces(calories)} cals
                        <IonIcon icon={chevronForwardOutline} />
                        <IonIcon icon={chevronDownOutline} />
                        </div>

                        {macroStats !== [] && (
                            <NutrientProgressBar
                                nutritionData={stats}

                            />

                        )}

                    </div>


                );
            }else {
                console.log("else 3")
                return null;
            }


            return null;
        }


    }
    function loadAndFilterAddOns(){
        console.log(addOnsCartArray, data)
        if (addOnsCartArray.length > 0 ){
            addOnsCartArray.map((selectedAddOn, i ) => {
                if (selectedAddOn.docId === data.docId){
                    data.comboAmount = selectedAddOn.comboAmount;
                    setComboAmount(selectedAddOn.comboAmount)
                    console.log(data)

                }
            })
        }
    }
    function populateAddOnsDocIds(array){
        let cartAddOnsDocId = [];

        addOnsCartArray.map((cartAddOn) => {

            console.log(cartAddOn)
            cartAddOnsDocId = [...cartAddOnsDocId, cartAddOn.docId]

            console.log(cartAddOnsDocId)

        })

        return cartAddOnsDocId;
    }
    async function onAddAmountToData() {

        let newData = data;

        console.log(data)
        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 0")

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 1")


                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")
            let temp = newData;
            temp.comboAmount = 1;
            temp.total = temp.unitPrice * temp.comboAmount;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }
    async function onDecreaseAmountToData() {

        let newData = {...data}

        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];

                if (addOnsCartArray[cartIndex].comboAmount > 1 ){

                    temp.comboAmount = addOnsCartArray[cartIndex].comboAmount - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    tempArr.splice(cartIndex, 1, temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                }else {
                    console.log(addOnsCartArray[cartIndex].comboAmount)
                    temp.comboAmount = parseInt(addOnsCartArray[cartIndex].comboAmount) - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    console.log(tempArr)
                    tempArr.splice(cartIndex, 1)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                    setComboAmount(0)
                    setAddOnsCartArray(tempArr)
                        console.log("SEtting backdrop true")
                        setBackDrop(true)

                }

            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])

                if (temp.comboAmount === 0 ){
                    console.log("SEtting backdrop true")
                    setBackDrop(true)
                }
            }

        } else {
            console.log("Array.length === 0")

            let tempArr = [...addOnsCartArray]
            let temp = newData;
            temp.comboAmount = 1;

            temp.total = temp.unitPrice * temp.comboAmount

            console.log(temp)
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }

    // const priceToDisplay =   data.unitPrice * comboAmount;

    function onCheckMarkClick(){
        // setComboAmount(1);
        // data.comboAmount = 1;

        setBackDrop(false)
        console.log(data)
        onAddAmountToData().then(console.log(data))
    }

    function renderAddOnComponent(){

        return (
            <IonCard style={{
                // minWidth: "10em",
                width: "8em",
                // minHeight: "25em",
                height: "fit-content",
                fontSize: ".6rem",
                margin: ".5em",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}>
                {backDrop && (
                    <IonBackdrop style={{
                        background: "var(--ion-color-dark)",
                        opacity: "0.5",
                    }} visible={true}
                                 tappable={true}
                                 onIonBackdropTap={() => onCheckMarkClick()}
                    ></IonBackdrop>
                )}

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{
                        fontSize: ".8rem",
                        height: "3em",
                        textAlign: "center",
                        padding: ".2em",
                        color: "#333",
                        fontWeight: data.comboAmount > 0 ? "bold" : "normal",
                        // backgroundColor: data.comboAmount > 0 ? "#498bce" : "#aabbcc",
                    }}>
                        {data.ingredientName}
                    </div>

                    <div style={{
                        // border: "solid",
                        width: "fit-content",
                        height: "3em",
                        // borderColor: "#ddd",
                        margin: "auto"
                    }}>
                        <img
                            src={data.imgUrl}
                            style={{
                                // margin:"auto",
                                // backgroundColor:"red",
                                width: "auto",
                                height: "3em",
                                objectFit: "cover",
                            }}
                        />

                    </div>
                    {comboAmount === 0 ? (<div style={{ width: "fit-content", margin: "auto"}}>

                        <div style={{margin: ".5em auto",  width:"fit-content"}}>
                            <input style={{margin: "auto",
                                width: "20px",
                                height: "20px",
                            }}type="checkbox"
                                   onClick={() => onCheckMarkClick()}
                            />
                        </div>

                        <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                            {data.unitAmount } {data.unitGramsOrCups}
                        </div>
                        <label style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            margin: ".3em auto",
                            color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                        }}>
                            ${ data.unitPrice}
                            {/*${priceToDisplay.toFixed(2)}*/}
                        </label>

                        <div>
                            {calculateAndRenderAddOnsNutritionProfile()}
                            {/*{calculateAndRenderAddOnsNutritionProfile2()}*/}


                        </div>
                    </div>):(
                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "space-around",
                        }}>
                            <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                {data.unitAmount * data.comboAmount} {data.unitGramsOrCups}
                            </div>
                            <IonCard style={{
                                border: "solid thin",
                                width: "fit-content",
                                display: "flex",
                                height: "100%",
                                flexFlow: "row",
                                margin: ".3em auto",
                            }}>
                                <div>
                                    <IonIcon
                                        onClick={() => onDecreaseAmountToData(data.docId)}
                                        style={{
                                            fontSize: "20px",
                                            height: "100%",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                        icon={subtractIcon}
                                    />
                                </div>
                                <div style={{
                                    fontSize: "1rem",
                                    height: "100%",
                                    margin: "auto .3em",
                                    cursor: "default",
                                    color: "black",
                                }}>
                                    <span style={{color:"green", fontWeight:"bold"}}>x</span>
                                    {comboAmount}
                                </div>
                                <div>
                                    <IonIcon
                                        onClick={() => onAddAmountToData(data.docId)}
                                        style={{
                                            fontSize: "20px",
                                            cursor: "pointer",
                                            color: "black",
                                            height: "100%",
                                        }}
                                        icon={addIcon}
                                    />
                                </div>
                            </IonCard>
                            <label style={{
                                textAlign: "center",
                                fontSize: "1.2rem",
                                margin: ".3em auto",
                                color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                            }}>
                                ${data.unitPrice * comboAmount}
                                {/*${priceToDisplay.toFixed(2)}*/}
                            </label>

                            <div>
                                {calculateAndRenderAddOnsNutritionProfile()}


                            </div>

                        </div>
                    )}

                </div>
            </IonCard>
        )
    }
    return (<div>
            {renderAddOnComponent()}
        </div>
    )


}
export function DrinksComponent({data, i, addOnsFromFirebase, addOnsCartArray, setAddOnsCartArray

                        }){

    const [comboAmount , setComboAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))
    const [ macroStats, setMacroStats ] = useState([])
    const [ backDrop , setBackDrop ] = useState(data.comboAmount > 0 ? (false):(true))
    const [showNutrients, setShowNutrients ] = useState(true)
    const [drinkSize, setDrinkSize ] = useState(32)

    useEffect(() => {
        loadAndFilterAddOns()
        console.log(addOnsCartArray)
    },[addOnsCartArray, data, comboAmount])

    function calculateAndRenderAddOnsNutritionProfile(){


        function multiplyValuesInArray() {
            console.log(addOnsFromFirebase)
            return addOnsFromFirebase?.map((item) => {
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
            });
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
        let amount, sumResult, ingredientNutrition, multipliedArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat, price, carbohydrates = 0;


        console.log(data)

        multipliedArray = multiplyValuesInArray();
        console.log(multipliedArray);
        console.log(multipliedArray[i]);
        // sumResult = sumValuesInArray(multipliedArray);
        // console.log(sumResult);

        if(multipliedArray[i] !== undefined){
            // protein = parseInt(data.protein);
            // carbohydrates =  parseInt(data.totalCarbohydrates);
            // fat = parseInt(data.totalFat);
            // calories = parseInt(data.calories);
            calories = multipliedArray[i].calories;
            protein = multipliedArray[i].protein;
            carbohydrates =  multipliedArray[i].totalCarbohydrates;
            fat = multipliedArray[i].totalFat;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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

                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>
                            {showNutrients == true ? (
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(false)} icon={chevronDownOutline} />
                                    {macroStats !== [] && (
                                        <NutrientProgressBar
                                            nutritionData={stats}

                                        />

                                    )}
                                </div>

                            ):(
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(true)} icon={chevronForwardOutline} />

                                </div>

                            )}
                        </div>


                    </div>


                )
            }else {
                console.log("else")
                return null;
            }

        }else {
            protein = multipliedArray.protein;
            carbohydrates =  multipliedArray.totalCarbohydrates;
            fat = multipliedArray.totalFat;
            calories = multipliedArray.calories;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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
                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>{formatToTwoDecimalPlaces(calories)} cals
                        <IonIcon icon={chevronForwardOutline} />
                        <IonIcon icon={chevronDownOutline} />
                        </div>

                        {macroStats !== [] && (
                            <NutrientProgressBar
                                nutritionData={stats}

                            />

                        )}

                    </div>


                );
            }else {
                console.log("else 3")
                return null;
            }


            return null;
        }


    }
    function loadAndFilterAddOns(){
        console.log(addOnsCartArray, data)
        if (addOnsCartArray.length > 0 ){
            addOnsCartArray.map((selectedAddOn, i ) => {
                if (selectedAddOn.docId === data.docId){
                    data.comboAmount = selectedAddOn.comboAmount;
                    setComboAmount(selectedAddOn.comboAmount)
                    console.log(data)

                }
            })
        }
    }
    function populateAddOnsDocIds(array){
        let cartAddOnsDocId = [];

        addOnsCartArray.map((cartAddOn) => {

            console.log(cartAddOn)
            cartAddOnsDocId = [...cartAddOnsDocId, cartAddOn.docId]

            console.log(cartAddOnsDocId)

        })

        return cartAddOnsDocId;
    }
    async function onAddAmountToData() {

        let newData = data;

        console.log(data)
        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 0")

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 1")


                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")
            let temp = newData;
            temp.comboAmount = 1;
            temp.total = temp.unitPrice * temp.comboAmount;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }
    async function onDecreaseAmountToData() {

        let newData = {...data}

        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];

                if (addOnsCartArray[cartIndex].comboAmount > 1 ){

                    temp.comboAmount = addOnsCartArray[cartIndex].comboAmount - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    tempArr.splice(cartIndex, 1, temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                }else {
                    console.log(addOnsCartArray[cartIndex].comboAmount)
                    temp.comboAmount = parseInt(addOnsCartArray[cartIndex].comboAmount) - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    console.log(tempArr)
                    tempArr.splice(cartIndex, 1)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                    setComboAmount(0)
                    setAddOnsCartArray(tempArr)
                        console.log("SEtting backdrop true")
                        setBackDrop(true)

                }

            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])

                if (temp.comboAmount === 0 ){
                    console.log("SEtting backdrop true")
                    setBackDrop(true)
                }
            }

        } else {
            console.log("Array.length === 0")

            let tempArr = [...addOnsCartArray]
            let temp = newData;
            temp.comboAmount = 1;

            temp.total = temp.unitPrice * temp.comboAmount

            console.log(temp)
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }

    // const priceToDisplay =   data.unitPrice * comboAmount;

    function onCheckMarkClick(){
        // setComboAmount(1);
        // data.comboAmount = 1;

        setBackDrop(false)
        console.log(data)
        onAddAmountToData().then(console.log(data))
    }

    function onDeleteFromCartClick(){

        console.log(addOnsCartArray)
        data.comboAmount = 0;
        data.unitPrice = 6;
        data.unitAmount = 32;

        if ( addOnsCartArray.length > 1 ){

            let temp = [...addOnsCartArray];
            temp.splice(i, 1, )


            console.log(addOnsCartArray, temp)
            setAddOnsCartArray([...temp])
            setBackDrop(true)
        }else {
            setAddOnsCartArray([])
            setBackDrop(true)
            console.log(addOnsCartArray)


        }

    }
    function drinkSizeClicked(s,p){
        // let temp = addOnsCartArray;


        // setAddOnsCartArray([...temp])
        console.log(s, "oz", "$", p, ".00")
        setDrinkSize(s)


        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(data.docId))

            if (res.includes(data.docId)) {

                let cartIndex = res.indexOf(data.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                // temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                // temp.total = temp.unitPrice * temp.comboAmount
                // console.log(temp.total, "TOTAL 0")

                temp.unitPrice = p;
                temp.unitAmount = s;
                temp.comboAmount = 1;
                temp.total = data.unitPrice;

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }
            else {
                console.log(data.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = data;

                temp.unitPrice = p;
                temp.unitAmount = s;
                temp.comboAmount = 1;
                temp.total = data.unitPrice;

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")
            data.unitPrice = p;
            data.unitAmount = s;
            let temp = data;
            temp.comboAmount = 1;
            temp.total = data.unitPrice;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }

    }
    function renderAddOnComponent(){

        return (
            <IonCard style={{
                // minWidth: "10em",
                width: "8em",
                // minHeight: "25em",
                height: "fit-content",
                fontSize: ".6rem",
                margin: ".5em",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}>
                {backDrop && (
                    <IonBackdrop style={{
                        background: "var(--ion-color-dark)",
                        opacity: "0.5",
                    }} visible={true}
                                 tappable={true}
                                 onIonBackdropTap={() => onCheckMarkClick()}
                    ></IonBackdrop>
                )}
                {!backDrop && (
                    <div
                        onClick={() => onDeleteFromCartClick()}
                        style={{

                            // color: "red",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            right: ".2em",
                            position: "fixed"
                        }}>X</div>
                )}




                <div style={{
                marginTop: "1.4em",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{
                        fontSize: ".8rem",
                        height: "fit-content ",
                        textAlign: "center",
                        padding: ".2em",
                        color: "#333",
                        fontWeight: data.comboAmount > 0 ? "bold" : "normal",
                        // backgroundColor: data.comboAmount > 0 ? "#498bce" : "#aabbcc",
                    }}>
                        {data.ingredientName}
                    </div>

                    <div style={{
                        // border: "solid",
                        width: "fit-content",
                        height: "3em",
                        // borderColor: "#ddd",
                        margin: "auto"
                    }}>
                        <img
                            src={data.imgUrl}
                            style={{
                                // margin:"auto",
                                // backgroundColor:"red",
                                width: "auto",
                                height: "3em",
                                objectFit: "cover",
                            }}
                        />

                    </div>
                    {comboAmount === 0 ? (<div style={{ width: "fit-content", margin: "auto"}}>

                        <div style={{margin: ".5em auto",  width:"fit-content"}}>
                            <input style={{margin: "auto",
                                width: "20px",
                                height: "20px",
                            }}type="checkbox"
                                   onClick={() => onCheckMarkClick()}
                            />
                        </div>

                        <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                            {data.unitAmount } {data.unitGramsOrCups}
                        </div>
                        <label style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            margin: ".3em auto",
                            color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                        }}>
                            ${ data.unitPrice}
                            {/*${priceToDisplay.toFixed(2)}*/}
                        </label>

                        <div>
                            {calculateAndRenderAddOnsNutritionProfile()}
                            {/*{calculateAndRenderAddOnsNutritionProfile2()}*/}


                        </div>
                    </div>):(
                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "space-around",
                        }}>
                            <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                {data.unitAmount } {data.unitGramsOrCups}
                            </div>
                            <div style={{display:"flex", justifyContent: "space-between"}}>
                                <div onClick={() => drinkSizeClicked(16, 3)} style={{ border:  drinkSize === 16 ? ("solid thin"):(""), backgroundColor: drinkSize === 16 ? ("rgba(78,169,197,0.5)"):(""), fontWeight: drinkSize === 16 ? ("bolder"):(""), cursor:"pointer", width: "fit-content", height:"1.7em", textAlign: "center", fontSize: ".6rem"}}>16oz</div>
                                <div  onClick={() => drinkSizeClicked(20, 4)} style={{ border:  drinkSize === 20 ? ("solid thin"):(""),  cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>20oz</div>
                                <div  onClick={() => drinkSizeClicked(32, 6)} style={{ border:  drinkSize === 32 ? ("solid thin"):(""), cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>32oz</div>
                            </div>

                            <label style={{
                                textAlign: "center",
                                fontSize: "1.2rem",
                                margin: ".3em auto",
                                color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                            }}>
                                ${data.unitPrice * comboAmount}
                                {/*${priceToDisplay.toFixed(2)}*/}
                            </label>

                            <div>
                                {calculateAndRenderAddOnsNutritionProfile()}


                            </div>

                        </div>
                    )}

                </div>
            </IonCard>
        )
    }
    return (<div>
            {renderAddOnComponent()}
        </div>
    )


}
function SidesComponent({data, i, addOnsFromFirebase, addOnsCartArray, setAddOnsCartArray,

                        }){

    const [comboAmount , setComboAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))
    const [ macroStats, setMacroStats ] = useState([])
    const [ backDrop , setBackDrop ] = useState(data.comboAmount > 0 ? (false):(true))
    const [showNutrients, setShowNutrients ] = useState(true)
    const [drinkSize, setDrinkSize ] = useState(32)

    useEffect(() => {
        loadAndFilterAddOns()
        console.log(addOnsCartArray)
    },[addOnsCartArray, data, comboAmount])

    function calculateAndRenderAddOnsNutritionProfile(){


        function multiplyValuesInArray() {
            console.log(addOnsFromFirebase)
            return addOnsFromFirebase?.map((item) => {
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
            });
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
        let amount, sumResult, ingredientNutrition, multipliedArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat, price, carbohydrates = 0;


        console.log(data)

        multipliedArray = multiplyValuesInArray();
        console.log(multipliedArray);
        console.log(multipliedArray[i]);
        // sumResult = sumValuesInArray(multipliedArray);
        // console.log(sumResult);

        if(multipliedArray[i] !== undefined){
            // protein = parseInt(data.protein);
            // carbohydrates =  parseInt(data.totalCarbohydrates);
            // fat = parseInt(data.totalFat);
            // calories = parseInt(data.calories);
            calories = multipliedArray[i].calories;
            protein = multipliedArray[i].protein;
            carbohydrates =  multipliedArray[i].totalCarbohydrates;
            fat = multipliedArray[i].totalFat;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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

                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>
                            {showNutrients == true ? (
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(false)} icon={chevronDownOutline} />
                                    {macroStats !== [] && (
                                        <NutrientProgressBar
                                            nutritionData={stats}

                                        />

                                    )}
                                </div>

                            ):(
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(true)} icon={chevronForwardOutline} />

                                </div>

                            )}
                        </div>


                    </div>


                )
            }else {
                console.log("else")
                return null;
            }

        }else {
            protein = multipliedArray.protein;
            carbohydrates =  multipliedArray.totalCarbohydrates;
            fat = multipliedArray.totalFat;
            calories = multipliedArray.calories;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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
                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>{formatToTwoDecimalPlaces(calories)} cals
                        <IonIcon icon={chevronForwardOutline} />
                        <IonIcon icon={chevronDownOutline} />
                        </div>

                        {macroStats !== [] && (
                            <NutrientProgressBar
                                nutritionData={stats}

                            />

                        )}

                    </div>


                );
            }else {
                console.log("else 3")
                return null;
            }


            return null;
        }


    }
    function loadAndFilterAddOns(){
        console.log(addOnsCartArray, data)
        if (addOnsCartArray.length > 0 ){
            addOnsCartArray.map((selectedAddOn, i ) => {
                if (selectedAddOn.docId === data.docId){
                    data.comboAmount = selectedAddOn.comboAmount;
                    setComboAmount(selectedAddOn.comboAmount)
                    console.log(data)

                }
            })
        }
    }
    function populateAddOnsDocIds(array){
        let cartAddOnsDocId = [];

        addOnsCartArray.map((cartAddOn) => {

            console.log(cartAddOn)
            cartAddOnsDocId = [...cartAddOnsDocId, cartAddOn.docId]

            console.log(cartAddOnsDocId)

        })

        return cartAddOnsDocId;
    }
    async function onAddAmountToData() {

        let newData = data;

        console.log(data)
        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 0")

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 1")


                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")
            let temp = newData;
            temp.comboAmount = 1;
            temp.total = temp.unitPrice * temp.comboAmount;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])

        }
    }
    async function onDecreaseAmountToData() {

        let newData = {...data}

        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];

                if (addOnsCartArray[cartIndex].comboAmount > 1 ){

                    temp.comboAmount = addOnsCartArray[cartIndex].comboAmount - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    tempArr.splice(cartIndex, 1, temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                }else {
                    console.log(addOnsCartArray[cartIndex].comboAmount)
                    temp.comboAmount = parseInt(addOnsCartArray[cartIndex].comboAmount) - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    console.log(tempArr)
                    tempArr.splice(cartIndex, 1)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                    setComboAmount(0)
                    setAddOnsCartArray(tempArr)
                        console.log("SEtting backdrop true")
                        setBackDrop(true)

                }

            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])

                if (temp.comboAmount === 0 ){
                    console.log("SEtting backdrop true")
                    setBackDrop(true)
                }
            }

        } else {
            console.log("Array.length === 0")

            let tempArr = [...addOnsCartArray]
            let temp = newData;
            temp.comboAmount = 1;

            temp.total = temp.unitPrice * temp.comboAmount

            console.log(temp)
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }

    // const priceToDisplay =   data.unitPrice * comboAmount;

    function onCheckMarkClick(){
        // setComboAmount(1);
        // data.comboAmount = 1;

        setBackDrop(false)
        console.log(data)
        onAddAmountToData().then(console.log(data))
    }

    function onDeleteFromCartClick(){

        console.log(addOnsCartArray)
        data.comboAmount = 0;
        data.unitPrice = 6;
        data.unitAmount = 32;

        if ( addOnsCartArray.length > 1 ){

            let temp = [...addOnsCartArray];
            temp.splice(i, 1, )


            console.log(addOnsCartArray, temp)
            setAddOnsCartArray([...temp])
            setBackDrop(true)
        }else {
            setAddOnsCartArray([])
            setBackDrop(true)
            console.log(addOnsCartArray)


        }

    }
    function drinkSizeClicked(s,p){
        // let temp = addOnsCartArray;


        // setAddOnsCartArray([...temp])
        console.log(s, "oz", "$", p, ".00")
        setDrinkSize(s)


        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(data.docId))

            if (res.includes(data.docId)) {

                let cartIndex = res.indexOf(data.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                // temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                // temp.total = temp.unitPrice * temp.comboAmount
                // console.log(temp.total, "TOTAL 0")

                temp.unitPrice = p;
                temp.unitAmount = s;
                temp.comboAmount = 1;
                temp.total = data.unitPrice;

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }
            else {
                console.log(data.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = data;

                temp.unitPrice = p;
                temp.unitAmount = s;
                temp.comboAmount = 1;
                temp.total = data.unitPrice;

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")
            data.unitPrice = p;
            data.unitAmount = s;
            let temp = data;
            temp.comboAmount = 1;
            temp.total = data.unitPrice;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }

    }
    function renderAddOnComponent(){

        return (
            <IonCard style={{
                // minWidth: "10em",
                width: "8em",
                // minHeight: "25em",
                height: "fit-content",
                fontSize: ".6rem",
                margin: ".5em",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}>
                {backDrop && (
                    <IonBackdrop style={{
                        background: "var(--ion-color-dark)",
                        opacity: "0.5",
                    }} visible={true}
                                 tappable={true}
                                 onIonBackdropTap={() => onCheckMarkClick()}
                    ></IonBackdrop>
                )}
                {!backDrop && (
                    <div
                        onClick={() => onDeleteFromCartClick()}
                        style={{

                            // color: "red",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            right: ".2em",
                            position: "fixed"
                        }}>X</div>
                )}




                <div style={{
                marginTop: "1.4em",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{
                        fontSize: ".8rem",
                        height: "fit-content ",
                        textAlign: "center",
                        padding: ".2em",
                        color: "#333",
                        fontWeight: data.comboAmount > 0 ? "bold" : "normal",
                        // backgroundColor: data.comboAmount > 0 ? "#498bce" : "#aabbcc",
                    }}>
                        {data.ingredientName}
                    </div>

                    <div style={{
                        // border: "solid",
                        width: "fit-content",
                        height: "3em",
                        // borderColor: "#ddd",
                        margin: "auto"
                    }}>
                        <img
                            src={data.imgUrl}
                            style={{
                                // margin:"auto",
                                // backgroundColor:"red",
                                width: "auto",
                                height: "3em",
                                objectFit: "cover",
                            }}
                        />

                    </div>
                    {comboAmount === 0 ? (<div style={{ width: "fit-content", margin: "auto"}}>

                        <div style={{margin: ".5em auto",  width:"fit-content"}}>
                            {/*<input style={{margin: "auto",*/}
                            {/*    width: "20px",*/}
                            {/*    height: "20px",*/}
                            {/*}}type="checkbox"*/}
                            {/*       onClick={() => onCheckMarkClick()}*/}
                            {/*/>*/}
                        </div>
                        <div style={{display:"flex", justifyContent: "space-between"}}>
                            <div onClick={() => drinkSizeClicked(16, 3)} style={{ border:  drinkSize === 16 ? ("solid thin"):(""), backgroundColor: drinkSize === 16 ? ("rgba(78,169,197,0.5)"):(""), fontWeight: drinkSize === 16 ? ("bolder"):(""), cursor:"pointer", width: "fit-content", height:"1.7em", textAlign: "center", fontSize: ".6rem"}}>16oz</div>
                            <div  onClick={() => drinkSizeClicked(20, 4)} style={{ border:  drinkSize === 20 ? ("solid thin"):(""),  cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>20oz</div>
                            <div  onClick={() => drinkSizeClicked(32, 6)} style={{ border:  drinkSize === 32 ? ("solid thin"):(""), cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>32oz</div>
                        </div>

                        <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                            {data.unitAmount } {data.unitGramsOrCups}
                        </div>
                        <label style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            margin: ".3em auto",
                            color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                        }}>
                            ${ data.unitPrice}
                            {/*${priceToDisplay.toFixed(2)}*/}
                        </label>

                        <div>
                            {calculateAndRenderAddOnsNutritionProfile()}
                            {/*{calculateAndRenderAddOnsNutritionProfile2()}*/}


                        </div>
                    </div>):(
                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "space-around",
                        }}>
                            <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                {data.unitAmount } {data.unitGramsOrCups}
                            </div>
                            <div style={{display:"flex", justifyContent: "space-between"}}>
                                <div onClick={() => drinkSizeClicked(16, 3)} style={{ border:  drinkSize === 16 ? ("solid thin"):(""), backgroundColor: drinkSize === 16 ? ("rgba(78,169,197,0.5)"):(""), fontWeight: drinkSize === 16 ? ("bolder"):(""), cursor:"pointer", width: "fit-content", height:"1.7em", textAlign: "center", fontSize: ".6rem"}}>16oz</div>
                                <div  onClick={() => drinkSizeClicked(20, 4)} style={{ border:  drinkSize === 20 ? ("solid thin"):(""),  cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>20oz</div>
                                <div  onClick={() => drinkSizeClicked(32, 6)} style={{ border:  drinkSize === 32 ? ("solid thin"):(""), cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>32oz</div>
                            </div>

                            <label style={{
                                textAlign: "center",
                                fontSize: "1.2rem",
                                margin: ".3em auto",
                                color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                            }}>
                                ${data.unitPrice * comboAmount}
                                {/*${priceToDisplay.toFixed(2)}*/}
                            </label>

                            <div>
                                {calculateAndRenderAddOnsNutritionProfile()}


                            </div>

                        </div>
                    )}

                </div>
            </IonCard>
        )
    }
    return (<div>
            {renderAddOnComponent()}
        </div>
    )


}
export function CartSidesComponent({data, i, addOnsFromFirebase, addOnsCartArray, setAddOnsCartArray, setCartArray, cartArray, cartIndex

                        }){

    const [comboAmount , setComboAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))
    const [ macroStats, setMacroStats ] = useState([])
    const [ backDrop , setBackDrop ] = useState(data.comboAmount > 0 ? (false):(true))
    const [showNutrients, setShowNutrients ] = useState(true)
    const [drinkSize, setDrinkSize ] = useState(32)

    useEffect(() => {
        loadAndFilterAddOns()
        console.log(addOnsCartArray, cartArray)
    },[addOnsCartArray, data, comboAmount])

    function calculateAndRenderAddOnsNutritionProfile(){


        function multiplyValuesInArray() {
            console.log(addOnsFromFirebase)
            return addOnsFromFirebase?.map((item) => {
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
            });
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
        let amount, sumResult, ingredientNutrition, multipliedArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat, price, carbohydrates = 0;


        console.log(data)

        multipliedArray = multiplyValuesInArray();
        console.log(multipliedArray);
        console.log(multipliedArray[i]);
        // sumResult = sumValuesInArray(multipliedArray);
        // console.log(sumResult);

        if(multipliedArray[i] !== undefined){
            // protein = parseInt(data.protein);
            // carbohydrates =  parseInt(data.totalCarbohydrates);
            // fat = parseInt(data.totalFat);
            // calories = parseInt(data.calories);
            calories = multipliedArray[i].calories;
            protein = multipliedArray[i].protein;
            carbohydrates =  multipliedArray[i].totalCarbohydrates;
            fat = multipliedArray[i].totalFat;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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

                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>
                            {showNutrients == true ? (
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(false)} icon={chevronDownOutline} />
                                    {macroStats !== [] && (
                                        <NutrientProgressBar
                                            nutritionData={stats}

                                        />

                                    )}
                                </div>

                            ):(
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(true)} icon={chevronForwardOutline} />

                                </div>

                            )}
                        </div>


                    </div>


                )
            }else {
                console.log("else")
                return null;
            }

        }else {
            protein = multipliedArray.protein;
            carbohydrates =  multipliedArray.totalCarbohydrates;
            fat = multipliedArray.totalFat;
            calories = multipliedArray.calories;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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
                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>{formatToTwoDecimalPlaces(calories)} cals
                        <IonIcon icon={chevronForwardOutline} />
                        <IonIcon icon={chevronDownOutline} />
                        </div>

                        {macroStats !== [] && (
                            <NutrientProgressBar
                                nutritionData={stats}

                            />

                        )}

                    </div>


                );
            }else {
                console.log("else 3")
                return null;
            }


            return null;
        }


    }
    function loadAndFilterAddOns(){
        console.log(addOnsCartArray, data)
        if (addOnsCartArray.length > 0 ){
            addOnsCartArray.map((selectedAddOn, i ) => {
                if (selectedAddOn.docId === data.docId){
                    data.comboAmount = selectedAddOn.comboAmount;
                    setComboAmount(selectedAddOn.comboAmount)
                    console.log(data)

                }
            })
        }
    }
    function populateAddOnsDocIds(array){
        let cartAddOnsDocId = [];

        addOnsCartArray.map((cartAddOn) => {

            console.log(cartAddOn)
            cartAddOnsDocId = [...cartAddOnsDocId, cartAddOn.docId]

            console.log(cartAddOnsDocId)

        })

        return cartAddOnsDocId;
    }
    async function onAddAmountToData() {

        let newData = data;

        console.log(data)
        console.log(newData)

        console.log(addOnsCartArray)
        console.log(addOnsCartArray[0]?.length)
        console.log(addOnsCartArray.length)
        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 0")

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
                let tempCart = [...cartArray]
                tempCart[cartIndex].sidesCartArray = [...tempArr]
                console.log(tempCart)
                setCartArray([...tempCart])
            }
            else {

                if (addOnsCartArray[0]?.length === 0 || addOnsCartArray === []){
                    console.log("ITS WORKING!!")
                    let temp = newData;
                    temp.comboAmount = 1;
                    temp.total = temp.unitPrice * temp.comboAmount;
                    console.log(temp.total, "TOTAL")

                    console.log(temp)
                    setAddOnsCartArray([temp])

                    let tempCart = [...cartArray]
                    console.log(cartArray, tempCart, cartIndex)
                    console.log(tempCart[cartIndex])
                    console.log(tempCart[cartIndex].sidesCartArray)
                    tempCart[cartIndex].sidesCartArray = [temp]


                    console.log(tempCart)
                    setCartArray([...tempCart])

                }else{
                    console.log(newData.ingredientName, "Does Not include ")
                    let tempArr = [...addOnsCartArray]
                    let temp = newData;
                    temp.comboAmount = 1;
                    temp.total = temp.unitPrice * temp.comboAmount
                    console.log(temp.total, "TOTAL 1")


                    console.log(temp)
                    tempArr.push(temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])

                    let tempCart = [...cartArray]
                    console.log(cartArray, tempCart)
                    console.log(tempCart[cartIndex])
                    console.log(tempCart[cartIndex].sidesCartArray)

                    tempCart[cartIndex].sidesCartArray = [...tempArr]
                    console.log(tempCart)
                    setCartArray([...tempCart])
                }

            }

        } else {
            console.log("Array.length === 0")
            let temp = newData;
            temp.comboAmount = 1;
            temp.total = temp.unitPrice * temp.comboAmount;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])

            let tempCart = [...cartArray]
            console.log(cartArray, tempCart, cartIndex)
            console.log(tempCart[cartIndex])
            console.log(tempCart[cartIndex].sidesCartArray)

            tempCart[cartIndex].sidesCartArray = [tempArr]
            console.log(tempCart)
            setCartArray(tempCart)
        }
    }
    async function onDecreaseAmountToData() {

        let newData = {...data}

        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];

                if (addOnsCartArray[cartIndex].comboAmount > 1 ){

                    temp.comboAmount = addOnsCartArray[cartIndex].comboAmount - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    tempArr.splice(cartIndex, 1, temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                }else {
                    console.log(addOnsCartArray[cartIndex].comboAmount)
                    temp.comboAmount = parseInt(addOnsCartArray[cartIndex].comboAmount) - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    console.log(tempArr)
                    tempArr.splice(cartIndex, 1)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                    setComboAmount(0)
                    setAddOnsCartArray(tempArr)
                        console.log("SEtting backdrop true")
                        setBackDrop(true)

                }

            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])

                if (temp.comboAmount === 0 ){
                    console.log("SEtting backdrop true")
                    setBackDrop(true)
                }
            }

        } else {
            console.log("Array.length === 0")

            let tempArr = [...addOnsCartArray]
            let temp = newData;
            temp.comboAmount = 1;

            temp.total = temp.unitPrice * temp.comboAmount

            console.log(temp)
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }

    // const priceToDisplay =   data.unitPrice * comboAmount;

    function onCheckMarkClick(){
        // setComboAmount(1);
        // data.comboAmount = 1;

        setBackDrop(false)
        console.log(data)
        onAddAmountToData().then(console.log(data))
    }

    function onDeleteFromCartClick(){

        console.log(addOnsCartArray)
        data.comboAmount = 0;
        data.unitPrice = 6;
        data.unitAmount = 32;

        if ( addOnsCartArray.length > 1 ){

            let temp = [...addOnsCartArray];
            temp.splice(i, 1, )


            console.log(addOnsCartArray, temp)
            setAddOnsCartArray([...temp])
            setBackDrop(true)
        }else {
            setAddOnsCartArray([])
            setBackDrop(true)
            console.log(addOnsCartArray)


        }

    }
    function drinkSizeClicked(s,p){
        // let temp = addOnsCartArray;


        // setAddOnsCartArray([...temp])
        console.log(s, "oz", "$", p, ".00")
        setDrinkSize(s)


        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(data.docId))

            if (res.includes(data.docId)) {

                let cartIndex = res.indexOf(data.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                // temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                // temp.total = temp.unitPrice * temp.comboAmount
                // console.log(temp.total, "TOTAL 0")

                temp.unitPrice = p;
                temp.unitAmount = s;
                temp.comboAmount = 1;
                temp.total = data.unitPrice;

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }
            else {
                console.log(data.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = data;

                temp.unitPrice = p;
                temp.unitAmount = s;
                temp.comboAmount = 1;
                temp.total = data.unitPrice;

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")
            data.unitPrice = p;
            data.unitAmount = s;
            let temp = data;
            temp.comboAmount = 1;
            temp.total = data.unitPrice;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }

    }
    function renderAddOnComponent(){

        return (
            <IonCard style={{
                // minWidth: "10em",
                width: "8em",
                // minHeight: "25em",
                height: "fit-content",
                fontSize: ".6rem",
                margin: ".5em",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}>
                {backDrop && (
                    <IonBackdrop style={{
                        background: "var(--ion-color-dark)",
                        opacity: "0.5",
                    }} visible={true}
                                 tappable={true}
                                 onIonBackdropTap={() => onCheckMarkClick()}
                    ></IonBackdrop>
                )}
                {!backDrop && (
                    <div
                        onClick={() => onDeleteFromCartClick()}
                        style={{

                            // color: "red",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            right: ".2em",
                            position: "fixed"
                        }}>X</div>
                )}




                <div style={{
                marginTop: "1.4em",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{
                        fontSize: ".8rem",
                        height: "fit-content ",
                        textAlign: "center",
                        padding: ".2em",
                        color: "#333",
                        fontWeight: data.comboAmount > 0 ? "bold" : "normal",
                        // backgroundColor: data.comboAmount > 0 ? "#498bce" : "#aabbcc",
                    }}>
                        {data.ingredientName}
                    </div>

                    <div style={{
                        // border: "solid",
                        width: "fit-content",
                        height: "3em",
                        // borderColor: "#ddd",
                        margin: "auto"
                    }}>
                        <img
                            src={data.imgUrl}
                            style={{
                                // margin:"auto",
                                // backgroundColor:"red",
                                width: "auto",
                                height: "3em",
                                objectFit: "cover",
                            }}
                        />

                    </div>
                    {comboAmount === 0 ? (<div style={{ width: "fit-content", margin: "auto"}}>

                        <div style={{margin: ".5em auto",  width:"fit-content"}}>
                            {/*<input style={{margin: "auto",*/}
                            {/*    width: "20px",*/}
                            {/*    height: "20px",*/}
                            {/*}}type="checkbox"*/}
                            {/*       onClick={() => onCheckMarkClick()}*/}
                            {/*/>*/}
                        </div>
                        <div style={{display:"flex", justifyContent: "space-between"}}>
                            <div onClick={() => drinkSizeClicked(16, 3)} style={{ border:  drinkSize === 16 ? ("solid thin"):(""), backgroundColor: drinkSize === 16 ? ("rgba(78,169,197,0.5)"):(""), fontWeight: drinkSize === 16 ? ("bolder"):(""), cursor:"pointer", width: "fit-content", height:"1.7em", textAlign: "center", fontSize: ".6rem"}}>16oz</div>
                            <div  onClick={() => drinkSizeClicked(20, 4)} style={{ border:  drinkSize === 20 ? ("solid thin"):(""),  cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>20oz</div>
                            <div  onClick={() => drinkSizeClicked(32, 6)} style={{ border:  drinkSize === 32 ? ("solid thin"):(""), cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>32oz</div>
                        </div>

                        <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                            {data.unitAmount } {data.unitGramsOrCups}
                        </div>
                        <label style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            margin: ".3em auto",
                            color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                        }}>
                            ${ data.unitPrice}
                            {/*${priceToDisplay.toFixed(2)}*/}
                        </label>

                        <div>
                            {calculateAndRenderAddOnsNutritionProfile()}
                            {/*{calculateAndRenderAddOnsNutritionProfile2()}*/}


                        </div>
                    </div>):(
                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "space-around",
                        }}>
                            <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                {data.unitAmount } {data.unitGramsOrCups}
                            </div>
                            <div style={{display:"flex", justifyContent: "space-between"}}>
                                <div onClick={() => drinkSizeClicked(16, 3)} style={{ border:  drinkSize === 16 ? ("solid thin"):(""), backgroundColor: drinkSize === 16 ? ("rgba(78,169,197,0.5)"):(""), fontWeight: drinkSize === 16 ? ("bolder"):(""), cursor:"pointer", width: "fit-content", height:"1.7em", textAlign: "center", fontSize: ".6rem"}}>16oz</div>
                                <div  onClick={() => drinkSizeClicked(20, 4)} style={{ border:  drinkSize === 20 ? ("solid thin"):(""),  cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>20oz</div>
                                <div  onClick={() => drinkSizeClicked(32, 6)} style={{ border:  drinkSize === 32 ? ("solid thin"):(""), cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>32oz</div>
                            </div>

                            <label style={{
                                textAlign: "center",
                                fontSize: "1.2rem",
                                margin: ".3em auto",
                                color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                            }}>
                                ${data.unitPrice * comboAmount}
                                {/*${priceToDisplay.toFixed(2)}*/}
                            </label>

                            <div>
                                {calculateAndRenderAddOnsNutritionProfile()}


                            </div>

                        </div>
                    )}

                </div>
            </IonCard>
        )
    }
    return (<div>
            {renderAddOnComponent()}
        </div>
    )


}
export function CartDrinksComponent({data, i, addOnsFromFirebase, addOnsCartArray, setAddOnsCartArray, setCartArray, cartArray, cartIndex

                        }){

    const [comboAmount , setComboAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))
    const [ macroStats, setMacroStats ] = useState([])
    const [ backDrop , setBackDrop ] = useState(data.comboAmount > 0 ? (false):(true))
    const [showNutrients, setShowNutrients ] = useState(true)
    const [drinkSize, setDrinkSize ] = useState(32)

    useEffect(() => {
        loadAndFilterAddOns()
        console.log(addOnsCartArray, cartArray)
    },[addOnsCartArray, data, comboAmount])

    function calculateAndRenderAddOnsNutritionProfile(){


        function multiplyValuesInArray() {
            console.log(addOnsFromFirebase)
            return addOnsFromFirebase?.map((item) => {
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
            });
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
        let amount, sumResult, ingredientNutrition, multipliedArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat, price, carbohydrates = 0;


        console.log(data)

        multipliedArray = multiplyValuesInArray();
        console.log(multipliedArray);
        console.log(multipliedArray[i]);
        // sumResult = sumValuesInArray(multipliedArray);
        // console.log(sumResult);

        if(multipliedArray[i] !== undefined){
            // protein = parseInt(data.protein);
            // carbohydrates =  parseInt(data.totalCarbohydrates);
            // fat = parseInt(data.totalFat);
            // calories = parseInt(data.calories);
            calories = multipliedArray[i].calories;
            protein = multipliedArray[i].protein;
            carbohydrates =  multipliedArray[i].totalCarbohydrates;
            fat = multipliedArray[i].totalFat;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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

                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>
                            {showNutrients == true ? (
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(false)} icon={chevronDownOutline} />
                                    {macroStats !== [] && (
                                        <NutrientProgressBar
                                            nutritionData={stats}

                                        />

                                    )}
                                </div>

                            ):(
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(true)} icon={chevronForwardOutline} />

                                </div>

                            )}
                        </div>


                    </div>


                )
            }else {
                console.log("else")
                return null;
            }

        }else {
            protein = multipliedArray.protein;
            carbohydrates =  multipliedArray.totalCarbohydrates;
            fat = multipliedArray.totalFat;
            calories = multipliedArray.calories;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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
                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>{formatToTwoDecimalPlaces(calories)} cals
                        <IonIcon icon={chevronForwardOutline} />
                        <IonIcon icon={chevronDownOutline} />
                        </div>

                        {macroStats !== [] && (
                            <NutrientProgressBar
                                nutritionData={stats}

                            />

                        )}

                    </div>


                );
            }else {
                console.log("else 3")
                return null;
            }


            return null;
        }


    }
    function loadAndFilterAddOns(){
        console.log(addOnsCartArray, data)
        if (addOnsCartArray.length > 0 ){
            addOnsCartArray.map((selectedAddOn, i ) => {
                if (selectedAddOn.docId === data.docId){
                    data.comboAmount = selectedAddOn.comboAmount;
                    setComboAmount(selectedAddOn.comboAmount)
                    console.log(data)

                }
            })
        }
    }
    function populateAddOnsDocIds(array){
        let cartAddOnsDocId = [];

        addOnsCartArray.map((cartAddOn) => {

            console.log(cartAddOn)
            cartAddOnsDocId = [...cartAddOnsDocId, cartAddOn.docId]

            console.log(cartAddOnsDocId)

        })

        return cartAddOnsDocId;
    }
    async function onAddAmountToData() {

        let newData = data;

        console.log(data)
        console.log(newData)

        console.log(addOnsCartArray)
        console.log(addOnsCartArray[0]?.length)
        console.log(addOnsCartArray.length)
        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 0")

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
                let tempCart = [...cartArray]
                tempCart[cartIndex].drinksCartArray = [...tempArr]
                console.log(tempCart)
                setCartArray([...tempCart])
            }
            else {

                if (addOnsCartArray[0]?.length === 0 || addOnsCartArray === []){
                    console.log("ITS WORKING!!")
                    let temp = newData;
                    temp.comboAmount = 1;
                    temp.total = temp.unitPrice * temp.comboAmount;
                    console.log(temp.total, "TOTAL")

                    console.log(temp)
                    setAddOnsCartArray([temp])

                    let tempCart = [...cartArray]
                    console.log(cartArray, tempCart, cartIndex)
                    console.log(tempCart[cartIndex])
                    console.log(tempCart[cartIndex].drinksCartArray)
                    tempCart[cartIndex].drinksCartArray = [temp]


                    console.log(tempCart)
                    setCartArray([...tempCart])

                }else{
                    console.log(newData.ingredientName, "Does Not include ")
                    let tempArr = [...addOnsCartArray]
                    let temp = newData;
                    temp.comboAmount = 1;
                    temp.total = temp.unitPrice * temp.comboAmount
                    console.log(temp.total, "TOTAL 1")


                    console.log(temp)
                    tempArr.push(temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])

                    let tempCart = [...cartArray]
                    console.log(cartArray, tempCart)
                    console.log(tempCart[cartIndex])
                    console.log(tempCart[cartIndex].drinksCartArray)

                    tempCart[cartIndex].drinksCartArray = [...tempArr]
                    console.log(tempCart)
                    setCartArray([...tempCart])
                }

            }

        } else {
            console.log("Array.length === 0")
            let temp = newData;
            temp.comboAmount = 1;
            temp.total = temp.unitPrice * temp.comboAmount;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])

            let tempCart = [...cartArray]
            console.log(cartArray, tempCart, cartIndex)
            console.log(tempCart[cartIndex])
            console.log(tempCart[cartIndex].drinksCartArray)

            tempCart[cartIndex].drinksCartArray = [tempArr]
            console.log(tempCart)
            setCartArray(tempCart)
        }
    }
    async function onDecreaseAmountToData() {

        let newData = {...data}

        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];

                if (addOnsCartArray[cartIndex].comboAmount > 1 ){

                    temp.comboAmount = addOnsCartArray[cartIndex].comboAmount - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    tempArr.splice(cartIndex, 1, temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                }else {
                    console.log(addOnsCartArray[cartIndex].comboAmount)
                    temp.comboAmount = parseInt(addOnsCartArray[cartIndex].comboAmount) - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    console.log(tempArr)
                    tempArr.splice(cartIndex, 1)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                    setComboAmount(0)
                    setAddOnsCartArray(tempArr)
                        console.log("SEtting backdrop true")
                        setBackDrop(true)

                }

            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])

                if (temp.comboAmount === 0 ){
                    console.log("SEtting backdrop true")
                    setBackDrop(true)
                }
            }

        } else {
            console.log("Array.length === 0")

            let tempArr = [...addOnsCartArray]
            let temp = newData;
            temp.comboAmount = 1;

            temp.total = temp.unitPrice * temp.comboAmount

            console.log(temp)
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }

    // const priceToDisplay =   data.unitPrice * comboAmount;

    function onCheckMarkClick(){
        // setComboAmount(1);
        // data.comboAmount = 1;

        setBackDrop(false)
        console.log(data)
        onAddAmountToData().then(console.log(data))
    }

    function onDeleteFromCartClick(){

        console.log(addOnsCartArray)
        data.comboAmount = 0;
        data.unitPrice = 6;
        data.unitAmount = 32;

        if ( addOnsCartArray.length > 1 ){

            let temp = [...addOnsCartArray];
            temp.splice(i, 1, )


            console.log(addOnsCartArray, temp)
            setAddOnsCartArray([...temp])
            setBackDrop(true)
        }else {
            setAddOnsCartArray([])
            setBackDrop(true)
            console.log(addOnsCartArray)


        }

    }
    function drinkSizeClicked(s,p){
        // let temp = addOnsCartArray;


        // setAddOnsCartArray([...temp])
        console.log(s, "oz", "$", p, ".00")
        setDrinkSize(s)


        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(data.docId))

            if (res.includes(data.docId)) {

                let cartIndex = res.indexOf(data.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                // temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                // temp.total = temp.unitPrice * temp.comboAmount
                // console.log(temp.total, "TOTAL 0")

                temp.unitPrice = p;
                temp.unitAmount = s;
                temp.comboAmount = 1;
                temp.total = data.unitPrice;

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }
            else {
                console.log(data.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = data;

                temp.unitPrice = p;
                temp.unitAmount = s;
                temp.comboAmount = 1;
                temp.total = data.unitPrice;

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")
            data.unitPrice = p;
            data.unitAmount = s;
            let temp = data;
            temp.comboAmount = 1;
            temp.total = data.unitPrice;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }

    }
    function renderAddOnComponent(){

        return (
            <IonCard style={{
                // minWidth: "10em",
                width: "8em",
                // minHeight: "25em",
                height: "fit-content",
                fontSize: ".6rem",
                margin: ".5em",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}>
                {backDrop && (
                    <IonBackdrop style={{
                        background: "var(--ion-color-dark)",
                        opacity: "0.5",
                    }} visible={true}
                                 tappable={true}
                                 onIonBackdropTap={() => onCheckMarkClick()}
                    ></IonBackdrop>
                )}
                {!backDrop && (
                    <div
                        onClick={() => onDeleteFromCartClick()}
                        style={{

                            // color: "red",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            right: ".2em",
                            position: "fixed"
                        }}>X</div>
                )}




                <div style={{
                marginTop: "1.4em",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{
                        fontSize: ".8rem",
                        height: "fit-content ",
                        textAlign: "center",
                        padding: ".2em",
                        color: "#333",
                        fontWeight: data.comboAmount > 0 ? "bold" : "normal",
                        // backgroundColor: data.comboAmount > 0 ? "#498bce" : "#aabbcc",
                    }}>
                        {data.ingredientName}hello
                    </div>

                    <div style={{
                        // border: "solid",
                        width: "fit-content",
                        height: "3em",
                        // borderColor: "#ddd",
                        margin: "auto"
                    }}>
                        <img
                            src={data.imgUrl}
                            style={{
                                // margin:"auto",
                                // backgroundColor:"red",
                                width: "auto",
                                height: "3em",
                                objectFit: "cover",
                            }}
                        />

                    </div>
                    {comboAmount === 0 ? (<div style={{ width: "fit-content", margin: "auto"}}>


                        <div style={{display:"flex", justifyContent: "space-between"}}>
                            <div onClick={() => drinkSizeClicked(16, 3)} style={{ border:  drinkSize === 16 ? ("solid thin"):(""), backgroundColor: drinkSize === 16 ? ("rgba(78,169,197,0.5)"):(""), fontWeight: drinkSize === 16 ? ("bolder"):(""), cursor:"pointer", width: "fit-content", height:"1.7em", textAlign: "center", fontSize: ".6rem"}}>16oz</div>
                            <div  onClick={() => drinkSizeClicked(20, 4)} style={{ border:  drinkSize === 20 ? ("solid thin"):(""),  cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>20oz</div>
                            <div  onClick={() => drinkSizeClicked(32, 6)} style={{ border:  drinkSize === 32 ? ("solid thin"):(""), cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>32oz</div>
                        </div>

                        <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                            {data.unitAmount } {data.unitGramsOrCups}
                        </div>
                        <label style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            margin: ".3em auto",
                            color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                        }}>
                            ${ data.unitPrice}
                            {/*${priceToDisplay.toFixed(2)}*/}
                        </label>

                        <div>
                            {calculateAndRenderAddOnsNutritionProfile()}
                            {/*{calculateAndRenderAddOnsNutritionProfile2()}*/}


                        </div>
                    </div>):(
                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "space-around",
                        }}>
                            <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                {data.unitAmount } {data.unitGramsOrCups}
                            </div>
                            <div style={{display:"flex", justifyContent: "space-between"}}>
                                <div onClick={() => drinkSizeClicked(16, 3)} style={{ border:  drinkSize === 16 ? ("solid thin"):(""), backgroundColor: drinkSize === 16 ? ("rgba(78,169,197,0.5)"):(""), fontWeight: drinkSize === 16 ? ("bolder"):(""), cursor:"pointer", width: "fit-content", height:"1.7em", textAlign: "center", fontSize: ".6rem"}}>16oz</div>
                                <div  onClick={() => drinkSizeClicked(20, 4)} style={{ border:  drinkSize === 20 ? ("solid thin"):(""),  cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>20oz</div>
                                <div  onClick={() => drinkSizeClicked(32, 6)} style={{ border:  drinkSize === 32 ? ("solid thin"):(""), cursor:"pointer",width:  "fit-content", height:"1.7em", fontWeight: drinkSize === 16 ? ("bolder"):(""),textAlign: "center", fontSize: ".6rem"}}>32oz</div>
                            </div>

                            <label style={{
                                textAlign: "center",
                                fontSize: "1.2rem",
                                margin: ".3em auto",
                                color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                            }}>
                                ${data.unitPrice * comboAmount}
                                {/*${priceToDisplay.toFixed(2)}*/}
                            </label>

                            <div>
                                {calculateAndRenderAddOnsNutritionProfile()}


                            </div>

                        </div>
                    )}

                </div>
            </IonCard>
        )
    }
    return (<div>
            {renderAddOnComponent()}
        </div>
    )


}

function ChooseComponent({data, i, addOnsFromFirebase, addOnsCartArray, setAddOnsCartArray,
    chosenOption, setChosenOption
                        }){

    const[ showNutrients, setShowNutrients ] = useState(true)
    const [comboAmount , setComboAmount ] = useState(1)
    const [ macroStats, setMacroStats ] = useState([])
    useEffect(() => {
        loadAndFilterAddOns()
        console.log(addOnsFromFirebase, addOnsCartArray)
        if (addOnsFromFirebase.length === 1 ){
            let tempArr = [...addOnsCartArray]
            let temp = data;
            temp.comboAmount = 1;
            temp.total = temp.unitPrice;
            console.log(temp)
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray(temp)
            // data.comboAmount = 1;
            setChosenOption(data)
        }
        // else{
        //     let tempArr = [...addOnsFromFirebase]
        //
        //     tempArr.map((temp) => {
        //         temp.comboAmount = 0;
        //         console.log(temp)
        //     })
        //
        //     console.log(tempArr)
        //     setAddOnsCartArray([...tempArr])
        // }
        console.log(chosenOption)
    },[ ])

    function calculateAndRenderAddOnsNutritionProfile(){


        function multiplyValuesInArray() {
            console.log(addOnsCartArray)
            return addOnsCartArray?.map((item) => {
                const multipliedItem = {};


                Object.keys(item).forEach((key) => {
                    const originalValue = item[key];
                    const numericValue = Number(originalValue);
                    // console.log(key,numericValue, item)
                    const mult = item.comboAmount === 0 ? (1):(item.comboAmount)

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
            });
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
        let amount, sumResult, ingredientNutrition, multipliedArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat,  carbohydrates = 0;


        console.log(data)

        multipliedArray = addOnsCartArray;
        console.log(multipliedArray);
        console.log(multipliedArray[i]);
        // sumResult = sumValuesInArray(multipliedArray);
        // console.log(sumResult);

        // if(multipliedArray[i] !== undefined){
        //     // protein = parseInt(data.protein);
        //     // carbohydrates =  parseInt(data.totalCarbohydrates);
        //     // fat = parseInt(data.totalFat);
        //     // calories = parseInt(data.calories);
        //    calories = multipliedArray[i].calories;
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     console.log(protein, carbohydrates, fat, calories)
        //     let stats= ([
        //         {name: "Protein", value: protein, minimumRecommended: 40, max: 70},
        //         {name: "Carbs", value: carbohydrates, minimumRecommended: 60, max: 120},
        //         {name: "Fats", value: fat, minimumRecommended: 50, max: 120},
        //         {name: "Calories", value: calories, minimumRecommended: 500, max: 1000}])
        //     console.log(
        //         "name: Protein, value:", protein,
        //         "name: Carbs, value:", carbohydrates,
        //         "name: Fats, value:", fat,
        //         "name: Calories, value:", calories)
        //
        //     if (protein > 0 || carbohydrates > 0 || fat > 0 || calories > 0) {
        //         console.log("Returning!!")
        //         return (
        //             <div>
        //                 {/*<div style={{fontSize: ".7rem",}}>*/}
        //                 {/*    <div>Protein {formatToTwoDecimalPlaces(protein)} g</div>*/}
        //                 {/*    <div>Carbohydrates {formatToTwoDecimalPlaces(carbohydrates)} g</div>*/}
        //                 {/*    <div>Fat {formatToTwoDecimalPlaces(fat)} g</div>*/}
        //                 {/*    <div>Calories {formatToTwoDecimalPlaces(calories)}</div>*/}
        //                 {/*</div>*/}
        //                 <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>{calories} cals</div>
        //
        //                 {macroStats !== [] && (
        //                     <NutrientProgressBar
        //                         nutritionData={stats}
        //
        //                     />
        //
        //                 )}
        //
        //             </div>
        //
        //
        //         );
        //     }else {
        //         console.log("else")
        //         return null;
        //     }
        //
        // }else {
            protein = data.protein;
            carbohydrates =  data.totalCarbohydrates;
            fat = data.totalFat;
            calories = data.calories;
            console.log(protein, carbohydrates, fat, calories)
            let stats= ([
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

                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>
                            {showNutrients == true ? (
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(false)} icon={chevronDownOutline} />
                                    {macroStats !== [] && (
                                        <NutrientProgressBar
                                            nutritionData={stats}

                                        />

                                    )}
                                </div>

                            ):(
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(true)} icon={chevronForwardOutline} />

                                </div>

                            )}
                        </div>


                    </div>


                )
                // return (
                //     <div>
                //         {/*<div style={{fontSize: ".7rem",}}>*/}
                //         {/*    <div>Protein {formatToTwoDecimalPlaces(protein)} g</div>*/}
                //         {/*    <div>Carbohydrates {formatToTwoDecimalPlaces(carbohydrates)} g</div>*/}
                //         {/*    <div>Fat {formatToTwoDecimalPlaces(fat)} g</div>*/}
                //         {/*    <div>Calories {formatToTwoDecimalPlaces(calories)}</div>*/}
                //         {/*</div>*/}
                //         <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>{calories} cals</div>
                //
                //         {macroStats !== [] && (
                //             <NutrientProgressBar
                //                 nutritionData={stats}
                //
                //             />
                //
                //         )}
                //
                //     </div>
                //
                //
                // );
            }else {
                console.log("else 3")
                return null;
            }

            // return null;
        // }


    }


    function loadAndFilterAddOns(){
        console.log(addOnsCartArray, data)
        if (addOnsCartArray.length > 0 ){
            addOnsCartArray.map((selectedAddOn, i ) => {
                if (selectedAddOn.docId === data.docId){
                    data.comboAmount = selectedAddOn.comboAmount;
                    setComboAmount(selectedAddOn.comboAmount)
                    console.log(data)

                }
            })
        }
    }
    function populateAddOnsDocIds(array){
        let cartAddOnsDocId = [];

        addOnsCartArray.map((cartAddOn) => {

            console.log(cartAddOn)
            cartAddOnsDocId = [...cartAddOnsDocId, cartAddOn.docId]

            console.log(cartAddOnsDocId)

        })

        return cartAddOnsDocId;
    }
    async function onAddAmountToData() {

        let newData = {...data}

        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;
                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")
            let temp = newData;
            temp.comboAmount = 1;
            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }
    async function onDecreaseAmountToData() {

        let newData = {...data}

        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];

                if (addOnsCartArray[cartIndex].unitAmount > 1 ){

                    temp.comboAmount = addOnsCartArray[cartIndex].comboAmount - 1;
                    tempArr.splice(cartIndex, 1, temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                }else {
                    temp.comboAmount = addOnsCartArray[cartIndex].comboAmount - 1;
                    console.log(tempArr)
                    tempArr.splice(cartIndex, 1, )
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                    setComboAmount(0)
                }

            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
            }

        } else {
            console.log("Array.length === 0")

        }
    }

    let priceToDisplay = 0.00;

    if( comboAmount === 0 ) {
        priceToDisplay = data.unitPrice
        console.log(data.unitPrice, priceToDisplay)

    }else{
        console.log(data.unitPrice)

        priceToDisplay = data.unitPrice * comboAmount
    }

    function onOptionClick(){
        data.comboAmount = 1;
        data.total = data.unitPrice;
        console.log(data)
        console.log(addOnsCartArray)
        setAddOnsCartArray(data)
            setChosenOption(data)
    }
    function renderChoosenComponent() {


        if ( chosenOption.docId === data.docId){
            return (
                <IonCard style={{
                    // minWidth: "9em",
                    width: "10em",
                    // minHeight: "25em",
                    height: "fit-content",
                    fontSize: ".6rem",
                    margin: "auto",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    overflow: "hidden",

                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div style={{
                            fontSize: ".8rem",
                            height: "3em",
                            textAlign: "center",
                            padding: ".2em",
                            color: "#333",
                            fontWeight: data.comboAmount > 0 ? "bold" : "normal",
                            // backgroundColor: data.comboAmount > 0 ? "#498bce" : "#aabbcc",
                        }}>
                            {data.ingredientName}
                        </div>

                        <div style={{
                            // border: "solid",
                            width: "100%",
                            height: "6em",
                            // borderColor: "#ddd",
                            margin: "auto"
                        }}>
                            <img
                                src={data.imgUrl}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />

                        </div>

                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "space-around",
                        }}>
                            <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                {data.unitAmount} {data.unitGramsOrCups}
                            </div>

                            <label style={{
                                textAlign: "center",
                                fontSize: "1.2rem",
                                margin: ".3em auto",
                                color:"green",
                            }}>
                                ${priceToDisplay}
                            </label>

                            {/*{addOnsCartArray.length > 0 && (*/}
                                <div>
                                    {calculateAndRenderAddOnsNutritionProfile()}


                                </div>




                        </div>
                    </div>
                </IonCard>

            )

        }else {
            return (

                    <IonCard style={{
                        // border: "solid 1em blue",
                        // backgroundColor: "rgb(0,0,0)",
                        // minWidth: "18em",
                        width: "10em",
                        // minHeight: "25em",
                        height: "fit-content",
                        fontSize: ".6rem",
                        margin: ".5em",
                        cursor: "pointer",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        overflow: "hidden",
                        transition: "transform 0.2s ease-in-out",
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}

                    >
                        <IonBackdrop style={{
                            background: "var(--ion-color-dark)",
                            opacity: "0.5",
                        }} visible={true} tappable={true}
                                     onIonBackdropTap={() => onOptionClick()}
                        ></IonBackdrop>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                        >
                            <div style={{
                                fontSize: ".8rem",
                                height: "3em",
                                textAlign: "center",
                                padding: ".2em",
                                // color: "white",

                                fontWeight: data.comboAmount > 0 ? "bold" : "normal",
                                // backgroundColor: data.comboAmount > 0 ? "#498bce" : "#aabbcc",
                            }}>
                                {data.ingredientName}
                            </div>

                            <div style={{
                                // border: "solid",
                                width: "100%",
                                height: "6em",
                                // borderColor: "#ddd",
                                margin: "auto"
                            }}>
                                <img
                                    src={data.imgUrl}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />

                            </div>

                            <div style={{
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "space-around",
                            }}>
                                <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                    {data.unitAmount} {data.unitGramsOrCups}
                                </div>

                                <label style={{
                                    textAlign: "center",
                                    fontSize: "1.2rem",
                                    margin: ".3em auto",
                                    // color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                                }}>
                                    ${priceToDisplay}
                                    {console.log(comboAmount)}
                                </label>

                                {/*{addOnsCartArray.length > 0 && (*/}

                                        {calculateAndRenderAddOnsNutritionProfile()}


                            </div>
                        </div>
                    </IonCard>
            )
        }


    }
    return (<div>
            {renderChoosenComponent()}
        </div>
    )

}

function AddOnCartComponent({addOnsCartArray, setMenuItemPageSwitchCase}){

    const [macroStats, setMacroStats] = useState([])
    function multiplyValuesInArray(array) {
        console.log(array)
        console.log(array.length)

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
                    && key !==  "unitPrice"
                    && key !== "unitGramsOrCups"
                    && key !== "comboAmount"
                ) {
                    switch (item.unitGramsOrCups) {

                        case "item":
                            multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount   ;
                            break;
                        case "grams":
                            multipliedItem[key] = numericValue * item.comboAmount * (item.unitAmount/item.servingSizeGrams) ;
                            break;
                        case "tsp":
                            multipliedItem[key] = numericValue * item.comboAmount * (((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount)/3) ;
                            break;
                        case "tbsp":
                            multipliedItem[key] = numericValue * item.comboAmount * ((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount) ;
                            break;
                        case "cups":
                            multipliedItem[key] = (numericValue * ((item.gramsPerTbsp/item.servingSizeGrams)*16)*item.comboAmount) ;

                            break;
                    }
                } else {
                    multipliedItem[key] = originalValue;
                }
            });

            return multipliedItem;
        });
    }


    function sumValuesInArray(arrayOfObjects) {
        // Initialize an object to store the sum
        const sumObject = {};

        // Iterate through each object in the array
        arrayOfObjects.forEach((obj) => {
            // Iterate through each key in the object
            console.log(obj)
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



    function calculateCartNutritionTotals(){
        console.log(addOnsCartArray, "CALCULATING cart NUTRITION TOTALS")
        console.log(addOnsCartArray)
        let sumResult, multipliedArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat,  carbohydrates = 0;


        if (addOnsCartArray.length !== undefined){
            console.log("undefined")
            multipliedArray = multiplyValuesInArray(addOnsCartArray);
            console.log(multipliedArray);

            sumResult = sumValuesInArray(multipliedArray);
            console.log(sumResult);

            protein = sumResult.protein;
            carbohydrates =  sumResult.totalCarbohydrates;
            fat = sumResult.totalFat;
            calories = sumResult.calories;
        }else {
         console.log("else")

            protein = addOnsCartArray.protein;
            carbohydrates =  addOnsCartArray.totalCarbohydrates;
            fat = addOnsCartArray.totalFat;
            calories = addOnsCartArray.calories;
        }


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




    function renderTotal(){
        let total = 0;
        if (addOnsCartArray.length !== undefined){
            addOnsCartArray?.map((addOn) => {
                let addOnTotal = (parseInt(addOn.comboAmount) * parseFloat(addOn.unitPrice))
                total += addOnTotal;
                console.log(parseFloat((addOn.unitPrice)))
                console.log(addOn.comboAmount, total, (parseInt(addOn.comboAmount) * parseFloat(addOn.unitPrice)))

            })

            console.log(total, addOnsCartArray,"IF")
        }else {
            total = parseInt(addOnsCartArray.comboAmount) * parseFloat(addOnsCartArray.unitPrice)
            console.log(parseFloat((addOnsCartArray.unitPrice)))
            console.log(addOnsCartArray.comboAmount)

            console.log(total, addOnsCartArray,"else")

        }

        console.log(addOnsCartArray, total, "TOTAL")


        return (
            <div>
                {calculateCartNutritionTotals()}

                <div style={{fontSize:"1.8rem"}}>
                    ${total.toFixed(2)}
                </div>
            </div>
        )
    }


    useEffect(() => {
        console.log("USE EFFECT !@$", addOnsCartArray)
    }, [])

    function renderAddOnsCartComponent(){
        return (
            <IonCard>
                <IonCardContent style={{textAlign:"center"}}>
                    <div style={{ fontSize:"1.8rem"}} >Total</div>
                    <div>+ Add Ons</div>
                    <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green"}}>
                        {renderTotal()}
                    </div>

                    <IonButton
                        onClick={() => setMenuItemPageSwitchCase("more")}
                        color="warning"
                        // fill="outline"
                        expand="block">Continue</IonButton>


                </IonCardContent>
            </IonCard>
        )
    }

    return ( <div>
        {renderAddOnsCartComponent()}
    </div>)

}

// function AddOnCartComponent({ addOnsCartArray, setMenuItemPageSwitchCase }) {
//     const [macroStats, setMacroStats] = useState([]);
//
//     function multiplyValuesInArray(array) {
//         console.log(array)
//         return array?.map((item) => {
//             const multipliedItem = {};
//
//
//             Object.keys(item).forEach((key) => {
//                 const originalValue = item[key];
//                 const numericValue = Number(originalValue);
//
//                 if (!isNaN(numericValue)
//                     && key !== "gramsPerTbsp"
//                     && key !== "price"
//                     && key !== "total"
//                     && key !== "servingSizeGrams"
//                     && key !== "unitAmount"
//                     && key !==  "unitPrice"
//                     && key !== "unitGramsOrCups"
//                     && key !== "comboAmount"
//                 ) {
//                     switch (item.unitGramsOrCups) {
//
//                         case "item":
//                             multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount   ;
//                             break;
//                         case "grams":
//                             multipliedItem[key] = numericValue * item.comboAmount * (item.unitAmount/item.servingSizeGrams) ;
//                             break;
//                         case "tsp":
//                             multipliedItem[key] = numericValue * item.comboAmount * (((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount)/3) ;
//                             break;
//                         case "tbsp":
//                             multipliedItem[key] = numericValue * item.comboAmount * ((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount) ;
//                             break;
//                         case "cups":
//                             multipliedItem[key] = (numericValue * ((item.gramsPerTbsp/item.servingSizeGrams)*16)*item.comboAmount) ;
//
//                             break;
//                     }
//                 } else {
//                     multipliedItem[key] = originalValue;
//                 }
//             });
//
//             return multipliedItem;
//         });
//     }
//
//
//     function sumValuesInArray(arrayOfObjects) {
//         // Initialize an object to store the sum
//         const sumObject = {};
//
//         // Iterate through each object in the array
//         arrayOfObjects.forEach((obj) => {
//             // Iterate through each key in the object
//             console.log(obj)
//             Object.keys(obj).forEach((key) => {
//                 // Convert the value to a number and add it to the sum
//                 const numericValue = Number(obj[key]);
//                 if (!isNaN(numericValue)) {
//                     sumObject[key] = (sumObject[key] || 0) + numericValue;
//                 }
//             });
//         });
//
//         // Return the object with summed values
//         return sumObject;
//     }
//
//
//
//     function calculateCartNutritionTotals(){
//         console.log(addOnsCartArray, "CALCULATING cart NUTRITION TOTALS")
//         console.log(addOnsCartArray)
//         let sumResult, multipliedArray;
//
//         const formatToTwoDecimalPlaces = (value) => {
//             return value % 1 !== 0 ? value.toFixed(2) : value;
//         };
//         let calories, protein, fat,  carbohydrates = 0;
//
//
//         multipliedArray = multiplyValuesInArray(addOnsCartArray);
//         console.log(multipliedArray);
//
//         sumResult = sumValuesInArray(multipliedArray);
//         console.log(sumResult);
//
//         protein = sumResult.protein;
//         carbohydrates =  sumResult.totalCarbohydrates;
//         fat = sumResult.totalFat;
//         calories = sumResult.calories;
//         console.log(protein, carbohydrates, fat, calories)
//
//
//         // if(multipliedArray[i] !== undefined){
//         //     protein = multipliedArray[i].protein;
//         //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
//         //     fat = multipliedArray[i].totalFat;
//         //     calories = multipliedArray[i].calories;
//         console.log(protein, carbohydrates, fat, calories)
//         let stats= ([
//             {name: "Protein", value: protein, minimumRecommended: 40, max: 70},
//             {name: "Carbs", value: carbohydrates, minimumRecommended: 60, max: 120},
//             {name: "Fats", value: fat, minimumRecommended: 50, max: 120},
//             {name: "Calories", value: calories, minimumRecommended: 300, max: 1000}])
//         console.log(
//             "name: Protein, value:", protein,
//             "name: Carbs, value:", carbohydrates,
//             "name: Fats, value:", fat,
//             "name: Calories, value:", calories)
//
//         if (protein > 0 || carbohydrates > 0 || fat > 0 || calories > 0) {
//             console.log("Returning!!22")
//             return (
//                 <div style={{width: "4em", margin: "auto"}}>
//                     {/*<div style={{fontSize: ".7rem",}}>*/}
//                     {/*    <div>Protein {formatToTwoDecimalPlaces(protein)} g</div>*/}
//                     {/*    <div>Carbohydrates {formatToTwoDecimalPlaces(carbohydrates)} g</div>*/}
//                     {/*    <div>Fat {formatToTwoDecimalPlaces(fat)} g</div>*/}
//                     {/*    <div>Calories {formatToTwoDecimalPlaces(calories)}</div>*/}
//                     {/*</div>*/}
//
//                     {macroStats !== [] && (
//                         <NutrientProgressBar
//                             nutritionData={stats}
//
//                         />
//
//                     )}
//
//                 </div>
//
//
//             );
//         }
//         // }else {
//         //     console.log("else")
//         //     return <div>else</div>;
//         // }
//
//
//
//     }
//     function renderTotal() {
//         let total = 0;
//
//         addOnsCartArray.forEach((addOn) => {
//             total += addOn.comboAmount * addOn.unitPrice;
//         });
//
//         return (
//             <div>
//                 {calculateCartNutritionTotals()}
//                 <div style={{ fontSize: "1.8rem" }}>
//                     ${total.toFixed(2)}
//                 </div>
//             </div>
//         );
//     }
//
//     function renderAddOnsCartComponent() {
//         return (
//             <IonCard>
//                 <IonCardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
//                     <div style={{ fontSize: "1.8rem", flex: "1" }} >Total</div>
//                     <div style={{ flex: "1", marginLeft: "1em" }}>+ Add Ons</div>
//                     <div style={{ fontWeight: "bold", fontSize: "1.8rem", color: "green", flex: "1", textAlign: "right" }}>
//                         {renderTotal()}
//                     </div>
//                     <IonButton
//                         onClick={() => setMenuItemPageSwitchCase("")}
//                         color="warning"
//                         expand="block"
//                     >
//                         Continue
//                     </IonButton>
//                 </IonCardContent>
//             </IonCard>
//         );
//     }
//
//     return (
//         <div>
//             {renderAddOnsCartComponent()}
//         </div>
//     );
// }


function ItemPageCartComponent({addOnsCartArray, setMenuItemPageSwitchCase, sidesCartArray,drinksCartArray, tortillaOptionsArray, mainIngredientsCartArray}){

    const [macroStats, setMacroStats] = useState([])
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
                    && key !==  "unitPrice"
                    && key !== "unitGramsOrCups"
                    && key !== "comboAmount"
                ) {
                    switch (item.unitGramsOrCups) {

                        case "oz":
                            multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount   ;
                            break;
                        case "item":
                            multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount   ;
                            break;
                        case "grams":
                            multipliedItem[key] = numericValue * item.comboAmount * (item.unitAmount/item.servingSizeGrams) ;
                            break;
                        case "tsp":
                            multipliedItem[key] = numericValue * item.comboAmount * (((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount)/3) ;
                            break;
                        case "tbsp":
                            multipliedItem[key] = numericValue * item.comboAmount * ((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount) ;
                            break;
                        case "cups":
                            multipliedItem[key] = (numericValue * ((item.gramsPerTbsp/item.servingSizeGrams)*16)*item.comboAmount) ;

                            break;
                    }
                } else {
                    multipliedItem[key] = originalValue;
                }
            });

            return multipliedItem;
        });
    }

    let orderData = [tortillaOptionsArray, ...mainIngredientsCartArray, ...addOnsCartArray, ...drinksCartArray, ...sidesCartArray];
    console.log("Tortilas: ",tortillaOptionsArray);
    console.log("Order Data: ",orderData);

    function sumValuesInArray(arrayOfObjects) {
        // Initialize an object to store the sum
        const sumObject = {};

        // Iterate through each object in the array
        arrayOfObjects.forEach((obj) => {
            // Iterate through each key in the object
            console.log(obj)
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



    function calculateCartNutritionTotals(){
        console.log(addOnsCartArray, "CALCULATING cart NUTRITION TOTALS")
        console.log(addOnsCartArray)
        let sumResult, sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray, multipliedDrinksArray, multipliedSidesArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat,  carbohydrates = 0;


        multipliedAddOnsArray = multiplyValuesInArray(addOnsCartArray);
        console.log(multipliedAddOnsArray);
        multipliedTortillasArray = (tortillaOptionsArray);
        console.log(multipliedTortillasArray, tortillaOptionsArray);
        multipliedEggsAndMoreArray = multiplyValuesInArray(mainIngredientsCartArray);
        console.log(multipliedEggsAndMoreArray);
        multipliedDrinksArray = multiplyValuesInArray(drinksCartArray)
        console.log(multipliedDrinksArray)
        multipliedSidesArray = multiplyValuesInArray(sidesCartArray)
        console.log(multipliedSidesArray)

        const arrayOfAll = [multipliedAddOnsArray, [multipliedTortillasArray], multipliedEggsAndMoreArray, multipliedDrinksArray]
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




    function renderTotal(){
        let total = 0;
        console.log(addOnsCartArray)
        addOnsCartArray.map((addOn) => {
            total += addOn.comboAmount * addOn.unitPrice
        })
            total += tortillaOptionsArray.comboAmount * tortillaOptionsArray.unitPrice
        // tortillaOptionsArray.map((addOn) => {
        //     total += addOn.comboAmount * addOn.unitPrice
        // })
        mainIngredientsCartArray.map((addOn) => {
            total += addOn.comboAmount * addOn.unitPrice
        })
       console.log(total)
        drinksCartArray.map((addOn) => {
            console.log(addOn.unitPrice)
            total += parseFloat(addOn.unitPrice)
        })
        sidesCartArray.map((addOn) => {
            console.log(addOn.unitPrice)
            total += parseFloat(addOn.unitPrice)
        })
        console.log(total)

        console.log(orderData)
        console.log(orderData.length)
        console.log(orderData[0])
        console.log(orderData[0] === "")
        console.log(orderData[0] === [])
        console.log(Object.keys(orderData[0]))
        console.log(Object.keys(orderData[0]).length > 0)
        // if(orderData === []){
        //     console.log("orderData = []")
        // }
        console.log(total)
        if (Object.keys(orderData[0]).length > 0) {
            return (
                <div>

                    <OrderSummaryComponent
                        orderItems={orderData}
                    />


                    {calculateCartNutritionTotals()}

                    <div style={{fontSize:"1.8rem"}}>
                        ${parseFloat(total)}
                        {/*${total.toFixed(2)}*/}
                    </div>
                </div>
            )
        }

    }


    useEffect(() => {
        console.log("USE EFFECT !@$", addOnsCartArray)
    }, [])

    function renderAddOnsCartComponent(){
        console.log(tortillaOptionsArray, mainIngredientsCartArray,addOnsCartArray)
        return (
            <IonCard>
                <IonCardContent style={{textAlign:"center"}}>


                    <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green"}}>
                        {renderTotal()}
                    </div>

                    <IonButton
                        onClick={() => setMenuItemPageSwitchCase("order summary")}
                        color="warning"
                        // fill="outline"
                        expand="block">Continue</IonButton>


                </IonCardContent>
            </IonCard>
        )
    }

    return ( <div>
        {renderAddOnsCartComponent()}
    </div>)

}
export function CartItemPageCartComponent({addOnsCartArray, sidesCartArray,drinksCartArray, tortillaOptionsArray, mainIngredientsCartArray}){

    const [macroStats, setMacroStats] = useState([])
    function multiplyValuesInArray(array) {
        console.log(array)
        if( array?.length > 0 ){
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
                        && key !==  "unitPrice"
                        && key !== "unitGramsOrCups"
                        && key !== "comboAmount"
                    ) {
                        switch (item.unitGramsOrCups) {

                            case "oz":
                                multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount   ;
                                break;
                            case "item":
                                multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount   ;
                                break;
                            case "grams":
                                multipliedItem[key] = numericValue * item.comboAmount * (item.unitAmount/item.servingSizeGrams) ;
                                break;
                            case "tsp":
                                multipliedItem[key] = numericValue * item.comboAmount * (((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount)/3) ;
                                break;
                            case "tbsp":
                                multipliedItem[key] = numericValue * item.comboAmount * ((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount) ;
                                break;
                            case "cups":
                                multipliedItem[key] = (numericValue * ((item.gramsPerTbsp/item.servingSizeGrams)*16)*item.comboAmount) ;

                                break;
                        }
                    } else {
                        multipliedItem[key] = originalValue;
                    }
                });

                return multipliedItem;
            });
        }else{
            console.log("array is empty")
            return;
        }

    }

    let orderData = [[tortillaOptionsArray], mainIngredientsCartArray, addOnsCartArray, drinksCartArray, sidesCartArray];
    console.log("Tortilas: ",tortillaOptionsArray);
    console.log("Order Data: ",orderData);

    function sumValuesInArray(arrayOfObjects) {
        // Initialize an object to store the sum
        const sumObject = {};

        // Iterate through each object in the array
        arrayOfObjects.forEach((obj) => {
            // Iterate through each key in the object
            console.log(obj)
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

    function sumValuesInArrayOfArrays(arrayOfArrays) {
        // Initialize an object to store the sum
        const sumObject = {};

        // Iterate through each array in the outer array
        arrayOfArrays.forEach((innerArray) => {

            if (innerArray === undefined) {console.log("Undefioned array ")}
            else {
                // Iterate through each object in the inner array

                console.log(innerArray, "inner array")
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
            }

        });

        // Return the object with summed values
        return sumObject;
    }



    function calculateCartNutritionTotals(){
        console.log(addOnsCartArray, mainIngredientsCartArray, drinksCartArray, sidesCartArray, tortillaOptionsArray)
        let sumResult, sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedMainIngredientsArray, multipliedDrinksArray, multipliedSidesArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat,  carbohydrates = 0;



        let isNotEmpty = value => (value.length > 0 && value[0].toString() !== "" && Object.keys(value)?.length !== 0 );

        console.log(orderData)
        // console.log(multipliedOrderData)
        let filteredArray = orderData.filter(isNotEmpty);
        console.log(filteredArray)
        let filteredMultipliedArray = filteredArray.map(obj => {
            console.log(obj)
            return multiplyValuesInArray(obj)
        })
        // sumResultAll = sumValuesInArrayOfArrays()
        // let filteredMultipliedArray = multipliedOrderData.filter(isNotEmpty);
        console.log(filteredMultipliedArray)


        // const arrayOfAll = [multipliedAddOnsArray, [multipliedTortillasArray], multipliedEggsAndMoreArray, multipliedDrinksArray]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);


        // console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(filteredMultipliedArray)
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




    function renderTotal(){
        let total = 0;

        addOnsCartArray?.map((addOn) => {
            total += addOn.comboAmount * addOn.unitPrice
        })
        console.log(total, "1")
            total += tortillaOptionsArray.comboAmount * tortillaOptionsArray.unitPrice
        console.log(total, "2")

        // tortillaOptionsArray.map((addOn) => {
        //     total += addOn.comboAmount * addOn.unitPrice
        // })
        mainIngredientsCartArray?.map((addOn) => {
            total += addOn.comboAmount * addOn.unitPrice
        })
       console.log(total)
        // let isNotEmpty = value => value != null;
        //
        // let filteredArray = arr.filter(isNotNull);

        if(drinksCartArray[0]?.length !== 0){
            drinksCartArray?.map((addOn) => {
                console.log(addOn.unitPrice)
                total += parseFloat(addOn.unitPrice)
            })
        }else {
            console.log("DRINK ARRRAY 1st ele is empty array")

        }

        if(sidesCartArray[0]?.length !== 0){
            sidesCartArray?.map((addOn) => {
                console.log(addOn.unitPrice)
                total += parseFloat(addOn.unitPrice)
            })
        }else {
            console.log("sides ARRRAY 1st ele is empty array")

        }

        let isNotEmpty = value => (value.length > 0 && value[0].toString() !== "" );

        console.log(orderData)
        let filteredArray = orderData.filter(isNotEmpty);
        console.log(filteredArray)

        console.log(total)

        console.log(orderData)

        // if(orderData === []){
        //     console.log("orderData = []")
        // }
        console.log(total)
        if (Object.keys(orderData[0]).length > 0) {
            return (
                <div>

                    <CartOrderSummaryComponent
                        orderItems={filteredArray}
                    />


                    {calculateCartNutritionTotals()}

                    <div style={{fontSize:"1.8rem"}}>
                        ${parseFloat(total)}
                        {/*${total.toFixed(2)}*/}
                    </div>
                </div>
            )
        }

    }


    useEffect(() => {
        console.log("USE EFFECT !@$", addOnsCartArray)
    }, [])

    function renderAddOnsCartComponent(){
        console.log(tortillaOptionsArray, mainIngredientsCartArray,addOnsCartArray)
        return (
            <IonCard>
                <IonCardContent style={{textAlign:"center"}}>


                    <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green"}}>
                        {renderTotal()}
                    </div>

                </IonCardContent>
            </IonCard>
        )
    }

    return ( <div>
        {renderAddOnsCartComponent()}
    </div>)

}
export function OrderCartMealComponent({ data,  i ,}){

    function renderOrderCartMealComponent(){
         console.log(data)
        return (
            <div >

                <IonCard>
                    <IonCardContent>
                        <div style={{marginBottom: ".5em", fontSize:".9rem", fontWeight: "bold", textAlign: "center"}}>
                            Meal # {i +1}
                        </div>
                        <div style={{  width:"100%"}}>
                            <div style={{display:"flex"}}>
                                <div style={{width:"80%",
                                    fontWeight: "bold",
                                    fontSize: "1.1rem",
                                    // backgroundColor:"red",
                                    textAlign: "center"}}>
                                    <div>
                                        {data.menuItemName}
                                    </div>
                                </div>

                                {/*<IonIcon icon={informationCircleOutline} />*/}

                                <div
                                    style={{fontWeight:"bold", fontSize:"1rem", color: "green", width:"fit-content",}}
                                >
                                    ${(data.entreeTotal).toFixed(2)}
                                </div>

                                {/*{calculateCartNutritionTotals()}*/}

                            </div>
                            <div style={{fontSize: ".7rem"}}>
                                -{data.tortillaOptionsArray.ingredientName}
                                {data.mainIngredientsCartArray.map((x, i) => (
                                    <div key={i}>-{x.ingredientName}</div>
                                ))}
                                {data.addOnsCartArray.map((x, i) => (
                                    <div key={i}>-{x.ingredientName}</div>
                                ))}
                            </div>

                            {data.drinksCartArray.length > 0 && (
                                <div>
                                    <div style={{textAlign:"left", marginLeft: "1em"}}>Drinks</div>


                                    <div style={{fontSize: ".7rem"}}>
                                    {data.drinksCartArray.map(drink => (
                                        <div style={{display:"flex", justifyContent: "space-between"}}>

                                            <div style={{width:"80%",
                                                fontWeight: "bold",
                                                fontSize: ".7rem",
                                                // backgroundColor:"red",
                                                textAlign: "center"}}
                                            >{drink.ingredientName}</div>
                                            <div
                                                style={{fontWeight:"bold", fontSize:"1rem", color: "green", width:"fit-content",}}

                                            >
                                                ${parseFloat(drink.unitPrice).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            )}

                            {data.sidesCartArray.length > 0 && (
                                <div>
                                    <div style={{textAlign:"left", marginLeft: "1em"}}>Sides</div>

                                    <div style={{fontSize: ".7rem"}}>
                                        {data.sidesCartArray.map(side => (
                                            <div style={{display:"flex", justifyContent: "space-between"}}>

                                                <div style={{width:"80%",
                                                    fontWeight: "bold",
                                                    fontSize: ".7rem",
                                                    // backgroundColor:"red",
                                                    textAlign: "center"}}
                                                >{side.ingredientName}</div>
                                                <div
                                                    style={{fontWeight:"bold", fontSize:"1rem", color: "green", width:"fit-content",}}

                                                >
                                                    ${parseFloat(side.unitPrice).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}


                        </div>
                        <CartItemPageCartComponent sidesCartArray={data.sidesCartArray}
                                                   mainIngredientsCartArray={data.mainIngredientsCartArray}
                                                   addOnsCartArray={data.addOnsCartArray}
                                                   drinksCartArray={data.drinksCartArray}
                                                   tortillaOptionsArray={data.tortillaOptionsArray}
                        />


                    </IonCardContent>
                </IonCard>

            </div>
        )

    }



    return (<div>
            {renderOrderCartMealComponent()}
        </div>
    )
}

function CustomizableCartMealComponent({cartArray, setCartArray,
                                       setMenuItemPageSwitchCase,
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

    const [ minimizeOrder, setMinimizeOrder ] = useState(false)

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

        const arrayOfAll = [multipliedAddOnsArray, [multipliedTortillasArray], multipliedEggsAndMoreArray]
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

    function calculateSidesNutritionTotals() {

        let sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray,
            multipliedDrinksArray, multipliedSidesArray;


        let calories, protein, fat, carbohydrates = 0;


        multipliedSidesArray = multiplyValuesInArray(data.sidesCartArray)
        console.log(multipliedSidesArray)

        const arrayOfAll = [multipliedSidesArray]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);

        console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(arrayOfAll)
        console.log(sumResultAll)

        protein = sumResultAll.protein;
        carbohydrates = sumResultAll.totalCarbohydrates;
        fat = sumResultAll.totalFat;
        calories = sumResultAll.calories;
        console.log(protein, carbohydrates, fat, calories)


        // if(multipliedArray[i] !== undefined){
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     calories = multipliedArray[i].calories;
        console.log(protein, carbohydrates, fat, calories)
        let stats = ([
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

                    <div style={{fontSize: ".7rem", width: "fit-content", margin: "auto"}}>{calories} cals</div>

                    <NutrientProgressBar
                        nutritionData={stats}

                    />


                </div>


            );
        }
        // }else {
        //     console.log("else")
        //     return <div>else</div>;
        // }


    }

    function calculateDrinksNutritionTotals() {

        let sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray,
            multipliedDrinksArray, multipliedSidesArray;


        let calories, protein, fat, carbohydrates = 0;


        multipliedDrinksArray = multiplyValuesInArray(data.drinksCartArray)
        console.log(multipliedDrinksArray)

        const arrayOfAll = [multipliedDrinksArray]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);

        console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(arrayOfAll)
        console.log(sumResultAll)

        protein = sumResultAll.protein;
        carbohydrates = sumResultAll.totalCarbohydrates;
        fat = sumResultAll.totalFat;
        calories = sumResultAll.calories;
        console.log(protein, carbohydrates, fat, calories)


        // if(multipliedArray[i] !== undefined){
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     calories = multipliedArray[i].calories;
        console.log(protein, carbohydrates, fat, calories)
        let stats = ([
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

                    <div style={{fontSize: ".7rem", width: "fit-content", margin: "auto"}}>{calories} cals</div>

                    <NutrientProgressBar
                        nutritionData={stats}

                    />


                </div>


            );
        }
        // }else {
        //     console.log("else")
        //     return <div>else</div>;
        // }


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
                    </div>


                ):(
                    <div style={{display: "flex",
                        // flexDirection: showDrinkMenu || showSidesMenu === true ? ("column"):("row")
                        flexDirection: "column",
                    }}>
                        false

                        Meal # {i+1}
                        <IonCard
                            color="medium"
                            style={{height: "fit-content",
                                width: "99%",
                                margin: "auto"
                            }} fill="outline" expand="block"

                            onClick={() => setMenuItemPageSwitchCase("more")}
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

                                            <DrinksComponent
                                                // options={"tortilla-options"}
                                                data={addOn}
                                                // chosenOption={cho}
                                                i={i}
                                                key={i}
                                                addOnsFromFirebase={drinksFromFirebase}
                                                setAddOnsCartArray={setDrinksCartArray}
                                                addOnsCartArray={drinksCartArray}
                                            />
                                            // </div>

                                        ))}
                                    </div>

                                    <IonButton fill="outline" expand="block" onClick={() => setMenuItemPageSwitchCase("drinks")}>+ Drinks</IonButton>

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

                                    <IonButton fill="outline" expand="block" onClick={() => setMenuItemPageSwitchCase("sides")}>+ Sides</IonButton>

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


        {/*// <IonButton*/}
        {/*//     // style={{height: "fit-content",*/}
        {/*//     // width: "100%",}}*/}
        {/*//     // fill="outline"*/}
        {/*//     color="success"*/}
        {/*//     expand="block"*/}
        {/*//     onClick={() => onSaveAndAddMoreClick(testData)}*/}
        {/*// >*/}
        {/*//     + Save And Add More*/}
        {/*//*/}
        {/*// </IonButton>*/}
        {/*// <IonButton*/}
        {/*//     // style={{height: "fit-content",*/}
        {/*//     // width: "100%",}}*/}
        {/*//     color="warning"*/}
        {/*//     // fill="outline"*/}
        {/*//     expand="block"*/}
        {/*//     // onClick={() => setShowSidesMenu(!showSidesMenu)}*/}
        {/*// >*/}
        {/*//     Checkout*/}
        {/*// </IonButton>*/}
        </div>
        )
    }

    return (<div>
        {renderCustomizableCartMealComponent()}
    </div>)
}
function OrderCartComponent({addOnsCartArray, cartArray, setCartArray, setCarouselStep,
                                sidesTotal, setSidesCartArray,entreeTotal, setDrinksCartArray, menuItemName, menuItemImgUrl, drinksFromFirebase, drinksTotal, sidesFromFirebase,
                                setMenuItemPageSwitchCase, sidesCartArray,drinksCartArray, tortillaOptionsArray, mainIngredientsCartArray}){

    const [minimizeMainIngredients, setMinimizeMainIngredients ] = useState(true)
    const [minimizeAddOns, setMinimizeAddOns ] = useState(false)
    const [minimizeMeal, setMinimizeMeal ] = useState(false)
    const [ showSidesMenu, setShowSidesMenu ] = useState(false)

    const [ showDrinkMenu, setShowDrinkMenu ] = useState(false)
    const [macroStats, setMacroStats] = useState([])

    const [reset, setReset ] = useState(false)
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
                    && key !==  "unitPrice"
                    && key !== "unitGramsOrCups"
                    && key !== "comboAmount"
                ) {
                    switch (item.unitGramsOrCups) {

                        case "oz":
                            multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount   ;
                            break;
                        case "item":
                            multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount   ;
                            break;
                        case "grams":
                            multipliedItem[key] = numericValue * item.comboAmount * (item.unitAmount/item.servingSizeGrams) ;
                            break;
                        case "tsp":
                            multipliedItem[key] = numericValue * item.comboAmount * (((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount)/3) ;
                            break;
                        case "tbsp":
                            multipliedItem[key] = numericValue * item.comboAmount * ((item.gramsPerTbsp/item.servingSizeGrams)*item.unitAmount) ;
                            break;
                        case "cups":
                            multipliedItem[key] = (numericValue * ((item.gramsPerTbsp/item.servingSizeGrams)*16)*item.comboAmount) ;

                            break;
                    }
                } else {
                    multipliedItem[key] = originalValue;
                }
            });

            return multipliedItem;
        });
    }
    let cartItems;

    let orderData = [tortillaOptionsArray, ...mainIngredientsCartArray, ...addOnsCartArray, ...drinksCartArray, ...sidesCartArray];
    console.log("Tortilas: ",tortillaOptionsArray);
    console.log("Order Data: ",orderData);

    function sumValuesInArray(arrayOfObjects) {
        // Initialize an object to store the sum
        const sumObject = {};

        // Iterate through each object in the array
        arrayOfObjects.forEach((obj) => {
            // Iterate through each key in the object
            console.log(obj)
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

    function calculateSidesNutritionTotals() {
        console.log(addOnsCartArray, "CALCULATING cart NUTRITION TOTALS")
        console.log(addOnsCartArray)
        let sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray,
            multipliedDrinksArray, multipliedSidesArray;


        let calories, protein, fat, carbohydrates = 0;


        multipliedSidesArray = multiplyValuesInArray(sidesCartArray)
        console.log(multipliedSidesArray)

        const arrayOfAll = [multipliedSidesArray]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);

        console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(arrayOfAll)
        console.log(sumResultAll)

        protein = sumResultAll.protein;
        carbohydrates = sumResultAll.totalCarbohydrates;
        fat = sumResultAll.totalFat;
        calories = sumResultAll.calories;
        console.log(protein, carbohydrates, fat, calories)


        // if(multipliedArray[i] !== undefined){
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     calories = multipliedArray[i].calories;
        console.log(protein, carbohydrates, fat, calories)
        let stats = ([
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

                    <div style={{fontSize: ".7rem", width: "fit-content", margin: "auto"}}>{calories} cals</div>

                    <NutrientProgressBar
                        nutritionData={stats}

                    />


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

    function calculateDrinksNutritionTotals(addOn) {

        let sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray,
            multipliedDrinksArray, multipliedSidesArray;


        let calories, protein, fat, carbohydrates = 0;


        multipliedDrinksArray = multiplyValuesInArray(drinksCartArray)
        console.log(multipliedDrinksArray)

        const arrayOfAll = [multipliedDrinksArray]
        // sumResult = sumValuesInArray(multipliedAddOnsArray);
        // console.log(sumResult);

        console.log(arrayOfAll)
        sumResultAll = sumValuesInArrayOfArrays(arrayOfAll)
        console.log(sumResultAll)

        protein = addOn.protein;
        carbohydrates = addOn.totalCarbohydrates;
        fat = addOn.totalFat;
        calories = addOn.calories;
        console.log(protein, carbohydrates, fat, calories)


        // if(multipliedArray[i] !== undefined){
        //     protein = multipliedArray[i].protein;
        //     carbohydrates =  multipliedArray[i].totalCarbohydrates;
        //     fat = multipliedArray[i].totalFat;
        //     calories = multipliedArray[i].calories;
        console.log(protein, carbohydrates, fat, calories)
        let stats = ([
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
                <div style={{width: "4.5em", margin: "auto"}}>
                    {/*<div style={{fontSize: ".7rem",}}>*/}
                    {/*    <div>Protein {formatToTwoDecimalPlaces(protein)} g</div>*/}
                    {/*    <div>Carbohydrates {formatToTwoDecimalPlaces(carbohydrates)} g</div>*/}
                    {/*    <div>Fat {formatToTwoDecimalPlaces(fat)} g</div>*/}
                    {/*    <div>Calories {formatToTwoDecimalPlaces(calories)}</div>*/}
                    {/*</div>*/}

                    <div style={{fontSize: ".7rem", width: "fit-content", margin: "auto"}}>{calories} cals</div>

                    <NutrientProgressBar
                        nutritionData={stats}

                    />


                </div>


            );
        }
        // }else {
        //     console.log("else")
        //     return <div>else</div>;
        // }


    }

    function calculateCartNutritionTotals(){
        console.log(addOnsCartArray, "CALCULATING cart NUTRITION TOTALS")
        console.log(addOnsCartArray)
        let sumResult, sumResultAll, multipliedAddOnsArray, multipliedTortillasArray, multipliedEggsAndMoreArray, multipliedDrinksArray, multipliedSidesArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat,  carbohydrates = 0;


        multipliedAddOnsArray = multiplyValuesInArray(addOnsCartArray);
        console.log(multipliedAddOnsArray);
        multipliedTortillasArray = (tortillaOptionsArray);
        console.log(multipliedTortillasArray, tortillaOptionsArray);
        multipliedEggsAndMoreArray = multiplyValuesInArray(mainIngredientsCartArray);
        console.log(multipliedEggsAndMoreArray);
        multipliedDrinksArray = multiplyValuesInArray(drinksCartArray)
        console.log(multipliedDrinksArray)
        multipliedSidesArray = multiplyValuesInArray(sidesCartArray)
        console.log(multipliedSidesArray)

        const arrayOfAll = [multipliedAddOnsArray, [multipliedTortillasArray], multipliedEggsAndMoreArray]
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
                            {/*<IonIcon icon={chevronForwardOutline}/>*/}
                            {/*<IonIcon icon={chevronDownOutline}/>*/}
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


    function onAddMoreFoodClick(){

    }

    function onOpenIconClick(){
        console.log("IC?ON Click!")
    }

    function onSaveAndAddMoreClick(data){
         console.log(data)
        let tempCart = [...cartArray]
        console.log(tempCart)
        let i = tempCart.length
        tempCart.splice(i , 1, data)
        setCartArray([...tempCart])
        console.log(tempCart)
        setReset(true)
        setCarouselStep("")
    }
    function renderTotal(){
        console.log(reset)
        let total = 0;
        console.log(tortillaOptionsArray)
        console.log(addOnsCartArray)
        addOnsCartArray.map((addOn) => {
            total += addOn.comboAmount * addOn.unitPrice
        })
            total += tortillaOptionsArray.comboAmount * tortillaOptionsArray.unitPrice
        // tortillaOptionsArray.map((addOn) => {
        //     total += addOn.comboAmount * addOn.unitPrice
        // })
        mainIngredientsCartArray.map((addOn) => {
            total += addOn.comboAmount * addOn.unitPrice
        })
       console.log(total)
        drinksCartArray.map((addOn) => {
            console.log(addOn.unitPrice)
            total += parseFloat(addOn.unitPrice)
        })
        sidesCartArray.map((addOn) => {
            console.log(addOn.unitPrice)
            total += parseFloat(addOn.unitPrice)
        })
        console.log(total)

        console.log(orderData)
        console.log(orderData.length)
        console.log(orderData[0])
        console.log(orderData[0] === "")
        console.log(orderData[0] === [])
        console.log(Object.keys(orderData[0]))
        console.log(Object.keys(orderData[0]).length > 0)
        // if(orderData === []){
        //     console.log("orderData = []")
        // }
        console.log(total)
        console.log(sidesCartArray)

        let testData = {
            menuItemName,
            mainIngredientsCartArray,
            addOnsCartArray,
            drinksCartArray,
            sidesCartArray,
            tortillaOptionsArray,
            sidesFromFirebase, drinksFromFirebase,
            menuItemImgUrl, sidesTotal, total,
            entreeTotal, drinksTotal,
        }
        if (Object.keys(orderData[0]).length > 0) {
            return (
                <div>
                    {minimizeMeal === true ? (
                        <div >
                            <IonCard>
                                {/*<IonIcon*/}
                                {/*    onClick={() => setMinimizeMeal(false)}*/}
                                {/*    style={{*/}
                                {/*        position: "absolute",*/}
                                {/*        cursor: "pointer",*/}
                                {/*        right: ".1em",*/}
                                {/*        fontSize: "1.5rem",*/}
                                {/*        zIndex: "10",*/}
                                {/*    }} icon={addOutline}></IonIcon>*/}
                                <IonCardContent>
                                    <div style={{  width:"100%"}}>
                                        <div style={{display:"flex"}}>
                                            <div style={{width:"80%",
                                                fontWeight: "bold",
                                                fontSize: "1.1rem",
                                                // backgroundColor:"red",
                                                textAlign: "center"}}>
                                                <div>
                                                    {menuItemName}
                                                </div>
                                            </div>

                                            {/*<IonIcon icon={informationCircleOutline} />*/}

                                            <div
                                                style={{fontWeight:"bold", fontSize:"1rem", color: "green", width:"fit-content",}}
                                            >
                                                ${(entreeTotal).toFixed(2)}
                                            </div>

                                            {/*{calculateCartNutritionTotals()}*/}

                                        </div>
                                        <div style={{fontSize: ".7rem"}}>
                                            -{tortillaOptionsArray.ingredientName}
                                            {mainIngredientsCartArray.map((x, i) => (
                                                <div key={i}>-{x.ingredientName}</div>
                                            ))}
                                            {addOnsCartArray.map((x, i) => (
                                                <div key={i}>-{x.ingredientName}</div>
                                            ))}
                                        </div>

                                        <div style={{textAlign:"left", marginLeft: "1em"}}>Drinks</div>
                                        {drinksCartArray.length > 0 && (
                                            <div style={{fontSize: ".7rem"}}>
                                                {drinksCartArray.map(drink => (
                                                    <div style={{display:"flex", justifyContent: "space-between"}}>

                                                        <div style={{width:"80%",
                                                            fontWeight: "bold",
                                                            fontSize: ".9rem",
                                                            // backgroundColor:"red",
                                                            textAlign: "center"}}
                                                        >{drink.ingredientName}</div>
                                                        <div
                                                            style={{fontWeight:"bold", fontSize:"1rem", color: "green", width:"fit-content",}}

                                                        >
                                                            ${parseFloat(drink.unitPrice).toFixed(2)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{textAlign:"left", marginLeft: "1em"}}>Sides</div>
                                        {sidesCartArray.length > 0 && (
                                            <div style={{fontSize: ".7rem"}}>
                                                {sidesCartArray.map(side => (
                                                    <div style={{display:"flex", justifyContent: "space-between"}}>

                                                        <div style={{width:"80%",
                                                            fontWeight: "bold",
                                                            fontSize: ".9rem",
                                                            // backgroundColor:"red",
                                                            textAlign: "center"}}
                                                        >{side.ingredientName}</div>
                                                        <div
                                                            style={{fontWeight:"bold", fontSize:"1rem", color: "green", width:"fit-content",}}

                                                        >
                                                            ${parseFloat(side.unitPrice).toFixed(2)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}


                                    </div>

                                </IonCardContent>
                            </IonCard>

                        </div>


                    ):(
                        <div>

                            <IonCard
                                // fill="outline"
                                // expand="block"
                                style={{height:"fit-content",  backgroundColor: "white"}}
                                onClick={() => setMinimizeMainIngredients(false)}>
                                {/*<IonIcon*/}
                                {/*    onClick={() => setMinimizeMeal(true)}*/}
                                {/*    style={{*/}
                                {/*        position: "absolute",*/}
                                {/*        cursor: "pointer",*/}
                                {/*        right: ".2em",*/}
                                {/*        top: "0",*/}
                                {/*        fontSize: "1.5rem",*/}
                                {/*        zIndex: "10",*/}
                                {/*        // backgroundColor:"blue",*/}
                                {/*    }} icon={remove}></IonIcon>*/}

                                {cartArray?.map((cartData, i) => (

                                    <CustomizableCartMealComponent
                                data={cartData}
                                cartIndex={i}
                                i={i}
                                cartArray={cartArray}
                                setCartArray={setCartArray}
                                setMenuItemPageSwitchCase={setMenuItemPageSwitchCase}
                                />
                                ))}


                                {reset === false && (
                                    <div style={{display: "flex",
                                        // flexDirection: showDrinkMenu || showSidesMenu === true ? ("column"):("row")
                                        flexDirection: "column",
                                    }}>

                                        Meal # {cartArray.length + 1}
                                        <IonButton
                                            color="medium"
                                            style={{height: "fit-content",
                                                width: "99%",
                                            }} fill="outline" expand="block"

                                            onClick={() => setMenuItemPageSwitchCase("more")}
                                        >
                                            <IonItem button={true} lines="none" style={{  width:"100%"}}>



                                                <IonList style={{width: "100%",}}>


                                                    <div style={{width:"100%",

                                                        textAlign: "center", marginTop:".5em", marginBottom:".5em"}}>
                                                        <div style={{fontSize: "1.2rem"}}>
                                                            {menuItemName}
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

                                                        <img style={{ width: "100%",  objectFit: "cover" }} src={menuItemImgUrl} alt="music" />
                                                    </div>
                                                    <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green", width:"fit-content",margin:"auto"}}>
                                                        ${(entreeTotal).toFixed(2)}
                                                    </div>
                                                    {calculateCartNutritionTotals()}

                                                </IonList>
                                            </IonItem>

                                        </IonButton>




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

                                                            <DrinksComponent
                                                                // options={"tortilla-options"}
                                                                data={addOn}
                                                                // chosenOption={cho}
                                                                i={i}
                                                                key={i}
                                                                addOnsFromFirebase={drinksFromFirebase}
                                                                setAddOnsCartArray={setDrinksCartArray}
                                                                addOnsCartArray={drinksCartArray}
                                                            />
                                                            // </div>

                                                        ))}
                                                    </div>

                                                    <IonButton fill="outline" expand="block" onClick={() => setMenuItemPageSwitchCase("drinks")}>+ Drinks</IonButton>

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
                                                            {drinksCartArray.map((addOn, i) => (

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
                                                                        {/*{calculateDrinksNutritionTotals(addOn)}*/}
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

                                                            <SidesComponent
                                                                // options={"tortilla-options"}
                                                                data={addOn}
                                                                // chosenOption={cho}
                                                                i={i}
                                                                key={i}
                                                                addOnsFromFirebase={sidesFromFirebase}
                                                                setAddOnsCartArray={setSidesCartArray}
                                                                addOnsCartArray={sidesCartArray}
                                                            />
                                                            // </div>

                                                        ))}
                                                    </div>

                                                    <IonButton fill="outline" expand="block" onClick={() => setMenuItemPageSwitchCase("sides")}>+ Sides</IonButton>

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
                                                            {sidesCartArray.map((addOn, i) => (

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

                            </IonCard>


                            <IonButton
                                // style={{height: "fit-content",
                                // width: "100%",}}
                                // fill="outline"
                                color="success"
                                expand="block"
                                onClick={() => onSaveAndAddMoreClick(testData)}
                            >
                                + Save And Add More

                            </IonButton>
                            <IonButton
                                // style={{height: "fit-content",
                                // width: "100%",}}
                                color="warning"
                                // fill="outline"
                                expand="block"
                                // onClick={() => setShowSidesMenu(!showSidesMenu)}
                            >
                                Checkout
                            </IonButton>
                        </div>

                    )}



                </div>
            )
        }

    }


    useEffect(() => {
        console.log("USE EFFECT !@$", addOnsCartArray)
    }, [])

    function renderAddOnsCartComponent(){
        console.log(tortillaOptionsArray, mainIngredientsCartArray,addOnsCartArray)
        return (
            <IonCard style={{ backgroundColor: "rgba(0,0,0,0.1)"}}>
                <IonCardContent style={{textAlign:"center"}}>


                    <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green"}}>
                        {renderTotal()}
                    </div>

                    <IonButton
                        onClick={() => setMenuItemPageSwitchCase("order summary")}
                        color="warning"
                        // fill="outline"
                        expand="block">Continue</IonButton>


                </IonCardContent>
            </IonCard>
        )
    }

    return ( <div>
        {renderAddOnsCartComponent()}
    </div>)

}
function MinimizedOrderSummaryComponent(){}
function AddToppingsComponent({ addOnsList, setAddOnsList, menuItemId,
                              }){



    const [ loadedToppingsOptions, setLoadedToppingsOption ] = useState([""])

    const [toppingsSearchStep, setToppingsSearchStep] = useState("")
    const [ addOnToBeAdded, setAddOnToBeAdded ] = useState("")



    let docTempData;
    useEffect(() => {
        // loadToppingOptionsData();
        console.log("useEffect AddToppingsComponent", addOnToBeAdded)
    },[ toppingsSearchStep])

    function onAddToppingsOptionClick(){
        setToppingsSearchStep("search")
    }
    async function loadToppingOptionsData() {
        let temp = [];

        docTempData = await loadAnyCollectionData(`recipes-collection/${addOnToBeAdded.docId}/addOns`)
        // docTempData = await loadAnyCollectionData("create-custom-breakfast-hash-toppings")

        docTempData.docs.map(x => {
            temp = [...temp, x.data()]
            console.log(x.data())
        })
        console.log(temp)
        setLoadedToppingsOption(temp)
    }
    async function onDeleteToppingOptionClick(id){
        await deleteCustomDoc(`recipes-collection/${addOnToBeAdded.docId}/addOns`,id).then(x => {
            // await deleteCustomDoc("create-custom-breakfast-hash-toppings",id).then(x => {
            loadToppingOptionsData()
        })
    }
    function AddAddOnUnitSizeAndPrice({ recipeIngredientsList, setRecipeIngredientsList, addOnToBeAdded, setRecipeIngredientComponentState,
                                      }){

        const [unitAmount, setUnitAmount ] = useState(0)
        const [ unitPrice, setUnitPrice ] = useState()

        const [ unitGramsOrCups, setUnitGramsOrCups ] = useState(undefined)

        const [buttonEnabled, setButtonEnabled ] = useState(false)

        useEffect(() =>{
            console.log("Ingredient to be added! ", addOnToBeAdded)
            if ( unitGramsOrCups !== undefined && unitAmount > 0 && unitPrice > 0){
                setButtonEnabled(true)
                console.log("Setting Button True")
            }else{
                setButtonEnabled(false)
                console.log("Setting Button False")

            }

            console.log(addOnToBeAdded)
            console.log(recipeIngredientsList)
        },[unitGramsOrCups, buttonEnabled, unitAmount, unitPrice, recipeIngredientsList, ])



        async function onSaveIngredientToList() {
            let temp = [...recipeIngredientsList]
            console.log(temp, unitAmount + unitGramsOrCups, unitPrice, addOnToBeAdded)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(addOnToBeAdded.ingredientName?.toLowerCase())

            )

            let result1 = temp.filter(isSearched)
            console.log(result1)

            addOnToBeAdded.unitAmount = unitAmount;
            addOnToBeAdded.unitPrice = unitPrice;
            addOnToBeAdded.unitGramsOrCups = unitGramsOrCups;
            let toppingOption = {...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}


            let temp1 = recipeIngredientsList;
            console.log(recipeIngredientsList[0])
            console.log(addOnToBeAdded, toppingOption)

            if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' ') {

                console.log({addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice})
                setRecipeIngredientsList([{...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}])
                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/addOns`, toppingOption).then(r => console.log(r))
                console.log(res)

            } else if (recipeIngredientsList[0] !== ' ' && result1.length === 0) {
                console.log(recipeIngredientsList, addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice)
                console.log(addOnToBeAdded, toppingOption)

                let temp = [...recipeIngredientsList, addOnToBeAdded]
                console.log(temp)
                setRecipeIngredientsList([...recipeIngredientsList, addOnToBeAdded])
                console.log(toppingOption, temp, addOnToBeAdded)

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/addOns`, toppingOption)
                    // .then(r => console.log(r))
                 console.log(res)

            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, unitGramsOrCups}
                console.log(result2)
                temp1[(temp1.length - 1)] = result2;
                console.log(temp1)
                setRecipeIngredientsList([...temp1])

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/addOns`, toppingOption).then(r => console.log(r))
                console.log(res)

            }


            setRecipeIngredientComponentState("display")

        }

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <IonCardTitle>How much ?</IonCardTitle>
                    <IonCard style={{margin: "1em auto", width: "fit-content"}}>
                        <IonCardContent style={{padding: ".5em"}}>
                            <IonCardTitle color="primary">
                                {addOnToBeAdded.ingredientName}
                            </IonCardTitle>
                        </IonCardContent>
                    </IonCard>

                </IonCardHeader>
                <IonCardContent>
                    <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                        <input style={{width: "2em"}} value={unitAmount} type="number" onChange={(e) => {setUnitAmount(e.target.value)}}/>
                        <IonSelect
                            onIonChange={(e) => setUnitGramsOrCups(e.target.value)}
                            placeholder="g/cups">
                            <IonSelectOption >oz</IonSelectOption>
                            <IonSelectOption >item</IonSelectOption>
                            <IonSelectOption >grams</IonSelectOption>
                            <IonSelectOption >cups</IonSelectOption>
                            <IonSelectOption>tsp</IonSelectOption>
                            <IonSelectOption>tbsp</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div style={{  width: "fit-content", margin: "auto", display: "flex"}}>
                        <div style={{marginRight:".5em"}}>Price</div>
                        <div>
                            $<input style={{width: "4em", margin: "auto"}} value={unitPrice} type="number" onChange={(e) => {setUnitPrice(e.target.value)}}/>
                        </div>

                    </div>

                    <div style={{
                        // border:"solid",
                        display:"flex",
                        justifyContent: "space-between",
                        width:"75%",
                        margin: " 1em auto",
                    }}>
                        <IonButton onClick={() => setRecipeIngredientComponentState("search")} color="danger" >cancel</IonButton>
                        <IonButton onClick={() => onSaveIngredientToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    function SearchToppingsDataComponent({data, toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded}){


        // const [addOnToBeAdded, setAddOnToBeAdded ] = useLocalStorage("addOnToBeAdded", "")

        function onSearchDataDisplayClick(){

            // then display amount to give and price
            //add that data to the recipe data then
            // const customData = {...data, amount: "2oz"}
            // console.log(customData)
            console.log(data)
            setAddOnToBeAdded(data)
            setToppingsSearchStep("add unit size and price")

            // setAddOnToBeAdded(data)
        }
        return (
            <IonCard
            >
                <IonCardContent>
                    <div style={{display: "flex",
                    }}>

                        <div
                            onClick={() => onSearchDataDisplayClick()}
                            style={{
                                // backgroundColor: "blue",
                                width: "100%",
                                // backgroundColor: "red",
                                cursor: "pointer"}}>

                            {data.ingredientName}
                            <div style={{width: "15em",
                                margin: "auto"
                            }}>
                                <img style={{
                                    objectFit: "contain",
                                    width: "15em",
                                    margin: "auto",
                                    height: "8em",

                                }}
                                     src={data.imgUrl} />
                            </div>
                            {/*{ingredientSearchNutritionFacts && (*/}
                            {/*    <IngredientsSearchItemNutritionFacts*/}
                            {/*        ingredientSearchNutritionFacts={data}*/}
                            {/*    />*/}

                            {/*)}*/}

                        </div>
                        <div
                            style={{backgroundColor: "white",
                                display: "flex",
                                // width: "fit-content",
                                padding: "0",

                            }}
                        >
                            <IonIcon size="small"
                                // onClick={() => onDeleteIconClick()}
                                     style={{margin: "0 .5em", zIndex:"10"}} icon={deleteIcon}/>
                            <IonIcon  size="small"
                                // onClick={() => onEditIngredientClick()}
                                      style={{margin: "0 .5em",  zIndex:"10"}}  icon={editIcon}/>

                        </div>

                    </div>
                </IonCardContent>


            </IonCard>

        )
    }

    function RenderSearchToppingsComponent({toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded,}) {

        const [filteredData, setFilteredData ] = useState([""])
        const [ inputState, setInputState ] = useState("")


        async function loadAndFilterData(e) {

            let loadedData;
            let result;
            let dataTempArray = [];

            loadedData = await loadAnyCollectionData('ingredients-collection');

            loadedData.docs.map(doc => {
                dataTempArray = [...dataTempArray, doc.data()]
            })
            // console.log(dataTempArray)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(e?.toLowerCase())

            )

            if (e !== undefined || e !== "") {
                setInputState(e)


                result = dataTempArray.filter(isSearched)
                setFilteredData(result)
                console.log(result)
            }
            if ( e === "secret"){
                console.log("secret")
                setFilteredData(dataTempArray)

            }
        }

        useEffect(() => {

        },[loadAndFilterData])


        function onSearchInputChange(e){
            if (e !== " " || e !== "  " || e !== "   ") {
                loadAndFilterData(e);
            }
        }


        return (
            <IonCard style={{
                width: "90%",
                margin: "auto"
            }}>
                <div
                    style={{
                        position: "absolute",
                        right: ".5em",
                        zIndex: "10",
                        cursor: "pointer"
                    }}
                    // onClick={() => setShowAddIngredientToList(false)}
                >X</div>
                <IonCardHeader
                    style={{
                        textAlign: "center"
                    }}>
                    <IonCardTitle>
                        Ingredients Search
                    </IonCardTitle>
                </IonCardHeader>

                <IonCardContent >
                    <IonCard  style={{
                        padding: ".1em",
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        <input
                            value={inputState}
                            style={{
                                border: "none",
                                width: "100%"
                            }}
                            className="ingredients-searchbar-input"
                            type="text"
                            onChange={(e) => onSearchInputChange(e.target.value)}
                        />

                        <IonIcon size="large" icon={searchIcon}/>

                        <IonButton
                            onClick={() => setToppingsSearchStep("add new add on")}
                            // onClick={() => setSearchAndAddIngredientToListStep("Add New Ingredient")} size="small"
                        >
                            <div>
                                <IonIcon size="small" icon={addIcon} />


                            </div>
                        </IonButton>


                    </IonCard>

                    {filteredData.length > 0 && inputState && (
                        <div

                            style={{
                                width: "100%",
                                margin: "auto",
                            }}
                        >

                            <div>
                                {filteredData && filteredData.map((data, i) => (


                                    <SearchToppingsDataComponent
                                        data={data}
                                        toppingsSearchStep={toppingsSearchStep}
                                        setToppingsSearchStep={setToppingsSearchStep}
                                        setAddOnToBeAdded={setAddOnToBeAdded}
                                    />
                                ))}
                            </div>
                            {/*)}*/}





                        </div>
                    )}


                </IonCardContent>

            </IonCard>
        )
    }

    function RenderAddToppingsSearchComponent({toppingsSearchStep, setToppingsSearchStep, addOnToBeAdded, setAddOnToBeAdded}){

        switch (toppingsSearchStep){

            case "search":
                return (
                    <RenderSearchToppingsComponent
                        toppingsSearchStep={toppingsSearchStep}
                        setToppingsSearchStep={setToppingsSearchStep}
                        setAddOnToBeAdded={setAddOnToBeAdded}
                    />
                )
                break;

            case "add new add on":
                return (<AddIngredientNutritionalFacts
                    setRecipeIngredientComponentState={setToppingsSearchStep}
                />)

            case "add unit size and price":
                return (<AddAddOnUnitSizeAndPrice
                        recipeIngredientsList={addOnsList}
                        setRecipeIngredientsList={setAddOnsList}
                        addOnToBeAdded={addOnToBeAdded}
                        setRecipeIngredientComponentState={setToppingsSearchStep}
                    />
                )
        }
    }


    return (
        <IonCard
            style={{
                width: "90%",
                margin: " 1em auto"
            }}
        >
            <IonButton
                onClick={() => onAddToppingsOptionClick()}
            >Add Toppings Option</IonButton>
            {toppingsSearchStep !== "" &&(
                <RenderAddToppingsSearchComponent
                    toppingsSearchStep={toppingsSearchStep}
                    setToppingsSearchStep={setToppingsSearchStep}
                    setAddOnToBeAdded={setAddOnToBeAdded}
                    addOnToBeAdded={addOnToBeAdded}
                />
            )}

        </IonCard>
    )
}
function AddTortillaOptionsComponent({ addOnsList, setAddOnsList, menuItemId,
                              }){



    const [ loadedToppingsOptions, setLoadedToppingsOption ] = useState([""])

    const [toppingsSearchStep, setToppingsSearchStep] = useState("")
    const [ addOnToBeAdded, setAddOnToBeAdded ] = useState("")



    let docTempData;
    useEffect(() => {
        // loadToppingOptionsData();
        console.log("useEffect AddToppingsComponent", addOnToBeAdded)
    },[ toppingsSearchStep])

    function onAddToppingsOptionClick(){
        setToppingsSearchStep("search")
    }
    async function loadToppingOptionsData() {
        let temp = [];

        docTempData = await loadAnyCollectionData(`recipes-collection/${addOnToBeAdded.docId}/tortilla-options`)
        // docTempData = await loadAnyCollectionData("create-custom-breakfast-hash-toppings")

        docTempData.docs.map(x => {
            temp = [...temp, x.data()]
            console.log(x.data())
        })
        console.log(temp)
        setLoadedToppingsOption(temp)
    }
    async function onDeleteToppingOptionClick(id){
        await deleteCustomDoc(`recipes-collection/${addOnToBeAdded.docId}/addOns`,id).then(x => {
            // await deleteCustomDoc("create-custom-breakfast-hash-toppings",id).then(x => {
            loadToppingOptionsData()
        })
    }
    function AddAddOnUnitSizeAndPrice({ recipeIngredientsList, setRecipeIngredientsList, addOnToBeAdded, setRecipeIngredientComponentState,
                                      }){

        const [unitAmount, setUnitAmount ] = useState(0)
        const [ unitPrice, setUnitPrice ] = useState()

        const [ unitGramsOrCups, setUnitGramsOrCups ] = useState(undefined)

        const [buttonEnabled, setButtonEnabled ] = useState(false)

        useEffect(() =>{
            console.log("Ingredient to be added! ", addOnToBeAdded)
            if ( unitGramsOrCups !== undefined && unitAmount > 0 && unitPrice > 0){
                setButtonEnabled(true)
                console.log("Setting Button True")
            }else{
                setButtonEnabled(false)
                console.log("Setting Button False")

            }

            console.log(addOnToBeAdded)
            console.log(recipeIngredientsList)
        },[unitGramsOrCups, buttonEnabled, unitAmount, unitPrice, recipeIngredientsList, ])



        async function onSaveIngredientToList() {
            let temp = [...recipeIngredientsList]
            console.log(temp, unitAmount + unitGramsOrCups, unitPrice, addOnToBeAdded)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(addOnToBeAdded.ingredientName?.toLowerCase())

            )

            let result1 = temp.filter(isSearched)
            console.log(result1)

            addOnToBeAdded.unitAmount = unitAmount;
            addOnToBeAdded.unitPrice = unitPrice;
            addOnToBeAdded.unitGramsOrCups = unitGramsOrCups;
            let toppingOption = {...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}


            let temp1 = recipeIngredientsList;
            console.log(recipeIngredientsList[0])
            console.log(addOnToBeAdded, toppingOption)

            if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' ') {

                console.log({addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice})
                setRecipeIngredientsList([{...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}])
                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/tortilla-options`, toppingOption).then(r => console.log(r))
                console.log(res)

            } else if (recipeIngredientsList[0] !== ' ' && result1.length === 0) {
                console.log(recipeIngredientsList, addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice)
                console.log(addOnToBeAdded, toppingOption)

                let temp = [...recipeIngredientsList, addOnToBeAdded]
                console.log(temp)
                setRecipeIngredientsList(temp)
                console.log(toppingOption, temp, addOnToBeAdded)

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/tortilla-options`, toppingOption)
                    // .then(r => console.log(r))
                 console.log(res)

            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, unitGramsOrCups}
                console.log(result2)
                temp1[(temp1.length - 1)] = result2;
                console.log(temp1)
                setRecipeIngredientsList([...temp1])

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/tortilla-options`, toppingOption).then(r => console.log(r))
                console.log(res)

            }


            setRecipeIngredientComponentState("display")

        }

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <IonCardTitle>How much ?</IonCardTitle>
                    <IonCard style={{margin: "1em auto", width: "fit-content"}}>
                        <IonCardContent style={{padding: ".5em"}}>
                            <IonCardTitle color="primary">
                                {addOnToBeAdded.ingredientName}
                            </IonCardTitle>
                        </IonCardContent>
                    </IonCard>

                </IonCardHeader>
                <IonCardContent>
                    <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                        <input style={{width: "2em"}} value={unitAmount} type="number" onChange={(e) => {setUnitAmount(e.target.value)}}/>
                        <IonSelect
                            onIonChange={(e) => setUnitGramsOrCups(e.target.value)}
                            placeholder="g/cups">
                            <IonSelectOption >oz</IonSelectOption>
                            <IonSelectOption >item</IonSelectOption>
                            <IonSelectOption >grams</IonSelectOption>
                            <IonSelectOption >cups</IonSelectOption>
                            <IonSelectOption>tsp</IonSelectOption>
                            <IonSelectOption>tbsp</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div style={{  width: "fit-content", margin: "auto", display: "flex"}}>
                        <div style={{marginRight:".5em"}}>Price</div>
                        <div>
                            $<input style={{width: "4em", margin: "auto"}} value={unitPrice} type="number" onChange={(e) => {setUnitPrice(e.target.value)}}/>
                        </div>

                    </div>

                    <div style={{
                        // border:"solid",
                        display:"flex",
                        justifyContent: "space-between",
                        width:"75%",
                        margin: " 1em auto",
                    }}>
                        <IonButton onClick={() => setRecipeIngredientComponentState("search")} color="danger" >cancel</IonButton>
                        <IonButton onClick={() => onSaveIngredientToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    function SearchToppingsDataComponent({data, toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded}){


        // const [addOnToBeAdded, setAddOnToBeAdded ] = useLocalStorage("addOnToBeAdded", "")

        function onSearchDataDisplayClick(){

            // then display amount to give and price
            //add that data to the recipe data then
            // const customData = {...data, amount: "2oz"}
            // console.log(customData)
            console.log(data)
            setAddOnToBeAdded(data)
            setToppingsSearchStep("add unit size and price")

            // setAddOnToBeAdded(data)
        }
        return (
            <IonCard
            >
                <IonCardContent>
                    <div style={{display: "flex",
                    }}>

                        <div
                            onClick={() => onSearchDataDisplayClick()}
                            style={{
                                // backgroundColor: "blue",
                                width: "100%",
                                // backgroundColor: "red",
                                cursor: "pointer"}}>

                            {data.ingredientName}
                            <div style={{width: "15em",
                                margin: "auto"
                            }}>
                                <img style={{
                                    objectFit: "contain",
                                    width: "15em",
                                    margin: "auto",
                                    height: "8em",

                                }}
                                     src={data.imgUrl} />
                            </div>
                            {/*{ingredientSearchNutritionFacts && (*/}
                            {/*    <IngredientsSearchItemNutritionFacts*/}
                            {/*        ingredientSearchNutritionFacts={data}*/}
                            {/*    />*/}

                            {/*)}*/}

                        </div>
                        <div
                            style={{backgroundColor: "white",
                                display: "flex",
                                // width: "fit-content",
                                padding: "0",

                            }}
                        >
                            <IonIcon size="small"
                                // onClick={() => onDeleteIconClick()}
                                     style={{margin: "0 .5em", zIndex:"10"}} icon={deleteIcon}/>
                            <IonIcon  size="small"
                                // onClick={() => onEditIngredientClick()}
                                      style={{margin: "0 .5em",  zIndex:"10"}}  icon={editIcon}/>

                        </div>

                    </div>
                </IonCardContent>


            </IonCard>

        )
    }

    function RenderSearchToppingsComponent({toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded,}) {

        const [filteredData, setFilteredData ] = useState([""])
        const [ inputState, setInputState ] = useState("")


        async function loadAndFilterData(e) {

            let loadedData;
            let result;
            let dataTempArray = [];

            loadedData = await loadAnyCollectionData('ingredients-collection');

            loadedData.docs.map(doc => {
                dataTempArray = [...dataTempArray, doc.data()]
            })
            // console.log(dataTempArray)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(e?.toLowerCase())

            )

            if (e !== undefined || e !== "") {
                setInputState(e)


                result = dataTempArray.filter(isSearched)
                setFilteredData(result)
                console.log(result)
            }
            if ( e === "secret"){
                console.log("secret")
                setFilteredData(dataTempArray)

            }
        }

        useEffect(() => {

        },[loadAndFilterData])


        function onSearchInputChange(e){
            if (e !== " " || e !== "  " || e !== "   ") {
                loadAndFilterData(e);
            }
        }


        return (
            <IonCard style={{
                width: "90%",
                margin: "auto"
            }}>
                <div
                    style={{
                        position: "absolute",
                        right: ".5em",
                        zIndex: "10",
                        cursor: "pointer"
                    }}
                    // onClick={() => setShowAddIngredientToList(false)}
                >X</div>
                <IonCardHeader
                    style={{
                        textAlign: "center"
                    }}>
                    <IonCardTitle>
                        Ingredients Search
                    </IonCardTitle>
                </IonCardHeader>

                <IonCardContent >
                    <IonCard  style={{
                        padding: ".1em",
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        <input
                            value={inputState}
                            style={{
                                border: "none",
                                width: "100%"
                            }}
                            className="ingredients-searchbar-input"
                            type="text"
                            onChange={(e) => onSearchInputChange(e.target.value)}
                        />

                        <IonIcon size="large" icon={searchIcon}/>

                        <IonButton
                            onClick={() => setToppingsSearchStep("add new add on")}
                            // onClick={() => setSearchAndAddIngredientToListStep("Add New Ingredient")} size="small"
                        >
                            <div>
                                <IonIcon size="small" icon={addIcon} />


                            </div>
                        </IonButton>


                    </IonCard>

                    {filteredData.length > 0 && inputState && (
                        <div

                            style={{
                                width: "100%",
                                margin: "auto",
                            }}
                        >

                            <div>
                                {filteredData && filteredData.map((data, i) => (


                                    <SearchToppingsDataComponent
                                        data={data}
                                        toppingsSearchStep={toppingsSearchStep}
                                        setToppingsSearchStep={setToppingsSearchStep}
                                        setAddOnToBeAdded={setAddOnToBeAdded}
                                    />
                                ))}
                            </div>
                            {/*)}*/}





                        </div>
                    )}


                </IonCardContent>

            </IonCard>
        )
    }

    function RenderAddToppingsSearchComponent({toppingsSearchStep, setToppingsSearchStep, addOnToBeAdded, setAddOnToBeAdded}){

        switch (toppingsSearchStep){

            case "search":
                return (
                    <RenderSearchToppingsComponent
                        toppingsSearchStep={toppingsSearchStep}
                        setToppingsSearchStep={setToppingsSearchStep}
                        setAddOnToBeAdded={setAddOnToBeAdded}
                    />
                )
                break;

            case "add new add on":
                return (<AddIngredientNutritionalFacts
                    setRecipeIngredientComponentState={setToppingsSearchStep}
                />)

            case "add unit size and price":
                return (<AddAddOnUnitSizeAndPrice
                        recipeIngredientsList={addOnsList}
                        setRecipeIngredientsList={setAddOnsList}
                        addOnToBeAdded={addOnToBeAdded}
                        setRecipeIngredientComponentState={setToppingsSearchStep}
                    />
                )
        }
    }


    return (
        <IonCard
            style={{
                width: "90%",
                margin: " 1em auto"
            }}
        >
            <IonButton
                onClick={() => onAddToppingsOptionClick()}
            >Add Toppings Option</IonButton>
            {toppingsSearchStep !== "" &&(
                <RenderAddToppingsSearchComponent
                    toppingsSearchStep={toppingsSearchStep}
                    setToppingsSearchStep={setToppingsSearchStep}
                    setAddOnToBeAdded={setAddOnToBeAdded}
                    addOnToBeAdded={addOnToBeAdded}
                />
            )}

        </IonCard>
    )
}
function AddMainIngredientsOptionsComponent({ addOnsList, setAddOnsList, menuItemId,
                              }){



    const [ loadedToppingsOptions, setLoadedToppingsOption ] = useState([""])

    const [toppingsSearchStep, setToppingsSearchStep] = useState("")
    const [ addOnToBeAdded, setAddOnToBeAdded ] = useState("")



    let docTempData;
    useEffect(() => {
        loadToppingOptionsData();
        console.log("useEffect AddToppingsComponent", addOnToBeAdded)
    },[ toppingsSearchStep])

    function onAddToppingsOptionClick(){
        setToppingsSearchStep("search")
    }
    async function loadToppingOptionsData() {
        let temp = [];

        docTempData = await loadAnyCollectionData(`recipes-collection/${addOnToBeAdded.docId}/main-ingredient-options`)
        // docTempData = await loadAnyCollectionData("create-custom-breakfast-hash-toppings")

        docTempData.docs.map(x => {
            temp = [...temp, x.data()]
            console.log(x.data())
        })
        console.log(temp)
        setLoadedToppingsOption(temp)
    }
    async function onDeleteToppingOptionClick(id){
        await deleteCustomDoc(`recipes-collection/${addOnToBeAdded.docId}/addOns`,id).then(x => {
            // await deleteCustomDoc("create-custom-breakfast-hash-toppings",id).then(x => {
            loadToppingOptionsData()
        })
    }
    function AddAddOnUnitSizeAndPrice({ recipeIngredientsList, setRecipeIngredientsList, addOnToBeAdded, setRecipeIngredientComponentState,
                                      }){

        const [unitAmount, setUnitAmount ] = useState(0)
        const [ unitPrice, setUnitPrice ] = useState()

        const [ unitGramsOrCups, setUnitGramsOrCups ] = useState(undefined)

        const [buttonEnabled, setButtonEnabled ] = useState(false)

        useEffect(() =>{
            console.log("Ingredient to be added! ", addOnToBeAdded)
            if ( unitGramsOrCups !== undefined && unitAmount > 0 && unitPrice > 0){
                setButtonEnabled(true)
                console.log("Setting Button True")
            }else{
                setButtonEnabled(false)
                console.log("Setting Button False")

            }

            console.log(addOnToBeAdded)
            console.log(recipeIngredientsList)
        },[unitGramsOrCups, buttonEnabled, unitAmount, unitPrice, recipeIngredientsList, ])



        async function onSaveIngredientToList() {
            let temp = [...recipeIngredientsList]
            console.log(temp, unitAmount + unitGramsOrCups, unitPrice, addOnToBeAdded)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(addOnToBeAdded.ingredientName?.toLowerCase())

            )

            let result1 = temp.filter(isSearched)
            console.log(result1)

            addOnToBeAdded.unitAmount = unitAmount;
            addOnToBeAdded.unitPrice = unitPrice;
            addOnToBeAdded.unitGramsOrCups = unitGramsOrCups;
            let toppingOption = {...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}


            let temp1 = recipeIngredientsList;
            console.log(recipeIngredientsList[0])
            console.log(addOnToBeAdded, toppingOption)

            if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' ') {

                console.log({addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice})
                setRecipeIngredientsList([{...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}])
                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/main-ingredient-options`, toppingOption).then(r => console.log(r))
                console.log(res)

            }
            else if (recipeIngredientsList[0] !== ' ' && result1.length === 0) {
                console.log(recipeIngredientsList, addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice)
                console.log(addOnToBeAdded, toppingOption)

                let temp = [...recipeIngredientsList, addOnToBeAdded]
                console.log(temp)
                setRecipeIngredientsList(temp)
                console.log(toppingOption, temp, addOnToBeAdded)

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/main-ingredient-options`, toppingOption)
                    // .then(r => console.log(r))
                 console.log(res)

            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, unitGramsOrCups}
                console.log(result2)
                temp1[(temp1.length - 1)] = result2;
                console.log(temp1)
                setRecipeIngredientsList([...temp1])

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/main-ingredient-options`, toppingOption).then(r => console.log(r))
                console.log(res)

            }


            setRecipeIngredientComponentState("display")

        }

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <IonCardTitle>How much ?</IonCardTitle>
                    <IonCard style={{margin: "1em auto", width: "fit-content"}}>
                        <IonCardContent style={{padding: ".5em"}}>
                            <IonCardTitle color="primary">
                                {addOnToBeAdded.ingredientName}
                            </IonCardTitle>
                        </IonCardContent>
                    </IonCard>

                </IonCardHeader>
                <IonCardContent>
                    <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                        <input style={{width: "2em"}} value={unitAmount} type="number" onChange={(e) => {setUnitAmount(e.target.value)}}/>
                        <IonSelect
                            onIonChange={(e) => setUnitGramsOrCups(e.target.value)}
                            placeholder="g/cups">
                            <IonSelectOption >oz</IonSelectOption>
                            <IonSelectOption >item</IonSelectOption>
                            <IonSelectOption >grams</IonSelectOption>
                            <IonSelectOption >cups</IonSelectOption>
                            <IonSelectOption>tsp</IonSelectOption>
                            <IonSelectOption>tbsp</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div style={{  width: "fit-content", margin: "auto", display: "flex"}}>
                        <div style={{marginRight:".5em"}}>Price</div>
                        <div>
                            $<input style={{width: "4em", margin: "auto"}} value={unitPrice} type="number" onChange={(e) => {setUnitPrice(e.target.value)}}/>
                        </div>

                    </div>

                    <div style={{
                        // border:"solid",
                        display:"flex",
                        justifyContent: "space-between",
                        width:"75%",
                        margin: " 1em auto",
                    }}>
                        <IonButton onClick={() => setRecipeIngredientComponentState("search")} color="danger" >cancel</IonButton>
                        <IonButton onClick={() => onSaveIngredientToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    function SearchToppingsDataComponent({data, toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded}){


        // const [addOnToBeAdded, setAddOnToBeAdded ] = useLocalStorage("addOnToBeAdded", "")

        function onSearchDataDisplayClick(){

            // then display amount to give and price
            //add that data to the recipe data then
            // const customData = {...data, amount: "2oz"}
            // console.log(customData)
            console.log(data)
            setAddOnToBeAdded(data)
            setToppingsSearchStep("add unit size and price")

            // setAddOnToBeAdded(data)
        }
        return (
            <IonCard
            >
                <IonCardContent>
                    <div style={{display: "flex",
                    }}>

                        <div
                            onClick={() => onSearchDataDisplayClick()}
                            style={{
                                // backgroundColor: "blue",
                                width: "100%",
                                // backgroundColor: "red",
                                cursor: "pointer"}}>

                            {data.ingredientName}
                            <div style={{width: "15em",
                                margin: "auto"
                            }}>
                                <img style={{
                                    objectFit: "contain",
                                    width: "15em",
                                    margin: "auto",
                                    height: "8em",

                                }}
                                     src={data.imgUrl} />
                            </div>
                            {/*{ingredientSearchNutritionFacts && (*/}
                            {/*    <IngredientsSearchItemNutritionFacts*/}
                            {/*        ingredientSearchNutritionFacts={data}*/}
                            {/*    />*/}

                            {/*)}*/}

                        </div>
                        <div
                            style={{backgroundColor: "white",
                                display: "flex",
                                // width: "fit-content",
                                padding: "0",

                            }}
                        >
                            <IonIcon size="small"
                                // onClick={() => onDeleteIconClick()}
                                     style={{margin: "0 .5em", zIndex:"10"}} icon={deleteIcon}/>
                            <IonIcon  size="small"
                                // onClick={() => onEditIngredientClick()}
                                      style={{margin: "0 .5em",  zIndex:"10"}}  icon={editIcon}/>

                        </div>

                    </div>
                </IonCardContent>


            </IonCard>

        )
    }

    function RenderSearchToppingsComponent({toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded,}) {

        const [filteredData, setFilteredData ] = useState([""])
        const [ inputState, setInputState ] = useState("")


        async function loadAndFilterData(e) {

            let loadedData;
            let result;
            let dataTempArray = [];

            loadedData = await loadAnyCollectionData('ingredients-collection');

            loadedData.docs.map(doc => {
                dataTempArray = [...dataTempArray, doc.data()]
            })
            // console.log(dataTempArray)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(e?.toLowerCase())

            )

            if (e !== undefined || e !== "") {
                setInputState(e)


                result = dataTempArray.filter(isSearched)
                setFilteredData(result)
                console.log(result)
            }
            if ( e === "secret"){
                console.log("secret")
                setFilteredData(dataTempArray)

            }
        }

        useEffect(() => {

        },[loadAndFilterData])


        function onSearchInputChange(e){
            if (e !== " " || e !== "  " || e !== "   ") {
                loadAndFilterData(e);
            }
        }


        return (
            <IonCard style={{
                width: "90%",
                margin: "auto"
            }}>
                <div
                    style={{
                        position: "absolute",
                        right: ".5em",
                        zIndex: "10",
                        cursor: "pointer"
                    }}
                    // onClick={() => setShowAddIngredientToList(false)}
                >X</div>
                <IonCardHeader
                    style={{
                        textAlign: "center"
                    }}>
                    <IonCardTitle>
                        Ingredients Search
                    </IonCardTitle>
                </IonCardHeader>

                <IonCardContent >
                    <IonCard  style={{
                        padding: ".1em",
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        <input
                            value={inputState}
                            style={{
                                border: "none",
                                width: "100%"
                            }}
                            className="ingredients-searchbar-input"
                            type="text"
                            onChange={(e) => onSearchInputChange(e.target.value)}
                        />

                        <IonIcon size="large" icon={searchIcon}/>

                        <IonButton
                            onClick={() => setToppingsSearchStep("add new add on")}
                            // onClick={() => setSearchAndAddIngredientToListStep("Add New Ingredient")} size="small"
                        >
                            <div>
                                <IonIcon size="small" icon={addIcon} />


                            </div>
                        </IonButton>


                    </IonCard>

                    {filteredData.length > 0 && inputState && (
                        <div

                            style={{
                                width: "100%",
                                margin: "auto",
                            }}
                        >

                            <div>
                                {filteredData && filteredData.map((data, i) => (


                                    <SearchToppingsDataComponent
                                        data={data}
                                        toppingsSearchStep={toppingsSearchStep}
                                        setToppingsSearchStep={setToppingsSearchStep}
                                        setAddOnToBeAdded={setAddOnToBeAdded}
                                    />
                                ))}
                            </div>
                            {/*)}*/}





                        </div>
                    )}


                </IonCardContent>

            </IonCard>
        )
    }

    function RenderAddToppingsSearchComponent({toppingsSearchStep, setToppingsSearchStep, addOnToBeAdded, setAddOnToBeAdded}){

        switch (toppingsSearchStep){

            case "search":
                return (
                    <RenderSearchToppingsComponent
                        toppingsSearchStep={toppingsSearchStep}
                        setToppingsSearchStep={setToppingsSearchStep}
                        setAddOnToBeAdded={setAddOnToBeAdded}
                    />
                )
                break;

            case "add new add on":
                return (<AddIngredientNutritionalFacts
                    setRecipeIngredientComponentState={setToppingsSearchStep}
                />)

            case "add unit size and price":
                return (<AddAddOnUnitSizeAndPrice
                        recipeIngredientsList={addOnsList}
                        setRecipeIngredientsList={setAddOnsList}
                        addOnToBeAdded={addOnToBeAdded}
                        setRecipeIngredientComponentState={setToppingsSearchStep}
                    />
                )
        }
    }


    return (
        <IonCard
            style={{
                width: "90%",
                margin: " 1em auto"
            }}
        >
            <IonButton
                onClick={() => onAddToppingsOptionClick()}
            >Add Toppings Option</IonButton>
            {toppingsSearchStep !== "" &&(
                <RenderAddToppingsSearchComponent
                    toppingsSearchStep={toppingsSearchStep}
                    setToppingsSearchStep={setToppingsSearchStep}
                    setAddOnToBeAdded={setAddOnToBeAdded}
                    addOnToBeAdded={addOnToBeAdded}
                />
            )}

        </IonCard>
    )
}
function AddDrinksComponent({ addOnsList, setAddOnsList, menuItemId,
                              }){



    const [ loadedToppingsOptions, setLoadedToppingsOption ] = useState([""])

    const [toppingsSearchStep, setToppingsSearchStep] = useState("")
    const [ addOnToBeAdded, setAddOnToBeAdded ] = useState("")



    let docTempData;
    useEffect(() => {
        loadToppingOptionsData();
        console.log("useEffect AddToppingsComponent", addOnToBeAdded)
    },[ toppingsSearchStep])

    function onAddToppingsOptionClick(){
        setToppingsSearchStep("search")
    }
    async function loadToppingOptionsData() {
        let temp = [];

        docTempData = await loadAnyCollectionData(`recipes-collection/${addOnToBeAdded.docId}/drinks`)
        // docTempData = await loadAnyCollectionData("create-custom-breakfast-hash-toppings")

        docTempData.docs.map(x => {
            temp = [...temp, x.data()]
            console.log(x.data())
        })
        console.log(temp)
        setLoadedToppingsOption(temp)
    }
    async function onDeleteToppingOptionClick(id){
        await deleteCustomDoc(`recipes-collection/${addOnToBeAdded.docId}/drinks`,id).then(x => {
            // await deleteCustomDoc("create-custom-breakfast-hash-toppings",id).then(x => {
            loadToppingOptionsData()
        })
    }
    function AddAddOnUnitSizeAndPrice({ recipeIngredientsList, setRecipeIngredientsList, addOnToBeAdded, setRecipeIngredientComponentState,
                                      }){

        const [unitAmount, setUnitAmount ] = useState(0)
        const [ unitPrice, setUnitPrice ] = useState()

        const [ unitGramsOrCups, setUnitGramsOrCups ] = useState(undefined)

        const [buttonEnabled, setButtonEnabled ] = useState(false)

        useEffect(() =>{
            console.log("Ingredient to be added! ", addOnToBeAdded)
            if ( unitGramsOrCups !== undefined && unitAmount > 0 && unitPrice > 0){
                setButtonEnabled(true)
                console.log("Setting Button True")
            }else{
                setButtonEnabled(false)
                console.log("Setting Button False")

            }

            console.log(addOnToBeAdded)
            console.log(recipeIngredientsList)
        },[unitGramsOrCups, buttonEnabled, unitAmount, unitPrice, recipeIngredientsList, ])



        async function onSaveIngredientToList() {
            let temp = [...recipeIngredientsList]
            console.log(temp, unitAmount + unitGramsOrCups, unitPrice, addOnToBeAdded)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(addOnToBeAdded.ingredientName?.toLowerCase())

            )

            let result1 = temp.filter(isSearched)
            console.log(result1)

            addOnToBeAdded.unitAmount = unitAmount;
            addOnToBeAdded.unitPrice = unitPrice;
            addOnToBeAdded.unitGramsOrCups = unitGramsOrCups;
            let toppingOption = {...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}


            let temp1 = recipeIngredientsList;
            console.log(recipeIngredientsList[0])
            console.log(addOnToBeAdded, toppingOption)

            if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' ') {

                console.log({addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice})
                setRecipeIngredientsList([{...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}])
                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/drinks`, toppingOption).then(r => console.log(r))
                console.log(res)

            }
            else if (recipeIngredientsList[0] !== ' ' && result1.length === 0) {
                console.log(recipeIngredientsList, addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice)
                console.log(addOnToBeAdded, toppingOption)

                let temp = [...recipeIngredientsList, addOnToBeAdded]
                console.log(temp)
                setRecipeIngredientsList(temp)
                console.log(toppingOption, temp, addOnToBeAdded)

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/drinks`, toppingOption)
                    // .then(r => console.log(r))
                 console.log(res)

            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, unitGramsOrCups}
                console.log(result2)
                temp1[(temp1.length - 1)] = result2;
                console.log(temp1)
                setRecipeIngredientsList([...temp1])

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/drinks`, toppingOption).then(r => console.log(r))
                console.log(res)

            }


            setRecipeIngredientComponentState("display")

        }

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <IonCardTitle>How much ?</IonCardTitle>
                    <IonCard style={{margin: "1em auto", width: "fit-content"}}>
                        <IonCardContent style={{padding: ".5em"}}>
                            <IonCardTitle color="primary">
                                {addOnToBeAdded.ingredientName}
                            </IonCardTitle>
                        </IonCardContent>
                    </IonCard>

                </IonCardHeader>
                <IonCardContent>
                    <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                        <input style={{width: "2em"}} value={unitAmount} type="number" onChange={(e) => {setUnitAmount(e.target.value)}}/>
                        <IonSelect
                            onIonChange={(e) => setUnitGramsOrCups(e.target.value)}
                            placeholder="g/cups">
                            <IonSelectOption >oz</IonSelectOption>
                            <IonSelectOption >item</IonSelectOption>
                            <IonSelectOption >grams</IonSelectOption>
                            <IonSelectOption >cups</IonSelectOption>
                            <IonSelectOption>tsp</IonSelectOption>
                            <IonSelectOption>tbsp</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div style={{  width: "fit-content", margin: "auto", display: "flex"}}>
                        <div style={{marginRight:".5em"}}>Price</div>
                        <div>
                            $<input style={{width: "4em", margin: "auto"}} value={unitPrice} type="number" onChange={(e) => {setUnitPrice(e.target.value)}}/>
                        </div>

                    </div>

                    <div style={{
                        // border:"solid",
                        display:"flex",
                        justifyContent: "space-between",
                        width:"75%",
                        margin: " 1em auto",
                    }}>
                        <IonButton onClick={() => setRecipeIngredientComponentState("search")} color="danger" >cancel</IonButton>
                        <IonButton onClick={() => onSaveIngredientToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    function SearchToppingsDataComponent({data, toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded}){


        // const [addOnToBeAdded, setAddOnToBeAdded ] = useLocalStorage("addOnToBeAdded", "")

        function onSearchDataDisplayClick(){

            // then display amount to give and price
            //add that data to the recipe data then
            // const customData = {...data, amount: "2oz"}
            // console.log(customData)
            console.log(data)
            setAddOnToBeAdded(data)
            setToppingsSearchStep("add unit size and price")

            // setAddOnToBeAdded(data)
        }
        return (
            <IonCard
            >
                <IonCardContent>
                    <div style={{display: "flex",
                    }}>

                        <div
                            onClick={() => onSearchDataDisplayClick()}
                            style={{
                                // backgroundColor: "blue",
                                width: "100%",
                                // backgroundColor: "red",
                                cursor: "pointer"}}>

                            {data.ingredientName}
                            <div style={{width: "15em",
                                margin: "auto"
                            }}>
                                <img style={{
                                    objectFit: "contain",
                                    width: "15em",
                                    margin: "auto",
                                    height: "8em",

                                }}
                                     src={data.imgUrl} />
                            </div>
                            {/*{ingredientSearchNutritionFacts && (*/}
                            {/*    <IngredientsSearchItemNutritionFacts*/}
                            {/*        ingredientSearchNutritionFacts={data}*/}
                            {/*    />*/}

                            {/*)}*/}

                        </div>
                        <div
                            style={{backgroundColor: "white",
                                display: "flex",
                                // width: "fit-content",
                                padding: "0",

                            }}
                        >
                            <IonIcon size="small"
                                // onClick={() => onDeleteIconClick()}
                                     style={{margin: "0 .5em", zIndex:"10"}} icon={deleteIcon}/>
                            <IonIcon  size="small"
                                // onClick={() => onEditIngredientClick()}
                                      style={{margin: "0 .5em",  zIndex:"10"}}  icon={editIcon}/>

                        </div>

                    </div>
                </IonCardContent>


            </IonCard>

        )
    }

    function RenderSearchToppingsComponent({toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded,}) {

        const [filteredData, setFilteredData ] = useState([""])
        const [ inputState, setInputState ] = useState("")


        async function loadAndFilterData(e) {

            let loadedData;
            let result;
            let dataTempArray = [];

            loadedData = await loadAnyCollectionData('ingredients-collection');

            loadedData.docs.map(doc => {
                dataTempArray = [...dataTempArray, doc.data()]
            })
            // console.log(dataTempArray)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(e?.toLowerCase())

            )

            if (e !== undefined || e !== "") {
                setInputState(e)


                result = dataTempArray.filter(isSearched)
                setFilteredData(result)
                console.log(result)
            }
            if ( e === "secret"){
                console.log("secret")
                setFilteredData(dataTempArray)

            }
        }

        useEffect(() => {

        },[loadAndFilterData])


        function onSearchInputChange(e){
            if (e !== " " || e !== "  " || e !== "   ") {
                loadAndFilterData(e);
            }
        }


        return (
            <IonCard style={{
                width: "90%",
                margin: "auto"
            }}>
                <div
                    style={{
                        position: "absolute",
                        right: ".5em",
                        zIndex: "10",
                        cursor: "pointer"
                    }}
                    // onClick={() => setShowAddIngredientToList(false)}
                >X</div>
                <IonCardHeader
                    style={{
                        textAlign: "center"
                    }}>
                    <IonCardTitle>
                        Ingredients Search
                    </IonCardTitle>
                </IonCardHeader>

                <IonCardContent >
                    <IonCard  style={{
                        padding: ".1em",
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        <input
                            value={inputState}
                            style={{
                                border: "none",
                                width: "100%"
                            }}
                            className="ingredients-searchbar-input"
                            type="text"
                            onChange={(e) => onSearchInputChange(e.target.value)}
                        />

                        <IonIcon size="large" icon={searchIcon}/>

                        <IonButton
                            onClick={() => setToppingsSearchStep("add new add on")}
                            // onClick={() => setSearchAndAddIngredientToListStep("Add New Ingredient")} size="small"
                        >
                            <div>
                                <IonIcon size="small" icon={addIcon} />


                            </div>
                        </IonButton>


                    </IonCard>

                    {filteredData.length > 0 && inputState && (
                        <div

                            style={{
                                width: "100%",
                                margin: "auto",
                            }}
                        >

                            <div>
                                {filteredData && filteredData.map((data, i) => (


                                    <SearchToppingsDataComponent
                                        data={data}
                                        toppingsSearchStep={toppingsSearchStep}
                                        setToppingsSearchStep={setToppingsSearchStep}
                                        setAddOnToBeAdded={setAddOnToBeAdded}
                                    />
                                ))}
                            </div>
                            {/*)}*/}





                        </div>
                    )}


                </IonCardContent>

            </IonCard>
        )
    }

    function RenderAddToppingsSearchComponent({toppingsSearchStep, setToppingsSearchStep, addOnToBeAdded, setAddOnToBeAdded}){

        switch (toppingsSearchStep){

            case "search":
                return (
                    <RenderSearchToppingsComponent
                        toppingsSearchStep={toppingsSearchStep}
                        setToppingsSearchStep={setToppingsSearchStep}
                        setAddOnToBeAdded={setAddOnToBeAdded}
                    />
                )
                break;

            case "add new add on":
                return (<AddIngredientNutritionalFacts
                    setRecipeIngredientComponentState={setToppingsSearchStep}
                />)

            case "add unit size and price":
                return (<AddAddOnUnitSizeAndPrice
                        recipeIngredientsList={addOnsList}
                        setRecipeIngredientsList={setAddOnsList}
                        addOnToBeAdded={addOnToBeAdded}
                        setRecipeIngredientComponentState={setToppingsSearchStep}
                    />
                )
        }
    }


    return (
        <IonCard
            style={{
                width: "90%",
                margin: " 1em auto"
            }}
        >
            <IonButton
                onClick={() => onAddToppingsOptionClick()}
            >Add Toppings Option</IonButton>
            {toppingsSearchStep !== "" &&(
                <RenderAddToppingsSearchComponent
                    toppingsSearchStep={toppingsSearchStep}
                    setToppingsSearchStep={setToppingsSearchStep}
                    setAddOnToBeAdded={setAddOnToBeAdded}
                    addOnToBeAdded={addOnToBeAdded}
                />
            )}

        </IonCard>
    )
}
function AddSidesComponent({ addOnsList, setAddOnsList, menuItemId,
                              }){



    const [ loadedToppingsOptions, setLoadedToppingsOption ] = useState([""])

    const [toppingsSearchStep, setToppingsSearchStep] = useState("")
    const [ addOnToBeAdded, setAddOnToBeAdded ] = useState("")



    let docTempData;
    useEffect(() => {
        loadToppingOptionsData();
        console.log("useEffect AddToppingsComponent", addOnToBeAdded)
    },[ toppingsSearchStep])

    function onAddToppingsOptionClick(){
        setToppingsSearchStep("search")
    }
    async function loadToppingOptionsData() {
        let temp = [];

        docTempData = await loadAnyCollectionData(`recipes-collection/${addOnToBeAdded.docId}/sides`)
        // docTempData = await loadAnyCollectionData("create-custom-breakfast-hash-toppings")

        docTempData.docs.map(x => {
            temp = [...temp, x.data()]
            console.log(x.data())
        })
        console.log(temp)
        setLoadedToppingsOption(temp)
    }
    async function onDeleteToppingOptionClick(id){
        await deleteCustomDoc(`recipes-collection/${addOnToBeAdded.docId}/sides`,id).then(x => {
            // await deleteCustomDoc("create-custom-breakfast-hash-toppings",id).then(x => {
            loadToppingOptionsData()
        })
    }
    function AddAddOnUnitSizeAndPrice({ recipeIngredientsList, setRecipeIngredientsList, addOnToBeAdded, setRecipeIngredientComponentState,
                                      }){

        const [unitAmount, setUnitAmount ] = useState(0)
        const [ unitPrice, setUnitPrice ] = useState()

        const [ unitGramsOrCups, setUnitGramsOrCups ] = useState(undefined)

        const [buttonEnabled, setButtonEnabled ] = useState(false)

        useEffect(() =>{
            console.log("Ingredient to be added! ", addOnToBeAdded)
            if ( unitGramsOrCups !== undefined && unitAmount > 0 && unitPrice > 0){
                setButtonEnabled(true)
                console.log("Setting Button True")
            }else{
                setButtonEnabled(false)
                console.log("Setting Button False")

            }

            console.log(addOnToBeAdded)
            console.log(recipeIngredientsList)
        },[unitGramsOrCups, buttonEnabled, unitAmount, unitPrice, recipeIngredientsList, ])



        async function onSaveIngredientToList() {
            let temp = [...recipeIngredientsList]
            console.log(temp, unitAmount + unitGramsOrCups, unitPrice, addOnToBeAdded)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(addOnToBeAdded.ingredientName?.toLowerCase())

            )

            let result1 = temp.filter(isSearched)
            console.log(result1)

            addOnToBeAdded.unitAmount = unitAmount;
            addOnToBeAdded.unitPrice = unitPrice;
            addOnToBeAdded.unitGramsOrCups = unitGramsOrCups;
            let toppingOption = {...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}


            let temp1 = recipeIngredientsList;
            console.log(recipeIngredientsList[0])
            console.log(addOnToBeAdded, toppingOption)

            if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' ') {

                console.log({addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice})
                setRecipeIngredientsList([{...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}])
                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/sides`, toppingOption).then(r => console.log(r))
                console.log(res)

            }
            else if (recipeIngredientsList[0] !== ' ' && result1.length === 0) {
                console.log(recipeIngredientsList, addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice)
                console.log(addOnToBeAdded, toppingOption)

                let temp = [...recipeIngredientsList, addOnToBeAdded]
                console.log(temp)
                setRecipeIngredientsList(temp)
                console.log(toppingOption, temp, addOnToBeAdded)

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/sides`, toppingOption)
                    // .then(r => console.log(r))
                 console.log(res)

            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, unitGramsOrCups}
                console.log(result2)
                temp1[(temp1.length - 1)] = result2;
                console.log(temp1)
                setRecipeIngredientsList([...temp1])

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/sides`, toppingOption).then(r => console.log(r))
                console.log(res)

            }


            setRecipeIngredientComponentState("display")

        }

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <IonCardTitle>How much ?</IonCardTitle>
                    <IonCard style={{margin: "1em auto", width: "fit-content"}}>
                        <IonCardContent style={{padding: ".5em"}}>
                            <IonCardTitle color="primary">
                                {addOnToBeAdded.ingredientName}
                            </IonCardTitle>
                        </IonCardContent>
                    </IonCard>

                </IonCardHeader>
                <IonCardContent>
                    <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                        <input style={{width: "2em"}} value={unitAmount} type="number" onChange={(e) => {setUnitAmount(e.target.value)}}/>
                        <IonSelect
                            onIonChange={(e) => setUnitGramsOrCups(e.target.value)}
                            placeholder="g/cups">
                            <IonSelectOption >oz</IonSelectOption>
                            <IonSelectOption >item</IonSelectOption>
                            <IonSelectOption >grams</IonSelectOption>
                            <IonSelectOption >cups</IonSelectOption>
                            <IonSelectOption>tsp</IonSelectOption>
                            <IonSelectOption>tbsp</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div style={{  width: "fit-content", margin: "auto", display: "flex"}}>
                        <div style={{marginRight:".5em"}}>Price</div>
                        <div>
                            $<input style={{width: "4em", margin: "auto"}} value={unitPrice} type="number" onChange={(e) => {setUnitPrice(e.target.value)}}/>
                        </div>

                    </div>

                    <div style={{
                        // border:"solid",
                        display:"flex",
                        justifyContent: "space-between",
                        width:"75%",
                        margin: " 1em auto",
                    }}>
                        <IonButton onClick={() => setRecipeIngredientComponentState("search")} color="danger" >cancel</IonButton>
                        <IonButton onClick={() => onSaveIngredientToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    function SearchToppingsDataComponent({data, toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded}){


        // const [addOnToBeAdded, setAddOnToBeAdded ] = useLocalStorage("addOnToBeAdded", "")

        function onSearchDataDisplayClick(){

            // then display amount to give and price
            //add that data to the recipe data then
            // const customData = {...data, amount: "2oz"}
            // console.log(customData)
            console.log(data)
            setAddOnToBeAdded(data)
            setToppingsSearchStep("add unit size and price")

            // setAddOnToBeAdded(data)
        }
        return (
            <IonCard
            >
                <IonCardContent>
                    <div style={{display: "flex",
                    }}>

                        <div
                            onClick={() => onSearchDataDisplayClick()}
                            style={{
                                // backgroundColor: "blue",
                                width: "100%",
                                // backgroundColor: "red",
                                cursor: "pointer"}}>

                            {data.ingredientName}
                            <div style={{width: "15em",
                                margin: "auto"
                            }}>
                                <img style={{
                                    objectFit: "contain",
                                    width: "15em",
                                    margin: "auto",
                                    height: "8em",

                                }}
                                     src={data.imgUrl} />
                            </div>
                            {/*{ingredientSearchNutritionFacts && (*/}
                            {/*    <IngredientsSearchItemNutritionFacts*/}
                            {/*        ingredientSearchNutritionFacts={data}*/}
                            {/*    />*/}

                            {/*)}*/}

                        </div>
                        <div
                            style={{backgroundColor: "white",
                                display: "flex",
                                // width: "fit-content",
                                padding: "0",

                            }}
                        >
                            <IonIcon size="small"
                                // onClick={() => onDeleteIconClick()}
                                     style={{margin: "0 .5em", zIndex:"10"}} icon={deleteIcon}/>
                            <IonIcon  size="small"
                                // onClick={() => onEditIngredientClick()}
                                      style={{margin: "0 .5em",  zIndex:"10"}}  icon={editIcon}/>

                        </div>

                    </div>
                </IonCardContent>


            </IonCard>

        )
    }

    function RenderSearchToppingsComponent({toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded,}) {

        const [filteredData, setFilteredData ] = useState([""])
        const [ inputState, setInputState ] = useState("")


        async function loadAndFilterData(e) {

            let loadedData;
            let result;
            let dataTempArray = [];

            loadedData = await loadAnyCollectionData('ingredients-collection');

            loadedData.docs.map(doc => {
                dataTempArray = [...dataTempArray, doc.data()]
            })
            // console.log(dataTempArray)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(e?.toLowerCase())

            )

            if (e !== undefined || e !== "") {
                setInputState(e)


                result = dataTempArray.filter(isSearched)
                setFilteredData(result)
                console.log(result)
            }
            if ( e === "secret"){
                console.log("secret")
                setFilteredData(dataTempArray)

            }
        }

        useEffect(() => {

        },[loadAndFilterData])


        function onSearchInputChange(e){
            if (e !== " " || e !== "  " || e !== "   ") {
                loadAndFilterData(e);
            }
        }


        return (
            <IonCard style={{
                width: "90%",
                margin: "auto"
            }}>
                <div
                    style={{
                        position: "absolute",
                        right: ".5em",
                        zIndex: "10",
                        cursor: "pointer"
                    }}
                    // onClick={() => setShowAddIngredientToList(false)}
                >X</div>
                <IonCardHeader
                    style={{
                        textAlign: "center"
                    }}>
                    <IonCardTitle>
                        Ingredients Search
                    </IonCardTitle>
                </IonCardHeader>

                <IonCardContent >
                    <IonCard  style={{
                        padding: ".1em",
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        <input
                            value={inputState}
                            style={{
                                border: "none",
                                width: "100%"
                            }}
                            className="ingredients-searchbar-input"
                            type="text"
                            onChange={(e) => onSearchInputChange(e.target.value)}
                        />

                        <IonIcon size="large" icon={searchIcon}/>

                        <IonButton
                            onClick={() => setToppingsSearchStep("add new add on")}
                            // onClick={() => setSearchAndAddIngredientToListStep("Add New Ingredient")} size="small"
                        >
                            <div>
                                <IonIcon size="small" icon={addIcon} />


                            </div>
                        </IonButton>


                    </IonCard>

                    {filteredData.length > 0 && inputState && (
                        <div

                            style={{
                                width: "100%",
                                margin: "auto",
                            }}
                        >

                            <div>
                                {filteredData && filteredData.map((data, i) => (


                                    <SearchToppingsDataComponent
                                        data={data}
                                        toppingsSearchStep={toppingsSearchStep}
                                        setToppingsSearchStep={setToppingsSearchStep}
                                        setAddOnToBeAdded={setAddOnToBeAdded}
                                    />
                                ))}
                            </div>
                            {/*)}*/}





                        </div>
                    )}


                </IonCardContent>

            </IonCard>
        )
    }

    function RenderAddToppingsSearchComponent({toppingsSearchStep, setToppingsSearchStep, addOnToBeAdded, setAddOnToBeAdded}){

        switch (toppingsSearchStep){

            case "search":
                return (
                    <RenderSearchToppingsComponent
                        toppingsSearchStep={toppingsSearchStep}
                        setToppingsSearchStep={setToppingsSearchStep}
                        setAddOnToBeAdded={setAddOnToBeAdded}
                    />
                )
                break;

            case "add new add on":
                return (<AddIngredientNutritionalFacts
                    setRecipeIngredientComponentState={setToppingsSearchStep}
                />)

            case "add unit size and price":
                return (<AddAddOnUnitSizeAndPrice
                        recipeIngredientsList={addOnsList}
                        setRecipeIngredientsList={setAddOnsList}
                        addOnToBeAdded={addOnToBeAdded}
                        setRecipeIngredientComponentState={setToppingsSearchStep}
                    />
                )
        }
    }


    return (
        <IonCard
            style={{
                width: "90%",
                margin: " 1em auto"
            }}
        >
            <IonButton
                onClick={() => onAddToppingsOptionClick()}
            >Add Sides Option</IonButton>
            {toppingsSearchStep !== "" &&(
                <RenderAddToppingsSearchComponent
                    toppingsSearchStep={toppingsSearchStep}
                    setToppingsSearchStep={setToppingsSearchStep}
                    setAddOnToBeAdded={setAddOnToBeAdded}
                    addOnToBeAdded={addOnToBeAdded}
                />
            )}

        </IonCard>
    )
}
function AddEggsAndMoreOptionsComponent({ addOnsList, setAddOnsList, menuItemId,
                                        }){



    const [ loadedToppingsOptions, setLoadedToppingsOption ] = useState([""])

    const [toppingsSearchStep, setToppingsSearchStep] = useState("")
    const [ addOnToBeAdded, setAddOnToBeAdded ] = useState("")



    let docTempData;
    useEffect(() => {
        // loadToppingOptionsData();
        console.log("useEffect AddToppingsComponent", addOnToBeAdded)
    },[ toppingsSearchStep])

    function onAddToppingsOptionClick(){
        setToppingsSearchStep("search")
    }
    async function loadToppingOptionsData() {
        let temp = [];

        docTempData = await loadAnyCollectionData(`recipes-collection/${addOnToBeAdded.docId}/tortilla-options`)
        // docTempData = await loadAnyCollectionData("create-custom-breakfast-hash-toppings")

        docTempData.docs.map(x => {
            temp = [...temp, x.data()]
            console.log(x.data())
        })
        console.log(temp)
        setLoadedToppingsOption(temp)
    }
    async function onDeleteToppingOptionClick(id){
        await deleteCustomDoc(`recipes-collection/${addOnToBeAdded.docId}/addOns`,id).then(x => {
            // await deleteCustomDoc("create-custom-breakfast-hash-toppings",id).then(x => {
            loadToppingOptionsData()
        })
    }
    function AddAddOnUnitSizeAndPrice({ recipeIngredientsList, setRecipeIngredientsList, addOnToBeAdded, setRecipeIngredientComponentState,
                                      }){

        const [unitAmount, setUnitAmount ] = useState(0)
        const [ unitPrice, setUnitPrice ] = useState()

        const [ unitGramsOrCups, setUnitGramsOrCups ] = useState(undefined)

        const [buttonEnabled, setButtonEnabled ] = useState(false)

        useEffect(() =>{
            console.log("Ingredient to be added! ", addOnToBeAdded)
            if ( unitGramsOrCups !== undefined && unitAmount > 0 && unitPrice > 0){
                setButtonEnabled(true)
                console.log("Setting Button True")
            }else{
                setButtonEnabled(false)
                console.log("Setting Button False")

            }

            console.log(addOnToBeAdded)
            console.log(recipeIngredientsList)
        },[unitGramsOrCups, buttonEnabled, unitAmount, unitPrice, recipeIngredientsList, ])



        async function onSaveIngredientToList() {
            let temp = [...recipeIngredientsList]
            console.log(temp, unitAmount + unitGramsOrCups, unitPrice, addOnToBeAdded)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(addOnToBeAdded.ingredientName?.toLowerCase())

            )

            let result1 = temp.filter(isSearched)
            console.log(result1)

            addOnToBeAdded.unitAmount = unitAmount;
            addOnToBeAdded.unitPrice = unitPrice;
            addOnToBeAdded.unitGramsOrCups = unitGramsOrCups;
            let toppingOption = {...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}


            let temp1 = recipeIngredientsList;
            console.log(recipeIngredientsList[0])
            console.log(addOnToBeAdded, toppingOption)

            if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' ') {

                console.log({addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice})
                setRecipeIngredientsList([{...addOnToBeAdded, unitAmount, unitPrice, unitGramsOrCups}])
                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/eggs-and-more-options`, toppingOption).then(r => console.log(r))
                console.log(res)

            } else if (recipeIngredientsList[0] !== ' ' && result1.length === 0) {
                console.log(recipeIngredientsList, addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice)
                console.log(addOnToBeAdded, toppingOption)

                let temp = [...recipeIngredientsList, addOnToBeAdded]
                console.log(temp)
                setRecipeIngredientsList(temp)
                console.log(toppingOption, temp, addOnToBeAdded)

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/eggs-and-more-options`, toppingOption)
                // .then(r => console.log(r))
                console.log(res)

            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, unitGramsOrCups}
                console.log(result2)
                temp1[(temp1.length - 1)] = result2;
                console.log(temp1)
                setRecipeIngredientsList([...temp1])

                const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/eggs-and-more-options`, toppingOption).then(r => console.log(r))
                console.log(res)

            }


            setRecipeIngredientComponentState("display")

        }

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <IonCardTitle>How much ?</IonCardTitle>
                    <IonCard style={{margin: "1em auto", width: "fit-content"}}>
                        <IonCardContent style={{padding: ".5em"}}>
                            <IonCardTitle color="primary">
                                {addOnToBeAdded.ingredientName}
                            </IonCardTitle>
                        </IonCardContent>
                    </IonCard>

                </IonCardHeader>
                <IonCardContent>
                    <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                        <input style={{width: "2em"}} value={unitAmount} type="number" onChange={(e) => {setUnitAmount(e.target.value)}}/>
                        <IonSelect
                            onIonChange={(e) => setUnitGramsOrCups(e.target.value)}
                            placeholder="g/cups">
                            <IonSelectOption >oz</IonSelectOption>
                            <IonSelectOption >item</IonSelectOption>
                            <IonSelectOption >grams</IonSelectOption>
                            <IonSelectOption >cups</IonSelectOption>
                            <IonSelectOption>tsp</IonSelectOption>
                            <IonSelectOption>tbsp</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div style={{  width: "fit-content", margin: "auto", display: "flex"}}>
                        <div style={{marginRight:".5em"}}>Price</div>
                        <div>
                            $<input style={{width: "4em", margin: "auto"}} value={unitPrice} type="number" onChange={(e) => {setUnitPrice(e.target.value)}}/>
                        </div>

                    </div>

                    <div style={{
                        // border:"solid",
                        display:"flex",
                        justifyContent: "space-between",
                        width:"75%",
                        margin: " 1em auto",
                    }}>
                        <IonButton onClick={() => setRecipeIngredientComponentState("search")} color="danger" >cancel</IonButton>
                        <IonButton onClick={() => onSaveIngredientToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    function SearchToppingsDataComponent({data, toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded}){


        // const [addOnToBeAdded, setAddOnToBeAdded ] = useLocalStorage("addOnToBeAdded", "")

        function onSearchDataDisplayClick(){

            // then display amount to give and price
            //add that data to the recipe data then
            // const customData = {...data, amount: "2oz"}
            // console.log(customData)
            console.log(data)
            setAddOnToBeAdded(data)
            setToppingsSearchStep("add unit size and price")

            // setAddOnToBeAdded(data)
        }
        return (
            <IonCard
            >
                <IonCardContent>
                    <div style={{display: "flex",
                    }}>

                        <div
                            onClick={() => onSearchDataDisplayClick()}
                            style={{
                                // backgroundColor: "blue",
                                width: "100%",
                                // backgroundColor: "red",
                                cursor: "pointer"}}>

                            {data.ingredientName}
                            <div style={{width: "15em",
                                margin: "auto"
                            }}>
                                <img style={{
                                    objectFit: "contain",
                                    width: "15em",
                                    margin: "auto",
                                    height: "8em",

                                }}
                                     src={data.imgUrl} />
                            </div>
                            {/*{ingredientSearchNutritionFacts && (*/}
                            {/*    <IngredientsSearchItemNutritionFacts*/}
                            {/*        ingredientSearchNutritionFacts={data}*/}
                            {/*    />*/}

                            {/*)}*/}

                        </div>
                        <div
                            style={{backgroundColor: "white",
                                display: "flex",
                                // width: "fit-content",
                                padding: "0",

                            }}
                        >
                            <IonIcon size="small"
                                // onClick={() => onDeleteIconClick()}
                                     style={{margin: "0 .5em", zIndex:"10"}} icon={deleteIcon}/>
                            <IonIcon  size="small"
                                // onClick={() => onEditIngredientClick()}
                                      style={{margin: "0 .5em",  zIndex:"10"}}  icon={editIcon}/>

                        </div>

                    </div>
                </IonCardContent>


            </IonCard>

        )
    }

    function RenderSearchToppingsComponent({toppingsSearchStep, setToppingsSearchStep, setAddOnToBeAdded,}) {

        const [filteredData, setFilteredData ] = useState([""])
        const [ inputState, setInputState ] = useState("")


        async function loadAndFilterData(e) {

            let loadedData;
            let result;
            let dataTempArray = [];

            loadedData = await loadAnyCollectionData('ingredients-collection');

            loadedData.docs.map(doc => {
                dataTempArray = [...dataTempArray, doc.data()]
            })
            // console.log(dataTempArray)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(e?.toLowerCase())

            )

            if (e !== undefined || e !== "") {
                setInputState(e)


                result = dataTempArray.filter(isSearched)
                setFilteredData(result)
                console.log(result)
            }
            if ( e === "secret"){
                console.log("secret")
                setFilteredData(dataTempArray)

            }
        }

        useEffect(() => {

        },[loadAndFilterData])


        function onSearchInputChange(e){
            if (e !== " " || e !== "  " || e !== "   ") {
                loadAndFilterData(e);
            }
        }


        return (
            <IonCard style={{
                width: "90%",
                margin: "auto"
            }}>
                <div
                    style={{
                        position: "absolute",
                        right: ".5em",
                        zIndex: "10",
                        cursor: "pointer"
                    }}
                    // onClick={() => setShowAddIngredientToList(false)}
                >X</div>
                <IonCardHeader
                    style={{
                        textAlign: "center"
                    }}>
                    <IonCardTitle>
                        Ingredients Search
                    </IonCardTitle>
                </IonCardHeader>

                <IonCardContent >
                    <IonCard  style={{
                        padding: ".1em",
                        display: "flex",
                        justifyContent: "space-around",
                    }}>

                        <input
                            value={inputState}
                            style={{
                                border: "none",
                                width: "100%"
                            }}
                            className="ingredients-searchbar-input"
                            type="text"
                            onChange={(e) => onSearchInputChange(e.target.value)}
                        />

                        <IonIcon size="large" icon={searchIcon}/>

                        <IonButton
                            onClick={() => setToppingsSearchStep("add new add on")}
                            // onClick={() => setSearchAndAddIngredientToListStep("Add New Ingredient")} size="small"
                        >
                            <div>
                                <IonIcon size="small" icon={addIcon} />


                            </div>
                        </IonButton>


                    </IonCard>

                    {filteredData.length > 0 && inputState && (
                        <div

                            style={{
                                width: "100%",
                                margin: "auto",
                            }}
                        >

                            <div>
                                {filteredData && filteredData.map((data, i) => (


                                    <SearchToppingsDataComponent
                                        data={data}
                                        toppingsSearchStep={toppingsSearchStep}
                                        setToppingsSearchStep={setToppingsSearchStep}
                                        setAddOnToBeAdded={setAddOnToBeAdded}
                                    />
                                ))}
                            </div>
                            {/*)}*/}





                        </div>
                    )}


                </IonCardContent>

            </IonCard>
        )
    }

    function RenderAddToppingsSearchComponent({toppingsSearchStep, setToppingsSearchStep, addOnToBeAdded, setAddOnToBeAdded}){

        switch (toppingsSearchStep){

            case "search":
                return (
                    <RenderSearchToppingsComponent
                        toppingsSearchStep={toppingsSearchStep}
                        setToppingsSearchStep={setToppingsSearchStep}
                        setAddOnToBeAdded={setAddOnToBeAdded}
                    />
                )
                break;

            case "add new add on":
                return (<AddIngredientNutritionalFacts
                    setRecipeIngredientComponentState={setToppingsSearchStep}
                />)

            case "add unit size and price":
                return (<AddAddOnUnitSizeAndPrice
                        recipeIngredientsList={addOnsList}
                        setRecipeIngredientsList={setAddOnsList}
                        addOnToBeAdded={addOnToBeAdded}
                        setRecipeIngredientComponentState={setToppingsSearchStep}
                    />
                )
        }
    }


    return (
        <IonCard
            style={{
                width: "90%",
                margin: " 1em auto"
            }}
        >
            <IonButton
                onClick={() => onAddToppingsOptionClick()}
            >Add Toppings Option</IonButton>
            {toppingsSearchStep !== "" &&(
                <RenderAddToppingsSearchComponent
                    toppingsSearchStep={toppingsSearchStep}
                    setToppingsSearchStep={setToppingsSearchStep}
                    setAddOnToBeAdded={setAddOnToBeAdded}
                    addOnToBeAdded={addOnToBeAdded}
                />
            )}

        </IonCard>
    )
}
function SelectedAddOnComponent({data,  addOnsList, setAddOnsList, i, setAddOnsChange}){


    console.log(data, addOnsList)
    const [ optionAmount, setOptionAmount ] = useState(data.unitAmount === undefined ? (0):(data.unitAmount))
    console.log(data.unitAmount)



    const [loadedList, setLoadedList ] = useState([...addOnsList])



    function onDeleteAddOn(){
        console.log("Delete " + data.name,)
        console.log(addOnsList, )
        let temp;

        temp = addOnsList;
        temp.map((list, i) => {
            if (list.name === data.name){
                console.log("deleting " + list.name )
                temp.splice(i,1)
                setAddOnsList(temp)
                setLoadedList(temp)
                console.log(temp, addOnsList)
                // setAddOnsList2(temp)
            }
        })
    }

    function onDeleteSelectedAddOn(){
        let temp = addOnsList;
        temp.splice(i, 1)
        console.log(temp , i)
        setAddOnsList(temp)
        // setLoadedList(temp)
        setAddOnsChange(true)

    }
    function onDecreaseAddOnAmount(){
        let temp = addOnsList
        temp[i].unitAmount = optionAmount -1;
        setOptionAmount((optionAmount - 1 ))
        setAddOnsList(temp)
        setAddOnsChange(true)


    }

    function onAddOptionAmount(){
        let temp = addOnsList
        temp[i].unitAmount = optionAmount  + 1;
        setOptionAmount((optionAmount + 1 ))
        setAddOnsList(temp)
        setAddOnsChange(true)
    }

    function renderSelectedAddOnComponent(){

        // console.log(addOnsList..includes(data.name))

        if (data.unitAmount > 0 && addOnsList[i]?.ingredientName === data.ingredientName){
            console.log("INCLUDES", data, loadedList, addOnsList)
            return (
                <div style={{
                    // border:"solid",
                    width: "fit-content", }}>
                    <IonCard style={{
                        color: optionAmount > 0 ? ("black"):(""),
                        // borderRadius: "12px",
                        padding: ".5em",
                        margin: "auto",
                        fontSize: ".75rem",
                        border: "solid thin",
                        width: "fit-content",
                        height: "fit-content",
                        // backgroundColor: "red",
                    }}>
                        {/*<IonCardContent>*/}
                        <div style={{

                            display:"flex",
                            flexDirection: "column",
                            // backgroundColor: "blue"
                        }}>
                            <div  style={{
                                // backgroundColor: "red",
                                marginTop: "-.2em",
                                cursor: "pointer",
                                marginLeft: ".3em"
                            }}
                                  onClick={() => onDeleteSelectedAddOn()}
                            >X</div>

                            <div style={{
                                // backgroundColor: "red",
                                marginTop: "-.3em",
                                marginRight: ".4em"
                            }}>
                                {data.ingredientName}

                            </div>
                            <div style={{textAlign:"center", margin: ".2em"}}>{data.unitAmount} {data.unitGramsOrCups}</div>

                            <div style={{
                                textAlign: "center",
                                fontSize:"1rem",
                                // backgroundColor:"blue",
                                fontWeight: "bold",
                                // margin: "-.3em auto",
                                color: "green",
                            }}> ${data.unitPrice * (optionAmount)}</div>



                        </div>


                        {/*</IonCardContent>*/}
                    </IonCard>

                    <div style={{
                        // border: "solid thin",
                        width: "fit-content",
                        display: "flex",
                        height: "100%",
                        flexFlow: "row",
                        margin: "auto",
                    }}>

                        <div><IonIcon
                            onClick={ parseInt(optionAmount) === 1  ? (() => onDeleteSelectedAddOn()):(() => onDecreaseAddOnAmount())}
                            style={{fontSize: "20px",
                                // border: "solid",
                                height:"100%",
                                color: "black",
                                cursor: "pointer",

                            }} icon={subtractIcon} /></div>
                        <div  style={{fontSize: ".9rem",
                            // border: "solid",
                            height: "100%",
                            margin: "auto .3em",
                            cursor: "default",
                            color: "black"
                        }}>
                            {/*{data.equipmentAmount}*/}
                            {optionAmount}
                        </div>
                        <div><IonIcon
                            onClick={() => onAddOptionAmount()}
                            style={{fontSize: "20px",
                                cursor: "pointer",
                                color: "black",
                                // border: "solid",
                                height:"100%"
                            }} icon={addIcon} /></div>

                    </div>

                </div>

            )
        }


        // if (addOnsList.length > 0){
        //     return (
        //         <IonCard style={{
        //             borderRadius: "12px",
        //             padding: ".5em",
        //             fontSize: ".7rem",
        //             border: "solid thin",
        //             width: "fit-content",
        //             height: "2em"
        //         }}>
        //             {/*<IonCardContent>*/}
        //             <div style={{
        //
        //                 display:"flex",
        //                 flexDirection: "row",
        //             }}>
        //                 <div style={{
        //                     // backgroundColor: "red",
        //                     marginTop: "-.3em",
        //                 }}>
        //                     {data.name}
        //
        //                 </div>
        //                 <div  style={{
        //                     // backgroundColor: "red",
        //                     marginTop: "-.2em",
        //                     cursor: "pointer",
        //                     marginLeft: ".3em"
        //                 }}
        //                       onClick={() => onDeleteAddOn()}
        //                 >X</div>
        //
        //             </div>
        //
        //             {/*</IonCardContent>*/}
        //         </IonCard>
        //     )
        // }


    }
    return(
        <div>
            {renderSelectedAddOnComponent()}

        </div>

    )
}

function MainIngredientsComponent({ addOnsFromFirebase, addOnsCartArray, setAddOnsCartArray, setMenuItemPageSwitchCase

                               }){
    const [ currentIndex , setCurrentIndex ] = useState(0)

    // const [comboAmount , setComboAmount ] = useState(0)
    console.log(addOnsCartArray[currentIndex])
    // const [comboAmount , setComboAmount ] = useState(addOnsCartArray[currentIndex]?.comboAmount === undefined ? (0):(addOnsCartArray[currentIndex]?.comboAmount))
    // console.log(comboAmount)
    console.log(addOnsCartArray[currentIndex]?.comboAmount)
    const [ macroStats, setMacroStats ] = useState([])
    const [ backDrop , setBackDrop ] = useState(0)
    // const [ backDrop , setBackDrop ] = useState(data.comboAmount > 0 ? (false):(true))
    const [showNutrients, setShowNutrients ] = useState(true)

    useEffect(() => {
        // loadAndFilterAddOns()
        console.log(addOnsCartArray)
    },[addOnsCartArray,
        // data,
        // comboAmount
    ])

    function calculateAndRenderAddOnsNutritionProfile(){


        function multiplyValuesInArray() {
            console.log(addOnsFromFirebase)
            return addOnsFromFirebase?.map((item) => {
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
            });
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
        let amount, sumResult, ingredientNutrition, multipliedArray;

        const formatToTwoDecimalPlaces = (value) => {
            return value % 1 !== 0 ? value.toFixed(2) : value;
        };
        let calories, protein, fat, price, carbohydrates = 0;

        multipliedArray = multiplyValuesInArray();
        console.log(multipliedArray);
        console.log(multipliedArray[currentIndex]);

        if(multipliedArray[currentIndex] !== undefined && multipliedArray[currentIndex].comboAmount > 0n){
            calories = multipliedArray[currentIndex].calories;
            protein = multipliedArray[currentIndex].protein;
            carbohydrates =  multipliedArray[currentIndex].totalCarbohydrates;
            fat = multipliedArray[currentIndex].totalFat;
            // price = data.unitPrice * comboAmount
            // data.total = price;
            console.log(protein, carbohydrates, fat, calories, )
            let stats= ([
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
                        <div style={{fontSize: ".7rem", width:"fit-content", margin: "auto"}}>
                            {showNutrients == true ? (
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(false)} icon={chevronDownOutline} />
                                    {macroStats !== [] && (
                                        <NutrientProgressBar
                                            nutritionData={stats}

                                        />

                                    )}
                                </div>

                            ):(
                                <div>
                                    {formatToTwoDecimalPlaces(calories)} cals
                                    <IonIcon style={{fontSize: ".8rem", fontWeight: "bold"}} onClick={() => setShowNutrients(true)} icon={chevronForwardOutline} />

                                </div>

                            )}
                        </div>
                    </div>
                )
            }else {
                console.log("else")
                return null;
            }

        }

    }
    // function loadAndFilterAddOns(){
    //     console.log(addOnsCartArray, data)
    //     if (addOnsCartArray.length > 0 ){
    //         addOnsCartArray.map((selectedAddOn, i ) => {
    //             if (selectedAddOn.docId === data.docId){
    //                 data.comboAmount = selectedAddOn.comboAmount;
    //                 setComboAmount(selectedAddOn.comboAmount)
    //                 console.log(data)
    //
    //             }
    //         })
    //     }
    // }
    function populateAddOnsDocIds(array){
        let cartAddOnsDocId = [];

        addOnsCartArray.map((cartAddOn) => {

            console.log(cartAddOn)
            cartAddOnsDocId = [...cartAddOnsDocId, cartAddOn.docId]

            console.log(cartAddOnsDocId)

        })

        return cartAddOnsDocId;
    }
    async function onAddAmountToData() {

        let newData = addOnsFromFirebase[currentIndex];

        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];
                temp.comboAmount = addOnsCartArray[cartIndex].comboAmount + 1;

                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 0")

                tempArr.splice(cartIndex, 1, temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
                // setComboAmount(temp.comboAmount)

            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount
                console.log(temp.total, "TOTAL 1")


                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])
                // setComboAmount(temp.comboAmount)

            }

        } else {
            console.log("Array.length === 0")
            let temp = newData;
            temp.comboAmount = 1;
            temp.total = temp.unitPrice * temp.comboAmount;
            console.log(temp.total, "TOTAL")

            console.log(temp)
            let tempArr = [...addOnsCartArray]
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
            // setComboAmount(temp.comboAmount)
        }
    }
    async function onDecreaseAmountToData() {

      let newData = addOnsFromFirebase[currentIndex];


        console.log(newData)

        if (addOnsCartArray.length > 0) {
            console.log(addOnsCartArray)
            const res =  populateAddOnsDocIds(addOnsCartArray)
            console.log(res)
            console.log(res.includes(newData.docId))

            if (res.includes(newData.docId)) {

                let cartIndex = res.indexOf(newData.docId)
                console.log(res, cartIndex)

                let tempArr = [...addOnsCartArray]
                let temp = addOnsCartArray[cartIndex];

                if (addOnsCartArray[cartIndex].comboAmount > 1 ){

                    temp.comboAmount = addOnsCartArray[cartIndex].comboAmount - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    tempArr.splice(cartIndex, 1, temp)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                }else {
                    console.log(addOnsCartArray[cartIndex].comboAmount)
                    temp.comboAmount = parseInt(addOnsCartArray[cartIndex].comboAmount) - 1;
                    temp.total = temp.unitPrice * temp.comboAmount

                    console.log(tempArr)
                    tempArr.splice(cartIndex, 1)
                    console.log(tempArr)
                    setAddOnsCartArray([...tempArr])
                    // setComboAmount(0)
                    setAddOnsCartArray(tempArr)
                    console.log("SEtting backdrop true")
                    setBackDrop(true)

                }

            }
            else {
                console.log(newData.ingredientName, "Does Not include ")
                let tempArr = [...addOnsCartArray]
                let temp = newData;
                temp.comboAmount = 1;
                temp.total = temp.unitPrice * temp.comboAmount

                console.log(temp)
                tempArr.push(temp)
                console.log(tempArr)
                setAddOnsCartArray([...tempArr])

                if (temp.comboAmount === 0 ){
                    console.log("SEtting backdrop true")
                    setBackDrop(true)
                }
            }

        } else {
            console.log("Array.length === 0")

            let tempArr = [...addOnsCartArray]
            let temp = newData;
            temp.comboAmount = 1;

            temp.total = temp.unitPrice * temp.comboAmount

            console.log(temp)
            tempArr.push(temp)
            console.log(tempArr)
            setAddOnsCartArray([...tempArr])
        }
    }


    function renderAddOnComponent(){

        console.log(addOnsCartArray[currentIndex]?.comboAmount)
        // console.log(addOnsCartArray[currentIndex].comboAmount)

        return (
            <div style={{}}>
                <div style={{
                    width: "10em",
                    margin: "auto",
                    textAlign: "center",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    marginBottom: "1.2em",
                    color:"black",
                }}>How much would
                    <div style={{color: "blue", fontWeight:"bold"}}>
                             {addOnsFromFirebase[currentIndex].ingredientName}
                    </div>
                    you like?</div>
                <IonCard style={{
                    // minWidth: "100%",
                    width: "20em",
                    // minHeight: "25em",
                    height: "fit-content",
                    fontSize: ".6rem",
                    margin: "auto",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    border: "solid green",
                    overflow: "hidden",
                    transition: "transform 0.2s ease-in-out",
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div style={{
                            fontSize: "1rem",
                            height: "3em",
                            textAlign: "center",
                            padding: ".2em",
                            color: "#333",
                            // fontWeight: addOnsFromFirebase[currentIndex].comboAmount > 0 ? "bold" : "normal",
                            // backgroundColor: data.comboAmount > 0 ? "#498bce" : "#aabbcc",
                        }}>
                             {addOnsFromFirebase[currentIndex].ingredientName}
                        </div>

                        <div style={{
                            // border: "solid",
                            width: "100%",
                            height: "6em",
                            // borderColor: "#ddd",
                            margin: "auto"
                        }}>
                            <img
                                src={addOnsFromFirebase[currentIndex].imgUrl}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />

                        </div>
                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "space-around",
                        }}>
                            {addOnsCartArray[currentIndex]?.comboAmount === undefined ? (
                                <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                    {addOnsFromFirebase[currentIndex].unitAmount} {addOnsFromFirebase[currentIndex].unitGramsOrCups}
                                </div>
                            ):(
                                <div style={{ textAlign: "center", margin: ".2em", fontSize: "0.8rem", color: "#555" }}>
                                    {addOnsFromFirebase[currentIndex].unitAmount * addOnsFromFirebase[currentIndex].comboAmount} {addOnsFromFirebase[currentIndex].unitGramsOrCups}
                                </div>
                            )}

                            <IonCard style={{
                                border: "solid thin",
                                width: "fit-content",
                                display: "flex",
                                height: "100%",
                                flexFlow: "row",
                                margin: ".3em auto",
                            }}>
                                <div>
                                    <IonIcon
                                        onClick={() => onDecreaseAmountToData()}
                                        style={{
                                            fontSize: "20px",
                                            height: "100%",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                        icon={subtractIcon}
                                    />
                                </div>
                                <div style={{
                                    fontSize: "1rem",
                                    height: "100%",
                                    margin: "auto .3em",
                                    cursor: "default",
                                    color: "black",
                                }}>
                                    <span style={{color:"green", fontWeight:"bold"}}>x</span>
                                    {addOnsCartArray[currentIndex]?.comboAmount === undefined ? (0):(addOnsCartArray[currentIndex]?.comboAmount)}
                                </div>
                                <div>
                                    <IonIcon
                                        onClick={() => onAddAmountToData()}
                                        style={{
                                            fontSize: "20px",
                                            cursor: "pointer",
                                            color: "black",
                                            height: "100%",
                                        }}
                                        icon={addIcon}
                                    />
                                </div>
                            </IonCard>

                            {addOnsCartArray[currentIndex]?.comboAmount === undefined ? (
                                <div></div>
                            ):(
                                <label style={{
                                    textAlign: "center",
                                    fontSize: "1.2rem",
                                    margin: ".3em auto",
                                    // color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                                }}>
                                    ${addOnsFromFirebase[currentIndex].unitPrice * addOnsCartArray[currentIndex]?.comboAmount}
                                </label>

                            )}

                            {/*${addOnsFromFirebase[currentIndex].unitPrice * comboAmount}*/}

                            <div>
                                {calculateAndRenderAddOnsNutritionProfile()}
                            </div>
                        </div>
                    </div>
                </IonCard>
                {addOnsFromFirebase.length-1 > currentIndex ? (
                    <IonButton  onClick={() => setCurrentIndex(currentIndex + 1)} color="warning" expand="block">Continue</IonButton>

                ):(
                    <IonButton  onClick={() => setMenuItemPageSwitchCase("more")} color="warning" expand="block">Continue</IonButton>
                )}
                <IonButton fill="outline" expand="block" onClick={() => setMenuItemPageSwitchCase("main-ingredient-options")}>+ Add Main Ingredient Options</IonButton>

            </div>
        )
    }
    return (<div>
            {renderAddOnComponent()}
        </div>
    )


}