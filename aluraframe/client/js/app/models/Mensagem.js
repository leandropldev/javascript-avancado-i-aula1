class Mensagem {

    constructor(texto=''){ //atribuindo valor padrão para o construtor
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    } 
}