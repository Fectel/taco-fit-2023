import React from 'react';
import { IonCard } from "@ionic/react";

export const NutritionProgressCircles = ({ nutritionData }) => {
    console.log(nutritionData)
    const formatToTwoDecimalPlaces = (value) => {
        return value % 1 !== 0 ? value.toFixed(2) : value;
    };

    const calculateGradient = (percentage) => {
        const green = '#81c784';
        const lightGreen = '#aed581';
        const yellow = '#ffee58';
        const orange = '#ffb74d';
        const red = '#fff';

        if (percentage < 20) {
            return `conic-gradient(${green} ${percentage}%, ${red} 0deg)`;
        } else if (percentage < 40) {
            return `conic-gradient(${green} 90deg, ${lightGreen} ${percentage - 20}%, ${red} 0deg)`;
        } else if (percentage < 60) {
            return `conic-gradient(${green} 90deg, ${lightGreen} 180deg, ${yellow} ${percentage - 40}%, ${red} 0deg)`;
        } else if (percentage < 80) {
            return `conic-gradient(${green} 90deg, ${lightGreen} 180deg, ${yellow} 270deg, ${orange} ${percentage - 60}%, ${red} 0deg)`;
        } else {
            return `conic-gradient(${green} 90deg, ${lightGreen} 180deg, ${yellow} 270deg, ${orange} 360deg, ${red} ${percentage - 80}%)`;
        }
    };

    return (
        <IonCard style={{ width: "100%", margin: "auto", height: "fit-content" }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: "10em", backgroundColor: "white" }}>
                {nutritionData.map((data, index) => {
                    const percentage = (data.value / data.minimumRecommended) * 100;
                    const gradientStyle = { background: calculateGradient(percentage) };

                    if (data.value > 0) {
                        return (
                            <div key={index} style={{ textAlign: 'center', margin: '0.5em' }}>
                                <div style={{ fontSize: '.7rem', color: "black" }}>{data.name}</div>
                                <div style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    ...gradientStyle
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}>{formatToTwoDecimalPlaces(data.value)}</div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </IonCard>
    );
};

export default NutritionProgressCircles;
