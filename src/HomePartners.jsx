import React, { useState } from 'react';
import useLacosteSchedule from './useLacosteSchedule.js';
import { stylePartners } from './data/stylePartners.js';

export default function HomePartners({ lang, search }) {
  const { active, simulated } = useLacosteSchedule(search);
  const [failed, setFailed] = useState({});
  const [lacosteLoaded, setLacosteLoaded] = useState(false);
  const [imageAttempt, setImageAttempt] = useState(0);
  const spanish = lang === 'es';
  const adidas = stylePartners[0];
  const lacosteUrl = 'https://www.awin1.com/cread.php?s=4969749&v=32585&q=606120&r=3132227';
  const lacosteImage = 'https://www.awin1.com/cshow.php?s=4969749&v=32585&q=606120&r=3132227';
  const promotion = spanish ? 'Lacoste · Singles’ Day · Del 6 al 12 de noviembre de 2026' : 'Lacoste · Singles’ Day · November 6–12, 2026';
  return <section className="home-partners" id="marcas-inicio" aria-label={spanish ? 'Estilo y accesorios' : 'Style and accessories'}>
    {active && <div className="home-lacoste">
      <a href={lacosteUrl} target="_blank" rel="sponsored noopener noreferrer" aria-label={promotion}>
        {failed.lacoste ? <span className="text-link">{spanish ? 'Ver promoción en Lacoste' : 'View promotion on Lacoste'} ↗</span> : <img src={lacosteImage} alt={promotion} width="728" height="90" key={imageAttempt} onLoad={() => setLacosteLoaded(true)} onError={() => setFailed(value => ({ ...value, lacoste: true }))} />}
      </a>
      {failed.lacoste && <button type="button" className="text-link home-banner-retry" onClick={() => { setFailed(value => ({ ...value, lacoste: false })); setLacosteLoaded(false); setImageAttempt(value => value + 1); }}>{spanish ? 'Reintentar cargar banner' : 'Retry loading banner'}</button>}
    </div>}
    <div className="home-adidas">
      {!failed.adidas && <a className="home-adidas-logo" href={adidas.url} target="_blank" rel="sponsored noopener noreferrer"><img src={adidas.image} alt={spanish ? 'Logo oficial de Adidas' : 'Official Adidas logo'} width="622" height="391" loading="lazy" onError={() => setFailed(value => ({ ...value, adidas: true }))} /></a>}
      <h2>Adidas</h2>
      <a className="button primary" href={adidas.url} target="_blank" rel="sponsored noopener noreferrer">{spanish ? 'Explorar Adidas' : 'Explore Adidas'} <span aria-hidden="true">↗</span></a>
    </div>
    <p className="home-partners-disclosure">{spanish ? 'Enlaces de afiliado: podemos recibir una comisión por las compras realizadas a través de estos enlaces. La compra se realiza en el sitio de cada marca.' : 'Affiliate links: we may receive a commission for purchases made through these links. Purchases take place on each brand’s website.'}</p>
    {import.meta.env.DEV && simulated !== null && <p className="style-preview" role="status">{spanish ? 'Vista de desarrollo · Fecha simulada (America/Mexico_City): ' : 'Development preview · Simulated date (America/Mexico_City): '}{new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'long', timeStyle: 'short' }).format(simulated)} · Lacoste: {active ? 'activo' : 'fuera de vigencia'}{active && (failed.lacoste ? ' · No se pudo cargar la imagen de Awin; se muestra el enlace alternativo.' : lacosteLoaded ? ' · Banner 4969749 cargado.' : ' · Cargando banner 4969749 desde Awin…')}</p>}
  </section>;
}
