interface Venda {
  vendedor: string;
  valor: number;
}

export function calcularComissaoDeVendas(valor: number): number {
  if (valor < 100) return 0;
  if (valor < 500) return valor * 0.01;

  return valor * 0.05;
}

export function calcularComissaoPorVendedor(
  vendas: Venda[],
): Map<string, number> {
  const comissoes = new Map<string, number>();

  for (const venda of vendas) {
    const comissaoAtual = comissoes.get(venda.vendedor) ?? 0;
    const comissaoDaVenda = calcularComissaoDeVendas(venda.valor);
    comissoes.set(venda.vendedor, comissaoAtual + comissaoDaVenda);
  }
  return comissoes;
}

export function arredondar(valor: number): number {
  return Math.round(valor * 100) / 100;
}
