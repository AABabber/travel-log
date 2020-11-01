const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

// Q: What is the significance of the path in router.get(...)?
// A: The route/path mentioned here gets appended to the app.use(...) call
router.get('/', async (_req, res) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.statusCode(422);
    }
    next(error);
  }
});

module.exports = router;