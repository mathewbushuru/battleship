import {test, expect, assert, vi } from "vitest";

test("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2);
  expect(Math.sqrt(144)).toBe(12);
});

test("JSON", () => {
  const input = {
    foo: "hello",
    bar: "world",
  };

  const output = JSON.stringify(input);

  expect(output).toEqual('{"foo":"hello","bar":"world"}');
  expect(output).eq('{"foo":"hello","bar":"world"}');
  assert.deepEqual(JSON.parse(output), input, "matches original");
});

const mockFn = vi.fn();
mockFn("hello", 1);
expect(vi.isMockFunction(mockFn)).toBe(true);
expect(mockFn.mock.calls[0]).toEqual(["hello", 1]);
