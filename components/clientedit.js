import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import firebase from "../database/firebase";
import FirebaseAuth from "../database/firebase";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class clientedit extends React.Component {
  constructor(props) {
    super();
    const user = firebase.auth().currentUser.uid;
    var f, l, e;
    this.state = {
      firstName: "",
      lastName: "",
    };
    firebase
      .database()
      .ref(`Client/` + user)
      .on("value", function (dataSnapshot) {
        f = dataSnapshot.child("CFirstName").val();
        l = dataSnapshot.child("CLastName").val();
        e = dataSnapshot.child("Cemail").val();
      });
    this.state = {
      firstName: f,
      lastName: l,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  confirmChanges = () => {
    const user = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("Client/" + user)
      .set({
        CFirstName: this.state.firstName,
        CLastName: this.state.lastName,
      });
    this.props.navigation.navigate("clientprofile");
    console.log("i'm here");
  };
  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
  };
  render() {
    const state = this.state;

    return (
      <View>
        <Svg>
          <Defs>
            <ClipPath id="prefix__a">
              <Path d="M0 0h375v812H0z" />
            </ClipPath>
          </Defs>
          <G data-name="Gallery Screen" clipPath="url(#prefix__a)">
            <Path fill="#fff" d="M0 0h375v812H0z" />
            <G filter="url(#prefix__b)">
              <Rect
                data-name="Rectangle 6"
                width={398}
                height={126}
                rx={38}
                transform="translate(-11 -18)"
                fill="#ffeed6"
              />
            </G>
            <G data-name="Icon ionic-md-log-out" onPress={this.signOutUser}>
              <Path
                data-name="Path 104"
                d="M61.125 52.125H47.787l3.066-3.143-2.1-2.1L42 53.625l6.75 6.75 2.18-2.1-3.143-3.15h13.338z"
                fill="#4f3c75"
              />
              <G data-name="Group 3">
                <Path
                  data-name="Path 105"
                  d="M56.646 42.002a11.629 11.629 0 018.206 19.843 11.594 11.594 0 01-16.4.014l-2.13 2.13a15.541 15.541 0 001.95 1.636 14.637 14.637 0 10-1.941-22.352l2.124 2.118a11.509 11.509 0 018.191-3.389z"
                  fill="#4f3c75"
                />
              </G>
            </G>
            <Path
              data-name="Icon material-menu"
              d="M316.676 71.883H357V67.4h-40.324zm0-11.2H357V56.2h-40.324zm0-15.683v4.48H357V45z"
              fill="#4f3c75"
            />
          </G>
        </Svg>
        <Image
          style={styles.forText}
          source={require("../assets/Nerdy-Cactus.png")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="first name"
          value={this.state.firstName}
          onChangeText={(val) => this.updateInputVal(val, "firstName")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="last name"
          value={this.state.lastName}
          onChangeText={(val) => this.updateInputVal(val, "lastName")}
          maxLength={15}
        />

        <TouchableOpacity style={styles.button}>
          <Text onPress={() => this.confirmChanges()}>Save</Text>
        </TouchableOpacity>
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
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: hp("1%"),
    borderRadius: 25,
    width: wp("80%"),
    height: hp("6%"),
    alignSelf: "center",
  },
  forText: {
    top: wp("-200%"),
    left: hp("2%"),
    color: "#4F3C75",
    alignSelf: "center",
  },
  forText2: {
    position: "absolute",
    top: hp("45%"),
    left: hp("11%"),
    color: "#4F3C75",
    fontSize: 30,
  },
  profileImg: {
    width: 50,
    height: 50,
  },
});
function ViewProfile(state) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.forText}
        source={require("../assets/Nerdy-Cactus.png")}
      />
      <Text style={styles.forText}>Name:</Text>
      <Text style={styles.forText}>{state.firstName}</Text>
      <Text>hi</Text>
      <Text style={styles.forText}>Email:</Text>
      <Text style={styles.forText}>{state.email}</Text>
    </View>
  );
}
function EditProfile(state) {
  return (
    <View>
      <Text
        style={{ fontSize: 20, color: "green" }}
        styleDisabled={{ color: "red" }}
      >
        "this is some text"
      </Text>
    </View>
  );
}
