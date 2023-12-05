import React from "react"
import FirebaseUiComponent from "../../components/firebase-ui-component/firebase-ui-component";
import {useAuth} from "../../auth";


export default function CheckInPage(){



    return (
        <div  style={{
            border: "solid",
            margin: "6em auto",
            width: "20em",
            height: "40em",
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "blue",
        }}>
            <div>TacoFit Employee</div>
            <div>Clock In/Out</div>
            <FirebaseUiComponent />
        </div>
    )
}