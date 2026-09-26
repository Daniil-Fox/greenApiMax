import {Suspense} from 'react'
import './globals/styles/styles.scss'
import {classNames} from "@/shared/lib/classNames";
import {AppRouter} from "./providers/AppRouter/ui/AppRouter";
import {Sidebar} from "@/widgets/Sidebar/ui/Sidebar/Sidebar";

function App() {
    const className = classNames('app', {}, [])
    return (
        <div className={className}>
            <Suspense fallback={'...loading'}>
                <div className={'page'}>
                    <Sidebar/>
                    <div className={'page-wrapper'}>
                        <AppRouter/>
                    </div>
                </div>
            </Suspense>
        </div>
    )
}

export default App
