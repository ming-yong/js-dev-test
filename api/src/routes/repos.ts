import { Router, Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import { AppError } from '../typings/AppError';
import { Repo } from '../typings/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.status(200);

  let result: Repo[] | AppError;

  try {
    const GITHUB_URI = 'https://api.github.com/users/silverorange/repos';
    const LOCAL_FILE_PATH = './data/repos.json';
    let allRepos: Repo[];

    //Get github repos
    const response = await axios.get(GITHUB_URI);
    allRepos = [...response.data];

    //Get local repos
    const rawFileData = fs.readFileSync(LOCAL_FILE_PATH, 'utf8');
    const localRepos = JSON.parse(rawFileData);
    allRepos.push(...localRepos);

    //Filter repos
    allRepos = allRepos.filter((repo: any) => !repo.fork);

    result = allRepos;
  } catch (error) {
    const ERROR: AppError = {
      name: 'custom error',
      status: 500,
      message: 'Something went wrong!',
    };
    result = ERROR;
  }

  res.json(result);
});
