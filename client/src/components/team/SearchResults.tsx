import { TeamMember } from "@/types/index"
import { FC } from "react"
import { useMutation } from '@tanstack/react-query';
import { addMemberToTeam } from "@/api/TeamApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface Props {
    user: TeamMember
};

const SearchResults: FC<Props> = ({ user }) => {
    const params = useParams();
    const projectId = params.id!;

    const { mutate } = useMutation({

        mutationFn: addMemberToTeam,
        onSuccess: (data) => {
            toast.success(data)
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
