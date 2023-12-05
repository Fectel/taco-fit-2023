import React, {useState, useRef, useEffect} from "react"
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonList,
    IonSelect, IonSelectOption
} from "@ionic/react";
import {
    add,
    addCircleOutline as addIcon,
    cameraOutline as uploadPhotoIcon, createOutline as editIcon,
    refresh,
    removeCircleOutline as subtractIcon, searchCircleOutline as searchIcon, trashOutline as deleteIcon
} from "ionicons/icons";
import {
    addMainMenuItemPicture,
    addToppingToCustomDatabase, deleteCustomDoc,
    loadAnyCollectionData,
    loadAnyDocData
} from "../../firebase";
import {AddIngredientNutritionalFacts} from "../recipes-page/recipes-page-components";
import useLocalStorage from "../../useLocalStorage";


export default function MenuComboPage2({comboId}){

    const [menuComboPageStep, setMenuComboPageStep ] = useState("")

    const [addOnsList, setAddOnsList ] = useState([])
    const [premiumAddOnsList, setPremiumAddOnsList ] = useState([])
    const [saucesList, setSaucesList ] = useState([])

    const [uploadedUrl, setUploadedUrl ] = useState("")
    const [comboName, setComboName ] = useState("")

    const [selectedAddOnsArr, setSelectedAddOnsArr ] = useLocalStorage("selectedAddOnsArr", [])

    console.log(comboId)

    useEffect(() => {
        loadComboItemImg();
        loadAddonsAndSauces();
        console.log(selectedAddOnsArr, "SELECTED ADDD ONS!!!!!")
    },[])

    async function loadAddonsAndSauces(){
        const resultAddOns = await loadAnyCollectionData(`/recipes-collection/${comboId}/addOns`)

        console.log(resultAddOns, comboId)

        let addOnsTemp = [];
        let premiumAddOnsTemp = [];
        let saucesTemp = [];

        // const tempAddOnsArr = [
        //
        //     {
        //         name: "Blueberries",
        //         pricePerUnit: 1.25,
        //         firstNumberOfUnitsFree: 1,
        //         premium: false,
        //         sauce: false,
        //         comboAmount: 1,
        //         id: 1,
        //     },
        //     {
        //         name: "Sliced Strawberries",
        //         pricePerUnit: 1,
        //         firstNumberOfUnitsFree: 1,
        //         premium: false,
        //         sauce: false,
        //         comboAmount: 1,
        //         id: 2,
        //
        //     },
        //     {
        //         name: "Sliced Banana",
        //         pricePerUnit: 1,
        //         firstNumberOfUnitsFree: 0,
        //         premium: false,
        //         sauce: false,
        //         comboAmount: 0,
        //         id: 3,
        //
        //     },
        //     {
        //         name: "Whipped Cream",
        //         pricePerUnit: 1,
        //         firstNumberOfUnitsFree: 0,
        //         premium: false,
        //         sauce: false,
        //         comboAmount: 0,
        //         id: 4,
        //
        //     },
        //
        //     {
        //         name: "Chocolate Chips",
        //         pricePerUnit: 1,
        //         firstNumberOfUnitsFree: 0,
        //         premium: false,
        //         sauce: false,
        //         comboAmount: 0,
        //         id: 5,
        //
        //     },
        //
        //
        // ]
        // const tempSaucesArr = [
        //
        //     {
        //         name: "Organic Bee Honey",
        //         pricePerUnit: 1.25,
        //         firstNumberOfUnitsFree: 0,
        //         premium: false,
        //         sauce: true,
        //         comboAmount: 0,
        //         id: 6,
        //
        //     },
        //     {
        //         name: "Organic Date Syrup",
        //         pricePerUnit: .75,
        //         firstNumberOfUnitsFree: 0,
        //         premium: false,
        //         sauce: true,
        //         comboAmount: 0,
        //         id: 7,
        //     },
        //     {
        //         name: "Melted Butter",
        //         pricePerUnit: .50,
        //         firstNumberOfUnitsFree: 0,
        //         premium: false,
        //         sauce: true,
        //         comboAmount: 0,
        //         id: 8,
        //
        //     },
        //
        //     {
        //         name: "Erythritol Jelly",
        //         pricePerUnit: .75,
        //         firstNumberOfUnitsFree: 0,
        //         premium: true,
        //         sauce: true,
        //         comboAmount: 0,
        //         id: 9,
        //
        //     },
        //
        //
        // ]
        // const tempPremiumsArr = [
        //     {
        //         name: "Keto Waffles",
        //         pricePerUnit: 5,
        //         firstNumberOfUnitsFree: 0,
        //         premium: false,
        //         sauce: false,
        //         comboAmount: 2,
        //         id: 10,
        //     },
        //
        //     {
        //         name: "Keto Cookies",
        //         pricePerUnit: 2.5,
        //         firstNumberOfUnitsFree: 0,
        //         premium: true,
        //         sauce: false,
        //         comboAmount: 0,
        //         id: 11,
        //
        //     },
        //     {
        //         name: "Bacon",
        //         pricePerUnit: 1,
        //         firstNumberOfUnitsFree: 0,
        //         premium: true,
        //         sauce: false,
        //         comboAmount: 0,
        //         id: 12,
        //
        //     },
        //     {
        //         name: "Keto Ice Cream",
        //         pricePerUnit: 7,
        //         firstNumberOfUnitsFree: 0,
        //         premium: true,
        //         sauce: false,
        //         comboAmount: 0,
        //         id: 13,
        //
        //     },
        //     {
        //         name: "Keto Chicken Fingers",
        //         pricePerUnit: 3.25,
        //         firstNumberOfUnitsFree: 0,
        //         premium: true,
        //         sauce: false,
        //         comboAmount: 0,
        //         id: 14,
        //
        //     },
        //
        //
        //
        // ]
        //


        resultAddOns.docs.map(doc => {
            addOnsTemp = [...addOnsTemp, doc.data()]
            console.log(doc.data())

        })

        // addOnsTemp.map((addOnT , i ) => {
        //     console.log(addOnT)

            // tempAddOnsArr.map((opt , z ) => {
            //     console.log(opt)
            //     if (opt.name === addOnT.name) {
            //         addOnsTemp[i] = opt;
            //         addOnsTemp[i].comboAmount = 1;
            //         addOnsTemp[i].firstNumberOfUnitsFree = 1;
            //
            //     }
            // })
        // })

        console.log(addOnsTemp)

        setAddOnsList(addOnsTemp)

        const resultPremiumAddOns = await loadAnyCollectionData(`/main-menu-items/${comboId}/premiumAddOnsList`)

        resultPremiumAddOns.docs.map(doc => {
            premiumAddOnsTemp = [...premiumAddOnsTemp, doc.data()]
            console.log(doc.data().name)

        })


        // premiumAddOnsTemp.map((addOnT , i ) => {
        //     console.log(addOnT)
        //
        //     tempPremiumsArr.map((opt , z ) => {
        //         console.log(opt)
        //         if (opt.name === addOnT.name) {
        //             premiumAddOnsTemp[i] = opt;
        //             premiumAddOnsTemp[i].comboAmount = 1;
        //             premiumAddOnsTemp[i].firstNumberOfUnitsFree = 1;
        //
        //         }
        //     })
        // })

        console.log(premiumAddOnsTemp)
        setPremiumAddOnsList(premiumAddOnsTemp)

        const resultSauces = await loadAnyCollectionData(`/main-menu-items/${comboId}/saucesList`)
        resultSauces.docs.map(doc => {
            saucesTemp = [...saucesTemp, doc.data()]
            console.log(doc.data().name)
        })
        //
        // saucesTemp.map((addOnT , i ) => {
        //     console.log(addOnT)
        //
        //     tempSaucesArr.map((opt , z ) => {
        //         console.log(opt)
        //         if (opt.name === addOnT.name) {
        //
        //             saucesTemp[i] = opt;
        //             saucesTemp[i].comboAmount = 1;
        //             saucesTemp[i].firstNumberOfUnitsFree = 1;
        //         }
        //     })
        // })

        console.log(saucesTemp)
        setSaucesList(saucesTemp)

    }

    async function loadComboItemImg() {
        const result = await loadAnyDocData(`/recipes-collection/${comboId}`)

        console.log(result.data())
        setUploadedUrl(result.data().recipeImgUrl)
        setComboName(result.data().recipeName)
    }
    //  async function loadComboItemImg() {
    //     const result = await loadAnyDocData(`/main-menu-items/${comboId}`)
    //
    //     console.log(result.data())
    //     setUploadedUrl(result.data().url)
    //     setComboName(result.data().name)
    // }
    //



    return (
        <div style={{
            border: "solid", width: "20em", height: "50em", margin: "auto",

        }}>
            <RenderMenuComboPageItem
                setMenuComboPageStep={setMenuComboPageStep}
                menuComboPageStep={menuComboPageStep}
                addOnsList={addOnsList}
                setAddOnsList={setAddOnsList}
                premiumAddOnsList={premiumAddOnsList}
                setPremiumAddOnsList={setPremiumAddOnsList}
                saucesList={saucesList}
                setSaucesList={setSaucesList}
                comboId={comboId}
                uploadedUrl={uploadedUrl}
                comboName={comboName}
                selectedAddOnsArr={selectedAddOnsArr}
                setSelectedAddOnsArr={setSelectedAddOnsArr}

            />
        </div>
    )

}


function RenderMenuComboPageItem({
    addOnsList, setAddOnsList, premiumAddOnsList, setPremiumAddOnsList, saucesList, setSaucesList,
    setMenuComboPageStep, menuComboPageStep, comboId, comboName, uploadedUrl, selectedAddOnsArr, setSelectedAddOnsArr

                                 }){



    const tempAddOnsArr = [

        {
            name: "Blueberries",
            pricePerUnit: 1.25,
            firstNumberOfUnitsFree: 1,
            premium: false,
            sauce: false,
            comboAmount: 0,
            id: 1,
        },
        {
            name: "Sliced Strawberries",
            pricePerUnit: 1,
            firstNumberOfUnitsFree: 1,
            premium: false,
            sauce: false,
            comboAmount: 0,
            id: 2,

        },
        {
            name: "Sliced Banana",
            pricePerUnit: 1,
            firstNumberOfUnitsFree: 0,
            premium: false,
            sauce: false,
            comboAmount: 0,
            id: 3,

        },
        {
            name: "Whipped Cream",
            pricePerUnit: 1,
            firstNumberOfUnitsFree: 0,
            premium: false,
            sauce: false,
            comboAmount: 0,
            id: 4,

        },

        {
            name: "Chocolate Chips",
            pricePerUnit: 1,
            firstNumberOfUnitsFree: 0,
            premium: false,
            sauce: false,
            comboAmount: 0,
            id: 5,

        },


    ]
    const tempSaucesArr = [

        {
            name: "Organic Bee Honey",
            pricePerUnit: 3.25,
            firstNumberOfUnitsFree: 0,
            premium: false,
            sauce: true,
            comboAmount: 0,
            id: 6,

        },
        {
            name: "Organic Date Syrup",
            pricePerUnit: 3.25,
            firstNumberOfUnitsFree: 0,
            premium: false,
            sauce: true,
            comboAmount: 0,
            id: 7,
        },
        {
            name: "Melted Butter",
            pricePerUnit: 3.25,
            firstNumberOfUnitsFree: 0,
            premium: false,
            sauce: true,
            comboAmount: 0,
            id: 8,

        },

        {
            name: "Erythritol Jelly",
            pricePerUnit: 3.25,
            firstNumberOfUnitsFree: 0,
            premium: true,
            sauce: true,
            comboAmount: 0,
            id: 9,

        },


    ]
    const tempPremiumsArr = [
        {
            name: "Keto Waffles",
            pricePerUnit: 5,
            firstNumberOfUnitsFree: 0,
            premium: false,
            sauce: false,
            comboAmount: 0,
            id: 10,
        },

        {
            name: "Keto Cookies",
            pricePerUnit: 2.5,
            firstNumberOfUnitsFree: 0,
            premium: true,
            sauce: false,
            comboAmount: 0,
            id: 11,

        },
        {
            name: "Bacon",
            pricePerUnit: 1,
            firstNumberOfUnitsFree: 0,
            premium: true,
            sauce: false,
            comboAmount: 0,
            id: 12,

        },
        {
            name: "Keto Ice Cream",
            pricePerUnit: 7,
            firstNumberOfUnitsFree: 0,
            premium: true,
            sauce: false,
            comboAmount: 0,
            id: 13,

        },
        {
            name: "Keto Chicken Fingers",
            pricePerUnit: 3.25,
            firstNumberOfUnitsFree: 0,
            premium: true,
            sauce: false,
            comboAmount: 0,
            id: 14,

        },



    ]


    useEffect(() => {
        console.log(addOnsList, premiumAddOnsList, saucesList, )
    }, [addOnsList, premiumAddOnsList, saucesList ])

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
                    ingredientToBeAdded={addOnToBeAdded}
                    setRecipeIngredientComponentState={setToppingsSearchStep}
                    />
                )
        }
    }

    function AddAddOnUnitSizeAndPrice({
                                      recipeIngredientsList,
                                      setRecipeIngredientsList,
                                      ingredientToBeAdded,
                                      setRecipeIngredientComponentState,
                                  }){

        const [unitAmount, setUnitAmount ] = useState(0)
        const [ unitPrice, setUnitPrice ] = useState()

        const [ gramsOrCups, setGramsOrCups ] = useState(undefined)

        const [buttonEnabled, setButtonEnabled ] = useState(false)

        useEffect(() =>{
            if ( gramsOrCups !== undefined && unitAmount > 0 && unitPrice > 0){
                setButtonEnabled(true)
                console.log("Setting Button True")
            }else{
                setButtonEnabled(false)
                console.log("Setting Button False")

            }

            console.log(ingredientToBeAdded)
        },[gramsOrCups, buttonEnabled, unitAmount, unitPrice])



        async function onSaveIngredientToList() {
            let temp = [...recipeIngredientsList]
            console.log(temp, unitAmount + gramsOrCups, unitPrice, ingredientToBeAdded)

            const isSearched = (element) => (
                element.ingredientName?.toLowerCase().includes(ingredientToBeAdded.ingredientName?.toLowerCase())

            )

            let result1 = temp.filter(isSearched)
            console.log(result1)

            const toppingOption = {...ingredientToBeAdded, unitAmount, unitPrice, gramsOrCups}


            let temp1 = recipeIngredientsList;
            console.log(recipeIngredientsList[0])
            if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' ') {

                console.log({ingredientToBeAdded, unitAmount, gramsOrCups, unitPrice})
                setRecipeIngredientsList([{...ingredientToBeAdded, unitAmount, unitPrice, gramsOrCups}])

            } else if (recipeIngredientsList[0] !== ' ' && result1.length === 0) {
                console.log(recipeIngredientsList, ingredientToBeAdded, unitAmount, gramsOrCups, +" $" + unitPrice)

                setRecipeIngredientsList([...recipeIngredientsList, {
                    ...ingredientToBeAdded,
                    unitAmount,
                    unitPrice,
                    gramsOrCups
                }])
                console.log(toppingOption)
                await addToppingToCustomDatabase(`recipes-collection/${comboId}/addOns`, toppingOption).then(r => console.log(r))


            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, gramsOrCups}
                console.log(result2)
                temp1[(temp1.length - 1)] = result2;
                console.log(temp1)
                setRecipeIngredientsList([...temp1])

            }


            // setRecipeIngredientComponentState("display")

        }

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <IonCardTitle>How much ?</IonCardTitle>
                    <IonCard style={{margin: "1em auto", width: "fit-content"}}>
                        <IonCardContent style={{padding: ".5em"}}>
                            <IonCardTitle color="primary">
                                {ingredientToBeAdded.ingredientName}
                            </IonCardTitle>
                        </IonCardContent>
                    </IonCard>

                </IonCardHeader>
                <IonCardContent>
                    <div style={{ width: "100%", margin: "auto", display: "flex"}}>
                        <input style={{width: "6em"}} value={unitAmount} type="number" onChange={(e) => {setUnitAmount(e.target.value)}}/>
                        <IonSelect
                            onIonChange={(e) => setGramsOrCups(e.target.value)}
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


    function AddToppingsComponent({
        addOnsList, setAddOnsList,
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

    function renderComboItemOptions(){


        let updatedArr = [];
        console.log(addOnsList, selectedAddOnsArr)

        // addOnsList.map((addOn, i) => {
        //     addOnsList.map((selectedAddOn, i) => {
        //         if (addOn.ingredientName === selectedAddOn.name){
        //             updatedArr = [...updatedArr, selectedAddOn]
        //         }
        //     })
        //     if (updatedArr[i] === undefined){
        //         console.log(updatedArr)
        //
        //         updatedArr = [...updatedArr, addOn]
        //     }
        // })
        console.log(updatedArr)

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
                    {addOnsList.map((x,i) => (
                        <ComboItemOption
                            data={x}
                            i={i}
                            setAddOnsList={setAddOnsList}
                            addOnsList={addOnsList}
                            selectedAddOnsArr={selectedAddOnsArr}
                            setSelectedAddOnsArr={setSelectedAddOnsArr}
                        />
                    ))

                    }
                </div>
                <AddToppingsComponent
                    setAddOnsList={setAddOnsList}
                    addOnsList={addOnsList}
                />

                <IonButton
                    onClick={() => setMenuComboPageStep("")}
                    expand="block">Save</IonButton>


            </div>
        )


    }
    function renderComboItemPremiumOptions(){

        let updatedArr = [];
        console.log(premiumAddOnsList)

        tempPremiumsArr.map((addOn, i) => {
            premiumAddOnsList.map((selectedAddOn, i) => {
                if (addOn.name === selectedAddOn.name){
                    updatedArr = [...updatedArr, selectedAddOn]
                }
            })
            if (updatedArr[i] === undefined){
                console.log(updatedArr)

                updatedArr = [...updatedArr, addOn]
            }
        })
        console.log(updatedArr)

        return (
            <div>
                <div style={{
                    backgroundColor: "yellow",
                    display: "grid",
                    gridTemplateColumns:  "1fr 1fr 1fr",
                    // flex: "1 1 50%",
                    flexDirection:"column",
                    // flexBasis: "content",
                    // flexWrap: "wrap",
                    overflowY: "scroll",
                    // overflow: "hidden",
                    height:"fit-content",
                    padding: 0,
                }}>
                    {/*{updatedArr.map((x,i) => (*/}
                    {/*    <ComboItemOption*/}
                    {/*        data={x}*/}
                    {/*        i={i}*/}
                    {/*        // addOnArr={tempPremiumsArr}*/}
                    {/*        setChosenOptionArray={setPremiumAddOnsList}*/}
                    {/*        chosenOptionArray={updatedArr}*/}
                    {/*    />*/}
                    {/*))*/}

                    {/*}*/}

                </div>
                <IonButton
                    onClick={() => setMenuComboPageStep("")}
                    expand="block">Save</IonButton>


            </div>
        )


    }
    function renderComboItemSauceOptions(){

        let updatedArr = [];
        console.log(saucesList)

        tempSaucesArr.map((addOn, i) => {
            saucesList.map((selectedAddOn, i) => {
                if (addOn.name === selectedAddOn.name){
                    updatedArr = [...updatedArr, selectedAddOn]
                }
            })
            if (updatedArr[i] === undefined){
                console.log(updatedArr)

                updatedArr = [...updatedArr, addOn]
            }
        })
        console.log(updatedArr)
        return (
            <div>
                <div style={{
                    backgroundColor: "yellow",
                    display: "grid",
                    gridTemplateColumns:  "1fr 1fr 1fr",
                    // flex: "1 1 50%",
                    flexDirection:"column",
                    // flexBasis: "content",
                    // flexWrap: "wrap",
                    overflowY: "scroll",
                    // overflow: "hidden",
                    height:"fit-content",
                    padding: 0,
                }}>
                    {/*{updatedArr.map((x,i) => (*/}
                    {/*    <ComboItemOption*/}
                    {/*        data={x}*/}
                    {/*        // addOnArr={tempSaucesArr}*/}
                    {/*        i={i}*/}
                    {/*        setChosenOptionArray={setSaucesList}*/}
                    {/*        chosenOptionArray={updatedArr}*/}
                    {/*    />*/}
                    {/*))*/}

                    {/*}*/}
                </div>
                <IonButton
                    onClick={() => setMenuComboPageStep("")}
                    expand="block">Save</IonButton>



            </div>
        )


    }


    function renderMenuComboPage(){

        switch (menuComboPageStep) {

            case "":
                return (
                    <ComboOrderPage
                        setAddOnsList={setAddOnsList}
                        setPremiumAddOnsList={setPremiumAddOnsList}
                        setSaucesList={setSaucesList}
                        saucesList={saucesList}
                        premiumAddOnsList={premiumAddOnsList}
                        addOnsList={addOnsList}
                        setMenuComboPageStep={setMenuComboPageStep}
                        comboId={comboId}
                        uploadedUrl={uploadedUrl}
                        comboName={comboName}

                    />
                )
                break;

            case "toppings":
                return (
                    <div>
                        <div
                            onClick={() => setMenuComboPageStep("")}
                            style={{
                                position: "absolute",
                                right: "1em",

                                cursor:"pointer",
                            }}>X</div>
                        <h2 style={{textAlign:"center"}}>Add Ons & Toppings</h2>
                        {renderComboItemOptions()}
                    </div>
                )
                break;

            case "premium":
                return (
                    <div>
                        <div
                            onClick={() => setMenuComboPageStep("")}
                            style={{
                                position: "absolute",
                                right: "1em",
                                cursor:"pointer",
                            }}>X</div>
                        <h2 style={{textAlign:"center"}}>Premium Add Ons</h2>
                        {renderComboItemPremiumOptions()}
                    </div>
                )
                break;

            case "sauces":
                return (
                    <div>
                        <div
                            onClick={() => setMenuComboPageStep("")}
                            style={{
                                position: "absolute",
                                right: "1em",
                                cursor:"pointer",
                            }}>X</div>
                        <h2 style={{textAlign:"center"}}>Sauces</h2>
                        {renderComboItemSauceOptions()}
                    </div>
                )
                break;





        }
    }

    return (
        <div>
            {renderMenuComboPage()}
        </div>
    )

}


function ComboOrderPage({
                            addOnsList, setAddOnsList, premiumAddOnsList, saucesList, setPremiumAddOnsList,
                            setSaucesList, setMenuComboPageStep, comboId, setUploadedUrl, comboName, uploadedUrl,
                        }){



    const imageInputRef = useRef();
    let tempArr;
    const [ addOnsChange, setAddOnsChange ] = useState(false)


    const [comboTotal, setComboTotal ]  = useState(0)
    // const [refresh, setRefresh ] = useState(false)
    //
    // useEffect(() => {
    //     console.log(addOnsList)
    // },[addOnsList, premiumAddOnsList, saucesList])

    //
    // useEffect(() => {
    //     console.log(addOnsList, refresh)
    // },[refresh])
    const handleFileChangeImage = async (event) =>  {
        // console.log(instrument, userId, songName, i)

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrl = await addMainMenuItemPicture(pictureUrlConst, comboId, )

            console.log(imgUrl)
            setUploadedUrl(imgUrl)

        }

    };



    useEffect(() => {
        console.log(addOnsList, premiumAddOnsList, saucesList, addOnsChange)

        calculateTotal()
    }, [addOnsList, premiumAddOnsList, saucesList, addOnsChange])

    function calculateTotal(){

        setAddOnsChange(false)
        let total = 0;
        if (addOnsList.length > 0){
            addOnsList.map((addOn, i ) => {
                console.log(addOn)
                let cost = (addOn.comboAmount - addOn.firstNumberOfUnitsFree) * addOn.pricePerUnit;
                console.log(cost)
                total = total + cost
            })

        }
        if (premiumAddOnsList.length > 0){
            premiumAddOnsList.map((addOn, i ) => {
                console.log(addOn)
                let cost = (addOn.comboAmount - addOn.firstNumberOfUnitsFree) * addOn.pricePerUnit;
                console.log(cost)
                total = total + cost
            })
        }
        if (saucesList.length > 0){
            saucesList.map((addOn, i ) => {
                console.log(addOn)
                let cost = (addOn.comboAmount - addOn.firstNumberOfUnitsFree) * addOn.pricePerUnit;
                console.log(cost)
                total = total + cost
            })
        }
        console.log("$ ",total)
        setComboTotal(total)

    }
    function renderCartAndBuyNowButtons(){

        console.log(addOnsList, premiumAddOnsList, saucesList)
        return (
            <IonCard><IonCardContent style={{display: "flex", flexDirection: "column"}}>
                <div style={{color: "red", fontWeight: "bold", fontSize: "1.2rem", textAlign:"center", }}>${comboTotal}</div>

               <IonCard color="light" style={{
                   // backgroundColor: "#dad1a4",
                   fontSize:".7rem",
                   padding: ".5em"
               }}>
                   <div>
                       {addOnsList.map((data, i) => (
                           <div>

                               <div style={{

                                   display:"flex",
                                   flexDirection: "row",
                                   justifyContent: "space-between"
                               }}>
                                   <div style={{
                                       // backgroundColor: "red",
                                       marginRight: ".4em"
                                   }}>
                                       ({data.comboAmount}){data.name}

                                   </div>
                                   <div style={{
                                       textAlign: "center",
                                       // backgroundColor:"blue",
                                       color: "green",
                                   }}> ${data.pricePerUnit * (data.comboAmount - data.firstNumberOfUnitsFree)}</div>

                               </div>
                           </div>

                       ))}</div>
                   <div>
                       {saucesList.map((data, i) => (
                           <div>

                               <div style={{

                                   display:"flex",
                                   flexDirection: "row",
                                   justifyContent: "space-between"
                               }}>
                                   <div style={{
                                       // backgroundColor: "red",
                                       marginRight: ".4em"
                                   }}>
                                       ({data.comboAmount}){data.name}

                                   </div>
                                   <div style={{
                                       textAlign: "center",
                                       // backgroundColor:"blue",
                                       color: "green",
                                   }}> ${data.pricePerUnit * (data.comboAmount - data.firstNumberOfUnitsFree)}</div>

                               </div>
                           </div>

                       ))}</div>
               </IonCard>
                <IonButton color="warning" > Add To Order</IonButton>
                <IonButton fill="outline"  >View Order</IonButton>
            </IonCardContent>

            </IonCard>

        )
    }

    return (
        <div style={{
            display: "flex",
            width: "100%",
            backgroundColor: "yellow",
        }}>
            <IonCard style={{
                // border: "solid thick red",
                width: "95%",
                height: "95%",
                margin: "auto"
            }}>
                <div style={{
                    position: "absolute",
                    right: "1em",
                    // marginBottom: "1em"
                }}>X</div>

                <div style={{
                    height:"fit-content",
                    minWidth: "6em",
                    fontSize:".7rem",
                    border: "solid thin",
                    margin: ".7em .3em",
                    cursor: "pointer",
                    textAlign:"center",
                    // margin: "auto"
                }}

                    // onClick={() => onAddMusicClick(ins.name)}
                     onClick={() => imageInputRef.current.click()}

                >
                    <input type="file" accept="image/*" hidden
                           ref={imageInputRef}
                           onChange={handleFileChangeImage}
                    />


                    {uploadedUrl === "" ? (
                        <div style={{
                            // border:"solid thin",
                            margin:"auto,",
                            // padding: "2em"
                            width: "100%"

                        }}>+ add image</div>
                    ):(
                        <img style={{width: "80%",margin: "auto"}} src={uploadedUrl}  alt="music"/>

                    )}

                </div>
                <IonCardTitle style={{
                    textAlign: "center",
                    // marginTop: "1em"
                }}>
                    {comboName}
                </IonCardTitle>

                <IonCardContent style={{
                    // padding: 0,
                }}>


                    <IonCard style={{

                        // border:"solid",
                        // alignContent: "center",
                        // justifyContent: "center"


                    }}>
                        {/*<h2>Add Ons & Toppings</h2>*/}


                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        // width: "90%",
                        // backgroundColor:"blue",
                        margin:"auto",
                        justifyContent: "space-around"
                        // padding: "0"
                    }}>{addOnsList.length > 0 && addOnsList.map((addOn, i) => (
                        <SelectedAddOnComponent
                            data={addOn}
                            i={i}
                            addOnsList={addOnsList}
                            setAddOnsList={setAddOnsList}
                            setAddOnsChange={setAddOnsChange}
                        />
                    ))}</div>
                        {/*<div style={{margin:"auto", width:"fit-content"}}>*/}
                            <IonButton fill="outline"  expand="block" onClick={() => setMenuComboPageStep("toppings")}> + Add Ons & Toppings</IonButton>

                        {/*</div>*/}
                    </IonCard>
                    <IonCard style={{
                        // backgroundColor: "rgba(255,241,90,0.2)"
                    }}>



                    {/*<div style={{*/}
                    {/*    display: "flex",*/}
                    {/*    flexDirection: "row",*/}
                    {/*    flexWrap: "wrap",*/}
                    {/*    // width: "90%",*/}
                    {/*    // backgroundColor:"blue",*/}
                    {/*    margin:"auto",*/}
                    {/*    justifyContent: "space-around"*/}
                    {/*}}>{premiumAddOnsList && premiumAddOnsList?.map((addOn, i) => (*/}
                    {/*    <SelectedAddOnComponent*/}
                    {/*        data={addOn}*/}
                    {/*        i={i}*/}
                    {/*        addOnsList={premiumAddOnsList}*/}
                    {/*        setAddOnsList={setPremiumAddOnsList}*/}
                    {/*        setAddOnsChange={setAddOnsChange}*/}
                    {/*    />*/}
                    {/*))}</div>*/}
                    {/*    <IonButton fill="outline" expand="block" onClick={() => setMenuComboPageStep("premium")}> + Premium Add Ons</IonButton>*/}

                    </IonCard>

                    {/*{renderComboItemPremiumOptions()}*/}
                    <IonCard style={{
                        // backgroundColor: "rgba(255,241,90,0.2)"
                    }}>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        // width: "90%",
                        // backgroundColor:"blue",
                        margin:"auto",
                        justifyContent: "space-around"
                    }}>{saucesList && saucesList.map((addOn, i) => (
                        <SelectedAddOnComponent
                            data={addOn}
                            i={i}
                            addOnsList={saucesList}
                            setAddOnsList={setSaucesList}
                            setAddOnsChange={setAddOnsChange}
                        />
                    ))}</div>
                        <IonButton fill="outline" expand="block" onClick={() => setMenuComboPageStep("sauces")}> + Sauces</IonButton>


                    </IonCard>

                    {/*{renderComboItemSauceOptions()}*/}

                    {renderCartAndBuyNowButtons()}


                </IonCardContent>
            </IonCard>
        </div>
    )
}


function SelectedAddOnComponent({data,  addOnsList, setAddOnsList, i, setAddOnsChange}){


    const [ optionAmount, setOptionAmount ] = useState(data.comboAmount)
    console.log(data.comboAmount)



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
        temp[i].comboAmount = optionAmount -1;
        setOptionAmount((optionAmount - 1 ))
        setAddOnsList(temp)
        setAddOnsChange(true)


    }

    function onAddOptionAmount(){
        let temp = addOnsList
        temp[i].comboAmount = optionAmount  + 1;
        setOptionAmount((optionAmount + 1 ))
        setAddOnsList(temp)
        setAddOnsChange(true)
    }

    function renderSelectedAddOnComponent(){

        // console.log(addOnsList..includes(data.name))

        if (data.comboAmount > 0 && addOnsList[i].name === data.name){
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
                        height: "2.2em"
                    }}>
                        {/*<IonCardContent>*/}
                        <div style={{

                            display:"flex",
                            flexDirection: "row",
                        }}>
                            <div style={{
                                // backgroundColor: "red",
                                marginTop: "-.3em",
                                marginRight: ".4em"
                            }}>
                                {data.name}

                            </div>
                            <div style={{
                                textAlign: "center",
                                fontSize:"1rem",
                                // backgroundColor:"blue",
                                fontWeight: "bold",
                                margin: "-.3em auto",
                                color: "green",
                            }}> ${data.pricePerUnit * (optionAmount - data.firstNumberOfUnitsFree)}</div>


                            <div  style={{
                                // backgroundColor: "red",
                                marginTop: "-.2em",
                                cursor: "pointer",
                                marginLeft: ".3em"
                            }}
                                  onClick={() => onDeleteSelectedAddOn()}
                            >X</div>

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

function ComboItemOption({data, setAddOnsList, addOnsList, i, setSelectedAddOnsArr, selectedAddOnsArr}){

    const [ optionAmount, setOptionAmount ] = useState(0)

    const addOnPrice = optionAmount * data.unitPrice
    useEffect(() => {
        console.log(data, selectedAddOnsArr)
        loadOptions()
    },[selectedAddOnsArr])

    function loadOptions(){
        console.log(addOnsList,data.ingredientName, data, selectedAddOnsArr)
        selectedAddOnsArr.map((selectedAddOn, i ) => {
            if (selectedAddOn.docId === data.docId){
                data.comboAmount = selectedAddOn.comboAmount;
                console.log(data)
            }
        })
        // chosenOptionArray.map((option, i) => {
        //     if (option.name === data.name){
        //         let temp = chosenOptionArray;
        //         console.log(temp)
        //
        //         temp.splice(i,1, data)
        //         setChosenOptionArray(temp)
        //         console.log(temp, chosenOptionArray)
        //         setOptionAmount(data.comboAmount)
        //
        //
        //     }
        // })
    }
    function onOptionClick(){
        let temp = addOnsList;
        console.log(temp)
        // let newData = {...data}
        // newData.comboAmount = data.comboAmount + 1;
        // temp = [...temp, newData]
        // setOptionAmount(newData.comboAmount)
        // console.log(temp)
        // setAddOnsList(temp)
    }

    function onDecreaseDataAmount(){
        let temp = addOnsList;
        let newData = {...data}
        // newData.comboAmount = data.comboAmount - 1;
        // temp[i] =  newData;
        // setOptionAmount(newData.comboAmount)
        // console.log(temp)
        // setAddOnsList(temp)
    }

    function onAddAmountToData(){

        let newData = {...data}


        console.log( newData)


        addOnsList.map((addOn, i ) => {
            if (addOn.docId === newData.docId){
                console.log(addOn.ingredientName, newData.ingredientName)

                if (selectedAddOnsArr.length === 0 ){
                    console.log("Selected add on arr is empty")
                    let firstSelection = newData;
                    firstSelection.comboAmount = 1;
                    console.log(firstSelection)
                    setSelectedAddOnsArr([firstSelection])
                    loadOptions()

                }else {
                    selectedAddOnsArr.map((selectedAddOn, i ) => {
                        if (selectedAddOn.docId === newData.docId){

                            let tempSelectedAddOnsArr = [...selectedAddOnsArr]
                            let tempObj = selectedAddOn[i];
                            let newComboAmount = selectedAddOn[i].comboAmount + 1

                            console.log(tempObj)
                            //
                            // console.log(selectedAddOn, selectedAddOnsArr)

                            // if (selectedAddOn.comboAmount === undefined){
                            //     newData.comboAmount = 1;
                            // }else {
                            //     newData.comboAmount = data.comboAmount + 1;
                            // }

                            // temp[i] = newData;
                            // console.log(temp)
                            // setSelectedAddOnsArr(temp)
                        }else {
                            console.log(selectedAddOn, selectedAddOnsArr)

                        }
                    })
                }

            }
        })
    }

    function renderComboAmount(){

        console.log(data.comboAmount)
        if (data.comboAmount === undefined){
            return 0;
        }else {
            return data.comboAmount;
        }


    }

    return (
        <IonCard style={{
            minWidth: "6em",
            width:"6em",
            minHeight: "6em",
            height:"fit-content",
            margin: ".5em",
            cursor: "pointer",
        }}
                 // onClick={() => onOptionClick()}
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
                    fontWeight: optionAmount > 0 ? ("bold"):(""),
                    color: optionAmount > 0 ? ("yellow"):(""),
                    backgroundColor: optionAmount > 0 ? ("#498bce"):("#aabbcc"),
                    paddingBottom: ".2em",
                }}>
                    {data.ingredientName}</label>
                <label>{data.unitAmount} {data.gramsOrCups}</label>

                <div style={{
                    border: "solid",
                    width: "6em",
                    height: "4em"
                }}></div>
                {/*{optionAmount > 0 && (*/}
                    <div style={{
                        // backgroundColor: "red",
                        flexDirection: "column",
                        display: "flex",
                        justifyContent:"space-around",

                    }}>

                        <div style={{
                            border: "solid thin",
                            width: "fit-content",
                            display: "flex",
                            height: "100%",
                            flexFlow: "row",
                            margin: ".5em auto",

                        }}>

                            <div><IonIcon
                                onClick={optionAmount > 0 ? (() => onDecreaseDataAmount()):("")}
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
                            }}>{renderComboAmount()}
                            </div>
                            <div><IonIcon

                                onClick={() => onAddAmountToData()}
                                style={{fontSize: "20px",
                                    cursor: "pointer",
                                    color: "black",
                                    // border: "solid",
                                    height:"100%"
                                }} icon={addIcon} /></div>

                        </div>

                        {optionAmount <= 0 ? (
                            <label style={{
                                textAlign: "center",
                                fontSize:"1.2rem",
                                // backgroundColor:"blue",
                                margin: "auto",
                                color: optionAmount > 0 ? ("black"):("")
                            }}>${addOnPrice}</label>
                        ):(<label style={{
                            textAlign: "center",
                            fontSize:"1.2rem",
                            // backgroundColor:"blue",
                            margin: "auto",
                            color: optionAmount > 0 ? ("black"):("")
                        }}>${data.pricePerUnit * (optionAmount - data.firstNumberOfUnitsFree)}</label>)}



                    </div>
                {/*)}*/}


            </div>
        </IonCard>
    )
    // ) return (
    //     <IonCard style={{
    //         // minWidth: "10em",
    //         // width:"8em",
    //         minHeight:"4em",
    //         margin: ".0em"
    //     }}>
    //         <div style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             // backgroundColor: "red",
    //             // width:"2em"
    //         }}>
    //             <label style={{
    //                 fontSize:".9rem",
    //                 textAlign: "center",
    //                 fontWeight: optionAmount > 0 ? ("bold"):(""),
    //                 color: optionAmount > 0 ? ("yellow"):(""),
    //                 backgroundColor: optionAmount > 0 ? ("#498bce"):("#aabbcc"),
    //                 paddingBottom: ".2em",
    //             }}>
    //                 {data.name}</label>
    //             <div style={{
    //                 // backgroundColor: "red",
    //                 flexDirection: "row",
    //                 display: "flex",
    //                 justifyContent:"space-around",
    //
    //             }}>
    //
    //             <div style={{
    //                 border: "solid thin",
    //                 width: "fit-content",
    //                 display: "flex",
    //                 height: "100%",
    //                 flexFlow: "row",
    //                 margin: ".5em auto",
    //             }}>
    //
    //                 <div><IonIcon
    //                     // onClick={ parseInt(data.equipmentAmount) === 1  ? (() => onDeleteEquipmentFromListClick()):(() => onDecreaseEquipmentAmount())}
    //                     style={{fontSize: "20px",
    //                         // border: "solid",
    //                         height:"100%",
    //                         color: "black",
    //                         cursor: "pointer",
    //
    //                     }} icon={subtractIcon} /></div>
    //                 <div  style={{fontSize: "1rem",
    //                     // border: "solid",
    //                     height: "100%",
    //                     margin: "auto .3em",
    //                     cursor: "default",
    //                     color: "black"
    //                 }}>
    //                     {/*{data.equipmentAmount}*/}
    //                     {optionAmount}
    //                 </div>
    //                 <div><IonIcon
    //                     // onClick={() => onAddAmountToData()}
    //                     style={{fontSize: "20px",
    //                         cursor: "pointer",
    //                         color: "black",
    //                         // border: "solid",
    //                         height:"100%"
    //                     }} icon={addIcon} /></div>
    //
    //             </div>
    //
    //             <label style={{
    //                 textAlign: "center",
    //                 fontSize:"1.2rem",
    //                 // backgroundColor:"blue",
    //                 margin: "auto",
    //                 color: optionAmount > 0 ? ("black"):("")
    //             }}>${data.pricePerUnit * (optionAmount - data.firstNumberOfUnitsFree)}</label>
    //
    //         </div>
    //
    //         </div>
    //     </IonCard>
    // )
}