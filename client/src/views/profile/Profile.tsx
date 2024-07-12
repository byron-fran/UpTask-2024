import { useAuth } from "@/hooks/useAuth"
import ProfileForm from "./ProfileForm";


const Profile = () => {
    const { data, isLoading } = useAuth();
    if (isLoading) return 'Loading...'
    if (data) return <ProfileForm data={data} />
}

export default Profile
