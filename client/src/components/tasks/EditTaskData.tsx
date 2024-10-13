import { useLocation } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/TaskApi"
import EditTaskModal from "./EditTaskModal"


const EditTaskData = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('taskEdit')!
    const params = useParams()
    const projectId = params.id!

    const { data, } = useQuery({

        queryFn: () => getTaskById({ projectId, id: taskId }),
        queryKey: ['task'],
        enabled: !!taskId

    });

    if (data) {
        
        return  <EditTaskModal  data={data} taskId={taskId} projectId={projectId}/>
    }
}

export default EditTaskData
