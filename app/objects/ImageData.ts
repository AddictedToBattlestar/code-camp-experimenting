import uri from "ajv/lib/runtime/uri";

export default class ImageData {
    private readonly _uri: string;
    private readonly _width?: number;
    private readonly _height?: number;
    private readonly _type?: string;
    private readonly _mimetype?: string;
    private readonly _fileName?: string;
    private readonly _fileSize?: number;

    constructor(uri: string, width?: number, height?: number, type?: string, mimetype?: string, fileName?: string, fileSize?: number) {
        this._uri = uri;
        this._width = width;
        this._height = height;
        this._type = type;
        this._mimetype = mimetype;
        this._fileName = fileName;
        this._fileSize = fileSize;
    }

    get uri(): string {
        return this._uri;
    }

    get width(): number | undefined {
        return this._width;
    }

    get height(): number | undefined {
        return this._height;
    }

    get type(): string | undefined {
        return this._type;
    }

    get mimetype(): string | undefined {
        return this._mimetype;
    }

    get fileName(): string | undefined {
        return this._fileName;
    }

    get fileSize(): number | undefined {
        return this._fileSize;
    }
}