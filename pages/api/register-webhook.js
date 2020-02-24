import { addRegistration } from '../../utils/auth/addRegistration';
import { get } from 'lodash/object';
import { sendEmail } from '../../utils/auth/sendEmail';

const html = (firstName, lastName, routeName, shirtSize) => `
<p>
Congrats, ${firstName} ${lastName}! You are registered for the NLR 2020! 🎉
</p>

<p>
You're signed up for the ${routeName} and ordered a size ${shirtSize} t-shirt.
</p>

<p>
Check in is at 9:30 and first race (Holy Hill 15k)  takes off at 10am. Please plan accordingly to get to Glenhaven Park in time to get limber and ready to run.  
</p>

<p>
If you purchased a shirt, you will receive your shirt on race day.
</p>

<p>
If you registered as an Athletic Supporter, the NLR committee will contact you about job opportunities.  
</p>

<p>
There is parking around Glenhaven Park. There are bike racks available. You can figure this stuff out.  
</p>

<p>
We will play some pick-up soccer around 3 p.m. at Glenhaven Park. All are encouraged to play.  Bring a change of clothes/shoes as needed. Playing on grass.    
</p>

<p>
There will be a tip/donation jar for donations to Girls On the Run on race day.  If you forgot to donate, bring some bucks!
</p>

<p>
  <p><b>DO BRING:</b></p>
  <ul>
    <li>camp/foldable chair</li>
    <li>any food/drink you want or need due to allergies or fancy palates</li>
    <li>cash$ for donation</li>
  </ul>
</p>

<p>
  <p><b>DON’T BRING:</b></p>
  <ul>
    <li>dogs; love em, not invited</li>
    <li>friends that didn’t register</li>
  </ul>
</p>

<p>
See you on race day!
</p>

<p>
NLR Committee 
</p>
`;

const handler = async (req, res) => {
  const event = req.body;

  const displayItems = get(event, 'data.object.display_items', []);
  const totalAmount = displayItems.reduce(
    (previous, current) => previous + current.amount,
    0
  );
  const donation = displayItems.find(
    i => get(i, 'custom.name', '') === 'Donation'
  );
  const donationAmount = get(donation, 'amount', '');

  const stripeCustomerUrl = (id, liveMode) =>
    `https://dashboard.stripe.com/${liveMode ? '' : 'test/'}customers/${id}`;

  const registration = {
    firstName: get(event, 'data.object.metadata.firstName', ''),
    lastName: get(event, 'data.object.metadata.lastName', ''),
    email: get(event, 'data.object.customer_email', ''),
    routeName: get(event, 'data.object.display_items[0].custom.name', ''),
    shirtSize: get(event, 'data.object.metadata.shirtSize', ''),
    donationAmount: donationAmount / 100,
    paid: totalAmount / 100,
    stripeCustomerId: get(event, 'data.object.customer', ''),
    stripeCustomerUrl: stripeCustomerUrl(
      get(event, 'data.object.customer', ''),
      get(event, 'livemode', false)
    ),
    timestamp: Date.now()
  };

  const email = {
    to: [get(event, 'data.object.customer_email', '')],
    message: {
      subject: 'No Luck Run - You are registered, sucker! 🏃‍♀️🏃‍♂️',
      html: html(
        get(event, 'data.object.metadata.firstName', ''),
        get(event, 'data.object.metadata.lastName', ''),
        get(event, 'data.object.display_items[0].custom.name', ''),
        get(event, 'data.object.metadata.shirtSize', '')
      )
    }
  };

  sendEmail(email);

  addRegistration(
    registration,
    get(event, 'data.object.metadata.isProduction', false) === 'true'
      ? true
      : false
  )
    .then(ref => {
      res.json(ref);
    })
    .catch(() => {
      res.status(400).send('');
    });
};

export default handler;
