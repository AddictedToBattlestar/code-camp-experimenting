import MessageType from "@/app/objects/MessageType";

export default class MessageObject {
    private readonly _key: string;
    private readonly _time: number;
    private readonly _who: string;
    private readonly _messageText: string;
    private readonly _messageType: MessageType;

    constructor(key: string, time: number, who: string, messageText: string, messageType: MessageType) {
        this._key = key;
        this._time = time;
        this._who = who;
        this._messageText = messageText;
        this._messageType = messageType;
    }

    get key(): string {
        return this._key;
    }

    get time(): number {
        return this._time;
    }

    get who(): string {
        return this._who;
    }

    get messageText(): string {
        return this._messageText;
    }

    get messageType(): MessageType {
        return this._messageType;
    }
}