import React from 'react'

const Project = ({ name, description, completed }) => {
  return (
    <div>
      <h4>Project name: {name}</h4>
      <h5>Description: {description}</h5>
      <p>Status: {completed}</p>
    </div>
  )
}

export default Project;
