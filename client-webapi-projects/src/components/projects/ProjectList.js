import React from 'react'

import Project from './Project';
import ProjectForm from './ProjectForm';

const ProjectList = ({ projects, error, loading, getProject, createProject, deleteProject, updateProject }) => {
  return (
    <div>
      { error && <p>oops! Something bad happened!</p> }
      { loading && <p>Wait for it!</p> }
      {
        projects.map(project => (
          <Project
            key={project.id}
            name={project.name}
            description={project.description}
            completed={project.completed}
            deleteProject={deleteProject}
            updateProject={updateProject}
          />
        ))
      }
      <ProjectForm />
    </div>
  )
}

export default ProjectList
