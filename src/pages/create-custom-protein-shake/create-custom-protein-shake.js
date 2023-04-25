import React, {useEffect, useState} from "react"
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonList, IonPage} from "@ionic/react";
import {loadAnyCollectionData, loadIngredient} from "../../firebase";

export default function CreateCustomProteinShakePage(){


    const [ selectedProtein, setSelectedProtein ] = useState([""])
    const [ selectedFruitsAndVegetables, setSelectedFruitsAndVegetables ] = useState([""])
    const [selectedFiber, setSelectedFiber] = useState([""])
    const [selectedFats, setSelectedFats ] = useState([""])
    const [selectedSupplements, setSelectedSupplements ] = [""]

    const [ loadedProteinPowderOptions, setLoadedProteinPowderOptions ] = useState([""])
    const [ loadedLiquidBaseOptions, setLoadedLiquidBaseOptions ] = useState([""])
    const [ loadedFruitsAndVegetablesOptions, setLoadedFruitsAndVegetablesOptions ] = useState([""])
    const [ loadedAddOnsOptions, setLoadedAddOnsOptions ] = useState([""])
    const proteinCategoryOptionsArray = [
        {
            name: "Whey Protein",
            info: "Whey protein can help build muscle mass and strength and enhance post-workout recovery." +
                " It may also help improve body composition, reduce appetite, decrease inflammation, and support" +
                " heart health."
        },
        {
            name: "Casein Protein",
            info: "Whey protein can help build muscle mass and strength and enhance post-workout recovery." +
                " It may also help improve body composition, reduce appetite, decrease inflammation, and" +
                " support heart health. It is most optomized for taking before bed because of the slower, steady, and " +
                "gradual exposure of amino acids to the muscle"
        },
        {
            name: "Pea Protein",
            info: "Pea protein is a good source of BCAAs and contains all nine essential amino acids. It may also be comparable" +
                " to whey protein in terms of its ability to increase fullness hormones and improve body composition, strength," +
                " and performance when combined with exercise."
        },
        {
            name: "Hemp Protein",
            info: "Hemp protein is rich in omega-3 fatty acids and several essential amino acids. " +
                "Some research suggests that it may" +
                " also be well-digested, but more studies are needed."

        },

    ]

    useEffect(() => {
        loadProteinOptionsData()
        loadLiquidBaseOptionsData()
        loadFruitsAndVegetablesOptionsData()
        loadAddOnsOptionsData()

    },[])

    let loadedData;

    function renderCreateCustomProteinShakePage(){

        return (
            <IonCard
            style={{
                height: "100%",
                overflowY: "scroll"
            }}
            >
                <IonCardHeader>
                    <IonCardTitle>
                        Create Custom Protein Shake
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>

                    <ProteinSelectionComponent />
                    <LiquidBaseSelectionComponent />
                    <FruitsAndVegetablesSelectionComponent />
                    <AddOnsSelectionComponent />
                </IonCardContent>

            </IonCard>
        )

    }

    async function loadProteinOptionsData() {

        let tempDataArray = [];
        const proteinOptions = [
            {
                name: "Hemp Protein + Fiber",
                docId: "6KMY92C9IH3FFjDK4xdj",
            },
            {
                name: "R1 Whey Blend (Fruity Cereal)",
                docId: "S95KGvDQOriB80cNKFjs",
            },
            {
                name: "V Pro Raw Plant Protein Mix (Vanilla Cookies)",
                docId: "PNyVj8EdDKHc2aoeIhb1",
            },

        ]

        let optionsArray = [];
        loadedData = await loadAnyCollectionData("ingredients-collection")

        loadedData.docs.map(doc => {
            proteinOptions.map(option => {
                if (doc.data().docId === option.docId){
                    tempDataArray = [...tempDataArray, doc.data()]
                }
            })

        })

        console.log(tempDataArray)
        setLoadedProteinPowderOptions(tempDataArray)

        // loadProteinOptionsData().map(async option => {
        //     const opt = await loadIngredient(option.docId)
        //     console.log(opt)
        //     optionsArray = [...optionsArray, opt]
        // })
        // console.log(optionsArray)

    }
    function ProteinSelectionComponent(){

        return (
            <IonCard

            style={{
                margin: " auto",
                width: "90%",

            }}>
                <IonCardHeader>
                    <IonCardTitle>
                        Choose your protein.
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList style={{
                        display: "flex",
                        height: "fit-content",
                    }}
                    >
                        {loadedProteinPowderOptions?.map(protein => (
                                <IonCard   style={{
                                    minWidth: "18em",
                                    textAlign: "center",
                                    height: "fit-content",
                                }}>
                                    <IonCardHeader>
                                        <IonCardTitle style={{
                                            fontSize: "1rem"
                                        }}>
                                            {protein.ingredientName}

                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <div
                                        //     style={{width: "15em",
                                        //     margin: "auto",
                                        //     height: "20em",
                                        // }}
                                        >
                                                <img style={{
                                                    objectFit: "contain",
                                                    width: "15em",
                                                    margin: "auto",
                                                    height: "8em",

                                                }} src={protein.imgUrl} />

                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            )

                        )}

                    </IonList>


                </IonCardContent>
            </IonCard>
        )

    }

    async function loadLiquidBaseOptionsData() {

        let tempDataArray = [];
        const liquidBaseOptions = [
            {
                name: "Unsweetened Organic Coconut Milk (365)",
                docId: "arCsTZAhmNBDwH2VTdIs",
            },
            {
                name: "Water",
                docId: "f8fzQlpQ2nVvxSyxDQWn",
            },
            {
                name: "Alkaline Water pH 9.5 (Kirkland)",
                docId: "2Lz6TxwFFrsVPQ7oWiBj",
            },

        ]

        let optionsArray = [];
        loadedData = await loadAnyCollectionData("ingredients-collection")

        loadedData.docs.map(doc => {
            liquidBaseOptions.map(option => {
                if (doc.data().docId === option.docId){
                    tempDataArray = [...tempDataArray, doc.data()]
                }
            })

        })

        console.log(tempDataArray)
        setLoadedLiquidBaseOptions(tempDataArray)



    }
    function LiquidBaseSelectionComponent(){
        return (
            <IonCard

                style={{
                    margin: "auto",
                    width: "90%",
                }}>
                <IonCardHeader>
                    <IonCardTitle>
                        Choose your liquid base.
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList style={{
                        display: "flex",
                        height: "fit-content",
                    }}

                    >
                        {loadedLiquidBaseOptions?.map(liquid => (
                                <IonCard   style={{
                                    minWidth: "18em",
                                    textAlign: "center",
                                    height: "fit-content",
                                }}>
                                    <IonCardHeader>
                                        <IonCardTitle style={{
                                            fontSize: "1rem"
                                        }}>
                                            {liquid.ingredientName}

                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <div
                                            //     style={{width: "15em",
                                            //     margin: "auto",
                                            //     height: "20em",
                                            // }}
                                        >
                                            <img style={{
                                                objectFit: "contain",
                                                width: "15em",
                                                margin: "auto",
                                                height: "8em",

                                            }} src={liquid.imgUrl} />

                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            )

                        )}

                    </IonList>


                </IonCardContent>
            </IonCard>
        )
    }

    async function loadFruitsAndVegetablesOptionsData() {

        let tempDataArray = [];
        const fruitsAndVegetablesOptions = [
            {
                name: "Banana (Organic)",
                docId: "i3TN6HYGjYH4hYqEjiO2",
            },
            {
                name: "Sweet Potato (Boiled, Without Skin)",
                docId: "MWYfg9P2NgpS6QlzLYqT",
            },
            {
                name: "Strawberries (Frozen)",
                docId: "ARXsFQm0qyTYf28YWDdX",
            },
            {
                name: "Blueberries (Frozen, Organic, Kirkland)",
                docId: "FZIJBfYLmqZDCFHdfrc7",
            },

        ]

        let optionsArray = [];
        loadedData = await loadAnyCollectionData("ingredients-collection")

        loadedData.docs.map(doc => {
            fruitsAndVegetablesOptions.map(option => {
                if (doc.data().docId === option.docId){
                    tempDataArray = [...tempDataArray, doc.data()]
                }
            })

        })

        console.log(tempDataArray)
        setLoadedFruitsAndVegetablesOptions(tempDataArray)



    }
    function FruitsAndVegetablesSelectionComponent(){
        return (
            <IonCard

                style={{
                    margin: "auto",
                    width: "90%",
                }}>
                <IonCardHeader>
                    <IonCardTitle>
                        Choose your Fruits and/or Vegetables.
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList style={{
                        display: "flex",
                        height: "fit-content",
                    }}

                    >
                        {loadedFruitsAndVegetablesOptions?.map(option => (
                                <IonCard   style={{
                                    minWidth: "18em",
                                    textAlign: "center",
                                    height: "fit-content",
                                }}>
                                    <IonCardHeader>
                                        <IonCardTitle style={{
                                            fontSize: "1rem"
                                        }}>
                                            {option.ingredientName}

                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <div
                                            //     style={{width: "15em",
                                            //     margin: "auto",
                                            //     height: "20em",
                                            // }}
                                        >
                                            <img style={{
                                                objectFit: "contain",
                                                width: "15em",
                                                margin: "auto",
                                                height: "8em",

                                            }} src={option.imgUrl} />

                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            )

                        )}

                    </IonList>


                </IonCardContent>
            </IonCard>
        )
    }

    async function loadAddOnsOptionsData() {

        let tempDataArray = [];
        const addOnsOptions = [
            {
                name: "MCT OIL (SR)",
                docId: "bnIcHcLRAjJ4uMaNhI5P",
            },
            {
                name: "Branched Chain Amino Acids (BCAA)",
                docId: "JLE9eV0ElpjEmHyUjLJN",
            },
            {
                name: "Creatine (ALLMAX)",
                docId: "ld54CqEIEOyhzyx5Kd3E",
            },
            {
                name: "L-Glutamine (Nutricost)",
                docId: "gV1EEUvi9eODVT1c2fVr",
            },
            {
                name: "Collagen (SASCHA)",
                docId: "X6lRkEIT9FpKn9SHCKL0",
            },
            {
                name: "Almond Butter (Members Mark ) ",
                docId: "mIlLdXAoUwJN9khIEsKO",
            },

        ]

        let optionsArray = [];
        loadedData = await loadAnyCollectionData("ingredients-collection")

        loadedData.docs.map(doc => {
            addOnsOptions.map(option => {
                if (doc.data().docId === option.docId){
                    tempDataArray = [...tempDataArray, doc.data()]
                }
            })

        })

        console.log(tempDataArray)
        setLoadedAddOnsOptions(tempDataArray)



    }

    function AddOnsSelectionComponent(){
        return (
            <IonCard

                style={{
                    margin: "auto",
                    width: "90%",
                }}>
                <IonCardHeader>
                    <IonCardTitle>
                        Choose your Add Ons.
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList style={{
                        display: "flex",
                        height: "fit-content",
                    }}

                    >
                        {loadedAddOnsOptions?.map(option => (
                                <IonCard   style={{
                                    minWidth: "18em",
                                    textAlign: "center",
                                    height: "fit-content",
                                }}>
                                    <IonCardHeader>
                                        <IonCardTitle style={{
                                            fontSize: "1rem"
                                        }}>
                                            {option.ingredientName}

                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <div
                                            //     style={{width: "15em",
                                            //     margin: "auto",
                                            //     height: "20em",
                                            // }}
                                        >
                                            <img style={{
                                                objectFit: "contain",
                                                width: "15em",
                                                margin: "auto",
                                                height: "8em",

                                            }} src={option.imgUrl} />

                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            )

                        )}

                    </IonList>


                </IonCardContent>
            </IonCard>
        )
    }


    return (
        <IonPage>

            {renderCreateCustomProteinShakePage()}
        </IonPage>
    )
}