import commonMiddleware from '../../utils/middleware/commonMiddleware';

const stripeFeePercent = 3.3; // Stripe says it's 2.9 but the numbers don't add up
const stripeFeeFixed = 0.3;

const routes = {
  '5k': {
    name: '5k',
    description: 'Hills are for suckers',
    amount: 1500,
    currency: 'usd',
    quantity: 1
  },
  '10k': {
    name: '10k',
    description: 'No Luck Run 10k',
    amount: 1500,
    currency: 'usd',
    quantity: 1
  },
  '15k': {
    name: '5k',
    description: 'No Luck Run 15k',
    amount: 1500,
    currency: 'usd',
    quantity: 1
  },
  supporter: {
    name: 'Supporter',
    description: 'No Luck Run Supporter',
    amount: 1500,
    currency: 'usd',
    quantity: 1
  }
};

const shirt = size => ({
  name: 'T-Shirt',
  description: `Size ${size}`,
  amount: 1000,
  currency: 'usd',
  quantity: 1
});

const donationItem = amount => ({
  name: 'Donation',
  description: 'Girls on the Run Donation',
  amount: amount * 100,
  currency: 'usd',
  quantity: 1
});

const processingFee = total => ({
  name: 'Processing Fee',
  description: 'Processing Fee',
  amount: Math.round(total * (stripeFeePercent / 100) + stripeFeeFixed),
  currency: 'usd',
  quantity: 1
});

const handler = async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);
  const {
    firstName,
    lastName,
    routeName,
    shirtSize,
    donation,
    email
  } = req.body;

  const lineItems = [
    routes[routeName],
    shirtSize !== 'none' ? shirt(shirtSize) : null,
    donation !== 'none' ? donationItem(+donation) : null
  ].filter(i => !!i);

  const totalAmount = lineItems.reduce(
    (previous, current) => previous + current.amount,
    0
  );

  console.log(totalAmount);
  console.log(Math.round(totalAmount + (totalAmount * 0.00029 + 0.003)));

  lineItems.push(processingFee(totalAmount));

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    payment_method_types: ['card'],
    line_items: lineItems,
    metadata: {
      shirtSize,
      firstName,
      lastName
    },
    success_url:
      process.env.NODE_ENV === 'production'
        ? `https://noluckrun.now.sh/register?checkoutComplete=true&route=${routeName}`
        : `http://localhost:3000/register?checkoutComplete=true&route=${routeName}`,
    cancel_url:
      process.env.NODE_ENV === 'production'
        ? 'https://noluckrun.now.sh'
        : 'http://localhost:3000/register'
  });

  res.json({ sessionId: session.id });
};

export default commonMiddleware(handler);
