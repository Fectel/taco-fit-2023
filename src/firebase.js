import { initializeApp } from "firebase/app";
import {doc, updateDoc,getDoc, setDoc, deleteDoc, collection, addDoc, getFirestore, getDocs} from "firebase/firestore";
import {getStorage, ref, getDownloadURL, uploadBytes} from  'firebase/storage'
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

export const deleteIngredient = async (ingredientDocId) => {

    console.log(ingredientDocId)
    await deleteDoc(doc(db, "ingredients-collection", ingredientDocId))
}
export const loadIngredient = async (docId) => {

    console.log(docId)
    const docRef = await getDoc(doc(db,'ingredients-collection', docId));
    console.log(docRef.data())

    return docRef;


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
        folicAcid,
        vitaminK,
        iodine,
        iron,
        magnesium,
        potassium,
        selenium,
        zinc,
        gramsPerTbsp,
    } = ingredientData;




    const docRef = doc(db, "ingredients-collection", ingredientDocId)

    await updateDoc(docRef, {docId: ingredientDocId,...ingredientData})
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
        folicAcid,
        vitaminK,
        iodine,
        iron,
        magnesium,
        potassium,
        selenium,
        zinc,
        gramsPerTbsp
    } = ingredient;

    try {
        const docRef = await addDoc(collection( db,'ingredients-collection'), {
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
            gramsPerTbsp
        })

        await setDoc(doc(db, 'ingredients-collection', docRef.id), {
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
            gramsPerTbsp,
            docId: docRef.id,
        })

        return ("Ingredient added: " + ingredientName)
    }catch (error){
        console.log("Problem with adding new ingredient", error.message)
    }
}

export const deleteEquipment = async (docId) => {

    console.log(docId)
    await deleteDoc(doc(db, 'equipment-collection', docId))
}

export const saveRecipeStepPicture = async (blobUrl,stepListIndex,imgIndex,recipeName) => {

    console.log(recipeName)
    const recipeStepsImgRef = ref(storage, `recipe-steps-imgs-ref/${recipeName}/steps/${stepListIndex}/${imgIndex}`);

    const response = await fetch(blobUrl);
    console.log(response)
    const blob = await response.blob();
    await uploadBytes(recipeStepsImgRef, blob).then((snapshot) => {
        console.log("UPLOADED A BLOB!")
    })
    const url = getDownloadURL(ref(storage, `recipe-steps-imgs-ref/${recipeName}/steps/${stepListIndex}/${imgIndex}`));
    console.log('save recipe step picture ', url, );

    return url;
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

    }catch (e){
        console.log("Problems with adding equipment")
    }

    return console.log("Added nw equipment to firebase", equipmentName)
}