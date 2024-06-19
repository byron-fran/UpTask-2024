import { BrowserRouter,  Route,Routes } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import DashboardView from "./views/DashboardView"
import CreateProjectView from "./views/Projects/CreateProjectView"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route  element={<AppLayout/>}>
                    <Route index path="/" element={<DashboardView/>}/>
                    <Route path="/projects/create/" element={<CreateProjectView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
