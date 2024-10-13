import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form'
import { Project, task, taskFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTaskById } from '@/api/TaskApi';


interface Props {
    data: taskFormData,
    taskId: task['_id'],
    projectId: Project['_id']
}
export default function EditTaskModal({ data, taskId, projectId }: Props) {

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            name: data.name,
            description: data.description
        }
    });

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateTaskById,
        onError: () => { },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update_project', projectId] }),
            queryClient.invalidateQueries({queryKey : ['task', taskId]})
            navigate(location.pathname, {replace : true})
        }

    })
   
    const location = useLocation();
    const handleUpdateTask = (infoData: taskFormData) => {
        mutate({ formData: infoData, id: taskId, projectId })
    }
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </DialogTitle>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    noValidate
                                    onSubmit={handleSubmit(handleUpdateTask)}
                                >


                                    <TaskForm register={register} errors={errors} />
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}