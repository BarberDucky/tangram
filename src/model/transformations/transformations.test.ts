import {TransformationMatrix} from "./transformation";

test('apply translate', () => {
  const A = new TransformationMatrix()
  A.translate(3, 4)
  expect(A.values.a).toBe(1);
  expect(A.values.b).toBe(0);
  expect(A.values.c).toBe(3);
  expect(A.values.d).toBe(0);
  expect(A.values.e).toBe(1);
  expect(A.values.f).toBe(4);
});

test('apply translate', () => {
  const A = new TransformationMatrix()
  A.translate(13)
  expect(A.values.a).toBe(1);
  expect(A.values.b).toBe(0);
  expect(A.values.c).toBe(13);
  expect(A.values.d).toBe(0);
  expect(A.values.e).toBe(1);
  expect(A.values.f).toBe(13);
});