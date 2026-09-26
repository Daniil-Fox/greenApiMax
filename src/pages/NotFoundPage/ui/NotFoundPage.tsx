import { classNames } from "@/shared/lib/classNames";
import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
        <h1>Страница не найдена</h1>
    </div>
  );
};
