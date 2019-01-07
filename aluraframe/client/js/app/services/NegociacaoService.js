class NegociacaoService { 

    constructor(){
        this._http = new HttpService();
    }

    /* estados de uma requisição ajax:
        0: requisição ainda não iniciada
        1: conexao com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição concluída e a resposta esta pronta
    */
    obterNegociacoesDaSemana() {

        return this._http
            .get('http://localhost:3000/negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._http
                .get('http://localhost:3000/negociacoes/anterior')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possível obter as negociações da semana anterior');
                });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._http
                .get('http://localhost:3000/negociacoes/retrasada')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possível obter as negociações da semana retrasada');
                });
    }
  
    obterNegociacoes(){
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;
        }).catch(erro => {
            console.log(erro);
            throw new Error(erro);
        });
    }
}