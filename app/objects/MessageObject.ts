import MessageType from "@/app/objects/MessageType";

export default class MessageObject {
    constructor(
        private readonly key: string, 
        private readonly who: string, 
        private readonly messageText: string, 
        private readonly messageType: MessageType
    ) {}
}