import MessageObject from "@/app/objects/MessageObject";
import ImageData from "@/app/objects/ImageData";
import MessageFromSelf from "@/app/components/chat/message/MessageFromSelf";
import MessageFromSomeoneElse from "@/app/components/chat/message/MessageFromSomeoneElse";

type MessageProps = {
    userNameForSelf: string;
    message: MessageObject;
    userImageForMessage: ImageData | undefined;
}

export default function Message({userNameForSelf, message, userImageForMessage}: MessageProps) {
    if (message.who === userNameForSelf) {
        return (<MessageFromSelf content={message.messageText} type={message.messageType}/>)
    } else {
        return (
            <MessageFromSomeoneElse
                content={message.messageText}
                type={message.messageType}
                who={message.who}
                userImage={userImageForMessage}
            />
        )
    }
}