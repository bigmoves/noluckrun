import { addRegistration } from '../../utils/auth/addRegistration';

const handler = async (req, res) => {
  const event = req.body;

  addRegistration({ eventData: event })
    .then(ref => {
      res.json(ref);
    })
    .catch(() => {
      res.setStatus(500);
    });
};

export default handler;
