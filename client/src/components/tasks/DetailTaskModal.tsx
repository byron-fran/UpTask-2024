import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { changeStatus, getTaskById } from '@/api/TaskApi';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locals/locals';
import { TaskStatus } from '@/types/index';

export default function TaskModalDetails() {

    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const taskId = params.get('taskView')!;
    const show = !!taskId
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId: id!, id: taskId }),
        enabled: !!taskId,
        retry: false

    });
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: changeStatus,
        onSuccess: () => {
            toast.success('Update success'),
                queryClient.invalidateQueries({ queryKey: ['update_project', id] })
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        },
        onError: () => {
            toast.error('something wrong')
        }
    })
    const hanleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        mutate({ projectId: id!, id: taskId, status })
    }
    if (isError) {
        toast.error("task not found")
        return <Navigate to={`/projects/${id}`} />
    };


    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
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
                                    <p className='text-sm text-slate-400'>Agregada el:{formatDate(data.createdAt)} </p>
                                    <p className='text-sm text-slate-400'>Última actualización:{formatDate(data.updatedAt)} </p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    
                                    {data.status !== 'pending' && (
                                        <p className='font-normal'>Updated by:{' '}<span className='text-gray-500 '>{data.completedBy?.name}</span></p>
                                    )}
                                    <p className='text-lg text-slate-500 mb-2'>{data.description}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select
                                            className='w-full bg-white p-3 border border-slate-300'
                                            defaultValue={data.status}
                                            onChange={hanleChangeStatus}>
                                            {Object.entries(statusTranslations).map(([key, value]) => {
                                                return <option key={key} value={key}>{value}</option>
                                            })}
                                        </select>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}