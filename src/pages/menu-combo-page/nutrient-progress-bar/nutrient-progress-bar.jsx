import React from 'react';
import { IonCard } from "@ionic/react";

export const NutritionProgressBars = ({ nutritionData }) => {
    const formatToTwoDecimalPlaces = (value) => {
        return value % 1 !== 0 ? value.toFixed(2) : value;
    };



    const calculateGradient = (percentage) => {
        const green = '#81c784';
        const lightGreen = '#aed581';
        const yellow = '#ffee58';
        const orange = '#ffb74d';
        const red = '#fff';
        // const red = '#e57373';

        if (percentage < 20) {
            return `linear-gradient(to right, ${green} ${percentage}%, ${red} 0%)`;
        } else if (percentage < 40) {
            return `linear-gradient(to right, ${green} 20%, ${lightGreen} ${percentage}%, ${red} 0%)`;
        } else if (percentage < 60) {
            return `linear-gradient(to right, ${green} 20%, ${lightGreen} 40%, ${yellow} ${percentage}%, ${red} 0%)`;
        } else if (percentage < 80) {
            return `linear-gradient(to right, ${green} 20%, ${lightGreen} 40%, ${yellow} 60%, ${orange} ${percentage}%, ${red} 0%)`;
        } else {
            return `linear-gradient(to right, ${green} 20%, ${lightGreen} 40%, ${yellow} 60%, ${orange} 80%, ${red} ${percentage}%)`;
        }
    };
    console.log(nutritionData)

    return (
        <IonCard style={{width:"100%", margin:"auto", height: "fit-content", minWidth:"4.5em"}}>

            <div style={{ width: '100%',padding: ".1em", margin: 'auto', height:"fit-content", backgroundColor:"white" }}>
                {nutritionData.map((data, index) => {
                    const percentage = (data.value / data.minimumRecommended) * 100;
                    const gradientStyle = { background: calculateGradient(percentage) };

                    if ( data.value >0 && data.name !== "Calories"){
                        return (
                            <div key={index} style={{ marginBottom: '.1em' }}>
                                <div style={{ fontSize: '.7rem', color: "black" }}>{data.name} {formatToTwoDecimalPlaces(parseFloat(data.value))}<span>{data.name !== "Calories" && (<span> g</span>)}</span></div>
                                {/*<div style={{ fontSize: '.7rem', color: "black" }}>{data.name} {formatToTwoDecimalPlaces(data.value)}<span>{data.name !== "Calories" && (<span> g</span>)}</span></div>*/}
                                <div style={{
                                    height: '10px',
                                    borderRadius: '2px',
                                    overflow: 'hidden',
                                    ...gradientStyle
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${percentage}%`,
                                        position: 'relative'
                                    }}>

                                    </div>
                                </div>
                            </div>
                        );
                    }


                })}
            </div>
        </IonCard>
    );
};

export default NutritionProgressBars;

