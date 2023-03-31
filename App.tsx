import { initStripe, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import React, { useCallback, useEffect } from 'react';
import { Linking } from 'react-native';
import PaymentScreens from './Payment-s';

function App() {

  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);
  
  return (
    <StripeProvider
      publishableKey={'pk_test_51KJffXIEVwXELSmTstbuYhsnWxqEarEuNF8fVSv4Mnr4zMyeEED6UmVWveVHVsqVOJOhRhzV1K9Y3KNIP9yruCnb00wMzlitEt'}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <PaymentScreens />
    </StripeProvider>
  );
} 

export default App;
