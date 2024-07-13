import { task } from "@/types/index"
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTaskById } from "@/api/TaskApi"
import { toast } from "react-toastify"
import { useDraggable } from '@dnd-kit/core'

interface TaskCardProps {
    task: task,
    canEdit: boolean
};

const TaskCard = ({ task, canEdit }: TaskCardProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const params = useParams()
    const projectId = params.id!
    const queryClient = useQueryClient();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id
    })
    const { mutate } = useMutation({
        mutationFn: deleteTaskById,
        onError: (data) => {
            toast.error(data.message)
        },
        onSuccess: () => {
            toast.success("deleted success")
            queryClient.invalidateQueries({ queryKey: ['update_project', projectId] })
            navigate(location.pathname, { replace: true })
        },

    });

    const styles = transform ? {
        transform : `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined;
   
    return (
        <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3 ">
            <div
                {...listeners}
                {...attributes}
                ref={setNodeRef}
                className="min-w-0 flex flex-col gap-y-4 "
                style={styles}>
                <button
                    type="button"
                    className="text-xl font-bold text-slate-600 text-left"
                >
                    {task.name}
                </button>

                <p className="text-slate-500"> {task.description}</p>

            </div>
            <div className="flex shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <MenuItems
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <MenuItem>
                                <button
                                    onClick={() => navigate(location.pathname + `?taskView=${task._id}`)}
                                    type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                    Ver Tarea
                                </button>
                            </MenuItem>
                            {canEdit && (
                                <>
                                    <MenuItem>
                                        <button
                                            onClick={() => navigate(location.pathname + `?taskEdit=${task._id}`)}
                                            type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                            Editar Tarea
                                        </button>
                                    </MenuItem>

                                    <MenuItem>
                                        <button
                                            onClick={() => mutate({ projectId, id: task._id })}
                                            type='button' className='block px-3 py-1 text-sm leading-6 text-red-500'>
                                            Delete task
                                        </button>
                                    </MenuItem>
                                </>
                            )}
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>

        </li>
    )
}

export default TaskCard
