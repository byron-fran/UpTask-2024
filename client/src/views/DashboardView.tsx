import { Link } from "react-router-dom"
import { useQuery, } from "@tanstack/react-query"
import { getAllProjects } from "@/api/ProjectApi"
import { Fragment } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { useAuth } from "@/hooks/useAuth"
import DeleteProjectModal from "@/components/Projects/DeleteProjectModal"
import { useNavigate } from "react-router-dom"

const DashboardView = () => {
  const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate()
  const { data, isLoading, } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,

  })

  if (isLoading && authLoading) return '..Loading'

  if (data && user) {

    return (
      <>

        <h1 className="text-5xl font-black">My Projects</h1>
        <p className="text-2xl font-light text-gray-500 mt-5 ">Manage your projects</p>

        <nav className="my-5">
          <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-2 rounded-md text-white text-xl font-bold cursor-pointer transition-colors" to='/projects/create/'>New Project</Link>
        </nav>

        {data.data?.length ? (
          <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
            {data.data.map((project) => (
              <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <div>
                      {user._id === project.manager
                        ? <p className="px-3 py-1 rounded-md font-bold bg-indigo-50 text-indigo-600 border border-indigo-600 inline-flex">Manager</p>
                        : <p className="px-3 py-1 rounded-md font-bold bg-green-50 text-green-600 border border-green-600 inline-flex">Member</p>}
                    </div>
                    <Link to={`/projects/${project._id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >{project.projectName}</Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                      >
                        <MenuItem>
                          <Link to={`/projects/${project._id}`}
                            className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                            View Project
                          </Link>
                        </MenuItem>
                        {user._id === project.manager && (
                          <>
                            <MenuItem>
                              <Link to={`/projects/${project._id}/update`}
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                Update project
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                              >
                                Delete project
                              </button>
                            </MenuItem>
                          </>
                        )}

                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="text-center p-10">Create
            <Link className="text-fuchsia-500 font-bold" to='/projects/create/'> a new project</Link>
          </h1>
        )}
        <DeleteProjectModal />
      </>
    )
  }
}

export default DashboardView
