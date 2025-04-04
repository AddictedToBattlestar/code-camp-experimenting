export default class UserData {
    constructor (
        public readonly key: string, // unique guid
        public userName: string,
        public profileImage?: string // encoded image data
    ) {}
}

