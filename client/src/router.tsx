import { BrowserRouter,  Route,Routes } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import DashboardView from "./views/DashboardView"
import CreateProjectView from "./views/Projects/CreateProjectView"
import EditProjectView from "./views/Projects/EditProjectView"
import DetailViewProject from "./views/Projects/DetailViewProject";
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./views/auth/LoginPage"
import RegisterPage from "./views/auth/RegisterPage"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route  element={<AppLayout/>}>
                    <Route index path="/" element={<DashboardView/>}/>
                    <Route path="/projects/create/" element={<CreateProjectView/>}/>
                    <Route path="/projects/:id/update" element={<EditProjectView/>}/>
                    <Route path="/projects/:id" element={<DetailViewProject/>}/>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginPage/>} />
                    <Route path="/auth/register" element={<RegisterPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
