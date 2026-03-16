import { useChatbot } from "@/contexts/ChatContext";
import { useChat } from "ai/react";
import ChatMessages from "./ChatMessages";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const { isVisible } = useChatbot();

  return (
    isVisible && (
      <div className="fixed bottom-8 right-8 w-80 h-80 rounded-md bg-background shadow-lg border-0">
        <div className="flex flex-col h-full p-0">
          <ChatMessages
            messages={messages}
            error={error}
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  );
}
