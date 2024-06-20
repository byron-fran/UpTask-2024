import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form'
import { taskFormData } from '@/types/index';
import { createTask } from '@/api/TaskApi';
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query'

export default function AddTaskModal() {

    const initialValues: taskFormData = {
        description: '',
        name: '',

    };

    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const modalTask = params.get('newTask')
    const show = modalTask ? true : false
    const { register, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: initialValues });

    const queryClient = useQueryClient();

    const { id } = useParams()

    const { mutate } = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            toast.success("Create task success")
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({ queryKey: ['update_project', id!] })
            reset()
        },
        onError: (error) => {
            console.log(error.message)
            toast.error("error create task")
        }
    })
    const onSubmit = (data: taskFormData) => {

        mutate({ formData: data, id: id! });

    };

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <form className='mt-10 py-10 shadow-lg' onSubmit={handleSubmit(onSubmit)}>
                                        <TaskForm
                                            register={register}
                                            errors={errors} />
                                        <button type="submit" className=" bg-fuchsia-600 hover:bg-fuchsia-700 p-2 rounded-md w-full text-white">Create Project</button>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}