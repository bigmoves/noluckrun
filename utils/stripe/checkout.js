import axios from 'axios';

export const checkout = data => {
  const stripe = Stripe(process.env.STRIPE_PUBLIC_API_KEY);

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
