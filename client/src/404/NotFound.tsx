import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <p className="font-bold text-white text-center text-4xl ">Page not found</p>
            <Link className="text-center text-white" to='/'>
                Go to <p className="text-fuchsia-600 ">Home</p>
            </Link>
        </>
    )
}

export default NotFound
