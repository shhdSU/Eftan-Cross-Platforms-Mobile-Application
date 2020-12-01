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
import { AirbnbRating, Rating } from "react-native-ratings";

const { width, height } = Dimensions.get("window");
var designGallery = new Array();
var shownDesigns = new Array();
export default class designerGallery extends React.Component {
  constructor(props) {
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
      propsUser: "",
      designGalleryState: [],
      isClient: false,
      designShownState: [],
    };

    const propsUser = props.navigation.state.params.duid;
    this.updateInputVal(propsUser, "propsUser");
    var fName, lName, bio, image;
    firebase
      .database()
      .ref(`GraphicDesigner/` + propsUser)
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
    const profileImage = firebase.storage().ref("ProfilePictures/" + propsUser);
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

    //=======================================================
    
    var ref = firebase
      .database()
      .ref("Designs/")
      .orderByChild("Duid")
      .equalTo(propsUser);
    ref.on("value", (snapshot) => {
      if (!snapshot.exists()) {
      }
      designGallery=[];
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
      this.updateInputVal(designGallery, "designGalleryState");
      shownDesigns=[];
      if (designGallery.length >= 2) {
        for (var i = 0; i < 2; i++) {
          shownDesigns[i] = designGallery[i];
        }
        this.updateInputVal(shownDesigns, "designShownState");
      } else {
        this.updateInputVal(designGallery, "designShownState");
      }
    });

    const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Client/` + user)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          this.updateInputVal(true, "isClient");
        }
      });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  readData = () => {
    return this.state.designShownState.map((element) => {
      return (
        <View
          key={element.designUrl}
          style={{ width: width / 2 - 40, height: width / 2 - 20 }}
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
            }}
          >
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
                margin: 5,
              }}
              width={width}
              source={{ uri: element.designUrl }}
            />
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#4f3c75" }}
            >
              {element.designTitle}
            </Text>
          </View>
        </View>
      );
    });
  };

  //---------------*to get the number of raters*----------------------

  raters = () => {
    var raters;
    firebase
      .database()
      .ref("GraphicDesigner/" + this.state.propsUser)
      .on("value", (dataSnapshot) => {
        raters = dataSnapshot.child("raters").val();
      });
    //  this.updateVal(raters, "raters");
    console.log("raters in the constructer" + raters);
    return raters;
  };
  //---------------*to get the avrage of the rating and display it as a star*----------------------

  AVG_Rate = () => {
    var AVG_Rate;
    firebase
      .database()
      .ref("GraphicDesigner/" + this.state.propsUser)
      .on("value", (dataSnapshot) => {
        AVG_Rate = dataSnapshot.child("AVG_Rate").val();
      });
    //this.updateVal(AVG_Rate, "AVG_Rate");
    console.log("AVG_Rate in the constructer" + AVG_Rate);
    return AVG_Rate;
  };
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <Svg
            width={416}
            height={144}
            style={{
              alignSelf: "center",
              top: "-13%",
              position: "absolute",
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
              <G filter="url(#prefix__a)">
                <Path
                  data-name="Path 117"
                  d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                  fill="#ffeed6"
                />
              </G>
              <Path
                data-name="Icon ionic-ios-arrow-back"
                onPress={() => this.props.navigation.goBack()}
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
              />
              {/* <Path
                data-name="Icon material-menu"
                d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
                fill="#4f3c75"
              /> */}
            </G>
          </Svg>
          <Text style={styles.forText}>حساب المصمم</Text>

          <View style={styles.infoContt}>
            <Image style={styles.image} source={{ uri: this.state.img }} />
            <Text style={styles.nameStyle}>
              {this.state.firstName + " " + this.state.lastName}
            </Text>
<View
style={{
  top: "46.5%",
  backgroundColor:"#fff",
  width:"45%",
  height:"7%",
  borderRadius:25,
  alignSelf: "center",
  right:"3.5%",
  justifyContent:"center",
}}
>
            <Rating
              style={{ alignSelf: "center", borderRadius:20, }}
              readonly={true}
              type="custom"
              // ratingImage={rating_star}
              startingValue={this.AVG_Rate()}
              ratingBackgroundColor="#c8c7c8"
              tintColor="white"
              imageSize={25}
            />
            </View>
            <Text style={styles.rated}>({this.raters()})</Text>
            <Text style={styles.avg}> 5/{this.AVG_Rate()} نجوم</Text>
            <Text style={styles.aboutStyle}>
              {" "}
              نبذة عن {this.state.firstName}{" "}
            </Text>
            <Text style={styles.bioStyle}>{this.state.bio}</Text>
          </View>

          {this.state.isClient && (
            <TouchableOpacity style={styles.Reuestbutton}>
              <Text
                style={styles.editText}
                onPress={() =>
                  this.props.navigation.navigate("طلب تصميم", {
                    DID: this.state.propsUser,
                  })
                }
              >
                طلب تصميم جديد
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              top: "105%",
              paddingLeft: 30,
              paddingRight: 30,
              justifyContent: "space-between",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.readData()}
          </View>
        </View>

        <TouchableOpacity
          style={styles.Morebutton}
          onPress={() =>
            this.props.navigation.navigate("أعمال مصمم معين", {
              arr: this.state.designGalleryState,
            })
          }
        >
          <Text
            style={{
              fontSize: 20,
              color: "#4F3C75",
              textDecorationLine: "underline",
              
            }}
          >
            المزيد من أعمال المصمم {">"}{" "}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  avg: {
    top: "54%",
    left: "40%",
    fontSize: 15,
    color: "#ffeed6",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "200",
  },
  rated: {
    top: "47.5%",
    left: "70%",
    fontSize: 15,
    color: "#ffeed6",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "200",
  },
  image: {
    flex: 1,
    width: 120,
    height: 120,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 150 / 2,
    top: "5%",
    borderColor: "#ffeed6",
    borderWidth: 3,
  },
  Morebutton: {
    top: "410%",
    height: "30%",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  },
  Reuestbutton: {
    top: "275%",
    backgroundColor: "#4F3C75",
    height: "30%",
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  },
  editText: {
    fontSize: 25,
    color: "#FFEED6",
  },

  forText: {
    position: "absolute",
    top: "33%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
  },
  nameStyle: {
    top: "35%",
    alignSelf: "center",
    fontSize: 30,
    color: "#ffeed6",
    position: "absolute",
    justifyContent: "center",
    fontWeight: "400",
  },
  bioStyle: {
    top: "65%",
    fontSize: 20,
    color: "#ffeed6",
    position: "absolute",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ffeed6",
    fontWeight: "200",
    height: "30%",
    width: "95%",
    alignItems: "center",
    textAlign: "center",
    padding: "5%",
    borderRadius: 15,
  },
  aboutStyle: {
    top: "60%",
    alignSelf: "center",
    fontSize: 20,
    color: "#ffeed6",
    position: "absolute",
    fontWeight: "200",
    backgroundColor: "#4F3C75",
    zIndex: 2,
  },
  infoContt: {
    backgroundColor: "#4F3C75",
    height: "200%",
    width: "90%",
    borderRadius: 35,
    top: "160%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1.48,
    shadowRadius: 15.95,
    elevation: 19,
  },
});
