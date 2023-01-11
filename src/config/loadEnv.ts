import dotenv from 'dotenv'
import path from 'path'
import { getDirname } from '#src/utils/index.js'

// import .env file from the project root directory
const __dirname = getDirname(import.meta.url)
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
