import { Router } from 'express'
import multer from 'multer'
import * as uploadController from '#src/controllers/upload.controller.js'

let upload = multer({
    dest: 'public/tmp/',
    limits: {
        fileSize: 200000, // ~ 200KB
    },
})
let uploadRouter: Router
let r = (uploadRouter = Router())

r.post('/upload-file', upload.single('file'), uploadController.uploadFile)

export default uploadRouter
