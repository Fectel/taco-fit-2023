import React from "react";
import {IonCard, IonPage} from "@ionic/react";
import {useHistory} from "react-router-dom";


const AdminHomePage = () => {


    function AdminDashBoard(){
        const history = useHistory();

        function onDashboardOptionClick(link){
            history.push(link)
        }

        const adminDashboardOptions = [
            {
                title: "UX Page",
                color: "#fe8a71",
                href: "/home"
            },
            {
                title: "Create New Recipe",
                color: "#f6cd61",
                href: "/recipes"
            },
            // {
            //     title: "Manage Finances",
            //     color: "#3da4ab",
            //     href: "/"
            // },
            {
                title: "Manage Inventory",
                color: "#0e9aa7",
                href: "/manage-inventory"
            }
        ]

        // function renderAdminDashboard
        return (
            <IonCard
                style={{
                    margin: "auto",
                    backgroundColor: "#4a4e4d",
                    padding: "1em",
                }}
            >
                {adminDashboardOptions.map((option,i) => (
                    <IonCard
                        key={i}
                        onClick={() => onDashboardOptionClick(option.href)}
                    style={{
                        width: "100%",
                        display:"flex",
                        height: "10em",
                        cursor: "pointer",
                        backgroundColor: option.color,
                        // textAlign: "center",
                    }}
                    >
                        <div
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            width: "fit-content",
                            height: "fit-content",
                            margin: "auto auto",
                            color: "black"
                        }}
                        >
                            {option.title}

                        </div>
                    </IonCard>
                ))}
            </IonCard>
        )
    }

    return(
        <div style={{
            border: "solid",
            margin: "6em auto",
            width: "20em",
            height: "40em",
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "blue",
        }}
        >
            Admin home page
            <AdminDashBoard />

        </div>
    )
}

export default AdminHomePage;