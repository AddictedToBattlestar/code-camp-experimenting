export default class ImageData {
    constructor(
        private readonly uri: string, 
        private readonly width?: number, 
        private readonly height?: number, 
        private readonly type?: string, 
        private readonly mimetype?: string, 
        private readonly fileName?: string, 
        private readonly fileSize?: number
    ) {}
}