const express = require('express');
const router = express.Router();
const validator = require('validator');
const mailService = require('../services/mailService');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (message.length < 10) {
    return res.status(400).json({ error: 'Message is too short.' });
  }

  try {
    await mailService.sendContactMail({ name, email, message });
    res.json({ success: true, message: 'Your message has been sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
