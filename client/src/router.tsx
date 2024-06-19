import { BrowserRouter,  Route,Routes } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import DashboardView from "./views/DashboardView"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route  element={<AppLayout/>}>
                    <Route index path="/" element={<DashboardView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
