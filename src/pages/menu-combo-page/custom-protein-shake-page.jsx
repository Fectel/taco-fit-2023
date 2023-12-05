import React, {useEffect, useRef, useState} from "react"
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon, IonList,
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


export default function CustomProteinShakePage(){

    let menuItemId ="7XHCOyL0CGWdMXfamnZn";
    const [ menuItemPageSwitchCase, setMenuItemPageSwitchCase ] = useState("")
    const [addOnsFromFirebase, setAddOnsFromFirebase ] = useState([])
    const [baseOptionsFromFirebase, setBaseOptionsFromFirebase ] = useState([])
    const imageInputRef = useRef();
    const [ menuItemImgUrl, setMenuItemImgUrl ] = useState("")
    const [ menuItemName, setMenuItemName ] = useState("")

    const [addOnsCartArray, setAddOnsCartArray ] = useState([])


    const [ addOnsChange, setAddOnsChange ] = useState(false)

    useEffect(() => {
        loadMenuItemImg()
        loadAddOnsFromFirebase()
        loadBaseOptionsFromFirebase()
        // console.log(addOnsCartArray)
    },[])

    async function loadAddOnsFromFirebase() {
        const resultAddOns = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/addOns`)
        let addOnsTemp = [];

        resultAddOns.docs.map(doc => {
            addOnsTemp = [...addOnsTemp, doc.data()]
            console.log(doc.data())

        })

        setAddOnsFromFirebase(addOnsTemp)
    }
    async function loadBaseOptionsFromFirebase() {
        const resultAddOns = await loadAnyCollectionData(`/recipes-collection/${menuItemId}/baseOptions`)
        let baseOptTemp = [];

        resultAddOns.docs.map(doc => {
            baseOptTemp = [...baseOptTemp, doc.data()]
            console.log(doc.data())

        })

        setBaseOptionsFromFirebase(baseOptTemp)
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

    function renderMenuItemPage(){

        switch (menuItemPageSwitchCase) {

            case "":
                return ( <div style={{
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


                                {menuItemImgUrl === "" ? (
                                    <div style={{
                                        // border:"solid thin",
                                        margin:"auto,",
                                        // padding: "2em"
                                        width: "100%"

                                    }}>+ add image</div>
                                ):(
                                    <img style={{width: "80%",margin: "auto"}} src={menuItemImgUrl}  alt="music"/>

                                )}

                            </div>
                            <IonCardTitle style={{
                                textAlign: "center",
                                // marginTop: "1em"
                            }}>
                                {menuItemName}
                            </IonCardTitle>

                            <IonCardContent style={{
                                // padding: 0,
                            }}>

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
                                            {/*{loadedProteinPowderOptions?.map(protein => (*/}
                                            {/*        <IonCard   style={{*/}
                                            {/*            minWidth: "18em",*/}
                                            {/*            textAlign: "center",*/}
                                            {/*            height: "fit-content",*/}
                                            {/*        }}>*/}
                                            {/*            <IonCardHeader>*/}
                                            {/*                <IonCardTitle style={{*/}
                                            {/*                    fontSize: "1rem"*/}
                                            {/*                }}>*/}
                                            {/*                    {protein.ingredientName}*/}

                                            {/*                </IonCardTitle>*/}
                                            {/*            </IonCardHeader>*/}
                                            {/*            <IonCardContent>*/}
                                            {/*                <div*/}
                                            {/*                    //     style={{width: "15em",*/}
                                            {/*                    //     margin: "auto",*/}
                                            {/*                    //     height: "20em",*/}
                                            {/*                    // }}*/}
                                            {/*                >*/}
                                            {/*                    <img style={{*/}
                                            {/*                        objectFit: "contain",*/}
                                            {/*                        width: "15em",*/}
                                            {/*                        margin: "auto",*/}
                                            {/*                        height: "8em",*/}

                                            {/*                    }} src={protein.imgUrl} />*/}

                                            {/*                </div>*/}
                                            {/*            </IonCardContent>*/}
                                            {/*        </IonCard>*/}
                                            {/*    )*/}

                                            {/*)}*/}

                                        </IonList>


                                    </IonCardContent>
                                </IonCard>

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
                                        // margin:"auto",
                                        justifyContent: "space-around"
                                        // padding: "0"
                                    }}>{addOnsCartArray !== [] && addOnsCartArray.map((addOn, i) => (
                                        <SelectedAddOnComponent
                                            data={addOn}
                                            i={i}
                                            key={i}
                                            addOnsList={addOnsCartArray}
                                            setAddOnsList={setAddOnsCartArray}
                                            setAddOnsChange={setAddOnsChange}
                                        />
                                    ))}</div>
                                    {/*<div style={{margin:"auto", width:"fit-content"}}>*/}
                                    <IonButton fill="outline"  expand="block" onClick={() => setMenuItemPageSwitchCase("addOns")}> + Add Ons & Toppings</IonButton>

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
                                {/*<IonCard style={{*/}
                                {/*    // backgroundColor: "rgba(255,241,90,0.2)"*/}
                                {/*}}>*/}

                                {/*    <div style={{*/}
                                {/*        display: "flex",*/}
                                {/*        flexDirection: "row",*/}
                                {/*        flexWrap: "wrap",*/}
                                {/*        // width: "90%",*/}
                                {/*        // backgroundColor:"blue",*/}
                                {/*        margin:"auto",*/}
                                {/*        justifyContent: "space-around"*/}
                                {/*    }}>{saucesList && saucesList.map((addOn, i) => (*/}
                                {/*        <SelectedAddOnComponent*/}
                                {/*            data={addOn}*/}
                                {/*            i={i}*/}
                                {/*            addOnsList={saucesList}*/}
                                {/*            setAddOnsList={setSaucesList}*/}
                                {/*            setAddOnsChange={setAddOnsChange}*/}
                                {/*        />*/}
                                {/*    ))}</div>*/}
                                {/*    <IonButton fill="outline" expand="block" onClick={() => setMenuComboPageStep("sauces")}> + Sauces</IonButton>*/}


                                {/*</IonCard>*/}

                                {/*{renderComboItemSauceOptions()}*/}

                                {/*{renderCartAndBuyNowButtons()}*/}


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
            total += addOn.comboAmount * addOn.unitPrice
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
    console.log(data.ingredientName, data.comboAmount)

    const [comboAmount , setComboAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))
    useEffect(() => {
        loadAndFilterAddOns()
        console.log(addOnsCartArray)
    },[addOnsCartArray, data])

    function calculateAndRenderAddOnsNutritionProfile(){

        console.log(data)
        let calories, protein, fat,  carbohydrates = 0;
        // let protein = 0;


        switch (data.gramsOrCups) {

            case "item":
                calories = (data.calories * data.unitAmount * comboAmount)
                protein = (data.protein * data.unitAmount * comboAmount)
                carbohydrates = (data.totalCarbohydrates * data.unitAmount * comboAmount)
                fat =  (data.totalFat * data.unitAmount * comboAmount)
                return (
                    <div>
                        <div>Protein {protein} g</div>
                        <div>Carbohydrates {carbohydrates} g</div>
                        <div>Fat {fat} g</div>
                        <div>Calories {calories}</div>
                    </div>
                )
                break;
            case "grams":
                calories = (data.calories * data.unitAmount * comboAmount) / data.gramsPerTbsp
                protein = (data.protein * data.unitAmount * comboAmount) / data.gramsPerTbsp
                carbohydrates = (data.totalCarbohydrates * data.unitAmount * comboAmount)  / data.gramsPerTbsp
                fat =  (data.totalFat * data.unitAmount * comboAmount) / data.gramsPerTbsp
                return (
                    <div>
                        <div>Protein {protein} g</div>
                        <div>Carbohydrates {carbohydrates} g</div>
                        <div>Fat {fat} g</div>
                        <div>Calories {calories}</div>
                    </div>
                )
                break;
            case "tsp":
                calories = (data.calories * data.unitAmount * comboAmount) / 3
                protein = (data.protein * data.unitAmount * comboAmount) / 3
                carbohydrates = (data.totalCarbohydrates * data.unitAmount * comboAmount) / 3
                fat =  (data.totalFat * data.unitAmount * comboAmount) / 3
                return (
                    <div>
                        <div>Protein {protein} g</div>
                        <div>Carbohydrates {carbohydrates} g</div>
                        <div>Fat {fat} g</div>
                        <div>Calories {calories}</div>
                    </div>
                )
                break;
            case "tbsp":

                // data.gramsPerTbsp * data.unitAmount

                calories = data.calories * data.unitAmount * comboAmount
                protein = data.protein * data.unitAmount * comboAmount
                carbohydrates = data.totalCarbohydrates * data.unitAmount * comboAmount
                fat =  data.totalFat * data.unitAmount * comboAmount
                return (
                    <div>
                        <div>Protein {protein} g</div>
                        <div>Carbohydrates {carbohydrates} g</div>
                        <div>Fat {fat} g</div>
                        <div>Calories {calories}</div>
                    </div>
                )
                break;
            case "cups":
                calories = (data.calories * data.unitAmount * comboAmount) * 16
                protein = (data.protein * data.unitAmount * comboAmount) * 16
                carbohydrates = (data.totalCarbohydrates * data.unitAmount * comboAmount) * 16
                fat =  (data.totalFat * data.unitAmount * comboAmount) * 16
                return (
                    <div>
                        <div>Protein {protein} g</div>
                        <div>Carbohydrates {carbohydrates} g</div>
                        <div>Fat {fat} g</div>
                        <div>Calories {calories}</div>
                    </div>
                )
                break;

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

                if (addOnsCartArray[cartIndex].comboAmount > 1 ){

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

    return (
        <IonCard style={{
            minWidth: "6em",
            width:"6em",
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
                            {/*{renderComboAmount()}*/}
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
                        {/*${data.unitPrice * (comboAmount - data.firstNumberOfUnitsFree)}*/}
                    </label>)}

                    {calculateAndRenderAddOnsNutritionProfile()}

                </div>
            </div>
        </IonCard>
    )

}

function AddOnCartComponent({addOnsCartArray, setMenuItemPageSwitchCase}){


    function renderTotal(){
        let total = 0;
        addOnsCartArray.map((addOn) => {
            total += addOn.comboAmount * addOn.unitPrice
        })
        return total
    }


    return (
        <IonCard>
            <IonCardContent style={{textAlign:"center"}}>
                <div style={{ fontSize:"1.8rem"}} >Total</div>
                <div>+ Add Ons</div>
                <div style={{fontWeight:"bold", fontSize:"1.8rem", color: "green"}}>
                    ${renderTotal()}
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
    function AddAddOnUnitSizeAndPrice({ recipeIngredientsList, setRecipeIngredientsList, ingredientToBeAdded, setRecipeIngredientComponentState,
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
                await addToppingToCustomDatabase(`recipes-collection/${menuItemId}/addOns`, toppingOption).then(r => console.log(r))


            } else {
                let result2 = {...result1[0], unitAmount, unitPrice, gramsOrCups}
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


    const [ optionAmount, setOptionAmount ] = useState(data.comboAmount === undefined ? (0):(data.comboAmount))
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
                            <div style={{textAlign:"center", margin: ".2em"}}>{data.unitAmount} {data.gramsOrCups}</div>

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
