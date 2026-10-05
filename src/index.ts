import dados from "./data/vendas.json";
import { Estoque } from "./estoque";
import dadosEstoque from "./data/estoque.json";
import { calcularJuros } from "./juros";

import { arredondar, calcularComissaoPorVendedor } from "./comissao";

console.log("-----------comissões aquiiii-----------");

const comissoes = calcularComissaoPorVendedor(dados.vendas);

for (const [vendedor, total] of comissoes) {
  const formatado = arredondar(total).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  console.log(`${vendedor}: ${formatado}`);
}

console.log("-----------Estoque aquiiii-----------");

const estoque = new Estoque(dadosEstoque.estoque);
const r1 = estoque.movimentar(101, "entrada", 50, "Compra de fornecedor");
console.log(
  `Mov. #${r1.movimentacao.id} (${r1.movimentacao.descricao}): estoque final ${r1.estoqueFinal}`,
);

const r2 = estoque.movimentar(101, "saida", 30, "Venda balcão");
console.log(
  `Mov. #${r2.movimentacao.id} (${r2.movimentacao.descricao}): estoque final ${r2.estoqueFinal}`,
);

console.log("-----------Juros aquiiii-----------");

const vencimento = new Date(2026, 8, 25);
const conta = calcularJuros(1000, vencimento);

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
console.log(`Valor original: ${brl(1000)}`);
console.log(`Vencimento: ${vencimento.toLocaleDateString("pt-BR")}`);
console.log(`Dias de atraso: ${conta.diasDeAtraso}`);
console.log(`Juros: ${brl(conta.juros)}`);
console.log(`Total a pagar: ${brl(conta.valorTotal)}`);
