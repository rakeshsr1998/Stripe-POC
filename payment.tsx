import type {Token} from '@stripe/stripe-react-native';
import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Button from './Button';

export default function CreateTokenScreen() {
  const {createToken, createPaymentMethod} = useStripe();

  const _createToken = async (type: Token.Type) => {
    // fetch('http://127.0.0.1:3000/', {
    //   method: 'Post',
    //   body: JSON.stringify({
    //     stripeToken: 'tok_1MoKdQIEVwXELSmT9HEbVq4c',
    //     planId: ''
    //   }),
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log('*');
    //     console.log('*');
    //     console.log('*');
    //     console.log('*');
    //     console.log(e);
    //   });
    const { error, token } = await createToken(buildTestTokenParams(type));

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log(`Error: ${JSON.stringify(error)}`);
    } else if (token) {
      console.log(token);
      Alert.alert(
        'Success',
        `The token was created successfully! token: ${token.id}`
      );
      createPaymentMethod({paymentMethodType: 'Card', paymentMethodData: {token: token.id}}).then((result) => {
        console.log(result);
      }).catch((e) => {
        console.log(e);
      })
    }
  };

  return (
    <View style={{
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 100
    }}>
      <CardField
        autofocus
        cardStyle={inputStyles}
        style={styles.cardField}
        postalCodeEnabled={false}
      />
      <Button
        variant="primary"
        onPress={() => _createToken('Card')}
        title="Create a token from a card"
        accessibilityLabel="Create a token from a card"
      />
    </View>
  );
}

function buildTestTokenParams(type: Token.Type): Token.CreateParams {
  switch (type) {
    case 'Pii':
      return {
        type: 'Pii',
        personalId: '000000000',
      };
    case 'Card':
      return {
        type: 'Card',
        name: 'Tringapps 2',
        currency: 'inr',
      };
    case 'BankAccount':
      return {
        type: 'BankAccount',
        accountNumber: '000123456789',
        routingNumber: '110000000', // Routing number is REQUIRED for US bank accounts
        country: 'US',
        currency: 'usd',
      };
    default:
      throw new Error(`Unsupported token type`);
  }
}

const styles = StyleSheet.create({
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  or: {
    textAlign: 'center',
    marginTop: 30,
  },
});

const inputStyles: CardFieldInput.Styles = {
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000',
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: '#999999',
};
