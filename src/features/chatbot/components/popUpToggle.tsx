'use client';
import { cn } from "@/utils/utils";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import Chat from "./chat";


export default function PopUpToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div className="fixed bottom-0 right-0 h-fit lg:bottom-4 lg:right-4 z-[1000]">
            {isOpen && (
                <div className="mb-2">
                    <Chat onClose={handleClose} />
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn("flex items-center justify-center w-12 h-12 bg-brand-secondary",
                    "text-white rounded-full shadow-lg hover:bg-brand-secondary/90 transition-colors", isOpen && "rotate-180",
                    isOpen && "hidden"
                )}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                <MessageSquareText className="w-6 h-6" />
            </button>

        </div>
    );
}