import React, { useState } from 'react';

export function nextImageState(state, fallback) {
  return state === 'remote' && fallback ? 'local' : 'failed';
}

// Shared view keeps image failures out of the layout, including their dimensions.
export function PartnerImageView({ state, image, fallback, url, alt, width, height, className, fallbackText, onError }) {
  if (state === 'failed') return fallbackText ? <a className="text-link partner-image-fallback" href={url} target="_blank" rel="sponsored noopener noreferrer">{fallbackText} ↗</a> : null;
  return <a className={className} href={url} target="_blank" rel="sponsored noopener noreferrer" aria-label={alt}><img src={state === 'local' ? fallback : image} alt={alt} width={width} height={height} loading="lazy" onError={onError} /></a>;
}

export default function PartnerImage(props) {
  const [state, setState] = useState('remote');
  return <><PartnerImageView {...props} state={state} onError={() => setState(value => nextImageState(value, props.fallback))} />{state === 'failed' && props.retryLabel && <button type="button" className="text-link home-banner-retry" onClick={() => setState('remote')}>{props.retryLabel}</button>}</>;
}
