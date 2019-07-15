const express = require('express');

const router = express.Router();
const actionDb = require('../data/helpers/actionModel');
const validateActionContent = require('./projectRouter').validationActionContent;

router.get('/', async (req, res, next) => {
  try {
    const actions = await actionDb.getAllActions();
    res
      .status(200)
      .json(actions);
  }
  catch (error) {
    next(error);
  }
})

router.get('/:id', validateActionId, async (req, res, next) => {
  try {
    res
      .status(200)
      .json(req.action);
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    const deletedCount = await actionDb.remove(req.action.id);
    res
      .status(200)
      .json({
        deletedCount,
        deletedAction: req.action
      })
  }
  catch (error) {
    next(error);
  }
})

router.put('/:id', [validateActionId ,validateActionContent], async (req, res, next) => {
  const update = { description, notes } = req.body;
  try {
    const updatedAction = await actionDb.update(req.action.id, update);
    res
      .status(200)
      .json(updatedAction);
  }
  catch (error) {
    next(error);
  }
})

// custom middlewares
async function validateActionId(req, res, next) {
  const { id } = req.params;
  const action = await actionDb.get(id);
  if (action) {
    req.action = action;
    next()
  } else {
    res
      .status(400)
      .json({ message: "Invalid action id" });
  }
}

module.exports = router;