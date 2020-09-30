import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FirebaseAuth from "../database/firebase";
import firebase from "../database/firebase";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default class designerprofile extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      num_rating: 0,
      total_rating: 0,
    };
    const user = firebase.auth().currentUser.uid;
    var fName = "";
    var lName = "";
    var email = "";
    var bio = "";
    var num_rating = 0;
    var total_rating = 0;
    firebase
      .database()
      .ref(`GraphicDesigner/` + user)
      .on("value", function (snapshot) {
        if (snapshot.exists()) {
          firebase
            .database()
            .ref(`GraphicDesigner/` + user)
            .on("value", function (dataSnapshot) {
              fName = dataSnapshot.child("DFirstName").val();
              lName = dataSnapshot.child("DLastName").val();
              email = dataSnapshot.child("Demail").val();
              bio = dataSnapshot.child("bio").val();
              num_rating = dataSnapshot.child("number_of_rating").val();
              total_rating = dataSnapshot.child("total_rating").val();
            });
        }
      });

    this.state.firstName = fName;
    this.state.lastName = lName;
    this.state.email = email;
    this.state.bio = bio;
    this.state.num_rating = num_rating;
    this.state.total_rating = total_rating;
  }
  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
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
          style={styles.forText}
          source={require("../assets/Nerdy-Cactus.png")}
        />
        <Text>First Name:</Text>
        <Text>{this.state.firstName}</Text>
        <Text>Last Name:</Text>
        <Text>{this.state.lastName}</Text>
        <Text>Email:</Text>
        <Text>{this.state.email}</Text>
        <Text>Bio:</Text>
        <Text>{this.state.bio}</Text>
        <Text>Number of ratings:</Text>
        <Text>{this.state.num_rating}</Text>
        <Text>Total rating:</Text>
        <Text>{this.state.total_rating}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("designeredit")}
        >
          <Text
            onPress={() => this.props.navigation.navigate("designeredit")}
            style={styles.forText}
          >
            Edit Profile
          </Text>
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
    borderRadius: 25,

    alignSelf: "center",
  },
  forText: {
    position: "relative",
    top: wp("-200%"),
    left: hp("2%"),
    color: "#4F3C75",
    textAlign: "center",
    alignSelf: "center",
  },

  profileImg: {
    width: 50,
    height: 50,
  },
});
