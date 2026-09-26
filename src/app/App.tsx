import {Suspense} from 'react'
import './globals/styles/styles.scss'
import {classNames} from "@/shared/lib/classNames";
import {AppRouter} from "./providers/AppRouter/ui/AppRouter";

function App() {
    const className = classNames('app', {}, [])
    return (
        <div className={className}>
            <Suspense fallback={'...loading'}>
                <AppRouter/>
            </Suspense>
        </div>
    )
}

export default App
