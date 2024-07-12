import { task } from "@/types/index"
import AddNoteForm from "./AddNoteForm"
import NoteCard from "./NoteCard"

interface Props {
    notes: task['notes']
}

const NotesPanel = ({ notes }: Props) => {

    return (
        <>
            <AddNoteForm />
            <div className="divide-y divide-gray-100 mt-10">
                {notes.length ? (
                    <>
                        <p className="font-bols text-2xl text-slate-600 my-5">Notes</p>
                        {notes.map(note => (
                            <NoteCard key={note._id}
                                note={note}
                            />
                        ))}
                    </>
                ) : null}
            </div>

        </>
    )
}

export default NotesPanel
