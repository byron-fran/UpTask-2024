import { useForm } from 'react-hook-form'
import { NoteFormData } from '@/types/index';
import ErrorMessage from '../ErrorMessage';
import { createNote } from '@/api/NoteApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddNoteForm = () => {
    const initialValues: NoteFormData = {
        content: ''
    }
    const { handleSubmit, reset, formState: { errors }, register } = useForm({ defaultValues: initialValues });

    const params = useParams();
    const location = useLocation();
    const url = new URLSearchParams(location.search)

    const taskId = url.get('taskView')!
    const projectId = params.id!;

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote,

        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    });

    const handleAddnote = (formData: NoteFormData) => {

        mutate({ formData, projectId, taskId })
        reset()
    }
    return (
        <form

            onSubmit={handleSubmit(handleAddnote)}
            noValidate
            className=" space-y-3"
        >
            <div className="flex flex-col ">
                {errors.content && (
                    <ErrorMessage>
                        content is required
                    </ErrorMessage>
                )}
                <label htmlFor="content" className="text-left">Note</label>
                <input
                    className="w-full focus:outline-none border border-gray-300 p-3"
                    type="text"
                    placeholder="Create a note"
                    id="content"
                    {...register('content', { required: true })} />
            </div>
            <input className="w-full bg-fuchsia-600 p-3 hover:bg-fuchsia-700 text-white font-bold text-center" type="submit" value='create note' />
        </form>
    )
}

export default AddNoteForm
