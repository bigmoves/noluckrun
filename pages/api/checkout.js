import commonMiddleware from '../../utils/middleware/commonMiddleware';

const items = {
  '5k': {
    name: '5k',
    description: 'Hills are for suckers',
    amount: 2500,
    currency: 'usd',
    quantity: 1
  },
  '10k': {
    name: '10k',
    description: 'No Luck Run 10k',
    amount: 2500,
    currency: 'usd',
    quantity: 1
  },
  '15k': {
    name: '5k',
    description: 'No Luck Run 15k',
    amount: 2500,
    currency: 'usd',
    quantity: 1
  }
};

const handler = async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);

  const session = await stripe.checkout.sessions.create({
    customer_email: req.body.email,
    payment_method_types: ['card'],
    line_items: [items[req.body.routeName]],
    metadata: {
      shirtSize: req.body.shirtSize,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    success_url:
      process.env.NODE_ENV === 'production'
        ? 'https://noluckrun.now.sh/register?checkoutComplete=true'
        : `http://localhost:3000/register?checkoutComplete=true&${req.body.routeName}`,
    cancel_url:
      process.env.NODE_ENV === 'production'
        ? 'https://noluckrun.now.sh'
        : 'http://localhost:3000/register'
  });

  res.json({ sessionId: session.id });
};

export default commonMiddleware(handler);
