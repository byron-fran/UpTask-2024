import { useForm } from 'react-hook-form'
import { NoteFormData } from '@/types/index';
import ErrorMessage from '../ErrorMessage';


const AddNoteForm = () => {
    const initialValues: NoteFormData = {
        content: ''
    }
    const { handleSubmit, reset, formState: { errors }, register } = useForm({ defaultValues: initialValues });

    const handleAddnote = (formData: NoteFormData) => {
        console.log(formData)
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
                    {...register('content', {required : true})} />
            </div>
            <input className="w-full bg-fuchsia-600 p-3 hover:bg-fuchsia-700 text-white font-bold text-center" type="submit" value='create note' />
        </form>
    )
}

export default AddNoteForm
