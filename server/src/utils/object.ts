/**
 * Reverse a object.
 * @example
 * reverseObject({ a: 1, b: 2 }) // { 1: 'a', 2: 'b' }
 */
export function revserseObject(
  obj: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(Object.entries(obj).map((a) => a.reverse()));
}

/**
 * Build supplied string by interpolating properties after delimiter(':') with the given parameters.
 *
 * @example
 * interpolate('/posts/:id', {id: 1})
 * => '/posts/1'
 *
 */
export function interpolate(
  str: string,
  params: { [key: string]: string | number | number[] },
): string {
  let url = str;
  Object.keys(params).forEach((key) => {
    url = url.replace(`:${key}`, `${params[key] + ''}`);
  });

  return url;
}
