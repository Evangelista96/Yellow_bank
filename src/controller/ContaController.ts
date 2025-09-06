import { Conta } from '../model/Conta';
import { colors } from '../util/Colors';

import { ContaRepository } from './../repository/ContaRepository';

export class ContaController implements ContaRepository{
    [x: string]: any;

    private ListaContas: Array<Conta> = new Array<Conta>() 
    numero: number = 0

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero)
        if (buscaConta !== null){
            buscaConta.visualizar()
        } else{
            console.log(`\nA Conta número:${numero} não foi encontrado no sistema!`);
        }
    }
    
    listarTodas(): void {
        for (let conta of this.ListaContas) { 
            conta.visualizar();
        }
        console.log(this.ListaContas);
    }
    
    cadastrar(conta: Conta): void {
        this.ListaContas.push(conta)
        console.log (colors.fg.green, "\nA Conta número:" + Conta.numero + "foi criada com sucesso!", colors.reset);
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero)

        if (buscaConta !== null){
            this.ListaContas[this.ListaContas.indexOf(buscaConta)] = conta;
            console.log(`\nA Conta número:${conta.numero} foi atualizado com sucesso!`);

        } else{
            console.log(`\nA Conta com o número:${conta.numero} não foi encontrada no sistema`)
        }
    }
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero)

        if (buscaConta !== null){
        this.ListaContas.splice(this.ListaContas.indexOf(buscaConta), 1)
    
            console.log(`\nA Conta número:${numero} foi apagada com sucesso!`);

        } else{
            console.log(`\nA Conta com o número:${numero} não foi encontrada no sistema`)
        }
    }
    sacar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero)
        if (conta !== null){
            if(conta.sacar(valor) === true){
                console.log(`\nO saque na conta número:${numero} foi efetuado com sucesso!`)
            } else {
            console.log(`\nA Conta número:${numero} não foi encontrada no sistema`) 
            }
        }
    }
    depositar(numero: number, valor: number): void {
        let buscaConta = this.buscarNoArray(numero)
        if (buscaConta !== null){
            buscaConta.depositar(valor)
            console.log(`\nO deposito na conta número:${numero} foi efetuado com sucesso!`)
        } else{
            console.log(`\nA Conta número:${numero} não foi encontrado no sistema!`);
        }
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem)
        let contaDestino = this.buscarNoArray(numeroDestino)
        if (contaOrigem !== null && contaDestino !== null){
            if (contaOrigem.sacar(valor) == true){
                contaDestino.depositar(valor);
                console.log(`\nA tranferência da conta número:${numeroOrigem} para conta número ${numeroOrigem} foi efetuado com sucesso!`)

            }
        } else{
        console.log(`\nA Conta número:${numeroOrigem} e/ou ${numeroDestino} não foram encontradas no sistema!`);
        }
    }
    /*Métodos Auxiliares*/
    /*Gerar Número da Conta */
    public gerarNumero (): number{
        return ++ this.numero;

    }
    // Checar se uma conta existe

    public buscarNoArray(numero: number): Conta | null{
        for(let conta of this.ListaContas){
            if(conta.numero === numero){
                return conta
            }

        }
        return null
    }
    }