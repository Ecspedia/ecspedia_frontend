import { cn } from "@/utils/utils";
import { HTMLAttributes, ReactNode } from "react";

interface MainContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

function MainContainer({ children, className = "", ...props }: MainContainerProps) {
    return (
        <div
            className={cn(
                "container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 pt-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export default MainContainer;
