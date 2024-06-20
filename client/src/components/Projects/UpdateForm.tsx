import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import ProjectForm from './ProjectForm'
import { Project, ProjectFormData } from '@/types/index'
import { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '@/api/ProjectApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface UpdateFormProps {
    data: ProjectFormData,
    id: Project['_id']
}
const UpdateForm: FC<UpdateFormProps> = ({ data, id }) => {

    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    };

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: () => {
            toast.error('Error to update')
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ['projects']})
            queryClient.invalidateQueries({queryKey : ['update_project', id]})
            toast.success('Update success')
            navigate('/')
        }


    });
    
    const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues: initialValues });

    const onSubmit = (infoData: ProjectFormData) => {
        mutate({ formData: infoData, id })
    }
    return (
        <div>
            <div className="max-w-3xl mx-auto">

                <h1 className="text-5xl font-black">Create new Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5 ">Complete this form</p>

                <nav className="my-5">
                    <Link className="bg-purple-400 hover:bg-purple-500 px-10 text-white text-xl font-bold cursor-pointer transition-colors" to='/'>Back to home</Link>
                </nav>
                <form className="bg-white shadow-lg p-10 " noValidate onSubmit={handleSubmit(onSubmit)}>
                    <ProjectForm register={register} errors={errors} />
                    <button type="submit" className=" bg-fuchsia-600 hover:bg-fuchsia-700 p-2 rounded-md w-full text-white">Create Project</button>
                </form>

            </div>
        </div>
    )
}

export default UpdateForm
