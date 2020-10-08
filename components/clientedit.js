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
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";

export default class clientedit extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      img: "",
    };
    const user = firebase.auth().currentUser.uid;
    var fName, lName, email;
    firebase
      .database()
      .ref(`Client/` + user)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          firebase
            .database()
            .ref(`Client/` + user)
            .on("value", (dataSnapshot) => {
              fName = dataSnapshot.child("CFirstName").val();
              lName = dataSnapshot.child("CLastName").val();
              email = dataSnapshot.child("Cemail").val();
              this.updateInputVal(fName, "firstName");
              this.updateInputVal(lName, "lastName");
              this.updateInputVal(email, "email");
            });
        }
      });
    const profileImage = firebase.storage().ref("ProfilePictures/" + user);
    profileImage.getDownloadURL().then((url) => {
      this.updateInputVal(url, "img");
    });
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  onChooseImagePress = async () => {
    const user = firebase.auth().currentUser.uid;
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uploadImage(result.uri, user)
        .then(() => {
          const profileImage = firebase
            .storage()
            .ref("ProfilePictures/" + user);
          profileImage.getDownloadURL().then((url) => {
            this.updateInputVal(url, "img");
          });
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };
  uploadImage = async (uri, draftName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("ProfilePictures/" + draftName);

    return ref.put(blob);
  };

  confirmChanges = () => {
    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //check whether string contains special characters
    var numCheck = /\d/; //check whether string contains numbers
    if (this.state.firstName === "" || this.state.lastName === "") {
      Alert.alert(
        "تنبيه",
        "فضلًا تأكد من إدخال جميع بياناتك",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    } else if (
      specialCheck.test(this.state.firstName) ||
      specialCheck.test(this.state.lastName)
    ) {
      Alert.alert(
        "تنبيه",
        "فضلًا تأكد من إدخال اسمك الأول والأخير بشكل صحيح",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    } else if (
      numCheck.test(this.state.firstName) ||
      numCheck.test(this.state.lastName)
    ) {
      Alert.alert(
        "تنبيه",
        "فضلًا تأكد من إدخال اسمك الأول والأخير بشكل صحيح",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    }

    const user = firebase.auth().currentUser;

    firebase
      .database()
      .ref("Client/" + user.uid)
      .set({
        CFirstName: this.state.firstName,
        CLastName: this.state.lastName,
        Cemail: this.state.email,
      });
    this.props.navigation.navigate("clientprofile");
  };
  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
  };
  resetPassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        Alert.alert(
          "تنبيه",
          "الرجاء تفقد بريدك الالكتروني",
          [{ text: "حسنًا" }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
  render() {
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
        <Text style={styles.forText}>تعديل الحساب</Text>
        <Image style={styles.image} source={{ uri: this.state.img }} />
        <Text onPress={() => this.onChooseImagePress()} style={styles.forText2}>
          رفع صورة شخصية
        </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="First name"
          value={this.state.firstName}
          onChangeText={(val) => this.updateInputVal(val, "firstName")}
        />

        <TextInput
          style={styles.inputStyle2}
          placeholder="Last name"
          value={this.state.lastName}
          onChangeText={(val) => this.updateInputVal(val, "lastName")}
          maxLength={15}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.editText} onPress={() => this.confirmChanges()}>
            حفظ
          </Text>
        </TouchableOpacity>
        <Text onPress={() => this.resetPassword()} style={styles.forText3}>
          تعديل كلمة السر
        </Text>
      </View>
    );
  }
}

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
  forText: {
    position: "absolute",
    top: "5%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    alignItems: "center",
  },
  forText2: {
    alignItems: "center",
    position: "absolute",
    top: "41%",
    color: "#4F3C75",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  forText3: {
    alignItems: "center",
    position: "absolute",
    top: "77%",
    color: "#4F3C75",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "underline",
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
    top: "20%",
    left: "30%",
    right: "5%",
  },
  button: {
    top: "70%",
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
  profileImg: {
    width: 50,
    height: 50,
  },
  inputStyle: {
    position: "absolute",
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "46%",
    left: "10%",
  },
  inputStyle2: {
    position: "absolute",
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "53%",
  },
});