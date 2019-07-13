import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectList from './components/projects/ProjectList';
import './App.css';

const projectsAPI = 'http://localhost:5000';

function App() {
  useEffect(() => {
    getAllProjects()
  }, []);

  const [projects, setProjects] = useState([]);
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
      setProjects(project.data);
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
      <ProjectList
        projects={projects}
        loading={loading}
        error={error}
        getProject={getProject}
        createProject={createProject}
        deleteProject={deleteProject}
        updateProject={updateProject}
      />
    </div>
  );
}

export default App;
