import React, { useState, useEffect } from 'react';
import './App.css';

const fillerRepo = {
  name: 'hi',
  description: 'filler',
  language: 'english',
  forks: 0,
};

export function App() {
  const [displayData, setDisplayData] = useState([fillerRepo]);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 500) {
          setSuccess(false);
          setDisplayData(data.message);
          return;
        }
        setDisplayData(data);
        setSuccess(true);
      })
      .catch((error) => {
        setDisplayData(error);
        setSuccess(false);
      });
  }, []);

  console.log(displayData);

  return (
    <div className="App">
      {success && Array.isArray(displayData) ? (
        <ul>
          {displayData.map((repo, index) => (
            <li key={index}>
              {repo.name}
              <ul>
                <li>
                  Description: {repo.description ? repo.description : 'none'}
                </li>
                <li>Language: {repo.language}</li>
                <li>Forks: {repo.forks}</li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>{displayData}</p>
      )}
    </div>
  );
}
