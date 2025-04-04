import MessageObject from "@/app/objects/MessageObject";
import ImageFromSelf from "@/app/components/chat/message/ImageFromSelf";
import MessageFromSelf from "@/app/components/chat/message/MessageFromSelf";
import MessageFromSomeoneElse from "@/app/components/chat/message/MessageFromSomeoneElse";
import MessageType from "@/app/objects/MessageType";
import ImageFromSomeoneElse from "@/app/components/chat/message/ImageFromSomeoneElse";
import UserData from "@/app/objects/UserData";

type Props = {
    userNameForSelf: string;
    message: MessageObject;
    userData: UserData | undefined;
}
export default function Message({userNameForSelf, message, userData}: Readonly<Props>) {
    if (message.who === userNameForSelf && message.messageType === MessageType.Text) {
        return (<MessageFromSelf content={message.messageText}/>)
    } else if (message.who === userNameForSelf && message.messageType === MessageType.Image) {
        return (<ImageFromSelf content={message.messageText}/>)
    } else if (message.who !== userNameForSelf && message.messageType === MessageType.Text) {
        return (
            <MessageFromSomeoneElse
                content={message.messageText}
                who={message.who}
                userProfileImage={userData?.profileImage}
            />
        )
    } else if (message.who !== userNameForSelf && message.messageType === MessageType.Image) {
        return (
            <ImageFromSomeoneElse
                content={message.messageText}
                who={message.who}
                userProfileImage={userData?.profileImage}
            />
        )
    }
}