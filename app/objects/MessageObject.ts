export default class MessageObject {
    private readonly _key: string;
    private readonly _who: string;
    private readonly _messageText: string;

    constructor(key: string, who: string, messageText: string) {
        this._key = key;
        this._who = who;
        this._messageText = messageText;
    }

    get key(): string {
        return this._key;
    }

    get who(): string {
        return this._who;
    }

    get messageText(): string {
        return this._messageText;
    }
}