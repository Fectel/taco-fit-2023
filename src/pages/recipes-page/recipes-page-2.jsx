import React, {useState} from "react"
import {CreateNewRecipe, EditeRecipeDataLoading, EditRecipe, RecipeSearchDisplay} from "./recipes-page-components";

export  default function RecipesPage2({setCarouselStep, setMenuArray, menuArray,
                                      chosenRecipe, setChosenRecipe,
                                      }){


    const [ recipePageStep, setRecipePageStep ] = useState("search")
    const [tempPictureUrlArray, setTempPictureUrlArray ] = useState([])
    function renderRecipesPage(){

        switch (recipePageStep) {
            case "search":
                return (
                    <RecipeSearchDisplay
                    setRecipePageStep={setRecipePageStep}
                    setChosenRecipe={setChosenRecipe}
                    setCarouselStep={setCarouselStep}
                    setMenuArray={setMenuArray}
                    menuArray={menuArray}
                    tempPictureUrlArray={tempPictureUrlArray}
                    setTempPictureUrlArray={setTempPictureUrlArray}

                    />
                )
            case "add":
                return (
                    <CreateNewRecipe
                        setRecipePageStep={setRecipePageStep}
                        tempPictureUrlArray={tempPictureUrlArray}
                        setTempPictureUrlArray={setTempPictureUrlArray}

                    />
                )

            case "edit":
                // console.log(chosenRecipe)
            return (
                // <EditeRecipeDataLoading
                //     setRecipePageStep={setRecipePageStep}
                //     data={chosenRecipe}
                // />
                <EditRecipe setRecipePageStep={setRecipePageStep}
                            data={chosenRecipe}
                            tempPictureUrlArray={tempPictureUrlArray}
                            setTempPictureUrlArray={setTempPictureUrlArray}
                />
                )

        }

    }


    return (
        <div style={{
            width: "100%",
            height: "100%",
            overflowY:"scroll",
            // backgroundColor: "purple",

        }}>
            {renderRecipesPage()}

        </div>
    )
}

