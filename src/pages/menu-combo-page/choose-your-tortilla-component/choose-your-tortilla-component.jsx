import React, { useState } from 'react';
import "./choose-your-tortilla-component.css";
import {IonCard, IonIcon} from "@ionic/react";
import {addCircleOutline as addIcon, removeCircleOutline as subtractIcon} from "ionicons/icons";
import NutrientProgressBar from "../nutrient-progress-bar/nutrient-progress-bar";

const ChooseYourTortillaComponent = ({ onSelectTortilla, addOnsFromFirebase }) => {

    const [selectedTortilla, setSelectedTortilla] = useState(null);


    const handleAddOptionClick = () => {
        // Handle the "Add" option click, you can implement your logic here
    };

    return (
        <div className="choose-your-tortilla-container">
            <div className="tortilla-scroll-container">
                {addOnsFromFirebase?.map((data, i) => (
                   <AddOnComponent
                       key={i}
                       i={i}
                       data={data} />
                ))}
            </div>
            <button className="add-option-button" onClick={handleAddOptionClick}>
                Add Tortilla Option
            </button>
        </div>
    );
};

export default ChooseYourTortillaComponent;

function AddOnComponent({data, selectedAddOn, setAddOnsCartArray, addOnsCartArray,i }){

    const [comboAmount , setComboAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))

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
    function calculateAndRenderAddOnsNutritionProfile(){


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

                            <NutrientProgressBar
                                nutritionData={stats}

                            />



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


    function renderAddOnComponent(){
 let renderPrice = (data.unitPrice * comboAmount).toFixed(2);
        return(
            <div
                key={data.id}
                className={`tortilla-item ${selectedAddOn?.id === data.id ? 'selected' : ''}`}
                // onClick={() => handleTortillaClick(data)}
            >
                <img src={data.imgUrl} alt={data.name} />
                <span>{data.ingredientName}</span>
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
                        // backgroundColor: "rgba(0,0,0,0.1)",

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
                            <span style={{color:"green", fontWeight:"bold"}}>x </span>
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
                        margin: "1em auto",
                        color: comboAmount <= 0 ? "rgba(0,0,0,0.5)" : "green",
                    }}>
                        ${renderPrice}
                    </label>

                    {/*{addOnsCartArray.length > 0 && (*/}
                    {/*    <>*/}
                    {/*        {calculateAndRenderAddOnsNutritionProfile()}*/}


                    {/*    </>*/}
                    {/*)}*/}


                </div>
            </div>
        )
    }

    return renderAddOnComponent();

}
