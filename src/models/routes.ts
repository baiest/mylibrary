import { Router } from "express"

export interface ApiRoute {
  path: string
  router: Router
}