import { initializeApp } from "firebase/app";
import {doc, updateDoc,getDoc, setDoc, deleteDoc, collection, addDoc, getFirestore, getDocs} from "firebase/firestore";
import {getStorage, ref, getDownloadURL, uploadBytes, deleteObject} from  'firebase/storage'
import { getAuth } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyCzaURp616lCtyMi3WgjWEdKRODf4_6NVA",
    authDomain: "taco-fit-c1a55.firebaseapp.com",
    projectId: "taco-fit-c1a55",
    storageBucket: "taco-fit-c1a55.appspot.com",
    messagingSenderId: "496578193942",
    appId: "1:496578193942:web:25a192730648c8c2276337",
    measurementId: "G-13QYYXL1C1"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage(app);

export const loadAnyCollectionData = async (path) => {
    const querySnapshot = await getDocs(collection(db, path))
    return querySnapshot;

}
export const loadAnyDocData = async (path) => {

    console.log(path)
    const docRef = await getDoc(doc(db,path));
    console.log(docRef.data())

    return docRef;
}
export const loadRecipe = async (recipeId) => {
    const docRef = await getDoc(doc(db,"recipes-collection", recipeId));
    console.log(docRef.data())
}
export const deleteCustomDoc = async (collectionPath,docId) => {

    console.log(collectionPath, docId)
    await deleteDoc(doc(db, collectionPath, docId)).then((x) =>
        console.log(x))
}
export const loadIngredient = async (docId) => {

    console.log(docId)
    const docRef = await getDoc(doc(db,'ingredients-collection', docId));
    console.log(docRef.data())

    return docRef;


}
export const loadEquipment = async (docId) => {

    console.log(docId)
    const docRef = await getDoc(doc(db,'equipment-collection', docId));
    console.log(docRef.data())

    return docRef;


}


export const addIngredientInventory = async (inventoryData, ingredientData) => {

    console.log(ingredientData, inventoryData)
    let currentDate = new Date()
    console.log(currentDate.toDateString())
    currentDate = currentDate.toDateString();

    try {
        const docRef = await addDoc(collection( db,`ingredients-collection/${ingredientData.docId}/inventory`), {...inventoryData}
        )

        await setDoc(doc(db, `ingredients-collection/${ingredientData.docId}/inventory`, docRef.id), {docId: docRef.id, date: currentDate, ...inventoryData})

        const allInventorySnapShot =  await getDocs(collection(db, `ingredients-collection/${ingredientData.docId}/inventory`))
        let priceTotal = 0;
        let amountTotal = 0;
        let averagePrice;

        allInventorySnapShot.docs.map((doc => {
            console.log(doc.data())



                priceTotal = priceTotal + parseFloat(doc.data().pricePerUnit)
                amountTotal = amountTotal + parseFloat(doc.data().ingredientInventoryAmount)

        }))
        console.log(priceTotal, amountTotal)

        console.log((priceTotal/amountTotal).toFixed(3))
        averagePrice = (priceTotal/amountTotal).toFixed(3)

        const ingredientFirebaseData = await  getDoc(doc(db, `ingredients-collection/${ingredientData.docId}`))
        console.log(ingredientFirebaseData, ingredientFirebaseData.data())
        let newFBData = ingredientFirebaseData.data()
        console.log(newFBData)
        newFBData.averagePrice = averagePrice
        await setDoc(doc(db, `ingredients-collection/${ingredientData.docId}`), { ...newFBData})



        return console.log("Inventory added and averagePice set: " , averagePrice)
    }catch (error){
        console.log("Problem with adding new inventory", error.message)
    }



}
export const deleteIngredientInventory = async (inventoryDocID, ingredientDocId )=> {

}
export const updateIngredient = async (ingredientDocId, ingredientData) => {

    const {
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
        saponins,
        tannins,
        trypsinInhibitors,
    } = ingredientData;




    const docRef = doc(db, "ingredients-collection", ingredientDocId)

    await updateDoc(docRef, {docId: ingredientDocId,...ingredientData})
}
export const updateEquipment = async (equipmentDocId, equipmentData) => {

    const {
        equipmentName,

        imgUrl,
    } = equipmentData;




    const docRef = doc(db, "equipment-collection", equipmentDocId)

    await updateDoc(docRef, {docId: equipmentDocId,...equipmentData})
}
export const addNewIngredient = async (ingredient) => {
    const {
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

    } = ingredient;

    async function saveIngredientImgUrl() {
        const imgRef = ref(storage, `/ingredient-imgs-ref/${ingredientName}`);

        const response = await fetch(imgUrl);

        const blob = await response.blob();

        await uploadBytes(imgRef, blob).then((snapshot) => {
            console.log("UPLOADED A BLOB!")
        })

        const url = await getDownloadURL(ref(storage, `/ingredient-imgs-ref/${ingredientName}`));

        console.log('save picture ', url,);
        return url;
    }

    try {
        const docRef = await addDoc(collection( db,'ingredients-collection'), {...ingredient}
        )

        const id = docRef.id;
        console.log(id, "<- docRef.Id")
        await setDoc(doc(db, 'ingredients-collection', docRef.id), {docId: id, ...ingredient})

        const savedImgUrl = await saveNewIngredientPicture(imgUrl, ingredientName)
        ingredient.imgUrl = savedImgUrl
        console.log("INGREDIENT!!!!!", ingredient)
        await setDoc(doc(db, 'ingredients-collection', docRef.id), {docId: id, ...ingredient})



        return ("Ingredient added: " + ingredientName, id)
    }catch (error){
        console.log("Problem with adding new ingredient", error.message)
    }
}

export const addToppingToCustomDatabase = async (dbPath, toppingData) => {

    console.log(toppingData, dbPath)

    try {
        // const docRef = await addDoc(collection( db,dbPath), {...toppingData})

        console.log(toppingData)
        await setDoc(doc(db, dbPath, toppingData.docId), { ...toppingData})

        console.log(`Topping added to ${dbPath}:   ${toppingData.ingredientName}  ${toppingData}`)
        return toppingData;
    }catch (error){
        console.log("Problem with adding new ingredient", error.message)
    }
}

export const addObjectToAnyCollection = async (obj, path) => {

  try {
      const docRef = await addDoc(collection(db, path), {
          ...obj
      })

      console.log(path, docRef.id, obj)
      // let newPath

      await setDoc(doc(db, path, docRef.id), {
          ...obj,
          docId: docRef.id
      })

      return true;
  }catch (e)
  {
      console.log("error adding an object to ", path, e.message)
  }

}
export const deleteEquipment = async (docId) => {

    console.log(docId)
    await deleteDoc(doc(db, 'equipment-collection', docId))
}
export const deleteIngredient = async (docId) => {

    console.log(docId)
    await deleteDoc(doc(db, 'ingredients-collection', docId))
}

export const deleteAnyDoc = async (path,docId) => {

    try {
        await deleteDoc(doc(db, `${path}`))

        return true;


    } catch (e){
        console.log(e.message)
        return false;
    }
}



export const addMainMenuItemPicture = async (blobUrl, id, ) => {
    const menuItemsImgRef = ref(storage, `main-menu-item-imgs-ref/${id}/main-menu`);

    const response = await fetch(blobUrl);
    const blob = await response.blob();
    await uploadBytes(menuItemsImgRef, blob).then((snapshot) => {

        console.log("UPLOADED A BLOB!")
    })

    // // const snapshot = await pictureRef.storage.ref(`/menu-item-imgs/${name}`).put(blob)
    // // const snapshot = await pictureRef.storage.ref().put(blob);
    const url = await getDownloadURL(ref(menuItemsImgRef));

    // const url = await snapshot.ref.getDownloadURL();
    console.log('save picture ', url, );
    const menuItemRef = doc(db, "main-menu-items", id)
    await updateDoc(menuItemRef, {url})
    // await updateDoc(menuItemRef, {url,...data})
    return url;
}
export const saveNewMainMenuCarouselImg = async (blobUrl, name ) => {

    const menuItemsImgsRef = ref(storage, `main-menu-carousel-item-imgs-ref/${name}`);

    const response = await fetch(blobUrl);

    const blob = await response.blob();

    await uploadBytes(menuItemsImgsRef, blob).then((snapshot) => {
        console.log("UPLOADED A BLOB!")
    })

    const url = await getDownloadURL(ref(storage,`/main-menu-carousel-item-imgs-ref/${name}`));

    console.log('save picture ', url, );
    return url;
}
export const saveRecipeImg = async (blobUrl, recipeName, recipeId ) => {

    console.log(blobUrl, recipeName, recipeId)
    const recipeImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/recipeImg`);

    console.log(recipeImgRef)
    const response = await fetch(blobUrl);

    console.log(response)
    const blob = await response.blob();
    console.log(blob)

    await uploadBytes(recipeImgRef, blob).then((snapshot) => {
        console.log("UPLOADED A BLOB!")
    })

    const url = await getDownloadURL(ref(storage,`taco-fit-recipes/${recipeId}/${recipeName}/recipeImg`));

    console.log('saved recipe picture ', url, );
    return url;
}
export const onDeleteRecipeImageFromStorage = async (recipeName, recipeId) => {
    try{
        const recipeImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/recipeImg`);

        await deleteObject(recipeImgRef)
    }catch (e) {
        console.log("error deleting recipe image",e.message)

    }
}
export const saveNewEquipmentPicture = async  (blobUrl,name) => {
    console.log(name)
    // const pictureRef = ref(storage,`/menu-item-imgs/${name}`);
    const menuItemsImgsRef = ref(storage, `equipment-imgs-ref/${name}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    await uploadBytes(menuItemsImgsRef, blob).then((snapshot) => {
        console.log("UPLOADED A BLOB!")
    })
    // // const snapshot = await pictureRef.storage.ref(`/menu-item-imgs/${name}`).put(blob)
    // // const snapshot = await pictureRef.storage.ref().put(blob);
    const url = await getDownloadURL(ref(storage,`/equipment-imgs-ref/${name}`));
    // const url = await snapshot.ref.getDownloadURL();
    console.log('save picture ', url, );
    return url;
}
export const saveNewIngredientPicture = async  (blobUrl,name) => {
    console.log(name)
    // const pictureRef = ref(storage,`/menu-item-imgs/${name}`);
    const menuItemsImgsRef = ref(storage, `ingredient-imgs-ref/${name}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    await uploadBytes(menuItemsImgsRef, blob).then((snapshot) => {
        console.log("UPLOADED A BLOB!")
    })
    // // const snapshot = await pictureRef.storage.ref(`/menu-item-imgs/${name}`).put(blob)
    // // const snapshot = await pictureRef.storage.ref().put(blob);
    const url = await getDownloadURL(ref(storage,`/ingredient-imgs-ref/${name}`));
    // const url = await snapshot.ref.getDownloadURL();
    console.log('save picture ', url, );
    return url;
}

export const saveNewAddOnIngredientPicture = async  (blobUrl,name, recipeId) => {

    console.log(name, recipeId)
    const menuItemsImgsRef = ref(storage, `recipe-imgs-ref/${recipeId}/add-on-imgs-ref/${name}`);


    const response = await fetch(blobUrl);
    const blob = await response.blob();
    await uploadBytes(menuItemsImgsRef, blob).then((snapshot) => {
        console.log("UPLOADED AN INgredient BLOB!")
    })

    const url = await getDownloadURL(ref(storage,`recipe-imgs-ref/${recipeId}/add-on-imgs-ref/${name}`));

    // const url = await snapshot.ref.getDownloadURL();
    console.log('save picture ', url, );


    return url;
}
export const addNewEquipment = async (equipmentName, imgUrl) => {
    // const {equipmentName} = equipmentName;
    // const {imgUrl} = imgUrl;

    console.log("imgUrl: ", imgUrl, " Equipment Name: ", equipmentName)
    try {
        const docRef = await addDoc(collection(db, "equipment-collection"), {
            equipmentName,
            imgUrl
        })
        await setDoc(doc(db, "equipment-collection", docRef.id), {
            docId: docRef.id,
            equipmentName,
            imgUrl
        })
         await saveNewEquipmentPicture(imgUrl, docRef.id)

    }catch (e){
        console.log("Problems with adding equipment")
    }

    return console.log("Added nw equipment to firebase", equipmentName)
}
export const updateEquipmentEdit = async (equipmentName, imgUrl, docId) => {
    try {
        await setDoc(doc(db, "equipment-collection", docId), {
            docId: docId,
            equipmentName,
            imgUrl
        })
        await saveNewEquipmentPicture(imgUrl, docId)

    }catch (e) {
        console.log("Problems with editing equipment")

    }
}
export const onSaveRecipe = async (data, recipeId) => {
    console.log(data, recipeId)


    try {

        if( data.recipeImgUrl.startsWith("blob") ){
            console.log("blob url")
            const savedImgUrl = await saveRecipeImg(data.recipeImgUrl, data.recipeName, recipeId)
            console.log(savedImgUrl)
            data.recipeImgUrl = savedImgUrl
        }

        console.log(data)
        const docRef = await setDoc(doc( db,'recipes-collection', recipeId), {...data, docId: recipeId}
        )
        console.log("Recipe Saved : " + data)
        return ("Recipe Saved : " + data.recipeName)
    }catch (error){
        console.log("Problem with saving recipe", error.message)
    }

}
export const deleteRecipe = async (data) => {
    try {
        const recipeRef = doc(db, "recipes-collection", data.recipeId);

        const recipeStorageRef = ref(storage, `taco-fit-recipes/${data.recipeId}`);

        await deleteDoc(recipeRef)
        await deleteObject(recipeStorageRef)
        console.log("Deleted Recipe", data.recipeId)

    }catch (e) {
        console.log("Error Deleting Recipe", e.message)
    }
}
export const onSaveRecipeCookingInstruction = async (data,recipeId, stepId, recipeName,) => {
    console.log(data)

    const {pictureUrlArray} = data
    console.log(pictureUrlArray)

    function executeSavingForEachPicture(pictureUrlArray){

        try {
            const promises = pictureUrlArray.map(async (url, i) => {
                if (i === 0) {
                    console.log(url, stepId, recipeName, recipeId, stepId)
                    const urlAndIds = await saveRecipeStepPicture(url, stepId, recipeName, recipeId, stepId)
                    console.log(urlAndIds)
                    return urlAndIds;

                } else {
                    let dateId = new Date()

                    console.log(url, stepId, recipeName, recipeId, dateId.toISOString())


                    const urlAndIds = await saveRecipeStepPicture(url, stepId, recipeName, recipeId, dateId.toISOString())
                    console.log(urlAndIds)

                    return urlAndIds;
                }
            })
            return Promise.all(promises)
        }catch (e) {
            console.log("Problem with executing save for each picture", e.message)

        }

    }

    try {

        if (data.videoUrl !== ""){
            console.log("adding video", data.videoUrl)
           const videoUrl = await addVideoToRecipeStep(data.videoUrl,recipeId,stepId, recipeName)
            console.log("added video success")
            data.videoUrl = videoUrl
        }

        const urlsAndIds = await executeSavingForEachPicture(pictureUrlArray)
        console.log(urlsAndIds)

        data.pictureUrlArray = urlsAndIds;
        console.log(data)

        // await setDoc(doc(db, `recipes-collection/${recipeId}/cooking-instructions/${data.dateId}`), {
        //     ...data
        // })


        return  data;
    }catch (error){
        console.log("Problem with saving recipe", error.message)
    }

}
export const getRecipeId = async () => {
    try {
        const docRef = await addDoc(collection(db, 'recipes-collection'),{
            docId:"filler"
        })

        await setDoc(doc(db, 'recipes-collection', docRef.id), {
            docId: docRef.id
        })
        return docRef.id

    } catch (e) {
        console.log("Problem with getting new recipe id", e.message)

    }
}
export const saveRecipeStepPicture = async (blobUrl,stepId,recipeName, recipeId, dateId) => {



    console.log(recipeName)
    const recipeStepsImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${stepId}/images/${dateId}`);

    const response = await fetch(blobUrl);
    console.log(response)
    const blob = await response.blob();
    await uploadBytes(recipeStepsImgRef, blob).then((snapshot) => {
        console.log("UPLOADED A BLOB!")
    })
    const url = await getDownloadURL(ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${stepId}/images/${dateId}`));
    console.log('save recipe step picture ', url, );

    const ret = {
        imgUrl: url,
        imgId: dateId,
        dateId: stepId,
    }
    return ret;
}
export const addVideoToRecipeStep = async (blobUrl, recipeId, stepDateId, recipeName ) => {


     console.log(recipeId, stepDateId, blobUrl)
    try {
        const setImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${stepDateId}/videoUrl`);
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        await uploadBytes(setImgRef, blob).then((snapshot) => {
            console.log("UPLOADED A BLOB!", snapshot)
        })
        const url = await getDownloadURL(ref(storage,`taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${stepDateId}/videoUrl`));
        console.log('saved video ', url, );

        return url


    }catch (e) {
        console.log(e.message)
    }
}

export const deleteStepVideoFromCookingStep = async (recipeId, stepDateId, recipeName, data) => {


    const setImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${stepDateId}/videoUrl`);

    try {
        deleteObject(setImgRef)

        // if (data.pictureUrlArray.length > 0) {
        //     await setDoc(doc(db, `recipes-collection/${recipeId}/cooking-instructions/${stepDateId}`), {
        //         ...data
        //     })
        // }

        return true;
    } catch (e) {
        console.log(e.message)
    }
}

export const deleteCookingStep = async (recipeId, recipeName, stepDateId, pictureUrlArray, updatedSteps) => {
    console.log(recipeId, recipeName, stepDateId,pictureUrlArray)

    try {
        console.log(pictureUrlArray)

        if ( pictureUrlArray.length > 0 ){
            pictureUrlArray.map((x) => {
                console.log(x)
                const setImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${stepDateId}/images/${x.imgId}`);
                deleteObject(setImgRef)

            })
        }


        // const setVidRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${stepDateId}/videoUrl`);
        // deleteObject(setVidRef)
        ///not deleting cooking step whenmi dont add picutres
        console.log("deleteDoc Below", `recipes-collection/${recipeId}/cooking-instructions/${stepDateId}`)
        let ret = await deleteDoc(doc(db, `recipes-collection/${recipeId}/cooking-instructions/${stepDateId}`))

        console.log(ret)
        // const recipeData = await getDoc(doc(db, 'recipes-collection', recipeId))
        //
        // if (recipeData.exists()){
        //     recipeData.recipeStepsListTextArray = updatedSteps
        //     console.log(recipeData)
        //
        //     await setDoc(doc( db,'recipes-collection', recipeId), {...recipeData}
        //     )
        // }

        return ("Recipe step deleted : " + stepDateId)
    }catch (error){
        console.log("Problem with deleting recipe cooking step", error.message)
    }

}
export const updateStepPictureArray = async (recipeId,data, recipeName,imgId) => {
    console.log(data)
    //this is so it doeasnt add to firestore databse when deleting first img
    if (data.pictureUrlArray.length > 0 ){
        await setDoc(doc(db, `recipes-collection/${recipeId}/cooking-instructions/${data.dateId}`), {
            ...data
        })
    }


    const setImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${data.dateId}/images/${imgId}`);

    try {
        deleteObject(setImgRef)
        return true;
    } catch (e) {
        console.log(e.message)
    }

    return "success";
}
export const deleteStepPicture = async (recipeId, recipeName, dateId, imgId) => {

    const setImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${dateId}/images/${imgId}`);

    try {
        await deleteObject(setImgRef)
        return console.log(recipeName,"deleted a  image from firestore storage" );
    } catch (e) {
        console.log(e.message)
    }

    return "success";
}
export const deleteTempStepVideo = async (recipeId, recipeName, dateId ) => {

    console.log(recipeId, recipeName, dateId)
    const setImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${dateId}/videoUrl`);

    try {
        console.log(setImgRef.fullPath)
        await deleteObject(setImgRef)
    } catch (e) {
        console.log(e.message, "deleteing temp step vbideo")
    }

    return console.log(recipeName,"deleted a  a video from firestore storage" );
}

// export const deleteStepArrayPicture = async (recipeId, stepIndex, recipeName, imgIndex) => {
//
//     const dbImgRef = await setDoc(doc(db, `recipes-collection/${recipeId}/cooking-instructions/${data.dateId}`), {
//         ...data
//     })
//
//
//     const setImgRef = ref(storage, `taco-fit-recipes/${recipeId}/${recipeName}/cooking-directions/${stepIndex}/images/${imgIndex}`);
//
//     try {
//         deleteObject(setImgRef)
//         return true;
//     } catch (e) {
//         console.log(e.message)
//     }
// }


