'use client';
import { ScrollableList } from "@/components/shared";
import HotelCard from "@/components/shared/HotelCard";
import { Button } from "@/components/ui/Button";
import { useCurrentUser } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useIsMobile from "@/hooks/useIsMobile.hook";
import { selectSelectedHotel, selectSelectedHotelId } from "@/stores/globalSlice";
import { ChatResponseType, HotelResponseDto } from "@/types/graphql";
import { cn } from "@/utils/utils";
import { Bot, ChevronDown, ExpandIcon, Loader2, SendHorizonal, Sparkles } from "lucide-react";
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

    const addMetaDataToMessage = useAddMetaDataToMessage();






    const onSendMessage = async (message: string) => {
        dispatch(addMessage(message));

        requestAnimationFrame(() => {
            scrollToBottom();
        });

        const messageWithMetaData = addMetaDataToMessage(message);
        await dispatch(sendChatMessage(messageWithMetaData));

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
                "flex flex-col w-full h-[96dvh]  mx-auto rounded-lg border border-border bg-background dark:bg-overlay",
                isExpanded ? "lg:w-200 lg:h-160" : "lg:w-100 lg:h-140"
            )}>
                <ChatHeader onClose={onClose} />
                <div ref={containerRef} className="flex-1 flex flex-col gap-2 p-2 overflow-y-auto overscroll-y-contain">
                    {messages.map((message, index) => (
                        <div key={`message-${index}`}>
                            {index === lastMessageSendByUser?.index && (
                                <div className="sentinel-top" ref={lastMessageRef}></div>
                            )}
                            {message.typeOf === ChatResponseType.SearchResults ? (
                                <ChatMessageHotel hotels={message.data as HotelResponseDto[]} />
                            ) : (
                                <ChatMessage message={message.message} typeOf={message.typeOf} isBot={message.isBot} />
                            )}
                        </div>
                    ))}
                    {loading && <TypingIndicator />}
                    <div id="sentinel" ref={sentinelRef}></div>
                </div>
                <ChatInput inputRef={inputRef} onSendMessage={onSendMessage} loading={loading} />
            </div>
        </div>
    );
}


const useAddMetaDataToMessage = () => {
    const selectedHotelId = useAppSelector(selectSelectedHotelId);
    const currentUser = useCurrentUser();


    const addMetaDataToMessage = (message: string) => {
        let metaData = '';
        if (currentUser?.user?.id) {
            metaData = `userId:${currentUser?.user?.id}`;
        }
        if (selectedHotelId) {
            metaData += ` hotelId:${selectedHotelId}`;
        }
        return `${metaData} ${message}`;
    };

    return addMetaDataToMessage;
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

const ChatMessageHotel = ({ hotels }: { hotels: HotelResponseDto[] }) => {
    const selectedHotel = useAppSelector(selectSelectedHotel);

    return (
        <ScrollableList
            items={hotels}
            direction="vertical"
            initialBatchSize={3}
            batchSize={3}
            renderItem={(item) => (
                <HotelCard
                    key={item.id}
                    hotel={item}
                    variant="chat-card"
                    isSelected={selectedHotel?.id === item.id}
                />
            )}
        />
    );
};

const TypingIndicator = () => {
    return (
        <div className="flex items-start gap-2 flex-row">
            <ProfilePicture isProfilePicture={false} />
            <div className="p-3 rounded-lg bg-surface-message dark:bg-surface-raised text-primary flex items-center gap-1">
                <span className="w-2 h-2 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></span>
                <span className="w-2 h-2 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></span>
                <span className="w-2 h-2 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></span>
            </div>
        </div>
    );
};

const ChatMessage = ({ message, isBot, ref, typeOf }: { message: string, isBot: boolean, ref?: React.RefObject<HTMLDivElement | null> | null, typeOf?: ChatResponseType }) => {
    console.log(typeOf);
    return (
        <div ref={ref} className={cn("flex items-start gap-2", isBot ? "flex-row" : "flex-row-reverse")}>
            {isBot && <ProfilePicture isProfilePicture={false} />}
            <span className={cn(
                "p-2 rounded-lg max-w-[80%] wrap-break-words whitespace-pre-wrap",
                isBot
                    ? "bg-surface-message text-primary"
                    : "bg-brand-secondary text-white",
                typeOf === ChatResponseType.Error && "bg-error text-white"
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
    const selectedHotel = useAppSelector(selectSelectedHotel);

    return (
        <div className="border-b p-2 bg-brand-secondary rounded-t-lg text-white ">
            <div className="flex items-center justify-between pr-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <ProfilePicture isProfilePicture={true} />
                    <div className="flex flex-col min-w-0">
                        <span className="font-medium">IA Assistant</span>
                        {selectedHotel && (
                            <span className="text-xs opacity-90 truncate flex items-center gap-1">
                                <Sparkles className="w-3 h-3 shrink-0" />
                                {selectedHotel.name}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 shrink-0">

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