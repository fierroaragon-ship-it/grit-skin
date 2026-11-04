import React from 'react';
import useLacosteSchedule from './useLacosteSchedule.js';
import { stylePartners } from './data/stylePartners.js';
import PartnerImage from './PartnerImage.jsx';
import TotePromotion from './TotePromotion.jsx';

export default function StyleAccessories({ lang, search }) {
  const { simulated, active, upcoming, visible } = useLacosteSchedule(search);
  const spanish = lang === 'es';
  const partners = stylePartners.filter(brand => brand.id !== 'lacoste' || visible);
  return <section className="section style-accessories" id="estilo-y-accesorios" aria-labelledby="style-title">
    <p className="kicker">GRIT SKIN · {spanish ? 'TIENDA' : 'SHOP'}</p>
    <h2 id="style-title">{spanish ? 'Estilo y accesorios' : 'Style and accessories'}</h2>
    {import.meta.env.DEV && simulated !== null && <p className="style-preview" role="status">{spanish ? 'Vista de desarrollo · Fecha simulada (America/Mexico_City): ' : 'Development preview · Simulated date (America/Mexico_City): '}{new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'long', timeStyle: 'short' }).format(simulated)}</p>}
    <div className={`style-grid${partners.length === 1 ? ' style-grid-single' : ''}`}>
      {partners.map(brand => {
        const lacoste = brand.id === 'lacoste';
        const label = !lacoste ? (spanish ? 'Explorar Adidas' : 'Explore Adidas') : upcoming ? (spanish ? 'Conoce Lacoste' : 'Explore Lacoste') : (spanish ? 'Ver promoción en Lacoste' : 'View promotion on Lacoste');
        return <article className={`style-card style-card-${brand.id}`} key={brand.id}>
          {lacoste && <p className="partner-campaign-state">{upcoming ? (spanish ? 'Próxima promoción · Disponible del 6 al 12 de noviembre' : 'Upcoming promotion · Available November 6–12') : (spanish ? 'Promoción vigente · Del 6 al 12 de noviembre' : 'Promotion active · November 6–12')}<span>{spanish ? '2026 · Hora de Ciudad de México' : '2026 · Mexico City time'}</span>{upcoming && <span>{spanish ? 'Promoción aún no vigente.' : 'Promotion not yet active.'}</span>}</p>}
          <PartnerImage image={brand.image} fallback={brand.fallback} url={brand.url} alt={lacoste ? (spanish ? 'Banner masculino de Lacoste para Singles’ Day' : 'Lacoste menswear banner for Singles’ Day') : (spanish ? 'Logo original de Adidas' : 'Original Adidas logo')} width={brand.width} height={brand.height} className="style-image-link" />
          <div className="style-card-copy"><h3>{brand.title}</h3>
            {lacoste && active && <p>{spanish ? '20% de descuento en nueva colección' : '20% off the new collection'}</p>}
            <a className="button primary" href={brand.url} target="_blank" rel="sponsored noopener noreferrer">{label} <span aria-hidden="true">↗</span></a>
          </div>
        </article>;
      })}
    </div>
    <TotePromotion lang={lang} />
    <p className="style-disclosure">{spanish ? 'Podemos recibir una comisión si compras desde estos enlaces.' : 'We may earn a commission if you buy through these links.'}</p>
  </section>;
}
