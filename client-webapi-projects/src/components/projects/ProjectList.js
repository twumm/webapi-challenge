import React from 'react'
import { Link } from 'react-router-dom';

import Project from './Project';
import ProjectForm from './ProjectForm';

const ProjectList = ({ projects, error, loading, getProject, createProject, deleteProject, updateProject }) => {
  return (
    <div>
      {error && <p>oops! Something bad happened!</p>}
      {loading && <p>Wait for it!</p>}
      {
        projects.map(project => (
          <Link to={`/projects/${project.id}`}>
            <Project
              key={project.id}
              project={project}
              deleteProject={deleteProject}
              updateProject={updateProject}
              getProject={getProject}
            />
          </Link>
        ))
      }
      <ProjectForm />
    </div>
  )
}

export default ProjectList
