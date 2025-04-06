import MessageType from "@/app/objects/MessageType";

export default class MessageObject {
    public readonly key: string;
    public readonly when: number;
    constructor(
        public readonly who: string, // identifier of the user that created the message
        public readonly messageText: string, 
        public readonly messageType: MessageType,
        when?: number,
        key?: string,
    ) {
        this.when = when ? when : Date.now();
        this.key = key ? key : `${this.when}-${who}`;
    }
}