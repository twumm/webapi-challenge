const express = require('express');

const router = express.Router();
const projectDb = require('../data/helpers/projectModel');

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

// custom middlewares
async function validateProjectId(req, res, next) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    res.status(400).json({ message: 'User id must be a number' })
  }
  const project = await projectDb.getById(id);
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

module.exports = router;