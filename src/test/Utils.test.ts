import { extractPageCount } from "../services/Utils";

test("Extract page count #1", () => {
  const expected = [0, 0];
  const res = extractPageCount(null, null, 0);
  expect(res).toStrictEqual(expected);
});

test("Extract page count #2", () => {
  const expected = [1, 5];
  const res = extractPageCount(null, null, 5);
  expect(res).toStrictEqual(expected);
});

test("Extract page count #3", () => {
  const expected = [1, 10];
  const res = extractPageCount(null, "url/com?page=2", 100);
  expect(res).toStrictEqual(expected);
});

test("Extract page count #4", () => {
  const expected = [10, 20];
  const res = extractPageCount("url/com?page=1", "url/com?page=3", 100, 10);
  expect(res).toStrictEqual(expected);
});

test("Extract page count #5", () => {
  const expected = [90, 100];
  const res = extractPageCount("url/com?page=9", null, 100, 10);
  expect(res).toStrictEqual(expected);
});
