'use client';
import ConditionalRendering from "@/components/shared/ConditionalRendering";
import { useIsMobile } from "@/hooks";
import { cn } from "@/utils/utils";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import Chat from "./chat";


export default function PopUpToggle() {
    const isMobile = useIsMobile();


    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    }

    const noRender = isMobile ? ["/map", "/booking"] : [""];
    return (
        <ConditionalRendering noRenderingPages={noRender}>
            <div className={cn(`fixed bottom-2 right-2 lg:bottom-4 lg:right-4 z-1020`,
                isOpen ? 'bottom-0 right-0 lg:bottom-4 lg:right-4' : '',

            )}>
                {isOpen && (
                    <div className="lg:w-100 lg:h-130">
                        <Chat onClose={handleClose} />
                    </div>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn("flex items-center justify-center w-12 h-12 bg-brand-secondary cursor-pointer",
                        "text-white rounded-full shadow-lg hover:bg-brand-secondary/90 transition-colors", isOpen && "rotate-180",
                        isOpen && "hidden"
                    )}
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                >
                    <MessageSquareText className="w-6 h-6" />
                </button>

            </div>
        </ConditionalRendering>
    );
}