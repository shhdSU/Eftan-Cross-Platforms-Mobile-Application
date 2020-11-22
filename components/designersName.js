import firebase from "../database/firebase";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import Svg, { Defs, G, Path } from "react-native-svg";



export default class designersName extends Component {

    constructor(props) {
        super();
        this.state = {
          designers : props.navigation.state.params.obj,
        }; //End of status

//console.log(this.state.designers);
    }//End of constractor





//////for udate state values @#$%^Y$#$%^&*&^%$#@#$%^&*(*&^%$#@$%^&*(*&^%$#$%^&*()))
updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function


//--------------------- ---------------- استرجاع صور المصممين ---------------- ---------------------- //
Images(){

    this.state.designersKey.map((element) => {

        firebase
        .storage()
        .ref("ProfilePictures/" + element)
        .getDownloadURL()
        .then((url) => {
      console.log(element);

        })
        .catch((error) => {
          console.log("can not retreive profile img url");
        });
    
        
    });
    
}

  //--------------------- ----------------عرض جميع المصممين ---------------- ---------------------- //

displayDesigners(array){
  var Keys = Object.keys(array);
  
  Keys.map((element) => {
     
return(

<View style={styles.designersCont}>

{/* <image style={styles.preview}

/> */}


<Text style={styles.Name}>
{ array[element].DFirstName}
    
</Text>

</View>

);//End of map return

    });//End of for loop
}; //End of display




render(){
  var designersArray = this.state.designers ; 
    return(
<View style= {styles.container}>

<Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            color: "#4f3c75",
            alignSelf: "center",
            position: "absolute",
            zIndex: 2,
            top: "6.5%",
          }}
        >
          اختيار المصمم
        </Text>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-3%", position: "relative",shadowColor: "#000",
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
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
              onPress={() => this.props.navigation.goBack()}
            />
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            />
          </G>
        </Svg>
{this.displayDesigners(designersArray)}
</View>
);// End of render return



}// End of render

}//End of class



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#FFF",
    },
    designersCont:{
      flex: 2,
height:"100%",
borderWidth:2,
position:"absolute",
    },
    Name:{
alignSelf:"center",
justifyContent:"center",
color:"#000",
textAlign:"center"
    },
});  