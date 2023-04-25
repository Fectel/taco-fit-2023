import React, {useEffect, useRef, useState} from "react"
import {
    IonButton,
    IonCard,
    IonCardContent, IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel, IonList,
    IonPage, IonSelect, IonSelectOption
} from "@ionic/react";
import useLocalStorage from "../../useLocalStorage";
import {
    addNewEquipment,
    addNewIngredient, deleteEquipment,
    deleteIngredient,
    loadAnyCollectionData, loadEquipment,
    loadIngredient, saveNewEquipmentPicture, saveNewIngredientPicture, saveRecipeStepPicture, updateEquipment,
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
    const [dditIngredientDocId, setEditIngredientDocId ] = useState(undefined)
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
                <div style={{height: "100vh", overflowY: "auto"}}>

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
                            setShowAddNewEquipmentComponent={setShowAddNewEquipmentComponent}
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
            <div style={{width:"100%",  fontSize: "1rem", height: "fit-content"}}>
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
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
        }}>
            {renderRecipeCreationIngredientsBox()}
            {/*{!deletingIngredient && (*/}
                <div style={{width: "100%"}}>

                    {renderRecipeIngredientsList()}
                </div>

            {/*)}*/}
        </div>

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

    const [ingredientToBeDeleted, setIngredientToBeDeleted ] = useState("")

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

    async function onDeleteIngredient() {


        console.log("On Delete Ingredient")
        await deleteIngredient(ingredientToBeDeleted.docId).then(() => {
            console.log("Done Deleteing: ", ingredientToBeDeleted.ingredientName)
            setIngredientToBeDeleted("")
            loadAndFilterData()
            setInputState("")
        })
    }

    async function loadAndFilterData() {
        let dataTempArray = [];


        loadedData = await loadAnyCollectionData('ingredients-collection');

        loadedData.docs.map(doc => {
            dataTempArray = [...dataTempArray, doc.data()]
        })
        console.log(dataTempArray)


        const isSearched = (element) => (
            element.ingredientName?.toLowerCase().includes(inputState?.toLowerCase())

        )

        const result = dataTempArray.filter(isSearched)

        console.log(result, " Is Searched Result")
        setFilteredData(result)

    }

    useEffect(() => {

        console.log(inputState)

        if ( inputState !== " "){
            loadAndFilterData()

        }


    },[inputState,])

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
                                        {ingredientToBeDeleted !== "" ? (
                                            <IonCard style={{width: "100%",
                                                fontSize: "1.5rem"
                                            }}>
                                                <IonCardHeader style={{
                                                    textAlign: "center"
                                                }}>
                                                    <IonCardTitle>
                                                        Are you sure you want to delete ?
                                                    </IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <div style={{
                                                        fontSize: "2rem",
                                                        textAlign: "center",
                                                        // margin: "auto",
                                                        // backgroundColor: "red"
                                                    }}>{ingredientToBeDeleted?.ingredientName}</div>

                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "space-evenly",
                                                        marginTop: "2em",
                                                        // backgroundColor:"blue"
                                                    }}>
                                                        <IonButton onClick={() => setIngredientToBeDeleted("")}>Cancel</IonButton>
                                                        <IonButton onClick={() => onDeleteIngredient()} color="danger">Delete</IonButton>
                                                    </div>
                                                </IonCardContent>
                                            </IonCard>
                                        ):(
                                            <div>
                                                {filteredData && filteredData.map((data, i) => (
                                                    <AddNewIngredientSearchDataDisplay3
                                                        data={data}
                                                        // setDeleting={setDeleting}
                                                        setFilteredData={setFilteredData}
                                                        setInputState={setInputState}
                                                        key={i}
                                                        setShowAddIngredientAmount={setShowAddIngredientAmount}
                                                        setShowEditIngredientFacts={setShowEditIngredientFacts}

                                                        setIngredientToBeDeleted={setIngredientToBeDeleted}
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
                            setSearchAndAddIngredientToListStep={setSearchAndAddIngredientToListStep}
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
                                         setEquipmentToBeEdited, setShowAddNewEquipmentComponent,
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
                    setShowAddNewEquipmentComponent={setShowAddNewEquipmentComponent}
                    setShowAddEquipmentToList={setShowAddEquipmentToList}
                    recipeEquipmentList={recipeEquipmentList}
                    setRecipeEquipmentList={setRecipeEquipmentList}
                />
            )

        } else {
            return (
                <div >
                    <IonButton style={{width: "100%"}} onClick={() => setShowAddEquipmentToList(true)}>
                        + Equipment
                    </IonButton>
                    <div>Equipment List</div>

                </div>

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
data, setInputState, setFilteredData, setEditIngredientDocId, setShowEditIngredientFacts,index, list,setList, setIngredientToBeAdded,
showAddIngredientAmount, setShowAddIngredientAmount,setIngredientToBeDeleted,
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


        setIngredientToBeDeleted(data)


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
                        <div style={{width: "15em",
                            margin: "auto"
                        }}>
                            <img src={data.imgUrl} />
                        </div>
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
                    || k == "vitaminK"
                    || k == "iodine"
                    || k == "iron"
                    || k == "magnesium"
                    || k == "potassium"
                    || k == "phosphorus"
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
                                  setSearchAndAddIngredientToListStep,
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
        setSearchAndAddIngredientToListStep("Ingredient Search")
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
                    <IonButton onClick={() => setSearchAndAddIngredientToListStep("Ingredient Search")} color="danger" >cancel</IonButton>
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

function EditEquipment({setEquipmentComponentStep,
                       editEquipmentDocId,
                       }){

    const imageInputRef = useRef();

    const [ loadedEquipment, setLoadedEquipment ] = useState([]);


    const [equipmentLoaded, setEquipmentLoaded] = useState(false)



    async function loadEquipmentToBeEdited() {

        console.log(editEquipmentDocId)
        const loadedEquipment = await loadEquipment(editEquipmentDocId)
        console.log(loadedEquipment)
        console.log(loadedEquipment.data())
        let temp = loadedEquipment.data()

        console.log(temp)
        setLoadedEquipment(loadedEquipment.data())
        setEquipmentLoaded(true)

    }

    useEffect(() => {
        loadEquipmentToBeEdited()
    },[])





    function RenderEditEquipmentComponent({loadedEquipment, setEquipmentComponentStep}){

        const [newEquipmentName, setNewEquipmentName] = useState(loadedEquipment?.equipmentName)

        const [equipmentUploadedUrl, setEquipmentUploadedUrl ] = useState(loadedEquipment?.imgUrl)

        useEffect(() => {
            console.log(equipmentUploadedUrl)
        }, [equipmentUploadedUrl])


        function onCancelEditEquipment(){
            setEquipmentComponentStep("Equipment Search")
        }

        // function onInputChange(e){
        //
        //     if (e.target.value === " "){
        //         e.preventDefault()
        //         console.log(e.target.value)
        //
        //     }else{
        //         setNewEquipmentName(e.target.value)
        //         console.log(e.target.value, "!!!!")
        //
        //     }
        // }
        async function onSaveEquipmentEdit() {
            const equipmentData = {
                equipmentName: newEquipmentName,
                imgUrl: equipmentUploadedUrl
            }
            await updateEquipment(editEquipmentDocId, equipmentData);
            console.log("saving equipment")
            setEquipmentComponentStep("Equipment Search")

        }

        const handleFileChangeImage = async (event) => {

            if (event.target.files.length > 0) {
                const file = event.target.files.item(0);
                const pictureUrlConst = window.URL.createObjectURL(file);
                console.log('created URL: ', pictureUrlConst)

                const imgUrl = await saveNewEquipmentPicture(pictureUrlConst, newEquipmentName)

                console.log(imgUrl)
                setEquipmentUploadedUrl(imgUrl)


            }

        };

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <div
                        style={{
                            position: "absolute",
                            right: ".5em",
                            zIndex: "10",
                            cursor: "pointer"
                        }}
                        onClick={() => setEquipmentComponentStep("Equipment Search")}
                    >X</div>
                    <IonCardTitle>
                        Edit Equipment
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem fill="solid">
                        <IonLabel position="floating">Equipment Name</IonLabel>

                        <IonInput
                            value={newEquipmentName}

                            type="text"
                            onIonChange={(e) => setNewEquipmentName(e.target.value)}
                        />
                    </IonItem>
                    {newEquipmentName &&
                    newEquipmentName !== " " &&
                    newEquipmentName !== "  " &&
                    newEquipmentName !== "   " &&
                    newEquipmentName !== "    " &&
                    newEquipmentName !== "     " &&
                    newEquipmentName !== "      " &&
                    newEquipmentName !== "       " &&
                    newEquipmentName !== "         " &&
                    newEquipmentName.length > 2 &&
                    (
                        <div style={{
                            border:"solid",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <div style={
                                {width: "15em",
                                    display: "flex",
                                    height: "12em",
                                    border: "solid",
                                    margin: " 2em auto 0"}}>
                                {equipmentUploadedUrl === "" ?  (
                                    <div style={{
                                        width: "fit-content",
                                        margin: "auto",
                                        backgroundColor: "red"}}>Add Photo</div>

                                ): (
                                    <img src={equipmentUploadedUrl} />
                                )}


                            </div>
                            <div style={{
                                border:"solid",
                                width: "fit-content",
                                margin: "auto",
                            }}>
                                <input type="file" accept="image/*" hidden
                                       ref={imageInputRef}
                                       onChange={handleFileChangeImage}
                                />
                                <IonButton
                                    style={{
                                        width: "fit-content",
                                        margin: "auto"}}
                                    onClick={() => imageInputRef.current.click()}
                                >
                                    <IonIcon icon={uploadPhotoIcon}/>
                                </IonButton>
                            </div>
                            <div

                                style={{display: "flex",
                                    backgroundColor: "medium",
                                    margin: "1em 0",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <IonButton onClick={() => onCancelEditEquipment()} color="danger">Cancel</IonButton>
                                <IonButton onClick={() => onSaveEquipmentEdit()}>Save</IonButton>
                            </div>

                        </div>
                    )}





                    {/*</IonCard>*/}


                </IonCardContent>
            </IonCard>
        )

    }







    return(
        <div>
            {equipmentLoaded && (
                <RenderEditEquipmentComponent
                setEquipmentComponentStep={setEquipmentComponentStep}
                loadedEquipment={loadedEquipment}
                />

            )}
        </div>
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
    const [vitaminK, setVitaminK] = useState(ingredient !== undefined ? (ingredient?.vitaminK):(0));
    const [iodine, setIodine] = useState(ingredient !== undefined ? (ingredient?.iodine):(0));
    const [iron, setIron] = useState(ingredient !== undefined ? (ingredient?.iron):(0));
    const [magnesium, setMagnesium] = useState(ingredient !== undefined ? (ingredient?.magnesium):(0));
    const [potassium, setPotassium] = useState(ingredient !== undefined ? (ingredient?.potassium):(0));
    const [phosphorus, setPhosphorus] = useState(ingredient !== undefined ? (ingredient?.phosphorus):(0));
    const [selenium, setSelenium] = useState(ingredient !== undefined ? (ingredient?.selenium):(0));
    const [zinc, setZinc] = useState(ingredient !== undefined ? (ingredient?.zinc):(0));
    // const [mgOrPercent, setMgOrPercent] = useState(ingredient !== undefined ? (ingredient?.mgOrPercent):(undefined));
    const [gramsPerTbsp, setGramsPerTbsp ] = useState(ingredient !== undefined ? (ingredient.gramsPerTbsp === undefined ? (0):(ingredient.gramsPerTbsp)):(0))

    const [imgUrl, setImgUrl ] = useState(ingredient !== undefined ? (ingredient?.imgUrl):(""))

    const [oxalates, setOxalates ] = useState(ingredient !== undefined ? (ingredient?.oxalates):(0))
    const [phytates, setPhytates ] = useState(ingredient !== undefined ? (ingredient?.phytates):(0))
    const [lectins, setLectins ] = useState(ingredient !== undefined ? (ingredient?.lectins):(0))
    const [tannins, setTannins ] = useState(ingredient !== undefined ? (ingredient?.tannins):(0))
    const [saponins, setSaponins ] = useState(ingredient !== undefined ? (ingredient?.saponins):(0))
    const [trypsinInhibitors, setTrypsinInhibitors ] = useState(ingredient !== undefined ? (ingredient?.trypsinInhibitors):(0))
    const [ phytochemicals, setPhytochemicals ] = useState(ingredient !== undefined ? (ingredient?.phytochemicals):(0))

    function ParseFloat(str,val) {
        str = str.toString();
        str = str.slice(0, (str.indexOf(".")) + val + 1);
        return Number(str);
    }

    const imageInputRef = useRef();
    const handleFileChangeImage = async (event) => {

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrlResult = await saveNewIngredientPicture(pictureUrlConst, ingredientName)

            console.log(imgUrlResult)
            setImgUrl(imgUrlResult)

        }

    };

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
            vitaminK,
            iodine,
            iron,
            magnesium,
            potassium,
            phosphorus,
            selenium,
            zinc,
            gramsPerTbsp,
            imgUrl,
            oxalates,
            phytates,
            lectins,
            tannins,
            saponins,
            trypsinInhibitors,
            // phytochemicals,
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
                    <label className="add-ingredient-label">How many grams in 1 tbsp: </label>
                    <input className="add-ingredient-name-card-input" value={gramsPerTbsp} type="number"  min={0} onChange={(e) => {setGramsPerTbsp(e.target.value)}}/>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Serving Size (g)</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={servingSizeGrams} type="number"  min={0} onChange={(e) => {setServingSizeGrams(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Calories</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={calories} type="number"  min={0} onChange={(e) => {setCalories(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Total Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={totalFat} type="number"  min={0} onChange={(e) => {setTotalFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Saturated Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={saturatedFat} type="number"  min={0} onChange={(e) => {setSaturatedFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Trans Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={transFat} type="number"  min={0} onChange={(e) => {setTransFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Monounsaturated Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={monounsaturatedFat} type="number"  min={0} onChange={(e) => {setMonounsaturatedFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Polyunsaturated Fat</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={polyunsaturatedFat} type="number"  min={0} onChange={(e) => {setPolyunsaturatedFat(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Cholesterol</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={cholesterol} type="number"  min={0} onChange={(e) => {setCholesterol(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Sodium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={sodium} type="number"  min={0} onChange={(e) => {setSodium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Total Carbohydrates</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={totalCarbohydrates} type="number"  min={0} onChange={(e) => {setTotalCarbohydrates(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Dietary Fiber</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={dietaryFiber} type="number"  min={0} onChange={(e) => {setDietaryFiber(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Total Sugars</label>

                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={totalSugars} type="number"  min={0} onChange={(e) => {setTotalSugars(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Added Sugars</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={addedSugars} type="number"  min={0} onChange={(e) => {setAddedSugars(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">g</label>
                    </div>

                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Protein</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={protein} type="number"  min={0} onChange={(e) => {setProtein(e.target.value)}}/>
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
                        <input className="add-ingredient-card-input" value={vitaminA} type="number"  min={0} onChange={(e) => {setVitaminA(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>

                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B1 (Thiamine)</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB1} type="number"  min={0} onChange={(e) => {setVitaminB1(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>

                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B2 (Riboflavin)</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB2} type="number"  min={0} onChange={(e) => {setVitaminB2(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>

                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B3 (Niacin)</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB3} type="number"  min={0} onChange={(e) => {setVitaminB3(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B6</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB6} type="number"  min={0} onChange={(e) => {setVitaminB6(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin B12</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminB12} type="number"  min={0} onChange={(e) => {setVitaminB12(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin C</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminC} type="number"  min={0} onChange={(e) => {setVitaminC(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Calcium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={calcium} type="number"  min={0} onChange={(e) => {setCalcium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Chromium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={chromium} type="number"  min={0} onChange={(e) => {setChromium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin D</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminD} type="number"  min={0} onChange={(e) => {setVitaminD(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin E</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminE} type="number"  min={0} onChange={(e) => {setVitaminE(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>

                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Vitamin K</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={vitaminK} type="number"  min={0} onChange={(e) => {setVitaminK(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Iodine</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={iodine} type="number"  min={0} onChange={(e) => {setIodine(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Iron</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={iron} type="number"  min={0} onChange={(e) => {setIron(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Magnesium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={magnesium} type="number"  min={0} onChange={(e) => {setMagnesium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Potassium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={potassium} type="number"  min={0} onChange={(e) => {setPotassium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Phosphorus</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={phosphorus} type="number"  min={0} onChange={(e) => {setPhosphorus(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Selenium</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={selenium} type="number"   min={0} onChange={(e) => {setSelenium(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Zinc</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={zinc} type="number"  min={0} onChange={(e) => {setZinc(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>

                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Oxalates</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={oxalates} type="number"  min={0} onChange={(e) => {setOxalates(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Phytates</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={phytates} type="number"  min={0} onChange={(e) => {setPhytates(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Lectins</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={lectins} type="number"  min={0} onChange={(e) => {setLectins(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Tannins</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={tannins} type="number"  min={0} onChange={(e) => {setTannins(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Saponins</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={saponins} type="number"  min={0} onChange={(e) => {setSaponins(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                <div className="add-ingredient-label-and-input-container">
                    <label className="add-ingredient-label">Trypsin Inhibitors</label>
                    <div className="add-ingredient-card-input-and-selector-div-container">
                        <input className="add-ingredient-card-input" value={trypsinInhibitors} type="number"  min={0} onChange={(e) => {setTrypsinInhibitors(e.target.value)}}/>
                        <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                    </div>
                </div>
                {ingredientName &&
                ingredientName !== " " &&
                ingredientName !== "  " &&
                ingredientName !== "   " &&
                ingredientName !== "    " &&
                ingredientName !== "     " &&
                ingredientName !== "      " &&
                ingredientName !== "       " &&
                ingredientName !== "         " &&
                ingredientName.length > 2 && (
                    <div>
                        <div style={
                            {width: "15em",
                                display: "flex",
                                height: "12em",
                                border: "solid",
                                margin: " 2em auto 0"}}>
                            {imgUrl === "" ?  (
                                <div style={{
                                    width: "fit-content",
                                    margin: "auto",
                                    backgroundColor: "red"}}>Add Photo</div>

                            ): (
                                <img src={imgUrl} />
                            )}


                        </div>
                        <div style={{
                            border:"solid",
                            width: "fit-content",
                            margin: "auto",
                        }}>
                            <input type="file" accept="image/*" hidden
                                   ref={imageInputRef}
                                   onChange={handleFileChangeImage}
                            />
                            <IonButton
                                style={{
                                    width: "fit-content",
                                    margin: "auto"}}
                                onClick={() => imageInputRef.current.click()}
                            >
                                <IonIcon icon={uploadPhotoIcon}/>
                            </IonButton>
                        </div>
                    </div>


                )}
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
    const [vitaminK, setVitaminK] = useState(0);
    const [iodine, setIodine] = useState(0);
    const [iron, setIron] = useState(0);
    const [magnesium, setMagnesium] = useState(0);
    const [potassium, setPotassium] = useState(0);
    const [phosphorus, setPhosphorus] = useState(0);
    const [selenium, setSelenium] = useState(0);
    const [zinc, setZinc] = useState(0);
    // const [mgOrPercent, setMgOrPercent] = useState(undefined);
    const [gramsPerTbsp, setGramsPerTbsp] = useState(0)

    const [ ingredientUploadedImgUrl, setIngredientUploadedImgUrl ] = useState("")

    const [ingredientToppingClassification , setIngredientToppingClassification] = useState([""])

    const [oxalates, setOxalates ] = useState(0)
    const [phytates, setPhytates ] = useState(0)
    const [lectins, setLectins ] = useState(0)
    const [tannins, setTannins ] = useState(0)
    const [saponins, setSaponins ] = useState(0)
    const [trypsinInhibitors, setTrypsinInhibitors ] = useState(0)
    const [ phytochemicals, setPhytochemicals ] = useState(0)



    const imageInputRef = useRef();


    function onSaveIngredientClick(){

        const ingredientData = {
            ingredientName,
            servingSizeGrams: (servingSizeGrams),
            calories: (calories),
            totalFat: (totalFat),
            saturatedFat: (saturatedFat),
            transFat: (transFat),
            monounsaturatedFat: (monounsaturatedFat),
            polyunsaturatedFat: (polyunsaturatedFat),
            cholesterol: (cholesterol),
            sodium: (sodium),
            totalCarbohydrates: (totalCarbohydrates),
            dietaryFiber: (dietaryFiber),
            totalSugars: (totalSugars),
            addedSugars: (addedSugars),
            protein: (protein),
            vitaminA: (vitaminA),
            vitaminB1: (vitaminB1),
            vitaminB2: (vitaminB2),
            vitaminB3: (vitaminB3),
            vitaminB6: (vitaminB6),
            vitaminB12: (vitaminB12),
            vitaminC: (vitaminC),
            calcium: (calcium),
            chromium: (chromium),
            vitaminD: (vitaminD),
            vitaminE: (vitaminE),
            vitaminK: (vitaminK),
            iodine: (iodine),
            iron: (iron),
            magnesium: (magnesium),
            potassium: (potassium),
            phosphorus: (phosphorus),
            selenium: (selenium),
            zinc: (zinc),
            gramsPerTbsp: (gramsPerTbsp),
            imgUrl: ingredientUploadedImgUrl,
            oxalates,
            phytates,
            lectins,
            tannins,
            saponins,
            trypsinInhibitors,
            // phytochemicals,
        }
        // setShowAddNewIngredientComponent(false)
        // // setAddingToFirebase(true)
        setSearchAndAddIngredientToListStep("Ingredient Search")
        console.log(ingredientData)

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

    function renderVitaminABenefits(){
        if ( vitaminA > 0 ){
            //Eyes, immune system, Growth, and reporduction, heart lungs and other organs
            return (
                <div>VITAMIN A</div>
            )
        }
    }
    function renderVitaminBBenefits(){
        if ( vitaminB1 > 0 || vitaminB2 || vitaminB3 || vitaminB6 || vitaminB12){
            //all B vitamins produce energy
            //healty liver, skin, hair, and eyes, good brain function. used for nervous system
            //helps strengthen immune system, and helps body ability to withstand stressfull confitions
            //healp regulate and enhance apetite
            //energy, healthy digestive system, nervouse system, and skin
            return (
                <div>VITAMIN B</div>
            )
        }

    }

    function renderVitaminCBenefits(){
        if (vitaminC > 0  ){
            //growth development and repair of all body tissues
            //immune system
            //wound healing
            // maintenance of cartilage, bones,ant teeth
            //deficeincy associated with stress related disease,
            //first nutrient to be depleted in alcoholics, smokers, and obeseity
            //its anitoxidatn propert helps with aging

            return (
                <div>Vitamin C</div>
            )
        }
    }

    function renderCalciumBenefits(){
        if (calcium > 0){
            //helps grown new bone and keeps bones strong
            //
            return (
                <div>CALCIUM</div>
            )
        }

    }

    function renderChromiumBenefits(){
        if (chromium > 0){
            //can imporove insulin resistance and ehance protein, carbohydrate and lipid metabolism
            return (
                <div>CHROMIUM</div>
            )
        }
    }

    function renderVitaminDBenefits(){
        if (vitaminD > 0 ){
            //building and maintainging healthy bones
            //your body can only absorb calcium when vitaminD is present
            //regulates many cell fucntions in your body
            //supports immune health, muscle function and brain cell activity

            return (
                <div>VITAMIN D</div>
            )
        }
    }

    function renderVitaminEBenefits(){
        if (vitaminE > 0 ){
            //heps vision, reporoduction, blodd, brain, and skin
        return (
            <div>VITAMIN E</div>
        )
        }
    }

    function renderVitaminKBenefits(){
        if (vitaminK > 0 ){
            //blood clotting and building of bones
            return(
                <div>VITAMIN K</div>
            )

        }
    }

    function renderIodineBenefits(){
        if (iodine > 0 ) {
            //production of thyroid hormones, which control. metabolism and conversion of food energy,
            // bone and braind development during pregnancy
            return(
                <div> IODINE</div>
            )
        }
    }

    function renderIronBenefits(){
        if  (iron > 0 ) {
            //growth and development
            //normal formation of red blood cells and hemoglobin functino which carries oxygen around the body
            //assist with many vital functions within the body
            //reduces tiredness and fatigue

            return (
                <div>IODINE</div>
            )
        }
    }
    function renderMagnesiumBenefits(){
        if (magnesium > 0 ){
            //important for many processes in the body including
            //regulating muscle and nerve function
            //regulating blood sugar levels and blood pressure. and making protiein, bone and DNA

            return (
                <div>MAGNESIUM</div>
            )
        }
    }
    function renderPotassiumBenefits(){
        if (potassium > 0){
            //helps mantain normal levels of fluid inside our cells
            //helps muscles contract and supports normal blood pressure
            // helps stabilize blood sugar levels
            return ( <div>POTASSIUM</div>)
        }
    }
    function renderPhosphorusBenefits(){
        if (phosphorus > 0){
            //helps mantain normal levels of fluid inside our cells
            //helps muscles contract and supports normal blood pressure
            // helps stabilize blood sugar levels
            return ( <div>PHOSPHORUS</div>)
        }
    }
    function renderSeleniumBenefits(){
        if (selenium > 0 ){
            //splays a critical role in reproduction, thyroid hormone metabolism, DNa synthesis and prtection from oxidaticve stress
            return (<div>SELENIUM</div>)
        }
    }
    function renderZincBenefits(){
        if ( zinc > 0){

            //plays critical role in creation of DNA, growth of cells, building proteins, healing damaged tissues, and supporting a healthy immune system
            return ( <div>ZINC</div>)
        }

    }


    const handleFileChangeImage = async (event) => {

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrl = await saveNewIngredientPicture(pictureUrlConst, ingredientName)

            console.log(imgUrl)
            setIngredientUploadedImgUrl(imgUrl)

        }

    };
    // useEffect(() => {
    //
    // },[ingredientUploadedImgUrl])

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
                        <label className="add-ingredient-label">How many grams in 1 tbsp: </label>
                        <input className="add-ingredient-name-card-input" value={gramsPerTbsp} type="number"   min={0} onChange={(e) => {setGramsPerTbsp(e.target.value)}}/>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Serving Size (g)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={servingSizeGrams} type="number"  min={0} onChange={(e) => {setServingSizeGrams(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Calories</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={calories} type="number"  min={0} onChange={(e) => {setCalories(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Total Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={totalFat} type="number"  min={0} onChange={(e) => {setTotalFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Saturated Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={saturatedFat} type="number"   min={0} onChange={(e) => {setSaturatedFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Trans Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={transFat} type="number"   min={0} onChange={(e) => {setTransFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Monounsaturated Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={monounsaturatedFat} type="number"  min={0} onChange={(e) => {setMonounsaturatedFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Polyunsaturated Fat</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={polyunsaturatedFat} type="number"  min={0} onChange={(e) => {setPolyunsaturatedFat(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Cholesterol</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={cholesterol} type="number"   min={0} onChange={(e) => {setCholesterol(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Sodium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={sodium} type="number"  min={0} onChange={(e) => {setSodium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Total Carbohydrates</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={totalCarbohydrates} type="number"   min={0} onChange={(e) => {setTotalCarbohydrates(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Dietary Fiber</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={dietaryFiber} type="number"   min={0} onChange={(e) => {setTotalDietaryFiber(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Total Sugars</label>

                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={totalSugars} type="number"  min={0} onChange={(e) => {setTotalSugars(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Added Sugars</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={addedSugars} type="number"  min={0} onChange={(e) => {setAddedSugars(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>

                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Protein</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={protein} type="number"  min={0} onChange={(e) => {setProtein(e.target.value)}}/>
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
                            <input className="add-ingredient-card-input" value={vitaminA} type="number"  min={0} onChange={(e) => {setVitaminA(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>

                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B1 (Thiamine)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB1} type="number"  min={0} onChange={(e) => {setVitaminB1(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>

                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B2 (Riboflavin)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB2} type="number"  min={0} onChange={(e) => {setVitaminB2(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>

                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B3 (Niacin)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB3} type="number"  min={0} onChange={(e) => {setVitaminB3(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B6</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB6} type="number"  min={0} onChange={(e) => {setVitaminB6(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin B12</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminB12} type="number"  min={0} onChange={(e) => {setVitaminB12(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin C</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminC} type="number"  min={0} onChange={(e) => {setVitaminC(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Calcium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={calcium} type="number"  min={0} onChange={(e) => {setCalcium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Chromium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={chromium} type="number"  min={0} onChange={(e) => {setChromium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin D</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminD} type="number"  min={0} onChange={(e) => {setVitaminD(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin E</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminE} type="number"  min={0} onChange={(e) => {setVitaminE(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>

                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Vitamin K</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={vitaminK} type="number"  min={0} onChange={(e) => {setVitaminK(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Iodine</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={iodine} type="number"  min={0} onChange={(e) => {setIodine(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Iron</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={iron} type="number"  min={0} onChange={(e) => {setIron(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Magnesium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={magnesium} type="number"  min={0} onChange={(e) => {setMagnesium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Potassium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={potassium} type="number"  min={0} onChange={(e) => {setPotassium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Phosphorus</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={phosphorus} type="number"  min={0} onChange={(e) => {setPhosphorus(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Selenium</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={selenium} type="number"  min={0} onChange={(e) => {setSelenium(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Zinc</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={zinc} type="number"  min={0} onChange={(e) => {setZinc(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Oxalates</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={oxalates} type="number"  min={0} onChange={(e) => {setOxalates(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Phytates</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={phytates} type="number"  min={0} onChange={(e) => {setPhytates(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Lectins</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={lectins} type="number"  min={0} onChange={(e) => {setLectins(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Tannins</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={tannins} type="number"  min={0} onChange={(e) => {setTannins(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Saponins</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={saponins} type="number"  min={0} onChange={(e) => {setSaponins(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Trypsin Inhibitors</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input className="add-ingredient-card-input" value={trypsinInhibitors} type="number"  min={0} onChange={(e) => {setTrypsinInhibitors(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">mg</label>
                        </div>
                    </div>

                    <div>
                        <label>Nutritional Benefits Info</label>
                    </div>
                    <div>
                        <label>Nutritional Benefits Tags</label>
                        {renderVitaminABenefits()}
                        {renderVitaminBBenefits()}
                        {renderVitaminCBenefits()}
                        {renderCalciumBenefits()}
                        {renderChromiumBenefits()}
                        {renderVitaminDBenefits()}
                        {renderVitaminEBenefits()}
                        {renderVitaminKBenefits()}
                        {renderIodineBenefits()}
                        {renderIronBenefits()}
                        {renderMagnesiumBenefits()}
                        {renderPotassiumBenefits()}
                        {renderPhosphorusBenefits()}
                        {renderSeleniumBenefits()}
                        {renderZincBenefits()}

                    </div>

                    {ingredientName &&
                    ingredientName !== " " &&
                    ingredientName !== "  " &&
                    ingredientName !== "   " &&
                    ingredientName !== "    " &&
                    ingredientName !== "     " &&
                    ingredientName !== "      " &&
                    ingredientName !== "       " &&
                    ingredientName !== "         " &&
                    ingredientName.length > 2 && (
                        <div>
                            <div style={
                                {width: "15em",
                                    display: "flex",
                                    height: "12em",
                                    border: "solid",
                                    margin: " 2em auto 0"}}>
                                {ingredientUploadedImgUrl === "" ?  (
                                    <div style={{
                                        width: "fit-content",
                                        margin: "auto",
                                        backgroundColor: "red"}}>Add Photo</div>

                                ): (
                                    <img src={ingredientUploadedImgUrl} />
                                )}


                            </div>
                            <div style={{
                                border:"solid",
                                width: "fit-content",
                                margin: "auto",
                            }}>
                                <input type="file" accept="image/*" hidden
                                       ref={imageInputRef}
                                       onChange={handleFileChangeImage}
                                />
                                <IonButton
                                    style={{
                                        width: "fit-content",
                                        margin: "auto"}}
                                    onClick={() => imageInputRef.current.click()}
                                >
                                    <IonIcon icon={uploadPhotoIcon}/>
                                </IonButton>
                            </div>
                        </div>


                    )}


                    {/*<div style={{*/}
                    {/*    display:"flex",*/}
                    {/*    justifyContent: "space-between"*/}
                    {/*}}>*/}
                    {/*    <label>Ingredient Topping Classification</label>*/}
                    {/*    <IonSelect style={{*/}
                    {/*        border:"solid thin",*/}
                    {/*        width: "8em"*/}
                    {/*    }}*/}
                    {/*    onIonChane={(e) => setIngredientToppingClassification(e.target.value)}*/}
                    {/*    >*/}
                    {/*        <IonSelectOption>Protein Powder</IonSelectOption>*/}
                    {/*        <IonSelectOption>Fruit</IonSelectOption>*/}
                    {/*        <IonSelectOption>Vegetable</IonSelectOption>*/}
                    {/*        <IonSelectOption>Supplement</IonSelectOption>*/}
                    {/*    </IonSelect>*/}
                    {/*</div>*/}
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
                                      }) {


    const [filteredData, setFilteredData] = useState([""])
    const [inputState, setInputState] = useState("")
    const [equipmentToBeAdded, setEquipmentToBeAdded] = useState(undefined)
    const [showAddEquipmentAmount, setShowAddEquipmentAmount] = useState(false)



    const [editEquipmentDocId, setEditEquipmentDocId] = useState("")

    const [equipmentComponentStep, setEquipmentComponentStep] = useState("Equipment Search")
    let loadedData;

    const [deleting, setDeleting] = useState(false)

    let result;

    let searchInput;



    function loadAndFilterOfflineData() {

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

    async function loadAndFilterData(e) {


        let dataTempArray = [];


        loadedData = await loadAnyCollectionData('equipment-collection');

        loadedData.docs.map(doc => {
            dataTempArray = [...dataTempArray, doc.data()]
        })
        // console.log(dataTempArray)

        const isSearched = (element) => (
            element.equipmentName?.toLowerCase().includes(e?.toLowerCase())

        )

        // console.log(e,"<-- e", "IS ===>", inputState)


        if (e !== undefined || e !== "") {
            setInputState(e)
            // result = undefined;


            result = dataTempArray.filter(isSearched)
            setFilteredData(result)
            console.log(result)
        }
        if ( e === "secret"){
            console.log("secret")
            setFilteredData(dataTempArray)


        }




    }
    function onEquipmentSearchInputChange(e) {

        if (e !== " " || e !== "  " || e !== "   ") {
            loadAndFilterData(e);
        }
    }



    useEffect(() => {

        console.log(filteredData)




    },[ loadAndFilterData])



    function renderEquipmentComponentStep(){

        switch (equipmentComponentStep) {
            case "Equipment Search":
                return (
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


                                    <IonInput
                                    value={inputState}
                                    style={{
                                        border: "none",
                                        width: "100%"
                                    }}
                                    // onClick={() => searchClicked()}
                                    type="text"
                                    onIonChange={(e) => onEquipmentSearchInputChange(e.target.value)}
                                />

                                <IonIcon size="large" icon={searchIcon}/>

                                <IonButton onClick={() => setEquipmentComponentStep("Add New Equipment")} size="small" style={{
                                    // width: "2em",
                                    // padding: "0",
                                    // height: "2em",

                                }}>
                                    <div>
                                        <IonIcon size="small" icon={addIcon} />


                                    </div>
                                </IonButton>


                            </IonCard>



                            {filteredData.length > 0 && inputState &&(
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
                                            setEquipmentComponentStep={setEquipmentComponentStep}

                                            setShowAddEquipmentAmount={setShowAddEquipmentAmount}

                                            // editEquipmentDocId={editEquipmentDocId}
                                            setEditEquipmentDocId={setEditEquipmentDocId}
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
                )
            break;

            case "Add New Equipment":


                return (
                    <AddNewEquipmentComponent
                        setEquipmentComponentStep={setEquipmentComponentStep}
                    />
                )

                break;

            case "Add Equipment Amount":

                return(
                    <AddEquipmentAmount3
                        showAddEquipmentAmount={showAddEquipmentAmount}
                        equipmentToBeAdded={equipmentToBeAdded}
                        setShowAddEquipmentAmount={setShowAddEquipmentAmount}
                        recipeEquipmentList={recipeEquipmentList}
                        setRecipeEquipmentList={setRecipeEquipmentList}
                        setShowAddEquipmentToList={setShowAddEquipmentToList}
                    />
                )

            case "Edit Equipment":

                return(
                    <EditEquipment
                    editEquipmentDocId={editEquipmentDocId}
                    setEquipmentComponentStep={setEquipmentComponentStep}
                    />
                )
                break;
        }
    }

    return (

        <>
            {renderEquipmentComponentStep()}

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
                                 equipmentToBeAdded, setShowAddEquipmentAmount,setEquipmentComponentStep,

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
function AddNewEquipmentSearchDataDisplay3({ list, setList, setEquipmentComponentStep, setEditEquipmentDocId,
                                               data, setInputState, setFilteredData,setShowAddEquipmentToList, setShowAddEquipmentAmount,
                                               setDeleting,index, recipeEquipmentList,setRecipeEquipmentList, setEquipmentToBeAdded,
                                           }){




    function onSearchDataDisplayClick(data){
        setInputState(data.equipmentName)
        setFilteredData([""])


        setEquipmentComponentStep("Add Equipment Amount")
        // setShowAddEquipmentAmount(true)
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
        setEditEquipmentDocId(data.docId)
        setEquipmentComponentStep("Edit Equipment")
        console.log("TO EDIT EQUIPMENT")
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

function AddNewEquipmentComponent({
                                      setEquipmentComponentStep
                                  }){

    const [newEquipmentName, setNewEquipmentName] = useState("")
    const imageInputRef = useRef();

    const [equipmentUploadedUrl, setEquipmentUploadedUrl ] = useState("")
    const letters = /^[A-Za-z]+$/

    useEffect(() => {
        console.log(equipmentUploadedUrl)
    }, [equipmentUploadedUrl])

    const handleFileChangeImage = async (event) => {

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrl = await saveNewEquipmentPicture(pictureUrlConst, newEquipmentName)

            console.log(imgUrl)
            setEquipmentUploadedUrl(imgUrl)


        }

    };

    function onCancelAddNewEquipment(){
        setEquipmentComponentStep("Equipment Search")
    }

    // function onInputChange(e){
    //
    //     if (e.target.value === " "){
    //         e.preventDefault()
    //         console.log(e.target.value)
    //
    //     }else{
    //         setNewEquipmentName(e.target.value)
    //         console.log(e.target.value, "!!!!")
    //
    //     }
    // }
    async function onSaveEquipment() {
        await addNewEquipment(newEquipmentName, equipmentUploadedUrl);
        console.log("saving equipment")
        setEquipmentComponentStep("Equipment Search")

    }

    function renderAddNewEquipmentComponent(){

        return (
            <IonCard>
                <IonCardHeader style={{textAlign: "center"}}>
                    <div
                        style={{
                            position: "absolute",
                            right: ".5em",
                            zIndex: "10",
                            cursor: "pointer"
                        }}
                        onClick={() => setEquipmentComponentStep("Equipment Search")}
                    >X</div>
                    <IonCardTitle>
                        Add New Equipment
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem fill="solid">
                        <IonLabel position="floating">Equipment Name</IonLabel>

                        <IonInput
                            value={newEquipmentName}
                            // style={{
                            //     border: "none",
                            //     width: "100%"
                            // }}
                            // onClick={() => searchClicked()}
                            type="text"
                            onIonChange={(e) => setNewEquipmentName(e.target.value)}
                        />
                    </IonItem>
                    {newEquipmentName &&
                    newEquipmentName !== " " &&
                    newEquipmentName !== "  " &&
                    newEquipmentName !== "   " &&
                    newEquipmentName !== "    " &&
                    newEquipmentName !== "     " &&
                    newEquipmentName !== "      " &&
                    newEquipmentName !== "       " &&
                    newEquipmentName !== "         " &&
                    newEquipmentName.length > 2 &&
                        (
                        <div style={{
                            border:"solid",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <div style={
                                {width: "15em",
                                    display: "flex",
                                    height: "12em",
                                    border: "solid",
                                    margin: " 2em auto 0"}}>
                                {equipmentUploadedUrl === "" ?  (
                                    <div style={{
                                        width: "fit-content",
                                        margin: "auto",
                                        backgroundColor: "red"}}>Add Photo</div>

                                ): (
                                    <img src={equipmentUploadedUrl} />
                                )}


                            </div>
                            <div style={{
                                border:"solid",
                                width: "fit-content",
                                margin: "auto",
                            }}>
                                <input type="file" accept="image/*" hidden
                                       ref={imageInputRef}
                                       onChange={handleFileChangeImage}
                                />
                                <IonButton
                                    style={{
                                        width: "fit-content",
                                        margin: "auto"}}
                                    onClick={() => imageInputRef.current.click()}
                                >
                                    <IonIcon icon={uploadPhotoIcon}/>
                                </IonButton>
                            </div>
                            <div

                                style={{display: "flex",
                                    backgroundColor: "medium",
                                    margin: "1em 0",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <IonButton onClick={() => onCancelAddNewEquipment()} color="danger">Cancel</IonButton>
                                <IonButton onClick={() => onSaveEquipment()}>Save</IonButton>
                            </div>

                        </div>
                    )}





                    {/*</IonCard>*/}


                </IonCardContent>
            </IonCard>
        )

    }

    return(
        <div>
            {renderAddNewEquipmentComponent()}
        </div>
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

            let tempPictureArr = pictureUrlArray;

            // if ( pictureUrlArray.length < 1 ){
            //     console.log(pictureUrlArray)
            // }else{
            //     console.log("else", pictureUrlArray)
            //     tempPictureArr = pictureUrlArray
            // }


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
                entryData.imgUrl = await saveRecipeStepPicture(imgUrl, index, imgIndex, recipeName)
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
                    <div style={{width: "13em", margin: "auto", backgroundColor: "red"}}>
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

            let newTemp = Object.fromEntries(Object.entries(ingredient).filter(([k, v]) => (v !== 0 && k !== "gramsPerTbsp" &&  k!== "imgUrl" && k !== "docId" && k !== "gramsOrCups" && k !== "ingredientName" && k !== "ingredientAmount"
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

                        }
                    })


                    break;
                case "grams" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)
                    amount = parseFloat(ingredient.ingredientAmount)
                    Object.entries(newTemp).forEach(([k, v]) => {
                        if (k !== "docId" && k !== "gramsOrCups" && k !== "ingredientName" && k !== "ingredientAmount" && k !== "ingredientAmount" && k !== "servingSizeGrams"){

                            const newAmount = (amount / ingredient.servingSizeGrams )
                            console.log("NEW AMOUNT GRAMs" ,newAmount)
                            newTemp[k] = v * newAmount;
                            // console.log(k,v , amount)
                            //
                            // console.log(newTemp[k], newTemp)
                        }
                    })
                    break;
                case "cups" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)

                    amount = parseFloat(ingredient.ingredientAmount)
                    console.log("AMOUNT CUPS", amount)
                    Object.entries(newTemp).forEach(([k, v]) => {
                        if (k !== "docId" && k !== "gramsOrCups" && k !== "ingredientName" && k !== "ingredientAmount" && k !== "ingredientAmount" && k !== "servingSizeGrams"){

                            const newAmount = (((amount * 16) * ingredient.gramsPerTbsp) / ingredient.servingSizeGrams )
                            console.log("NEW AMOUNT" ,newAmount)
                            newTemp[k] = v * newAmount;
                            // console.log(k,v , amount)
                            //
                            // console.log(newTemp[k], newTemp)
                        }
                    })

                    break;
                case "tbsp" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)
                    amount = parseFloat(ingredient.ingredientAmount)
                    console.log("AMOUNT CUPS", amount)
                    Object.entries(newTemp).forEach(([k, v]) => {
                        if (k !== "docId" && k !== "gramsOrCups" && k !== "ingredientName" && k !== "ingredientAmount" && k !== "ingredientAmount" && k !== "servingSizeGrams"){

                            const newAmount = ((amount * ingredient.gramsPerTbsp )/ ingredient.servingSizeGrams)
                            console.log("NEW AMOUNT" ,newAmount)
                            newTemp[k] = v * newAmount;

                        }
                    })
                    break;
                case "tsp" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)
                    amount = parseFloat(ingredient.ingredientAmount)
                    console.log("AMOUNT TSP", amount)
                    Object.entries(newTemp).forEach(([k, v]) => {
                        if (k !== "docId" && k !== "gramsOrCups" && k !== "ingredientName" && k !== "ingredientAmount" && k !== "ingredientAmount" && k !== "servingSizeGrams"){

                            const newAmount = (((amount / 3) * ingredient.gramsPerTbsp) / ingredient.servingSizeGrams)
                            console.log("NEW AMOUNT" ,newAmount)
                            newTemp[k] = v * newAmount;

                        }
                    })
                    break;
                default:
                    break;
            }

            console.log(newTemp)

            ingredientsTotal = [...ingredientsTotal, newTemp]

        })
        // console.log( newTemp, ingredientsTotal)


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

    function renderVitaminABenefits(){
        if ( nutritionalTotals?.vitaminA > 0 ){
            //Eyes, immune system, Growth, and reporduction, heart lungs and other organs
            return (
                <div>VITAMIN A</div>
            )
        }
    }
    function renderVitaminBBenefits(){
        if ( nutritionalTotals?.vitaminB1 > 0 || nutritionalTotals?.vitaminB2 || nutritionalTotals?.vitaminB3 ||nutritionalTotals?. vitaminB6 || nutritionalTotals?.vitaminB12){
            //all B vitamins produce energy
            //healty liver, skin, hair, and eyes, good brain function. used for nervous system
            //helps strengthen immune system, and helps body ability to withstand stressfull confitions
            //healp regulate and enhance apetite
            //energy, healthy digestive system, nervouse system, and skin
            return (
                <div>VITAMIN B</div>
            )
        }

    }

    function renderVitaminCBenefits(){
        if (nutritionalTotals?.vitaminC > 0  ){
            //growth development and repair of all body tissues
            //immune system
            //wound healing
            // maintenance of cartilage, bones,ant teeth
            //deficeincy associated with stress related disease,
            //first nutrient to be depleted in alcoholics, smokers, and obeseity
            //its anitoxidatn propert helps with aging

            return (
                <div>Vitamin C</div>
            )
        }
    }

    function renderCalciumBenefits(){
        if (nutritionalTotals?.calcium > 0){
            //helps grown new bone and keeps bones strong
            //
            return (
                <div>CALCIUM</div>
            )
        }

    }

    function renderChromiumBenefits(){
        if (nutritionalTotals?.chromium > 0){
            //can imporove insulin resistance and ehance protein, carbohydrate and lipid metabolism
            return (
                <div>CHROMIUM</div>
            )
        }
    }

    function renderVitaminDBenefits(){
        if (nutritionalTotals?.vitaminD > 0 ){
            //building and maintainging healthy bones
            //your body can only absorb calcium when vitaminD is present
            //regulates many cell fucntions in your body
            //supports immune health, muscle function and brain cell activity

            return (
                <div>VITAMIN D</div>
            )
        }
    }

    function renderVitaminEBenefits(){
        if (nutritionalTotals?.vitaminE > 0 ){
            //heps vision, reporoduction, blodd, brain, and skin
            return (
                <div>VITAMIN E</div>
            )
        }
    }

    function renderVitaminKBenefits(){
        if (nutritionalTotals?.vitaminK > 0 ){
            //blood clotting and building of bones
            return(
                <div>VITAMIN K</div>
            )

        }
    }

    function renderIodineBenefits(){
        if (nutritionalTotals?.iodine > 0 ) {
            //production of thyroid hormones, which control. metabolism and conversion of food energy,
            // bone and braind development during pregnancy
            return(
                <div> IODINE</div>
            )
        }
    }

    function renderIronBenefits(){
        if  (nutritionalTotals?.iron > 0 ) {
            //growth and development
            //normal formation of red blood cells and hemoglobin functino which carries oxygen around the body
            //assist with many vital functions within the body
            //reduces tiredness and fatigue

            return (
                <div>IODINE</div>
            )
        }
    }
    function renderMagnesiumBenefits(){
        if (nutritionalTotals?.magnesium > 0 ){
            //important for many processes in the body including
            //regulating muscle and nerve function
            //regulating blood sugar levels and blood pressure. and making protiein, bone and DNA

            return (
                <div>MAGNESIUM</div>
            )
        }
    }
    function renderPotassiumBenefits(){
        if (nutritionalTotals?.potassium > 0){
            //helps mantain normal levels of fluid inside our cells
            //helps muscles contract and supports normal blood pressure
            // helps stabilize blood sugar levels
            return ( <div>POTASSIUM</div>)
        }
    }
    function renderPhosphorusBenefits(){
        if (nutritionalTotals?.phosphorus > 0){
            //helps mantain normal levels of fluid inside our cells
            //helps muscles contract and supports normal blood pressure
            // helps stabilize blood sugar levels
            return ( <div>PHOSPHORUS</div>)
        }
    }
    function renderSeleniumBenefits(){
        if (nutritionalTotals?.selenium > 0 ){
            //splays a critical role in reproduction, thyroid hormone metabolism, DNa synthesis and prtection from oxidaticve stress
            return (<div>SELENIUM</div>)
        }
    }
    function renderZincBenefits(){
        if ( nutritionalTotals?.zinc > 0){

            //plays critical role in creation of DNA, growth of cells, building proteins, healing damaged tissues, and supporting a healthy immune system
            return ( <div>ZINC</div>)
        }

    }

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
                                <IonCard>
                                    {renderVitaminABenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderVitaminBBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderVitaminCBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderCalciumBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderChromiumBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderVitaminDBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderVitaminEBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderVitaminKBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderIodineBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderIronBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderMagnesiumBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderPotassiumBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderPhosphorusBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderSeleniumBenefits()}
                                </IonCard>
                                <IonCard>
                                    {renderZincBenefits()}
                                </IonCard>


                        </>

                    )}


                </div>

            </IonCardContent>
        </IonCard>)
}