export type TipoMovimento = "entrada" | "saida";

export interface Produto {
    codigoProduto: number;
    descricaoProduto: string;
    estoque: number;
}

export interface Movimentacao {
    id: number;
    codigoProduto: number;
    tipo: TipoMovimento;
    quantidade: number;
    descricao: string;
    data: Date;
}

export class Estoque {
    private produto: Produto[];
    private movimentacoes: Movimentacao[] = [];
    private proximoId: number = 1;

    constructor(produtos: Produto[]){
        this.produto = structuredClone(produtos)
    }

    movimentar(
        codigoProduto: number,
        tipo: TipoMovimento,
        quantidade: number,
        descricao: string,
    ): { movimentacao: Movimentacao, estoqueFinal: number} {
        const produto = this.produto.find(p => p.codigoProduto === codigoProduto);
        if (!produto) {
            throw new Error(`Produto com código ${codigoProduto} não encontrado.`);
        }

        if (tipo === "saida" && produto.estoque < quantidade) {
            throw new Error(`Estoque insuficiente para o produto ${produto.descricaoProduto}.`);
        }
        if(!Number.isInteger(quantidade) || quantidade <= 0){
            throw new Error(`Quantidade inválida: ${quantidade}. Deve ser um número inteiro positivo.`);
        }

        if(tipo === "entrada"){
            produto.estoque += quantidade;
        } else {
            produto.estoque -= quantidade;
        }

        const movimentacao: Movimentacao = {
            id: this.proximoId++,
            codigoProduto,
            tipo,
            quantidade,
            descricao,
            data: new Date(),
        };

        this.movimentacoes.push(movimentacao);

        return { movimentacao, estoqueFinal: produto.estoque };
    }
}
