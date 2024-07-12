import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"

interface NoteProps {
  note: Note
}


const NoteCard = ({ note }: NoteProps) => {
  return (
    <>
      <div className="flex justify-between p-2">
        <div>

          <p>{note.content} by <span className=" text-gray-500">{note.createdBy.name}</span></p>
          <p className="text-xs text-gray-500">{formatDate(note.createdAt)}</p>
        </div>

      </div>
    </>
  )
}

export default NoteCard
