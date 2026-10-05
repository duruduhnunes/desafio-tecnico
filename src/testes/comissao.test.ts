import { describe, it, expect } from "vitest";
import dados from "../data/vendas.json";
import {
  calcularComissaoDeVendas,
  calcularComissaoPorVendedor,
  arredondar,
} from "../comissao.js";

describe("calcularComissaoDeVendas", () => {
  it("não gera comissão abaixo de R$100", () => {
    expect(calcularComissaoDeVendas(99.99)).toBe(0);
  });

  it("gera 1% a partir de R$100", () => {
    expect(calcularComissaoDeVendas(100)).toBeCloseTo(1);
  });

  it("gera 1% logo abaixo de R$500", () => {
    expect(calcularComissaoDeVendas(499.99)).toBeCloseTo(4.9999);
  });

  it("gera 5% a partir de R$500", () => {
    expect(calcularComissaoDeVendas(500)).toBeCloseTo(25);
  });
});

describe("calcularComissaoPorVendedor", () => {
  it("soma as comissões de cada vendedor separadamente", () => {
    const vendas = [
      { vendedor: "A", valor: 1000 },
      { vendedor: "A", valor: 200 },
      { vendedor: "B", valor: 50 },
    ];
    const resultado = calcularComissaoPorVendedor(vendas);

    expect(resultado.get("A")).toBeCloseTo(52);
    expect(resultado.get("B")).toBe(0);
  });

  it("calcula os totais do JSON do desafio", () => {
    const resultado = calcularComissaoPorVendedor(dados.vendas);

    expect(arredondar(resultado.get("João Silva")!)).toBe(495.68);
    expect(arredondar(resultado.get("Maria Souza")!)).toBe(465.95);
    expect(arredondar(resultado.get("Carlos Oliveira")!)).toBe(379.37);
    expect(arredondar(resultado.get("Ana Lima")!)).toBe(404.98);
  });
});
