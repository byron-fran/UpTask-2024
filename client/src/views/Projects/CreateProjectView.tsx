import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'
import ProjectForm from "@/components/Projects/ProjectForm"

const initialValues = {
    projectName : '',
    clientName : '',
    description : ''
}

const CreateProjectView = () => {
    
    const {handleSubmit, register, reset, formState : {errors}} = useForm({defaultValues : initialValues})

    const onSubmit= (data : any) => {
        console.log(data)
    }
    return (
        <>
            <div className="max-w-3xl mx-auto">

                <h1 className="text-5xl font-black">Create new Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5 ">Complete this form</p>

                <nav className="my-5">
                    <Link className="bg-purple-400 hover:bg-purple-500 px-10 text-white text-xl font-bold cursor-pointer transition-colors" to='/'>Back to home</Link>
                </nav>
                <form className="bg-white shadow-lg p-10 " noValidate onSubmit={handleSubmit(onSubmit)}>
                    <ProjectForm register={register} errors={errors}/>
                    <button type="submit" className=" bg-fuchsia-600 hover:bg-fuchsia-700 p-2 rounded-md w-full text-white">Create Project</button>
                </form>

            </div>

        </>
    )

}

export default CreateProjectView
