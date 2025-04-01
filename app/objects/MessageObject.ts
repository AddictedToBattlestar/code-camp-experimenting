import MessageType from "@/app/objects/MessageType";

export default class MessageObject {
    constructor(
        public readonly key: string, 
        public readonly who: string, 
        public readonly messageText: string, 
        public readonly messageType: MessageType
    ) {}
}