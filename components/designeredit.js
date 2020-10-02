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
import FirebaseAuth from "../database/firebase";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
export default class designeredit extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      // num_rating: 0,
      //total_rating: 0,
      img: "",
    };
    const user = firebase.auth().currentUser.uid;
    var fName, lName, email, bio, num_rating, total_rating;
    firebase
      .database()
      .ref(`GraphicDesigner/` + user)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          firebase
            .database()
            .ref(`GraphicDesigner/` + user)
            .on("value", (dataSnapshot) => {
              fName = dataSnapshot.child("DFirstName").val();
              lName = dataSnapshot.child("DLastName").val();
              email = dataSnapshot.child("Demail").val();
              bio = dataSnapshot.child("bio").val();
              //   num_rating = dataSnapshot.child("number_of_rating").val();
              //  total_rating = dataSnapshot.child("total_rating").val();
              this.updateInputVal(fName, "firstName");
              this.updateInputVal(lName, "lastName");
              this.updateInputVal(email, "email");
              this.updateInputVal(bio, "bio");
              //  this.updateInputVal(num_rating, "num_rating");
              //  this.updateInputVal(total_rating, "total_rating");
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
  confirmChanges = () => {
    const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("GraphicDesigner/" + user)
      .set({
        DFirstName: this.state.firstName,
        DLastName: this.state.lastName,
        Demail: this.state.email,
        //   number_of_rating: this.state.num_rating,
        //  total_rating: this.state.total_rating,
        bio: this.state.bio,
      });
    this.props.navigation.navigate("designerprofile");
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
  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
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
  render() {
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
          style={{
            height: 50,
            width: 50,
          }}
          source={this.state.img}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="First name"
          value={this.state.firstName}
          onChangeText={(val) => this.updateInputVal(val, "firstName")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Last name"
          value={this.state.lastName}
          onChangeText={(val) => this.updateInputVal(val, "lastName")}
          maxLength={15}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Bio"
          value={this.state.bio}
          onChangeText={(val) => this.updateInputVal(val, "bio")}
          maxLength={120}
        />
        <TouchableOpacity style={styles.button}>
          <Text onPress={() => this.confirmChanges()}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onChooseImagePress()}
        >
          <Text style={styles.forText}>Upload Image</Text>
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
    padding: "1%",
    borderRadius: 25,
    width: "80%",
    height: "6%",
    alignSelf: "center",
  },
  forText: {
    top: "-200%",
    left: "2%",
    color: "#4F3C75",
    alignSelf: "center",
  },
  forText2: {
    position: "absolute",
    top: "45%",
    left: "11%",
    color: "#4F3C75",
    fontSize: 30,
  },
  profileImg: {
    width: 50,
    height: 50,
  },
});
