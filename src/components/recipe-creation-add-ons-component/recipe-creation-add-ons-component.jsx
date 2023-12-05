import React, {useEffect, useRef, useState} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonInput} from "@ionic/react";
import {
    addCircleOutline as addIcon,
    cameraOutline as uploadPhotoIcon,
    closeCircleOutline as closeIcon,
    createOutline as editIcon, cubeOutline as inventoryIcon,
    imageOutline,
    listOutline,
    searchCircleOutline as searchIcon,
    trashOutline as deleteIcon
} from "ionicons/icons";
import {
    addNewIngredient, addObjectToAnyCollection, addToppingToCustomDatabase,
    loadAnyCollectionData,
    saveNewAddOnIngredientPicture,
    saveNewIngredientPicture
} from "../../firebase";

export default function RecipeCreationAddOnsComponent({recipeAddOnsList, setRecipeAddOnsList, recipeId}){



    const [ recipeCreationAddOnsComponentState, setRecipeCreationAddOnsComponentState] = useState("")
    const [showImage, setShowImage ] = useState(true)


    function renderRecipeCreationAddOnsComponent(){

        switch (recipeCreationAddOnsComponentState) {

            case "":
                return (
                        <div style={{margin: "auto",
                        width: "100%",
                            // alignContent: "center",
                        display: "flex",
                            flexDirection: "column",
                            // width: "100$%"

                    }}>
                            <div style={{ display: "flex", width:"fit-content", margin:"auto"}}>
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

                                <IonButton fill="outline" style={{width: "fit-content", height:"3em", fontSize:".7rem",

                                }} onClick={() => setRecipeCreationAddOnsComponentState("search")}>
                                    + Add On's
                                </IonButton>
                            </div>



                            {recipeAddOnsList.length > 0 && (
                                <div style={{
                                    height: "fit-content",
                                    // border: "solid blue",
                                    // width:"fit-content",
                                    fontSize: ".6rem",
                                    // flexWrap: "wrap",
                                    zIndex: "0",
                                    overflowX: "scroll",
                                    padding: "1em",
                                    display: "flex",
                                    flexDirection: "column",


                                }}>


                                    {showImage === true ? (
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            {recipeAddOnsList[0] && recipeAddOnsList.map((data, i) => (
                                                <AddedIngredientDisplayComponent
                                                    data={data}
                                                    key={i}
                                                    i={i}
                                                    setRecipeCreationAddOnsComponentState={setRecipeCreationAddOnsComponentState}
                                                    setRecipeAddOnsList={setRecipeAddOnsList}
                                                />
                                            ))}
                                        </div>

                                    ) : (
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            {recipeAddOnsList[0] && recipeAddOnsList.map((data, i) => (
                                                <AddedIngredientListComponent
                                                    data={data} key={i} index={i}
                                                    setRecipeAddosList={setRecipeAddOnsList}
                                                    setRecipeCreationAddOnsComponentState={setRecipeCreationAddOnsComponentState}
                                                />
                                            ))}
                                        </div>

                                    )}

                                </div>
                            )}
                    </div>
                )
            case "search":
                return (
                    <AddOnsSearchComponent
                        setRecipeCreationAddOnsComponentState={setRecipeCreationAddOnsComponentState}
                        setRecipeAddOnsList={setRecipeAddOnsList}
                        recipeAddOnsList={recipeAddOnsList}

                    />
                )
            case "add new":
                return (
                    <AddAddOnComponent
                        setRecipeCreationAddOnsComponentState={setRecipeCreationAddOnsComponentState}

                        recipeId={recipeId}
                    />
                )

        }
    }
    return (
        <div >
            {renderRecipeCreationAddOnsComponent()}
        </div>
    )
}
function AddOnsSearchComponent({setRecipeCreationAddOnsComponentState, recipeAddOnsList, setRecipeAddOnsList}){

    const [filteredData, setFilteredData] = useState([""])
    const [inputState, setInputState] = useState("")
    let loadedData;
    let result;




    async function loadAndFilterData(e) {


        let dataTempArray = [];


        loadedData = await loadAnyCollectionData('recipes-add-on-collection');

        loadedData.docs.map(doc => {
            dataTempArray = [...dataTempArray, doc.data()]
        })

        const isSearched = (element) => (
            element.name?.toLowerCase().includes(e?.toLowerCase())

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

    return (
        <IonCard>
            <div
                style={{
                    position: "absolute",
                    right: ".5em",
                    zIndex: "10",
                    cursor: "pointer"
                }}
                onClick={() => setRecipeCreationAddOnsComponentState("")}
            >X</div>
            <IonCardHeader>

                <IonCardTitle
                    style={{textAlign: "center"}}
                >
                    Add Ons Search
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
                        onClick={() => setRecipeCreationAddOnsComponentState("add new")}
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

                            // backgroundColor: "red"
                        }}
                    >

                        {filteredData && filteredData.map(( data, i ) => (
                            <AddOnSearchDisplayComponent data={data}
                                                         recipeAddOnsList={recipeAddOnsList}
                                                         setRecipeAddOnsList={setRecipeAddOnsList}
                                                         setFilteredData={setFilteredData}
                                                         setInputState={setInputState}
                                                         setRecipeCreationAddOnsComponentState={setRecipeCreationAddOnsComponentState}
                            key={i} />
                        ))
                        }



                    </div>
                )}


            </IonCardContent>
        </IonCard>
    )
}

function AddAddOnComponent({recipeId,
                               setRecipeCreationAddOnsComponentState
                                       }){
    const [name, setName,] = useState("");
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


    async function onSaveIngredientClick() {

        const ingredientData = {
            name,
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

        console.log(ingredientData)


        let bool = await addObjectToAnyCollection(ingredientData, `recipes-add-on-collection`)
        // let bool = addObjectToAnyCollection(ingredientData,`recipes-collection/${recipeId}/add-ons`)

        if (bool === true) {
            console.log(bool)
            setRecipeCreationAddOnsComponentState("search")

        }
        // addNewIngredient(ingredientData).then(x => {
        //
        //     console.log(x)
        // })
    }

    function onCloseClick(){
        setRecipeCreationAddOnsComponentState("search")

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

            const imgUrl = await saveNewAddOnIngredientPicture(pictureUrlConst, name, recipeId)

            console.log(imgUrl)
            setIngredientUploadedImgUrl(imgUrl)

        }

    };


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
                        Add Add On Ingredients Nutritional Facts
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent  >
                    <div className="add-ingredient-label-and-input-container">
                        <label className="add-ingredient-label">Name: </label>
                        <input className="add-ingredient-name-card-input" value={name} type="text" onChange={(e) => {setName(e.target.value)}}/>
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

                        {name &&
                        name !== " " &&
                        name !== "  " &&
                        name !== "   " &&
                        name !== "    " &&
                        name !== "     " &&
                        name !== "      " &&
                        name !== "       " &&
                        name !== "         " &&
                        name.length > 2 && (
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

function AddOnSearchDisplayComponent({data, setInputState, setFilteredData, recipeAddOnsList, setRecipeAddOnsList, setRecipeCreationAddOnsComponentState }){

    function onSearchDataDisplayClick(){

        setInputState(data.name)
        setFilteredData([""])

        console.log("CLick")
        let temp = recipeAddOnsList;
        // temp.splice(index, 1, data)
        console.log(temp?.length, )
        if (temp.length === 1 && !temp[0].name ){
            console.log("if")
            temp.splice(0, 1, data)

        }else {
            console.log("else")

            temp.push(data)

        }
        setRecipeAddOnsList([...temp])
        setRecipeCreationAddOnsComponentState("")
    }



    return (
        <IonCard
            style={{
                // backgroundColor: "red",
                // cursor: "pointer"}}>
                padding: 0,
                width: "70%"

            }}
        >
            <IonCardContent>
                <div style={{display: "flex",
                    padding: 0,
                    flexDirection: "column"
                }}>

                    <div
                        onClick={() => onSearchDataDisplayClick()}
                        style={{
                            // backgroundColor: "blue",
                            width: "100%",
                            // backgroundColor: "red",
                            cursor: "pointer"}}>

                        {data.name}
                        <div style={{width: "15em",
                            margin: "auto"
                        }}>
                            <img style={{
                                objectFit: "contain",
                                height: "12em",
                                width: "50%"

                            }} src={data.imgUrl} />
                        </div>
                        {/*{ingredientSearchNutritionFacts && (*/}
                        {/*    <IngredientsSearchItemNutritionFacts*/}
                        {/*        ingredientSearchNutritionFacts={data}*/}
                        {/*    />*/}

                        {/*)}*/}

                    </div>
                    {/*<div>*/}
                    {/*    <IngredientsPriceFactsComponent*/}
                    {/*        data={data} />*/}
                    {/*</div>*/}
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

function AddedIngredientListComponent({data,setRecipeCreationAddOnsComponentState, setRecipeAddOnsList,  index}){



    let newData;

    const [loadedIngredient, setLoadedIngredient ] = useState(undefined)
    const [showInventory, setShowInventory] = useState(false)
    let loadedIngredientInventoryData

    const [averagePriceArray, setAveragePriceArray ] = useState(undefined)

    function renderPriceFacts() {
        function renderInventoryTotals(){

            let priceTotal = 0;
            let amountTotal = 0;
            loadedIngredient.inventory.map((x,i) => {

                priceTotal = priceTotal + parseFloat(x.pricePerUnit)
                amountTotal = amountTotal + parseFloat(x.ingredientInventoryAmount)
            })
            console.log(priceTotal, amountTotal)

            return (priceTotal/amountTotal).toFixed(3)

        }
        console.log(loadedIngredient)

        if (loadedIngredient.inventory !== undefined ){
            console.log(loadedIngredient, " <======loaded Ingredient!!!!")
            if (loadedIngredient.inventory[0] !== "" ){
                console.log(loadedIngredientInventoryData)
                let avgPriceArray = [];

                let pricePer;
                loadedIngredient.inventory.map(inv => {
                    console.log(inv)
                    switch (inv.lbsOzItemsGrams) {

                        case "items":
                            pricePer = ( parseFloat(inv.pricePerUnit) / parseInt(inv.ingredientInventoryAmount)  )

                            console.log(pricePer)
                            break;
                        case "lbs":

                            break;
                        case "ounces":

                            break;
                        case "grams":

                            break;

                    }
                    avgPriceArray = [...avgPriceArray, pricePer]
                })
                console.log(avgPriceArray, "XXXXXX__AVG_PRICE_ARRAY__XXXXXX")
                setAveragePriceArray(avgPriceArray)

                return (
                    <IonCard style={{
                        width: "20em",
                        textAlign: "center"
                    }}>
                        <div>
                            Inventory
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <div style={{
                                display: "flex"
                            }}>
                                <div style={{
                                    border: "solid thin",
                                    paddingRight: ".2em"
                                }}>Amount</div>
                                <div>Price</div>
                                <div>Avg Price</div>
                                <div>Source</div>
                            </div>
                            {averagePriceArray !== undefined && loadedIngredient.inventory.map((x,i) => (
                                <div style={{
                                    display: "flex"
                                }}>
                                    <div style={{
                                        border: "solid",
                                        paddingRight: ".2em"
                                    }}>{x.ingredientInventoryAmount} {x.lbsOzItemsGrams}</div>
                                    <div>@${x.pricePerUnit}</div>
                                    <div>${avgPriceArray[i]}</div>
                                    <div>{x.source} {x.sourceCrossStreets}</div>
                                </div>
                            ))}
                        </div>
                        <div>Avg Price {renderInventoryTotals()} per {loadedIngredient.inventory[0].lbsOzItemsGrams}</div>



                    </IonCard>
                )

            }

        }






    }


    async function onDeleteIconClick() {

        // console.log(index)
        //
        // const tempArray = recipeIngredientsList
        //
        // tempArray.splice(index, 1)
        // console.log(tempArray)
        // let newTempArray= [];
        // tempArray.map(val => {
        //     if( val !== undefined){
        //         console.log("Not an undefined val")
        //         newTempArray = [...newTempArray, val]
        //     }
        //
        // })
        // setRecipeIngredientsList(newTempArray)
        // console.log("old", tempArray, "new ", newTempArray)
        // setDeletingIngredient(true)
    }

    // useEffect(() => {
    //     if(loadedIngredient === undefined ){
    //         console.log("?LOADED INGREDIENT UseEffect!!!XXX__")
    //         loadIngredientsInventory()
    //
    //     }else{
    //         console.log("Ingredient XXX == ", loadedIngredient)
    //     }
    // },[showInventory])

    // function renderInventoryTotals2(){
    //
    //     let priceTotal = 0;
    //     let amountTotal = 0;
    //     loadedIngredient.inventory.map((x,i) => {
    //
    //         priceTotal = priceTotal + parseFloat(x.pricePerUnit)
    //         amountTotal = amountTotal + parseFloat(x.ingredientInventoryAmount)
    //     })
    //     console.log(priceTotal, amountTotal)
    //
    //     return (priceTotal/amountTotal).toFixed(2)
    //
    // }

    async function loadIngredientsInventory(){
        // console.log("loading Inventory")
        //
        // let inventory = [];
        // let tempArr = [];
        //
        // loadedIngredientInventoryData = await loadAnyCollectionData(`ingredients-collection/${data.docId}/inventory`)
        //
        // loadedIngredientInventoryData.docs.map(inventoryDoc => {
        //     // console.log(doc.ingredientName,doc.docId,
        //     console.log(inventoryDoc.data())
        //     inventory = [...inventory, inventoryDoc.data()]
        // })
        // if (inventory.length  > 0 ){
        //     console.log(inventory)
        //     newData = {...data, inventory}
        //     console.log(newData)
        //     tempArr = {...recipeIngredientsList}
        //     tempArr[index] = {...newData}
        //     console.log(newData,"<== loadedIngredient XXXXXXX")
        //     // setRecipeIngredientsList(tempArr)
        //     setLoadedIngredient(newData)
        //
        // }else {
        //     console.log(data,"<== loadedIngredient XXXXXXX")
        //
        //     setLoadedIngredient(data)
        //
        // }
    }
    function renderInventoryData(){


        if( loadedIngredient && averagePriceArray !== undefined){

            console.log(data, loadedIngredient, averagePriceArray, )
            console.log(averagePriceArray[0])

            return (
                <div style={{ }}>
                    <div style={{
                        fontSize: "1.2rem",
                        textAlign: "center"
                    }}>
                        Inventory Data
                    </div>
                    <div>

                        <div>
                            <div
                                style={{display: "flex",
                                    textAlign: "center"
                                }}
                            >



                                <div
                                    style={{
                                        border: "solid",
                                        width: "5em",
                                        fontSize: "1rem"
                                    }}>
                                    Amount
                                </div>
                                <div
                                    style={{
                                        border: "solid",
                                        width: "5em",
                                        fontSize: "1rem"
                                    }}>
                                    Price
                                </div>
                                <div
                                    style={{
                                        border: "solid",
                                        width: "5em",
                                        fontSize: "1rem"
                                    }}>
                                    Avg Price

                                </div>
                                <div
                                    style={{
                                        border: "solid",
                                        width: "5em",
                                        fontSize: "1rem"
                                    }}>
                                    Date
                                </div>
                                <div
                                    style={{
                                        border: "solid",
                                        width: "6em",
                                        fontSize: "1rem"
                                    }}>
                                    Source
                                </div>

                            </div>
                            <div  style={{
                                display: "flex",
                                textAlign: "center",


                            }}>



                                <div>
                                    {loadedIngredient.inventory?.map((item, i) =>(
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
                                                    width: "5em",
                                                }}>
                                                {item.ingredientInventoryAmount}  {item.lbsOzItemsGrams}
                                            </div>

                                            <div
                                                style={{
                                                    border: "solid",
                                                    width: "5em",
                                                }}>
                                                {item.pricePerUnit}  {item.pricePerUnitLabel}
                                            </div>
                                            <div
                                                style={{
                                                    border: "solid",
                                                    width: "5em",
                                                }}>
                                                {averagePriceArray[0]}
                                            </div>
                                            <div
                                                style={{
                                                    border: "solid",
                                                    width: "5em",
                                                }}>
                                                {item.date}
                                            </div>
                                            <div
                                                style={{
                                                    border: "solid",
                                                    width: "5em",
                                                }}>
                                                <div>{item.source}</div>
                                                <div>
                                                    ({item.sourceCrossStreets})
                                                </div>
                                            </div>

                                            <div
                                                style={{
                                                    // border: "solid",
                                                    width: "fit-content",
                                                    fontSize: "1.2rem"
                                                }}>
                                                <IonIcon size="large"
                                                         // onClick={() => onEditIconClick(data)}
                                                         style={{ zIndex:"10",
                                                             cursor: "pointer"
                                                         }} icon={editIcon}/>
                                            </div>
                                            <div>
                                                {renderPriceFacts()}
                                            </div>
                                        </div>
                                    ))  }

                                </div>



                            </div>

                        </div>


                    </div>
                </div>




            )
        }


    }


    return (
        <div>
            <div  style={{display: "flex", justifyContent: "space-between", fontSize:".6rem",
                borderTop: "solid thin",
                borderRight: "solid thin",
                borderLeft: "solid thin",
            }}>
                <div >
                    {data.name}
                </div >

                <div
                    style={{
                        // backgroundColor: "red",
                        display: "flex",
                        // justifyContent: "space-around",
                        width:"fit-content"
                    }}
                >
                    <IonIcon
                        // onClick={() => setShowInventory(!showInventory)}
                              style={{ zIndex:"10", fontSize: "16px",
                                  color: showInventory === true ? ("blue") : ("black"),
                              }} icon={inventoryIcon}

                    />
                    <IonIcon size="medium"
                             // onClick={() => onEditIconClick()}
                             style={{ zIndex:"10",fontSize: "16px"}} icon={editIcon}/>
                    <IonIcon size="medium"
                             // onClick={() => onDeleteIconClick()}
                             style={{ zIndex:"10", fontSize: "16px"}} icon={deleteIcon}/>

                </div>
            </div>


            {showInventory && (
                <div style={{
                    borderLeft:"solid thin",
                    borderRight:"solid thin",
                    borderBottom:"solid thin",
                    // backgroundColor: "blue"

                }}>
                    <div style={{
                        fontSize: ".8rem",
                        textAlign: "center",
                        backgroundColor:"rgb(255,249,187)",

                    }}>
                        Inventory Data
                    </div>
                    <div>

                        <div style={{
                            fontSize: ".6rem"

                        }}>
                            <div
                                style={{display: "flex",
                                    textAlign: "center",
                                }}
                            >



                                <div
                                    style={{
                                        border: "solid thin",
                                        width: "5em",
                                        // fontSize: "1rem"
                                    }}>
                                    Amount
                                </div>
                                <div
                                    style={{
                                        border: "solid thin",
                                        width: "5em",
                                        // fontSize: "1rem"
                                    }}>
                                    Price
                                </div>
                                <div
                                    style={{
                                        border: "solid thin",
                                        width: "5em",
                                        // fontSize: "1rem"
                                    }}>
                                    Avg Price

                                </div>
                                <div
                                    style={{
                                        border: "solid thin",
                                        width: "5em",
                                        // fontSize: "1rem"
                                    }}>
                                    Date
                                </div>
                                <div
                                    style={{
                                        border: "solid thin",
                                        width: "6em",
                                        // fontSize: "1rem"
                                    }}>
                                    Source
                                </div>

                            </div>
                            <div  style={{
                                display: "flex",
                                textAlign: "center",


                            }}>



                                {/*<div >*/}
                                {/*    {loadedIngredient.inventory?.map((item, i) =>(*/}
                                {/*        <div style={{*/}
                                {/*            display: "flex",*/}
                                {/*            // flexDirection: "column",*/}
                                {/*            flexWrap: "wrap",*/}
                                {/*            textAlign: "center",*/}

                                {/*        }}>*/}
                                {/*            <div*/}
                                {/*                style={{*/}
                                {/*                    border: "solid thin",*/}
                                {/*                    width: "4em",*/}
                                {/*                }}>*/}
                                {/*                {item.ingredientInventoryAmount}  {item.lbsOzItemsGrams}*/}
                                {/*                <div*/}
                                {/*                    style={{*/}
                                {/*                        // border: "solid",*/}
                                {/*                        width: "fit-content",*/}
                                {/*                        // fontSize: "1.2rem"*/}
                                {/*                    }}>*/}
                                {/*                    <IonIcon size="large"*/}
                                {/*                             onClick={() => onEditIconClick(data)}*/}
                                {/*                             style={{ zIndex:"10",*/}
                                {/*                                 cursor: "pointer",*/}
                                {/*                                 color: "black"*/}
                                {/*                             }} icon={editIcon}/>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}

                                {/*            <div*/}
                                {/*                style={{*/}
                                {/*                    border: "solid thin",*/}
                                {/*                    width: "4em",*/}
                                {/*                    // fontSize: ".9rem",*/}

                                {/*                }}>*/}
                                {/*                {item.pricePerUnit}  {item.pricePerUnitLabel}*/}
                                {/*            </div>*/}
                                {/*            <div*/}
                                {/*                style={{*/}
                                {/*                    border: "solid thin",*/}
                                {/*                    width: "4em",*/}
                                {/*                }}>*/}
                                {/*                ${renderInventoryTotals2()}*/}
                                {/*            </div>*/}
                                {/*            <div*/}
                                {/*                style={{*/}
                                {/*                    border: "solid thin",*/}
                                {/*                    width: "4em",*/}
                                {/*                }}>*/}
                                {/*                {item.date}*/}
                                {/*            </div>*/}
                                {/*            <div*/}
                                {/*                style={{*/}
                                {/*                    border: "solid thin",*/}
                                {/*                    width: "4em",*/}
                                {/*                    // fontSize: ".9rem",*/}

                                {/*                }}>*/}
                                {/*                <div>{item.source}</div>*/}
                                {/*                <div>*/}
                                {/*                    ({item.sourceCrossStreets})*/}
                                {/*                </div>*/}
                                {/*            </div>*/}


                                {/*            <div>*/}
                                {/*                /!*{renderPriceFacts()}*!/*/}

                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    ))  }*/}

                                {/*</div>*/}



                            </div>

                        </div>


                    </div>
                </div>
            )}
            {/*{renderInventoryData()}*/}

        </div>

    )

}

function AddedIngredientDisplayComponent({
                                             data, i, setRecipeAddOnsList, setRecipeCreationAddOnsComponentState,
                                         }){

    // const [updatingData, setUpdatingData ] = useState(false)



    function onDecreaseEquipmentAmount(){
        console.log(data)
        // setUpdatingData(true)

        data.ingredientAmount = parseInt(data.ingredientAmount) - 1;
        console.log(data)
    }
    function onAddAmountToData(){
        console.log(data)

        // setUpdatingData(true)


        data.ingredientAmount = parseInt(data.ingredientAmount) + 1;
        console.log(data)


    }
    function onEditIconClick(){

        //
        // console.log(recipeIngredientsList, i)
        // console.log(recipeIngredientsList[i])
        // console.log(recipeIngredientsList[i].ingredientName )
        //
        // setIngredientToBeEdited(recipeIngredientsList[i])
        // setIngredientToBeEditedArrPos(i)
        // // setRecipeCreationStep("Edit Ingredient Amount")
        // setIngredientsBoxStep("edit ingredient" , ingredientToBeEdited)

    }

    function onDeleteIngredientFromList(){
        // let temp = [...recipeIngredientsList]
        //
        //
        // temp.splice(i,1)
        // setRecipeIngredientsList(temp)
    }

    return (
        <IonCard   style={{
            minWidth: "10em",
            textAlign: "center",
            height: "fit-content",
        }}>
            <IonCardHeader>
                <IonCardTitle style={{
                    fontSize: ".8rem"
                }}>
                    {data.name}

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
                        width: "12em",
                        margin: "auto",
                        height: "4em",

                    }} src={data.imgUrl} />

                </div>

                <div style={{display: "flex",
                    // backgroundColor: "blue",
                    width: "fit-content",
                    margin: "auto",

                }}>


                    <IonIcon
                        // onClick={() => onEditIconClick()}
                        style={{ zIndex:"10",fontSize: "16px",
                            // backgroundColor:"red",
                            margin:"auto auto auto .1em",
                            cursor: "pointer"



                        }} icon={deleteIcon}/>


                </div>



            </IonCardContent>
        </IonCard>
    )

}