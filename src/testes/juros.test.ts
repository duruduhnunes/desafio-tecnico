import { describe, it, expect } from "vitest";
import { calcularDiasDeAtraso, calcularJuros } from "../juros.js";

const HOJE = new Date(2026, 9, 5);

describe("calcularDiasDeAtraso", () => {
  it("conta os dias entre o vencimento e hoje", () => {
    expect(calcularDiasDeAtraso(new Date(2026, 8, 25), HOJE)).toBe(10);
  });

  it("retorna 0 quando vence hoje", () => {
    expect(calcularDiasDeAtraso(new Date(2026, 9, 5), HOJE)).toBe(0);
  });

  it("retorna 0 quando ainda não venceu", () => {
    expect(calcularDiasDeAtraso(new Date(2026, 9, 20), HOJE)).toBe(0);
  });

  it("ignora o horário do dia", () => {
    const vencimento = new Date(2026, 9, 4, 23, 59);
    const hojeDeManha = new Date(2026, 9, 5, 0, 1);

    expect(calcularDiasDeAtraso(vencimento, hojeDeManha)).toBe(1);
  });
});

describe("calcularJuros", () => {
  it("cobra 2,5% por dia de atraso", () => {
    const resultado = calcularJuros(1000, new Date(2026, 9, 4), HOJE);

    expect(resultado).toEqual({ diasDeAtraso: 1, juros: 25, valorTotal: 1025 });
  });

  it("acumula os juros pelos dias de atraso", () => {
    const resultado = calcularJuros(1000, new Date(2026, 8, 25), HOJE);

    expect(resultado).toEqual({
      diasDeAtraso: 10,
      juros: 250,
      valorTotal: 1250,
    });
  });

  it("não cobra juros se não estiver vencido", () => {
    const resultado = calcularJuros(1000, new Date(2026, 9, 20), HOJE);

    expect(resultado).toEqual({ diasDeAtraso: 0, juros: 0, valorTotal: 1000 });
  });

  it("arredonda para centavos", () => {
    const resultado = calcularJuros(99.99, new Date(2026, 9, 2), HOJE);

    expect(resultado.juros).toBe(7.5);
  });

  it("recusa valor zero ou negativo", () => {
    expect(() => calcularJuros(0, HOJE, HOJE)).toThrow();
    expect(() => calcularJuros(-10, HOJE, HOJE)).toThrow();
  });
});
