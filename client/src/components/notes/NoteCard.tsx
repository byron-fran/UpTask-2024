import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useAuth } from "@/hooks/useAuth"
import { useMemo } from "react"
import { deleteNoteById } from "@/api/NoteApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

interface NoteProps {
  note: Note
}

const NoteCard = ({ note }: NoteProps) => {

  const { data, isLoading } = useAuth();

  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
  const params = useParams()
  const projectId = params.id!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteNoteById,
    onSuccess: () => {
      toast.success('Delete success')
      queryClient.invalidateQueries({ queryKey: ['task', note.task] })

    },

    onError: (error) => { toast.error(error.message) }
  });

  if (isLoading) return 'Loading...';

  return (
    <>
      <div className="flex justify-between p-2">
        <div>

          <p>{note.content} by <span className=" text-gray-500">{note.createdBy.name}</span></p>
          <p className="text-xs text-gray-500">{formatDate(note.createdAt)}</p>
        </div>

        {canDelete && (
          <svg onClick={() => mutate({ projectId, taskId: note.task, noteId: note._id })} className="w-6 h-6 text-gray-600 cursor-pointer " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        )}

      </div>
    </>
  )
}

export default NoteCard
