import { router } from './services/book.service';
import express from 'express'
import { Express } from 'express'
import * as db from './db/db';
import dotenv from 'dotenv'
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
    app.use('/api/book', router)
  }
  
  start(){
    if(!this._app) return
    this._app.listen(this.PORT, () => console.log(`Server listen in port ${this.PORT}`))
  }
}