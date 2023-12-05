import React, {useState, useRef, useEffect} from "react"
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonList} from "@ionic/react";
import {
    addCircleOutline as addIcon, createOutline as editIcon,
    refresh,
    removeCircleOutline as subtractIcon, searchCircleOutline as searchIcon,
    trashOutline as deleteIcon
} from "ionicons/icons";
import {
    addMainMenuItemPicture,
    addToppingToCustomDatabase,
    deleteCustomDoc,
    loadAnyCollectionData,
    loadAnyDocData
} from "../../firebase";

export default function MenuComboPage(){

    const [menuComboPageStep, setMenuComboPageStep ] = useState("")

    const [addOnsList, setAddOnsList ] = useState([])
    const [premiumAddOnsList, setPremiumAddOnsList ] = useState([])
    const [saucesList, setSaucesList ] = useState([])
    const [uploadedUrl, setUploadedUrl ] = useState("")

    const [comboName, setComboName ] = useState("")



    const tempAddOnsArr = [

        {
            name: "Blueberries",
            pricePerUnit: 1.25,
            firstNumberOfUnitsFree: 1,
            premium: false,
            sauce: false,
            comboAmount: 1,
            id: 1,
        },
        {
            name: "Sliced Strawberries",
            pricePerUnit: 1,
            firstNumberOfUnitsFree: 1,
            premium: false,
            sauce: false,
            comboAmount: 1,
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
            comboAmount: 2,
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
    const comboId= "1";


    useEffect(() => {
        loadComboItemImg();
        loadAddonsAndSauces();
    },[])


    async function loadAddonsAndSauces(){
        const resultAddOns = await loadAnyCollectionData(`/main-menu-items/${comboId}/addOnsList`)

        let addOnsTemp = [];
        let premiumAddOnsTemp = [];
        let saucesTemp = [];

        resultAddOns.docs.map(doc => {
            addOnsTemp = [...addOnsTemp, doc.data()]
            console.log(doc.data().name)

        })
        setAddOnsList(addOnsTemp)

        const resultPremiumAddOns = await loadAnyCollectionData(`/main-menu-items/${comboId}/premiumAddOnsList`)

        resultPremiumAddOns.docs.map(doc => {
            premiumAddOnsTemp = [...premiumAddOnsTemp, doc.data()]
            console.log(doc.data().name)

        })
        setPremiumAddOnsList(premiumAddOnsTemp)

        const resultSauces = await loadAnyCollectionData(`/main-menu-items/${comboId}/saucesList`)
        resultSauces.docs.map(doc => {
            saucesTemp = [...saucesTemp, doc.data()]
            console.log(doc.data().name)
        })
        setSaucesList(saucesTemp)

    }

    async function loadComboItemImg() {
        const result = await loadAnyDocData(`/main-menu-items/${comboId}`)

        console.log(result.data())
        setUploadedUrl(result.data().url)
        setComboName(result.data().name)
    }

    function SearchToppingsDataComponent({data, toppingsSearchStep, setToppingsSearchStep}){



        function onSearchDataDisplayClick(){
            //add this ingredient to the customBreakfastHashToppingsOptions database
            addToppingToCustomDatabase("create-custom-breakfast-hash-toppings", data).then(r => console.log(r) )
            setToppingsSearchStep("")
        }
        return (
            <IonCard
            >
                <IonCardContent>
                    <div style={{display: "flex",
                    }}>

                        <div
                            onClick={() => onSearchDataDisplayClick(data)}
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


    function RenderSearchToppingsComponent({toppingsSearchStep, setToppingsSearchStep}) {

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
    function RenderAddToppingsSearchComponent({toppingsSearchStep, setToppingsSearchStep}){



        switch (toppingsSearchStep){

            case "Search":
                return (
                    <RenderSearchToppingsComponent
                        toppingsSearchStep={toppingsSearchStep}
                        setToppingsSearchStep={setToppingsSearchStep}
                    />
                )
                break;
        }
    }


    function AddToppingsComponent(){



        const [toppingsList, setToppingList ] =useState([""])
        const [ loadedToppingsOptions, setLoadedToppingsOption ] = useState([""])

        const [toppingsSearchStep, setToppingsSearchStep] = useState("")


        let docTempData;
        useEffect(() => {
            loadToppingOptionsData();
            console.log("useEffect AddToppingsComponent")
        },[ toppingsSearchStep])

        function onAddToppingsOptionClick(){
            setToppingsSearchStep("Search")
        }
        async function loadToppingOptionsData() {
            let temp = [];

            docTempData = await loadAnyCollectionData("create-custom-breakfast-hash-toppings")

            docTempData.docs.map(x => {
                temp = [...temp, x.data()]
            })
            console.log(temp)
            setLoadedToppingsOption(temp)
        }
        async function onDeleteToppingOptionClick(id){
            await deleteCustomDoc("create-custom-breakfast-hash-toppings",id).then(x => {
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
                    />
                )}
                <IonList style={{
                    display: "flex",
                    height: "fit-content",
                }}
                >
                    { loadedToppingsOptions && loadedToppingsOptions?.map(option => (
                            <IonCard   style={{
                                minWidth: "18em",
                                textAlign: "center",
                                height: "fit-content",
                            }}>
                                <IonIcon size="small"
                                         onClick={() => onDeleteToppingOptionClick(option.docId)}
                                         style={{margin: "0 .5em", zIndex:"10", cursor: "pointer", }} icon={deleteIcon}/>
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
            </IonCard>
        )
    }


    function RenderMenuComboPageItem(){

        useEffect(() => {
            console.log(addOnsList, premiumAddOnsList, saucesList)
        },[setAddOnsList, setPremiumAddOnsList, setSaucesList])

        function renderComboItemOptions(){

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
                        {tempAddOnsArr.map((x,i) => (
                            <ComboItemOption
                                data={x}
                                setChosenOptionArray={setAddOnsList}
                                chosenOptionArray={addOnsList}

                            />
                        ))

                        }
                    </div>


                </div>
                )


        }
        function renderComboItemPremiumOptions(){

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
                        {tempPremiumsArr.map((x,i) => (
                            <ComboItemOption
                                data={x}
                                setChosenOptionArray={setPremiumAddOnsList}
                                chosenOptionArray={premiumAddOnsList}
                            />
                        ))

                        }
                    </div>


                </div>
                )


        }
        function renderComboItemSauceOptions(){

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
                        {tempSaucesArr.map((x,i) => (
                            <ComboItemOption
                                data={x}
                                setChosenOptionArray={saucesList}
                                chosenOptionArray={setSaucesList}
                            />
                        ))

                        }
                    </div>


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
                                top: ".3em",
                                right: "21em",
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
                                    top: ".3em",
                                    right: "21em",
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
                                    top: ".3em",
                                    right: "21em",
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


    return (
        <div style={{
            border: "solid", width: "20em", height: "50em", margin: "auto",

        }}>
            {RenderMenuComboPageItem()}
        </div>
    )
}

function ComboItemOption({data, setChosenOptionArray, chosenOptionArray}){

    const [ optionAmount, setOptionAmount ] = useState(0)

    useEffect(() => {
        loadOptions()
    },[])

    function loadOptions(){
        console.log(chosenOptionArray,data.name)
        chosenOptionArray.map((option, i) => {
            if (option.name === data.name){
                let temp = chosenOptionArray;
                console.log(temp)

                temp.splice(i,1, data)
                setChosenOptionArray(temp)
                console.log(temp, chosenOptionArray)
                setOptionAmount(data.comboAmount)


            }
        })
    }
    function onOptionClick(){
        let temp = chosenOptionArray;
        console.log(temp)
        let newData = {...data}
        newData.comboAmount = 1;
        temp = [...temp, newData]
        setOptionAmount(1)
        console.log(temp)
        setChosenOptionArray(temp)
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
        onClick={() => onOptionClick()}
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
                    {data.name}</label>

                <div style={{
                    border: "solid",
                    width: "6em",
                    height: "4em"
                }}></div>
                {optionAmount > 0 && (
                    <div style={{
                        // backgroundColor: "red",
                        flexDirection: "row",
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
                                // onClick={ parseInt(data.equipmentAmount) === 1  ? (() => onDeleteEquipmentFromListClick()):(() => onDecreaseEquipmentAmount())}
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
                            }}>
                                {/*{data.equipmentAmount}*/}
                                {optionAmount}
                            </div>
                            <div><IonIcon
                                // onClick={() => onAddAmountToData()}
                                style={{fontSize: "20px",
                                    cursor: "pointer",
                                    color: "black",
                                    // border: "solid",
                                    height:"100%"
                                }} icon={addIcon} /></div>

                        </div>

                        <label style={{
                            textAlign: "center",
                            fontSize:"1.2rem",
                            // backgroundColor:"blue",
                            margin: "auto",
                            color: optionAmount > 0 ? ("black"):("")
                        }}>${data.pricePerUnit * (optionAmount - data.firstNumberOfUnitsFree)}</label>

                    </div>
                )}


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

function ComboOrderPage({
    addOnsList, setAddOnsList, premiumAddOnsList, saucesList, setPremiumAddOnsList,
    setSaucesList, setMenuComboPageStep, comboId, setUploadedUrl, comboName, uploadedUrl,
                        }){



    const imageInputRef = useRef();
    let tempArr;


    // const [refresh, setRefresh ] = useState(false)

    // useEffect(() => {
    //     console.log(addOnsList)
    //     console.log(addOnsList2)
    // },[addOnsList2])

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
        console.log(addOnsList, premiumAddOnsList, saucesList)
    },[addOnsList, premiumAddOnsList, saucesList])

    return (
        <div style={{
            display: "flex",
            width: "25em",
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

                        }}>+ add music</div>
                    ):(
                        <img style={{width: "5em", height: "17em",margin: "auto"}} src={uploadedUrl}  alt="music"/>

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
                    <h2>Add Ons & Toppings</h2>
                    <div>{addOnsList.length > 0 && addOnsList.map((addOn) => (
                        <SelectedAddOnComponent
                            data={addOn}
                            addOnsList={addOnsList}
                            setAddOnsList={setAddOnsList}
                        />
                    ))}</div>
                    <IonButton onClick={() => setMenuComboPageStep("toppings")}> + add</IonButton>
                    <h2>Premium Add Ons</h2>
                    <div>{premiumAddOnsList && premiumAddOnsList?.map((addOn) => (
                        <SelectedAddOnComponent
                            data={addOn}
                            addOnsList={premiumAddOnsList}
                            setAddOnsList={setPremiumAddOnsList}
                        />
                    ))}</div>
                    <IonButton onClick={() => setMenuComboPageStep("premium")}> + add</IonButton>
                    {/*{renderComboItemPremiumOptions()}*/}
                    <h2>Sauces</h2>
                    <div>{saucesList && saucesList.map((addOn) => (
                        <SelectedAddOnComponent
                            data={addOn}
                            addOnsList={saucesList}
                            setAddOnsList={setSaucesList}
                        />
                    ))}</div>
                    <IonButton onClick={() => setMenuComboPageStep("sauces")}> + add</IonButton>

                    {/*{renderComboItemSauceOptions()}*/}



                    <IonButton expand="block">+ Add Food $4</IonButton>
                </IonCardContent>
            </IonCard>
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
                    border: "solid",
                    height: "14em",
                    // marginTop: "1.5em",
                    width: "95%",
                    margin: "1.5em auto"
                }}>

                </div>
                <IonCardTitle style={{
                    textAlign: "center",
                    // marginTop: "1em"
                }}>
                    Menu Combo Title
                </IonCardTitle>

                <IonCardContent style={{
                    // padding: 0,
                }}>
                    <h2>Add Ons & Toppings</h2>
                    <IonButton onClick={() => setMenuComboPageStep("toppings")}> + add</IonButton>
                    <h2>Premium Add Ons</h2>
                    <IonButton onClick={() => setMenuComboPageStep("premium")}> + add</IonButton>
                    {/*{renderComboItemPremiumOptions()}*/}
                    <h2>Sauces</h2>
                    <IonButton onClick={() => setMenuComboPageStep("sauces")}> + add</IonButton>

                    {/*{renderComboItemSauceOptions()}*/}



                    <IonButton expand="block">+ Add Food $4</IonButton>
                </IonCardContent>
            </IonCard>
        </div>
    )
}

function SelectedAddOnComponent({data,  addOnsList, setAddOnsList,}){



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

    function renderSelectedAddOnComponent(){

        // console.log(addOnsList..includes(data.name))
    let nameArr =[];
     addOnsList.map(item => {
        nameArr = [...nameArr, item.name]
    })

        // if (nameArr.includes(data.name)){
        if (loadedList.length > 0){
            console.log("INCLUDES")
            return (
                <IonCard style={{
                    borderRadius: "12px",
                    padding: ".5em",
                    fontSize: ".7rem",
                    border: "solid thin",
                    width: "fit-content",
                    height: "2em"
                }}>
                    {/*<IonCardContent>*/}
                    <div style={{

                        display:"flex",
                        flexDirection: "row",
                    }}>
                        <div style={{
                            // backgroundColor: "red",
                            marginTop: "-.3em",
                        }}>
                            {data.name}

                        </div>
                        <div  style={{
                            // backgroundColor: "red",
                            marginTop: "-.2em",
                            cursor: "pointer",
                            marginLeft: ".3em"
                        }}
                              onClick={() => onDeleteAddOn()}
                        >X</div>

                    </div>

                    {/*</IonCardContent>*/}
                </IonCard>
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
