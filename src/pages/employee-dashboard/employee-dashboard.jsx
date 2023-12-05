import React, {useState} from "react"

export default function EmployeeDashboard(){

    const [ employeeDashboardState, EmployeeDashboardState ] = useState("")

    function renderEmployeeDashboard(){
        switch (employeeDashboardState) {

            case "":
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
                        Employee Dashboard
                    </div>
                )
        }
    }

    return (
        <div>
            {renderEmployeeDashboard()}

        </div>
    )
}