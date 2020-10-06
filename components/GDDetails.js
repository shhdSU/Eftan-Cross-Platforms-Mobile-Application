import { View, Text, StyleSheet, Image } from "react-native";
import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SvgComponent from "./GD_detailsImage";
import firebase from "../database/firebase";

export default class GDDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      designId: "-MIsiG_yb7Z0SNRIliJK",
      designTitle: "",
      designerProfileImage: "",
      date: "",
      designDescription: "",
      localpath: "",
      name: "",
      Duid: "",
    };

    //--------------------retreive the JSON obj of the design work from realtime DB
    firebase
      .database()
      .ref("Designs/" + this.state.designId)
      .on("value", (snap) => {
        this.updateInputVal(snap.val().designTitle, "designTitle"),
          this.updateInputVal(
            snap.val().designDescription,
            "designDescription"
          ),
          this.updateInputVal(snap.val().designUploadingdate, "date"),
          this.updateInputVal(snap.val().Duid, "Duid"),
          //-----------------------------retreive designer's profile image
          firebase
            .storage()
            .ref("ProfilePictures/" + this.state.Duid)
            .getDownloadURL()
            .then((url) => {
              this.updateInputVal(url, "designerProfileImage");
            })
            .catch((error) => {
              console.log("can not retreive profile img url");
            });
      });
    //----------------------get the URI of the design from storage
    var p = "";
    firebase
      .storage()
      .ref("DesignWork/" + this.state.designId)
      .getDownloadURL()
      .then((url) => {
        p = url;
        //return url;
        this.updateInputVal(p, "localpath");
      })
      .catch((error) => {
        console.log("can not retreive design url");
      });

    //-----------------------------retreive designer's name
    var nname = "";
    firebase
      .database()
      .ref(`GraphicDesigner/` + this.state.Duid)
      .on("value", (dataSnapshot) => {
        if (dataSnapshot.exists()) {
          firebase
            .database()
            .ref(`GraphicDesigner/` + this.state.Duid)
            .on("value", (dataSnapshot) => {
              nname =
                dataSnapshot.child("DFirstName").val() +
                dataSnapshot.child("DLastName").val();
              this.updateInputVal(nname, "name");
            });
        } else console.log("Duid is not found");
      });
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#4F3C75",
              top: "5%",
              fontWeight: "700",
              position: "absolute",
              fontSize: 30,
              textAlign: "center",
              alignSelf: "center",
              zIndex: 1,
            },
          ]}
        >
          {this.state.designTitle}
        </Text>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-2%", position: "absolute" }}
        >
          <G data-name="Group 7">
            <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G>
            <Path
              data-name="Icon ionic-ios-arrow-back"
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
            />
            <Path
              data-name="Icon material-menu"
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            />
          </G>
        </Svg>
        <Image
          style={styles.preview}
          source={{
            uri: this.state.localpath,
          }}
        />

        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#4F3C75",
              top: "8%",
              left: "-23%",
            },
          ]}
        >
          {this.state.date}
        </Text>
        <Image
          // ontouchstart= {this.props.navigation.navigate("صفحة حساب العمل من وجهة نظر المصمم",this.state.Duid)}@HadeelHamad change this later

          style={styles.profileImage}
          source={{
            uri: this.state.designerProfileImage,
          }}
        />
        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#4F3C75",
              top: "8%",
              left: "-23%",
              fontWeight: "700",
            },
          ]}
        >
          {this.state.name}
        </Text>
        <Svg
          width={42}
          height={42}
          viewBox="0 0 42 42"
          style={{
            top: 70,
            left: 135,
          }}
        >
          <G
            data-name="Ellipse 26"
            fill="rgba(255,255,255,0.62)"
            stroke="#4f3c75"
            strokeWidth={2}
          >
            <Circle cx={21} cy={21} r={21} stroke="none" />
            <Circle cx={21} cy={21} r={20} fill="none" />
          </G>
          <Path
            data-name="Icon awesome-sticky-note"
            d="M25.17 23.964H32V10.705A1.2 1.2 0 0030.795 9.5h-20.09A1.2 1.2 0 009.5 10.705v20.09A1.2 1.2 0 0010.705 32h13.259v-6.83a1.209 1.209 0 011.206-1.206zm6.479 2.762l-2.625 2.624-2.3 2.3a1.2 1.2 0 01-.854.352h-.3v-6.431H32v.306a1.2 1.2 0 01-.352.85z"
            fill="#4f3c75"
          />
        </Svg>
        <Text
          // ontouchstart= {this.props.navigation.navigate("صفحة حساب العمل من وجهة نظر المصمم",this.state.Duid)}@HadeelHamad change this later
          style={[
            styles.inputStyle2,
            {
              color: "#4F3C75",
              top: "2%",
              left: "-23.5%",
              fontWeight: "700",
            },
          ]}
        >
          وصف العمل
        </Text>
        <Text
          style={[
            {
              color: "#4F3C75",
              top: "3%",
              left: "0%",
              textAlign: "center",
              fontWeight: "700",
              width: 340,
              height: 150,
              fontSize: 15,
            },
          ]}
        >
          {this.state.designDescription}{" "}
        </Text>
        <SvgComponent
          style={{
            right: 120,
          }}
        ></SvgComponent>
      </View>
    );
  }
}

//Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  forText: {
    position: "relative",
    top: wp("-200%"),
    left: hp("2%"),
    color: "#4F3C75",
  },
  forText2: {
    position: "relative",
    top: hp("45%"),
    left: hp("11%"),
    color: "#4F3C75",
    fontSize: 30,
  },
  preview: {
    width: 330,
    height: 280,
    borderColor: "#ccc",
    borderWidth: 2,
    top: "12.5%",
    borderRadius: 35,
    alignSelf: "center",
  },
  inputStyle2: {
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
  },
  profileImage: {
    //---------------------------------you may need to modify this @shhdSU
    width: 40,
    height: 40,
    top: "30%",
  },
});
