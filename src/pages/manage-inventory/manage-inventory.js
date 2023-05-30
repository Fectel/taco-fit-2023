import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon, IonItem, IonLabel, IonList,
    IonSelect,
    IonSelectOption
} from "@ionic/react";
import {
    addCircleOutline as addIcon,
    createOutline as editIcon,
    searchCircleOutline as searchIcon,
    chevronUpOutline as ascendingIcon,
    chevronDownOutline as descendingIcon,
    trashOutline as deleteIcon,

} from "ionicons/icons";
import {
    addIngredientInventory,
    deleteCustomDoc,
    loadAnyCollectionData,
    saveIngredientInventoryEdit
} from "../../firebase";

export default function ManageInventory(){

    const [manageInventoryStep, setManageInventoryStep ] = useState("display")
    const [ingredientToBeEdited, setIngredientToBeEdited ] = useState([])

    function renderInventoryManagementStep(){

        switch (manageInventoryStep) {

            case "display":
                return (
                    <InventoryGridDisplay
                        setManageInventoryStep={setManageInventoryStep}
                        setIngredientToBeEdited={setIngredientToBeEdited}
                    />
                )
                break;
            case "edit":
                return (
                    <IngredientInventoryEditComponent
                        setManageInventoryStep={setManageInventoryStep}
                        ingredientToBeEdited={ingredientToBeEdited}
                    />
                )
            break;

        }
    }

    return (
        <div>
            Manage Inventory
            {renderInventoryManagementStep()}
        </div>
    )
}

function InventoryGridDisplay({setManageInventoryStep, setIngredientToBeEdited}){

    const [allIngredientsData, setAllIngredientsData ] = useState([""])



    let loadedIngredientData;
    let loadedIngredientInventoryData;


    async function loadAllIngredientData(){
        let dataTempArray = [];



        loadedIngredientData = await loadAnyCollectionData('ingredients-collection');

        loadedIngredientData.docs.map(async doc => {

            dataTempArray = [...dataTempArray,  doc.data() ]
        })


        await Promise.all(
            dataTempArray.map(async (doc, i )=> {
                let inventory = [];

                loadedIngredientInventoryData = await loadAnyCollectionData(`ingredients-collection/${doc.docId}/inventory`)

                loadedIngredientInventoryData.docs.map(inventoryDoc => {
                    // console.log(doc.ingredientName,doc.docId,
                    //     inventoryDoc.data())

                    inventory = [...inventory, inventoryDoc.data()]
                })
                if (inventory.length  > 0 ){
                    console.log(doc.ingredientName,doc.docId,inventory)
                    dataTempArray[i] = {...dataTempArray[i], inventory}
                    console.log(dataTempArray[i])

                }

            })

        )

        console.log(dataTempArray)
        setAllIngredientsData(dataTempArray)
    }


    //dont use useeffect make function and in that fuction reload the grid
    // useEffect(() => {
    //     loadAllIngredientData()
    //     console.log("UseEffect", priceSortIcon)
    // },[priceSortIcon])

    useEffect(() => {
      loadAllIngredientData()
    },[])


    function renderInventoryGridDisplay(){

        if (allIngredientsData.length > 1){
            console.log(allIngredientsData)
            return (
                    <InventoryGridDisplayComponent
                        allIngredientsData={allIngredientsData}
                        setManageInventoryStep={setManageInventoryStep}
                        setIngredientToBeEdited={setIngredientToBeEdited}
                        setAllIngredientsData={setAllIngredientsData}
                    />
            )
        }
    }

    return (
        <div>
            {renderInventoryGridDisplay()}
        </div>
    )

}



function InventoryGridDisplayComponent({allIngredientsData,setManageInventoryStep,setAllIngredientsData, setIngredientToBeEdited}){

    const [priceSortIcon, setPriceSortIcon ] = useState("")
    let loadedIngredientData;
    let loadedIngredientInventoryData;





    async function loadAllIngredientData(){
        let dataTempArray = [];



        loadedIngredientData = await loadAnyCollectionData('ingredients-collection');

        loadedIngredientData.docs.map(async doc => {

            dataTempArray = [...dataTempArray,  doc.data() ]
        })


        await Promise.all(
            dataTempArray.map(async (doc, i )=> {
                let inventory = [];

                loadedIngredientInventoryData = await loadAnyCollectionData(`ingredients-collection/${doc.docId}/inventory`)

                loadedIngredientInventoryData.docs.map(inventoryDoc => {
                    // console.log(doc.ingredientName,doc.docId,
                    //     inventoryDoc.data())

                    inventory = [...inventory, inventoryDoc.data()]
                })
                if (inventory.length  > 0 ){
                    console.log(doc.ingredientName,doc.docId,inventory)
                    dataTempArray[i] = {...dataTempArray[i], inventory}
                    console.log(dataTempArray[i])

                }

            })

        )

        console.log(dataTempArray)
        setAllIngredientsData(dataTempArray)
    }

    function onPriceSortClick(){

        console.log(priceSortIcon)
        switch (priceSortIcon) {

            case "":
                setPriceSortIcon("ascendingIcon")
                break;
            case "ascendingIcon":
                setPriceSortIcon("descendingIcon")
                break;
            case "descendingIcon":
                setPriceSortIcon("")
                break;
            default:
                break;
        }
    }


    function onEditIconClick(data){

        console.log(data)
        setIngredientToBeEdited(data)
        setManageInventoryStep("edit")

    }

    async function onDeleteInventoryClick(ingredientDocId,inventoryDocId){
        console.log(ingredientDocId)
        await deleteCustomDoc(`ingredients-collection/${ingredientDocId}/inventory`, inventoryDocId).then(() => {
            loadAllIngredientData()
        })
    }

    function renderGridDisplay(){
        return (
            <div
            >
                <div
                    style={{
                        border: "solid",
                        fontSize: "1.5rem",
                        display: "flex"
                    }}>
                    <div style={{
                        margin: " 0 .2em",
                    }}>Sort By</div>
                    <div style={{
                        margin: " 0 .2em",
                        border: "solid thin",
                        cursor: "pointer",

                    }}>recipe</div>
                    <div style={{
                        margin: " 0 .2em",
                        cursor: "pointer",
                        border: "solid thin"

                    }}
                         onClick={() => onPriceSortClick()}
                    >price <span >
                        {priceSortIcon !== "" &&(
                            <IonIcon icon={priceSortIcon === "ascendingIcon" ? (ascendingIcon):(descendingIcon)} />
                        )}
                    </span> </div>
                    <div  style={{
                        margin: " 0 .2em",
                        cursor: "pointer",
                        border: "solid thin"
                    }}>amount</div>
                </div>
                <div
                    style={{
                        display: "flex",
                        textAlign: "center"

                    }}>
                    <div
                        style={{
                            border: "solid",
                            width: "25%",
                            fontSize: "2rem"
                        }}>
                        Name
                    </div>
                    <div
                        style={{
                            border: "solid",
                            width: "4em",
                            fontSize: "2rem"
                        }}>
                        Amount
                    </div>
                    <div
                        style={{
                            border: "solid",
                            width: "5em",
                            fontSize: "2rem"
                        }}>
                        Price
                    </div>
                    <div
                        style={{
                            border: "solid",
                            width: "5em",
                            fontSize: "2rem"
                        }}>
                        Date
                    </div>
                    <div
                        style={{
                            border: "solid",
                            width: "6em",
                            fontSize: "2rem"
                        }}>
                        Source
                    </div>
                    {/*<div*/}
                    {/*    style={{*/}
                    {/*        border: "solid",*/}
                    {/*        width: "10%",*/}
                    {/*        fontSize: "1.6rem"*/}
                    {/*    }}>*/}
                    {/*    Relative Inventory*/}
                    {/*</div>*/}
                </div>
                {allIngredientsData.map(item1 => (
                    <div
                        style={{
                            display: "flex",
                            textAlign: "center",


                        }}>
                        <div
                            style={{
                                border: "solid",
                                width: "25%",
                                fontSize: "1.2rem"
                            }}>
                            {item1.ingredientName}
                        </div>


                        <div>
                            {item1.inventory?.map(item =>(
                                <div style={{
                                    display: "flex",
                                    // flexDirection: "column",
                                    flexWrap: "wrap",
                                    fontSize: "1rem",
                                    textAlign: "center",

                                }}>
                                    <div
                                        style={{
                                            border: "solid",
                                            width: "8em",
                                        }}>
                                        {item.ingredientInventoryAmount}  {item.lbsOzItemsGrams}
                                    </div>

                                    <div
                                        style={{
                                            border: "solid",
                                            width: "10em",
                                        }}>
                                        {item.pricePerUnit}  {item.pricePerUnitLabel}
                                    </div>
                                    <div
                                        style={{
                                            border: "solid",
                                            width: "10em",
                                        }}>
                                        {item.date}
                                    </div>
                                    <div
                                        style={{
                                            border: "solid",
                                            width: "12em",
                                        }}>
                                        <div>{item.source}</div>
                                        <div>
                                            ({item.sourceCrossStreets})
                                        </div>
                                    </div>
                                    <div style={{ display: "flex"}}>
                                        <IonIcon
                                            onClick={() => onDeleteInventoryClick(item1.docId,item.docId)}
                                            style={{margin:"auto", cursor: "pointer",

                                                fontSize: "28px",}} icon={deleteIcon}/>
                                    </div>
                                </div>
                            ))  }

                        </div>


                        <div
                            style={{
                                // border: "solid",
                                width: "fit-content",
                                fontSize: "1.2rem"
                            }}>
                            <IonIcon size="large"
                                     onClick={() => onEditIconClick(item1)}
                                     style={{ zIndex:"10",
                                         cursor: "pointer"
                                     }} icon={editIcon}/>
                        </div>
                    </div>
                ))}

            </div>

        )
    }

    return <div>
        {renderGridDisplay()}
    </div>

}

function IngredientInventoryEditComponent({ingredientToBeEdited, setManageInventoryStep}){


    const [editIngredientAmount, setEditIngredientAmount ] = useState(0)
    const [lbsOzItemsGrams, setLbsOzItemsGrams ] = useState(undefined)
    const [ pricePerUnit, setPricePerUnit ] = useState(0)
    const [pricePerUnitLabel , setPricePerUnitLabel ] = useState(undefined)
    const [source, setSource] = useState("")
    const [sourceCrossStreets, setSourceCrossStreets] = useState("")
    const [ buttonSaveTrue, setButtonSaveTrue ] = useState(false)
    const [inventorySaved, setInventorySaved ] = useState(undefined)
    //
    // useEffect(() => {
    //
    // },[lbsOzItemsGrams, pricePerUnitLabel])

    function renderIngredientInventoryEditComponent(){


        function onAmountChange(e){

            // if (e > 0){
                setEditIngredientAmount(e)
            // }

            if (e > 0
                && pricePerUnit > 0
                && source !== ""
                && sourceCrossStreets !== ""
                && pricePerUnitLabel !== undefined
                && lbsOzItemsGrams !== undefined
            ){
                setButtonSaveTrue(true)
            }else {
                setButtonSaveTrue(false)
            }

        }
        function onPricePerUnitChange(e){
            // if (e > 0 ){
                setPricePerUnit(e)
            // }

            if (editIngredientAmount > 0
                && e > 0
                && source !== ""
                && sourceCrossStreets !== ""
                && pricePerUnitLabel !== undefined
                && lbsOzItemsGrams !== undefined
            ){
                setButtonSaveTrue(true)
            }else {
                setButtonSaveTrue(false)
            }

        }
        function onSourceChange(e){

            if (e !== "" || e!== " " || e!== "   "){
                setSource(e)
            }

            if (editIngredientAmount > 0
                && pricePerUnit > 0
                && e !== "" && e!== " " && e!== "   "
                && sourceCrossStreets !== ""
                && pricePerUnitLabel !== undefined
                && lbsOzItemsGrams !== undefined
            ){
                setButtonSaveTrue(true)
            }else {
                setButtonSaveTrue(false)
            }


        }
        function onSourceCrossStreetsChange(e){

            if (e !== "" || e!== " " || e!== "   "){
                setSourceCrossStreets(e)
            }

            if (editIngredientAmount > 0
                && pricePerUnit > 0 && source !== ""
                && e !== ""  && e!== " " && e!== "   "
                && pricePerUnitLabel !== undefined
                && lbsOzItemsGrams !== undefined
            ){
                setButtonSaveTrue(true)
            }else {
                setButtonSaveTrue(false)
            }


        }
        function onIonSelectAmountChange(e){

            setLbsOzItemsGrams(e)

            console.log("lbsOzItemsGrams")

            if (editIngredientAmount > 0
                && pricePerUnit > 0 && source !== ""
                && sourceCrossStreets !== ""
                && pricePerUnitLabel !== undefined
                && e !== undefined
            ){
                setButtonSaveTrue(true)
            }else {
                setButtonSaveTrue(false)
            }


        }
        function onIonSelectPriceChange(e){

            console.log("pricelabel")


            setPricePerUnitLabel(e)
            if (editIngredientAmount > 0
                && pricePerUnit > 0 && source !== ""
                && sourceCrossStreets !== ""
                && e !== undefined
                && lbsOzItemsGrams !== undefined
            ){
                setButtonSaveTrue(true)
            }else {
                setButtonSaveTrue(false)
            }


        }
        function onSaveEditIngredientInventoryClick(){

               const  inventory =
                   {
                         ingredientInventoryAmount: editIngredientAmount ,
                       lbsOzItemsGrams ,
                         pricePerUnit,
                         pricePerUnitLabel,
                         source,
                       sourceCrossStreets,
                 }

            console.log(ingredientToBeEdited.docId)
            addIngredientInventory(inventory, ingredientToBeEdited).then(() => {
                setInventorySaved(inventory)
            })

        }

        function renderInventoryCard(){

            if (inventorySaved === undefined){
                return (
                    <IonCard
                        style={{
                            width: "30em",
                            height: "fit-content",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                right: ".5em",
                                zIndex: "10",
                                cursor: "pointer"
                            }}
                            onClick={() => setManageInventoryStep("display")}
                        >X</div>

                        <IonItem
                            style={{
                                display:"flex",
                                fontSize: "2rem",


                            }}
                        >
                            <div style={{
                                textAlign: "center",
                                width: "fit-content",
                                margin: "auto"

                            }}>
                                Edit Ingredient Inventory
                            </div>
                        </IonItem>
                        <IonItem style={{
                            marginTop: "1em"

                        }}>
                            <img style={{
                                objectFit: "contain",
                                width: "15em",
                                margin: "auto",
                                height: "8em",

                            }} src={ingredientToBeEdited.imgUrl} />

                        </IonItem>
                        <IonItem
                            style={{
                                fontSize: "1.5rem",
                            }}
                        >{ingredientToBeEdited.ingredientName}</IonItem>
                        <IonList>
                            <IonItem
                                style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "space-between",
                                }}>
                                <IonLabel style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}>Amount</IonLabel>
                                <input
                                    style={{width: "6em"}}

                                    value={editIngredientAmount} type="number"
                                    min={0}
                                    onChange={(e) => {onAmountChange(e.target.value)}}/>
                                <IonSelect
                                    style={{position: "relative"}}

                                    onIonChange={(e) => onIonSelectAmountChange(e.target.value)}
                                    placeholder="?">
                                    <IonSelectOption >items</IonSelectOption>
                                    <IonSelectOption >lbs</IonSelectOption>
                                    <IonSelectOption >ounces</IonSelectOption>
                                    <IonSelectOption>grams</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem
                                style={{ width: "100%",
                                    height: "fit-content",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between", margin: "auto", display: "flex"}}>

                                {/*<div>*/}
                                <IonLabel
                                    style={{
                                        // border: "solid",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >Price per Unit</IonLabel>
                                $ <input
                                style={{width: "6em",
                                }}
                                value={pricePerUnit}
                                type="number"
                                min={0}
                                onChange={(e) => {onPricePerUnitChange(e.target.value)}}/>
                                <IonSelect
                                    style={{position: "relative", maxWidth: "fit-content"}}

                                    onIonChange={(e) => onIonSelectPriceChange(e.target.value)}
                                    placeholder="?">
                                    <IonSelectOption >per amount (above)</IonSelectOption>
                                    <IonSelectOption >per lbs</IonSelectOption>
                                    <IonSelectOption >per ounce</IonSelectOption>
                                    <IonSelectOption>per grams</IonSelectOption>
                                </IonSelect>
                                {/*</div>*/}
                            </IonItem>
                            <IonItem
                                style={{
                                    justifyContent: "space-between",
                                    width: "100%",
                                    margin: "auto", display: "flex"}}>
                                <IonLabel style={{
                                    // border: "solid",
                                    display: "flex",
                                    alignItems: "center"
                                }}>Source</IonLabel>
                                <input style={{
                                    paddingRight: "3em",

                                }} className="add-ingredient-amount-card-input" value={source}
                                       type="text"  onChange={(e) => {onSourceChange(e.target.value)}}/>
                            </IonItem>
                            <IonItem
                                style={{
                                    justifyContent: "space-between",
                                    width: "100%",
                                    margin: "auto", display: "flex"}}>
                                <IonLabel style={{
                                    // border: "solid",
                                    display: "flex",
                                    alignItems: "center"
                                }}>Source Location</IonLabel>
                                <input style={{
                                    paddingRight: "3em",

                                }} className="add-ingredient-amount-card-input" value={sourceCrossStreets}
                                       type="text"  onChange={(e) => {onSourceCrossStreetsChange(e.target.value)}}/>
                            </IonItem>
                            <div
                                style={{margin: "2em auto",


                                    width: "fit-content"}}
                            >
                                <IonButton
                                    disabled={!buttonSaveTrue}
                                    onClick={() => onSaveEditIngredientInventoryClick()} color="secondary" >Save Edit</IonButton>

                            </div>

                        </IonList>


                    </IonCard>
                )
            }else{
                return (
                    <IonCard
                        style={{
                            width: "30em",
                            height: "fit-content",
                            display:"flex",
                            flexDirection: "column"

                        }}>
                        <div
                            style={{
                                position: "absolute",
                                right: ".5em",
                                zIndex: "10",
                                cursor: "pointer"
                            }}
                            onClick={() => setManageInventoryStep("display")}
                        >X</div>
                        <IonItem
                            style={{
                                fontSize: "2rem",
                                display:"flex",
                                margin: "auto"



                            }}
                        >
                            <div style={{
                                width: "fit-content",
                                margin: "auto",
                                backgroundColor: "rgba(130,231,107,0.75)",


                            }}>
                                Inventory Added !
                            </div>
                            </IonItem>
                        <IonItem style={{
                            marginTop: "1em"

                        }}>
                            <img style={{
                                objectFit: "contain",
                                width: "15em",
                                margin: "auto",
                                height: "8em",

                            }} src={ingredientToBeEdited.imgUrl} />

                        </IonItem>
                        <IonItem
                            style={{
                                fontSize: "1.5rem",
                            }}
                        >{ingredientToBeEdited.ingredientName}</IonItem>
                        <IonList>
                            <IonItem
                                style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "space-between",
                                }}>
                                <IonLabel style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}>Amount</IonLabel>
                                <IonLabel
                                style={{
                                    backgroundColor: "rgba(130,231,107,0.75)",
                                }}
                                >{editIngredientAmount}</IonLabel>

                            </IonItem>
                            <IonItem
                                style={{ width: "100%",
                                    height: "fit-content",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between", margin: "auto", display: "flex"}}>

                                <IonLabel
                                    style={{
                                        // border: "solid",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >Price per Unit</IonLabel>
                                <IonLabel
                                    style={{
                                        backgroundColor: "rgba(130,231,107,0.75)",
                                    }}>${pricePerUnit + " " + pricePerUnitLabel }</IonLabel>


                            </IonItem>
                            <IonItem
                                style={{
                                    justifyContent: "space-between",
                                    width: "100%",
                                    margin: "auto", display: "flex"}}>
                                <IonLabel style={{
                                    // border: "solid",
                                    display: "flex",
                                    alignItems: "center"
                                }}>Source</IonLabel>
                                <IonLabel  style={{
                                    backgroundColor: "rgba(130,231,107,0.75)",
                                }}>{source}</IonLabel>
                            </IonItem>
                            <IonItem
                                style={{
                                    justifyContent: "space-between",
                                    width: "100%",
                                    margin: "auto", display: "flex"}}>
                                <IonLabel style={{
                                    // border: "solid",
                                    display: "flex",
                                    alignItems: "center"
                                }}>Source Location</IonLabel>
                                <IonLabel
                                    style={{
                                        backgroundColor: "rgba(130,231,107,0.75)",
                                    }}
                                >{sourceCrossStreets}</IonLabel>
                            </IonItem>
                            <div
                                style={{margin: "2em auto",


                                    width: "fit-content"}}
                            >
                                <IonButton
                                    color="danger"
                                    onClick={() => setManageInventoryStep("display")} >Close</IonButton>

                            </div>


                        </IonList>


                    </IonCard>
                )
            }
        }


        return (
            <div>
                {renderInventoryCard()}
            </div>

        )
    }


    return (
        <div>
            {renderIngredientInventoryEditComponent()}

        </div>
    )
}

