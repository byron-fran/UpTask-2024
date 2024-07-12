import { Request, Response } from 'express'
import Note, { NoteInterface } from '../models/Note'
import { Types } from 'mongoose'

type NoteParams = {
    noteId: Types.ObjectId
}
export class NoteController {

    static createNote = async (req: Request<{}, {}, NoteInterface>, res: Response) => {

        try {
            const note = new Note()
            note.task = req.task.id;
            note.createdBy = req.user.id;
            note.content = req.body.content

            req.task.notes.push(note.id)

            await Promise.allSettled([note.save(), req.task.save()])
            return res.status(200).send("Note create success");

        } catch (error: unknown) {

            return res.status(500).json(error)
        }
    };

    static getNotesByTask = async (req: Request, res: Response) => {

        try {
            const notes = await Note.find({ task: req.task.id })

            return res.status(200).json(notes)

        } catch (error: unknown) {

            return res.status(500).json(error)
        }
    };

    static deleteNoteById = async (req: Request<NoteParams>, res: Response) => {
        const { noteId } = req.params

        try {

            const note = await Note.findById(noteId);

            if (!note) {
                return res.status(404).json({ errors: "Note not found" })
            };

            if (note.createdBy.toString() !== req.user.id.toString()) {
                return res.status(401).json({ errors: "unauthorizated" })
            };
            req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString());

            await Promise.allSettled([note.deleteOne(), req.task.save()]);

            return res.status(204).json()

        } catch (error: unknown) {

            return res.status(500).json(error)
        }
    };
}