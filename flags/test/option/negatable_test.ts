import { assertEquals, assertThrows } from "../../../dev_deps.ts";
import { parseFlags } from "../../flags.ts";
import type { IParseOptions } from "../../types.ts";

const options = <IParseOptions> {
  allowEmpty: true,
  flags: [{
    name: "remote",
  }, {
    name: "color",
  }, {
    name: "no-color",
  }, {
    name: "no-check",
  }],
};

Deno.test("negatable flags with no arguments", () => {
  const { flags, unknown, literal } = parseFlags([], options);

  assertEquals(flags, {
    check: true,
  });
  assertEquals(unknown, []);
  assertEquals(literal, []);
});

Deno.test("negatable flags", () => {
  const { flags, unknown, literal } = parseFlags(
    ["--no-color", "--no-check"],
    options,
  );

  assertEquals(flags, {
    color: false,
    check: false,
  });
  assertEquals(unknown, []);
  assertEquals(literal, []);
});

Deno.test("Option with name with negatable flags", () => {
  assertThrows(
    () => parseFlags(["--color", "--no-color", "--no-check"], options),
    Error,
    `Option with name "--no-color" already exists.`,
  );
});

Deno.test("unknown negatable flag", () => {
  assertThrows(
    () => parseFlags(["--no-remote"], options),
    Error,
    `Unknown option "--no-remote".`,
  );
});
