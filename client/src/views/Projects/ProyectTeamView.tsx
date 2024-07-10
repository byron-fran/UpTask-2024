import { useNavigate, Link, useParams } from "react-router-dom"
import AddMemberModal from "@/components/team/AddMemberModal";
const ProyectTeamView = () => {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.id!

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
        </>
    )
}

export default ProyectTeamView
