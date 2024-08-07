import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import DashboardView from "./views/DashboardView"
import CreateProjectView from "./views/Projects/CreateProjectView"
import EditProjectView from "./views/Projects/EditProjectView"
import DetailViewProject from "./views/Projects/DetailViewProject";
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./views/auth/LoginPage"
import RegisterPage from "./views/auth/RegisterPage"
import ConfirmAccount from "./views/auth/ConfirmAccount"
import RequestCode from "./views/auth/RequestCode"
import ForgotPassword from "./views/auth/ForgotPassword"
import NewPasswordView from "./views/auth/NewPasswordView"
import ProyectTeamView from "./views/Projects/ProyectTeamView";
import ProfileLayout from "./layouts/ProfileLayout"
import Profile from "./views/profile/Profile"
import ChangePasswordView from "./views/profile/ChangePasswordView"
import NotFound from "./404/NotFound"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index path="/" element={<DashboardView />} />
                    <Route path="/projects/create/" element={<CreateProjectView />} />
                    <Route path="/projects/:id/update" element={<EditProjectView />} />
                    <Route path="/projects/:id" element={<DetailViewProject />} />
                    <Route path="/projects/:id/team" element={<ProyectTeamView />} />
                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/password" element={<ChangePasswordView />} />
                    </Route>
                </Route>
                <Route element={<AppLayout/>}>
                    <Route path="*"  element={<NotFound/>}/>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccount />} />
                    <Route path="/auth/request-code" element={<RequestCode />} />
                    <Route path='/auth/forgot-password' element={<ForgotPassword />} />
                    <Route path='/auth/new-password' element={<NewPasswordView />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default Router
