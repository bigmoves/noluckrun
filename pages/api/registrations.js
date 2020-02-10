import { getRegistrations } from '../../utils/auth/getRegistrations';

const handler = async (req, res) => {
  getRegistrations()
    .then(data => {
      res.json(data);
    })
    .catch(() => {
      res.status(400);
    });
};

export default handler;
