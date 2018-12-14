class Negociacao {

    constructor(data, quantidade, valor, volume){
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
        this._volume = volume;
        Object.freeze(this);
    }

    get volume(){
        return this._volume;
    }

    get data(){
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}