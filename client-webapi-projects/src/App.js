import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import ProjectList from './components/projects/ProjectList';
import Project from './components/projects/Project';
import './App.css';

const projectsAPI = 'http://localhost:5000';

function App() {
  useEffect(() => {
    getAllProjects()
  }, []);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const projects = await axios.get(`${projectsAPI}/api/projects`)
      setProjects(projects.data);
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  const getProject = async (id) => {
    setLoading(true);
    try {
      const project = await axios.get(`${projectsAPI}/api/projects/${id}`)
      setProject(project.data);
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  const createProject = async (newProject) => {
    setLoading(true);
    try {
      const project = await axios.post(`${projectsAPI}/api/projects/`, newProject)
      setProjects(project.data);
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  const deleteProject = async (id) => {
    setLoading(true);
    try {
      const deletedProject = await axios.post(`${projectsAPI}/api/projects/${id}`)
      setProjects(deletedProject.data);
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  const updateProject = async (id, update) => {
    setLoading(true);
    try {
      const updatedProject = await axios.post(`${projectsAPI}/api/projects/${id}`, update)
      setProjects(updatedProject.data);
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={props => (
          <ProjectList
            {...props}
            projects={projects}
            loading={loading}
            error={error}
            createProject={createProject}
          />
        )}
      />
      <Route
        exact
        path={`/projects/:id`}
        render={props => (
          <Project
            {...props}
            project={project}
            deleteProject={deleteProject}
            updateProject={updateProject}
          />
        )}
      />
      {/* <ProjectList
        getProject={getProject}
        createProject={createProject}
        deleteProject={deleteProject}
        updateProject={updateProject}
      /> */}
    </div>
  );
}

export default App;
