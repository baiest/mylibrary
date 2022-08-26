import { Pool, QueryConfig } from 'pg'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const up = fs.readFileSync(path.join(__dirname, 'library.sql')).toString()

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS?.toString(),
  port: parseInt(process.env.DB_PORT||'0') 
})

export const connect = () => {
  console.log('Connecting database...')
  db.connect((err, client, done) => {
    if(err){
      console.error(err)
      process.exit(1)
    }
    client.query(up, (err, _) => {
      done()
      if(err){
        console.error(err)
      }
    })
  })
}

export const query = async(query: string | QueryConfig) => {
  try {
    const res = await db.query(query)
    return res.rows
  } catch (error: any) {
    console.log(error)
    throw error
  }
} 