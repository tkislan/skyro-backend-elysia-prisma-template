/** Returns the token from an `Authorization: Bearer <token>` header, or null when there is none. */
export function parseBearerToken(headers: Record<string, string | undefined>): string | null {
  // The scheme name is case-insensitive (RFC 9110 §11.1), the token itself is not.
  return headers.authorization?.match(/^Bearer (\S+)$/i)?.[1] ?? null;
}
