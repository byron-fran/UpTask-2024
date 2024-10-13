import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/ProjectApi';
import UpdateForm from '@/components/Projects/UpdateForm';


const EditProjectView = () => {

    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['update_project', id!],
        queryFn: () => getProjectById(id!)
    });

    if (isLoading) return '...Loading';
    if (isError) return '...Ups error'
    if (data) {
        return (
            <UpdateForm data={data} id={id!}/>
        )
    }
}

export default EditProjectView
