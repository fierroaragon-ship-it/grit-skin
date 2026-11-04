import React from 'react';
import useLacosteSchedule from './useLacosteSchedule.js';
import { stylePartners } from './data/stylePartners.js';
import PartnerImage from './PartnerImage.jsx';
import TotePromotion from './TotePromotion.jsx';

export default function BrandPartners({ lang, search, placement = 'home' }) {
  const { visible, upcoming, simulated } = useLacosteSchedule(search);
  const spanish = lang === 'es';
  const adidas = stylePartners[0];
  const lacosteUrl = 'https://www.awin1.com/cread.php?s=4969749&v=32585&q=606120&r=3132227';
  const lacosteImage = 'https://www.awin1.com/cshow.php?s=4969749&v=32585&q=606120&r=3132227';
  const promotion = spanish ? 'Lacoste · Singles’ Day · Del 6 al 12 de noviembre de 2026' : 'Lacoste · Singles’ Day · November 6–12, 2026';
  return <section className={`home-partners${placement === 'footer' ? ' brands-before-footer' : ''}`} id={placement === 'footer' ? 'marcas' : 'marcas-inicio'} aria-label={spanish ? 'Estilo y accesorios' : 'Style and accessories'}>
    <h2>{spanish ? 'Estilo y accesorios' : 'Style and accessories'}</h2>
    {visible && <div className="home-lacoste">
      <p className="partner-campaign-state">{upcoming ? (spanish ? 'Próxima promoción · Disponible del 6 al 12 de noviembre' : 'Upcoming promotion · Available November 6–12') : (spanish ? 'Promoción vigente · Del 6 al 12 de noviembre' : 'Promotion active · November 6–12')}<span>{spanish ? '2026 · Hora de Ciudad de México' : '2026 · Mexico City time'}</span>{upcoming && <span>{spanish ? 'Promoción aún no vigente.' : 'Promotion not yet active.'}</span>}</p>
      <PartnerImage image={lacosteImage} url={lacosteUrl} alt={promotion} width={728} height={90} retryLabel={spanish ? 'Reintentar cargar banner' : 'Retry loading banner'} fallbackText={upcoming ? (spanish ? 'Conoce Lacoste' : 'Explore Lacoste') : (spanish ? 'Ver promoción en Lacoste' : 'View promotion on Lacoste')} />
    </div>}
    <TotePromotion lang={lang} />
    <div className="home-adidas">
      <PartnerImage image={adidas.image} fallback={adidas.fallback} url={adidas.url} alt={spanish ? 'Logo oficial de Adidas' : 'Official Adidas logo'} width={622} height={391} className="home-adidas-logo" />
      <h2>Adidas</h2>
      <a className="button primary" href={adidas.url} target="_blank" rel="sponsored noopener noreferrer">{spanish ? 'Explorar Adidas' : 'Explore Adidas'} <span aria-hidden="true">↗</span></a>
    </div>
    <p className="home-partners-disclosure">{spanish ? 'Podemos recibir una comisión si compras desde estos enlaces.' : 'We may earn a commission if you buy through these links.'}</p>
    {import.meta.env.DEV && simulated !== null && <p className="style-preview" role="status">{spanish ? 'Vista de desarrollo · Fecha simulada (America/Mexico_City): ' : 'Development preview · Simulated date (America/Mexico_City): '}{new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'long', timeStyle: 'short' }).format(simulated)}</p>}
  </section>;
}
