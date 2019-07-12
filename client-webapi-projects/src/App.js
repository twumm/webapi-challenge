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
    debugger;
    setLoading(true);
    try {
      debugger;
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

  return (
    <div className="App">
      <ProjectList
        projects={projects}
      />
    </div>
  );
}

export default App;
