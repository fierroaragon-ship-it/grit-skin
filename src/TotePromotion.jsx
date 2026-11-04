import React from 'react';
import PartnerImage from './PartnerImage.jsx';
import { totePromotion } from './data/stylePartners.js';

export default function TotePromotion({ lang }) {
  const spanish = lang === 'es';
  return <div className="lacoste-tote" aria-label={spanish ? 'Lacoste · Tote Bag regalo' : 'Lacoste · Tote Bag gift'}>
    <PartnerImage {...totePromotion} alt={spanish ? 'Banner oficial Lacoste: tote bag chica de regalo en compras desde $4,500' : 'Official Lacoste banner: small tote bag gift with purchases from $4,500'} fallbackText={spanish ? 'Ver Tote Bag regalo en Lacoste' : 'View Tote Bag gift at Lacoste'} />
    <p>{spanish ? 'Tote bag chica de regalo en compras desde $4,500 en Nueva Colección.' : 'Small tote bag gift with purchases from $4,500 in the New Collection.'} <a href={totePromotion.conditions} target="_blank" rel="noopener noreferrer">{spanish ? 'Consulta vigencia, disponibilidad y condiciones en Lacoste.' : 'Check dates, availability and terms at Lacoste.'}</a></p>
  </div>;
}
