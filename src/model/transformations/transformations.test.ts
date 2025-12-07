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

test('apply rotation without normalization', () => {
  const A = new TransformationMatrix()
  A.rotate(Math.PI)

  expect(A.values.a).toBeCloseTo(-1);
  expect(A.values.b).toBeCloseTo(0);
  expect(A.values.c).toBe(0);
  expect(A.values.d).toBeCloseTo(0);
  expect(A.values.e).toBeCloseTo(-1);
  expect(A.values.f).toBe(0);
});

test('apply rotation with normalization for values greater than 2 * PI', () => {
  const A = new TransformationMatrix()
  A.rotate(3 * Math.PI)

  expect(A.values.a).toBeCloseTo(-1);
  expect(A.values.b).toBeCloseTo(0);
  expect(A.values.c).toBe(0);
  expect(A.values.d).toBeCloseTo(0);
  expect(A.values.e).toBeCloseTo(-1);
  expect(A.values.f).toBe(0);
});

test('apply rotation with normalization for values smaller than 0', () => {
  const A = new TransformationMatrix()
  A.rotate(-Math.PI)

  expect(A.values.a).toBeCloseTo(-1);
  expect(A.values.b).toBeCloseTo(0);
  expect(A.values.c).toBe(0);
  expect(A.values.d).toBeCloseTo(0);
  expect(A.values.e).toBeCloseTo(-1);
  expect(A.values.f).toBe(0);
});

test('apply rotation with normalization for values smaller than -2 * PI', () => {
  const A = new TransformationMatrix()
  A.rotate(-3 * Math.PI)

  expect(A.values.a).toBeCloseTo(-1);
  expect(A.values.b).toBeCloseTo(0);
  expect(A.values.c).toBe(0);
  expect(A.values.d).toBeCloseTo(0);
  expect(A.values.e).toBeCloseTo(-1);
  expect(A.values.f).toBe(0);
});