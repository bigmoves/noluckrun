import axios from 'axios';

export const checkout = data => {
  const stripeKey =
    process.env.NODE_ENV === 'production'
      ? process.env.STRIPE_PUBLIC_API_KEY_PROD
      : process.env.STRIPE_PUBLIC_API_KEY;
  const stripe = Stripe(stripeKey);

  return axios('/api/checkout', {
    method: 'post',
    withCredentials: true,
    data
  }).then(res => {
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId
      })
      .then(function(result) {
        console.log(result.error.message);
      });
  });
};
