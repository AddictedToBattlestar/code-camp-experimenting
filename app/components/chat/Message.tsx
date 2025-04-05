import MessageObject from "@/app/objects/MessageObject";
import ImageFromSelf from "@/app/components/chat/message/ImageFromSelf";
import MessageFromSelf from "@/app/components/chat/message/MessageFromSelf";
import MessageFromSomeoneElse from "@/app/components/chat/message/MessageFromSomeoneElse";
import MessageType from "@/app/objects/MessageType";
import ImageFromSomeoneElse from "@/app/components/chat/message/ImageFromSomeoneElse";
import UserData from "@/app/objects/UserData";

type Props = {
    userDataForSelf: UserData;
    message: MessageObject;
    userDataForMessage: UserData | undefined;
}
export default function Message({userDataForSelf, message, userDataForMessage}: Readonly<Props>) {
    if (message.who === userDataForSelf.key && message.messageType === MessageType.Text) {
        return (<MessageFromSelf content={message.messageText}/>)
    } else if (message.who === userDataForSelf.key && message.messageType === MessageType.Image) {
        return (<ImageFromSelf content={message.messageText}/>)
    } else if (message.who !== userDataForSelf.key && message.messageType === MessageType.Text) {
        return (
            <MessageFromSomeoneElse
                content={message.messageText}
                who={userDataForMessage ? userDataForMessage.userName : message.who}
                userProfileImage={userDataForMessage?.profileImage}
            />
        )
    } else if (message.who !== userDataForSelf.key && message.messageType === MessageType.Image) {
        return (
            <ImageFromSomeoneElse
                content={message.messageText}
                who={userDataForMessage ? userDataForMessage.userName : message.who}
                userProfileImage={userDataForMessage?.profileImage}
            />
        )
    }
}