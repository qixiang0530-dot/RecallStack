export async function createContentHash(parts: string[]): Promise<string> {
  const normalized = parts.map((part) => part.trim().replace(/\s+/g, ' ')).join('|')
  const bytes = new TextEncoder().encode(normalized)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}
