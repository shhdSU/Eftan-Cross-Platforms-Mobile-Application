import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import firebase from "../database/firebase";
import * as React from "react";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import { AntDesign } from '@expo/vector-icons';
var fName, lName, email, image;
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
    profileImage
      .getDownloadURL()
      .then((url) => {
        this.updateVal(url, "img");
      })
      .catch((error) => {
        image =
          "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea";
        this.updateVal(image, "img");
      });
    return (
      <View style={styles.container}>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-8%", position: "absolute" }}
        >
          <G data-name="Group 7">
            <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G>
            {/* <Path
              data-name="Icon ionic-ios-arrow-back"
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
            /> */}
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            />
          </G>
        </Svg>
        <Text style={styles.forText}>حسابي الشخصي</Text>
        <Image style={styles.image} source={{ uri: this.state.img }} />
        <View style={styles.infoContainer}>
       
        <Text style={styles.textStyle}>{this.state.firstName + " " + this.state.lastName}</Text>
        <Text style={styles.emailStyle}>البريد الالكتروني:</Text>
        <Text style={styles.cemailStyle}>{this.state.cemail}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("تعديل حساب العميل")}
        >
       <AntDesign name="edit" size={35} color="#ffeed6" 
       style={{position:"absolute" , left:"5%",marginTop:"153%"}}
       />
        </TouchableOpacity>
        </View>
       
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
  },
  infoContainer:{
backgroundColor:"#4F3C75",
height:"70%",
width:"90%",
borderRadius:35,
top:"-2%",
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 0,
},
shadowOpacity: 1.48,
shadowRadius: 15.95,

elevation: 19,
  },
  image: {
    flex: 1,
    width: "65%",
    height: "30%",
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 550,
    top: "20%",
    zIndex:20,
    borderColor:"#ffeed6",
    borderWidth:3,
  },
 
  forText: {
    position: "absolute",
    top: "1.5%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight:"700",

  },
 
  textStyle: {
    top: "57%",
    textAlign: "center",
    fontSize: 30,
    color: "#ffeed6",
    position: "absolute",
    justifyContent: "center",
    alignSelf:"center",
    fontWeight:"400",
  },
  
  cemailStyle: {
    top: "82%",
    fontSize: 20,
    color: "#ffeed6",
    position: "absolute",
    alignSelf:"center",
    justifyContent: "center",
    fontWeight:"200",

  },
  emailStyle: {
    top: "75%",
    fontSize: 20,
    color: "#ffeed6",
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
    fontWeight:"200",
alignSelf:"center",
  },
});
