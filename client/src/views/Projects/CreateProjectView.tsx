import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import ProjectForm from "@/components/Projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectApi"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

const initialValues: ProjectFormData = {
    projectName: '',
    clientName: '',
    description: ''
}

const CreateProjectView = () => {

    const { handleSubmit, register, reset, formState: { errors } } = useForm({ defaultValues: initialValues })
    const navigate = useNavigate();

    const { mutateAsync } = useMutation({
        mutationFn: createProject,
        onError: () => {

        },
        onSuccess: (data) => {
            toast.success("Project crated success")
            reset()

        }
    });

    const onSubmit = async (formData: ProjectFormData) => {
        await mutateAsync(formData)
        navigate('/')
    };

    return (
        <>
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

        </>
    )

}

export default CreateProjectView
