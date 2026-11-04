// Instantes correspondientes a medianoche en America/Mexico_City (UTC−06:00).
export const LACOSTE_START = Date.parse('2026-11-06T00:00:00-06:00');
export const LACOSTE_END = Date.parse('2026-11-13T00:00:00-06:00');
export const stylePartners = [
  { id: 'adidas', title: 'Adidas', url: 'https://www.awin1.com/cread.php?s=3716681&v=79918&q=498084&r=3132227', image: 'https://www.awin1.com/cshow.php?s=3716681&v=79918&q=498084&r=3132227', fallback: '/images/adidas-awin-3716681-original.png', width: 622, height: 391 },
  { id: 'lacoste', title: 'Lacoste · Singles’ Day', url: 'https://www.awin1.com/cread.php?s=4969747&v=32585&q=606120&r=3132227', image: 'https://www.awin1.com/cshow.php?s=4969747&v=32585&q=606120&r=3132227', width: 336, height: 280 }
];
export function isLacosteActive(now) {
  const instant = Number(now);
  return instant >= LACOSTE_START && instant < LACOSTE_END;
}
export function lacostePhase(now) {
  return Number(now) < LACOSTE_START ? 'upcoming' : isLacosteActive(now) ? 'active' : 'expired';
}
// Solo acepta instantes con zona explícita; producción ignora siempre el parámetro.
export function developmentDate(search, development) {
  if (!development) return null;
  const value = new URLSearchParams(search).get('styleDate');
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/.test(value)) return null;
  const instant = Date.parse(value);
  return Number.isFinite(instant) ? instant : null;
}

// Campaña independiente: no hereda la programación de Singles’ Day.
export const totePromotion = {
  url: 'https://www.awin1.com/cread.php?s=4969774&v=32585&q=606680&r=3132227',
  image: 'https://www.awin1.com/cshow.php?s=4969774&v=32585&q=606680&r=3132227',
  width: 468,
  height: 60,
  conditions: 'https://www.lacoste.com/mx/TermsandConditionsSAS.html'
};
