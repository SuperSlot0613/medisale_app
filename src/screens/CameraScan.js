import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as FaceDetector from "expo-face-detector";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import { Block } from "galio-framework";
import argonTheme from "../../constants/Theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDocument,
  selectFaceImage,
  setDocument,
  setDocumentImage,
  setFaceImage,
  setUserImage,
} from "../../feature/SellerSlice";
import { selectBasket } from "../../feature/navSlice";
import { getStorage, ref, uploadString } from "firebase/storage";
import axios from "axios";
import Loader from "../components/Loader";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const CameraScan = () => {
  const cameraRef = useRef(null);

  const route = useRoute();
  const { card, val } = route.params;

  const navigation = useNavigation();
  const [showCamera, setshowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(
    card ? Camera.Constants.Type.back : Camera.Constants.Type.front
  );
  const [image, setImage] = useState(null);
  const [faceData, setfaceData] = useState([]);
  const dispatch = useDispatch();
  const documentImage = useSelector(selectDocument);
  const faceimage = useSelector(selectFaceImage);
  const [faceDetected, setfaceDetected] = useState(false);
  const [faceBox, setfaceBox] = useState(null);
  const [smilingProbability, setsmilingProbability] = useState(null);
  const [lefteyes, setlefteyes] = useState(null);
  const [righteyes, setrighteyes] = useState(null);
  const [loader, setloader] = useState({
    isLoader: true,
    loaderMsg: "The image is uploading, please wait...",
    loaderIcon: "uploading",
    uploadingProgress: 0,
  });

  const [visible, setVisible] = useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    if (faces.length === 1) {
      setfaceDetected(true);
      setfaceBox(faces[0].bounds);
      // console.log(faceBox);
      // console.log(faces[0]);
      setsmilingProbability(faces[0].smilingProbability);
      setlefteyes(faces[0].leftEyeOpenProbability);
      setrighteyes(faces[0].rightEyeOpenProbability);
    } else {
      setfaceDetected(false);
    }
  };

  const ImageValidation = () => {
    console.log("The imagevalidation function is call");
    const jsobject = {
      documentImage: documentImage,
      faceimage: faceimage,
    };
    navigation.navigate("Loader", {
      jsobject: jsobject,
    });

    // await axios
    //   .post("http://192.168.1.14:3003/facevalidation", jsobject)
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    // if (loader.isLoader) {
    //   return (
    //     <>
    //       <Loader
    //         isLoader={loader.isLoader}
    //         loaderIcon={loader.loaderIcon}
    //         loaderMsg={loader.loaderMsg}
    //       />
    //       {loader.uploadingProgress > 0 && (
    //         <View
    //           style={{
    //             position: "absolute",
    //             borderTopWidth: 2,
    //             top: 70,
    //             borderTopColor: "red",
    //             backgroundColor: "red",
    //             width: `${loader.uploadingProgress * 100}%`,
    //             height: "0.1%",
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      console.log("In take photo");
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspects: [4, 3],
          quality: 1,
          base64: true,
        });
        if (card) {
          dispatch(setDocumentImage(photo.uri));
          dispatch(setDocument(photo.base64));
        } else {
          dispatch(setUserImage(photo.uri));
          dispatch(setFaceImage(photo.base64));
        }
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.container}>
        {faceDetected ? (
          <View
            style={{
              position: "absolute",
              backgroundColor: "transparent",
              flexDirection: "row",
              width: faceBox ? faceBox.size.width : "100%",
              height: faceBox ? faceBox.size.height : "100%",
              top: faceBox ? faceBox.origin.y : "0",
              left: faceBox ? faceBox.origin.x : "0",
              borderColor:
                smilingProbability > 0.5 && lefteyes > 0.5 && righteyes > 0.5
                  ? "#33FF33"
                  : "red",
              borderWidth: 3,
              borderStyle: "dashed",
              display: faceDetected ? "flex" : "none",
              zIndex: 100,
            }}
          />
        ) : (
          <></>
        )}
        {showCamera ? (
          <Camera
            style={styles.camera}
            type={type}
            flashMode={Camera.Constants.FlashMode.on}
            ref={cameraRef}
            autoFocus={Camera.Constants.AutoFocus.on}
            onFacesDetected={card === "true" ? "" : handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
          >
            {card === "true" ? (
              <Block
                card
                flex={1}
                style={[
                  {
                    width: "95%",
                    marginLeft: 8,
                    marginRight: 20,
                    marginTop: 120,
                    borderRadius: 4,
                    borderColor: "white",
                    borderWidth: 2,
                  },
                  styles.shadow,
                ]}
              ></Block>
            ) : (
              <></>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                // onPress={() => {
                //   setType(
                //     type === Camera.Constants.Type.back
                //       ? Camera.Constants.Type.front
                //       : Camera.Constants.Type.back
                //   );
                // }}
              >
                <MaterialIcons
                  name="flip-camera-android"
                  size={44}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  const r = await takePhoto();
                  if (!r.cancelled) {
                    setImage(r.uri);
                  }
                  setshowCamera(false);
                  setfaceDetected(false);
                }}
              >
                <MaterialIcons name="camera" size={44} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => setshowCamera(false)}
              >
                <MaterialCommunityIcons
                  name="camera-off"
                  size={44}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View style={styles.main_container}>
            <View
              style={{
                width: "100%",
                alignItem: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              {image === null ? (
                <Block
                  card
                  flex={0.8}
                  style={[
                    {
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#ced6d0",
                      width: "95%",
                      margin: "2%",
                      marginTop: 50,
                    },
                    styles.shadow,
                  ]}
                >
                  <Text>Image Will Display Here</Text>
                </Block>
              ) : (
                <Block
                  card
                  flex={0.8}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "95%",
                    margin: "2%",
                  }}
                >
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "blue",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  />
                </Block>
              )}
            </View>
            <View>
              <Button
                style={{ width: 300 }}
                mode="contained"
                onPress={() => {
                  if (image !== null && val === 1) {
                    navigation.navigate("Instruction", {
                      card: false,
                      val: 2,
                    });
                  } else if (image !== null && val === 2) {
                    ImageValidation();
                  }
                }}
              >
                Next Step
              </Button>
              <Button
                style={{ width: 300 }}
                mode="contained"
                onPress={() => setshowCamera(true)}
              >
                {image === null ? "Take A Picture" : "Try To Retake"}
              </Button>
            </View>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
    // alignItems:"center"
  },
  button: {
    flex: 0.4,
    alignSelf: "flex-end",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
    width: 70,
    fontWeight: "bold",
  },
  main_container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  check_button: {
    padding: 10,
    borderColor: "crimson",
    backgroundColor: "crimson",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  main_text: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  RectangleShapeView: {
    marginTop: 50,
    width: "80%",
    height: 120,
  },
  shadow: {
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  RectangleShapeView: {
    //To make Rectangle Shape
    marginTop: 20,
    width: 120 * 2,
    height: 120,
    backgroundColor: "#14ff5f",
  },
});

export default CameraScan;
