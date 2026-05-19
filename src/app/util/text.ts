// sentence-case.util.ts
export const toSentenceCase = (str: string): string  => 
{
  if (!str) return '';
  const cleaned = str.toString().trim().toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
