import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebase";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
var fName, lName, email;
export default class clientprofile extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      cemail: "",
      img: "",
    };
    const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Client/` + user)
      .on("value", (dataSnapshot) => {
        fName = dataSnapshot.child("CFirstName").val();
        lName = dataSnapshot.child("CLastName").val();
        email = dataSnapshot.child("Cemail").val();
        this.updateVal(fName, "firstName");
        this.updateVal(lName, "lastName");
        this.updateVal(email, "cemail");
      });
  }
  updateVal(val, prop) {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
  };
  render() {
    const user = firebase.auth().currentUser.uid;
    const profileImage = firebase.storage().ref("ProfilePictures/" + user);
    profileImage.getDownloadURL().then((url) => {
      this.updateVal(url, "img");
    });
    return (
      <View style={styles.container}>
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
        <Text style={styles.forText}>حسابي الشخصي</Text>
        <Image style={styles.image} source={{ uri: this.state.img }} />
        <Text style={styles.textStyle2}>الاسم الأول</Text>
        <Text style={styles.textStyle}>{this.state.firstName}</Text>
        <Text style={styles.textStyle4}>الاسم الأخير</Text>
        <Text style={styles.textStyle3}>{this.state.lastName}</Text>
        <Text style={styles.textStyle6}>البريد الالكتروني</Text>
        <Text style={styles.textStyle5}>{this.state.cemail}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("clientedit")}
        >
          <Text style={styles.editText}>تعديل بيانات الحساب</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    top: "5%",
    padding: "1%",
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#ffeed6",
    alignItems: "center",
    borderRadius: 150 / 2,
    top: "24%",
    left: "30%",
    right: "5%",
  },
  button: {
    top: "75%",
    backgroundColor: "#4F3C75",
    height: "6%",
    width: "80%",
    borderRadius: 25,
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
  },
  editText: {
    fontSize: 25,
    color: "#fff",
    marginTop: "1%",
    textAlign: "center",
    alignItems: "center",
    top: "5%",
    zIndex: 10,
  },
  forText: {
    position: "absolute",
    top: "5%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
  },
  profileImg: {
    width: 50,
    height: 50,
  },
  textStyle: {
    top: "45%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    left: "40%",
    right: "5%",
    justifyContent: "center",
  },
  textStyle2: {
    top: "45%",
    textAlign: "center",
    fontSize: 19,
    justifyContent: "center",
    color: "#4F3C75",
    position: "absolute",
    right: "55%",
  },
  textStyle3: {
    top: "50%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    justifyContent: "center",

    left: "40%",
    right: "5%",
  },
  textStyle4: {
    top: "50%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    right: "55%",

    justifyContent: "center",
  },
  textStyle5: {
    top: "55%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    textAlign: "center",
    paddingTop: "15%",
    justifyContent: "center",
  },
  textStyle6: {
    top: "50%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "15%",
  },
});
