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
    var fName, lName, email, bio, num_rating, total_rating, image;
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
              email = dataSnapshot.child("DEmail").val();
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

    profileImage
      .getDownloadURL()
      .then((url) => {
        this.updateInputVal(url, "img");
      })
      .catch((error) => {
        image =
          "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea";
        this.updateVal(image, "img");
      });
  }
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
      });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  confirmChanges = () => {
    var arabicCheck = /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd])*$/g;//check whether string contains arabic characters
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
    } else if(!arabicCheck.test(this.state.firstName) || !arabicCheck.test(this.state.lastName)){
      Alert.alert(
        "تنبيه",
        "يجب أن يحتوي الاسم الأول والأخير على حروف عربية فقط",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    }else {
      Alert.alert(
        "تنبيه",
        "هل ترغب في حفظ تغييراتك؟",
        [{ text: "نعم", onPress: () => this.saveChanges() }, {text: "لا"}],
        { cancelable: false }
      );     
    }
  };

  saveChanges =() =>{ 
     const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("GraphicDesigner/" + user)
      .update({
        DFirstName: this.state.firstName,
        DLastName: this.state.lastName,
        DEmail: this.state.email,
        //   number_of_rating: this.state.num_rating,
        //  total_rating: this.state.total_rating,
        bio: this.state.bio,
      });
      Alert.alert(
        "رسالة",
        "تم حفظ التغييرات بنجاح",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
    this.props.navigation.navigate("عرض حساب المصمم");
  }
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
        })
        .catch((error) => {
          console.log("error")
        });
        Alert.alert(
          "رسالة", " تم رفع الصورة بنجاح، نرجو الانتظار قليلًأ حتى تظهر في حسابك الشخصي  "
          [{ text: "حسنًا" }],
          { cancelable: false }
        );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-8%", position: "absolute" ,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          
          elevation: 9, }}
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
              onPress={() => this.props.navigation.navigate("عرض حساب المصمم")}
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
        <Text style={styles.forText}>تعديل الحساب</Text>
        <Image style={styles.image} source={{ uri: this.state.img }} />
        <Text onPress={() => this.onChooseImagePress()} style={styles.forText2}>
          رفع صورة شخصية
        </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="الاسم الاول"
          value={this.state.firstName}
          onChangeText={(val) => this.updateInputVal(val, "firstName")}
          maxLength={8}
        />

        <TextInput
          style={styles.inputStyle2}
          placeholder="الاسم الاخير"
          value={this.state.lastName}
          onChangeText={(val) => this.updateInputVal(val, "lastName")}
          maxLength={9}
        />
        <TextInput
          style={styles.inputStyle3}
          placeholder="نبذة"
          value={this.state.bio}
          onChangeText={(val) => this.updateInputVal(val, "bio")}
          maxLength={260}
          multiline={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.editText} onPress={() => this.confirmChanges()}>
            حفظ التغييرات
          </Text>
        </TouchableOpacity>
        <Text onPress={() => this.resetPassword()} style={styles.forText3}>
          تعديل كلمة السر
        </Text>
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
    top: "15%",
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
    top: "1.5%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
  },
  forText2: {
    alignItems: "center",
    position: "absolute",
    top: "35%",
    color: "#4F3C75",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  forText3: {
    alignItems: "center",
    position: "absolute",
    top: "83%",
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
    width: "80%",
    marginBottom: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "40%",
    left: "10%",
  },
  inputStyle2: {
    position: "absolute",
    fontSize: 18,
    marginTop: "4%",
    width: "80%",
    marginBottom: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "47%",
  },
  inputStyle3: {
    position: "absolute",
    fontSize: 18,
    marginTop: "4%",
    width: "80%",
    height: "13%",
    marginBottom: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderWidth: 3,
    textAlign: "right",
    top: "54%",
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
