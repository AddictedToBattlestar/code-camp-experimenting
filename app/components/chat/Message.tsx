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
        return (<MessageFromSelf text={message.messageText}/>)
    } else {
        return (
            <MessageFromSomeoneElse
                text={message.messageText}
                who={message.who}
                userImage={userImageForMessage}
            />
        )
    }
}