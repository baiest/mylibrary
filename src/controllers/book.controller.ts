import { Request, Response } from 'express';
export const getAll = (_: Request, res: Response) => {
  res.json({
    hola:'mundo'
  })
}

export const getById = () => {
  
}