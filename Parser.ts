import {Exp, Atom, Lambda, App, Symbol} from "./LambdaCalculus.ts";

export class Parser {
  private input: string;
  private pos: number;

  constructor(input: string) {
    this.input = input;
    this.pos = 0;
  }

  parse(): Exp {
    this.skipWhitespace();

    let exp = this.parseExp();

    this.skipWhitespace();

    if (this.pos < this.input.length) {
      throw new Error("Unexpected input");
    }

    return exp;
  }

  private parseExp(): Exp {
    this.skipWhitespace();

    let ch = this.peek();

    if (ch === "(") {
      this.consume("(");
      let exp = this.parseAppOrLambda();
      this.consume(")");
      return exp;
    } else if (/[a-zA-Z]/.test(ch)) {
      return this.parseSymbol();
    } else if (/[0-9]/.test(ch)) {
      return this.parseAtom();
    } else {
      throw new Error("Invalid input");
    }
  }

  private parseAppOrLambda(): Exp {
    this.skipWhitespace();

    let ch = this.peek();

    if (ch === "λ") {
      this.consume("λ");
      let symbol = this.parseSymbol();
      this.consume(".");
      let body = this.parseExp();
      return new Lambda(symbol, body);
    } else {
      let rator = this.parseExp();
      let rand = this.parseExp();
      return new App(rator, rand);
    }
  }

  private parseSymbol(): Symbol {
    let name = "";

    while (/[a-zA-Z0-9]/.test(this.peek())) {
      name += this.consume();
    }

    return new Symbol(name);
  }

  private parseAtom(): Atom {
    let numStr = "";

    while (/[0-9]/.test(this.peek())) {
      numStr += this.consume();
    }

    let num = parseInt(numStr);

    return new Atom(num);
  }

  private skipWhitespace() {
    while (/\s/.test(this.peek())) {
      this.consume();
    }
  }

  private peek(): string {
    return this.input.charAt(this.pos);
  }

  private consume(expected?: string): string {
    let ch = this.input.charAt(this.pos);

    if (expected && ch !== expected) {
      throw new Error(`Expected ${expected} but found ${ch}`);
    }

    this.pos++;

    return ch;
  }
}
