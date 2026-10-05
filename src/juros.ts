const jurosDiarios = 0.025;
const Um_dia_em_ms = 1000 * 60 * 60 * 24;

export function calcularDiasDeAtraso(vencimento: Date, hoje: Date): number {
  const dataVenc = Date.UTC(
    vencimento.getFullYear(),
    vencimento.getMonth(),
    vencimento.getDate(),
  );
  const dataHoje = Date.UTC(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
  );

  const dias = Math.floor((dataHoje - dataVenc) / Um_dia_em_ms);
  return Math.max(dias, 0);
}

export function calcularJuros(
  valor: number,
  vencimento: Date,
  hoje: Date = new Date(),
) {
  if (valor <= 0) {
    throw new Error("valor tem que ser maior que zero...");
  }
  const diasDeAtraso = calcularDiasDeAtraso(vencimento, hoje);
  const juros = Math.round(valor * jurosDiarios * diasDeAtraso * 100) / 100;

  return {
    diasDeAtraso,
    juros,
    valorTotal: Math.round((valor + juros) * 100) / 100,
  };
}
