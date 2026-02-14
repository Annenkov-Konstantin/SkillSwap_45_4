export function transformKeysToLowercase<T extends Record<string, any>>(obj: T): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.toLowerCase(),
      value && typeof value === 'object' && !Array.isArray(value)
        ? transformKeysToLowercase(value)
        : value
    ])
  );
}
