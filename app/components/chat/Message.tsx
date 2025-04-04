import MessageObject from "@/app/objects/MessageObject";
import ImageData from "@/app/objects/ImageData";
import ImageFromSelf from "@/app/components/chat/message/ImageFromSelf";
import MessageFromSelf from "@/app/components/chat/message/MessageFromSelf";
import MessageFromSomeoneElse from "@/app/components/chat/message/MessageFromSomeoneElse";
import MessageType from "@/app/objects/MessageType";
import ImageFromSomeoneElse from "@/app/components/chat/message/ImageFromSomeoneElse";

type Props = {
    userNameForSelf: string;
    message: MessageObject;
    userProfileImage: string | undefined;
}
export default function Message({userNameForSelf, message, userProfileImage}: Readonly<Props>) {
    if (message.who === userNameForSelf && message.messageType === MessageType.Text) {
        return (<MessageFromSelf content={message.messageText}/>)
    } else if (message.who === userNameForSelf && message.messageType === MessageType.Image) {
        return (<ImageFromSelf content={message.messageText}/>)
    } else if (message.who !== userNameForSelf && message.messageType === MessageType.Text) {
        return (
            <MessageFromSomeoneElse
                content={message.messageText}
                who={message.who}
                userProfileImage={userProfileImage}
            />
        )
    } else if (message.who !== userNameForSelf && message.messageType === MessageType.Image) {
        return (
            <ImageFromSomeoneElse
                content={message.messageText}
                who={message.who}
                userProfileImage={userProfileImage}
            />
        )
    }
}