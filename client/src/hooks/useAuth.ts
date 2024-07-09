import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/AuthApi';

export const useAuth = () => {

    const {isLoading, isError, data} = useQuery({
        queryFn : getUser,
        queryKey : ['profile'],
        retry : 1,
        refetchOnWindowFocus : false
    });
    
    return {
        data, isError, isLoading
    }
}