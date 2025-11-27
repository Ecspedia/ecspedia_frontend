'use client';
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useIsMobile from "@/hooks/useIsMobile.hook";
import { cn } from "@/utils/utils";
import { Bot, ChevronDown, Loader2, SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { addMessage, selectLoading, selectMessages, sendChatMessage } from "../stores/chatbotSlice";

export default function Chat({ onClose }: { onClose: () => void }) {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectMessages);
    const loading = useAppSelector(selectLoading);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    const onSendMessage = async (message: string) => {
        dispatch(addMessage(message));

        requestAnimationFrame(() => {
            scrollToBottom();
        });
        await dispatch(sendChatMessage(message));

        setTimeout(scrollToLastMessage, 0);

        if (!isMobile) {
            inputRef.current?.focus();
        } else {

            inputRef.current?.blur();
        }
    }
    const sentinelRef = useRef<HTMLDivElement>(null);

    const scrollToLastMessage = () => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToBottom = () => {
        sentinelRef.current?.scrollIntoView({ behavior: "auto" });
    };
    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

    const lastMessageSendByUser = messages.findLast((message) => message.isBot === false);

    const isMobile = useIsMobile();
    useEffect(() => {
        if (isMobile) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isMobile]);

    return (
        <div className="lg:mx-0">
            <div className="flex flex-col w-full h-[96dvh] lg:w-100 mx-auto rounded-lg border border-border lg:h-120 bg-background dark:bg-overlay">
                <ChatHeader onClose={onClose} />
                <div ref={containerRef} className="flex-1 flex flex-col gap-2 p-2 overflow-y-auto">
                    {messages.map((message, index) => {
                        return (
                            <>
                                {
                                    index === lastMessageSendByUser?.index && (
                                        <div className="sentinel-top" ref={lastMessageRef}></div>
                                    )
                                }
                                <ChatMessage key={index} message={message.message} isBot={message.isBot} />
                            </>
                        );
                    })}
                    <div id="sentinel" ref={sentinelRef}></div>
                </div>
                <ChatInput inputRef={inputRef} onSendMessage={onSendMessage} loading={loading} />
            </div>
        </div>
    );
}

const ChatInput = ({ onSendMessage, loading, inputRef }: { onSendMessage: (message: string) => Promise<void>, loading: boolean, inputRef: React.RefObject<HTMLTextAreaElement | null> }) => {
    const [inputValue, setInputValue] = useState("");

    const cleanInput = () => {
        setInputValue("");
    };
    const handleSendMessage = async () => {
        if (inputValue.trim() === "" || loading) return;
        const message = inputValue;
        cleanInput();
        await onSendMessage(message);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && inputValue.trim() !== "" && !loading) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="p-2 border-t border-border flex items-center gap-4">
            <textarea
                ref={inputRef}
                value={inputValue}
                disabled={loading}
                aria-label="Chat message input"
                id="chat-input"
                placeholder="Message..."
                className="w-full border-border border-2 rounded-md p-2 resize-none disabled:opacity-50"
                rows={1}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {loading ? (
                <Loader2 className="w-6 h-6 text-brand-secondary animate-spin" />
            ) : (
                <SendHorizonal className="w-6 h-6 text-brand-secondary cursor-pointer" onClick={() => handleSendMessage()} />
            )}
        </div>
    );
};

const ChatMessage = ({ message, isBot, ref }: { message: string, isBot: boolean, ref?: React.RefObject<HTMLDivElement | null> | null }) => {
    return (
        <div ref={ref} className={cn("flex items-start gap-2", isBot ? "flex-row" : "flex-row-reverse")}>
            {isBot && <ProfilePicture isProfilePicture={false} />}
            <span className={cn(
                "p-2 rounded-lg max-w-[80%] wrap-break-words whitespace-pre-wrap",
                isBot
                    ? "bg-surface-message text-primary"
                    : "bg-brand-secondary text-white"
            )}>{message}</span>
        </div>
    );
};

const ProfilePicture = ({ isProfilePicture }: { isProfilePicture: boolean }) => {
    return (
        isProfilePicture ? (
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 dark:bg-white">
                <Bot className="w-6 h-6 text-brand-secondary " />
            </div>
        ) : (
            <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center self-end shrink-0">
                <Bot className="w-6 h-6 text-white" />
            </div>
        )
    );
};

const ChatHeader = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="border-b p-2 bg-brand-secondary rounded-t-lg text-white ">
            <div className="flex items-center justify-between pr-2">
                <div className="flex items-center gap-2">
                    <ProfilePicture isProfilePicture={true} />
                    <span> IA Assistant</span>
                </div>
                <ChevronDown className="h-full cursor-pointer" onClick={onClose} />
            </div>
        </div>
    );
};