import {classNames} from "@/shared/lib/classNames";
import cls from "./LogoutButton.module.scss";
import {Button} from "@/shared/ui/Button/Button";
import {useSessionStore} from "@/entities/Session";
import {useNavigate} from "react-router-dom";

interface LogoutButtonProps {
    className?: string;
}

export const LogoutButton = ({className}: LogoutButtonProps) => {
    const logout = useSessionStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Button type="button" className={classNames(cls.LogoutButton, {}, [className])} onClick={handleLogout}>
            Выйти
        </Button>
    );
};
