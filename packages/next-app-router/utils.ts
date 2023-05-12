// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateCacheTag(procedurePath: string, input: any) {
  return input
    ? `${procedurePath}?input=${JSON.stringify(input)}`
    : procedurePath;
}
