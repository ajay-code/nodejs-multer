import { Request, Response } from 'express'
import { createReadStream, createWriteStream, WriteStream } from 'node:fs'
import { mkdir, stat } from 'node:fs/promises'

const uploadDir = 'public/uploads'

const checkDirExistsOrCreateDir = async (dir: string) => {
    try {
        const stats = await stat(uploadDir)
        if (stats.isDirectory()) {
            return
        }
        throw Error('Path is not a directory')
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            await mkdir(uploadDir)
            return
        }
        throw err
    }
}

export const uploadFile = async (req: Request, res: Response) => {
    if (!req.file) {
        res.json({
            error: 'no file uploaded',
        })
        return
    }
    await checkDirExistsOrCreateDir(uploadDir)

    let newFilename = (req.file.filename + req.file.originalname).toLowerCase()
    let readFileStream = createReadStream(req.file.path)
    let writeFileStream = createWriteStream(`${uploadDir}/${newFilename}`)

    readFileStream.pipe(writeFileStream)
    readFileStream.on('end', () => writeFileStream.end())

    writeFileStream.on('close', () => {
        res.json({
            msg: 'file uploaded',
        })
    })
    readFileStream.on('error', (error) => {
        writeFileStream.close()
        res.status(500).json({
            error,
        })
    })
}
