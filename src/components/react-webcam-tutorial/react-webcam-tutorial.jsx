import React, {useCallback, useEffect, useRef, useState} from "react";
import {IonButton, IonIcon} from "@ionic/react";
import {
    cameraReverseOutline,
    ellipseOutline,
    stopCircleOutline,
    trashOutline as deleteIcon, videocamOffOutline,
    videocamOutline
} from "ionicons/icons";
import {ReactMediaRecorder, useReactMediaRecorder} from "react-media-recorder";
import Webcam from "react-webcam";
import useLocalStorage from "../../useLocalStorage";
import {addVideoToRecipeStep, deleteTempStepVideo} from "../../firebase";

export default function ReactWebcamTutorial({videoUrl, setVideoUrl, optionsUseSate, setOptionsUseState, stepDateId}){

    const [capturing, setCapturing] = useState(false);
    const [blobUrl, setBlobUrl] = useState("");
    const [recordedChunks, setRecordedChunks] = useState([]);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [facingMode, setFacingMode ] = useState("user")

    const [recipeId , setRecipeId ] = useLocalStorage("recipeId", "")
    const [recipeName , setRecipeName ] = useLocalStorage("recipeName", "")



    const [webcamComponentState, setWebcamComponentState ] = useState("")

    useEffect(() => {
        console.log(recordedChunks)
        if (capturing === false && recordedChunks.length > 0 && blobUrl === ""){
            saveVideo()
        }

    },[ capturing, recordedChunks, webcamComponentState, facingMode, blobUrl])

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );


    const handleStartCaptureClick = useCallback(() => {

        let options;
        if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
            options = {mimeType: 'video/webm; codecs=vp9'};
        } else  if (MediaRecorder.isTypeSupported('video/webm')) {
            options = {mimeType: 'video/webm'};
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
            options = {mimeType: 'video/mp4', videoBitsPerSecond : 100000};
        } else {
            console.error("no suitable mimetype found for this device");
        }
        setOptionsUseState(options)


        console.log(options)

        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, options);
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
        setCapturing(true);

    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {

        mediaRecorderRef.current.stop();

        console.log(mediaRecorderRef.current, "STOP RECORDING@!!!")


        setCapturing(false);

        setWebcamComponentState("video preview")
    }, [mediaRecorderRef, setCapturing, recordedChunks, ]);

    async function saveVideo() {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            const url = window.URL.createObjectURL(blob);
            // console.log(url)
            // setBlobUrl(url)
            //
            // const res = await addVideoToRecipeStep(url, recipeId, stepDateId, recipeName)
            // console.log(res)
            setVideoUrl(url)



        }
    }

    async function onDeleteVideoClick() {
        await deleteTempStepVideo(recipeId, recipeName, stepDateId )


        setBlobUrl("")
        window.URL.revokeObjectURL(blobUrl);
        setWebcamComponentState("")
        setRecordedChunks([])
        setVideoUrl("")

    }
    function onFlipCameraClick(){
        console.log("FACING MODE", facingMode)

        if (facingMode === "user"){
            setFacingMode("environment")

        }else if (facingMode === "environment"){
            setFacingMode("user")

        }
    }
// const handleDownload = useCallback(() => {
//     if (recordedChunks.length) {
//         const blob = new Blob(recordedChunks, {
//             type: "video/webm",
//         });
//         const url = URL.createObjectURL(blob);
//         console.log(url)
//         const a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         a.href = url;
//         a.download = "react-webcam-stream-capture.webm";
//         a.click();
//         window.URL.revokeObjectURL(url);
//         setRecordedChunks([]);
//     }
// }, [recordedChunks]);
const videoConstraints = {
    facingMode: `${facingMode}`,
};

    function renderWebcamPage(){
        switch (webcamComponentState) {

            case "":
                return (
                        <div>
                            <div style={{
                                border: "solid thin",
                                transform: facingMode === "environment" ? ("rotateY(180deg)"):("") ,
                                width: "fit-content",
                                margin: "auto"
                            }}>

                                <Webcam

                                    width={200}
                                    height={200}
                                    audio={false}
                                    mirrored={true}
                                    ref={webcamRef}
                                    videoConstraints={videoConstraints}
                                />


                            </div>
                            <div style={{
                                // backgroundColor:"blue",
                                position:"absolute",
                                width:"fit-content",
                                right: "3em",
                                // bottom: "1em",
                                marginTop: "-12em",
                            }}>
                                <div style={{
                                    borderRadius:"5px",
                                    cursor:"pointer",
                                    width: "fit-content",
                                    margin:"auto",

                                    padding:".1em .5em",
                                    backgroundColor: "blue",
                                    display:"flex",
                                    height:"fit-content",
                                }} >
                                    <IonIcon style={{
                                        fontSize:"28px",
                                        color:"black",
                                        // backgroundColor:"red",
                                        margin:"auto",
                                    }}
                                             onClick={() => onFlipCameraClick()}
                                             icon={cameraReverseOutline}></IonIcon>
                                </div>
                            </div>

                            {/*<IonIcon icon={cameraReverseOutline}/>*/}

                            <div style={{ display: "flex",

                                // backgroundColor: "blue"
                            }}>
                                    <div style={{
                                        borderRadius:"5px",
                                        cursor:"pointer",
                                        width: "fit-content",
                                        margin:"auto",
                                        // border:"solid",

                                        padding:".4em .6em",
                                        backgroundColor: "#EB445A",
                                        display:"flex",
                                        height:"fit-content",
                                    }}

                                    >
                                        <IonIcon style={{
                                            fontSize:"20px",
                                            color:"white",
                                            // backgroundColor:"red",
                                            margin:"auto",
                                            cursor:"pointer"
                                        }}
                                                 onClick={ capturing ? (() => handleStopCaptureClick()):(() => handleStartCaptureClick())}

                                                 icon={ capturing ? (videocamOffOutline):(videocamOutline)}></IonIcon>
                                    </div>
                                {capturing  && (
                                    <IonButton
                                        onClick={() => handleStopCaptureClick()}
                                                            color="danger">Stop Recording</IonButton>
                                )}
                            </div>
                        </div>
                )
            case "video preview":

                if (blobUrl !== "" && optionsUseSate !== ""){
                    console.log("OPtionsuseState : ", optionsUseSate.mimeType, videoUrl, blobUrl)

                    return (
                        <div style={{ display:"flex", flexDirection:"column", }}>

                            <div style={{ display:"flex", height: "200px", width:"100%", margin:"auto", marginBottom: ".5em"}}>


                                <video style={{
                                    transform: facingMode === "environment" ? (""):("rotateY(180deg)") ,
                                    width:"100%"
                                }}  muted  autoPlay  loop playsInline={true}

                                >
                                    <source src={videoUrl}  type={optionsUseSate.mimeType}/>

                                </video>


                            </div>
                            {/*<div style={{ display:"flex", height: "100px", width:"100px", margin:"auto", marginBottom: ".5em"}}>*/}


                            {/*    <video style={{*/}
                            {/*        width:"400px"*/}
                            {/*    }}  muted  autoPlay loop*/}
                            {/*           // mimeType={optionsUseSate.mimeType}*/}
                            {/*           src={videoUrl}*/}
                            {/*    />*/}
                            {/*        /!*<source src={videoUrl}  type={optionsUseSate.mimeType}/>*!/*/}

                            {/*    /!*</video>*!/*/}

                            {/*</div>*/}
                            <div style={{
                                borderRadius:"5px",
                                cursor:"pointer",
                                width: "fit-content",
                                margin:"auto",
                                padding:".4em .6em",
                                backgroundColor: "#EB445A",
                                display:"flex",
                                height:"fit-content",
                            }} >
                                react webcam
                                <IonIcon style={{
                                    fontSize:"20px",
                                    color:"white",
                                    // backgroundColor:"red",
                                    margin:"auto",
                                }}
                                         onClick={() => onDeleteVideoClick()}
                                         icon={deleteIcon}></IonIcon>
                            </div>
                        </div>
                    )
                }

                break;
        }



    }
return (
    <div style={{
        // backgroundColor:"black",
        border:"solid",
        height:"18em",
        width:"100%",
        // backgroundColor: "blue"
    }}>
        {renderWebcamPage()}
    </div>

);
}