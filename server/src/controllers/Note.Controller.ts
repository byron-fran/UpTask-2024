import {Request, Response} from 'express'
import Note, { NoteInterface } from '../models/Note'

export class NoteController {

    static createNote = async (req : Request <{},{},NoteInterface>, res : Response) => {
    
        try {
            const note = new Note()
            note.content = req.body.content,
            note.task = req.body?.task?._id
            note.createdBy = req.user.id

            req.task.notes.push(note.id)

            await Promise.allSettled([note.save(), req.task.save()])
            return res.status(200).send('Note created success');

        } catch (error : unknown) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}