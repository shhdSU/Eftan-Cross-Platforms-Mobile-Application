import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import firebase from "../database/firebase";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import GalleryImage from "./GalleryImage";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
const { width, height } = Dimensions.get("window");
var designGallery = new Array();

export default class designerGallery extends React.Component {
  constructor (props)  {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      bio: "",
      img: "",
      designTitle: "",
      designDescription: "",
      category: "",
      designFileKey: "",
      isLoading: false,
      localpath: "",
      designUrl: "",
    };
    const { navigate } = props.navigation;
    const user = props.navigation.state.params.uid; //to get parameters
    var fName, lName, bio,image;
    firebase
      .database()
      .ref(`GraphicDesigner/` + user)
      .on("value", (dataSnapshot) => {
        fName = dataSnapshot.child("DFirstName").val();
        lName = dataSnapshot.child("DLastName").val();
        bio = dataSnapshot.child("bio").val();
        //num_rating = dataSnapshot.child("number_of_rating").val();
        //total_rating = dataSnapshot.child("total_rating").val();
        this.updateInputVal(fName, "firstName");
        this.updateInputVal(lName, "lastName");
        this.updateInputVal(bio, "bio");
      });
      const profileImage = firebase.storage().ref("ProfilePictures/" + user);
      profileImage
        .getDownloadURL()
        .then((url) => {
          this.updateInputVal(url, "img");
        })
        .catch((error) => {
          image =
            "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea";
          this.updateInputVal(image, "img");
        });




  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
  };

    readData = () => {
      const user = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref("Designs/").orderByChild("Duid").equalTo(user);
      ref.on("value", (snapshot) => {
        var design = snapshot.val();
        var designKeys = Object.keys(design);
        for (var i = 0; i < designKeys.length; i++) {
          var designInfo = designKeys[i];
          var categ = design[designInfo].category;
          var desDis = design[designInfo].designDescription;
          var desFileKey = design[designInfo].designFileKey;
          var desTitle = design[designInfo].designTitle;
          var desUploadingdate = design[designInfo].designUploadingdate;
          var designUrl = design[designInfo].designUrl;
          designGallery[i] = {
            category: categ,
            designDescription: desDis,
            designFileKey: desFileKey,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: designUrl,
          };
        }
        console.log(designGallery);
        console.log(designGallery.length);
      });
      return designGallery.map((element) => {
        return (
          <View
            style={{
              width: width / 2 - 40,
              height: width / 2 - 20,
                    }}
          >
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                }}
                width={width}
                source={{ uri: element.designUrl }}
              />
            </View>
            <View
              style={{
                justifyContent: "space-evenly",
                paddingLeft: 10,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#4F3C75" }}
              >
                {"  عنوان العمل:" + element.designTitle}
              </Text>
            </View>
          </View>
        );
      });
  };
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
        <Text style={styles.forText}>حسابي الشخصي</Text>
        <Image style={styles.image} source={{ uri: this.state.img }} />
        <Text style={styles.textStyle2}>الاسم الأول</Text>
        <Text style={styles.textStyle}>{this.state.firstName}</Text>
        <Text style={styles.textStyle4}>الاسم الأخير</Text>
        <Text style={styles.textStyle3}>{this.state.lastName}</Text>
        <Text style={styles.textStyle8}>نبذة</Text>
        <Text style={styles.textStyle7}>{this.state.bio}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.editText} onPress={() => this.props.navigation.navigate("requestForms", {uuid: user})}>
            طلب تصميم جديد
          </Text>
          </TouchableOpacity> 

        <View
          style={{
            flex: 1,
            // // flexDirection: "row",
            // // flexWrap: "wrap",
            paddingHorizontal: 20,
            bottom: "180%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {this.readData()}
        </View>
        
      </View>
    );
  }
}

// {designGallery.map((element) => {
//   <View style={{ marginBottom: 30 }}>
//     <ScrollView scrollEventThrottle={16}>
//       <View>
//         <GalleryImage
//           name={element.designTitle}
//           width={width}
//           imageUri={element.designUrl}
//         />
//         <Text>{"اسم" + element.designTitle}</Text>
//         <Text>text</Text>
//       </View>
//     </ScrollView>
//   </View>;
// })}






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

  forText: {
    position: "absolute",
    top: "5%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
  },
  forText2: {
    alignItems: "center",
    position: "absolute",
    top: "45%",
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
  inputStyle3: {
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
    top: "60%",
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
  textStyle7: {
    top: "64%",
    textAlign: "center",
    fontSize: 14,
    color: "#4F3C75",
    position: "absolute",
    textAlign: "center",
    paddingTop: "15%",
    justifyContent: "center",
  },
  textStyle8: {
    top: "67%",
    textAlign: "center",
    fontSize: 19,
    color: "#4F3C75",
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
  },
});
