import { useNavigate, Link, useParams } from "react-router-dom"
import AddMemberModal from "@/components/team/AddMemberModal";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { deleteMemberToTeam, getProjectTeam } from "@/api/TeamApi";
import { Menu, Transition, MenuItem, MenuButton, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";


const ProyectTeamView = () => {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.id!;

    const {data, isLoading, isError} = useQuery({
        queryFn : () =>getProjectTeam({projectId}),
        queryKey : ['projectTeam', projectId]
    });

    const {mutate} = useMutation({
        mutationFn : deleteMemberToTeam,
        onSuccess : (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey : ['projectTeam', projectId]})
        },
        onError : (data) => {
            toast.error(data.message)
        }
    });

    const queryClient = useQueryClient();

 

    if(isLoading) return 'Loading...' ;

    return (
        <>
            <h1 className="text-5xl font-black">Manage you team</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Manage your work team for this project</p>

            <nav className='my-5 flex gap-3'>
                <button
                    type='button'
                    className='bg-purple-400 hover:bg-purple-500 px-10py-3 text-white text-xl font-bold cursor-pointer transition-colors'
                    onClick={() => navigate('?addMember=true')}
                >
                    Add member
                </button>
                <Link to={`/projects/${projectId}`}>
                    Go back to project
                </Link>
            </nav>
            <AddMemberModal/>
            <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
            {data?.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data?.map((member) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">
                                        {member.email}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                       {member.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <MenuItem>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={() => mutate({projectId,id :member._id})}
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}
        </>
    )
}

export default ProyectTeamView
