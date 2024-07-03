const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// Define Schema and Model for User
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
});
const UserModel = mongoose.model('User', userSchema);

// API Endpoint: Create a new user
app.post('/api/users', async (req, res) => {
  const { username } = req.body;

  try {
    const newUser = new UserModel({ username });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ error: 'Username already taken' });
  }
});

// API Endpoint: Add exercise to a user
app.post('/api/users/:_id/exercises', async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  try {
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newExercise = {
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date()
    };

    user.log.push(newExercise);
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date.toDateString()
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// API Endpoint: Get user's exercise log
app.get('/api/users/:_id/logs', async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  try {
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let logs = user.log;

    if (from) {
      logs = logs.filter(exercise => new Date(exercise.date) >= new Date(from));
    }
    if (to) {
      logs = logs.filter(exercise => new Date(exercise.date) <= new Date(to));
    }
    if (limit) {
      logs = logs.slice(0, parseInt(limit));
    }

    res.json({
      _id: user._id,
      username: user.username,
      count: logs.length,
      log: logs.map(exercise => ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      }))
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
