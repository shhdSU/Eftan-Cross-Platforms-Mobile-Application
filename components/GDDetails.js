import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SvgComponent from "./GD_detailsImage";
import firebase from "../database/firebase";

export default class GDDetails extends React.Component {
  constructor(props) {
    super();
    var design = props.navigation.state.params.obj;
    this.state = {
      Duid: "",
      designTitle: "",
      designerProfileImage: "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/ProfilePictures%2FIcon%20material-account-circle.png?alt=media&token=1830cb42-2c4e-4fb5-a5ed-c18e73f8d4ea",
      date: "",
      designDescription: "",
      localpath: "",
      name: "",
    };
    this.updateInputVal(design.duid, "Duid")
    this.updateInputVal(design.designTitle, "designTitle")
    this.updateInputVal(design.designUploadingdate, "date")
    this.updateInputVal(design.designDescription, "designDescription")
    this.updateInputVal(design.designUrl, "localpath")

   

    //--------------------retreive the JSON obj of the design work from realtime DB
    // firebase
    //   .database()
    //   .ref("Designs/" + this.state.designId)
    //   .on("value", (snap) => {
    //     this.updateInputVal(snap.val().designTitle, "designTitle"),
    //       this.updateInputVal(
    //         snap.val().designDescription,
    //         "designDescription"
    //       ),
    //       this.updateInputVal(snap.val().designUploadingdate, "date"),
    //       this.updateInputVal(snap.val().Duid, "Duid"),
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
    /*
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
});*/

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
                dataSnapshot.child("DFirstName").val() + " "+
                dataSnapshot.child("DLastName").val() ;
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
    console.log(this.state.designTitle);
    console.log(this.state.date);
    console.log(this.state.localpath);
    console.log(this.state.designerProfileImage);
    console.log(this.state.name);
    console.log(this.state.designDescription);


    return (
      <View style={styles.container}>
        <Text
          style={
            {
              color: "#4F3C75",
              top: "7.5%",
              fontWeight: "700",
              position: "absolute",
              fontSize: 25,
              textAlign: "center",
              alignSelf: "center",
              zIndex: 1,
            }
          }
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
              top: "42%",
              right: "15%",
            },
          ]}
        >
          {this.state.date}
        </Text>

        <View style={styles.infoCont}>
<Image
          onPress={() => this.props.navigation.navigate(" عرض حساب المصمم للطلب", { duid: this.state.Duid })}
          style={styles.profileImage}
          source={{
            uri: this.state.designerProfileImage,
          }}
        />
        <Text
          style={[
            {
              color: "#ffeed6",
              top: "-50%",
              left: "43%",
              fontWeight: "200",
              fontSize:25,
            },
          ]}
          onPress={() => this.props.navigation.navigate(" عرض حساب المصمم للطلب", { duid: this.state.Duid })}

        >
          {this.state.name}
        </Text>
        <TouchableOpacity
         
         onPress={() => this.props.navigation.navigate(" عرض حساب المصمم للطلب", { duid: this.state.Duid })}
         
      >
        <Text
            style={{
              color: "#ffeed6",
              fontSize: 14,
              textDecorationLine:"underline",
              top:"-190%",
              left:"42%",
              fontWeight:"200",
            }}
          >
           المزيد عن المصمم
          </Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity>
        </TouchableOpacity>
        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#4F3C75",
              top: "7%",
              right: "-23.5%",
              fontWeight: "700",
              backgroundColor:"#fff",
              height:"2.5%",
              width:"23%",
              zIndex:2,
            },
          ]}
        >
          وصف العمل
        </Text>
        <Text
          style={[
            {
              color: "#4F3C75",
              top: "5%",
              left: "0%",
              textAlign: "right",
              fontWeight: "700",
              width: "87%",
              height: "20%",
              fontSize: 15,
              borderWidth:1,
              borderColor:"#4F3C75",
              borderRadius:25,
padding:"7%"          
  },
          ]}
        >
          {this.state.designDescription}
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
  preview: {
    width: 330,
    height: 280,
    borderColor: "#ccc",
    borderWidth: 2,
    top: "13%",
    borderRadius: 35,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "60%",
    height: "3.5%",
    alignSelf:"center",
    bottom: "15%",
  },
  inputStyle2: {
    fontSize: 16,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
  },
  profileImage: {
    width: 60,
    height: 60,
    top: "14%",
    left:"76%",
    borderRadius:35,
    borderColor:"#ffeed6",
    borderWidth:2,
    backgroundColor:"#fff"
  },
  infoCont:{
backgroundColor:"#4F3C75",
width:"87%",
borderRadius:25,
top:"8%",
height:"10%",
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 0,
},
shadowOpacity: 1.48,
shadowRadius: 2.95,

elevation: 19,
  },
});
