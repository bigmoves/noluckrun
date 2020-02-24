import { sendEmail } from '../../utils/auth/sendEmail';

const NoLuckRunSupportEmail = 'noluckrun@gmail.com';

const handler = async (req, res) => {
  const email = {
    to: [NoLuckRunSupportEmail],
    message: {
      subject: `Contact Form Submission - ${req.body.name}`,
      html: req.body.message
    }
  };

  sendEmail(email)
    .then(() => {
      res.status(200).send('');
    })
    .catch(() => {
      res.status(400).send('');
    });
};

export default handler;
