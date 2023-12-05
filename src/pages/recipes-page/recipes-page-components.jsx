import React, {useEffect, useRef, useState} from "react";
import { PieChart } from 'react-minimal-pie-chart';
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { Bar} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"
import {
    addNewEquipment,
    addNewIngredient,
    deleteAnyDoc,
    deleteCookingStep,
    deleteEquipment,
    deleteIngredient,
    deleteStepArrayPicture, deleteStepPicture,
    deleteStepVideo, deleteStepVideoFromCookingStep,
    getRecipeId,
    loadAnyCollectionData,
    loadIngredient, loadRecipe,
    onSaveRecipe,
    onSaveRecipeCookingInstruction,
    saveNewEquipmentPicture,
    saveNewIngredientPicture,
    saveNewMainMenuCarouselImg, saveRecipeImg,
    saveRecipeStepPicture,
    updateIngredient,
    updateStepPictureArray
} from "../../firebase";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle, IonFab, IonFabButton,
    IonIcon, IonInput,
    IonItem,
    IonLabel, IonList, IonLoading, IonSelect, IonSelectOption
} from "@ionic/react";
import {
    addCircleOutline as addIcon, addOutline as addIngredientIcon,
    addOutline,
    cameraOutline as uploadPhotoIcon,
    cashOutline as menuPageIcon, closeCircleOutline as closeIcon, createOutline as editIcon,
    flask as recipeCreationIcon, imageOutline, listOutline,
    newspaper as recipePreviewIcon, removeCircleOutline as subtractIcon, saveOutline,
    searchCircleOutline as searchIcon, trashOutline as deleteIcon, videocamOutline
} from "ionicons/icons";
import useLocalStorage from "../../useLocalStorage";
import RecipeCreationAddOnsComponent
    from "../../components/recipe-creation-add-ons-component/recipe-creation-add-ons-component";
import RecipeCreationSaucesComponent
    from "../../components/recipe-creation-sauces-component/recipe-creation-sauces-component";
import MenuComboPage2 from "../menu-combo-page/menu-combo-page-2";
import ReactWebcamTutorial from "../../components/react-webcam-tutorial/react-webcam-tutorial";
import {Pie} from "react-chartjs-2";
import {cleanup} from "@testing-library/react";

export function RecipeSearchDisplay({ setRecipePageStep, setCarouselStep, setMenuArray, menuArray,
                                    tempPictureUrlArray, setTempPictureUrlArray,    setChosenRecipe,
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

    async function deleteTempPictureFromFbStorage(data) {
        //aslo delete tempPictureUrlArray
        console.log(data)
        await deleteStepPicture(data.recipeId, data.recipeName, data.dateId, data.imgId)
        // let tempArray = data
        // tempArray.splice(i, 1)
        // setTempPictureUrlArray(tempArray)
        // setUpdatingPictureArray(true)

    }

    function deleteTempPictures(tempPictureUrlArray){
        tempPictureUrlArray.map((data, i) => {
            console.log(data)
            deleteTempPictureFromFbStorage(data)
        })

        return "deleted all Temp Pics"
    }
    async function deleteUnsavedRecipeStepPicture() {

        console.log("DeletING ALL UNSAVED DATA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(tempPictureUrlArray)
        if (tempPictureUrlArray.length > 0) {
            const res = await deleteTempPictures(tempPictureUrlArray)
            console.log(res)
            setTempPictureUrlArray([])
        }



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

        return () => {
            deleteUnsavedRecipeStepPicture()
        }

    },[inputState, deleting, ])

    return (
        <div>
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

                        <IonButton onClick={() => setRecipePageStep("add")} size="small" style={{
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
                                <RecipeSearchLoadedDataDisplay
                                    setRecipePageStep={setRecipePageStep}
                                    data={data}
                                    key={i}
                                    setChosenRecipe={setChosenRecipe}
                                    setCarouselStep={setCarouselStep}
                                    setMenuArray={setMenuArray}
                                    menuArray={menuArray}



                                />
                            ))
                            }



                        </div>
                    )}

                </IonCardContent>
            </IonCard>
        </div>
    )
}

export function CreateNewRecipe({setRecipePageStep, tempPictureUrlArray, setTempPictureUrlArray}){

    const [recipeIngredientsList, setRecipeIngredientsList] = useLocalStorage('recipeIngredientsList', [])
    const [recipeEquipmentList, setRecipeEquipmentList] = useLocalStorage('recipeEquipmentList', [])
    const [recipeStepsListTextArray, setRecipeStepsListTextArray ] = useLocalStorage('recipeStepsListTextArray',[""])
    const [recipeAddOnsList, setRecipeAddOnsList ] = useLocalStorage("recipeAddOnsList", [' '])
    const [recipeSauceList, setRecipeSauceList ] = useLocalStorage("recipeSauceList", [' '])
    const [showAddIngredientToList, setShowAddIngredientToList ] = useState(false)
    const [showAddEquipmentToList, setShowAddEquipmentToList ] = useState(false)
    const [ingredientToBeEdited, setIngredientToBeEdited ] = useState([])
    const [ingredientToBeEditedArrPos, setIngredientToBeEditedArrPos ] = useState([])
    const [recipeName, setRecipeName ] = useLocalStorage('recipeName',"")
    const [ recipeCreationStep, setRecipeCreationStep ] = useState("Recipe Creation")
    const [equipmentDropDown, setEquipmentDropDown ] = useState(false)
    const [IngredientDropDown, setIngredientDropDown ] = useState(false)
    const [ disabled, setDisabled ] = useState(true)
    const [recipeId , setRecipeId ] = useLocalStorage("recipeId", "")
    const [reset, setReset ] = useState(false);

    const [ recipeImgUrl, setRecipeImgUrl ] = useLocalStorage( `recipeImgUrl`, "")

    let loaded;




    useEffect(  () => {

        console.log("crsarekmelgmjrlfmjwelfmekl")
        if (reset === true){
            setReset(false)
            setRecipePageStep("search")
            console.log("Resetting", reset)
        }



        if (recipeId === "" && loaded !== true && reset === false) {
            loadRecipeId()

        }
        if ( recipeImgUrl !== ""  && recipeEquipmentList.length > 0  && recipeIngredientsList.length > 0 && recipeName !== "" && recipeStepsListTextArray[0] !== ""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
        console.log(equipmentDropDown, "<________-----dropDown", disabled)



    }, [recipeStepsListTextArray, recipeEquipmentList,recipeName,recipeIngredientsList,reset, recipeImgUrl])

    async function loadRecipeId() {
        console.log(recipeId)
        loaded = true;
        let id = await getRecipeId()
        console.log(id)
        setRecipeId(id)
    }
    async function onSaveRecipeClick() {
        let recipeObj = {
            recipeName,
            recipeEquipmentList,
            recipeIngredientsList,
            recipeStepsListTextArray,
            recipeId,
            recipeImgUrl,
        }
        console.log(recipeObj)
        await onSaveRecipe(recipeObj, recipeId)

        const res = await resetInputVariables();
        console.log(res)
        if (res === "Complete"){
            setReset(true)

        }

        // setRecipesPageStep("search")

    }

    async function onCloseCreateNewRecipe() {

        const res = await resetInputVariables();
        console.log(res)
        if (res === "Complete") {
            setReset(true)

        }

    }

    async function deleteCreateNewRecipe() {
        let docPath = `recipes-collection/${recipeId}`
        const res = await deleteAnyDoc(docPath)
        if (res === true){
            const res2 = await resetInputVariables();
            console.log(res)
            if (res2 === "Complete") {
                setReset(true)

                setRecipePageStep("search")
            }
            // return true;
        }else {
            // return false
        }
    }
    function resetInputVariables(){
        setRecipeName("")
        setRecipeEquipmentList([])
        setRecipeIngredientsList([])
        setRecipeStepsListTextArray([""])
        setRecipeId("")
        setRecipeImgUrl("")
        return "Complete"
    }
    function renderSaveRecipeButton(){

        // if (recipeEquipmentList.length > 1 && recipeIngredientsList.length > 1 && recipeName !== "" && recipeStepsListTextArray.length > 1){
            return (
                <IonButton disabled={disabled} onClick={() => onSaveRecipeClick()} color="secondary" size="block">Save Recipe</IonButton>

            )
        // }

    }
    function renderCreateNewRecipePage(){


        switch (recipeCreationStep) {

            case "Recipe Creation":
                return (
                    <div>
                        {/*<div style={{*/}
                        {/*    // border: "solid",*/}
                        {/*    width:"fit-content",*/}
                        {/*    margin: "auto",*/}
                        {/*}}>*/}
                        {/*    <IonIcon*/}
                        {/*        onClick={() => setRecipeCreationStep("Recipe Preview")}*/}
                        {/*        style={{fontSize: "24px" , cursor: "pointer"}} icon={recipePreviewIcon} />*/}
                        {/*    <IonIcon*/}

                        {/*        style={{fontSize: "24px", color: "blue", cursor: "pointer"}} icon={recipeCreationIcon} />*/}
                        {/*    <IonIcon icon={menuPageIcon}*/}
                        {/*             style={{fontSize: "24px", cursor: "pointer"}}*/}
                        {/*             onClick={() => setRecipeCreationStep("Recipe Menu Page")}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div
                            style={{
                                position: "absolute",
                                right: ".5em",
                                zIndex: "10",
                                cursor: "pointer"
                            }}
                            onClick={() => deleteCreateNewRecipe()}
                        >X</div>
                        <IonCardHeader>
                            <IonCardTitle style={{textAlign: "center"}}>
                                Create New Recipe
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent style={{ padding: 0}}>

                            <RecipeNameInput
                            recipeName={recipeName}
                            setRecipeName={setRecipeName}
                            />

                            {recipeName.length > 3 && (
                                <>
                                    <RecipeEquipmentComponent
                                        recipeEquipmentList={recipeEquipmentList}
                                        setRecipeEquipmentList={setRecipeEquipmentList}
                                    />
                                    <RecipeIngredientsComponent
                                        recipeIngredientsList={recipeIngredientsList}
                                        setRecipeIngredientsList={setRecipeIngredientsList}

                                    />
                                    <RecipeStepsListComponent
                                        recipeStepsListTextArray={recipeStepsListTextArray}
                                        setRecipeStepsListTextArray={setRecipeStepsListTextArray}
                                        recipeName={recipeName}
                                        recipeId={recipeId}
                                        tempPictureUrlArray={tempPictureUrlArray}
                                        setTempPictureUrlArray={setTempPictureUrlArray}
                                    />

                                    <RecipeNutritionFacts
                                        recipeIngredientsList={recipeIngredientsList}
                                    />
                                    <AddRecipePicture
                                        recipeImgUrl={recipeImgUrl}
                                        setRecipeImgUrl={setRecipeImgUrl}
                                        recipeName={recipeName}
                                        recipeID={recipeId}

                                    />
                                    {renderSaveRecipeButton()}
                                </>
                            )}




{/*
                            <div style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <IonList>
                                    <RecipeCreationEquipmentBox3
                                        setShowAddNewEquipmentComponent={setShowAddNewEquipmentComponent}
                                        setShowEditEquipmentAmount={setShowEditEquipmentAmount}
                                        setIngredientToBeEdited={setIngredientToBeEdited}
                                        recipeEquipmentList={recipeEquipmentList}
                                        showAddEquipmentToList={showAddEquipmentToList}
                                        setRecipeEquipmentList={setRecipeEquipmentList}
                                        setShowAddEquipmentToList={setShowAddEquipmentToList}
                                    />


                                </IonList>


                                <RecipeCreationIngredientsBox3
                                    setShowEditIngredientAmount={setShowEditIngredientAmount}
                                    setIngredientToBeEdited={setIngredientToBeEdited}
                                    setIngredientToBeEditedArrPos={setIngredientToBeEditedArrPos}

                                    setRecipeIngredientsList={setRecipeIngredientsList}
                                    showAddIngredientToList={showAddIngredientToList}
                                    setShowAddIngredientToList={setShowAddIngredientToList}
                                    recipeIngredientsList={recipeIngredientsList}
                                    setShowEditIngredientFacts={setShowEditIngredientFacts}
                                    setRecipeCreationStep={setRecipeCreationStep}

                                    ingredientToBeEdited={ingredientToBeEdited}
                                    ingredientToBeEditedArrPos={ingredientToBeEditedArrPos}

                                    searchAndAddIngredientToListStep={searchAndAddIngredientToListStep}
                                    setSearchAndAddIngredientToListStep={setSearchAndAddIngredientToListStep}
                                />
                                <RecipeCreationAddOnsComponent
                                    recipeAddOnsList={recipeAddOnsList}
                                    setRecipeAddOnsList={setRecipeAddOnsList}
                                    recipeId={recipeId}
                                />
                                <RecipeCreationSaucesComponent
                                    recipeAddOnsList={recipeSauceList}
                                    setRecipeAddOnsList={setRecipeSauceList}
                                    recipeId={recipeId}
                                />
                            </div>
                            <RecipeStepsList
                                stepsListTextArray={stepsListTextArray}
                                setStepsListTextArray={setStepsListTextArray}
                            />

                            <RecipeNutritionTotals
                                recipeIngredientsList={recipeIngredientsList}
                            />*/}

                        </IonCardContent>


                    </div>
                )
                break;

            // case "Recipe Edit":
            //     return <EditRecipe
            //     setRecipePageStep={setRecipePageStep}
            //     data={data}
            //     />
            //     break;

            //
            // case "Recipe Preview":
            //     return(
            //         <div style={{
            //             // backgroundColor: "blue",
            //             height: "100%"
            //
            //         }}>
            //             <div style={{
            //                 // border: "solid",
            //                 width:"fit-content",
            //                 margin: "auto",
            //
            //             }}>
            //                 <IonIcon style={{fontSize: "24px",  color: "blue", cursor: "pointer"}} icon={recipePreviewIcon} />
            //                 <IonIcon
            //                     onClick={() => setRecipeCreationStep("Recipe Creation")}
            //                     style={{fontSize: "24px", cursor: "pointer"}} icon={recipeCreationIcon} />
            //                 <IonIcon icon={menuPageIcon}
            //                          style={{fontSize: "24px", cursor: "pointer"}}
            //                          onClick={() => setRecipeCreationStep("Recipe Menu Page")}
            //                 />
            //             </div>
            //
            //             <IonCard style={{
            //                 height: "100%",
            //                 width:"90%",
            //             }}>
            //                 <IonCard style={{
            //                     backgroundColor: "rgba(232,227,170,0.5)",
            //
            //                 }}>
            //                     <IonCardHeader>
            //                         <IonCardTitle style={{textAlign:"center",
            //                         }}>
            //                             {recipeName}
            //
            //                         </IonCardTitle>
            //
            //                     </IonCardHeader>
            //
            //                 </IonCard>
            //                 <div  style={{textAlign: "center", margin: "1em"}}>
            //                     <div>
            //                         Equipment List
            //                     </div>
            //                     {recipeEquipmentList.length > 0 && (
            //                         <div style={{
            //                             // width:"fit-content",
            //                             fontSize: ".6rem",
            //                             // height: "100%",
            //                             // flexWrap: "wrap",
            //                             zIndex: "0",
            //                             display: "flex",
            //                             // overflowX: "scroll",
            //
            //
            //                             padding: "0em",
            //                             flexDirection: "column",
            //                             // border:"solid yellow"
            //                         }}>
            //                             <div style={{
            //                                 display: "flex",
            //                                 flexDirection: "column",
            //                                 textAlign: "center",
            //                             }}>
            //                                 {recipeEquipmentList && recipeEquipmentList.map((data , i) => (
            //                                     <EquipmentListPreviewComponent
            //                                         data={data}
            //                                         key={i}
            //                                     />
            //
            //                                 ))}
            //                             </div>
            //
            //
            //
            //
            //                         </div>
            //                     )}
            //                 </div>
            //                 <div style={{textAlign:"center",
            //                     margin:"1em",
            //                 }}>
            //                     <div>Ingredients List</div>
            //
            //                     {recipeIngredientsList.length > 0 && (
            //                         <div style={{
            //                             height: "fit-content",
            //                             // border: "solid blue",
            //                             // width:"fit-content",
            //                             fontSize: ".6rem",
            //                             // flexWrap: "wrap",
            //                             zIndex: "0",
            //                             display: "flex",
            //                             flexDirection: "column",
            //
            //
            //                         }}>
            //
            //
            //
            //                             <div style={{display: "flex", flexDirection: "column"}}>
            //                                 {recipeIngredientsList[0] && recipeIngredientsList.map((data, i) => (
            //                                     <IngredientListPreviewComponent
            //                                         data={data} key={i} index={i}
            //                                         recipeIngredientsList={recipeIngredientsList}
            //                                     />
            //                                 ))}
            //                             </div>
            //                         </div>
            //                     )}
            //                 </div>
            //                 <div>
            //                     <RecipePreviewStepsComponent
            //                         stepsListTextArray={stepsListTextArray}
            //                     />
            //                 </div>
            //
            //                 <div >
            //                     {/*{renderSaveRecipeButton()}*/}
            //                     <IonButton
            //
            //                         disabled={disabled}
            //                         onClick={() => onSaveRecipeClick()}
            //                         color="secondary"
            //                         expand="block">Save Recipe</IonButton>
            //
            //                 </div>
            //
            //             </IonCard>
            //         </div>
            //     )
            // case "Recipe Menu Page":
            //     return (
            //         <div>
            //             <div style={{
            //                 // border: "solid",
            //                 width:"fit-content",
            //                 margin: "auto",
            //
            //             }}>
            //                 <IonIcon style={{fontSize: "24px", cursor: "pointer"}} icon={recipePreviewIcon}
            //                          onClick={() => setRecipeCreationStep("Recipe Preview")}
            //                 />
            //                 <IonIcon
            //                     onClick={() => setRecipeCreationStep("Recipe Creation")}
            //                     style={{fontSize: "24px", cursor: "pointer"}} icon={recipeCreationIcon} />
            //                 <IonIcon icon={menuPageIcon}
            //                          style={{fontSize: "24px",  color: "blue", cursor: "pointer"}}
            //                          onClick={() => setRecipeCreationStep("Recipe Menu Page")}
            //                 />
            //             </div>
            //             <MenuComboPage2 />
            //
            //         </div>
            //     )



        }

    }

    return (
        <div style={{ width: "100%"}}>
            {renderCreateNewRecipePage()}

        </div>
    )
}
// export function EditeRecipeDataLoading({setRecipePageStep, data }){
//
//     useEffect(() => {
//         console.log(data)
//         loadRecipeData()
//     },[])
//
//     async function loadRecipeData(){
//
//        let res = await loadRecipe(data.docId)
//         console.log(res)
//     }
// }

export function EditRecipe({setRecipePageStep, data, tempPictureUrlArray, setTempPictureUrlArray }){

    console.log(data)

    const [recipeIngredientsList, setRecipeIngredientsList] = useState( [...data.recipeIngredientsList])
    // const [recipeIngredientsList, setRecipeIngredientsList] = useLocalStorage('recipeIngredientsList', [...data.recipeIngredientsList])
    const [recipeEquipmentList, setRecipeEquipmentList] = useState( [...data.recipeEquipmentList])
    // const [recipeEquipmentList, setRecipeEquipmentList] = useLocalStorage('recipeEquipmentList', [...data.recipeEquipmentList])
    const [recipeStepsListTextArray, setRecipeStepsListTextArray ] = useState([...data.recipeStepsListTextArray])
    // const [recipeStepsListTextArray, setRecipeStepsListTextArray ] = useLocalStorage('recipeStepsListTextArray',[...data.recipeStepsListTextArray])

    const [recipeName, setRecipeName ] = useState(data.recipeName)
    // const [recipeName, setRecipeName ] = useLocalStorage('recipeName', data.recipeName)
    const [ recipeCreationStep, setRecipeCreationStep ] = useState("Recipe Creation")
    const [equipmentDropDown, setEquipmentDropDown ] = useState(false)

    const [ recipeImgUrl, setRecipeImgUrl ] = useState( data.recipeImgUrl)
    // const [ recipeImgUrl, setRecipeImgUrl ] = useLocalStorage( `recipeImgUrl`,data.recipeImgUrl)

    const [ disabled, setDisabled ] = useState(true)
    const [recipeId , setRecipeId ] = useState(data.recipeId)
    // const [recipeId , setRecipeId ] = useLocalStorage("recipeId", data.recipeId)
    const [reset, setReset ] = useState(false);
    let loaded;


    console.log(recipeIngredientsList, recipeEquipmentList, recipeStepsListTextArray, recipeName)

    useEffect(  () => {

        if (reset === true){
            setReset(false)
            setRecipePageStep("search")
            console.log("Resetting", reset)
        }



        // if (recipeId === "" && loaded !== true && reset === false) {
        //     loadRecipeId()
        //
        // }
        if (recipeEquipmentList.length > 0 && recipeIngredientsList.length > 0 && recipeName !== "" && recipeStepsListTextArray.length > 0){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
        console.log(equipmentDropDown, "<________-----dropDown", disabled)
    }, [recipeStepsListTextArray, recipeEquipmentList,recipeName,recipeIngredientsList,reset,])

    async function loadRecipeId() {
        console.log(recipeId)
        loaded = true;
        let id = await getRecipeId()
        console.log(id)
        setRecipeId(id)
    }
    async function onSaveRecipeClick() {
        let recipeObj = {
            recipeName,
            recipeEquipmentList,
            recipeIngredientsList,
            recipeStepsListTextArray,
            recipeImgUrl,
        }
        console.log(recipeObj)
        await onSaveRecipe(recipeObj, recipeId)

        const res = await resetInputVariables();
        console.log(res)
        if (res === "Complete"){
            setReset(true)

        }

        // setRecipesPageStep("search")

    }

    async function onCloseCreateNewRecipe() {

        const res = await resetInputVariables();
        console.log(res)
        if (res === "Complete") {
            setReset(true)

        }

    }

    async function deleteCreateNewRecipe() {
        let docPath = `recipes-collection/${recipeId}`
        const res = await deleteAnyDoc(docPath)
        if (res === true){
            const res2 = await resetInputVariables();
            console.log(res)
            if (res2 === "Complete") {
                setReset(true)

                setRecipePageStep("search")
            }
            // return true;
        }else {
            // return false
        }
    }
    function resetInputVariables(){
        setRecipeName("")
        setRecipeEquipmentList([' '])
        setRecipeIngredientsList([' '])
        setRecipeStepsListTextArray([""])
        setRecipeId("")
        setRecipeImgUrl("")
        return "Complete"
    }
    function renderSaveRecipeButton(){

        // if (recipeEquipmentList.length > 1 && recipeIngredientsList.length > 1 && recipeName !== "" && recipeStepsListTextArray.length > 1){
            return (
                <IonButton disabled={disabled} onClick={() => onSaveRecipeClick()} color="secondary" size="block">Save Recipe</IonButton>

            )
        // }

    }
    function renderEditRecipePage(){



                return (
                    <div
                        // style={{height: "100vh", overflowY: "auto", margin:"auto",}}
                    >
                        <div style={{
                            // border: "solid",
                            width:"fit-content",
                            margin: "auto",
                        }}>
                            <IonIcon
                                onClick={() => setRecipeCreationStep("Recipe Preview")}
                                style={{fontSize: "24px" , cursor: "pointer"}} icon={recipePreviewIcon} />
                            <IonIcon

                                style={{fontSize: "24px", color: "blue", cursor: "pointer"}} icon={recipeCreationIcon} />
                            <IonIcon icon={menuPageIcon}
                                     style={{fontSize: "24px", cursor: "pointer"}}
                                     onClick={() => setRecipeCreationStep("Recipe Menu Page")}
                            />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                right: ".5em",
                                zIndex: "10",
                                cursor: "pointer"
                            }}
                            onClick={() => deleteCreateNewRecipe()}
                        >X</div>
                        <IonCardHeader>
                            <IonCardTitle style={{textAlign: "center"}}>
                                Create New Recipe
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent style={{ padding: 0}}>

                            <RecipeNameInput
                            recipeName={recipeName}
                            setRecipeName={setRecipeName}
                            />

                            <RecipeEquipmentComponent
                                recipeEquipmentList={recipeEquipmentList}
                                setRecipeEquipmentList={setRecipeEquipmentList}
                            />
                            <RecipeIngredientsComponent
                                recipeIngredientsList={recipeIngredientsList}
                                setRecipeIngredientsList={setRecipeIngredientsList}

                            />
                            <RecipeStepsListComponent
                            recipeStepsListTextArray={recipeStepsListTextArray}
                            setRecipeStepsListTextArray={setRecipeStepsListTextArray}
                            recipeName={recipeName}
                            recipeId={recipeId}
                            tempPictureUrlArray={tempPictureUrlArray}
                            setTempPictureUrlArray={setTempPictureUrlArray}
                            />

                            <RecipeNutritionFacts
                            recipeIngredientsList={recipeIngredientsList}
                            />

                            <AddRecipePicture
                            recipeImgUrl={recipeImgUrl}
                            setRecipeImgUrl={setRecipeImgUrl}
                            recipeName={recipeName}
                            recipeId={recipeId}

                            />
{/*
                            <div style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <IonList>
                                    <RecipeCreationEquipmentBox3
                                        setShowAddNewEquipmentComponent={setShowAddNewEquipmentComponent}
                                        setShowEditEquipmentAmount={setShowEditEquipmentAmount}
                                        setIngredientToBeEdited={setIngredientToBeEdited}
                                        recipeEquipmentList={recipeEquipmentList}
                                        showAddEquipmentToList={showAddEquipmentToList}
                                        setRecipeEquipmentList={setRecipeEquipmentList}
                                        setShowAddEquipmentToList={setShowAddEquipmentToList}
                                    />


                                </IonList>


                                <RecipeCreationIngredientsBox3
                                    setShowEditIngredientAmount={setShowEditIngredientAmount}
                                    setIngredientToBeEdited={setIngredientToBeEdited}
                                    setIngredientToBeEditedArrPos={setIngredientToBeEditedArrPos}

                                    setRecipeIngredientsList={setRecipeIngredientsList}
                                    showAddIngredientToList={showAddIngredientToList}
                                    setShowAddIngredientToList={setShowAddIngredientToList}
                                    recipeIngredientsList={recipeIngredientsList}
                                    setShowEditIngredientFacts={setShowEditIngredientFacts}
                                    setRecipeCreationStep={setRecipeCreationStep}

                                    ingredientToBeEdited={ingredientToBeEdited}
                                    ingredientToBeEditedArrPos={ingredientToBeEditedArrPos}

                                    searchAndAddIngredientToListStep={searchAndAddIngredientToListStep}
                                    setSearchAndAddIngredientToListStep={setSearchAndAddIngredientToListStep}
                                />
                                <RecipeCreationAddOnsComponent
                                    recipeAddOnsList={recipeAddOnsList}
                                    setRecipeAddOnsList={setRecipeAddOnsList}
                                    recipeId={recipeId}
                                />
                                <RecipeCreationSaucesComponent
                                    recipeAddOnsList={recipeSauceList}
                                    setRecipeAddOnsList={setRecipeSauceList}
                                    recipeId={recipeId}
                                />
                            </div>
                            <RecipeStepsList
                                stepsListTextArray={stepsListTextArray}
                                setStepsListTextArray={setStepsListTextArray}
                            />

                            <RecipeNutritionTotals
                                recipeIngredientsList={recipeIngredientsList}
                            />*/}

                        </IonCardContent>


                    </div>
                )

    }

    return (
        // <IonCard style={{width: "300px", overFlow:"hidden"}}>
        //     <IonCardContent>
        <div >
            {renderEditRecipePage()}
            {renderSaveRecipeButton()}

        </div>
        // </IonCardContent>
        // </IonCard>
    )
}

function RecipeNameInput({setRecipeName, recipeName}){

    return (

        <IonItem style={{border:"solid thin", borderRadius:"5px",width:"60%", margin: "auto"}}>

            <IonInput

                style={{textAlign: "center",
                    fontSize: "1.4rem"
                }}

                label="Recipe Name"
                labelPlacement="floating"
                fill="solid"

                placeholder="Enter Recipe Name"
                value={recipeName} onIonChange={(e) => setRecipeName(e.target.value)} ></IonInput>
        </IonItem>

    )
}

function RecipeEquipmentComponent({recipeEquipmentList, setRecipeEquipmentList}){

    const [ equipmentToBeAdded, setEquipmentToBeAdded ] = useState("")
    const [filteredData, setFilteredData] = useState([""])
    const [ recipeEquipmentComponentState, setRecipeEquipmentComponentState] = useState("display")
    const [inputState, setInputState] = useState("")
    let result;
    let loadedData;


    useEffect(() => {

    })

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
    function onEquipmentSearchInputChange(e){


        if (e !== " " || e !== "  " || e !== "   ") {
            loadAndFilterData(e);
        }
    }
    function renderRecipeEquipmentComponent(){

        switch (recipeEquipmentComponentState) {
            case "search":
                return (
                    <IonCard>
                        <div
                            style={{
                                position: "absolute",
                                right: ".5em",
                                zIndex: "10",
                                cursor: "pointer"
                            }}
                            onClick={() => setRecipeEquipmentComponentState("display")}
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

                                <IonButton
                                    onClick={() => setRecipeEquipmentComponentState("add")}
                                    size="small" style={{
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
                                        overFlowY: "scroll",
                                        height: "100%",

                                        // backgroundColor: "red"
                                    }}
                                >

                                    {filteredData && filteredData.map(( data, i ) => (
                                        <EquipmentSearchLoadedDataDisplay
                                            data={data}
                                            key={i}
                                            setInputState={setInputState}
                                            setRecipeEquipmentComponentState={setRecipeEquipmentComponentState}
                                            setEquipmentToBeAdded={setEquipmentToBeAdded}
                                            setFilteredData={setFilteredData}
                                            setRecipeEquipmentList={setRecipeEquipmentList}
                                            recipeEquipmentList={recipeEquipmentList}


                                        />
                                    ))
                                    }



                                </div>
                            )}


                        </IonCardContent>
                    </IonCard>
                )

            case "add":
                return (
                    <AddNewEquipmentComponent
                        setRecipeEquipmentComponentState={setRecipeEquipmentComponentState}
                    />
                )
            case "add amount":
                return (
                    <AddEquipmentAmount
                    equipmentToBeAdded={equipmentToBeAdded}
                    setRecipeEquipmentComponentState={setRecipeEquipmentComponentState}
                    recipeEquipmentList={recipeEquipmentList}
                    setRecipeEquipmentList={setRecipeEquipmentList}
                    />
                )
            case "display":
                return (
                    <RecipeEquipmentDisplay
                        setRecipeEquipmentComponentState={setRecipeEquipmentComponentState}
                        setRecipeEquipmentList={setRecipeEquipmentList}
                        recipeEquipmentList={recipeEquipmentList} />
                )
            // case "edit amount"
        }
    }

    return (<div>
        {renderRecipeEquipmentComponent()}
    </div>)
}

function RecipeIngredientsComponent({recipeIngredientsList, setRecipeIngredientsList}){

    const [ editIngredientDocId, setEditIngredientDocId ] = useState("")
    const [ingredientToBeDeleted, setIngredientToBeDeleted ] = useState("")
    const [ ingredientToBeAdded, setIngredientToBeAdded ] = useState("")
    const [filteredData, setFilteredData] = useState([""])
    const [ recipeIngredientComponentState, setRecipeIngredientComponentState] = useState("display")
    const [inputState, setInputState] = useState("")
    let result;
    let loadedData;
    async function loadAndFilterData(e) {


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
    function onIngredientSearchInputChange(e){


        if (e !== " " || e !== "  " || e !== "   ") {
            loadAndFilterData(e);
        }
    }
    function renderRecipeIngredientsComponent(){

        switch (recipeIngredientComponentState) {
            case "search":
                return (
                    <IonCard>
                        <div
                            style={{
                                position: "absolute",
                                right: ".5em",
                                zIndex: "10",
                                cursor: "pointer"
                            }}
                            onClick={() => setRecipeIngredientComponentState("display")}
                        >X</div>
                        <IonCardHeader>

                            <IonCardTitle
                                style={{textAlign: "center"}}
                            >
                                Ingredient Search
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
                                    onIonChange={(e) => onIngredientSearchInputChange(e.target.value)}
                                />

                                <IonIcon size="large" icon={searchIcon}/>

                                <IonButton
                                    onClick={() => setRecipeIngredientComponentState("add")}
                                    size="small" style={{
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
                                            overFlowY: "scroll",
                                            height: "100%",

                                            // backgroundColor: "red"
                                        }}
                                    >

                                        {filteredData && filteredData.map(( data, i ) => (
                                            <IngredientsSearchLoadedDataDisplay
                                                data={data}
                                                key={i}
                                                setInputState={setInputState}
                                                setRecipeIngredientComponentState={setRecipeIngredientComponentState}
                                                setIngredientToBeAdded={setIngredientToBeAdded}
                                                setFilteredData={setFilteredData}
                                                setRecipeIngredientsList={setRecipeIngredientsList}
                                                recipeIngredientsList={recipeIngredientsList}
                                                setIngredientToBeDeleted={setIngredientToBeDeleted}
                                                setEditIngredientDocId={setEditIngredientDocId}


                                            />
                                        ))
                                        }



                                    </div>
                            )}


                        </IonCardContent>
                    </IonCard>
                )
            case "edit":
                return (
                    <div>
                        <EditIngredientNutritionalFacts
                            editIngredientDocId={editIngredientDocId}
                            setEditIngredientDocId={setEditIngredientDocId}
                            setRecipeIngredientComponentState={setRecipeIngredientComponentState}
                        />
                    </div>
                )
            case "add":
                return (
                    <div>

                        <AddIngredientNutritionalFacts
                            setRecipeIngredientComponentState={setRecipeIngredientComponentState}
                        />
                    </div>

                )
            case "add amount":
                return (
                    <div>
                        {/*<AddIngredientAmount*/}
                        {/*    ingredientToBeAdded={ingredientToBeAdded}*/}
                        {/*    setRecipeIngredientComponentState={setRecipeIngredientComponentState}*/}
                        {/*    recipeIngredientsList={recipeIngredientsList}*/}
                        {/*    setRecipeIngredientsList={setRecipeIngredientsList}*/}
                        {/*/>*/}
                        <AddIngredientAmount3
                            ingredientToBeAdded={ingredientToBeAdded}
                            setRecipeIngredientComponentState={setRecipeIngredientComponentState}
                            recipeIngredientsList={recipeIngredientsList}
                            setRecipeIngredientsList={setRecipeIngredientsList}
                        />
                    </div>

                )
            case "display":
                return (
                    <RecipeIngredientsDisplay
                        setRecipeIngredientComponentState={setRecipeIngredientComponentState}
                        setRecipeIngredientsList={setRecipeIngredientsList}
                        recipeIngredientsList={recipeIngredientsList} />
                )
        }
    }

    return (<div>
        {renderRecipeIngredientsComponent()}
    </div>)
}

function RecipeSearchLoadedDataDisplay({
   data, setChosenRecipe, setRecipePageStep, setCarouselStep, menuArray, setMenuArray
}){


    function onEditRecipeClick(){
        setChosenRecipe(data)
        setRecipePageStep("edit")
    }

    function onRecipeSelect(){
        setChosenRecipe(data)

        let temp = menuArray;
        temp.push(data);
        setMenuArray(temp)

        console.log(menuArray, temp)
        setCarouselStep("")
    }
    console.log(data)
    return (
        <IonCard >
            <IonCardContent>
                <div  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // backgroundColor: "blue"
                }}>
                    <div style={{display: "flex", width: "100%"}} onClick={() => onRecipeSelect()}>
                        <div
                            // onClick={() => onSearchDataDisplayClick(data)}
                            style={{
                                width: "100%",
                                // backgroundColor: "red"
                            }}>
                            {data.recipeName}

                        </div>
                        <div style={{width: "5em"}}>
                            <img src={data.recipeImgUrl} />
                        </div>
                    </div>


                    <div
                        style={{display: "flex"}}

                    >
                        <div
                            // onClick={() => onDeleteIconClick()}
                        >
                            <IonIcon size="small"
                                     style={{
                                         margin: "0 .5em",
                                         zIndex:"10",
                                         // backgroundColor:"red"
                                     }} icon={deleteIcon}/>

                        </div>
                        <div
                            onClick={() => onEditRecipeClick()}
                        >
                            <IonIcon  size="small"  style={{margin: "0 .5em", zIndex:"10"}}  icon={editIcon}/>
                        </div>
                    </div>

                </div>
            </IonCardContent>

        </IonCard>

    )
}
function EquipmentSearchLoadedDataDisplay({data,
    setInputState, setRecipeEquipmentComponentState, setEquipmentToBeAdded, setFilteredData,
                                          }){


    function onSearchDataDisplayClick(data){
        setInputState("")
        setFilteredData([""])
        setEquipmentToBeAdded(data)
        setRecipeEquipmentComponentState("add amount")

    }

    async function onDeleteIconClick() {


        console.log("delete")

        await deleteEquipment(data.docId).then(() => {
            console.log("Done Deleting")
            setInputState("")
        })


    }

    return (
        <IonCard  style={{ cursor: "pointer"}}>
            {data.imgUrl && (
                <IonCardContent>
                    <div  style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // backgroundColor: "blue"

                    }}
                          onClick={() => onSearchDataDisplayClick(data)}

                    >

                        <div
                            style={{
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
                            <div
                                onClick={() => onDeleteIconClick()}
                            >
                                <IonIcon size="small"
                                         style={{
                                             margin: "0 .5em",
                                             zIndex:"10",
                                             // backgroundColor:"red"
                                         }} icon={deleteIcon}/>

                            </div>
                            <div
                                // onClick={() => onEditIngredientClick()}
                            >
                                <IonIcon  size="small"  style={{margin: "0 .5em", zIndex:"10"}}  icon={editIcon}/>

                            </div>

                        </div>

                    </div>
                </IonCardContent>

            )}


        </IonCard>

    )
}
function IngredientsSearchLoadedDataDisplay({data,
    setInputState, setRecipeIngredientComponentState, setIngredientToBeAdded, setFilteredData,setEditIngredientDocId
                                          }){


    function onSearchDataDisplayClick(data){
        setInputState("")
        setFilteredData([""])
        setIngredientToBeAdded(data)
        setRecipeIngredientComponentState("add amount")

    }

    async function onDeleteIconClick() {


        console.log("delete")

        await deleteIngredient(data.docId).then(() => {
            console.log("Done Deleting")
            setInputState("")
        })


    }

    function onEditIngredientClick(){
        console.log("Showing edit true ", data.ingredientName,data.docId)
        setEditIngredientDocId(data.docId)
        setRecipeIngredientComponentState("edit")
        console.log(data.ingredientName, data.docId)


    }

    return (
        <IonCard  style={{ cursor: "pointer"}}>
            {data.imgUrl && (
                <IonCardContent>
                    <div style={{
                        backgroundColor:"green",
                        display: "flex"
                    }}>
                        <div  style={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: "blue",
                            width: "100%"

                        }}
                              onClick={() => onSearchDataDisplayClick(data)}

                        >

                            <div
                                style={{
                                    width: "100%",
                                    backgroundColor: "red"
                                }}>
                                {data.ingredientName}

                            </div>
                            <div
                                // style={{, height: "5em"}}
                            >
                                <img
                                    style={{
                                        objectFit: "contain",
                                        height:"5em",
                                    }}
                                    src={data.imgUrl} />
                            </div>
                            <div
                                style={{display: "flex"}}

                            >


                            </div>



                        </div>
                        <div
                            onClick={() => onDeleteIconClick()}
                        >
                            <IonIcon size="small"
                                     style={{
                                         margin: "0 .5em",
                                         zIndex:"10",
                                         // backgroundColor:"red"
                                     }} icon={deleteIcon}/>

                        </div>
                        <div
                            onClick={() => onEditIngredientClick()}
                        >

                            <IonIcon  size="small"  style={{margin: "0 .5em", zIndex:"10"}}  icon={editIcon}/>

                        </div>

                    </div>

                </IonCardContent>

            )}


        </IonCard>

    )
}
function AddNewEquipmentComponent({
                                      setRecipeEquipmentComponentState
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
        setRecipeEquipmentComponentState("search")
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
        setRecipeEquipmentComponentState("search")

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
                        onClick={() => setRecipeEquipmentComponentState("search")}
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
                                        <img src={equipmentUploadedUrl}  alt="uploaded image of equipment"/>
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
function AddNewIngredientComponent({
                                      setRecipeIngredientComponentState
                                  }){

    const [newIngredientName, setNewIngredientName] = useState("")
    const imageInputRef = useRef();

    const [ingredientUploadedUrl, setIngredientUploadedUrl ] = useState("")
    const letters = /^[A-Za-z]+$/

    useEffect(() => {
        console.log(ingredientUploadedUrl)
    }, [ingredientUploadedUrl])

    const handleFileChangeImage = async (event) => {

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrl = await saveNewIngredientPicture(pictureUrlConst, newIngredientName)

            console.log(imgUrl)
            setIngredientUploadedUrl(imgUrl)


        }

    };

    function onCancelAddNewIngredient(){
        setRecipeIngredientComponentState("search")
    }

    async function onSaveIngredient() {
        await addNewEquipment(newIngredientName, ingredientUploadedUrl);
        console.log("saving ingredient")
        setRecipeIngredientComponentState("search")

    }

    function renderAddNewIngredientComponent(){

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
                        onClick={() => setRecipeIngredientComponentState("search")}
                    >X</div>
                    <IonCardTitle>
                        Add New Ingredient
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem fill="solid">
                        <IonLabel position="floating">Ingredient Name</IonLabel>

                        <IonInput
                            value={newIngredientName}
                            // style={{
                            //     border: "none",
                            //     width: "100%"
                            // }}
                            // onClick={() => searchClicked()}
                            type="text"
                            onIonChange={(e) => setNewIngredientName(e.target.value)}
                        />
                    </IonItem>
                    {newIngredientName &&
                        newIngredientName !== " " &&
                        newIngredientName !== "  " &&
                        newIngredientName !== "   " &&
                        newIngredientName !== "    " &&
                        newIngredientName !== "     " &&
                        newIngredientName !== "      " &&
                        newIngredientName !== "       " &&
                        newIngredientName !== "         " &&
                        newIngredientName.length > 2 &&
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
                                    {ingredientUploadedUrl === "" ?  (
                                        <div style={{
                                            width: "fit-content",
                                            margin: "auto",
                                            backgroundColor: "red"}}>Add Photo</div>

                                    ): (
                                        <img src={ingredientUploadedUrl}  alt="uploaded image of ingredient"/>
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
                                    <IonButton onClick={() => onCancelAddNewIngredient()} color="danger">Cancel</IonButton>
                                    <IonButton onClick={() => onSaveIngredient()}>Save</IonButton>
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
            {renderAddNewIngredientComponent()}
        </div>
    )
}
function AddEquipmentAmount({equipmentToBeAdded, setRecipeEquipmentComponentState, recipeEquipmentList, setRecipeEquipmentList,}){

    const [ equipmentAmount, setEquipmentAmount ] = useState(0)
    const [buttonEnabled, setButtonEnabled ] = useState(false)


    console.log(equipmentToBeAdded)

    useEffect(() =>{

        if (  equipmentAmount > 0){
            setButtonEnabled(true)
            console.log("Setting Button True")
        }else{
            setButtonEnabled(false)
            console.log("Setting Button False")

        }
    },[ equipmentAmount, ])

    function onCancelClick(){
        setRecipeEquipmentComponentState("search")
    }

    function onSaveEquipmentToList(){

        let temp = [...recipeEquipmentList]
        console.log(temp)

        const isSearched = (element) => (
            element.equipmentName?.toLowerCase().includes(equipmentToBeAdded.equipmentName?.toLowerCase())

        )

        let result1 = temp.filter(isSearched)
        console.log(result1)
        let temp1 = recipeEquipmentList;
        console.log(recipeEquipmentList[0])
        if (recipeEquipmentList.length === 1 && recipeEquipmentList[0] === ' '){
            // temp1[0] =
            // let temp3 =
            // console.log( temp1)
            console.log({equipmentToBeAdded, equipmentAmount})
            setRecipeEquipmentList([{...equipmentToBeAdded, equipmentAmount}])

        }else if (recipeEquipmentList[0] !== ' ' && result1.length === 0){
            console.log(recipeEquipmentList, equipmentToBeAdded, equipmentAmount)

            setRecipeEquipmentList([...recipeEquipmentList, {...equipmentToBeAdded, equipmentAmount}])
        }else{
            let result2 = {...result1[0], equipmentAmount,}
            console.log(result2)
            temp1[(temp1.length - 1)] = result2;
            console.log( temp1)
            setRecipeEquipmentList([...temp1])

        }


        setRecipeEquipmentComponentState("display")


    }

    if ( equipmentToBeAdded !== "" ){
        console.log(equipmentToBeAdded)

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
                        <input min={0} className="add-ingredient-amount-card-input" value={equipmentAmount} type="number"
                               onChange={(e) => {setEquipmentAmount(e.target.value)}}/>

                    </div>
                    <div style={{
                        // border:"solid",
                        display:"flex",
                        justifyContent: "space-between",
                        width:"75%",
                        margin: " 1em auto",
                    }}>
                        <IonButton
                            onClick={() => onCancelClick(false)}
                            color="danger" >cancel</IonButton>
                        <IonButton
                            onClick={() => onSaveEquipmentToList()}
                            disabled={!buttonEnabled}
                            color="secondary"  >save</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }


}

function AddIngredientAmount({ingredientToBeAdded, setRecipeIngredientComponentState, recipeIngredientsList, setRecipeIngredientsList,}){

    const [ ingredientAmount, setIngredientAmount ] = useState(0)
    const [buttonEnabled, setButtonEnabled ] = useState(false)


    console.log(ingredientToBeAdded)

    useEffect(() =>{

        if (  ingredientAmount > 0){
            setButtonEnabled(true)
            console.log("Setting Button True")
        }else{
            setButtonEnabled(false)
            console.log("Setting Button False")

        }
    },[ ingredientAmount, ])

    function onCancelClick(){
        setRecipeIngredientComponentState("search")
    }

    function onSaveIngredientToList(){

        let temp = [...recipeIngredientsList]
        console.log(temp)

        const isSearched = (element) => (
            element.ingredientName?.toLowerCase().includes(ingredientToBeAdded.ingredientName?.toLowerCase())

        )

        let result1 = temp.filter(isSearched)
        console.log(result1)
        let temp1 = recipeIngredientsList;
        console.log(recipeIngredientsList[0])
        if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' '){

            console.log({ingredientToBeAdded, ingredientAmount})
            setRecipeIngredientsList([{...ingredientToBeAdded, ingredientAmount, }])

        }else if (recipeIngredientsList[0] !== ' ' && result1.length === 0){
            console.log(recipeIngredientsList, ingredientToBeAdded, ingredientAmount)

            setRecipeIngredientsList([...recipeIngredientsList, {...ingredientToBeAdded, ingredientAmount,}])
        }else{
            let result2 = {...result1[0], ingredientAmount, }
            console.log(result2)
            temp1[(temp1.length - 1)] = result2;
            console.log( temp1)
            setRecipeIngredientsList([...temp1])

        }


        setRecipeIngredientComponentState("display")


    }

    if ( ingredientToBeAdded !== "" ){
        console.log(ingredientToBeAdded)

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
                        <input min={0} className="add-ingredient-amount-card-input" value={ingredientAmount} type="number"
                               onChange={(e) => {setIngredientAmount(e.target.value)}}/>

                    </div>
                    <div style={{
                        // border:"solid",
                        display:"flex",
                        justifyContent: "space-between",
                        width:"75%",
                        margin: " 1em auto",
                    }}>
                        <IonButton
                            onClick={() => onCancelClick(false)}
                            color="danger" >cancel</IonButton>
                        <IonButton
                            onClick={() => onSaveIngredientToList()}
                            disabled={!buttonEnabled}
                            color="secondary"  >save</IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }


}

function AddIngredientAmount3({
                                  recipeIngredientsList,
                                  setRecipeIngredientsList,
                                  ingredientToBeAdded,
                                  setRecipeIngredientComponentState,
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

        // console.log(recipeIngredientsList)
        // let temp = [...recipeIngredientsList]
        // console.log(temp)
        //
        // const isSearched = (element) => (
        //     element.ingredientName?.toLowerCase().includes(ingredientToBeAdded.ingredientName?.toLowerCase())
        //
        // )
        //
        // let result = temp.filter(isSearched)
        // console.log(result)
        // result = {...result[0], ingredientAmount, gramsOrCups}
        // console.log(result)
        //
        // let temp1 = recipeIngredientsList;
        // temp1[(temp1.length - 1)] = result;
        //
        // setRecipeIngredientsList([...temp1])
        // setRecipeIngredientComponentState("display")
        // console.log(recipeIngredientsList, temp1)
// ^^^^^old function below is the new one created from the other add ingredient which was missing gramsOrCups
        let temp = [...recipeIngredientsList]
        console.log(temp)

        const isSearched = (element) => (
            element.ingredientName?.toLowerCase().includes(ingredientToBeAdded.ingredientName?.toLowerCase())

        )

        let result1 = temp.filter(isSearched)
        console.log(result1)
        let temp1 = recipeIngredientsList;
        console.log(recipeIngredientsList[0])
        if (recipeIngredientsList.length === 1 && recipeIngredientsList[0] === ' '){

            console.log({ingredientToBeAdded, ingredientAmount})
            setRecipeIngredientsList([{...ingredientToBeAdded, ingredientAmount, gramsOrCups}])

        }else if (recipeIngredientsList[0] !== ' ' && result1.length === 0){
            console.log(recipeIngredientsList, ingredientToBeAdded, ingredientAmount, gramsOrCups)

            setRecipeIngredientsList([...recipeIngredientsList, {...ingredientToBeAdded, ingredientAmount, gramsOrCups}])
        }else{
            let result2 = {...result1[0], ingredientAmount, gramsOrCups}
            console.log(result2)
            temp1[(temp1.length - 1)] = result2;
            console.log( temp1)
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
                <div style={{ width: "fit-content", margin: "auto", display: "flex"}}>
                    <input style={{width: "6em"}} value={ingredientAmount} type="number" onChange={(e) => {setIngredientAmount(e.target.value)}}/>
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
                    <IonButton onClick={() => setRecipeIngredientComponentState("search")} color="danger" >cancel</IonButton>
                    <IonButton onClick={() => onSaveIngredientToList()} disabled={!buttonEnabled} color="secondary"  >save</IonButton>
                </div>
            </IonCardContent>
        </IonCard>
    )
}



function RecipeIngredientsDisplay({recipeIngredientsList, setRecipeIngredientsList,
                                    setRecipeIngredientComponentState
                                }){

    const [showImage, setShowImage ] = useState(false)



    return (
        <div style={{
            margin: "1em",
            border:"solid thin"

        }}>
            <div style={{margin: "auto",
                width: "fit-content",
                display: "flex"
            }}>

                <IonIcon
                    onClick={() => setShowImage(false)}
                    style={{
                        fontSize: "32px",
                        color: showImage === true ? ("black") : ("blue"),
                        cursor: "pointer",

                    }} icon={listOutline}/>
                <IonIcon
                    onClick={() => setShowImage(true)}
                    style={{
                        fontSize: "32px",
                        cursor: "pointer",
                        color: showImage === true ? ("blue") : ("black")
                    }} icon={imageOutline}/>

            </div>
            <div>
                {recipeIngredientsList.length > 0 && (
                    <div style={{
                        // width:"fit-content",
                        fontSize: ".6rem", height: "fit-content",
                        // flexWrap: "wrap",
                        zIndex: "0",
                        display: "flex",
                        overflowX: "scroll",

                        padding: "0em",
                        flexDirection: "column",
                    }}>
                        {showImage ? (
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                {recipeIngredientsList && recipeIngredientsList.map((data , i) => (

                                    <AddedIngredientDisplayComponent
                                        data={data}
                                        i={i}
                                        setRecipeIngredientsList={setRecipeIngredientsList}
                                        recipeIngredientsList={recipeIngredientsList}
                                    />
                                ))}
                            </div>
                        ):(
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                {recipeIngredientsList && recipeIngredientsList.map((data , i) => (
                                    // <div>List component</div>
                                    <AddedIngredientsListComponent
                                        data={data}
                                        key={i}
                                        i={i}
                                        setRecipeIngredientsList={setRecipeIngredientsList}
                                        recipeIngredientsList={recipeIngredientsList}
                                    />


                                ))}
                            </div>
                        )}



                    </div>
                )}
            </div>
            <IonButton fill="solid"
                       expand="block"
                       style={{
                // width: "fit-content",

                height: "3em", fontSize: ".7rem"
            }}
                       onClick={() => setRecipeIngredientComponentState("search")}
            >
                + Ingredient
            </IonButton>
        </div>

    )

}
function RecipeEquipmentDisplay({
                                    recipeEquipmentList, setRecipeEquipmentList,

                                    setRecipeEquipmentComponentState
                                }){

    const [showImage, setShowImage ] = useState(false)



    return (
        <div style={{
            margin: "1em",
            border:"solid thin"

        }}>
            <div style={{margin: "auto",
                width: "fit-content",
                display: "flex"
            }}>

                <IonIcon
                    onClick={() => setShowImage(false)}
                    style={{
                        fontSize: "32px",
                        color: showImage === true ? ("black") : ("blue"),
                        cursor: "pointer",

                    }} icon={listOutline}/>
                <IonIcon
                    onClick={() => setShowImage(true)}
                    style={{
                        fontSize: "32px",
                        cursor: "pointer",
                        color: showImage === true ? ("blue") : ("black")
                    }} icon={imageOutline}/>

            </div>
            <div>
                {recipeEquipmentList.length > 0 && (
                    <div style={{
                        // width:"fit-content",
                        fontSize: ".6rem", height: "fit-content",
                        // flexWrap: "wrap",
                        zIndex: "0",
                        display: "flex",
                        overflowX: "scroll",

                        padding: "0em",
                        flexDirection: "column",
                    }}>
                        {showImage ? (
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                {recipeEquipmentList && recipeEquipmentList.map((data , i) => (

                                    <AddedEquipmentDisplayComponent
                                        data={data}
                                        i={i}
                                        setRecipeEquipmentList={setRecipeEquipmentList}
                                        recipeEquipmentList={recipeEquipmentList}
                                    />
                                ))}
                            </div>
                        ):(
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                {recipeEquipmentList && recipeEquipmentList.map((data , i) => (
                                    // <div>List component</div>
                                    <AddedEquipmentListComponent
                                        data={data}
                                        key={i}
                                        i={i}
                                        setRecipeEquipmentList={setRecipeEquipmentList}
                                        setRecipeEquipmentComponentState={setRecipeEquipmentComponentState}
                                        recipeEquipmentList={recipeEquipmentList}
                                    />


                                ))}
                            </div>
                        )}



                    </div>
                )}
            </div>
            <IonButton fill="solid"
                       expand="block"
                       style={{
                // width: "fit-content",

                height: "3em", fontSize: ".7rem"
            }}
                       onClick={() => setRecipeEquipmentComponentState("search")}
            >
                + Equipment
            </IonButton>
        </div>

    )

}
function AddedEquipmentDisplayComponent({
                                            data, i, recipeEquipmentList, setRecipeEquipmentList
                                        }){

    const [updatingData, setUpdatingData ] = useState(false)
    useEffect(() => {
        console.log("Display component useeffect")
        setUpdatingData(false)
    }, [updatingData])
    function onDecreaseEquipmentAmount(){
        console.log(data)
        setUpdatingData(true)

        data.equipmentAmount = parseInt(data.equipmentAmount) - 1;
        console.log(data)
    }
    function onAddAmountToData(){
        console.log(data)

        setUpdatingData(true)


        data.equipmentAmount = parseInt(data.equipmentAmount) + 1;
        console.log(data)


    }

    function onDeleteEquipmentFromListClick(){
        let temp = [...recipeEquipmentList]


        temp.splice(i,1)
        setRecipeEquipmentList(temp)
    }
    return (

        <IonCard   style={{
            minWidth: "10em",
            textAlign: "center",
            zIndex: "0",
            height: "fit-content",


        }}>
            <IonCardHeader>
                <IonCardTitle style={{
                    fontSize: ".8rem"
                }}>
                    {data.equipmentName}

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
                        height: "4em",

                    }} src={data.imgUrl} />

                </div>
                <div style={{
                    border: "solid thin",
                    width: "fit-content",
                    display: "flex",
                    height: "100%",
                    flexFlow: "row",
                    margin: "auto",
                }}>

                    <div><IonIcon
                        onClick={ parseInt(data.equipmentAmount) === 1  ? (() => onDeleteEquipmentFromListClick()):(() => onDecreaseEquipmentAmount())}
                        style={{fontSize: "20px",
                            // border: "solid",
                            height:"100%",
                            color: "black",
                            cursor: "pointer",

                        }} icon={subtractIcon} /></div>
                    <div  style={{fontSize: "16px",
                        // border: "solid",
                        height: "100%",
                        margin: "auto .3em",
                        cursor: "default"
                    }}>{data.equipmentAmount}</div>
                    <div><IonIcon
                        onClick={() => onAddAmountToData()}
                        style={{fontSize: "20px",
                            cursor: "pointer",
                            color: "black",
                            // border: "solid",
                            height:"100%"
                        }} icon={addIcon} /></div>

                </div>

            </IonCardContent>
            <IonIcon size="small"
                onClick={() => onDeleteEquipmentFromListClick()}
                     style={{ zIndex:"10"}} icon={deleteIcon}/>
        </IonCard>
    )

}
function AddedIngredientDisplayComponent({
                                            data, i, recipeIngredientsList, setRecipeIngredientsList
                                        }){

    const [updatingData, setUpdatingData ] = useState(false)
    useEffect(() => {
        console.log("Display component useeffect")
        setUpdatingData(false)
    }, [updatingData])
    function onDecreaseAmount(){
        console.log(data)
        setUpdatingData(true)

        data.ingredientAmount = parseInt(data.ingredientAmount) - 1;
        console.log(data)
    }
    function onAddAmountToData(){
        console.log(data)

        setUpdatingData(true)


        data.ingredientAmount = parseInt(data.ingredientAmount) + 1;
        console.log(data)


    }

    function onDeleteIngredientFromListClick(){
        let temp = [...recipeIngredientsList]


        temp.splice(i,1)
        setRecipeIngredientsList(temp)
    }
    return (

        <IonCard   style={{
            minWidth: "10em",
            textAlign: "center",
            zIndex: "0",
            height: "fit-content",


        }}>
            <IonCardHeader>
                <IonCardTitle style={{
                    fontSize: ".8rem"
                }}>
                    {data.ingredientName}

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
                        height: "4em",

                    }} src={data.imgUrl} />

                </div>
                <div style={{
                    border: "solid thin",
                    width: "fit-content",
                    display: "flex",
                    height: "100%",
                    flexFlow: "row",
                    margin: "auto",
                }}>

                    <div><IonIcon
                        onClick={ parseInt(data.ingredientAmount) === 1  ? (() => onDeleteIngredientFromListClick()):(() => onDecreaseAmount())}
                        style={{fontSize: "20px",
                            // border: "solid",
                            height:"100%",
                            color: "black",
                            cursor: "pointer",

                        }} icon={subtractIcon} /></div>
                    <div  style={{fontSize: "16px",
                        // border: "solid",
                        height: "100%",
                        margin: "auto .3em",
                        cursor: "default"
                    }}>{data.ingredientAmount} {data.gramsOrCups}</div>
                    <div><IonIcon
                        onClick={() => onAddAmountToData()}
                        style={{fontSize: "20px",
                            cursor: "pointer",
                            color: "black",
                            // border: "solid",
                            height:"100%"
                        }} icon={addIcon} /></div>

                </div>

            </IonCardContent>
            <IonIcon size="small"
                onClick={() => onDeleteIngredientFromListClick()}
                     style={{ zIndex:"10"}} icon={deleteIcon}/>
        </IonCard>
    )

}

function AddedEquipmentListComponent({ i,
                                          data,
                                          setRecipeEquipmentList,
                                          recipeEquipmentList,
                                      }){


    // async function onDeleteIconClick() {
    //
    //     console.log(index)
    //
    //     const tempArray = recipeEquipmentList
    //
    //     tempArray.splice(index, 1)
    //     console.log(tempArray)
    //     let newTempArray= [];
    //     tempArray.map(val => {
    //         if( val !== undefined){
    //             console.log("Not an undefined val")
    //             newTempArray = [...newTempArray, val]
    //         }
    //
    //     })
    //     setRecipeEquipmentList(newTempArray)
    //     console.log("old", tempArray, "new ", newTempArray)
    // }
    //
    const [updatingData, setUpdatingData ] = useState(false)

    useEffect(() => {
        console.log("Display component useeffect")
        setUpdatingData(false)
    }, [updatingData])
    function onDecreaseEquipmentAmount(){
        console.log(data)
        setUpdatingData(true)

        data.equipmentAmount = parseInt(data.equipmentAmount) - 1;
        console.log(data)
    }
    function onAddAmountToData(){
        console.log(data)

        setUpdatingData(true)


        data.equipmentAmount = parseInt(data.equipmentAmount) + 1;
        console.log(data)


    }

    function onDeleteEquipmentFromListClick(){
        let temp = [...recipeEquipmentList]
        temp.splice(i,1)
            setRecipeEquipmentList(temp)
    }
    console.log(data)
    return (
        <div  style={{display: "flex",
            border: "solid thin",
            justifyContent: "space-between"}}>
           <div style={{
               flexDirection: "row",
               display:"flex",
               // border:"solid",
               width: "90%",
               justifyContent:"space-evenly"


           }}>
               <div style={{margin:"0 .5em",
                   // border: "solid yellow",
                   width: "80%",
                   fontSize: "1.2rem"}}>
                   {data.equipmentName}
               </div>

               <div style={{
                   // border: "solid thin",
                   width: "fit-content",
                   display: "flex",
                   height: "100%",
                   flexFlow: "row",
                   margin: "auto",
               }}>

                   <div><IonIcon
                       onClick={ parseInt(data.equipmentAmount) === 1  ? (() => onDeleteEquipmentFromListClick()):(() => onDecreaseEquipmentAmount())}
                       style={{fontSize: "20px",
                           // border: "solid",
                           height:"100%",
                           color: "black",
                           cursor: "pointer",

                       }} icon={subtractIcon} /></div>
                   <div  style={{fontSize: "16px",
                       // border: "solid red",
                       alignSelf: "center",
                       height: "fit-content",
                       margin: "auto .3em",
                       cursor: "default"
                   }}>{data.equipmentAmount}</div>
                   <div><IonIcon
                       onClick={() => onAddAmountToData()}
                       style={{fontSize: "20px",
                           cursor: "pointer",
                           color: "black",
                           // border: "solid",
                           height:"100%"
                       }} icon={addIcon} /></div>

               </div>
           </div>


            <div
                style={{
                    // backgroundColor: "red"
                    width:"fit-content",

                    marginRight: "1em"
                }}
            >

                <IonIcon size="small"
                         onClick={() => onDeleteEquipmentFromListClick()}
                         style={{ zIndex:"10"}} icon={deleteIcon}/>

            </div>
        </div>

    )


}


function AddedIngredientsListComponent({ i,
                                          data,
                                          setRecipeIngredientsList,
                                          recipeIngredientsList,
                                      }){


    const [updatingData, setUpdatingData ] = useState(false)

    useEffect(() => {
        console.log("Display component useeffect")
        setUpdatingData(false)
    }, [updatingData])
    function onDecreaseAmount(){
        console.log(data)
        setUpdatingData(true)

        data.ingredientAmount = parseInt(data.ingredientAmount) - 1;
        console.log(data)
        let temp = recipeIngredientsList;
        temp.splice(i,1, data)
        console.log(temp, "Decreased AMOUNT TO INGREDIENT")
        setRecipeIngredientsList([...temp])
    }
    function onAddAmountToData(){
        console.log(data)

        setUpdatingData(true)


        data.ingredientAmount = parseInt(data.ingredientAmount) + 1;
        console.log(data)

        let temp = recipeIngredientsList;
        temp.splice(i,1, data)
        console.log(temp, "ADDED AMOUNT TO INGREDIENT")
        setRecipeIngredientsList([...temp])


    }

    function onDeleteIngredientFromListClick(){
        let temp = [...recipeIngredientsList]


        temp.splice(i,1)
        setRecipeIngredientsList(temp)
    }
    console.log(data)
    return (
        <div  style={{display: "flex",
            border: "solid thin",
            justifyContent: "space-between"}}>
           <div style={{
               flexDirection: "row",
               display:"flex",
               // border:"solid",
               width: "90%",
               justifyContent:"space-evenly"


           }}>
               <div style={{margin:"0 .5em",
                   // border: "solid yellow",
                   width: "70%",
                   fontSize: "1.2rem"}}>
                   {data.ingredientName}
               </div>

               <div style={{
                   // border: "solid thin",
                   width: "fit-content",
                   display: "flex",
                   height: "100%",
                   flexFlow: "row",
                   margin: "auto",
               }}>

                   <div><IonIcon
                       onClick={ parseInt(data.ingredientAmount) === 1  ? (() => onDeleteIngredientFromListClick()):(() => onDecreaseAmount())}
                       style={{fontSize: "20px",
                           // border: "solid",
                           height:"100%",
                           color: "black",
                           cursor: "pointer",

                       }} icon={subtractIcon} /></div>
                   <div  style={{fontSize: "16px",
                       // border: "solid red",
                       alignSelf: "center",
                       // display: "flex",
                       height: "fit-content",
                       margin: "auto .3em",
                       cursor: "default",
                       width:"fit-content"
                   }}>{data.ingredientAmount} {data.gramsOrCups}</div>
                   <div><IonIcon
                       onClick={() => onAddAmountToData()}
                       style={{fontSize: "20px",
                           cursor: "pointer",
                           color: "black",
                           // border: "solid",
                           height:"100%"
                       }} icon={addIcon} /></div>

               </div>
           </div>


            <div
                style={{
                    // backgroundColor: "red"
                    width:"fit-content",

                    marginRight: "1em"
                }}
            >

                <IonIcon size="small"
                         onClick={() => onDeleteIngredientFromListClick()}
                         style={{ zIndex:"10"}} icon={deleteIcon}/>

            </div>
        </div>

    )


}

function RecipeStepsListComponent({recipeStepsListTextArray, setRecipeStepsListTextArray, recipeName, recipeId,
                                      tempPictureUrlArray,
                                      setTempPictureUrlArray,
                                  }){

    const [ updatingStepsList, setUpdatingStepsList ] = useState(false)


    useEffect(() => {
        console.log("Updating StepsList", updatingStepsList, recipeStepsListTextArray)

        if ( updatingStepsList === true ){
            setUpdatingStepsList(false)

        }else{
            console.log("FALSE StepsList", updatingStepsList, recipeStepsListTextArray)

        }
    },[updatingStepsList])

    function renderRecipeStepsList(){

            return (
                <div style={{backgroundColor: "rgba(255,241,90,0.1)"}}>

                    <div style={{textAlign: "center", fontSize:"1.2rem"}}> Cooking Directions</div>
                    {!updatingStepsList && recipeStepsListTextArray.map((d,i) => (
                        <StepsListListComponent
                            recipeStepsListTextArray={recipeStepsListTextArray}
                            recipeId={recipeId}
                            recipeName={recipeName}
                            key={i}
                            setUpdatingStepsList={setUpdatingStepsList}
                            index={i}
                            // updatingStepsList={updatingStepsList}
                            setRecipeStepsListTextArray={setRecipeStepsListTextArray}
                            tempPictureUrlArray={tempPictureUrlArray}
                            setTempPictureUrlArray={setTempPictureUrlArray}

                        />
                    ))}
                </div>
            )

    }
    return (
        <div>
            {renderRecipeStepsList()}
        </div>

    )

}

function StepsListListComponent({
                                     recipeStepsListTextArray, setRecipeStepsListTextArray,
                                     index, setUpdatingStepsList, editingStep, setEditingStep, recipeName, recipeId,
    tempPictureUrlArray, setTempPictureUrlArray,
                                 }){


    let initialUrlArr = []
    recipeStepsListTextArray[index].pictureUrlArray?.map((url, i) => {
        initialUrlArr = [...initialUrlArr, url];

    })


    const [pictureUrlArray, setPictureUrlArray ] = useState(initialUrlArr)
    console.log(initialUrlArr, index, pictureUrlArray, tempPictureUrlArray)

    const [addingVideo, setAddingVideo ] = useState(false)
    const [videoUrl, setVideoUrl ] = useState(recipeStepsListTextArray[index].videoUrl ? (recipeStepsListTextArray[index].videoUrl):("") )
    // const [videoUrl, setVideoUrl ] = useState("")
    const [optionsUseSate, setOptionsUseState ] = useState("")



    const [updatingPictureArray, setUpdatingPictureArray ] = useState(false)
    // console.log(pictureUrlArray)

    const [textAreaHeight, setTextAreaHeight ] = useLocalStorage(`textAreaHeight${index}`,"10em")

    const [stepDateId, setStepDateId ] = useState(undefined)

    const [ stepInputData, setStepInputData ] = useState(
        (recipeStepsListTextArray.length-1) < index  ?
            ("") :
            (recipeStepsListTextArray[index].stepInputData))

    console.log(stepInputData)

    async function deleteTempPictureFromFbStorage(data,i) {
        //aslo delete tempPictureUrlArray
        console.log(data)
        await deleteStepPicture(recipeId, recipeName, data.dateId, data.imgId)
        let tempArray = tempPictureUrlArray;
        tempArray.splice(i, 1)
        setTempPictureUrlArray(tempArray)
        setUpdatingPictureArray(true)

    }


    useEffect(() => {

        console.log(stepDateId, pictureUrlArray[0]?.dateId,pictureUrlArray.length)

        if (stepDateId === undefined && pictureUrlArray.length === 0 ){
            let date = new Date();
            setStepDateId(date.toISOString())

        }else if (stepDateId === undefined && pictureUrlArray[0]?.dateId !== undefined){
            setStepDateId(pictureUrlArray[0].dateId)
        }
        console.log(stepDateId)

        console.log(pictureUrlArray, videoUrl, tempPictureUrlArray)


        if (updatingPictureArray === true){
            setUpdatingPictureArray(false)
        }




    },[updatingPictureArray, recipeStepsListTextArray, stepInputData, tempPictureUrlArray])



    const imageInputRef = useRef();
    const textAreaRef = useRef();



    async function onAddDataClick() {
        let temp = [...recipeStepsListTextArray]
        console.log(temp, tempPictureUrlArray)
        const date = new Date();
        console.log( stepDateId)

        let tempObj = {
            stepInputData,
            pictureUrlArray: tempPictureUrlArray, videoUrl,
            dateId: stepDateId,
            // dateId: tempPictureUrlArray[0]?.dateId === undefined ? (date.toISOString()): (tempPictureUrlArray[0]?.dateId)
        }

        let res = await onSaveRecipeCookingInstruction(tempObj, recipeId)
        console.log( res ,tempObj)
        temp[index] = tempObj;
        console.log(temp)

        setPictureUrlArray([...tempPictureUrlArray])
        setTempPictureUrlArray([])
        console.log(tempPictureUrlArray, pictureUrlArray)
        setRecipeStepsListTextArray([...temp, ""])

        // setUpdatingStepsList(true)
    }

    function onDeleteDataClick(){


        console.log(index, recipeStepsListTextArray, stepInputData, stepDateId)

        const tempArray = recipeStepsListTextArray

        tempArray.splice(index, 1)
        console.log(tempArray)
        let newTempArray= [];
        tempArray.map(val => {
            if( val !== undefined){
                console.log("Not an undefined val")
                newTempArray = [...newTempArray, val]
            }

        })
        setRecipeStepsListTextArray(newTempArray)
        setStepInputData("")
        console.log("old", tempArray, "new ", newTempArray)
        setUpdatingStepsList(true)


        //add vidoe url and work on deleting it
        deleteCookingStep(recipeId, recipeName, stepDateId, pictureUrlArray, newTempArray)
        // onDeleteVideoClick()
        // pictureUrlArray.map((pic, i) => {
        //     onDeletePictureClick(i)
        // })
    }

    function onTextAreaChange(e){
        console.log(e)

        setStepInputData(e)
        let tempInputData = e;
        console.log(tempInputData)

        if (recipeStepsListTextArray.length > (index + 1)){
            let temp = [...recipeStepsListTextArray]
            console.log(temp)
            temp[index] = tempInputData;
            console.log(temp)
            setRecipeStepsListTextArray([...temp])
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



            // let tempPictureArr = pictureUrlArray;
            let tempPictureArr = tempPictureUrlArray;

            tempPictureArr.push(pictureUrlConst);
            console.log(tempPictureArr)

            let imgUrlAndId = await saveImage2(pictureUrlConst, tempPictureArr.length-1)

            imgUrlAndId = {...imgUrlAndId,recipeId, recipeName}
            tempPictureArr.splice(tempPictureArr.length-1, 1, imgUrlAndId);
            console.log(tempPictureArr)



            setTempPictureUrlArray(tempPictureArr)
            // setPictureUrlArray(tempPictureArr)
            setUpdatingPictureArray(true)

        }

    };

    const saveImage2 = async (imgUrl, imgIndex) => {

        console.log(imgUrl, imgIndex)
        console.log(recipeStepsListTextArray)


        if (imgUrl){
            if(imgUrl.startsWith('blob:')){
                console.log("saving picture",imgUrl, )

                const entryData = {imgUrl: imgUrl}
                // setAddingToFirebase(true)
                console.log(recipeName)
                let ret;

                if (imgIndex === 0){
                     ret =  await saveRecipeStepPicture(imgUrl, stepDateId, recipeName, recipeId, stepDateId)

                }else {
                    let dateId = new Date()

                     ret =  await saveRecipeStepPicture(imgUrl, stepDateId, recipeName, recipeId, dateId.toISOString())

                }


                console.log(ret);
                entryData.imgId = ret.imgId
                entryData.imgUrl = ret.url
                entryData.dateId = ret.dateId
                console.log(entryData);
                // setAddingToFirebase(false)
                return entryData;
            }
        }
    }


    async function onDeleteVideoClick() {

        console.log(recipeStepsListTextArray)
        let tempObj = {
            stepInputData,
            pictureUrlArray, videoUrl: "",
            dateId: stepDateId
        }
        console.log(tempObj)
        let res = await deleteStepVideoFromCookingStep(recipeId, stepDateId, recipeName, tempObj)
        console.log(res)

        // let tempRecipeStepList = [...recipeStepsListTextArray]
        // let tempStep = recipeStepsListTextArray[index]
        // tempStep.videoUrl = ""
        // tempRecipeStepList.splice(index, 1, tempStep)
        // console.log(tempRecipeStepList)
        // setRecipeStepsListTextArray([...tempRecipeStepList])
        // let res2 = await updateFirebaseRecipeStepsListTextArray(recipeId, tempRecipeStepList)

        setVideoUrl("")
        setAddingVideo(false)
    }

    async function onDeletePictureClick(i) {

        console.log(recipeStepsListTextArray)


        console.log(pictureUrlArray[i])
        let deleteId = pictureUrlArray[i].imgId

        let tempArray = pictureUrlArray
        tempArray.splice(i, 1)
        console.log(pictureUrlArray, tempArray)

        // let res = await deleteStepArrayPicture(recipeId, pictureUrlArray[i].dateId, recipeName, pictureUrlArray[i].imgId)


        // if (tempArray.length === 0){
        //     console.log("tempArray.length > 0")

            let tempObj = {
                stepInputData,
                pictureUrlArray, videoUrl,
                dateId: stepDateId
            }
            console.log(tempObj)
            let res = await updateStepPictureArray(recipeId, tempObj, recipeName, deleteId)
            console.log(res)

            setPictureUrlArray(tempArray)
            setUpdatingPictureArray(true)

        // }else {
        //     console.log("tempArray.length === 0")
        // }


    }



    // const textAreaStyle = {
    //     minWidth: "100%",
    //     resize: "none",
    //     fontSize: "1.7rem",
    //
    //     border: "none",
    //     backgroundColor: (stepsListTextArray.length - 1) > index ? (""):("rgba(248,209,38,0.11)") ,
    //     maxWidth: "100%",
    //     // height: "3em",
    //     // scrollHeight: "fit-content",
    //     // minHeight: "fit-content",
    // }

    function renderTextArea(){


        function textAreaAdjust(e){
            console.log(textAreaHeight)
            console.log(e.target.style.height)
            console.log(e.target.scrollHeight)

            e.target.style.height = "inherit";
            e.target.style.height = `${e.target.scrollHeight}px`;
            setTextAreaHeight(`${e.target.scrollHeight}px`)


        }



        let textAreaStyle={
            resize: "none",
            fontSize: ".7rem",
            height: textAreaHeight,
            border: "none",
            backgroundColor: (recipeStepsListTextArray.length - 1) > index ? (""):("rgba(248,209,38,0.11)") ,
            width: "100%",
        }


        return (
            <textarea
                onChangeCapture={(e) => textAreaAdjust(e)}
                // onKeyDown={(e) => textAreaAdjust(e)}
                disabled={editingStep}
                value={stepInputData}
                onChange={(e) => onTextAreaChange(e.target.value)}
                style={textAreaStyle}
            ></textarea>
        )

    }




    return (
        <IonCard>
            <div style={{textAlign:"center", }}>
                <div style={{marginRight: ".5em"}}>{index +1}.</div>

            </div>
            <IonCardContent style={{ display: "flex", justifyContent: "space-between", height: "fit-content"}}>


                {/*<div>*/}
                {/*    <div style={{marginRight: ".5em"}}>{index +1}.</div>*/}

                {/*</div>*/}
                <div style={{width: "100%"}}>
                    <div style={{border: "solid", width: "100%"}}>
                        {renderTextArea()}

                        {recipeStepsListTextArray.length === (index + 1 ) && (
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

                                <IonButton
                                    disabled={stepInputData?.length < 10 || stepInputData === undefined}
                                    onClick={() => imageInputRef.current.click()}>
                                    <IonIcon icon={uploadPhotoIcon}/>
                                </IonButton>
                                <IonButton
                                    disabled={addingVideo || stepInputData?.length < 10 || stepInputData === undefined}
                                    onClick={() => setAddingVideo(true)}
                                >
                                    <IonIcon icon={videocamOutline}/>
                                </IonButton>


                            </>


                        )}
                    </div>


                    <div>
                        {videoUrl === "" && addingVideo && (
                            <ReactWebcamTutorial
                                setVideoUrl={setVideoUrl}
                                videoUrl={videoUrl}
                                optionsUseSate={optionsUseSate}
                                setOptionsUseState={setOptionsUseState}
                                stepDateId={stepDateId}
                            />
                        )}
                    </div>
                </div>


                {recipeStepsListTextArray.length > (index + 1) &&(
                    <div style={{display: "flex"}}>

                        <IonButton color="danger" onClick={() => onDeleteDataClick()}>
                            <IonIcon icon={deleteIcon} />
                        </IonButton>

                    </div>

                )}

            </IonCardContent>

            <div style={{display: "flex", height: "fit-content", overflowX:"scroll"}}>
                {pictureUrlArray !== undefined  && pictureUrlArray.map((img, i) => (
                    <div style={{height:"fit-content", margin: "auto",
                        // backgroundColor: "red"
                    }}>
                        {/*<img style={{cursor: "pointer"}} onClick={() => fileInputRef.current.click()} src={pictureUrl} alt=""/>*/}
                        <img style={{cursor: "pointer", objectFit: "contain" ,width: "100px", height:"auto"}}  src={img.imgUrl} alt=""/>


                        {(recipeStepsListTextArray.length-1) === index  && (
                            <div style={{
                                borderRadius:"5px",
                                cursor:"pointer",
                                width: "fit-content",
                                margin:"auto",
                                padding:".4em .6em",
                                backgroundColor: "#EB445A",
                                display:"flex",
                                height:"fit-content",
                            }} >
                                <IonIcon style={{
                                    fontSize:"20px",
                                    color:"white",
                                    // backgroundColor:"red",
                                    margin:"auto",
                                }}
                                         onClick={() => onDeletePictureClick(i)}
                                         icon={deleteIcon}></IonIcon>
                            </div>
                        ) }
                    </div>
                ))}
                {videoUrl !== "" && (
                    <div style={{ display:"flex", flexDirection: "column",height: "auto", width:"100px", margin:"auto",  marginBottom: ".5em"}}>


                        <video style={{
                            transform: "rotateY(180deg)",
                            // margin: "auto",
                            width:"100%"
                        }}  muted  autoPlay loop playsInline={true}

                        >
                            <source src={videoUrl}  type='video/webm; codecs=vp9'/>
                            <source src={videoUrl}  type="video/mp4"/>
                            <source src={videoUrl}  type="video/webm"/>

                        </video>

                        {(recipeStepsListTextArray.length-1) === index  && (
                        <div style={{
                            borderRadius:"5px",
                            cursor:"pointer",
                            width: "fit-content",
                            margin:"auto",
                            padding:".4em .6em",
                            backgroundColor: "#EB445A",
                            display:"flex",
                            height:"fit-content",
                        }} >
                            <IonIcon style={{
                                fontSize:"20px",
                                color:"white",
                                // backgroundColor:"red",
                                margin:"auto",
                            }}
                                     onClick={() => onDeleteVideoClick()}
                                     icon={deleteIcon}></IonIcon>
                        </div>

                        )}

                    </div>
                )}
            </div>
            <div style={{display: "flex", height: "fit-content", overflowX:"scroll"}}>
                {tempPictureUrlArray !== undefined  && tempPictureUrlArray.map((img, i) => (
                    <div style={{height:"fit-content", margin: "auto",
                        // backgroundColor: "red"
                    }}>TEMPPPP
                        {/*<img style={{cursor: "pointer"}} onClick={() => fileInputRef.current.click()} src={pictureUrl} alt=""/>*/}
                        <img style={{cursor: "pointer", objectFit: "contain" ,width: "100px", height:"auto"}}  src={img.imgUrl} alt=""/>


                        {(recipeStepsListTextArray.length-1) === index  && (
                            <div style={{
                                borderRadius:"5px",
                                cursor:"pointer",
                                width: "fit-content",
                                margin:"auto",
                                padding:".4em .6em",
                                backgroundColor: "#EB445A",
                                display:"flex",
                                height:"fit-content",
                            }} >
                                <IonIcon style={{
                                    fontSize:"20px",
                                    color:"white",
                                    // backgroundColor:"red",
                                    margin:"auto",
                                }}
                                         onClick={() => deleteTempPictureFromFbStorage(img, i)}
                                         icon={deleteIcon}></IonIcon>
                            </div>
                        ) }
                    </div>
                ))}
                {videoUrl !== "" && (
                    <div style={{ display:"flex", flexDirection: "column",height: "auto", width:"100px", margin:"auto",  marginBottom: ".5em"}}>


                        <video style={{
                            transform: "rotateY(180deg)",
                            // margin: "auto",
                            width:"100%"
                        }}  muted  autoPlay loop playsInline={true}

                        >
                            <source src={videoUrl}  type='video/webm; codecs=vp9'/>
                            <source src={videoUrl}  type="video/mp4"/>
                            <source src={videoUrl}  type="video/webm"/>

                        </video>

                        {(recipeStepsListTextArray.length-1) === index  && (
                        <div style={{
                            borderRadius:"5px",
                            cursor:"pointer",
                            width: "fit-content",
                            margin:"auto",
                            padding:".4em .6em",
                            backgroundColor: "#EB445A",
                            display:"flex",
                            height:"fit-content",
                        }} >
                            <IonIcon style={{
                                fontSize:"20px",
                                color:"white",
                                // backgroundColor:"red",
                                margin:"auto",
                            }}
                                     onClick={() => onDeleteVideoClick()}
                                     icon={deleteIcon}></IonIcon>
                        </div>

                        )}

                    </div>
                )}
            </div>
            {recipeStepsListTextArray.length === (index + 1) &&(

            <IonButton expand="block" color="warning" disabled={stepInputData?.toString().length < 10 || stepInputData === undefined} onClick={() => onAddDataClick()}>
                Save Step<IonIcon style={{margin:".5em"}} icon={saveOutline}/>
                {console.log(stepInputData)}
            </IonButton>
            )}
        </IonCard>

    )
}

function RecipeNutritionFacts({recipeIngredientsList, recipeIngredientComponentState}){

    const [ nutritionalTotals, setNutritionalTotals ] = useState(0)

    const [ingredientSearchNutritionFacts, setIngredientSearchNutritionFacts ] = useState();
    const [finalMass, setFinalMass ] = useLocalStorage('finalMass', 0)
    const [customAmount, setCustomAmount ] = useState(0)

    // const [done, setDone] = useState(false)
    function loadIngredientFacts(){
//very good function for getting rid of 0's but ened up not even needing it lol
        let temp = {};

        console.log(recipeIngredientsList , temp)

        Object.entries(recipeIngredientsList).forEach(([k, v]) => {

            if (v !== 0 && k !== "docId"  && k !== "gramsOrCups" && k !== "ingredientName" && v !== undefined  ){

                temp[k] = v;

            }
        })
        console.log(ingredientSearchNutritionFacts)

        setIngredientSearchNutritionFacts(temp)

        console.log(temp)
    }
    function calculateRecipeServingTotals(){
        // setCalculatingTotals(true)
        console.log(recipeIngredientsList, "CALCULATING RECIPE NUTRITION TOTALS")

        let temp = [...recipeIngredientsList];

        let ingredientsTotal = [];

        temp.map((ingredient, i) => {

            let ingredientNutrition = Object.fromEntries(Object.entries(ingredient).filter(([k, v]) =>
                (v !== 0 && k !== "gramsPerTbsp"
                    &&  k!== "imgUrl"
                    && k !== "docId"
                    && k !== "ingredientName"
                    && k !== "imgUrl"

            )));

            console.log(ingredient)
            console.log(ingredientNutrition)
            let amount;
            switch (ingredient.gramsOrCups){

                case "item" :

                    amount = parseInt(ingredient.ingredientAmount)
                    Object.entries(ingredient).forEach(([k, v]) => {
                        if (k !== "docId"
                            && k !== "gramsOrCups"
                            && k !== "ingredientName"
                            && k !== "ingredientAmount"
                            && k !== "servingSizeGrams"){

                            ingredientNutrition[k] = v * amount;

                        }
                    })


                    break;
                case "grams" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)
                    amount = parseFloat(ingredient.ingredientAmount)
                    Object.entries(ingredient).forEach(([k, v]) => {
                        if (k !== "docId"
                            && k !== "gramsOrCups"
                            && k !== "ingredientName"
                            && k !== "ingredientAmount"
                            && k !== "ingredientAmount"
                            && k !== "servingSizeGrams"){

                            const newAmount = (amount / ingredient.servingSizeGrams )
                            console.log("NEW AMOUNT GRAMs" ,newAmount)
                            ingredientNutrition[k] = v * newAmount;
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
                    Object.entries(ingredient).forEach(([k, v]) => {
                        if (k !== "docId"
                            && k !== "gramsOrCups"
                            && k !== "ingredientName"
                            && k !== "ingredientAmount"
                            && k !== "imgUrl"
                            && k !== "gramsPerTbsp"
                            && k !== "servingSizeGrams"){

                            const multiplier = (((amount * 16) * ingredient.gramsPerTbsp) / ingredient.servingSizeGrams )
                            console.log("Multiplier " ,multiplier)
                            ingredientNutrition[k] = v * multiplier;

                            // console.log(k,v )
                            //
                            console.log(ingredientNutrition[k], ingredientNutrition)
                        }
                    })

                    break;
                case "tbsp" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)

                    amount = parseFloat(ingredient.ingredientAmount)
                    console.log("AMOUNT tbsp", amount)

                    Object.entries(ingredient).forEach(([k, v]) => {
                        if (k !== "docId"
                            && k !== "gramsOrCups"
                            && k !== "ingredientName"
                            && k !== "ingredientAmount"
                            && k !== "gramsPerTbsp"
                            && k !== "servingSizeGrams"){

                            const multiplier = ((amount * ingredient.gramsPerTbsp )/ ingredient.servingSizeGrams)
                            console.log("MULTIPLIER ====>" ,multiplier)
                            ingredientNutrition[k] = v * multiplier;

                            console.log(ingredientNutrition[k], ingredientNutrition)

                        }
                    })
                    break;
                case "tsp" :
                    console.log(ingredient.ingredientAmount,ingredient.gramsOrCups)
                    amount = parseFloat(ingredient.ingredientAmount)
                    console.log("AMOUNT TSP", amount)
                    Object.entries(ingredient).forEach(([k, v]) => {
                        if (k !== "docId" && k !== "gramsOrCups" && k !== "ingredientName"
                            && k !== "ingredientAmount" && k !== "ingredientAmount" && k !== "servingSizeGrams"){

                            const newAmount = (((amount / 3) * ingredient.gramsPerTbsp) / ingredient.servingSizeGrams)
                            console.log("NEW AMOUNT" ,newAmount)
                            ingredientNutrition[k] = v * newAmount;

                        }
                    })
                    break;
                default:
                    break;
            }
            console.log(parseFloat(ingredientNutrition.servingSizeGrams))
            ingredientNutrition.servingSizeGrams = parseFloat(ingredientNutrition.servingSizeGrams)
            console.log(ingredientNutrition.servingSizeGrams)
            console.log(ingredientNutrition)
            console.log(ingredientsTotal)

            ingredientsTotal = [...ingredientsTotal, ingredientNutrition]

        })
        // console.log( newTemp, ingredientsTotal)


        const result = {}

        ingredientsTotal.forEach(ingredient => {
            for (let [key, value] of Object.entries(ingredient)){
                console.log(result[key], value, key)

                if (result[key]){
                    result[key] += value
                }else {
                    result[key] = value;
                }
            }
        });

        console.log(result, temp)
        let totalCalories=0;
        let  totalCalArr=[];
        temp.map((ing, i ) => {
            console.log(ing.servingSizeGrams, ing.ingredientAmount+ ing.gramsOrCups, ing.gramsPerTbsp)
            switch (ing.gramsOrCups){

                case "item" :
                    totalCalories += ing.ingredientAmount * ing.calories
                    totalCalArr.push(ing.calories)
                    break;
                case "grams" :

                    const cals = (ing.ingredientAmount / ing.servingSizeGrams ) * ing.calories
                    totalCalories += cals
                    console.log(cals)
                    totalCalories += cals
                    totalCalArr.push(cals)

                    break;
                case "cups" :

                    if (ing.gramsPerTbsp === 0 ){
                        // const cals = ((ing.ingredientAmount * 16 )  * (ing.servingSizeGrams))* ing.calories
                        // totalCalories += cals
                        console.log( "cups Grams Per Tbsp === 0")

                    }else {
                        const cals = (((ing.ingredientAmount * 16 ) * (ing.gramsPerTbsp) )  / (ing.servingSizeGrams))* ing.calories
                        totalCalories += cals
                        console.log(cals)
                        totalCalArr.push(cals)

                    }

                    break;
                case "tbsp" :
                    if (ing.gramsPerTbsp === 0 ){
                        // const cals = ((ing.ingredientAmount * 16 )  / (ing.servingSizeGrams))* ing.calories
                        // totalCalories += cals
                        console.log( "tbsp Grams Per Tbsp === 0")

                        // console.log(cals)

                    }else {
                        const cals = (((ing.ingredientAmount  ) *  (ing.gramsPerTbsp) )  / (ing.servingSizeGrams))* ing.calories
                        totalCalories += cals
                        console.log(cals)
                        totalCalArr.push(cals)

                    }

                    break;
                case "tsp" :
                    if (ing.gramsPerTbsp === 0 ){
                        // const cals = ((ing.ingredientAmount * 16 )  / (ing.servingSizeGrams))* ing.calories
                        // totalCalories += cals
                        console.log( "tsp Grams Per Tbsp === 0")

                        // console.log(cals)

                    }else {
                        const cals = (((ing.ingredientAmount / 3  ) *  (ing.gramsPerTbsp) )  / (ing.servingSizeGrams))* ing.calories
                        totalCalories += cals
                        console.log(cals)
                        totalCalArr.push(cals)

                    }
                    break;
                default:
                    break;
            }

            console.log(totalCalories, totalCalArr)

        })
        setNutritionalTotals(result)
            // setDone(true)

    }

    useEffect(() => {

        console.log("RECIPE COMPONNENT STATE CHANGE!!!!!!!!!!!!!!!!!1",)
        if ( recipeIngredientsList.length > 0 ){
            calculateRecipeServingTotals()
            console.log(nutritionalTotals, "HAS MORE THAN  0 Elements")

        }else{
            setNutritionalTotals(0)
        }
        // loadIngredientFacts()




    }, [recipeIngredientsList, recipeIngredientComponentState])

    function renderCustomAmountNutrition(){
        return (
            <div style={{width: "30em", margin: "auto"}}>


                <div>
                    {/*{vitaminAndMineralsNameArray && (*/}
                    <div
                        style={{
                            border: "solid",
                            width: "15em",
                            padding: ".25em",
                            opacity: "1",
                        }}
                    >

                        <div style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            padding: "0",
                            // border:"solid",

                        }}>Nutrition Facts</div>

                        <div  style={{
                            fontSize: ".8rem",
                            fontWeight: "bold",
                            display:"flex",
                            padding: 0,
                            marginBottom: ".2em",
                            // backgroundColor: "red",

                            justifyContent: "space-between"}}
                        >
                            <div>Serving size</div>
                            <div slot="end">{customAmount}g</div>

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
                                    fontSize: "1.2rem",
                                    fontWeight: "900",
                                    flexDirection: "row",
                                    width: "100%",

                                }}>

                                    <div

                                    >
                                        Calories
                                    </div>
                                    <div >
                                        {(Math.round((nutritionalTotals?.calories * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}
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
                                    <span style={{fontWeight: "normal"}}> {(Math.round((nutritionalTotals?.totalFat * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g</span> </div>

                                    {/*<div>10%</div>*/}
                                </div>
                                <div style={{
                                    borderBottom: "solid",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderWidth: ".2em",
                                    paddingLeft: "1em"

                                }}>
                                    <div>Saturated Fat {(Math.round((nutritionalTotals?.saturatedFat * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g</div>

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
                                    <div>Trans Fat {(Math.round((nutritionalTotals?.transFat * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g </div>
                                </div>
                                <div style={{
                                    borderBottom: "solid",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderWidth: ".2em",
                                    fontWeight: "1000"


                                }}>
                                    <div>Cholesterol <span style={{fontWeight: "normal"}}>
                                        {(Math.round((nutritionalTotals?.cholesterol * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g
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
                                        {(Math.round((nutritionalTotals?.sodium * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g
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
                                        <span style={{fontWeight: "normal"}}> {(Math.round((nutritionalTotals?.totalCarbohydrates * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g
                                        {/*<span style={{fontWeight: "normal"}}> {nutritionalTotals?.totalCarbohydrates * (customAmount/finalMass).toFixed(4)}g*/}
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
                                    <div>Dietary Fiber {(Math.round((nutritionalTotals?.dietaryFiber * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g</div>
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
                                    <div>Total Sugars {(Math.round((nutritionalTotals?.totalSugars * (customAmount/finalMass) ) * 100) / 100).toFixed(2) }g</div>

                                </div>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginLeft: "2em"

                                }}>
                                    <div>Includes {(Math.round((nutritionalTotals?.addedSugars * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g Added Sugars </div>
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
                                     {(Math.round((nutritionalTotals?.protein * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g
                                </span></div>
                                </div>

                            </div>
                        </div>




                    </div>

                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                {/*{vitaminAndMineralsNameArray && (*/}
                <div
                    style={{
                        border: "solid",
                        width: "15em",
                        padding: ".25em",
                        opacity: "1",
                    }}
                >

                    <div style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        padding: "0",
                        // border:"solid",

                    }}>Nutrition Facts</div>

                    <div  style={{
                        fontSize: ".8rem",
                        fontWeight: "bold",
                        display:"flex",
                        padding: 0,
                        marginBottom: ".2em",
                        // backgroundColor: "red",

                        justifyContent: "space-between"}}
                    >
                        <div>Serving size</div>
                        <div slot="end">{nutritionalTotals?.servingSizeGrams}g</div>

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
                                fontSize: "1.2rem",
                                fontWeight: "900",
                                flexDirection: "row",
                                width: "100%",

                            }}>

                                <div

                                >
                                    Calories
                                </div>
                                <div >
                                    {nutritionalTotals?.calories}
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
                                <span style={{fontWeight: "normal"}}> {nutritionalTotals?.totalFat}g</span> </div>

                                {/*<div>10%</div>*/}
                            </div>
                            <div style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                paddingLeft: "1em"

                            }}>
                                <div>Saturated Fat {nutritionalTotals?.saturatedFat}g</div>

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
                                <div>Trans Fat {nutritionalTotals?.transFat}g </div>
                            </div>
                            <div style={{
                                borderBottom: "solid",
                                display: "flex",
                                justifyContent: "space-between",
                                borderWidth: ".2em",
                                fontWeight: "1000"


                            }}>
                                <div>Cholesterol <span style={{fontWeight: "normal"}}>
                                        {nutritionalTotals?.cholesterol }g
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
                                        {nutritionalTotals?.sodium }g
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
                                    <span style={{fontWeight: "normal"}}> {nutritionalTotals?.totalCarbohydrates }g
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
                                <div>Dietary Fiber {nutritionalTotals?.dietaryFiber}g</div>
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
                                <div>Total Sugars {nutritionalTotals?.totalSugars}g</div>

                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginLeft: "2em"

                            }}>
                                <div>Includes {nutritionalTotals?.addedSugars}g Added Sugars </div>
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
                                     {nutritionalTotals?.protein }g
                                </span></div>
                            </div>

                        </div>
                    </div>

                    {/*<div style={{*/}
                    {/*    borderTop: "solid",*/}
                    {/*    borderWidth: "1.2em"*/}
                    {/*}}>*/}

                    {/*    {vitaminAndMineralsNameArray && vitaminAndMineralsNameArray.map((vitamin, i) => (*/}
                    {/*        <div style={{*/}
                    {/*            marginTop: ".2em",*/}
                    {/*            borderBottom: "solid",*/}
                    {/*            display: "flex",*/}
                    {/*            justifyContent: "space-between",*/}
                    {/*            borderWidth: ".2em",*/}
                    {/*            marginLeft: "0em",*/}
                    {/*            paddingRight: "3em",*/}

                    {/*        }}>*/}
                    {/*            <div>{vitamin} </div>*/}
                    {/*            <div>{vitaminAndMineralsAmountArray[i]} mg</div>*/}
                    {/*            /!*<div style={{*!/*/}
                    {/*            /!*    fontWeight: "1000",*!/*/}
                    {/*            /!*}}>%</div>*!/*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}







                </div>
                Mass <input type="number" min={0} value={finalMass} onChange={(e) => setFinalMass(e.target.value)}/>grams
                {finalMass > 0 && (
                    <div>
                        Custom Amount <input type="number" min={0} value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}/>grams

                        {customAmount > 0 && ( <div>
                                {renderCustomAmountNutrition()}
                            </div>
                        )}
                    </div>



                    )}
            </div>
         <div>
             <div style={{
                 border:"solid thin blue",
                 width: "30em",
                 padding: "2em"
             }}>
                 <ChartTutorial
                 nutritionTotals={nutritionalTotals}
                 customAmount={customAmount}
                 finalMass={finalMass}
                 />



             </div>


         </div>

            {/*<IonButton expand="block" color="primary"*/}
            {/*           // disabled={stepInputData?.toString().length < 10}*/}
            {/*           // onClick={() => onAddDataClick()}*/}
            {/*>*/}
            {/*    Save Recipe<IonIcon style={{margin:".5em"}} icon={saveOutline}/>*/}

            {/*</IonButton>*/}

        </div>
    )

}

function RecipeNutritionFactsLabel({}){

}

export function AddIngredientNutritionalFacts({
                                           setRecipeIngredientComponentState,
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

    const [buttonEnabled, setButtonEnabled ] = useState(false)


    useEffect(() => {

        if (servingSizeGrams > 0 && gramsPerTbsp > 0 && ingredientName !== "" && calories !== 0 && ingredientUploadedImgUrl !== ""){
            setButtonEnabled(true)
        }else {
            setButtonEnabled(false)
        }
    }, [servingSizeGrams, gramsPerTbsp, ingredientName, calories, ingredientUploadedImgUrl])
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
        setRecipeIngredientComponentState("search")
        console.log(ingredientData)

        addNewIngredient(ingredientData).then(x => {

            console.log(x)
            // window.location.href = "/edit-menu-dashboard/add-new-entree"
        })
    }

    function onCloseClick(){
        setRecipeIngredientComponentState("search")

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
                <div>IRON</div>
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
            <IonCard style={{overflowY: "scroll",overflowX: "scroll", height: "40em"}}>
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
                <IonCardContent  >
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Ingredient Name: </label>
                        <input  style={{border: ingredientName !== "" ? (""):("solid red")}} className="add-ingredient-name-card-input" value={ingredientName} type="text" onChange={(e) => {setIngredientName(e.target.value)}}/>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">How many grams in 1 tbsp: </label>
                        <input  style={{border: gramsPerTbsp > 0 ? (""):("solid red")}} className="add-ingredient-name-card-input" value={gramsPerTbsp} type="number"   min={0} onChange={(e) => {setGramsPerTbsp(e.target.value)}}/>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Serving Size (g)</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input  style={{border: servingSizeGrams > 0 ? (""):("solid red")}} className="add-ingredient-card-input" value={servingSizeGrams} type="number"  min={0} onChange={(e) => {setServingSizeGrams(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">g</label>
                        </div>
                    </div>
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Calories</label>
                        <div className="add-ingredient-card-input-and-selector-div-container">
                            <input  style={{border: calories > 0 ? (""):("solid red")}} className="add-ingredient-card-input" value={calories} type="number"  min={0} onChange={(e) => {setCalories(e.target.value)}}/>
                            <label className="add-ingredient-card-mg-or-percent-text">kc</label>
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
                    <IonButton disabled={!buttonEnabled} onClick={() => onSaveIngredientClick()}>
                        Save Ingredient
                    </IonButton>
                </IonCardContent>
            </IonCard>

        </div>
    )
}

function EditIngredientNutritionalFacts({
                                            setRecipeIngredientComponentState,
                                            editIngredientDocId,
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
                    setRecipeIngredientComponentState={setRecipeIngredientComponentState}
                    editIngredientDocId={editIngredientDocId}
                />
            )}


        </>

    )
}

function EditIngredientInputs({ingredient, editIngredientDocId, setRecipeIngredientComponentState}){


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
            setRecipeIngredientComponentState("search")

        })

    }

    function onCloseClick(){
        console.log("close Click")
        setRecipeIngredientComponentState("search")


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

function ChartTutorial({nutritionTotals, customAmount, finalMass}){
    const USER_DATA = [
        {
            id: 1,
            year: 2016,
            userGain: 8000,
            userLost: 823,
        },{
            id: 2,
            year: 2017,
            userGain: 12000,
            userLost: 823,
        },{
            id: 3,
            year: 2018,
            userGain: 10000,
            userLost: 823,
        },{
            id: 4,
            year: 2019,
            userGain: 40000,
            userLost: 823,
        },
    ]

    console.log(nutritionTotals)
    const protein = nutritionTotals.protein;
    const fat = nutritionTotals.totalFat;
    const carbs = nutritionTotals.totalCarbohydrates;
    const calories = nutritionTotals.calories;

    const tempArr = [fat, protein, carbs,]
    console.log(tempArr)

    const [userData, setUserData ] = useState({
        labels: ["Fats", "Protein", "Carbohydrates" ],
        // labels: USER_DATA.map((data) => data.year),
        datasets: [{
            label: "Nutrients Profile",
            data: [
                (Math.round((nutritionTotals?.totalFat * (customAmount/finalMass) ) * 100) / 100).toFixed(2),
                (Math.round((nutritionTotals?.protein * (customAmount/finalMass) ) * 100) / 100).toFixed(2),
                (Math.round((nutritionTotals?.totalCarbohydrates * (customAmount/finalMass) ) * 100) / 100).toFixed(2)
            ]
            // data: tempArr.map((data) => data),
            // data: USER_DATA.map((data) => data.userGain),
        }]
    })
    const [phdData, setPhdData ] = useState({
        labels: ["Fats", "Protein", "Carbohydrates" ],
        // labels: USER_DATA.map((data) => data.year),
        datasets: [{
            label: "Nutrients Profile",
            data: [ fat, protein, carbs],
            // data: tempArr.map((data) => data),
            // data: USER_DATA.map((data) => data.userGain),
        }]
    })

    console.log(userData)

    useEffect(() => {
        console.log(nutritionTotals,customAmount, finalMass, userData)
        console.log( Math.max((nutritionTotals?.totalFat * (customAmount/finalMass) ) + (nutritionTotals?.protein * (customAmount/finalMass) ) +
            (nutritionTotals?.totalCarbohydrates * (customAmount/finalMass) )) )

        let totalMacros = nutritionTotals?.totalFat + nutritionTotals?.protein +nutritionTotals?.totalCarbohydrates
        let fatPercent = nutritionTotals?.totalFat/totalMacros
        let carbohydratesPercent = nutritionTotals?.totalCarbohydrates/totalMacros
        let proteinPercent = nutritionTotals?.protein/totalMacros
        console.log(totalMacros, fatPercent, carbohydratesPercent, proteinPercent)
    console.log((Math.round((nutritionTotals?.totalFat * (customAmount/finalMass) ) * 100) / 100).toFixed(2))
        console.log( (Math.round((nutritionTotals?.protein * (customAmount/finalMass) ) * 100) / 100).toFixed(2))
        console.log((Math.round((nutritionTotals?.totalCarbohydrates * (customAmount/finalMass) ) * 100) / 100).toFixed(2))

        setUserData({
            labels: [`Fats ${(Math.round((nutritionTotals?.totalFat * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g ( ${fatPercent.toString().substring(2,4)}%) `,
                `Protein ${(Math.round((nutritionTotals?.protein * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g ( ${proteinPercent.toString().substring(2,4)}%)`,
                `Carbohydrates ${(Math.round((nutritionTotals?.totalCarbohydrates * (customAmount/finalMass) ) * 100) / 100).toFixed(2)}g ( ${carbohydratesPercent.toString().substring(2,4)}%)`, ],
            // labels: USER_DATA.map((data) => data.year),
            datasets:
            [
                {
                label: "Nutrients Profile",
                data: [
                    (Math.round((nutritionTotals?.totalFat * (customAmount/finalMass) ) * 100) / 100).toFixed(2),
                    (Math.round((nutritionTotals?.protein * (customAmount/finalMass) ) * 100) / 100).toFixed(2),
                    (Math.round((nutritionTotals?.totalCarbohydrates * (customAmount/finalMass) ) * 100) / 100).toFixed(2),


                ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1

                },
            ]

        })
    },[nutritionTotals, customAmount])

    return (
        <div>
            <BarChart chartData={userData} />
        </div>
    )

}
function BarChart({chartData}){

    return <Bar data={chartData}  />

}

function AddRecipePicture({
    recipeName, recipeId,
                              recipeImgUrl, setRecipeImgUrl
                          }){

    const imageInputRef = useRef();

    const handleFileChangeImage = async (event) => {

        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrlConst = window.URL.createObjectURL(file);
            console.log('created URL: ', pictureUrlConst)

            const imgUrl = await saveRecipeImg(pictureUrlConst, recipeName, recipeId)

            console.log(imgUrl)
            setRecipeImgUrl(imgUrl)


        }

    };

    return (
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
                {recipeImgUrl === "" ?  (
                    <div style={{
                        width: "fit-content",
                        margin: "auto",
                        backgroundColor: "red"}}>Add Photo</div>

                ): (
                    <img src={recipeImgUrl}  alt="uploaded image of recipe"/>
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
            {/*<div*/}

            {/*    style={{display: "flex",*/}
            {/*        backgroundColor: "medium",*/}
            {/*        margin: "1em 0",*/}
            {/*        justifyContent: "space-evenly",*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <IonButton*/}
            {/*        // onClick={() => onCancelAddNewEquipment()}*/}
            {/*        color="danger">Cancel</IonButton>*/}
            {/*    <IonButton*/}
            {/*        // onClick={() => onSaveEquipment()}*/}
            {/*    >Save</IonButton>*/}
            {/*</div>*/}

        </div>
    )
}

