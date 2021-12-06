import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

interface RepoData {
  id: string;
  name: string;
  description: string;
  language: string;
  forks: number;
}

/*
TODO:

- To sort repo on the front-end: how to handle snake_case?
  - maybe filter data before sending on the backend?
- collect languages when fetch (reduce)
- display languages as button (map)
- filter repo everytime selectedLanguage changes  (useMemo)
- turn repo into button
- fetch commit data for the repo
- fetch markdown for the repo

*/

export function App() {
  // const [selectedLanguage, setSelectedLanguage] = useState('');
  const [repoList, setRepoList] = useState<RepoData[]>([]);
  // const [languages, setLanguages] = useState([]);

  useEffect(() => {
    toast.promise(
      getRepos()
        .then((repos) => {
          // const repoLanguages = repos.map((repo) => repo.language);
          setRepoList(repos);
          // setLanguages(repoLanguages);
        })
        .catch((error) => {
          console.log(error);
        }),
      {
        loading: 'Fetching data...',
        success: <b>All done!</b>,
        error: <b>Oops. Something went wrong.</b>,
      }
    );
  }, []);

  // console.log(languages);
  // console.log(selectedLanguage);

  const getRepos = () => {
    return fetch('http://localhost:4000/repos').then((res) => res.json());
  };

  // const filteredRepoList = useMemo(() => {
  //   if (selectedLanguage.length > 0) {
  //     return reposByLanguages[selectedLanguage];
  //   }

  //   return repoList;
  // }, [repoList, reposByLanguages, selectedLanguage]);

  return (
    <div className="App">
      <Toaster />
      {/* <div>
        {languages.map((language) => (
          <button key={language} onClick={() => setSelectedLanguage(language)}>
            {language}
          </button>
        ))}
      </div> */}
      <ul>
        {repoList.map((repo) => (
          <li key={repo.id}>
            {repo.name}
            <ul>
              <li>
                description: {repo.description ? repo.description : 'none'}
              </li>
              <li>language: {repo.language}</li>
              <li>forks: {repo.forks}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
