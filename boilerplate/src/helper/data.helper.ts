export class Data<T> {

    private _datas: Array<T>;
    private _type: new (data: any) => T;

    constructor($_type: new (data: T) => T) {
        this._type = $_type;
        this._datas = new Array();
    }
    get datas(): Array<T> {
        return this._datas;
    }

    set datas(_datas: Array<T>) {
        //you can replace the fore
        _datas.forEach((data: T) => {
            this.datas.push(new this._type(data));
        })
    }
    public delete(index: number) {
        this.datas.splice(index, 1);
    }

    public add(item: T) {
        this.datas.push(item);
    }

    public get type(): new (data: any) => T {
        return this._type;
    }

    public empty() {
        this.datas.splice(0, this.datas.length);
    }

}
