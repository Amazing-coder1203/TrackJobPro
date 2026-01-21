const express = require('express');
const cors = require('cors');
const app = express();

const applicationRoutes = require('./routes/applications');
app.use('/applications', applicationRoutes);

app.use(cors()); // allow frontend to connect
app.use(express.json()); // parse incoming data

app.get('/', (req, res) => {
  res.send('Jarvis is online!');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
