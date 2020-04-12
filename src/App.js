import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(
      response => { setRepositories(response.data) }
    );
  }, []);

  async function handleAddRepository() {
    const repositoryData = {
      title: `Web repo #${Date.now()}`,
      url: 'http://fixed',
      techs: ['Tech1', 'Tech2'],
    };

    try {
      const response = await api.post('/repositories', repositoryData);

      setRepositories([...repositories, response.data]);
    } catch (err) {
      // TODO: spit some error feedback [ux]
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(
        repositories.filter(repository => repository.id !== id)
      );
    } catch (err) {
      // TODO: spit some error feedback [ux]
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>            
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
