import MessageType from "@/app/objects/MessageType";

export default class MessageObject {
    constructor(
        public readonly key: string, 
        public readonly type: number,
        public readonly who: string, // identifier of the user that created the message
        public readonly messageText: string, 
        public readonly messageType: MessageType
    ) {}
}