//صفحة الفاتورة
import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Button, Alert } from 'react-native';
import Svg, {  Path, G} from "react-native-svg";
import firebase from "../database/firebase";
var designerName="";
var price=0

export default class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      reqTitle:props.navigation.state.params.reqTitle,
        cardNumber: props.navigation.state.params.cardNumber,
        requestKey:props.navigation.state.params.reqKey,
        DID : props.navigation.state.params.DID,
        submitted:false,
        creditCardToken:props.navigation.state.params.creditCardToken,
    };
   
    firebase
      .database()
      .ref("Forms/"+this.state.DID)
      .on("value", (snapshot) => {
            price = snapshot.child(this.state.requestKey).child("Price").val()
      }); 
     
      firebase
      .database()
      .ref("GraphicDesigner/" + this.state.DID)
      .on("value", (dataSnapshot) => {
        designerName =
          dataSnapshot.child("DFirstName").val() +
          " " +
          dataSnapshot.child("DLastName").val();
       
      });
  }
   //////for udate state values @#$%^Y$#$%^&*&^%$#@#$%^&*(*&^%$#@$%^&*(*&^%$#$%^&*()))
   updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function

  onSubmit(){

    
    const paymentData = {
      amount: price,
      currency: "SAR",
     // metadata: {creditCardToken: creditCardToken.id}
    
    }

    // Use fetch to send the token ID and any other payment data to your server.
  
    const response= fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
         // Use the correct MIME type for your server
    Accept: 'application/json',
    // Use the correct Content Type to send data to Stripe
    'Content-Type': 'application/x-www-form-urlencoded',
    // Use the Stripe publishable key as Bearer
    Authorization: `Bearer ${'sk_test_51HiMF9G34qBjP7xlrde6a1DUYACCXTOT484tAdSWZN5Fzd6fuv6im8aoaqpmMrlzNbki2MFUay8iHkwMk0OejH4A00qU2mEWQB'}`
      },
       body: Object.keys(paymentData)
      .map(key => key + '=' + paymentData[key])
      .join('&')+"&metadata="+"creditCardToken="+this.state.creditCardToken  ,
    }).then(response =>
      
      Alert.alert(
        "تنبيه",
        "تمت عملية الدفع بنجاح، شكرًا لاختياركم اِفتن",
        [{ text: "حسنًا" }],
        { cancelable: false } ),
        this.updateInputVal(true ,"submitted"))
        
      
  }
  render() {
    return (
      
        <View style={styles.container}>
          <Svg
            width={416}
            height={144}
            style={{ alignSelf: "center", top: "-13%", position: "absolute",shadowColor: "#000",
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
          <Text style={styles.forText}> الفاتورة</Text> 

          <View>  
          <View style={styles.border}>
<Text>
 عنوان الطلب
</Text>
<Text>
 {this.state.reqTitle}  
</Text>
          </View>  
          <View style={styles.border}>
<Text>
  المبلغ المستحق للتصميم
</Text>
<Text>
 {price}  ريال سعودي
</Text>
          </View>


          <View style={styles.border}>
<Text>
  من البطاقة رقم:
</Text>
<Text>
 {this.state.cardNumber}
</Text>
          </View>
        
          <View style={styles.border}>
<Text>
 إلى المصمم
</Text>
<Text>
 { designerName}
</Text>
          </View>


          {this.state.submitted  &&  <View style={styles.done}>
<Text>
  تمت العميلة بنجاح !
</Text>
          </View>}



      </View>
      <TouchableOpacity
      onPress={() => this.onSubmit()}>

        <Text>
          ادفع الآن
        </Text>
      </TouchableOpacity>
      



      {this.state.submitted  &&
          <TouchableOpacity 
          style={styles.returnbutton}
            onPress={() => this.props.navigation.navigate("OrderHistory")}
          >
            <Text  style={{
              color: "#FFEED6",
              fontSize: 25,
              fontWeight:"500"
            }}>العودة</Text>
          </TouchableOpacity>
        }
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
  }, returnbutton: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "80%",
    height: "6%",
    alignSelf: "center",
    bottom: "2%",
  },
  forText: {
    position: "absolute",
    top: "0%",
    right:"22%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
  },
  border:{
    marginTop: "5%",
  backgroundColor: "#ffffff",
  fontSize: 24,
  borderRadius: 25,
  borderColor: "#4f3c75",
  borderWidth: 2,

  width: 350,
  height: 70,
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.4,
  shadowRadius: 2.95,

  elevation: 24,
},
done:{
  marginTop: "5%",
backgroundColor: "#d7f0d7",
fontSize: 24,
borderRadius: 25,
borderColor: "#04BF9D",
borderWidth: 2,

width: 350,
height: 70,
alignItems: "center",
alignSelf: "center",
justifyContent: "center",
shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 0,
},
shadowOpacity: 0.4,
shadowRadius: 2.95,

elevation: 24,
},
});