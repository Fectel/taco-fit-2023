import React, {useEffect, useRef, useState} from "react"
import {
    IonButton,
    IonCard,
    IonCardContent, IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage, IonSelect, IonSelectOption
} from "@ionic/react";
import useLocalStorage from "../../useLocalStorage";
import {
    addNewIngredient, deleteEquipment,
    deleteIngredient,
    loadAnyCollectionData,
    loadIngredient, saveRecipeStepPicture,
    updateIngredient
} from "../../firebase";
import {
    addCircleOutline as addIcon,
    addOutline as addIngredientIcon,
    closeCircleOutline as closeIcon,
    createOutline as editIcon,
    searchCircleOutline as searchIcon,
    trashOutline as deleteIcon,
    cameraOutline as uploadPhotoIcon,
    arrowBackOutline as backArrowIcon,
} from "ionicons/icons";
import "./recipes-page.styles.scss"

export default function RecipesPage(){


    const [chosenRecipe, setChosenRecipe ] = useState("")
    const [ showRecipeCreation, setShowRecipeCreation ] = useState(false)


    function renderRecipePage(){

        if ( showRecipeCreation === true){
            return (
                <CreateNewRecipe />

            )
        }else if ( showRecipeCreation === false){
            return (
                <RecipeSearch
                    setChosenRecipe={setChosenRecipe}
                    setShowRecipeCreation={setShowRecipeCreation}
                />)
        }


    }

    return (
        <IonPage>

            {renderRecipePage()}
        </IonPage>
    )
}

function RecipeSearch({
                          setShowRecipeCreation,
                            setChosenRecipe,
                      }){

    const [filteredData, setFilteredData ] = useState([""])
    const [ inputState, setInputState ] = useState("")

    let loadedData;

    const [ deleting, setDeleting ] = useState(false)

    async function loadAndFilterData() {
        let dataTempArray = [];


        loadedData = await loadAnyCollectionData('recipes-collection');

        loadedData.docs.map(doc => {
            dataTempArray = [...dataTempArray, doc.data()]
        })
        console.log(dataTempArray)
        // setLoadedWarmUpExercisesDataFirebase([...dataTempArray])

        // return filteredData;

        const isSearched = (element) => (
            element.recipeName?.toLowerCase().includes(inputState?.toLowerCase())

        )

        const result = dataTempArray.filter(isSearched)

        console.log(result, " Is Searched Result")
        setFilteredData(result)
        return "FUCK YOU!"

    }


    useEffect(() => {

        console.log(inputState)

        if ( inputState !== " "){
            console.log("IF")
            console.log(loadAndFilterData())
            // console.log(loadAndFilterOfflineData())

        }else if (deleting === true && inputState !== " "){
            setFilteredData([""])
            console.log("ELSE IF")

            setInputState("")
        }


    },[inputState, deleting, ])


    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Recipe Search</IonCardTitle>
            </IonCardHeader>

            <IonCardContent >
                <IonCard  style={{
                    // backgroundColor: "red",
                    padding: ".1em",
                    display: "flex",
                    justifyContent: "space-around",
                    // width: "100%",
                }}>
                    {/*<IonCardContent >*/}

                    <input
                        value={inputState}
                        style={{
                            border: "none",
                            width: "100%"
                        }}
                        // onClick={() => searchClicked()}
                        className="ingredients-searchbar-input"
                        type="text"
                        onChange={(e) => setInputState(e.target.value)}
                    />

                    <IonIcon size="large" icon={searchIcon}/>

                    <IonButton onClick={() => setShowRecipeCreation(true)} size="small" style={{
                        // width: "2em",
                        // padding: "0",
                        // height: "2em",

                    }}>
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
                            // padding: "0",

                            // backgroundColor: "red"
                        }}
                    >

                        {filteredData && filteredData.map(( data, i ) => (

                            <RecipeSearchDataDisplay
                                data={data}
                                setDeleting={setDeleting}
                                setFilteredData={setFilteredData}
                                setInputState={setInputState}
                                key={i}
                                setChosenRecipe={setChosenRecipe}
                            />
                        ))
                        }



                    </div>
                )}


            </IonCardContent>
        </IonCard>
    )

}

function RecipeSearchDataDisplay({
    setShowEditIngredientFacts,
                                     setChosenRecipe,data, setInputState, setFilteredData,setShowAddEquipmentToList, setShowAddEquipmentAmount,
                                     setDeleting,index, recipeEquipmentList,setRecipeEquipmentList, setEquipmentToBeAdded,
                                 }){




    function onSearchDataDisplayClick(data){
        setInputState(data.recipeName)
        setFilteredData([""])
        console.log(data)

        setChosenRecipe(data)


    }
    async function onDeleteIconClick() {


        console.log("delete")
        // setDeleting(true)
        //
        // await deleteEquipment(data.docId).then(() => {
        //     console.log("Done Deleteing")
        //     setDeleting(false)
        // })
    }

    function onEditIngredientClick(){
         }

    return (
        <IonCard  style={{ cursor: "pointer"}}>
            <IonCardContent>
                <div  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // backgroundColor: "blue"
                }}>

                    <div onClick={() => onSearchDataDisplayClick(data)} style={{
                        width: "100%",
                        // backgroundColor: "red"
                    }}>
                        {data.recipeName}

                    </div>
                    <div style={{width: "5em"}}>
                        <img src={data.imgUrl} />
                    </div>
                    <div
                        style={{display: "flex"}}

                    >
                        <div onClick={() => onDeleteIconClick()}>
                            <IonIcon size="small"
                                     style={{
                                         margin: "0 .5em",
                                         zIndex:"10",
                                         // backgroundColor:"red"
                                     }} icon={deleteIcon}/>

                        </div>
                        <div onClick={() => onEditIngredientClick()}>
                            <IonIcon  size="small"  style={{margin: "0 .5em", zIndex:"10"}}  icon={editIcon}/>
                        </div>
                    </div>

                </div>
            </IonCardContent>

        </IonCard>

    )
}

function CreateNewRecipe({}){

    const [ showAddNewRecipe, setShowAddNewRecipe] = useState(false)
    const [recipeIngredientsList, setRecipeIngredientsList] = useLocalStorage('recipeIngredientsList', [' '])
    const [recipeEquipmentList, setRecipeEquipmentList] = useLocalStorage('recipeEquipmentList', [' '])
    const [stepsListTextArray, setStepsListTextArray ] = useLocalStorage('stepsListTextArray',[""])
    const [resultImgUrl, setResultImgUrl ] = useState("")
    const [showAddIngredientToList, setShowAddIngredientToList ] = useState(false)
    const [showAddEquipmentToList, setShowAddEquipmentToList ] = useState(false)
    const [showAddNewIngredientComponent, setShowAddNewIngredientComponent ] = useState(false)
    const [showAddNewEquipmentComponent, setShowAddNewEquipmentComponent ] = useState(false)
    const [showEditIngredientFacts, setShowEditIngredientFacts ] = useState(false)
    const [, setEditIngredientDocId ] = useState(undefined)
    const [showRecipePreview, setShowRecipePreview ] = useState(false)
    const [showEditIngredientAmount, setShowEditIngredientAmount ] = useState(false)
    const [ingredientToBeEdited, setIngredientToBeEdited ] = useState([])
    const [showEditEquipmentAmount, setShowEditEquipmentAmount ] = useState(false)
    const [equipmentToBeEdited, setEquipmentToBeEdited ] = useState([])
    const [addingToFirebase, setAddingToFirebase] = useState(false)
    const [recipeName, setRecipeName ] = useLocalStorage('recipeName',"")
    const [chosenRecipe, setChosenRecipe ] = useState(undefined)


    const [ recipeCreationStep, setRecipeCreationStep ] = useState("Recipe Creation")

    function renderCreateNewRecipePage(){

        if (recipeCreationStep === "Recipe Creation"){
            return (
                <div style={{height: "50em", overflowY: "auto"}}>

                    <IonItem>
                        <IonLabel style={{color: recipeName === "" ? ("red"):("")}} position="stacked">Recipe Name</IonLabel>
                        <IonInput   value={recipeName} onIonChange={(e) => setRecipeName(e.target.value)} />
                    </IonItem>

                    <div style={{
                        display: "flex"
                    }}>
                        <RecipeCreationIngredientsBox3
                            setShowEditIngredientAmount={setShowEditIngredientAmount}
                            setIngredientToBeEdited={setIngredientToBeEdited}
                            setRecipeIngredientsList={setRecipeIngredientsList}
                            showAddIngredientToList={showAddIngredientToList}
                            setShowAddIngredientToList={setShowAddIngredientToList}
                            recipeIngredientsList={recipeIngredientsList}
                            setShowEditIngredientFacts={setShowEditIngredientFacts}
                        />
                        <RecipeCreationEquipmentBox3

                            setEquipmentToBeEdited={setEquipmentToBeEdited}
                            setShowEditEquipmentAmount={setShowEditEquipmentAmount}
                            setIngredientToBeEdited={setIngredientToBeEdited}
                            recipeEquipmentList={recipeEquipmentList}
                            showAddEquipmentToList={showAddEquipmentToList}
                            setRecipeEquipmentList={setRecipeEquipmentList}
                            setShowAddEquipmentToList={setShowAddEquipmentToList}

                        />
                    </div>
                    <RecipeStepsList
                    stepsListTextArray={stepsListTextArray}
                    setStepsListTextArray={setStepsListTextArray}
                    />

                    <RecipeNutritionTotals
                        recipeIngredientsList={recipeIngredientsList}
                    />
                    <IonButton onClick={() => setShowRecipePreview(true)} color="secondary" size="block">Save Recipe</IonButton>

                </div>
            )
        }

    }

    return (
        <IonCard>
            <IonCardContent>
                        {renderCreateNewRecipePage()}
            </IonCardContent>
        </IonCard>
    )
}

function RecipeCreationIngredientsBox3({
                                            setShowEditIngredientFacts,
                                           recipeIngredientsList, setRecipeIngredientsList,
                                           showAddIngredientToList, setShowAddIngredientToList,
                                           setIngredientToBeEdited,setShowEditIngredientAmount,
                                       }){

    const [deletingIngredient, setDeletingIngredient ] = useState(false)

    useEffect(() => {

        console.log("Deleting Ingredient : ",deletingIngredient);
        // if (deletingIngredient === true){
        //     setDeletingIngredient(false)
        // }
    }, [deletingIngredient])


    function renderRecipeCreationIngredientsBox(){

        if (showAddIngredientToList === true ){


                return (
                    <SearchAndAddIngredientToList3
                        setShowAddIngredientToList={setShowAddIngredientToList}
                        recipeIngredientsList={recipeIngredientsList}
                        setRecipeIngredientsList={setRecipeIngredientsList}
                        setShowEditIngredientFacts={setShowEditIngredientFacts}
                    />
                )



        }else {
            return  (
                <>

                    <IonButton onClick={() => setShowAddIngredientToList(true)}>
                         + add Ingredient
                    </IonButton>
                    <div>Ingredients List</div>
                </>

            )

        }
    }

    function renderRecipeIngredientsList(){
        return (
            <div style={{width:"100%",  fontSize: ".6rem", height: "fit-content"}}>
                {recipeIngredientsList && recipeIngredientsList.map((data , i) => (
                    <AddedIngredientListComponent data={data} key={i} index={i}

                                                  setShowEditIngredientAmount={setShowEditIngredientAmount}
                                                  setRecipeIngredientsList={setRecipeIngredientsList}
                                                  recipeIngredientsList={recipeIngredientsList}
                                                  setDeletingIngredient={setDeletingIngredient}
                                                  setIngredientToBeEdited={setIngredientToBeEdited}
                    />
                ))}
            </div>

        )
    }

    return (
        <>
            {!deletingIngredient && (
                <div style={{width: "100%"}}>
                    {renderRecipeCreationIngredientsBox()}
                    {renderRecipeIngredientsList()}
                </div>

            )}
        </>

    )
}

function SearchAndAddIngredientToList3({
   setShowAddNewIngredientComponent,setShowEditIngredientFacts,showEditIngredientFacts,
   recipeIngredientsList,setRecipeIngredientsList,showAddIngredientToList, setAddingToFirebase, addingToFirebase,
   setShowAddIngredientToList,
                                       }){


    const [filteredData, setFilteredData ] = useState([""])
    const [ inputState, setInputState ] = useState("")
    const [ showAddIngredientAmount, setShowAddIngredientAmount ] = useState(false)
    const [ingredientToBeAdded, setIngredientToBeAdded ] = useState(undefined)
    let loadedData;

    const [ editIngredientDocId, setEditIngredientDocId ] = useState("")

    const [ deleting, setDeleting ] = useState(false)
    const [ searchAndAddIngredientToListStep, setSearchAndAddIngredientToListStep ] = useState("Ingredient Search")


    function loadAndFilterOfflineData(){

        const offlineDataArray = [
            {
                ingredientName: "Apples",
                docId: 1,
            },
            {
                ingredientName: "Bannanas",
                docId: 2,
            },
            {
                ingredientName: "Cheese",
                docId: 3,
            },

        ]

        const isSearched = (element) => (
            element.ingredientName?.toLowerCase().includes(inputState?.toLowerCase())

        )

        const result = offlineDataArray.filter(isSearched)

        console.log(result, " Is Searched Result")
        setFilteredData(result)
    }

    async function loadAndFilterData() {
        let dataTempArray = [];


        loadedData = await loadAnyCollectionData('ingredients-collection');

        loadedData.docs.map(doc => {
            dataTempArray = [...dataTempArray, doc.data()]
        })
        console.log(dataTempArray)
        // setLoadedWarmUpExercisesDataFirebase([...dataTempArray])

        // return filteredData;

        const isSearched = (element) => (
            element.ingredientName?.toLowerCase().includes(inputState?.toLowerCase())

        )

        const result = dataTempArray.filter(isSearched)

        console.log(result, " Is Searched Result")
        setFilteredData(result)
        return "FUCK YOU!"

    }

    useEffect(() => {

        console.log(inputState)

        if ( inputState !== " "){
            console.log("IF")
            console.log(loadAndFilterData())
            // console.log(loadAndFilterOfflineData())

        }else if (deleting === true && inputState !== " "){
            setFilteredData([""])
            console.log("ELSE IF")

            setInputState("")
        }


    },[inputState, deleting,])

    function renderSearchAndAddIngredientToList(){

        console.log(searchAndAddIngredientToListStep, editIngredientDocId)
        switch (searchAndAddIngredientToListStep) {


            case "Ingredient Search":


                    return (
                        <IonCard>
                            <div
                                style={{
                                    position: "absolute",
                                    right: ".5em",
                                    zIndex: "10",
                                    cursor: "pointer"
                                }}
                                onClick={() => setShowAddIngredientToList(false)}
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
                                    // backgroundColor: "red",
                                    padding: ".1em",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    // width: "100%",
                                }}>
                                    {/*<IonCardContent >*/}

                                    <input
                                        value={inputState}
                                        style={{
                                            border: "none",
                                            width: "100%"
                                        }}
                                        // onClick={() => searchClicked()}
                                        className="ingredients-searchbar-input"
                                        type="text"
                                        onChange={(e) => setInputState(e.target.value)}
                                    />

                                    <IonIcon size="large" icon={searchIcon}/>

                                    <IonButton onClick={() => setSearchAndAddIngredientToListStep("Add New Ingredient")} size="small" style={{
                                        // width: "2em",
                                        // padding: "0",
                                        // height: "2em",

                                    }}>
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
                                            // padding: "0",

                                            // backgroundColor: "red"
                                        }}
                                    >
                                        {deleting === true ? (
                                            <IonCard style={{width: "100%",
                                                fontSize: "1.5rem"
                                            }}>
                                                <IonCardHeader>
                                                    Are you sure you want to delete ?
                                                    <span style={{
                                                        fontSize: "2rem"
                                                    }}>INGREDIENT</span>
                                                </IonCardHeader>
                                            </IonCard>
                                        ):(
                                            <div>
                                                {filteredData && filteredData.map((data, i) => (
                                                    <AddNewIngredientSearchDataDisplay3
                                                        data={data}
                                                        setDeleting={setDeleting}
                                                        setFilteredData={setFilteredData}
                                                        setInputState={setInputState}
                                                        key={i}
                                                        setShowAddIngredientAmount={setShowAddIngredientAmount}
                                                        setShowEditIngredientFacts={setShowEditIngredientFacts}

                                                        setSearchAndAddIngredientToListStep={setSearchAndAddIngredientToListStep}

                                                        setEditIngredientDocId={setEditIngredientDocId}

                                                        setIngredientToBeAdded={setIngredientToBeAdded}
                                                        list={recipeIngredientsList}
                                                        setList={setRecipeIngredientsList}
                                                    />

                                                ))}
                                            </div>
                                        )}





                                    </div>
                                )}


                            </IonCardContent>

                        </IonCard>
                    )


            break;

            case "Add Ingredient Amount":

                return (
                    <AddIngredientAmount3
                            showAddIngredientAmount={showAddIngredientAmount}
                            ingredientToBeAdded={ingredientToBeAdded}
                            setShowAddIngredientAmount={setShowAddIngredientAmount}
                            recipeIngredientsList={recipeIngredientsList}
                            setRecipeIngredientsList={setRecipeIngredientsList}
                            setShowAddIngredientToList={setShowAddIngredientToList}
                        />
                )
            break;

            case "Edit Ingredient Nutrition Facts":

                return (
                    <EditIngredientNutritionalFacts
                                    setShowEditIngredientFacts={setShowEditIngredientFacts}
                                    setAddingToFirebase={setAddingToFirebase}
                                    editIngredientDocId={editIngredientDocId}
                                    setEditIngredientDocId={setEditIngredientDocId}
                                    setSearchAndAddIngredientToListStep={setSearchAndAddIngredientToListStep}

                                />
                )
            break;

            case "Add New Ingredient":
                return (
                    <AddIngredientNutritionalFacts
                        setSearchAndAddIngredientToListStep={setSearchAndAddIngredientToListStep}
                        // setAddingToFirebase={setAddingToFirebase}
                    />
                )
        }

    }


    return (
        <>{renderSearchAndAddIngredientToList()}</>
    )
}

function AddedIngredientListComponent({data, setRecipeIngredientsList, setDeletingIngredient, recipeIngredientsList,
                                          setIngredientToBeEdited, setShowEditIngredientAmount,
                                          index}){


    async function onDeleteIconClick() {

        console.log(index)

        const tempArray = recipeIngredientsList

        tempArray.splice(index, 1)
        console.log(tempArray)
        let newTempArray= [];
        tempArray.map(val => {
            if( val !== undefined){
                console.log("Not an undefined val")
                newTempArray = [...newTempArray, val]
            }

        })
        setRecipeIngredientsList(newTempArray)
        console.log("old", tempArray, "new ", newTempArray)
        setDeletingIngredient(true)
    }

    function onEditIconClick(){


        console.log(recipeIngredientsList[index],recipeIngredientsList[index].ingredientName )

        setIngredientToBeEdited(recipeIngredientsList[index])
        setShowEditIngredientAmount(true)
    }



    return (
        <div  style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{margin:"0 .5em"}}>
                - {data.ingredientName} ( {data.ingredientAmount} {data.gramsOrCups} )
            </div>

            <div
                style={{
                    // backgroundColor: "red",
                    display: "flex",
                    // justifyContent: "space-around",
                    width:"fit-content"
                }}
            >
                <IonIcon size="small" onClick={() => onEditIconClick()} style={{ zIndex:"10"}} icon={editIcon}/>
                <IonIcon size="small" onClick={() => onDeleteIconClick()} style={{ zIndex:"10"}} icon={deleteIcon}/>

            </div>
        </div>

    )

}
function RecipeCreationEquipmentBox3({
                                         setShowEditEquipmentAmount,
                                         setEquipmentToBeEdited,
                                         recipeEquipmentList, setRecipeEquipmentList,
                                         showAddEquipmentToList, setShowAddEquipmentToList,
                                     }){

    const [deletingEquipment, setDeletingEquipment ] = useState(false)

    useEffect(() => {

        console.log(recipeEquipmentList);
        if (deletingEquipment === true){
            setDeletingEquipment(false)
        }
    }, [deletingEquipment ])


    function renderRecipeCreationEquipmentBox(){
        if ( showAddEquipmentToList === true ){
            return (
                <SearchAndAddEquipmentToList3
                    setShowAddEquipmentToList={setShowAddEquipmentToList}
                    recipeEquipmentList={recipeEquipmentList}
                    setRecipeEquipmentList={setRecipeEquipmentList}
                />
            )

        } else {
            return (
                <>
                    <IonButton onClick={() => setShowAddEquipmentToList(true)}>
                        + Equipment
                    </IonButton>
                    <div>Equipment List</div>

                </>

            )

        }
    }

    return (
        <div style={{ width: "100%"}}>
            {renderRecipeCreationEquipmentBox()}

            <div style={{ width:"100%", fontSize: ".6rem", height: "fit-content"}}>
                {recipeEquipmentList && recipeEquipmentList.map((data , i) => (
                    <AddedEquipmentListComponent3
                        data={data}
                        key={i}
                        index={i}
                        setShowEditEquipmentAmount={setShowEditEquipmentAmount}
                        setEquipmentToBeEdited={setEquipmentToBeEdited}
                        setRecipeEquipmentList={setRecipeEquipmentList}
                        recipeEquipmentList={recipeEquipmentList}
                        setDeletingEquipment={setDeletingEquipment}/>
                ))}
            </div>


        </div>
    )
}

function AddNewIngredientSearchDataDisplay3({
data, setInputState, setFilteredData, setEditIngredientDocId, setShowEditIngredientFacts,
setDeleting,index, list,setList, setIngredientToBeAdded,
showAddIngredientAmount, setShowAddIngredientAmount,
                                                setSearchAndAddIngredientToListStep,

                                            }){



    const [ingredientSearchNutritionFacts, setIngredientSearchNutritionFacts ] = useState();


    function onSearchDataDisplayClick(data){
        setInputState(data.ingredientName)
        setFilteredData([""])
        setShowAddIngredientAmount(true)
        setIngredientToBeAdded(data)
        setSearchAndAddIngredientToListStep("Add Ingredient Amount")

        console.log(data, list)
        let temp = list;
        // temp.splice(index, 1, data)
        console.log(temp?.length, )
        if (temp.length === 1 && !temp[0].ingredientName ){
            console.log("if")
            temp.splice(0, 1, data)

        }else {
            console.log("else")

            temp.push(data)

        }
        setList([...temp])
        // setWarmUpExercisesList([...temp, ""])
    }
    async function onDeleteIconClick() {

        console.log("delete")
        setDeleting(true)

        // await deleteIngredient(data.docId).then(() => {
        //     console.log("Done Deleteing")
        //     setDeleting(false)
        // })
    }

    function onEditIngredientClick(){
        // setEditIngredientDocId(data.docId)
        // setShowEditIngredientsComponent(true)
        console.log("Showing edit true ", data.ingredientName,data.docId)
        setEditIngredientDocId(data.docId)
        setSearchAndAddIngredientToListStep("Edit Ingredient Nutrition Facts")
        console.log(data.ingredientName, data.docId)
        setShowEditIngredientFacts(true)


    }



    function loadIngredientFacts(){
//very good function for getting rid of 0's but ened up not even needing it lol
        let temp = {};

        console.log(data , temp)

        Object.entries(data).forEach(([k, v]) => {

            if (v !== 0 && k !== "docId"  && k !== "gramsOrCups" && k !== "ingredientName" && v !== undefined  ){

                temp[k] = v;

            }
        })
        console.log(ingredientSearchNutritionFacts)

        setIngredientSearchNutritionFacts(temp)

        console.log(temp)
    }
    
    useEffect(() => {
        loadIngredientFacts()
    },[])

    return (
        <IonCard
                 // style={{
            // backgroundColor: "red",
            // cursor: "pointer"}}>
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
                        {ingredientSearchNutritionFacts && (
                            <IngredientsSearchItemNutritionFacts
                                ingredientSearchNutritionFacts={data}
                            />
                        
                        )}

                    </div>
                    <div
                        style={{backgroundColor: "white",
                            display: "flex",
                            // width: "fit-content",
                        padding: "0",

                    }}
                    >
                        <IonIcon size="small" onClick={() => onDeleteIconClick()} style={{margin: "0 .5em", zIndex:"10"}} icon={deleteIcon}/>
                        <IonIcon  size="small" onClick={() => onEditIngredientClick()} style={{margin: "0 .5em",  zIndex:"10"}}  icon={editIcon}/>

                    </div>

                </div>
            </IonCardContent>


        </IonCard>

    )
}

function IngredientsSearchItemNutritionFacts({ingredientSearchNutritionFacts}){

    const [vitaminAndMineralsNameArray, setVitaminAndMineralsNameArray ] = useState([]);
    const [vitaminAndMineralsAmountArray, setVitaminAndMineralsAmountArray ] = useState([]);


    function renderIngredientSearchItemNutritionFacts(){
        //ened up not using this function
        console.log(ingredientSearchNutritionFacts)

        let arr = [];

           Object.entries(ingredientSearchNutritionFacts).forEach(([k, v]) => {
                   arr = [ k + ": " + v, ...arr]


           })

        console.log(arr)
        // setEntriesArray(arr)

    }

    function renderIngredientVitaminsAndMinerals(){
        console.log(ingredientSearchNutritionFacts)

        let nameArr = [];
        let amountArr = [];

        //erase non zero values

        Object.entries(ingredientSearchNutritionFacts).forEach(([k, v]) => {

            if ( v !== 0){
                console.log("V !== 0")

                console.log(k ,v)
                if (k == "vitaminA"
                    || k == "vitaminB1"
                    || k == "vitaminB2"
                    || k == "vitaminB3"
                    || k == "vitaminB6"
                    || k == "vitaminB12"
                    || k == "vitaminC"
                    || k == "calcium"
                    || k == "chromium"
                    || k == "vitaminD"
                    || k == "vitaminE"
                    || k == "folicAcid"
                    || k == "vitaminK"
                    || k == "iodine"
                    || k == "iron"
                    || k == "magnesium"
                    || k == "potassium"
                    || k == "selenium"
                    || k == "zinc"


                ){
                    // const result = k.replace(/([A-Z)/g, " $1");
                    const result = k.replace(/([a-z])([A-Z])/g, '$1 $2');
                 console.log(result)
                 // console.log(result2)
                const finalResult =  result.charAt(0).toUpperCase() + result.slice(1);
                 console.log(finalResult, v)

                    nameArr = [ finalResult, ...nameArr]
                    amountArr = [ v, ...amountArr]
                }
            }



        })

        console.log(nameArr)
        console.log(amountArr)
        setVitaminAndMineralsNameArray(nameArr)
        setVitaminAndMineralsAmountArray(amountArr)

    }

    function calculatePercentDailyValue(name, amount){

    }
    useEffect(() => {
        renderIngredientVitaminsAndMinerals();

    },[])

    return (
        <div>
            {vitaminAndMineralsNameArray && (
                <div
                    style={{
                        border: "solid",
                        width: "20em",
                        padding: ".25em",
                        opacity: "1",
                    }}
                >

                    <div style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        padding: "0",
                        // border:"solid",

                    }}>Nutrition Facts</div>

                    <div  style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        display:"flex",
                        padding: 0,
                        marginBottom: ".2em",
                        // backgroundColor: "red",

                        justifyContent: "space-between"}}
                    >
                        <div>Serving size</div>
                        <div slot="end">{ingredientSearchNutritionFacts.servingSizeGrams}g</div>

                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        borderTop: "solid thick",
                        borderWidth : ".9em",
                        marginTop: ".1em"
                    }}>
                        <div style={{
                            // backgroundColor: "blue",
                            width: "100%",
                            fontSize: ".8rem"
                        }}>
                            <div style={{
                                fontSize: ".7rem",
                                fontWeight: "bolder"

                            }}>
                                Amount per serving
                            </div>

                            <div style={{
                                display: "flex",

                                justifyContent: "space-between",
                                fontSize: "1.5rem",
                                fontWeight: "900",
                                flexDirection: "row",
                                width: "100%",

                            }}>

                                <div

                                >
                                    Calories
                                </div>
                                <div >
                                    {ingredientSearchNutritionFacts?.calories}
                                </div>
                            </div>
                        </div>


                    </div>


                    <div
                        // style={{ border: "solid"}}
                    >
                        {/*We not going to do daily velue for our ingredients bc not sure what is recomended yet*/}
                        {/*<div style={{*/}
                        {/*     borderTop: "solid",*/}
                        {/*    textAlign: "right",*/}
                        {/*    fontSize: ".7rem",*/}
                        {/*    borderWidth: ".8em",*/}


                        {/*}}>% Daily Value*</div>*/}
                        <div>
                            <div style={{
                                borderTop: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                fontWeight: "1000",
                                borderBottom: "solid"


                            }}><div >Total Fat
                                <span style={{fontWeight: "normal"}}> {ingredientSearchNutritionFacts?.totalFat}g</span> </div>

                                {/*<div>10%</div>*/}
                            </div>
                            <div style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                paddingLeft: "1em"

                            }}>
                                <div>Saturated Fat {ingredientSearchNutritionFacts?.saturatedFat}g</div>

                                {/*<div style={{*/}
                                {/*    fontWeight: "1000",*/}
                                {/*}}>5%</div>*/}

                            </div>
                            <div style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                paddingLeft: "1em"

                            }}>
                                <div>Trans Fat {ingredientSearchNutritionFacts?.transFat}g </div>
                            </div>
                            <div style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                fontWeight: "1000"


                            }}>
                                <div>Cholesterol <span style={{fontWeight: "normal"}}>
                                        {ingredientSearchNutritionFacts?.cholesterol }g
                                    </span></div>
                                {/*<div  style={{*/}
                                {/*    fontWeight: "1000",*/}
                                {/*}}>%</div>*/}
                            </div>

                            <div  style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                fontWeight: "1000"


                            }}>
                                <div>Sodium <span style={{fontWeight: "normal"}}>
                                        {ingredientSearchNutritionFacts?.sodium }g
                                    </span>
                                </div>
                                {/*<div  style={{*/}
                                {/*    fontWeight: "1000",*/}
                                {/*}}>%</div>*/}
                            </div>
                            <div style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".1em",
                                fontWeight: "1000"


                            }}>

                                    <div>Total Carbohydrate
                                        <span style={{fontWeight: "normal"}}> {ingredientSearchNutritionFacts?.totalCarbohydrates }g
                                        </span>

                                    </div>
                                    {/*<div style={{*/}
                                    {/*    fontWeight: "1000",*/}
                                    {/*}}>%</div>*/}

                            </div>

                                <div style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                marginLeft: "0em"

                            }}>
                                <div>Dietary Fiber {ingredientSearchNutritionFacts?.dietaryFiber}g</div>
                                {/*<div style={{*/}
                                {/*    fontWeight: "1000",*/}
                                {/*}}>%</div>*/}
                            </div>
                            <div style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                marginLeft: "1em"

                            }}>
                                <div>Total Sugars {ingredientSearchNutritionFacts?.totalSugars}g</div>

                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginLeft: "2em"

                            }}>
                                <div>Includes {ingredientSearchNutritionFacts?.addedSugars}g Added Sugars </div>
                                {/*<div style={{*/}
                                {/*    fontWeight: "1000",*/}
                                {/*}}>%</div>*/}
                            </div>

                            <div style={{
                                borderTop: "solid",
                                borderBottom: "solid",
                                display: "flex",
                                borderWidth: ".1em",
                                fontWeight: "1000",

                            }}>
                                <div>Protein <span style={{
                                    fontWeight: "normal",
                                }}>
                                     {ingredientSearchNutritionFacts?.protein }g
                                </span></div>
                            </div>

                        </div>
                    </div>

                    <div style={{
                        borderTop: "solid",
                        borderWidth: "1.2em"
                    }}>

                        {vitaminAndMineralsNameArray && vitaminAndMineralsNameArray.map((vitamin, i) => (
                            <div style={{
                                marginTop: ".2em",
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                marginLeft: "0em",
                                paddingRight: "3em",

                            }}>
                                <div>{vitamin} </div>
                                <div>{vitaminAndMineralsAmountArray[i]} mg</div>
                                {/*<div style={{*/}
                                {/*    fontWeight: "1000",*/}
                                {/*}}>%</div>*/}
                            </div>
                        ))}
                    </div>







                </div>
            )}



        </div>
    )
}

function AddIngredientAmount3({
                                  recipeIngredientsList, setRecipeIngredientsList,
                                  setShowAddIngredientToList,                  ingredientToBeAdded,
                                  setShowAddIngredientAmount,
                              }){

    const [ingredientAmount, setIngredientAmount ] = useState(0)

    const [ gramsOrCups, setGramsOrCups ] = useState(undefined)

    const [buttonEnabled, setButtonEnabled ] = useState(false)

    useEffect(() =>{
        if ( gramsOrCups !== undefined && ingredientAmount > 0){
            setButtonEnabled(true)
            console.log("Setting Button True")
        }else{
            setButtonEnabled(false)
            console.log("Setting Button False")

        }
    },[gramsOrCups, buttonEnabled, ingredientAmount])



    function onSaveIngredientToList(){

        console.log(recipeIngredientsList)
        let temp = [...recipeIngredientsList]
        console.log(temp)

        const isSearched = (element) => (
            element.ingredientName?.toLowerCase().includes(ingredientToBeAdded.ingredientName?.toLowerCase())

        )

        let result = temp.filter(isSearched)
        console.log(result)
        result = {...result[0], ingredientAmount, gramsOrCups}
        console.log(result)

        let temp1 = recipeIngredientsList;
        temp1[(temp1.length - 1)] = result;

        setRecipeIngredientsList([...temp1])
        setShowAddIngredientAmount(false)
        console.log(recipeIngredientsList, temp1)

        setShowAddIngredientToList(false)


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
                <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                    <input className="add-ingredient-amount-card-input" value={ingredientAmount} type="number" onChange={(e) => {setIngredientAmount(e.target.value)}}/>
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
                <div style={{
                    // border:"solid",
                    display:"flex",
                    justifyContent: "space-between",
                    width:"75%",
                    margin: " 1em auto",
                }}>
                    <IonButton onClick={() => setShowAddIngredientAmount(false)} color="danger" >cancel</IonButton>
                    <IonButton onClick={() => onSaveIngredientToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                </div>
            </IonCardContent>
        </IonCard>
    )
}
function EditIngredientNutritionalFacts({
                                            setSearchAndAddIngredientToListStep,
                                            setEditIngredientDocId,
                                            setShowEditIngredientFacts, setAddingToFirebase, editIngredientDocId,
                                        }){

    const [ loadedIngredient, setLoadedIngredient ] = useState([]);


    const [ingredientLoaded, setIngredientLoaded] = useState(false)


    async function loadIngredientToBeEdited() {

        console.log(editIngredientDocId)
        const loadedIngredient = await loadIngredient(editIngredientDocId)
        console.log(loadedIngredient)
        console.log(loadedIngredient.data())
        let temp = loadedIngredient.data()

        console.log(temp)
        setLoadedIngredient(loadedIngredient.data())
        setIngredientLoaded(true)

    }


    useEffect(() => {

        loadIngredientToBeEdited();


    },[])


    return(
        <>
            {ingredientLoaded && (
                <EditIngredientInputs
                    ingredient={loadedIngredient}
                    setSearchAndAddIngredientToListStep={setSearchAndAddIngredientToListStep}
                    editIngredientDocId={editIngredientDocId}
                    setShowEditIngredientFacts={setShowEditIngredientFacts}
                />
            )}


        </>

    )
}

function EditIngredientInputs({ingredient, editIngredientDocId, setShowEditIngredientFacts, setSearchAndAddIngredientToListStep}){


    // const [ingredientName, setIngredientName ] = useState("")
    const [ingredientName, setIngredientName ] = useState(ingredient?.ingredientName);
    const [servingSizeGrams, setServingSizeGrams] = useState(ingredient !== undefined ? (ingredient?.servingSizeGrams):(0));
    const [calories, setCalories] = useState(ingredient !== undefined ? (ingredient?.calories):(0));
    const [totalFat, setTotalFat] = useState(ingredient !== undefined ? (ingredient?.totalFat):(0));
    const [saturatedFat, setSaturatedFat] = useState(ingredient !== undefined ? (ingredient?.saturatedFat):(0));
    const [transFat, setTransFat] = useState(ingredient !== undefined ? (ingredient?.transFat):(0));
    const [monounsaturatedFat, setMonounsaturatedFat ] = useState(ingredient !== undefined ? (ingredient?.monounsaturatedFat):(0));
    const [polyunsaturatedFat, setPolyunsaturatedFat ] = useState(ingredient !== undefined ? (ingredient?.polyunsaturatedFat):(0));
    const [cholesterol, setCholesterol] = useState(ingredient !== undefined ? (ingredient?.cholesterol):(0));
    const [sodium, setSodium] = useState(ingredient !== undefined ? (ingredient?.sodium):(0));
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(ingredient !== undefined ? (ingredient?.totalCarbohydrates):(0));
    const [dietaryFiber, setDietaryFiber] = useState(ingredient !== undefined ? (ingredient?.dietaryFiber):(0))
    const [totalSugars, setTotalSugars] = useState(ingredient !== undefined ? (ingredient?.totalSugars):(0));
    const [addedSugars, setAddedSugars] = useState(ingredient !== undefined ? (ingredient?.addedSugars):(0));
    const [protein, setProtein] = useState(ingredient !== undefined ? (ingredient?.protein):(0));
    const [vitaminA, setVitaminA] = useState(ingredient !== undefined ? (ingredient?.vitaminA):(0));
    const [vitaminB1, setVitaminB1] = useState(ingredient !== undefined ? (ingredient?.vitaminB1):(0));
    const [vitaminB2, setVitaminB2] = useState(ingredient !== undefined ? (ingredient?.vitaminB2):(0));
    const [vitaminB3, setVitaminB3] = useState(ingredient !== undefined ? (ingredient?.vitaminB3):(0));
    const [vitaminB6, setVitaminB6] = useState(ingredient !== undefined ? (ingredient?.vitaminB6):(0));
    const [vitaminB12, setVitaminB12] = useState(ingredient !== undefined ? (ingredient?.vitaminB12):(0));
    const [vitaminC, setVitaminC] = useState(ingredient !== undefined ? (ingredient?.vitaminC):(0));
    const [calcium, setCalcium] = useState(ingredient !== undefined ? (ingredient?.calcium):(0));
    const [chromium, setChromium] = useState(ingredient !== undefined ? (ingredient?.chromium):(0));
    const [vitaminD, setVitaminD] = useState(ingredient !== undefined ? (ingredient?.vitaminD):(0));
    const [vitaminE, setVitaminE] = useState(ingredient !== undefined ? (ingredient?.vitaminE):(0));
    const [folicAcid, setFolicAcid] = useState(ingredient !== undefined ? (ingredient?.folicAcid):(0));
    const [vitaminK, setVitaminK] = useState(ingredient !== undefined ? (ingredient?.vitaminK):(0));
    const [iodine, setIodine] = useState(ingredient !== undefined ? (ingredient?.iodine):(0));
    const [iron, setIron] = useState(ingredient !== undefined ? (ingredient?.iron):(0));
    const [magnesium, setMagnesium] = useState(ingredient !== undefined ? (ingredient?.magnesium):(0));
    const [potassium, setPotassium] = useState(ingredient !== undefined ? (ingredient?.potassium):(0));
    const [selenium, setSelenium] = useState(ingredient !== undefined ? (ingredient?.selenium):(0));
    const [zinc, setZinc] = useState(ingredient !== undefined ? (ingredient?.zinc):(0));
    // const [mgOrPercent, setMgOrPercent] = useState(ingredient !== undefined ? (ingredient?.mgOrPercent):(undefined));
    const [gramsPerTsp, setGramsPerTsp ] = useState(ingredient !== undefined ? (ingredient?.gramsPerTsp):(0))

    function ParseFloat(str,val) {
        str = str.toString();
        str = str.slice(0, (str.indexOf(".")) + val + 1);
        return Number(str);
    }

    console.log(ingredient)
    function onSaveIngredientEditClick(){

        console.log( servingSizeGrams, calories, totalCarbohydrates,)
        const ingredientData = {
            // ingredientName,
            // servingSizeGrams: servingSizeGrams,
            // calories: calories,
            // totalFat: ParseFloat(totalFat),
            // saturatedFat: ParseFloat(saturatedFat),
            // transFat: ParseFloat(transFat),
            // monounsaturatedFat: ParseFloat(monounsaturatedFat),
            // polyunsaturatedFat: ParseFloat(polyunsaturatedFat),
            // cholesterol: ParseFloat(cholesterol),
            // sodium: ParseFloat(sodium),
            // totalCarbohydrates: ParseFloat(totalCarbohydrates),
            // dietaryFiber: ParseFloat(dietaryFiber),
            // totalSugars: ParseFloat(totalSugars),
            // addedSugars: ParseFloat(addedSugars),
            // protein: ParseFloat(protein),
            // vitaminA: parseInt(vitaminA),
            // vitaminB1: parseInt(vitaminB1),
            // vitaminB2: parseInt(vitaminB2),
            // vitaminB3: parseInt(vitaminB3),
            // vitaminB6: parseInt(vitaminB6),
            // vitaminB12: parseInt(vitaminB12),
            // vitaminC: parseInt(vitaminC),
            // calcium: parseInt(calcium),
            // chromium: parseInt(chromium),
            // vitaminD: parseInt(vitaminD),
            // vitaminE: parseInt(vitaminE),
            // folicAcid: parseInt(folicAcid),
            // vitaminK: parseInt(vitaminK),
            // iodine: parseInt(iodine),
            // iron: parseInt(iron),
            // magnesium: parseInt(magnesium),
            // potassium: parseInt(potassium),
            // selenium: parseInt(selenium),
            // zinc: parseInt(zinc)

            ingredientName,
            servingSizeGrams,
            calories,
            totalFat,
            saturatedFat,
            transFat,
            monounsaturatedFat,
            polyunsaturatedFat,
            cholesterol,
            sodium,
            totalCarbohydrates,
            dietaryFiber,
            totalSugars,
            addedSugars,
            protein,
            vitaminA,
            vitaminB1,
            vitaminB2,
            vitaminB3,
            vitaminB6,
            vitaminB12,
            vitaminC,
            calcium,
            chromium,
            vitaminD,
            vitaminE,
            folicAcid,
            vitaminK,
            iodine,
            iron,
            magnesium,
            potassium,
            selenium,
            zinc,
            gramsPerTsp,
        }
        console.log(ingredientData, editIngredientDocId)



        updateIngredient(editIngredientDocId, ingredientData).then(() => {
            setShowEditIngredientFacts(false)
            setSearchAndAddIngredientToListStep("Ingredient Search")

        })

    }

    function onCloseClick(){
        console.log("close Click")
        setShowEditIngredientFacts(false)
        setSearchAndAddIngredientToListStep("Ingredient Search")


    }


    return(

        <IonCard style={{overflowY: "scroll", width: "100%", height: "40em"}}>
            <div
                onClick={onCloseClick}

                style={{
                    zIndex: "10",

                    // backgroundColor: "blue",
                    position: "absolute",width: "fit-content", right: "1em", top: "1em"}}>
                <IonIcon  size="large" icon={closeIcon}/>
            </div>
            <IonCardHeader style={{
                width: "90%"
            }}>

                <IonCardTitle>
                    Edit Ingredient Nutritional Facts
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="add-ingredient-card-content" >
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Ingredient Name: </label>
                    <input className="add-ingredient-name-card-input" value={ingredientName} type="text" onChange={(e) => {setIngredientName(e.target.value)}}/>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">How many grams in 1 tsp: </label>
                    <input className="add-ingredient-name-card-input" value={gramsPerTsp} type="text" onChange={(e) => {setGramsPerTsp(e.target.value)}}/>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Serving Size (g)</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={servingSizeGrams} type="number" onChange={(e) => {setServingSizeGrams(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Calories</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={calories} type="number" onChange={(e) => {setCalories(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Total Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={totalFat} type="number" onChange={(e) => {setTotalFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Saturated Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={saturatedFat} type="number" onChange={(e) => {setSaturatedFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Trans Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={transFat} type="number" onChange={(e) => {setTransFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Monounsaturated Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={monounsaturatedFat} type="number" onChange={(e) => {setMonounsaturatedFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Polyunsaturated Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={polyunsaturatedFat} type="number" onChange={(e) => {setPolyunsaturatedFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Cholesterol</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={cholesterol} type="number" onChange={(e) => {setCholesterol(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Sodium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={sodium} type="number" onChange={(e) => {setSodium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Total Carbohydrates</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={totalCarbohydrates} type="number" onChange={(e) => {setTotalCarbohydrates(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Dietary Fiber</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={dietaryFiber} type="number" onChange={(e) => {setDietaryFiber(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Total Sugars</label>

                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={totalSugars} type="number" onChange={(e) => {setTotalSugars(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Added Sugars</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={addedSugars} type="number" onChange={(e) => {setAddedSugars(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>

                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Protein</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={protein} type="number" onChange={(e) => {setProtein(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                {/*ended uop going with just mg*/}
                {/*<div className="add-ingredient-label-and-input-container">*/}
                {/*    <IonLabel className="add-ingredient-label" style={{fontWeight: "bold", marginBottom: "1.2em", marginTop: ".5em"}}>*/}
                {/*        Are the following in 'mg' or '%'*/}
                {/*    </IonLabel>*/}
                {/*    <IonSelect onIonChange={(e) => setMgOrPercent((e.target.value))} className="ion-select-mg-or-percent" placeholder="mg / %">*/}
                {/*        <IonSelectOption value="mg">mg</IonSelectOption>*/}
                {/*        <IonSelectOption value="%">%</IonSelectOption>*/}
                {/*    </IonSelect>*/}
                {/*</div>*/}
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin A</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminA} type="number" onChange={(e) => {setVitaminA(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>

                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B1 (Thiamine)</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB1} type="number" onChange={(e) => {setVitaminB1(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>

                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B2 (Riboflavin)</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB2} type="number" onChange={(e) => {setVitaminB2(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>

                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B3 (Niacin)</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB3} type="number" onChange={(e) => {setVitaminB3(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B6</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB6} type="number" onChange={(e) => {setVitaminB6(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B12</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB12} type="number" onChange={(e) => {setVitaminB12(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin C</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminC} type="number" onChange={(e) => {setVitaminC(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Calcium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={calcium} type="number" onChange={(e) => {setCalcium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Chromium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={chromium} type="number" onChange={(e) => {setChromium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin D</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminD} type="number" onChange={(e) => {setVitaminD(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin E</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminE} type="number" onChange={(e) => {setVitaminE(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Folic Acid</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={folicAcid} type="number" onChange={(e) => {setFolicAcid(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin K</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminK} type="number" onChange={(e) => {setVitaminK(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Iodine</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={iodine} type="number" onChange={(e) => {setIodine(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Iron</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={iron} type="number" onChange={(e) => {setIron(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Magnesium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={magnesium} type="number" onChange={(e) => {setMagnesium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Potassium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={potassium} type="number" onChange={(e) => {setPotassium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Selenium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={selenium} type="number" onChange={(e) => {setSelenium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Zinc</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={zinc} type="number" onChange={(e) => {setZinc(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <IonButton onClick={() => onSaveIngredientEditClick()}>
                    Save Ingredient Edit
                </IonButton>
            </IonCardContent>
        </IonCard>


    )
}

function AddIngredientNutritionalFacts({
    setSearchAndAddIngredientToListStep
                                      }){
    const [ingredientName, setIngredientName,] = useState("");
    const [servingSizeGrams, setServingSizeGrams] = useState(0);
    const [calories, setCalories] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const [saturatedFat, setSaturatedFat] = useState(0);
    const [transFat, setTransFat] = useState(0);
    const [monounsaturatedFat, setMonounsaturatedFat ] = useState(0);
    const [polyunsaturatedFat, setPolyunsaturatedFat ] = useState(0);
    const [cholesterol, setCholesterol] = useState(0);
    const [sodium, setSodium] = useState(0);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
    const [dietaryFiber, setTotalDietaryFiber] = useState(0)
    const [totalSugars, setTotalSugars] = useState(0);
    const [addedSugars, setAddedSugars] = useState(0);
    const [protein, setProtein] = useState(0);
    const [vitaminA, setVitaminA] = useState(0);
    const [vitaminB1, setVitaminB1] = useState(0);
    const [vitaminB2, setVitaminB2] = useState(0);
    const [vitaminB3, setVitaminB3] = useState(0);
    const [vitaminB6, setVitaminB6] = useState(0);
    const [vitaminB12, setVitaminB12] = useState(0);
    const [vitaminC, setVitaminC] = useState(0);
    const [calcium, setCalcium] = useState(0);
    const [chromium, setChromium] = useState(0);
    const [vitaminD, setVitaminD] = useState(0);
    const [vitaminE, setVitaminE] = useState(0);
    const [folicAcid, setFolicAcid] = useState(0);
    const [vitaminK, setVitaminK] = useState(0);
    const [iodine, setIodine] = useState(0);
    const [iron, setIron] = useState(0);
    const [magnesium, setMagnesium] = useState(0);
    const [potassium, setPotassium] = useState(0);
    const [selenium, setSelenium] = useState(0);
    const [zinc, setZinc] = useState(0);
    // const [mgOrPercent, setMgOrPercent] = useState(undefined);
    const [gramsPerTsp, setGramsPerTsp] = useState(0)


    function onSaveIngredientClick(){

        const ingredientData = {
            ingredientName,
            servingSizeGrams: parseInt(servingSizeGrams),
            calories: parseInt(calories),
            totalFat: parseInt(totalFat),
            saturatedFat: parseInt(saturatedFat),
            transFat: parseInt(transFat),
            monounsaturatedFat: parseInt(monounsaturatedFat),
            polyunsaturatedFat: parseInt(polyunsaturatedFat),
            cholesterol: parseInt(cholesterol),
            sodium: parseInt(sodium),
            totalCarbohydrates: parseInt(totalCarbohydrates),
            dietaryFiber: parseInt(dietaryFiber),
            totalSugars: parseInt(totalSugars),
            addedSugars: parseInt(addedSugars),
            protein: parseInt(protein),
            vitaminA: parseInt(vitaminA),
            vitaminB1: parseInt(vitaminB1),
            vitaminB2: parseInt(vitaminB2),
            vitaminB3: parseInt(vitaminB3),
            vitaminB6: parseInt(vitaminB6),
            vitaminB12: parseInt(vitaminB12),
            vitaminC: parseInt(vitaminC),
            calcium: parseInt(calcium),
            chromium: parseInt(chromium),
            vitaminD: parseInt(vitaminD),
            vitaminE: parseInt(vitaminE),
            folicAcid: parseInt(folicAcid),
            vitaminK: parseInt(vitaminK),
            iodine: parseInt(iodine),
            iron: parseInt(iron),
            magnesium: parseInt(magnesium),
            potassium: parseInt(potassium),
            selenium: parseInt(selenium),
            zinc: parseInt(zinc),
            gramsPerTsp: parseInt(gramsPerTsp)
        }
        // setShowAddNewIngredientComponent(false)
        // // setAddingToFirebase(true)
        setSearchAndAddIngredientToListStep("Ingredient Search")

        addNewIngredient(ingredientData).then(x => {

            console.log(x)
            // window.location.href = "/edit-menu-dashboard/add-new-entree"
        })
    }

    function onCloseClick(){
        setSearchAndAddIngredientToListStep("Ingredient Search")

        // setShowAddNewIngredientComponent(false)
        console.log("close click")
    }

    return (
        <div>
            <IonCard style={{overflowY: "scroll", height: "40em"}}>
                <div
                    onClick={onCloseClick}

                    style={{
                        zIndex: "10",
                        // backgroundColor: "blue",
                        position: "absolute",width: "fit-content", right: "1em", top: "1em"}}>
                    <IonIcon  size="large" icon={closeIcon}/>
                </div>
                <IonCardHeader>

                    <IonCardTitle>
                        Add New Ingredient Nutritional Facts
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="add-ingredient-card-content" >
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Ingredient Name: </label>
                        <input className="add-ingredient-name-card-input" value={ingredientName} type="text" onChange={(e) => {setIngredientName(e.target.value)}}/>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">How many grams in 1 tsp: </label>
                        <input className="add-ingredient-name-card-input" value={gramsPerTsp} type="text" onChange={(e) => {setGramsPerTsp(e.target.value)}}/>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Serving Size (g)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={servingSizeGrams} type="number" onChange={(e) => {setServingSizeGrams(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Calories</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={calories} type="number" onChange={(e) => {setCalories(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Total Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={totalFat} type="number" onChange={(e) => {setTotalFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Saturated Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={saturatedFat} type="number" onChange={(e) => {setSaturatedFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Trans Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={transFat} type="number" onChange={(e) => {setTransFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Monounsaturated Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={monounsaturatedFat} type="number" onChange={(e) => {setMonounsaturatedFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Polyunsaturated Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={polyunsaturatedFat} type="number" onChange={(e) => {setPolyunsaturatedFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Cholesterol</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={cholesterol} type="number" onChange={(e) => {setCholesterol(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Sodium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={sodium} type="number" onChange={(e) => {setSodium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Total Carbohydrates</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={totalCarbohydrates} type="number" onChange={(e) => {setTotalCarbohydrates(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Dietary Fiber</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={dietaryFiber} type="number" onChange={(e) => {setTotalDietaryFiber(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Total Sugars</label>

                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={totalSugars} type="number" onChange={(e) => {setTotalSugars(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Added Sugars</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={addedSugars} type="number" onChange={(e) => {setAddedSugars(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>

                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Protein</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={protein} type="number" onChange={(e) => {setProtein(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    {/*decided to do it all in mg*/}
                    {/*<div className="add-ingredient-label-and-input-container">*/}
                    {/*    <IonLabel className="add-ingredient-label" style={{fontWeight: "bold", marginBottom: "1.2em", marginTop: ".5em"}}>*/}
                    {/*        Are the following in 'mg' or '%'*/}
                    {/*    </IonLabel>*/}
                    {/*    <IonSelect onIonChange={(e) => setMgOrPercent((e.target.value))} className="ion-select-mg-or-percent" placeholder="mg / %">*/}
                    {/*        <IonSelectOption value="mg">mg</IonSelectOption>*/}
                    {/*        <IonSelectOption value="%">%</IonSelectOption>*/}
                    {/*    </IonSelect>*/}
                    {/*</div>*/}
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin A</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminA} type="number" onChange={(e) => {setVitaminA(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>

                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B1 (Thiamine)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB1} type="number" onChange={(e) => {setVitaminB1(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>

                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B2 (Riboflavin)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB2} type="number" onChange={(e) => {setVitaminB2(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>

                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B3 (Niacin)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB3} type="number" onChange={(e) => {setVitaminB3(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B6</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB6} type="number" onChange={(e) => {setVitaminB6(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B12</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB12} type="number" onChange={(e) => {setVitaminB12(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin C</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminC} type="number" onChange={(e) => {setVitaminC(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Calcium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={calcium} type="number" onChange={(e) => {setCalcium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Chromium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={chromium} type="number" onChange={(e) => {setChromium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin D</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminD} type="number" onChange={(e) => {setVitaminD(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin E</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminE} type="number" onChange={(e) => {setVitaminE(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Folic Acid</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={folicAcid} type="number" onChange={(e) => {setFolicAcid(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin K</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminK} type="number" onChange={(e) => {setVitaminK(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Iodine</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={iodine} type="number" onChange={(e) => {setIodine(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Iron</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={iron} type="number" onChange={(e) => {setIron(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Magnesium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={magnesium} type="number" onChange={(e) => {setMagnesium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Potassium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={potassium} type="number" onChange={(e) => {setPotassium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Selenium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={selenium} type="number" onChange={(e) => {setSelenium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Zinc</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={zinc} type="number" onChange={(e) => {setZinc(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <IonButton onClick={() => onSaveIngredientClick()}>
                        Save Ingredient
                    </IonButton>
                </IonCardContent>
            </IonCard>

        </div>
    )
}

function SearchAndAddEquipmentToList3({
    recipeEquipmentList, setRecipeEquipmentList,
                                          setShowAddNewEquipmentComponent,
                                          showAddEquipmentToList,
                                          showAddNewEquipmentComponent,
                                          setShowAddEquipmentToList
                                      }){


    const [filteredData, setFilteredData ] = useState([""])
    const [ inputState, setInputState ] = useState("")
    const [ equipmentToBeAdded, setEquipmentToBeAdded ] = useState(undefined)
    const [ showAddEquipmentAmount, setShowAddEquipmentAmount ] = useState(false)

    let loadedData;

    const [ deleting, setDeleting ] = useState(false)

    function loadAndFilterOfflineData(){

        const offlineDataArray = [
            {
                ingredientName: "Apples",
                docId: 1,
            },
            {
                ingredientName: "Bannanas",
                docId: 2,
            },
            {
                ingredientName: "Cheese",
                docId: 3,
            },

        ]

        const isSearched = (element) => (
            element.equipmentName?.toLowerCase().includes(inputState?.toLowerCase())

        )

        const result = offlineDataArray.filter(isSearched)

        console.log(result, " Is Searched Result")
        setFilteredData(result)
    }

    async function loadAndFilterData() {
        let dataTempArray = [];


        loadedData = await loadAnyCollectionData('equipment-collection');

        loadedData.docs.map(doc => {
            dataTempArray = [...dataTempArray, doc.data()]
        })
        console.log(dataTempArray)
        // setLoadedWarmUpExercisesDataFirebase([...dataTempArray])

        // return filteredData;

        const isSearched = (element) => (
            element.equipmentName?.toLowerCase().includes(inputState?.toLowerCase())

        )

        const result = dataTempArray.filter(isSearched)

        console.log(result, " Is Searched Result")
        setFilteredData(result)
        return "FUCK YOU!"

    }

    useEffect(() => {

        console.log(inputState)

        if ( inputState !== " "){
            console.log("IF")
            console.log(loadAndFilterData())
            // console.log(loadAndFilterOfflineData())

        }else if (deleting === true && inputState !== " "){
            setFilteredData([""])
            console.log("ELSE IF")

            setInputState("")
        }


    },[inputState, deleting, ])

    return (
        <>
            {showAddEquipmentAmount === true ? (
                <AddEquipmentAmount3
                    showAddEquipmentAmount={showAddEquipmentAmount}
                    equipmentToBeAdded={equipmentToBeAdded}
                    setShowAddEquipmentAmount={setShowAddEquipmentAmount}
                    recipeEquipmentList={recipeEquipmentList}
                    setRecipeEquipmentList={setRecipeEquipmentList}
                    setShowAddEquipmentToList={setShowAddEquipmentToList}
                />
            ) :(
                <IonCard>
                    <div
                        style={{
                            position: "absolute",
                            right: ".5em",
                            zIndex: "10",
                            cursor: "pointer"
                        }}
                        onClick={() => setShowAddEquipmentToList(false)}
                    >X</div>
                    <IonCardHeader>

                        <IonCardTitle
                        style={{textAlign: "center"}}
                        >
                            Equipment Search
                        </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent >
                        <IonCard  style={{
                            // backgroundColor: "red",
                            padding: ".1em",
                            display: "flex",
                            justifyContent: "space-around",
                            // width: "100%",
                        }}>
                            {/*<IonCardContent >*/}


                            <input
                                value={inputState}
                                style={{
                                    border: "none",
                                    width: "100%"
                                }}
                                // onClick={() => searchClicked()}
                                className="ingredients-searchbar-input"
                                type="text"
                                onChange={(e) => setInputState(e.target.value)}
                            />

                            <IonIcon size="large" icon={searchIcon}/>

                            <IonButton onClick={() => setShowAddNewEquipmentComponent(true)} size="small" style={{
                                // width: "2em",
                                // padding: "0",
                                // height: "2em",

                            }}>
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
                                    // padding: "0",

                                    // backgroundColor: "red"
                                }}
                            >

                                {filteredData && filteredData.map(( data, i ) => (
                                    <AddNewEquipmentSearchDataDisplay3
                                        data={data}
                                        setDeleting={setDeleting}
                                        setFilteredData={setFilteredData}
                                        setInputState={setInputState}
                                        key={i}
                                        setShowAddEquipmentToList={setShowAddEquipmentToList}

                                        setShowAddEquipmentAmount={setShowAddEquipmentAmount}

                                        setEquipmentToBeAdded={setEquipmentToBeAdded}
                                        // list={recipeEquipmentList}
                                        // setList={setRecipeEquipmentList}
                                        recipeEquipmentList={recipeEquipmentList}
                                        setRecipeEquipmentList={setRecipeEquipmentList}
                                    />
                                ))
                                }



                            </div>
                        )}


                    </IonCardContent>
                </IonCard>
            )}
        </>







    )
}

function AddedEquipmentListComponent3({
                                          data,
                                          setRecipeEquipmentList,
                                          setDeletingEquipment,
                                          recipeEquipmentList,setEquipmentToBeEdited, setShowEditEquipmentAmount,
                                          index
                                      }){


    async function onDeleteIconClick() {

        console.log(index)

        const tempArray = recipeEquipmentList

        tempArray.splice(index, 1)
        console.log(tempArray)
        let newTempArray= [];
        tempArray.map(val => {
            if( val !== undefined){
                console.log("Not an undefined val")
                newTempArray = [...newTempArray, val]
            }

        })
        setRecipeEquipmentList(newTempArray)
        console.log("old", tempArray, "new ", newTempArray)
        setDeletingEquipment(true)
    }

    function onEditIconClick(){


        console.log(recipeEquipmentList[index],recipeEquipmentList[index].equipmentName )

        setEquipmentToBeEdited(recipeEquipmentList[index])
        setShowEditEquipmentAmount(true)
    }

    // console.log(data)

    return (
        <div  style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{margin:"0 .5em"}}>
                - {data.equipmentName} ( {data.equipmentAmount} )
            </div>
            <div style={{width: "3em"}}>
                <img src={data.imgUrl} />
            </div>

            <div
                style={{
                    // backgroundColor: "red"
                    width:"fit-content"

                }}
            >
                <IonIcon size="small" onClick={() => onEditIconClick()} style={{ zIndex:"10"}} icon={editIcon}/>

                <IonIcon size="small" onClick={() => onDeleteIconClick()} style={{ zIndex:"10"}} icon={deleteIcon}/>

            </div>
        </div>

    )


}

function AddEquipmentAmount3({
                                 recipeEquipmentList, setRecipeEquipmentList, setShowAddEquipmentToList,
                                 equipmentToBeAdded, setShowAddEquipmentAmount,

                             }){
    const [ equipmentAmount, setEquipmentAmount ] = useState(0)
    const [buttonEnabled, setButtonEnabled ] = useState(false)


    useEffect(() =>{
        if (  equipmentAmount > 0){
            setButtonEnabled(true)
            console.log("Setting Button True")
        }else{
            setButtonEnabled(false)
            console.log("Setting Button False")

        }
    },[ equipmentAmount,])


    function onSaveEquipmentToList(){

        console.log(recipeEquipmentList)
        let temp = [...recipeEquipmentList]
        console.log(temp)

        const isSearched = (element) => (
            element.equipmentName?.toLowerCase().includes(equipmentToBeAdded.equipmentName?.toLowerCase())

        )

        let result = temp.filter(isSearched)
        console.log(result)
        result = {...result[0], equipmentAmount,}
        console.log(result)

        let temp1 = recipeEquipmentList;
        temp1[(temp1.length - 1)] = result;

        setRecipeEquipmentList([...temp1])
        setShowAddEquipmentAmount(false)
        console.log(recipeEquipmentList, temp1)

        setShowAddEquipmentToList(false)

    }


    return (
        <IonCard>
            <IonCardHeader style={{textAlign: "center"}}>
                <IonCardTitle>How much ?</IonCardTitle>
                <IonCard style={{margin: "1em auto", width: "fit-content"}}>
                    <IonCardContent style={{padding: ".5em"}}>
                        <IonCardTitle color="primary">
                            {equipmentToBeAdded.equipmentName}
                        </IonCardTitle>
                    </IonCardContent>
                </IonCard>

            </IonCardHeader>
            <IonCardContent>
                <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                    <input className="add-ingredient-amount-card-input" value={equipmentAmount} type="number" onChange={(e) => {setEquipmentAmount(e.target.value)}}/>

                </div>
                <div style={{
                    // border:"solid",
                    display:"flex",
                    justifyContent: "space-between",
                    width:"75%",
                    margin: " 1em auto",
                }}>
                    <IonButton  onClick={() => setShowAddEquipmentAmount(false)} color="danger" >cancel</IonButton>
                    <IonButton onClick={() => onSaveEquipmentToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                </div>
            </IonCardContent>
        </IonCard>
    )
}
function AddNewEquipmentSearchDataDisplay3({ list, setList,
                                               data, setInputState, setFilteredData,setShowAddEquipmentToList, setShowAddEquipmentAmount,
                                               setDeleting,index, recipeEquipmentList,setRecipeEquipmentList, setEquipmentToBeAdded,
                                           }){




    function onSearchDataDisplayClick(data){
        setInputState(data.equipmentName)
        setFilteredData([""])


        setShowAddEquipmentAmount(true)
        setEquipmentToBeAdded(data)


        console.log(data, recipeEquipmentList, list)
        let temp = recipeEquipmentList;


        if (temp.length === 1 && !temp[0].equipmentName ){
            console.log("if")
            temp.splice(0, 1, data)

        }else {
            console.log("else")

            temp.push(data)

        }
        console.log(temp)
        setRecipeEquipmentList([...temp])
        // setShowAddEquipmentToList(false)
        // setWarmUpExercisesList([...temp, ""])
    }
    async function onDeleteIconClick() {

        setShowAddEquipmentToList(false)
        // setShowAddEquipmentAmount(false)
        console.log("delete")
        setDeleting(true)

        await deleteEquipment(data.docId).then(() => {
            console.log("Done Deleteing")
            setDeleting(false)
        })
    }

    function onEditIngredientClick(){
        // setEquipmentToBeEdited()
        // setEditIngredientDocId(data.docId)
        // setShowEditIngredientsComponent(true)
        // console.log("Showing edit true ", data.ingredientName,data.docId)
    }

    return (
        <IonCard  style={{ cursor: "pointer"}}>
            {data.imgUrl && (
                <IonCardContent>
                    <div  style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // backgroundColor: "blue"
                    }}>

                        <div onClick={() => onSearchDataDisplayClick(data)} style={{
                            width: "100%",
                            // backgroundColor: "red"
                        }}>
                            {data.equipmentName}

                        </div>
                        <div style={{width: "5em"}}>
                            <img src={data.imgUrl} />
                        </div>
                        <div
                            style={{display: "flex"}}

                        >
                            <div onClick={() => onDeleteIconClick()}>
                                <IonIcon size="small"
                                         style={{
                                             margin: "0 .5em",
                                             zIndex:"10",
                                             // backgroundColor:"red"
                                         }} icon={deleteIcon}/>

                            </div>
                            <div onClick={() => onEditIngredientClick()}>
                                <IonIcon  size="small"  style={{margin: "0 .5em", zIndex:"10"}}  icon={editIcon}/>

                            </div>

                        </div>

                    </div>
                </IonCardContent>

            )}


        </IonCard>

    )
}


function RecipeStepsList({
                              setStepsListTextArray, stepsListTextArray,
                          }){
    const [ updatingStepsList, setUpdatingStepsList ] = useState(false)


    useEffect(() => {
        console.log("Updating StepsList", updatingStepsList, stepsListTextArray)

        if ( updatingStepsList === true ){
            setUpdatingStepsList(false)

        }else{
            console.log("FALSE StepsList", updatingStepsList, stepsListTextArray)

        }
    },[updatingStepsList])

    return (
        <div style={{textAlign: "left"}}>
            <div style={{fontSize: "2rem", color: "black",margin: ".75em" }}>
                Steps List
            </div>
            {!updatingStepsList && stepsListTextArray.map((d,i) => (
                <StepsListListComponent3
                    stepsListTextArray={stepsListTextArray}

                    key={i}
                    setUpdatingStepsList={setUpdatingStepsList}
                    index={i}
                    // updatingStepsList={updatingStepsList}
                    setStepsListTextArray={setStepsListTextArray}
                />
            ))}
        </div>
    )

}

function StepsListListComponent3({
                                     stepsListTextArray, setStepsListTextArray,
                                     index, setUpdatingStepsList, editingStep, setEditingStep
                                 }){

    let tempArr = [];
    const [recipeName, setRecipeName ] = useLocalStorage('recipeName', "");

    stepsListTextArray?.map(step => {
        tempArr = [...tempArr, step.pictureUrlArray]
    })
    // console.log(tempArr)
    const [pictureUrl, setPictureUrl ] = useState(undefined)

    let initialUrlArr = []
    stepsListTextArray[index].pictureUrlArray?.map((url, i) => {
        initialUrlArr = [...initialUrlArr, url];

    })
    // console.log(initialUrlArr, index)

    const [pictureUrlArray, setPictureUrlArray ] = useState(initialUrlArr)



    const [updatingPictureArray, setUpdatingPictureArray ] = useState(false)
    // console.log(pictureUrlArray)


    useEffect(() => {
        console.log(pictureUrlArray)


        if (updatingPictureArray === true){
            setUpdatingPictureArray(false)
        }



    },[updatingPictureArray, stepsListTextArray])


    const [ stepInputData, setStepInputData ] = useState(
        (stepsListTextArray.length-1) < index  ?
            ("") :
            (stepsListTextArray[index].stepInputData))

    const imageInputRef = useRef();



    function onAddDataClick(){
        let temp = [...stepsListTextArray]
        console.log(temp, pictureUrlArray)
        let tempObj = {
            stepInputData,
            pictureUrlArray
        }
        console.log(tempObj)
        temp[index] = tempObj;
        console.log(temp)
        setStepsListTextArray([...temp, ""])

        // setUpdatingStepsList(true)
    }

    function onDeleteDataClick(){


        console.log(index)

        const tempArray = stepsListTextArray

        tempArray.splice(index, 1)
        console.log(tempArray)
        let newTempArray= [];
        tempArray.map(val => {
            if( val !== undefined){
                console.log("Not an undefined val")
                newTempArray = [...newTempArray, val]
            }

        })
        setStepsListTextArray(newTempArray)
        setStepInputData("")
        console.log("old", tempArray, "new ", newTempArray)
        setUpdatingStepsList(true)
    }

    function onTextAreaChange(e){
        console.log(e)

        setStepInputData(e)
        let tempInputData = e;
        console.log(tempInputData)

        if (stepsListTextArray.length > (index + 1)){
            let temp = [...stepsListTextArray]
            console.log(temp)
            temp[index] = tempInputData;
            console.log(temp)
            setStepsListTextArray([...temp])
        }



    }

    function onEditDataClick(){

        setEditingStep(true)

    }

    const handleFileChangeImage = async (event) => {

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            // await handleSave(pictureUrlConst);
            // setPictureUrl(pictureUrlConst)

            let tempPictureArr = []

            if ( pictureUrlArray[0] === ""){
                console.log(pictureUrlArray)
            }else{
                tempPictureArr = pictureUrlArray
            }


            tempPictureArr.push(pictureUrlConst);
            console.log(tempPictureArr)

            const imgUrl = await saveImage2(pictureUrlConst, tempPictureArr.length-1)

            tempPictureArr.splice(tempPictureArr.length-1, 1, imgUrl);
            console.log(tempPictureArr)


            setPictureUrlArray(tempPictureArr)
            setUpdatingPictureArray(true)



        }

    };

    const saveImage2 = async (imgUrl, imgIndex) => {

        console.log(imgUrl, imgIndex)

        if (imgUrl){
            if(imgUrl.startsWith('blob:')){
                console.log("saving picture",imgUrl, )

                const entryData = {imgUrl: imgUrl}
                // setAddingToFirebase(true)
                console.log(recipeName)
                entryData.imgUrl = await saveRecipeStepPicture(imgUrl,recipeName, index, imgIndex)
                console.log(entryData.imgUrl);
                // setAddingToFirebase(false)
                return entryData.imgUrl;
            }
        }
    }




    function onDeletePictureClick(i){

        let tempArray = pictureUrlArray

    }



    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between"}}>

                <div>
                    <div style={{marginRight: ".5em"}}>{index +1}.</div>

                </div>
                <div style={{fontSize: ".9rem",
                    // backgroundColor: "darkblue",
                    height: "fit-content",
                    width:"100%"
                }}>
                <textarea
                    disabled={editingStep}
                    value={stepInputData}
                    onChange={(e) => onTextAreaChange(e.target.value)}
                    style={{minWidth: "100%",
                        resize: "none",
                        fontSize: ".8rem",

                        border: "none",
                        backgroundColor: (stepsListTextArray.length - 1) > index ? (""):("rgba(248,209,38,0.11)") ,
                        maxWidth: "100%",
                        minHeight: "fit-content", }}
                ></textarea>
                </div>
                {stepsListTextArray.length === (index + 1 ) && (
                    <>
                        <input type="file" accept="image/*" hidden ref={imageInputRef}
                               onChange={handleFileChangeImage}
                        />

                        {/*{pictureUrl && (*/}
                        {/*    <div style={{width: "100%", margin: "auto", backgroundColor: "green"}}>*/}
                        {/*        /!*<img style={{cursor: "pointer"}} onClick={() => fileInputRef.current.click()} src={pictureUrl} alt=""/>*!/*/}
                        {/*        <img style={{cursor: "pointer"}}  src={pictureUrl} alt=""/>*/}


                        {/*    </div>*/}
                        {/*)}*/}

                        <IonButton onClick={() => imageInputRef.current.click()}>
                            <IonIcon icon={uploadPhotoIcon}/>
                        </IonButton>

                        <IonButton disabled={stepInputData?.toString().length < 10} onClick={() => onAddDataClick()}>
                            <IonIcon icon={addIngredientIcon}/>
                        </IonButton>
                    </>


                )}
                {stepsListTextArray.length > (index + 1) &&(
                    <div style={{display: "flex"}}>

                        <IonButton color="danger" onClick={() => onDeleteDataClick()}>
                            <IonIcon icon={deleteIcon} />
                        </IonButton>

                    </div>

                )}


            </div>

            <div style={{display: "flex"}}>
                {pictureUrlArray !== undefined  && pictureUrlArray.map((url, i) => (
                    <div style={{width: "3em", margin: "auto",}}>
                        {/*<img style={{cursor: "pointer"}} onClick={() => fileInputRef.current.click()} src={pictureUrl} alt=""/>*/}
                        <img style={{cursor: "pointer"}}  src={url} alt=""/>
                        <div style={{width:"fit-content", margin: " 0 auto", cursor: "pointer"}}>
                            <IonIcon onClick={() => onDeletePictureClick(i)} icon={deleteIcon}/>
                        </div>


                    </div>
                ))}

            </div>
        </div>

    )
}

function RecipeNutritionTotals({recipeIngredientsList, }){

    const [ servings, setServings ] = useState(0);

    const [ calculatingTotals, setCalculatingTotals ] = useState(false)

    const [ nutritionalTotals, setNutritionalTotals ] = useState(0)

    function ParseFloat(str,val) {
        str = str.toString();
        str = str.slice(0, (str.indexOf(".")) + val + 1);
        return Number(str);
    }

    function calculateRecipeServingTotals(){
        // setCalculatingTotals(true)
        console.log(recipeIngredientsList)

        let temp = [...recipeIngredientsList];

        let ingredientsTotal = [];

        temp.map((ingredient, i) => {

            let newTemp = Object.fromEntries(Object.entries(ingredient).filter(([k, v]) => (v !== 0 && k !== "docId" && k !== "gramsOrCups" && k !== "ingredientName" && k !== "ingredientAmount"
                // && k !== "servingSizeGrams"
            )));

            console.log(newTemp)




            let amount;

            switch (ingredient.gramsOrCups){

                case "item" :

                    amount = parseInt(ingredient.ingredientAmount)
                    Object.entries(newTemp).forEach(([k, v]) => {
                        if (k !== "docId" && k !== "gramsOrCups" && k !== "ingredientName" && k !== "ingredientAmount" && k !== "ingredientAmount" && k !== "servingSizeGrams"){

                            newTemp[k] = v * amount;

                            // console.log(newTemp[k], newTemp)
                        }
                    })

                    break;
                case "grams" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)
                    amount = ingredient.ingredientAmount

                    break;
                case "cups" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)


                    break;
                case "tbsp" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)
                    break;
                case "tsp" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)
                    break;
                default:
                    break;
            }

            console.log(newTemp)

            ingredientsTotal = [...ingredientsTotal, newTemp]

        })
        console.log( temp, ingredientsTotal)


        const result = {}

        ingredientsTotal.forEach(ingredient => {
            for (let [key, value] of Object.entries(ingredient)){
                if (result[key]){
                    result[key] += value
                }else {
                    result[key] = value;
                }
            }
        });

        console.log(result)
        setNutritionalTotals(result)

    }




    useEffect(() => {

        if (!servings){
            calculateRecipeServingTotals()

        }
        console.log(servings)

    }, [recipeIngredientsList, servings])

    return (
        <IonCard style={{width: "100%", margin: "1em auto",}}
        >
            <IonCardHeader>
                <IonItem style={{display: "flex"}}>
                    <IonLabel>Servings:</IonLabel>
                    <IonInput type="number" onIonChange={(e) => setServings(e.target.value)} style={{border:"solid", width: "2em,"}}></IonInput>
                </IonItem>
            </IonCardHeader>
            <IonCardContent>







                <div style={{
                    border: "solid",
                    padding: "0"
                }}>
                    {servings > 0 && (
                        <>
                            <IonItem style={{
                                fontSize: "2rem",
                                fontWeight: "bold",
                                padding: "0",

                            }}>Nutrition Facts</IonItem>

                            <IonItem  style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                display:"flex",
                                padding: 0,
                                backgroundColor: "red",

                                justifyContent: "space-between"}}
                            >
                                <div>Serving size</div>
                                <div slot="end">size</div>

                            </IonItem>

                            <IonItem style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <div style={{
                                    backgroundColor: "blue",
                                    width: "100%",
                                }}>
                                    <div>
                                        Amount per serving
                                    </div>

                                    <div style={{
                                        display: "flex",

                                        justifyContent: "space-between",
                                        fontSize: "2rem",
                                        fontWeight: "bolder",
                                        flexDirection: "row",
                                        width: "100%",
                                        backgroundColor: "red"

                                    }}>

                                        <div

                                        >
                                            Calories
                                        </div>
                                        <div >
                                            {ParseFloat((nutritionalTotals.calories / servings), 3)}
                                        </div>
                                    </div>
                                </div>


                            </IonItem>


                            <div style={{ border: "solid"}}>
                                <div style={{border: "solid", textAlign: "right",}}>% Daily Value*</div>
                                <div>
                                    <div style={{border: "solid",
                                        display: "flex",
                                        justifyContent: "space-between"

                                    }}>
                                        <div>Total Fat {ParseFloat((nutritionalTotals.totalFat / servings), 3)}g </div>

                                        <div>10%</div>
                                    </div>
                                    <div>
                                        <div>Saturated Fat {ParseFloat((nutritionalTotals.saturatedFat / servings), 3)}g</div>

                                        <div>5%</div>

                                    </div>
                                    <div>
                                        <div>Trans Fat {ParseFloat((nutritionalTotals.transFat / servings), 3)}g </div>
                                        <div>%</div>
                                    </div>
                                    <div>
                                        <div>Cholesterol {ParseFloat((nutritionalTotals.cholesterol / servings), 3)}g</div>
                                        <div>%</div>
                                    </div>
                                    <div>
                                        <div>Sodium</div>
                                        <div>%</div>
                                    </div>
                                    <div>
                                        <div>
                                            <div>Total Carbohydrate {ParseFloat((nutritionalTotals.totalCarbohydrate / servings), 3)}g</div>
                                            <div>%</div>
                                        </div>

                                        <div>
                                            <div>Dietary Fiber {ParseFloat((nutritionalTotals.dietaryFiber / servings), 3)}g</div>
                                            <div>%</div>
                                        </div>
                                        <div>
                                            <div>Total Sugars {ParseFloat((nutritionalTotals.totalSugars / servings), 3)}g</div>
                                            <div>%</div>
                                        </div>

                                        <div>x
                                            <div>Includes {ParseFloat((nutritionalTotals.addedSugars / servings), 3)}g Added Sugars </div>
                                            <div></div>
                                        </div>

                                    </div>


                                    <div>
                                        <div>Protein  {ParseFloat((nutritionalTotals.protein / servings), 3)}g</div>
                                        <div></div>
                                    </div>

                                </div>
                            </div>


                            <IonItem>
                                <IonLabel>Calories</IonLabel>
                                <IonLabel>{ParseFloat((nutritionalTotals.calories / servings), 3)} cals</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Protein</IonLabel>
                                <IonLabel>{ParseFloat((nutritionalTotals.protein / servings), 3)} grams</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Total Fat</IonLabel>
                                <IonLabel>{ParseFloat((nutritionalTotals.totalFat / servings), 3)} grams</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Total Sugars</IonLabel>
                                <IonLabel>{ParseFloat((nutritionalTotals.totalSugars / servings), 3)} grams</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Fiber</IonLabel>
                                <IonLabel>{ParseFloat((nutritionalTotals?.dietaryFiber / servings), 3)} grams</IonLabel>
                            </IonItem>
                        </>

                    )}


                </div>

            </IonCardContent>
        </IonCard>)
}