export default class ImageData {
    constructor(
        public readonly uri: string, 
        public readonly width?: number, 
        public readonly height?: number, 
        public readonly type?: string, 
        public readonly mimetype?: string, 
        public readonly fileName?: string, 
        public readonly fileSize?: number
    ) {}
}