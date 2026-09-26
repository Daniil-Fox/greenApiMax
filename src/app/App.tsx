import {Suspense} from 'react'
import './globals/styles/styles.scss'
import {classNames} from "@/shared/lib/classNames";
import {AppRouter} from "./providers/AppRouter/ui/AppRouter";
import {Sidebar} from "@/widgets/Sidebar/ui/Sidebar/Sidebar";
import {useSessionStore} from "@/entities/Session";
import {LoginWindow} from "@/widgets/login-window/ui/LoginWindow";
import {ReceiveMessages} from "@/features/receiveMessages";
import {LogoutButton} from "@/features/logout";

function App() {
    const credentials = useSessionStore((state) => state.credentials);

    if (!credentials) {
        return (
            <div className={classNames('app', {}, [])}>
                <div className="login-screen">
                    <LoginWindow/>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames('app', {}, [])}>
            <ReceiveMessages/>
            <Suspense fallback={'...loading'}>
                <div className={'page'}>
                    <Sidebar/>
                    <div className={'page-wrapper'}>
                        <AppRouter/>
                        <div className={'logout-bar'}>
                            <LogoutButton/>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    )
}

export default App
