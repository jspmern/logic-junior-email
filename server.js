require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRouter = require('./routes/contact');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cors());

// Or for specific origins only (more secure)
app.use(cors({
  origin: ['http://localhost:3000', 'https://www.logicjunior.com/']
}));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: 'Too many requests, please try again later.'
});
app.use('/api/contact', limiter);

app.use('/api/contact', contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Contact backend running on port ${PORT}`);
});
