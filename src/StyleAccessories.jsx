import React from 'react';
import useLacosteSchedule from './useLacosteSchedule.js';
import { stylePartners } from './data/stylePartners.js';

export default function StyleAccessories({ lang, search }) {
  const { simulated, active } = useLacosteSchedule(search);
  const spanish = lang === 'es';
  const partners = stylePartners.filter(brand => brand.id !== 'lacoste' || active);
  return <section className="section style-accessories" id="estilo-y-accesorios" aria-labelledby="style-title">
    <p className="kicker">GRIT SKIN · {spanish ? 'TIENDA' : 'SHOP'}</p>
    <h2 id="style-title">{spanish ? 'Estilo y accesorios' : 'Style and accessories'}</h2>
    {simulated !== null && <p className="style-preview" role="status">{spanish ? 'Vista de desarrollo · Fecha simulada (America/Mexico_City): ' : 'Development preview · Simulated date (America/Mexico_City): '}{new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'long', timeStyle: 'short' }).format(simulated)}</p>}
    <div className={`style-grid${partners.length === 1 ? ' style-grid-single' : ''}`}>
      {partners.map(brand => <article className={`style-card style-card-${brand.id}`} key={brand.id}>
        <a className="style-image-link" href={brand.url} target="_blank" rel="sponsored noopener noreferrer" aria-label={brand.id === 'adidas' ? (spanish ? 'Explorar Adidas' : 'Explore Adidas') : (spanish ? 'Ver promoción en Lacoste' : 'View promotion on Lacoste')}><img src={brand.image} alt={brand.id === 'adidas' ? (spanish ? 'Logo original de Adidas' : 'Original Adidas logo') : (spanish ? 'Banner masculino de Lacoste para Singles’ Day' : 'Lacoste menswear banner for Singles’ Day')} width={brand.width} height={brand.height} loading="lazy" /></a>
        <div className="style-card-copy"><h3>{brand.title}</h3>
          {brand.id === 'lacoste' && <><p>{spanish ? '20% de descuento en nueva colección' : '20% off the new collection'}</p><p className="style-validity">{spanish ? 'Del 6 al 12 de noviembre de 2026' : 'November 6–12, 2026'}</p></>}
          <a className="button primary" href={brand.url} target="_blank" rel="sponsored noopener noreferrer">{brand.id === 'adidas' ? (spanish ? 'Explorar Adidas' : 'Explore Adidas') : (spanish ? 'Ver promoción en Lacoste' : 'View promotion on Lacoste')} <span aria-hidden="true">↗</span></a>
        </div>
      </article>)}
    </div>
    <p className="style-disclosure">{spanish ? 'Enlaces de afiliado: podemos recibir una comisión por las compras realizadas a través de estos enlaces. La compra se realiza en el sitio de cada marca.' : 'Affiliate links: we may receive a commission for purchases made through these links. Purchases take place on each brand’s website.'}</p>
  </section>;
}
