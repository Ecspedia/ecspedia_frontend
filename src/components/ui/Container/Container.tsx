import { cn } from "@/utils/utils";
import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

function Container({ children, className = "", ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                "container mx-auto px-3 sm:px-4 md:px-8 lg:px-16 xl:px-24",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export default Container;
