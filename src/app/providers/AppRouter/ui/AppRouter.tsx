import {Route, type RouteProps, Routes} from "react-router-dom";
import {appRoutes} from "@/shared/routes/config/routes";
import type {ReactNode} from "react";

export const AppRouter = () => {
    const renderRoute = (route: RouteProps): ReactNode => {
        return <Route element={route.element} path={route.path}/>
    }

    return (
        <Routes>
            {Object.values(appRoutes).map(renderRoute)}
        </Routes>
    );
};
