import MessageObject from "@/app/objects/MessageObject";
import ImageData from "@/app/objects/ImageData";
import ImageFromSelf from "@/app/components/chat/message/ImageFromSelf";
import MessageFromSelf from "@/app/components/chat/message/MessageFromSelf";
import MessageFromSomeoneElse from "@/app/components/chat/message/MessageFromSomeoneElse";
import MessageType from "@/app/objects/MessageType";

type MessageProps = {
    userNameForSelf: string;
    message: MessageObject;
    userImageForMessage: ImageData | undefined;
}

export default function Message({userNameForSelf, message, userImageForMessage}: MessageProps) {
    if (message.who === userNameForSelf && message.messageType === MessageType.Text) {
        return (<MessageFromSelf content={message.messageText}/>)
    }
    else if (message.who === userNameForSelf && message.messageType === MessageType.Image) {
        return (<ImageFromSelf content={message.messageText}/>)
    }
    else if (message.who !== userNameForSelf) {
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