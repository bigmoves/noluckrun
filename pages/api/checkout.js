import commonMiddleware from '../../utils/middleware/commonMiddleware';

const stripe = require('stripe')('sk_test_wzFuTUyjGId2Ev6eJVjv4mEu');

const handler = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: req.body.email,
    payment_method_types: ['card'],
    line_items: [
      {
        name: '5k',
        description: 'Hills are for suckers',
        // images: ['https://example.com/t-shirt.png'],
        amount: 2500,
        currency: 'usd',
        quantity: 1
      }
    ],
    success_url:
      process.env.NODE_ENV === 'production'
        ? 'https://noluckrun.now.sh/register?checkoutComplete=true'
        : 'http://localhost:3000/register?checkoutComplete=true',
    cancel_url:
      process.env.NODE_ENV === 'production'
        ? 'https://noluckrun.now.sh'
        : 'http://localhost:3000/register'
  });

  res.json({ sessionId: session.id });
};

export default commonMiddleware(handler);
