import React from 'react'

const Project = ({ name, description, completed }) => {
  return (
    <div>
      <h4>{name}</h4>
      <h5>{description}</h5>
      <p>{completed}</p>
    </div>
  )
}

export default Project;
