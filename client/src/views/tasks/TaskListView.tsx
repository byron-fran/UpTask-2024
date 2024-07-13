import TaskCard from '@/components/tasks/TaskCard'
import { task, TaskStatus } from '@/types/index'
import { statusTranslations } from '@/locals/locals'
import DropTask from '@/components/tasks/DropTask'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeStatus } from '@/api/TaskApi'
import { toast } from 'react-toastify';

type GroupedTasks = {
    [key: string]: task[]
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

interface Props {
    tasks: task[],
    canEdit: boolean
}
const borderColorStatus: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'

}
const TaskListView = ({ tasks, canEdit }: Props) => {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const { id } = useParams();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: changeStatus,
        onSuccess: () => {
            toast.success('Update success'),
                queryClient.invalidateQueries({ queryKey: ['update_project', id] })

        },
        onError: () => {
            toast.error('something wrong')
        }
    });

    const handleDragEnd = (e: DragEndEvent) => {

        if (e.over && e.over.id) {

            mutate({ id: e.active.id.toString(), projectId: id!, status: e.over.id as TaskStatus })
            queryClient.setQueryData(['update_project', id!], (prevData: { tasks: task[] }) => {

                const updateTask = prevData?.tasks.map((task) => {

                    if (task._id === e.active.id) {

                        return {
                            ...task,
                            status: e.over?.id as TaskStatus
                        }
                    }
                    return task
                });

                return {
                    ...prevData,
                    tasks: updateTask
                }
            })
        }

    }
    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext
                    onDragEnd={handleDragEnd}
                >

                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 
                            ${borderColorStatus[status]}
                            
                            `}>{statusTranslations[status]}</h3>
                            <DropTask status={status} />
                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
}

export default TaskListView
