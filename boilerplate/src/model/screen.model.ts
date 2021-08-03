export class Screen {
    private _width: number;
    private _height: number;
    private _aspectRatio : number;
    static readonly MAX_RATIO : number = 2;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._aspectRatio = width / height;
    }



    
    get width() : number { 
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height() : number { 
        return this._height;
    }


    set height(value: number) {
        this._height = value;
    }

    get aspectRatio() : number { 
        return this._aspectRatio;
    }


    get pixelRatio() : number { 
        return Math.min(window.devicePixelRatio, Screen.MAX_RATIO)
    }


    resize(width: number, height: number) {
        this.height = height;
        this.width = width;
        this._aspectRatio = this.width / this.height
    }
}