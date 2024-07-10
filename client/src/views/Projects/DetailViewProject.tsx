import { getProjectById } from '@/api/ProjectApi';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import TaskListView from '../tasks/TaskListView';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskModalDetails from '@/components/tasks/DetailTaskModal';
import { isManager } from '@/utils/police';
import { useAuth } from '@/hooks/useAuth';

const DetailViewProject = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const {data : user, isLoading : authLoading} = useAuth()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['update_project', id!],
        queryFn: () => getProjectById(id!)
    });

    if (isLoading && authLoading) return '...Loading';
    if (isError) return '...Ups error';

    if (data && user) {
        
        return (
            <>
                <h1 className='text-5xl font-black '>{data.projectName}</h1>
                <p className="text-2xl font-light text-gray-500 mt-5"> {data.description}</p>
                {isManager(data.manager, user._id) && (

                    <nav className='my-5 flex gap-3'>
                        <button
                            type='button'
                            className='bg-purple-400 hover:bg-purple-500 px-10py-3 text-white text-xl font-bold cursor-pointer transition-colors'
                            onClick={() => navigate('?newTask=true')}
                        >
                            Add new task
                        </button>
                        <Link to='team'>
                            Members
                        </Link>
                    </nav>
                )}
                <AddTaskModal />
                <TaskListView tasks={data.tasks} />
                <EditTaskData />
                <TaskModalDetails />
            </>
        )
    }
}

export default DetailViewProject
