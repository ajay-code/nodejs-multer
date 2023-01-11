import { Router } from 'express'
import uploadRouter from './upload.routes.js'

let apiRouter: Router
const r = (apiRouter = Router())

r.get('/', (req, res) => {
    res.json({ msg: 'welcome to api route' })
})

r.use(uploadRouter)
export default apiRouter
