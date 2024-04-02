import React, {useEffect, useRef, useState} from "react"
import {
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
} from "../../firebase";
import {
    add,
    addCircleOutline as addIcon, createOutline as editIcon,
    removeCircleOutline as subtractIcon,
    searchCircleOutline as searchIcon, trashOutline as deleteIcon
} from "ionicons/icons";
import {AddIngredientNutritionalFacts} from "../recipes-page/recipes-page-components";
import KartStatsComponent from "./mario-kart-stats/kart-stats-component";
import NutrientProgressBar from "./nutrient-progress-bar/nutrient-progress-bar";
import ChooseYourTortillaComponent from "./choose-your-tortilla-component/choose-your-tortilla-component";


export default function MenuItemPage({menuItemId}){

    const [ menuItemPageSwitchCase, setMenuItemPageSwitchCase ] = useState("")
    const [addOnsFromFirebase, setAddOnsFromFirebase ] = useState([])
    const [tortillaOptionsFromFirebase, setTortillaOptionsFromFirebase ] = useState([])
    const imageInputRef = useRef();
    const [ menuItemImgUrl, setMenuItemImgUrl ] = useState("")
    const [ menuItemName, setMenuItemName ] = useState("")



    const [addOnsCartArray, setAddOnsCartArray ] = useState([])


    const [ addOnsChange, setAddOnsChange ] = useState(false)

    useEffect(() =>  {

        console.log(addOnsFromFirebase)
        if( addOnsFromFirebase.length === 0 ) {
            console.log("Loading Add Ons From FB")
            loadAddOnsFromFirebase()
        }

        loadMenuItemImg()
        // console.log(addOnsCartArray)
    },[])

    async function loadAddOnsFromFirebase() {
        const resultAddOns = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/addOns`)
        let addOnsTemp = [];

        console.log("loadAddOnsFromFirebase", resultAddOns )
        resultAddOns.docs.map(doc => {
            addOnsTemp = [...addOnsTemp, doc.data()]
            console.log(doc.data())

        })
        console.log(addOnsFromFirebase, addOnsTemp)
        setAddOnsFromFirebase([...addOnsTemp])

        const resultTortillaOptions = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/addOns`)
        let tortillaOptionsTemp = [];

        console.log("loadTortillaOptionsFromFirebase", resultTortillaOptions )
        resultTortillaOptions.docs.map(doc => {
            tortillaOptionsTemp = [...tortillaOptionsTemp, doc.data()]
            console.log(doc.data())

        })
        console.log(tortillaOptionsFromFirebase, tortillaOptionsTemp)
        setTortillaOptionsFromFirebase([...tortillaOptionsTemp])
    }

    const handleFileChangeImage = async (event) =>  {

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrl = await addMainMenuItemPicture(pictureUrlConst, menuItemId, )

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

    const handleTortillaSelection = (selectedTortilla) => {
        console.log(`Selected Tortilla: ${selectedTortilla.name}`);
    };

    function renderMenuItemPage(){
        console.log(addOnsFromFirebase)

        switch (menuItemPageSwitchCase) {

            case "":
                return( <div style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "yellow",
                        padding: "1em",
                        boxSizing: "border-box",
                    }}>
                        <IonCard style={{
                            width: "95%",
                            height: "95%",
                            margin: "auto",
                            position: "relative",
                        }}>
                            <IonCardTitle style={{
                                textAlign: "center",
                                marginTop: "1em",
                                fontSize:"1.5rem",
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
                            }}>X</div>




                            <IonCardContent style={{}}>
                                <div style={{
                                    height: "fit-content",
                                    minWidth: "6em",
                                    fontSize: ".7rem",
                                    border: "solid thin",
                                    margin: ".7em .3em",
                                    cursor: "pointer",
                                    textAlign: "center",
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                                     onClick={() => imageInputRef.current.click()}
                                >
                                    <input type="file" accept="image/*" hidden
                                           ref={imageInputRef}
                                           onChange={handleFileChangeImage}
                                    />

                                    {menuItemImgUrl === "" ? (
                                        <div style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "gray",
                                        }}>+ Add Image</div>
                                    ) : (
                                        <img style={{ width: "100%", height: "15em", objectFit: "cover" }} src={menuItemImgUrl} alt="music" />
                                    )}
                                </div>

                                <IonCard style={{
                                    marginBottom: "1em",
                                }}>

                                    <div style={{display:"flex", flexDirection: "row",
                                        overflowX: "auto",
                                        // flexWrap: "wrap"
                                    }}>
                                        {addOnsFromFirebase.map((addOn, i) => (
                                            // <div style={{ width:"fit-content", }}>

                                                        <AddOnComponent
                                                            data={addOn}
                                                            i={i}
                                                            key={i}
                                                            addOnsFromFirebase={addOnsFromFirebase}
                                                            setAddOnsCartArray={setAddOnsCartArray}
                                                            addOnsCartArray={addOnsCartArray}
                                                        />
                                            // </div>

                                        ))}
                                    </div>

                                    <IonButton fill="outline" expand="block" onClick={() => setMenuItemPageSwitchCase("addOns")}>+ Add Ons & Toppings</IonButton>
                                </IonCard>

                                <IonCard>
                                    {/* Additional premium add-ons or other sections go here */}
                                </IonCard>

                                {/* More card sections if needed */}

                                <AddOnCartComponent
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
        }
    }
    return (<div>

        {renderMenuItemPage()}
    </div>)
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

function AddOnComponent({data, i, addOnsFromFirebase, addOnsCartArray, setAddOnsCartArray

                        }){
    console.log(data.ingredientName, data.unitAmount, data)

    const [comboAmount , setComboAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))
  const [ macroStats, setMacroStats ] = useState([])
    useEffect(() => {
        loadAndFilterAddOns()
        console.log(addOnsCartArray)
    },[addOnsCartArray, data])

    function calculateAndRenderAddOnsNutritionProfile(){


        function multiplyValuesInArray() {
            console.log(addOnsCartArray)
            return addOnsCartArray?.map((item) => {
                const multipliedItem = {};


                Object.keys(item).forEach((key) => {
                    const originalValue = item[key];
                    const numericValue = Number(originalValue);

                    console.log(item.unitAmount)

                    if (!isNaN(numericValue)
                        && key !== "gramsPerTbsp"
                        && key !== "price"
                        && key !== "servingSizeGrams"
                        && key !== "unitAmount"
                        && key !==  "unitPrice"
                        && key !== "unitGramsOrCups"
                        && key !== "comboAmount"
                    ) {
                        switch (item.unitGramsOrCups) {


                            case "item":
                                multipliedItem[key] = numericValue * item.comboAmount * item.unitAmount ;
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

        multipliedArray = multiplyValuesInArray();
        console.log(multipliedArray);
        console.log(multipliedArray[i]);
        sumResult = sumValuesInArray(multipliedArray);
        console.log(sumResult);

        if(multipliedArray[i] !== undefined){
            protein = multipliedArray[i].protein;
            carbohydrates =  multipliedArray[i].totalCarbohydrates;
            fat = multipliedArray[i].totalFat;
            calories = multipliedArray[i].calories;
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
                console.log("Returning!!")
                return (
                    <div>
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
            }else {
                console.log("else")
                return null;
            }

        }else {
            console.log("else2")

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

    const priceToDisplay =   data.unitPrice * comboAmount;

    return (
        <IonCard style={{
            minWidth: "10em",
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
                    border: "solid",
                    width: "7em",
                    height: "5em",
                    borderColor: "#ddd",
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

                    <IonCard style={{
                        border: "solid thin",
                        width: "fit-content",
                        display: "flex",
                        height: "100%",
                        flexFlow: "row",
                        margin: ".5em auto",
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

                    {addOnsCartArray.length > 0 && (
                        <div>
                            {calculateAndRenderAddOnsNutritionProfile()}


                        </div>
                    )}


                    <label style={{
                        textAlign: "center",
                        fontSize: "1.2rem",
                        margin: "1em auto",
                        color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                    }}>
                        ${priceToDisplay.toFixed(2)}
                    </label>

                </div>
            </div>
        </IonCard>

        /*<IonCard style={{
            minWidth: "10em",
            width:"10em",
            minHeight: "6em",
            height:"fit-content",
            margin: ".5em",
            cursor: "pointer",
        }}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                // backgroundColor: "red",
                // width:"2em"
            }}>
                <label style={{
                    fontSize:".8rem",
                    height: "3em",
                    textAlign: "center",
                    // fontWeight: optionAmount > 0 ? ("bold"):(""),
                    // color: optionAmount > 0 ? ("yellow"):(""),
                    // backgroundColor: optionAmount > 0 ? ("#498bce"):("#aabbcc"),
                    paddingBottom: ".2em",
                }}>
                    {data.ingredientName}</label>

                <div style={{
                    border: "solid",
                    width: "6em",
                    height: "4em"
                }}></div>
                <div style={{
                    // backgroundColor: "red",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent:"space-around",

                }}>
                    <div style={{textAlign:"center", margin: ".5em"}}>{data.unitAmount} {data.gramsOrCups}</div>


                    <div style={{
                        border: "solid thin",
                        width: "fit-content",
                        display: "flex",
                        height: "100%",
                        flexFlow: "row",
                        margin: ".5em auto",

                    }}>

                        <div><IonIcon
                            onClick={() => onDecreaseAmountToData(data.docId)}

                            style={{fontSize: "20px",
                                // border: "solid",
                                height:"100%",
                                color: "black",
                                cursor: "pointer",

                            }} icon={subtractIcon} /></div>
                        <div  style={{fontSize: "1rem",
                            // border: "solid",
                            height: "100%",
                            margin: "auto .3em",
                            cursor: "default",
                            color: "black"
                        }}>{comboAmount}
                            {/!*{renderComboAmount()}*!/}
                        </div>
                        <div><IonIcon

                            onClick={() => onAddAmountToData(data.docId)}
                            style={{fontSize: "20px",
                                cursor: "pointer",
                                color: "black",
                                // border: "solid",
                                height:"100%"
                            }} icon={addIcon} /></div>

                    </div>
                    {comboAmount <= 0 ? (
                        <label style={{
                            textAlign: "center",
                            fontSize:"1.2rem",
                            // backgroundColor:"blue",
                            margin: "auto",
                            color: ("rgba(0,0,0,0.5)")
                        }}>${data.unitPrice}</label>
                    ):(<label style={{
                        textAlign: "center",
                        fontSize:"1.2rem",
                        // backgroundColor:"blue",
                        margin: "auto",
                        color:  ("green")
                    }}>
                        ${data.unitPrice * (comboAmount)}
                        {/!*${data.unitPrice * (comboAmount - data.firstNumberOfUnitsFree)}*!/}
                    </label>)}

                    {calculateAndRenderAddOnsNutritionProfile()}

                </div>
            </div>
        </IonCard>*/
    )

}

function AddOnCartComponent({addOnsCartArray, setMenuItemPageSwitchCase}){

    const [macroStats, setMacroStats] = useState([])
    function multiplyValuesInArray() {
        console.log(addOnsCartArray)
        return addOnsCartArray?.map((item) => {
            const multipliedItem = {};


            Object.keys(item).forEach((key) => {
                const originalValue = item[key];
                const numericValue = Number(originalValue);

                if (!isNaN(numericValue)
                    && key !== "gramsPerTbsp"
                    && key !== "price"
                    && key !== "servingSizeGrams"
                    && key !== "unitAmount"
                    && key !==  "unitPrice"
                    && key !== "unitGramsOrCups"
                    && key !== "comboAmount"
                ) {
                    switch (item.unitGramsOrCups) {

                        case "item":
                            multipliedItem[key] = numericValue * item.comboAmount  ;
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


            multipliedArray = multiplyValuesInArray();
            console.log(multipliedArray);

            sumResult = sumValuesInArray(multipliedArray);
            console.log(sumResult);

            protein = sumResult.protein;
            carbohydrates =  sumResult.totalCarbohydrates;
            fat = sumResult.totalFat;
            calories = sumResult.calories;
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
        }else {
            console.log("else")
            return <div>else</div>;
        }



    }




    function renderTotal(){
        let total = 0;
        addOnsCartArray.map((addOn) => {
            total += addOn.comboAmount * addOn.unitPrice
        })
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
        console.log("USE EFFECT !@$")
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
                        onClick={() => setMenuItemPageSwitchCase("")}
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

            } else if (recipeIngredientsList[0] !== ' ' && result1.length === 0) {
                console.log(recipeIngredientsList, addOnToBeAdded, unitAmount, unitGramsOrCups, unitPrice)
                console.log(addOnToBeAdded, toppingOption)

                let temp = [...recipeIngredientsList, addOnToBeAdded]
                console.log(temp)
                setRecipeIngredientsList([...recipeIngredientsList, addOnToBeAdded])
                console.log(toppingOption, temp, addOnToBeAdded)

               // const res = await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/addOns`, toppingOption).then(r => console.log(r))
               //  console.log(res)

            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, unitGramsOrCups}
                console.log(result2)
                temp1[(temp1.length - 1)] = result2;
                console.log(temp1)
                setRecipeIngredientsList([...temp1])

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
                            <IonSelectOption >item</IonSelectOption>
                            <IonSelectOption >grams</IonSelectOption>
                            <IonSelectOption >cups</IonSelectOption>
                            <IonSelectOption>tsp</IonSelectOption>
                            <IonSelectOption>tbsp</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div style={{  width: "100%", margin: "auto", display: "flex"}}>
                        <div>Price</div>
                        <div>
                            $<input style={{width: "6em", margin: "auto"}} value={unitPrice} type="number" onChange={(e) => {setUnitPrice(e.target.value)}}/>
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
