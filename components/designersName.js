import firebase from "../database/firebase";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import Svg, { Defs, G, Path } from "react-native-svg";
import { array } from "yup";

const { width, height } = Dimensions.get("window");
var tmpArray = [];
var Rurl = "";

export default class designersName extends Component {
  constructor(props) {
    super();
    this.state = {
      req: props.navigation.state.params.req,
      designers: [],
      Rurl: "",
    }; //End of status

    //---------------------  ----------------  استرجاع جميع المصممين  ----------------  ---------------------- //
    firebase
      .database()
      .ref("GraphicDesigner/")
      .on("value", (snapshot) => {
        var array = snapshot.val();
        var Keys = Object.keys(array);

        for (var i = 0; i < Keys.length; i++) {
          tmpArray[i] = array[Keys[i]];
          tmpArray[i].Dkey = Keys[i];
          this.updateInputVal(tmpArray, "designers");
        } //End of for loop
      }); //End of snapshot
  } //End of constractor

  //////for udate state values @#$%^Y$#$%^&*&^%$#@#$%^&*(*&^%$#@$%^&*(*&^%$#$%^&*()))
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function

  //--------------------- ---------------- استرجاع صور المصممين ---------------- ---------------------- //
  Images(key) {
    var imageURL = "";
    firebase
      .storage()
      .ref("ProfilePictures/" + key)
      .getDownloadURL()
      .then((url) => {
        imageURL = url;
        console.log("INSIDE1      " + imageURL);
      })
      .catch((error) => {
        imageURL =
          "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea";
        console.log("INSIDE3      " + imageURL);
      });

    console.log("INSIDE3      " + imageURL);
  }

  //--------------------- ----------------عرض جميع المصممين ---------------- ---------------------- //

  displayDesigners() {
    return this.state.designers.map((element) => {
      //console.log("HHHEEEERRRRRREEEE       "+element.imageURL);
      return (
        <View
          style={{ width: width / 2 - 40, height: width / 2 - 15 }}
          key={element.Dkey}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              shadowOffset: { width: 0.5, height: 0.5 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 5,
              backgroundColor: "white",
              margin: 10,
              borderRadius: 25,
              backgroundColor: "#4f3c75",
            }}
            onTouchStart={() =>
              this.props.navigation.navigate("RedesignerPortfolio", {
                obj: element.Dkey,
                req: this.state.req,
              })
            }
          >
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderColor: "#fff",
                  borderWidth: 2,
                  top: "4%",
                  borderRadius: 100,
                  alignSelf: "center",
                  backgroundColor: "#fff",
                }}
                source={{ uri: element.imgURL }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#ffff",
                  top: 15,
                  fontFamily: "Tajawal-Bold",
                }}
              >
                {element.DFirstName + " " + element.DLastName}
              </Text>
            </View>
          </View>
        </View>
      ); //End of map return
    }); //End of for loop
  } //End of display

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            color: "#4f3c75",
            alignSelf: "center",
            position: "absolute",
            zIndex: 2,
            top: "8.5%",
            fontFamily: "Tajawal-Medium",
          }}
        >
          اختيار المصمم
        </Text>
        <Svg
          width={416}
          height={144}
          style={{
            alignSelf: "center",
            top: "-3%",
            position: "relative",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
        >
          <G data-name="Group 7">
            {/* <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G> */}
            <Path
              data-name="Icon ionic-ios-arrow-back"
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#FEB518"
              onPress={() => this.props.navigation.goBack()}
            />
            {/* <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            /> */}
          </G>
        </Svg>

        <ScrollView scrollEventThrottle={16}>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            ></ScrollView>

            <View
              style={{
                marginTop: 40,
              }}
            >
              <View
                style={{
                  marginTop: -50,
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {this.displayDesigners()}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    ); // End of render return

    //
  } // End of render
} //End of class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  designersFCont: {
    flex: 2,
    width: width / 2 - 40,
    height: width / 2 - 20,
    borderWidth: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Name: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#000",
    textAlign: "center",
    fontFamily: "Tajawal-Medium",
  },
});
