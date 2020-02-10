import { addRegistration } from '../../utils/auth/addRegistration';
import { get } from 'lodash/object';

const handler = async (req, res) => {
  const event = req.body;

  const registration = {
    firstName: get(event, 'data.object.metadata.firstName', ''),
    lastName: get(event, 'data.object.metadata.lastName', ''),
    email: get(event, 'data.object.customer_email', ''),
    routeName: get(event, 'data.object.display_items[0].custom.name', ''),
    shirtSize: get(event, 'data.object.metadata.shirtSize', ''),
    paid: true
  };

  addRegistration(registration)
    .then(ref => {
      res.json(ref);
    })
    .catch(() => {
      res.status(400);
    });
};

export default handler;
