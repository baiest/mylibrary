import { Router } from "express"

export interface ApiRoute {
  name: string
  path: string
  router: Router
}