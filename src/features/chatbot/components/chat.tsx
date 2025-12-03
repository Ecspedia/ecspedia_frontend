'use client';
import { ScrollableList } from "@/components/shared";
import HotelCard from "@/components/shared/HotelCard";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useIsMobile from "@/hooks/useIsMobile.hook";
import { ChatResponseType, Hotel } from "@/types/graphql";
import { cn } from "@/utils/utils";
import { Bot, ChevronDown, ExpandIcon, Loader2, SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { addMessage, selectIsExpanded, selectLoading, selectMessages, sendChatMessage, toggleIsExpanded } from "../stores/chatbotSlice";

export default function Chat({ onClose }: { onClose: () => void }) {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectMessages);
    const loading = useAppSelector(selectLoading);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const isExpanded = useAppSelector(selectIsExpanded);




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
            <div className={cn(
                "flex flex-col w-full h-[96dvh]  mx-auto rounded-lg border border-border lbg-background dark:bg-overlay",
                isExpanded ? "lg:w-200 lg:h-160" : "lg:w-100 lg:h-120"
            )}>
                <ChatHeader onClose={onClose} />
                <div ref={containerRef} className="flex-1 flex flex-col gap-2 p-2 overflow-y-auto">
                    {messages.map((message, index) => {
                        return (
                            <>
                                {
                                    index === lastMessageSendByUser?.index && (
                                        <div key="last-message" className="sentinel-top" ref={lastMessageRef}></div>
                                    )
                                }
                                {message.typeOf === ChatResponseType.Hotels && message.data ? (
                                    <ChatMessageHotel hotels={message.data as Hotel[]} />
                                ) : (
                                    <ChatMessage key={index} message={message.message} isBot={message.isBot} />
                                )}
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

const ChatMessageHotel = ({ hotels }: { hotels: Hotel[] }) => {
    return (
        <ScrollableList
            items={hotels}
            direction="horizontal"
            initialBatchSize={3}
            batchSize={hotels.length}
            renderItem={(item) => (
                <HotelCard key={item.id} hotel={item} variant="chat-card" />
            )}
        />
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
                <div className="flex gap-2">
                    <ExpandButton />
                    <ChevronDown className="h-full cursor-pointer" onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

const ExpandButton = () => {
    const dispatch = useAppDispatch();
    const onExpandChat = () => {
        dispatch(toggleIsExpanded());
    }
    return (
        <Button variant="secondary" onClick={onExpandChat}>
            <ExpandIcon className="w-4 h-4" />
        </Button>
    );
};