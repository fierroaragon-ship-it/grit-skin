import { useEffect, useState } from 'react';
import { developmentDate, lacostePhase, LACOSTE_START, LACOSTE_END } from './data/stylePartners.js';

export default function useLacosteSchedule(search) {
  const simulated = import.meta.env.DEV ? developmentDate(search, true) : null;
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (simulated !== null) return;
    let timer;
    const refresh = () => {
      const current = Date.now();
      setNow(current);
      clearTimeout(timer);
      const boundary = current < LACOSTE_START ? LACOSTE_START : current < LACOSTE_END ? LACOSTE_END : Infinity;
      // Revisa también cambios del reloj y pestañas que vuelven de suspensión.
      timer = setTimeout(refresh, Math.min(60_000, Math.max(1, boundary - current)));
    };
    refresh();
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => { clearTimeout(timer); window.removeEventListener('focus', refresh); document.removeEventListener('visibilitychange', refresh); };
  }, [simulated]);
  const phase = lacostePhase(simulated ?? now);
  return { simulated, phase, active: phase === 'active', upcoming: phase === 'upcoming', visible: phase !== 'expired' };
}
