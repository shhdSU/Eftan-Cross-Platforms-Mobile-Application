import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
      } from "react-native";
  import firebase from "../database/firebase";
  import * as React from "react";
  import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
  import moment from 'moment/min/moment-with-locales';




  var designGallery = [];
  const { width, height } = Dimensions.get("window");
  export default class RedesignerPortfolio extends React.Component {
    constructor(props) {
      var req = props.navigation.state.params.req;
      super();
      var propsUser =  props.navigation.state.params.obj;
      this.state = {
        isLoading: false,
        designShownState:[],
        req:req,

      
      };
  console.log(this.state.req)
      var ref = firebase
      .database()
      .ref("Designs/")
      .orderByChild("Duid")
      .equalTo(propsUser);
    ref.on("value", (snapshot) => {
      if (snapshot.exists()) {
       
      
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

      this.updateInputVal(designGallery,"designShownState")
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
            style={{ width: width / 2 - 40, height: width / 2 - 20, }}
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
              borderRadius: 15,
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
            
            </Text>
          </View>
          </View>
        );
      });
    };

    // Object {
    //   "CID": "JYikkr90YzXsnHH8kNedSJJ7ben2",
    //   "DID": "RzGUWOgEEQVeZ66mNJmydPEqc2i1",
    //   "Imagekey": "-MMf9WN2UQq6DFm_eg9o",
    //   "category": "شعار",
    //   "color1": "",
    //   "color2": "",
    //   "color3": "",
    //   "deadLine": "",
    //   "description": "طلب للنظر في المشكلة",
    //   "fullTime": "2020-11-21T17:16:45+03:00",
    //   "reference": "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/Drafts%2Fno-photos.png?alt=media&token=27e6d1c3-0ce6-4dc2-9509-4aa7e5bc2e21",
    //   "status": "e",
    //   "title": "طلب سارة القويز",
    // }


    doneButton = () => {
      Alert.alert(
        "تأكيد رفع الطلب",
        " هل انت متأكد من رفع طلبك؟ سيكون طلبك في قائمة الانتظار لمدة ٤٨ ساعة وسينتقل للمنتهية اذا لم يتم الرد",
        [
          {
            text: "الغاء",
          },
          {
            text: "تأكيد",
            onPress: () => {
              
              this.storeResquset()
             },
          },
        ],
        { cancelable: false }
      )
    }


  storeResquset = () => {
    const requist = this.state.req;
    var fullTime = moment().format(); 
    
    firebase
      .database()
      .ref("Forms/"+requist.DID+"/"+requist.Imagekey)
      .set({
        title: requist.title,
        description: requist.description,
        color1: requist.color1,
        color2: requist.color2,
        color3: requist.color3,
        category: requist.category,
        deadLine: requist.deadLine,
        CID: requist.CID,
        DID: requist.DID,
        status: 'w',
        reference: requist.reference,
        fullTime: fullTime,
        Imagekey:requist.Imagekey
      })
  
      this.updateInputVal(true,"notify");
      console.log(this.state.designerToken);
    Alert.alert("تنبيه", "تم رفع الطلب بنجاح ", [{ text: "حسنًا" }], {
      cancelable: false,
    });

    this.props.navigation.navigate("OrderHistory");
  };


    render() {
      return (
        
          <View style={styles.container}>
            <Svg
              width={416}
              height={144}
              style={{ alignSelf: "center", top: "-6%", position: "absolute",shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,
              
              elevation: 9,  }}
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
            <Text style={styles.forText}>أعمال المصمم</Text>
            
            <View style={{ flexDirection: "row", top:"13%",}}>
                {/* <TouchableOpacity
                  style={styles.button}
                 onPress={() => this.props.navigation.goBack()}
                >
                  <Text style={styles.buttonText}>السابق</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.doneButton()}
                >
                  <Text style={styles.buttonText}>اتمام الطلب</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{ backgroundColor: "#fff" }}>
            <View
              style={{
                top: "5%",
                paddingLeft: 30,
                paddingRight: 30,
                justifyContent: "space-between",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {this.readData()}
            </View>
            </ScrollView>
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
    forText:{
      position: "absolute",
    top: "3%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
    } ,
    button: {
      alignItems: "center",
      backgroundColor: "#4F3C75",
      borderRadius: 25,
      margin: "2%",
      width: "40%",
      height: "30%",
      alignSelf: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#FFEED6",
      fontSize: 25,
      top: "-9%",
      alignSelf: "center",
      textAlign: "center",
      justifyContent: "center",
    },
  });
  