import { TeamMember } from "@/types/index"
import { FC } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMemberToTeam } from "@/api/TeamApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Props {
    user: TeamMember,
    reset : () => void
};

const SearchResults: FC<Props> = ({ user, reset }) => {
    
    const params = useParams();
    const projectId = params.id!;
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({

        mutationFn: addMemberToTeam,
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, {replace : true});
            queryClient.invalidateQueries({queryKey : ['projectTeam', projectId]})

        },
        onError: (data) => {
            toast.error(data.message)
        }
    });

    const handleMemberToTeam = () => {
        const data = {
            projectId,
            id : user._id        
        };
        mutate(data)
    };

    return (
        <>
            <p className="mt-10 text-center font-normal">Results</p>
            <div className="flex justify-between items-center">
                <p className="font-bold">{user.name}</p>
                <button 
                    onClick={handleMemberToTeam}
                    className="text-purple-600 hover:bg-purple-100 p-2 rounded-md">
                    Add member
                </button>
            </div>
        </>
    )
}

export default SearchResults
