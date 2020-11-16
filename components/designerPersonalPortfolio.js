//هذه صفحة تصاميمي لعرض التصاميم الشخصية للمصمم الحالي حتى يتمكن من حذفها

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
      } from "react-native";
  import firebase from "../database/firebase";
  import * as React from "react";
  import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
  const { width, height } = Dimensions.get("window");



  var designGallery = new Array();

  export default class designerPersonalPortfolio extends React.Component {
    constructor(props) {
      super();
      this.state = {
        nodesign:false,
        localpath: "",
        designUrl: "",
                designShownState:[]
      
      };
  
     var duid=firebase.auth().currentUser.uid;
    var ref = firebase
    .database()
    .ref("Designs/")
    .orderByChild("Duid")
    .equalTo(duid);
  ref.on("value", (snapshot) => {
    if (!snapshot.exists()) {
      this.updateInputVal(true, "nodesign");
      
     return                                          //@HadeelHamad conisder this case!
    }
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
    
         
  });
      this.updateInputVal(designGallery, "designShownState");
      
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
              onPress={() => this.props.navigation.navigate("عرض تفاصيل التصميم", { obj: element })}//@HadeelHamad 

            >
              {element.designTitle}
            </Text>
          </View>
          </View>
        );
      });
    };
    render() {
      return (
       
        <View style={styles.container}>
            <Svg
              width={416}
              height={144}
              style={{ alignSelf: "center", top: "-9%", position: "absolute" }}
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
                  onPressIn={() => this.props.navigation.goBack()}
                  d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                  fill="#4f3c75"
                />
                 <Path
                  data-name="Icon material-menu"
                  onPress={() => this.props.navigation.toggleDrawer()}
                  d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
                  fill="#4f3c75"
                /> 
              </G>
            </Svg>
            <Text style={styles.forText}>تصاميمي</Text>
           

            <View
                style={{
                  height: 10,
                  marginTop: 20,
                  marginBottom: 40,
                 
                  
                  borderBottomWidth: 1,
                  borderBottomColor: "#dddddd",
                }}
              >
                
              </View>
          <ScrollView scrollEventThrottle={16}>
            <View>
              

              <View
                style={{
                  marginTop: 3,
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {!this.state.nodesign && this.readData()}
                  {this.state.nodesign &&
       (<View style={{marginTop:"50%"}}> 
       <EmptyList style={styles.emptyImage}></EmptyList>
        <Text style={styles.emptyText}>نحن بانتظار تصاميمك</Text>
        </View>)
  }
                </View>
              </View>
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
    top: "2%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
    } 
  });
  