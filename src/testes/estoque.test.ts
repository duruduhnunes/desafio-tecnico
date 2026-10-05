import { describe, it, expect } from "vitest";
import dados from "../data/estoque.json";
import { Estoque } from "../estoque.js";

describe("Estoque", () => {
  it("soma a quantidade numa entrada", () => {
    const estoque = new Estoque(dados.estoque);
    const { estoqueFinal } = estoque.movimentar(
      101,
      "entrada",
      50,
      "Compra de fornecedor",
    );

    expect(estoqueFinal).toBe(200);
  });

  it("subtrai a quantidade numa saída", () => {
    const estoque = new Estoque(dados.estoque);
    const { estoqueFinal } = estoque.movimentar(
      102,
      "saida",
      25,
      "Venda balcão",
    );

    expect(estoqueFinal).toBe(50);
  });

  it("acumula várias movimentações no mesmo produto", () => {
    const estoque = new Estoque(dados.estoque);
    estoque.movimentar(105, "saida", 40, "Venda");
    const { estoqueFinal } = estoque.movimentar(
      105,
      "entrada",
      10,
      "Devolução",
    );

    expect(estoqueFinal).toBe(60);
  });

  it("gera um id diferente para cada movimentação", () => {
    const estoque = new Estoque(dados.estoque);
    const a = estoque.movimentar(101, "entrada", 1, "Teste");
    const b = estoque.movimentar(101, "entrada", 1, "Teste");

    expect(a.movimentacao.id).not.toBe(b.movimentacao.id);
  });

  it("não deixa o estoque ficar negativo", () => {
    const estoque = new Estoque(dados.estoque);

    expect(() => estoque.movimentar(105, "saida", 91, "Venda")).toThrow(
      "Estoque insuficiente",
    );
  });

  it("recusa produto inexistente", () => {
    const estoque = new Estoque(dados.estoque);

    expect(() => estoque.movimentar(999, "entrada", 1, "Teste")).toThrow(
      "não encontrado",
    );
  });

  it("recusa quantidade zero, negativa ou quebrada", () => {
    const estoque = new Estoque(dados.estoque);

    expect(() => estoque.movimentar(101, "entrada", 0, "Teste")).toThrow();
    expect(() => estoque.movimentar(101, "entrada", -5, "Teste")).toThrow();
    expect(() => estoque.movimentar(101, "entrada", 1.5, "Teste")).toThrow();
  });

  it("não altera os dados originais do JSON", () => {
    const estoque = new Estoque(dados.estoque);
    estoque.movimentar(101, "saida", 10, "Venda");

    expect(dados.estoque[0].estoque).toBe(150);
  });
});
