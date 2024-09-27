import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      const data = await response.json();
      setCharacters(data.results);
      setInfo(data.info);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const sortCharacters = (chars) => {
    return chars.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortBy === 'created') {
        return sortOrder === 'asc' ? new Date(a.created) - new Date(b.created) : new Date(b.created) - new Date(a.created);
      }
      return 0;
    });
  };

  const filterCharacters = (chars) => {
    if (filterStatus === 'all') return chars;
    return chars.filter(char => char.status.toLowerCase() === filterStatus);
  };

  const displayedCharacters = sortCharacters(filterCharacters([...characters]));

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="container">
      <h1>Rick and Morty Characters</h1>
      
      <div className="controls">
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="created">Sort by Date Created</option>
        </select>
        
        <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
        
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {loading && <p>Loading characters...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      {!loading && !error && (
        <>
          <div className="character-grid">
            {displayedCharacters.length > 0 ? (
              displayedCharacters.map(char => (
                <div key={char.id} className="character-card">
                  <h2>{char.name}</h2>
                  <img src={char.image} alt={char.name} />
                  <p>Species: {char.species}</p>
                  <p>Status: {char.status}</p>
                  <p>Gender: {char.gender}</p>
                  <p>Created: {new Date(char.created).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No characters found</p>
            )}
          </div>
          <div className="pagination">
            <button 
              onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page} of {info.pages}</span>
            <button 
              onClick={() => setPage(prev => prev + 1)} 
              disabled={page === info.pages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;