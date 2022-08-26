import express from 'express'
import { Express } from 'express'
import * as db from './db/db';
import dotenv from 'dotenv'
import { routes } from './services/routes.service';
/**
 * Server use pattern singleton
 */
export class Server {
  PORT = process.env.PORT || 3000
  private static _instace: Server
  private _app: Express | null = null
  constructor(){    
    if(Server._instace) return Server._instace
    dotenv.config()
    db.connect()
    const app = express()
    this.addMiddlewares(app)
    this.addRoutes(app)
    this._app = app
    Server._instace = this
    return Server._instace
  }
  
  private addMiddlewares(app: Express){
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
  }
  
  
  private addRoutes(app: Express){
    routes.forEach(r => {
      try {
        app.use('/api/' + r.path, r.router) 
        console.log('Route:', r.path)
      } catch (error) {
        console.error('Route not found: ', r.name)
      }
    })
  }
  
  start(){
    if(!this._app) return
    this._app.listen(this.PORT, () => console.log(`Server listen in port ${this.PORT}`))
  }
}