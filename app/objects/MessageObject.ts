export default class MessageObject {
    private readonly _key: number;
    private readonly _who: string;
    private readonly _messageText: string;

    constructor(key: number, who: string, messageText: string) {
        this._key = key;
        this._who = who;
        this._messageText = messageText;
    }

    get key(): number {
        return this._key;
    }

    get who(): string {
        return this._who;
    }

    get messageText(): string {
        return this._messageText;
    }
}