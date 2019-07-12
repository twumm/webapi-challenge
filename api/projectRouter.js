const express = require('express');

const router = express.Router();
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');

router.post('/', validationProjectContent, async (req, res, next) => {
  const project = { name, description } = req.body;
  try {
    const newProject = await projectDb.insert(project);
    res.status(201).json(newProject);
  }
  catch(error) {
    next(error);
  }
})

router.post('/:id/action', [validateProjectId, validationActionContent], async (req, res, next) => {
  const { description, notes } = req.body;
  const action = {
    project_id: req.params.id,
    description,
    notes
  }
  try {
    const newAction = await actionDb.insert(action);
    res.status(201).json(newAction)
  }
  catch (error) {
    next(error);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const projects = await projectDb.getAllProjects();
    res.status(200).json(projects);
  }
  catch (error) {
    next(error);
  }
})

router.get('/:id', validateProjectId, async (req, res, next) => {
  try {
    res.status(200).json(req.project);
  }
  catch (error) {
    next(error);
  }
})

router.get('/:id/action', validateProjectId, async (req, res, next) => {
  try {
    const actions = await projectDb.getProjectActions(req.project.id);
    res.status(200).json(actions);
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    const deletedCount = await projectDb.remove(req.project.id);
    res
      .status(200)
      .json({
        count: deletedCount,
        deletedProject: req.project
      })
  }
  catch (error) {
    next(error);
  }
})

router.put('/:id', [validateProjectId, validationProjectContent], async (req, res, next) => {
  const updates = { name, description } = req.body;
  try {
    const updatedProject = await projectDb.update(req.project.id, updates)
    res
      .status(200)
      .json(updatedProject);
  }
  catch (error) {
    next(error);
  }
})

// custom middlewares
async function validateProjectId(req, res, next) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    res.status(400).json({ message: 'User id must be a number' })
  }
  const project = await projectDb.get(id);
  if (project) {
    req.project = project;
    next();
  } else {
    res.status(400).json({ message: "Invalid project id" });
  }
}

function validationProjectContent(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Missing required *name* and *description* fields" });
  } else {
    next();
  }
}

function validationActionContent(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing action data" });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Missing required *description* and *notes* fields" });
  } else {
    next();
  }
}

module.exports = router;