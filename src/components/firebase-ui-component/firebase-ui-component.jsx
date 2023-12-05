import React, {useState, useEffect}from "react"
import { getAuth, RecaptchaVerifier , signInWithPhoneNumber } from "firebase/auth";
import {IonButton, IonCard, IonCardContent,IonInput,  IonCardHeader, IonCardTitle, IonLabel} from "@ionic/react";
import {useAuth, useAuthInit} from "../../auth.ts";
import { auth as firebaseAuth} from "../../firebase.js";
// auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();



export default function FirebaseUiComponent(){
    // const phoneNumber = "+16027435681";

    const {auth, loading } = useAuthInit();
    const { loggedIn, userId } = useAuth()

    const [phoneNumber, setPhoneNumber ] = useState("+1")
    const [otpDropDown, setOtpDropDown ] = useState(false)
    const [otpInput, setOtpInput] = useState("")
    useEffect(() => {

        // firebaseAuth.signOut()
        if (loggedIn === true ){
            if (userId === "TMSYaSyVkSbSpTscM3EBcByaaed2"){
                window.location.href = "./admin/admin-home-page"

            }else {
                window.location.href = "./employee-dashboard"

            }
        }
    },[])

    function generateRecaptcha(){
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onSignInSubmit();
                console.log(response)
            }
        }, firebaseAuth);
    }
    function requestOTP(){
        if(phoneNumber.length >= 12) {
           generateRecaptcha()
            let appVerifier = window.recaptchaVerifier
            setOtpDropDown(true)
            console.log(auth, firebaseAuth, appVerifier)
            signInWithPhoneNumber(firebaseAuth, phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        window.confirmationResult = confirmationResult;
                        console.log("SUccess!!!", confirmationResult)
                        // window.location.href= "/dashboard-page"
                        // ...
                    }).catch((error) => {
                    // Error; SMS not sent
                    // ...
                console.log(error)
                });
;
        }
    }

    function onVerifyOTPClick(){

        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(otpInput).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(result, user)
            window.location.href = "./dashboard"
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    // function onSignInWithPhoneNumber(){
    //     console.log(auth, phoneNumber, appVerifier)
    //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //         .then((confirmationResult) => {
    //             // SMS sent. Prompt user to type the code from the message, then sign the
    //             // user in with confirmationResult.confirm(code).
    //             window.confirmationResult = confirmationResult;
    //             // ...
    //         }).catch((error) => {
    //         // Error; SMS not sent
    //         // ...
    //     });
    // }

    return (<IonCard
    style={{
        width: "90%",
        margin: "auto",
        // display:"flex",
        height: otpDropDown === true ? ("25em"):("25em") ,
        // position: "absolute",
    }}
    >
        <div style={{display:"flex",
            flexDirection: "column",

        }}>
            <div style={{backgroundColor: "red",
                margin:"auto",
                width: "fit-content",
                height: "fit-content",
                
            }} id="recaptcha-container"></div>

            {otpDropDown === true ? (
                <IonCardContent>
                    <div style={{marginTop:"1em", marginBottom: "1em"}}>
                        <IonLabel>OTP</IonLabel>
                        <IonInput style={{

                            height:"1em",
                            // border: "solid",
                            borderRadius:"8px"
                        }}
                                  onIonChange={(e) => setOtpInput(e.target.value)}

                                  value={otpInput}
                                  fill="solid"
                        />
                        <div>Please enter the one time pin sent to {phoneNumber}</div>
                    </div>

                    {otpInput.length > 0  &&(
                        <div>
                            <IonButton
                                disabled={otpInput < 6}
                                expand="block"
                                onClick={() => onVerifyOTPClick()}
                                color="success"
                            >Verify OTP</IonButton>

                        </div>

            )}
                    <IonButton style={{marginTop: "2em"}}  expand="block" color="medium" onClick={() => setOtpDropDown(false)} >Resend Pin</IonButton>

                </IonCardContent>
            ):(<div>
                <IonCardHeader>
                    <IonCardTitle>
                        Sign In with Phone
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <div>
                        <IonLabel>Phone</IonLabel>
                        <IonInput style={{

                            height:"1em",
                            // border: "solid",
                            borderRadius:"8px"
                        }}
                                  value={phoneNumber}
                                  onIonChange={(e) => setPhoneNumber(e.target.value)}

                                  fill="solid"
                        />
                        <div>Please enter your phone number.</div>
                    </div>
                    {/*{otpDropDown && (*/}
                    {/*    <div>*/}
                    {/*        <div id="recaptcha-container"></div>*/}
                    {/*        <div style={{marginTop:"1em", marginBottom: "1em"}}>*/}
                    {/*            <IonLabel>OTP</IonLabel>*/}
                    {/*            <IonInput style={{*/}

                    {/*                height:"1em",*/}
                    {/*                // border: "solid",*/}
                    {/*                borderRadius:"8px"*/}
                    {/*            }}*/}

                    {/*                      fill="solid"*/}
                    {/*            />*/}
                    {/*            <div>Please enter the one time pin sent to {phoneNumber}</div>*/}
                    {/*        </div>*/}

                    {/*    </div>*/}

                    {/*)}*/}

                    {/*<IonButton>Send Pin</IonButton>*/}

                    <IonButton
                        disabled={phoneNumber.length < 12}
                        expand="block"
                        style={{margin: "0 auto"}}
                        onClick={() => requestOTP()}>Send Pin</IonButton>
                </IonCardContent>
            </div>)}

        </div>


    </IonCard>)



}
