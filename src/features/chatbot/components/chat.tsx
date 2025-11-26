import { cn } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
    const [messages, setMessages] = useState<string[]>(["Hello, I am IA Assistant. How can I help you today?"]);
    const onSendMessage = (message: string) => {
        setMessages([...messages, message]);
    }
    const sentinelRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        sentinelRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {

        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col gap-1 mt-20 w-80 mx-auto border border-border h-80">
            <ChatHeader />
            <div className="flex flex-col gap-2 p-2 overflow-y-auto">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} isBot={index % 2 === 0} />
                ))}
                <div id="sentinel" ref={sentinelRef}></div>
            </div>

            <ChatInput onSendMessage={onSendMessage} />

        </div>
    );
}

const ChatInput = ({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
    const [inputValue, setInputValue] = useState("");

    const cleanInput = () => {
        setInputValue("");

    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            cleanInput();
            onSendMessage(inputValue);
        }
    };

    return (
        <div className="text-center">
            <input value={inputValue}
                aria-label="Chat message input"
                id="chat-input" type="text" className="w-full border-border border-2 rounded-md p-2"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown} />
        </div>
    );
}

const ChatMessage = ({ message, isBot }: { message: string, isBot: boolean }) => {
    return (
        <div className={cn(isBot ? "text-left" : "text-right")}>
            <span className={cn(
                "inline-block p-2 rounded-lg max-w-[80%]",
                isBot
                    ? "bg-gray-200 text-gray-900"
                    : "bg-brand-secondary text-white"
            )}>{message}</span>
        </div>
    );
}

const ChatHeader = () => {
    return (
        <div className="border-border border-2 w-full h-10">
            <div className="w-full">
                <span> IA Assistant</span>
            </div>
        </div>
    );
}
