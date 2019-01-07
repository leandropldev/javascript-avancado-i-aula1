class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona','esvazia','ordena','inverteOrdem');
        
        this._mensagem = new Bind(new Mensagem, new MensagemView($('#mensagemView')), 'texto');
        this._ordemAtual = ''; 

        //preenchendo a tabela com dados do IndexDB
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDAO(connection).listaTodos())
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });
    }

    apaga() {
        ConnectionFactory.getConnection()
            .then(connection => {
                new NegociacaoDAO(connection).apagaTodos()
                    .then(message => {
                        this._mensagem.texto = message;
                        this._listaNegociacoes.esvazia();
                    });
            }).catch(erro => this._mensagem.texto = erro);
    }

    adiciona(event){
        event.preventDefault();
        ConnectionFactory.getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDAO(connection).adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso';
                        this._limpaFormulario();
                    });
            }).catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes(){
        let service = new NegociacaoService();
        service.obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(error => this._mensagem.texto = error);  
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );      
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    
        this._inputData.focus();
    }
} 