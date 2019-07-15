import React from 'react'

const ProjectForm = () => {
  let projectName = React.createRef();
  let projectDescription = React.createRef();

  return (
    <form>
      <input
        type="text"
        placeholder="Project Name"
        ref={projectName}
      />
      <input
        type="text"
        placeholder="Project Description"
        ref={projectDescription}
      />
      <input type="submit" />
    </form>
  )
}

export default ProjectForm
