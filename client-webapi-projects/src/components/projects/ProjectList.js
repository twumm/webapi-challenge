import React from 'react'

import Project from './Project';
import ProjectForm from './ProjectForm';

const ProjectList = ({ projects }) => {
  return (
    <div>
      {
        projects.map(project => (
          <Project
            name={project.name}
            description={project.description}
            completed={project.completed}
          />
        ))
      }
      <ProjectForm />
    </div>
  )
}

export default ProjectList
