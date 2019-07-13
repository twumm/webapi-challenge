import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';

const Project = ({ getProject, match, project }) => {
  // console.log(match)
  // useEffect(() => {
  //   getProject(match.params.id)
  // }, [getProject, match.params.id])
  // const [project, setProject] = useEffect([]);

  return (
    <div>
      <h4>Project name: {project.name}
      </h4>
      <h5>Description: {project.description}</h5>
      <p>Status: {project.completed}</p>
    </div>
  )
}

export default Project;
