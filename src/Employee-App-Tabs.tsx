import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import {useHistory, Route, Redirect } from "react-router-dom"
import {
    accessibilityOutline as profileIcon,
    home as homeIcon,
    settings as settingsIcon,
    flagOutline,
    barbellOutline
} from "ionicons/icons"
import {useAuth} from "./auth";
import EmployeeDashboard from "./pages/employee-dashboard/employee-dashboard";




const EmployeeAppTabs: React.FC = () => {

    // const { loggedIn } = useAuth();

    // const history = useHistory();
    // useEffect(() => {
    //
    //    if ( !loggedIn ){
    //     history.push("/login")
    //    }
    //    console.log(loggedIn)
    //    console.log("HELLOOOOOOO")
    //
    //
    // },[loggedIn])

    return (
        <IonTabs>

            <IonRouterOutlet>
                <Route exact path="/employee/employee-dashboard">
                    <EmployeeDashboard />
                </Route>





            </IonRouterOutlet>

            <IonTabBar slot="bottom">

                <IonTabButton tab="home" href="/my/employee-feed">

                    <IonIcon icon={barbellOutline}/>
                    <IonLabel>Workouts Feed</IonLabel>

                </IonTabButton>



            </IonTabBar>
        </IonTabs>

    );
};

export default EmployeeAppTabs;