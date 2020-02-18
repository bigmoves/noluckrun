import { addRegistration } from '../../utils/auth/addRegistration';
import { get } from 'lodash/object';

const handler = async (req, res) => {
  const registration = {
    firstName: get(req.body, 'firstName', ''),
    lastName: get(req.body, 'lastName', ''),
    email: get(req.body, 'email', ''),
    routeName: get(req.body, 'routeName', ''),
    shirtSize: get(req.body, 'shirtSize', ''),
    paid: false,
    timestamp: Date.now()
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
