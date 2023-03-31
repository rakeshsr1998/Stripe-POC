import { CardField, initPaymentSheet, presentPaymentSheet, useStripe } from '@stripe/stripe-react-native';
import { Alert, View } from 'react-native';
import Button from './Button';

function PaymentScreens() {

  const { createPaymentMethod, handleNextAction } = useStripe();

  const pay = async () => {
    // Gather customer billing information (for example, email)
    const billingDetails: any = {
      email: 'nizam@mailinator.com',
      phone: '+917876567898',
      addressCity: 'Houston',
      addressCountry: 'US',
      addressLine1: '1459  Circle Drive',
      addressLine2: 'Texas',
      addressPostalCode: '77063',
    };

    // Create payment method
    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      }
    });

    console.log(paymentMethod);
  };
  


  const initializePaymentSheet = async () => {
      await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: 'cus_NbTmkit8lMmVJK',
      customerEphemeralKeySecret: 'ek_test_YWNjdF8xS0pmZlhJRVZ3WEVMU21ULGkyd1FFV2FDajhMRHk5V2dBWGtsUjlNS01sN241SVM_007utT0JaE',
      paymentIntentClientSecret: 'pi_3MqGoqIEVwXELSmT0Egf5R6V_secret_sFcVOUi7vO0uiY9LdwiQnRp2T',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      returnURL: 'http://localhost:3000/success',
      defaultBillingDetails: {
        name: 'Halesh2',
        email: 'halesh2@mailinator.com'
      }
    });

    const result = await presentPaymentSheet();
    console.log(result);
    // if (error) {
    //   Alert.alert(`Error code: ${error.code}`, error.message);
    // } else {
    //   Alert.alert('Success', 'Your order is confirmed!');
    // }

    // console.log(result)
  };

  

  // ...
  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
            <Button
        variant="primary"
        onPress={() => pay()}
        title="Create a token from a card"
        accessibilityLabel="Create a token from a card"
      />

<Button
        variant="primary"
        onPress={() => initializePaymentSheet()}
        title="initPaymentSheet"
        accessibilityLabel="Create a token from a card"
      />
      
    </View>
  );
}

export default PaymentScreens;
