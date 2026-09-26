import {type RouteProps} from 'react-router-dom'
import {MainPage} from '@/pages/MainPage'
import {NotFoundPage} from "@/pages/NotFoundPage/ui/NotFoundPage.tsx";
export enum AppRoutes {
    MAIN = 'main',
    NOT_FOUND = 'not-found',
}

export const pathRoutes: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
}

export const appRoutes: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: pathRoutes.main,
        element: <MainPage/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: pathRoutes["not-found"],
        element: <NotFoundPage/>
    },
}

