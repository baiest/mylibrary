import { Request, Response } from 'express';
import * as db from '../db/db'

export const getAll = (_: Request, res: Response) => {
  db.select("SELECT * FROM books")
}

export const getById = () => {
  
}