import {Component, type ErrorInfo, type ReactNode} from "react";
import cls from "./ErrorBoundary.module.scss";
import {Text} from "@/shared/ui";
import {Button} from "@/shared/ui/Button/Button";
import {VStack} from "@/shared/ui/Stack";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <VStack gap={'16'} align={'center'} justify={'center'} className={cls.ErrorBoundary}>
                    <Text text={'что-то пошло не так'} align={'center'}/>
                    <Button type={'button'} onClick={this.handleReload}>
                        Обновить
                    </Button>
                </VStack>
            );
        }

        return this.props.children;
    }
}
