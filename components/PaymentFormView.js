
//for Payment
import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */
export default class PaymentFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: { valid: false } };
  }
  render() {
    const { onSubmit, submitted, error } = this.props;
    return (
      <View>
        <View>
          <CreditCardInput
          labels={{ number: "رقم البطاقة", expiry: " الانتهاء", cvc: "CVV" ,name:"الاسم"}}
          placeholders={{ number: "1234 5678 1234 5678", expiry: "سنة/شهر", cvc: "CVC" }}
          requiresName
           allowScroll
           labelStyle={{
            fontSize: 15,
            
            color:"#4f3c75",
            alignSelf:"center"
            
          }}
            onChange={(cardData) => this.setState({ cardData })} />
        </View>
        <View style={{opacity: this.state.cardData.valid == true? 1 : 0.5 ,padding: 1,
        backgroundColor:"#4F3C75",
    zIndex: 10,
    borderRadius:35,
    width:"80%",
    fontSize:25,
    marginTop:"15%",
    
    
    alignSelf:"center",}} >
       
          <Button
            title='إضافة بطاقتي'
            color="#ffeed6"
                       disabled={!this.state.cardData.valid || submitted}
            onPress={() => onSubmit(this.state.cardData)}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
  }
});