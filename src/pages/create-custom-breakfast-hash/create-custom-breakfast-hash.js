import React, {useEffect, useState} from "react"
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonList, IonPage} from "@ionic/react";
import {
    removeCircleOutline as subtractIcon,
    addCircleOutline as addIcon,
    searchCircleOutline as searchIcon, trashOutline as deleteIcon, createOutline as editIcon
} from "ionicons/icons";
import {addToppingToCustomDatabase, deleteCustomDoc, loadAnyCollectionData} from "../../firebase";

export default function CreateCustomBreakfastHash(){


    function renderCreateCustomBreakfastHashPage(){
        return (
            <IonCard
                style={{
                    height: "100%",
                    overflowY: "scroll"
                }}
            >
                <IonCardHeader>
                    <IonCardTitle>
                        Create Custom Breakfast Hash
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <RenderEggQuantitySelectionComponent />
                    <AddToppingsComponent />
                </IonCardContent>

            </IonCard>
        )
    }

    function RenderEggQuantitySelectionComponent(){

        const [eggQuantity, setEggQuantity ] = useState(1)
        return (
            <IonCard

                style={{
                    margin: " auto",
                    width: "90%",

                }}>
                <IonCardHeader>
                    <IonCardTitle style={{
                        textAlign: "center",
                    }}>
                        How many Eggs?
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <div style={{
                        display: "flex",
                        margin: "auto",
                        width: "fit-content"
                        // justifyContent: "space-around"
                    }}
                    >
                                <IonCard   style={{
                                    width: "fit-content",
                                    // margin: "auto",
                                    // textAlign: "center",
                                    height: "fit-content",
                                }}>
                                    <IonCardHeader>
                                        <IonCardTitle style={{
                                            fontSize: "1rem"
                                        }}>
                                            Eggs

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

                                            }} src={""} />
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                    <div style={{
                        border: "solid thin",
                        width: "fit-content",
                        display: "flex",
                        height: "100%",
                        flexFlow: "row",
                        margin: "auto",
                    }}>
                        {/*<div style={{*/}
                        {/*    margin: "auto",*/}
                        {/*    height: "100%"*/}


                        {/*}}>*/}
                            <div><IonIcon
                                onClick={ eggQuantity > 0 ? (() => setEggQuantity(eggQuantity - 1)):(null)}
                                style={{fontSize: "64px",
                            // border: "solid",
                                height:"100%",
                                cursor: "pointer",

                            }} icon={subtractIcon} /></div>
                            <div  style={{fontSize: "88px",
                                // border: "solid",
                                height: "100%",
                                margin: "auto .3em",
                                cursor: "default"
                            }}>{eggQuantity}</div>
                            <div><IonIcon
                                onClick={ eggQuantity < 7 ? (() => setEggQuantity(eggQuantity + 1)):(null)}
                                style={{fontSize: "64px",
                                    cursor: "pointer",
                                // border: "solid",
                                height:"100%"
                            }} icon={addIcon} /></div>

                        {/*</div>*/}
                          </div>
                    </div>
                </IonCardContent>
            </IonCard>
        )

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
                            {/*{ingredientToBeDeleted !== "" ? (*/}
                            {/*    <IonCard style={{width: "100%",*/}
                            {/*        fontSize: "1.5rem"*/}
                            {/*    }}>*/}
                            {/*        <IonCardHeader style={{*/}
                            {/*            textAlign: "center"*/}
                            {/*        }}>*/}
                            {/*            <IonCardTitle>*/}
                            {/*                Are you sure you want to delete ?*/}
                            {/*            </IonCardTitle>*/}
                            {/*        </IonCardHeader>*/}
                            {/*        <IonCardContent>*/}
                            {/*            <div style={{*/}
                            {/*                fontSize: "2rem",*/}
                            {/*                textAlign: "center",*/}
                            {/*               */}
                            {/*            }}>{ingredientToBeDeleted?.ingredientName}</div>*/}

                            {/*            <div style={{*/}
                            {/*                display: "flex",*/}
                            {/*                justifyContent: "space-evenly",*/}
                            {/*                marginTop: "2em",*/}
                            {/*            }}>*/}
                            {/*                <IonButton onClick={() => setIngredientToBeDeleted("")}>Cancel</IonButton>*/}
                            {/*                <IonButton onClick={() => onDeleteIngredient()} color="danger">Delete</IonButton>*/}
                            {/*            </div>*/}
                            {/*        </IonCardContent>*/}
                            {/*    </IonCard>*/}
                            {/*):(*/}
                                <div>
                                    {filteredData && filteredData.map((data, i) => (
                                        // <AddNewIngredientSearchDataDisplay3
                                        //     data={data}
                                        //     setFilteredData={setFilteredData}
                                        //     setInputState={setInputState}
                                        //     key={i}
                                        //     setShowAddIngredientAmount={setShowAddIngredientAmount}
                                        //     setShowEditIngredientFacts={setShowEditIngredientFacts}
                                        //
                                        //     setIngredientToBeDeleted={setIngredientToBeDeleted}
                                        //     setSearchAndAddIngredientToListStep={setSearchAndAddIngredientToListStep}
                                        //
                                        //     setEditIngredientDocId={setEditIngredientDocId}
                                        //
                                        //     setIngredientToBeAdded={setIngredientToBeAdded}
                                        //     list={recipeIngredientsList}
                                        //     setList={setRecipeIngredientsList}
                                        // />

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

    return (
        <IonPage>
            {renderCreateCustomBreakfastHashPage()}

        </IonPage>
    )
}