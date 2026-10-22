import React, { useEffect, useRef, useState } from 'react';
import { categories, products, host, availableNeeds, filterProducts, externalUrl, resolvePage } from './data/catalog.js';

const texts = {
  es: { shop: 'Tienda', guides: 'Rutinas y guías', aboutPage: 'Sobre Gritskin', home: 'Inicio', host: 'Hamburgueso y sus consejos', menu: 'Abrir menú', close: 'Cerrar menú', eyebrow: 'GRIT SKIN · PARA LA VIDA REAL', title: 'Cuidado real.', intro: 'Cuidado personal, esenciales y hallazgos prácticos para hombres que viven a su manera. Un lugar para descubrir. Tú eliges dónde comprar.', explore: 'Explorar categorías', meet: 'Conoce a Hamburgueso', categories: 'Encuentra lo que va contigo.', categoryIntro: 'Cuatro formas de cuidar de ti y simplificar tu día.', selection: 'EL CATÁLOGO GRIT', catalog: 'Explora la selección', search: 'Buscar productos', placeholder: 'Nombre, característica o tienda…', all: 'Todas las categorías', filter: 'Categoría', preparing: 'Selección en preparación', preparingText: 'Estamos preparando el catálogo. Aquí encontrarás productos y enlaces confirmados, con información clara para elegir a tu ritmo.', noResults: 'No encontramos coincidencias', noResultsText: 'Prueba con otra búsqueda o cambia la categoría.', reset: 'Limpiar filtros', results: 'productos', affiliate: 'Transparencia ante todo', notice: 'Este sitio utiliza enlaces de afiliados. Si compras a través de ellos, Gritskin puede recibir una comisión sin costo adicional para ti. La compra, el precio y la disponibilidad se consultan en la tienda de destino.', footer: 'Cuidado real. Elecciones con criterio.', external: 'Compras directamente en la tienda de destino.', hostLabel: 'TU ANFITRIÓN', welcome: 'Soy Hamburgueso. Ponte cómodo.', hostIntro: 'Aquí venimos a cuidarnos sin complicarnos. Te acompaño a explorar el catálogo y comparto ideas breves para el día a día. El buen humor viene incluido.', hostQuote: '“Tu rutina puede ser corta. La lista de excusas, también.”', tipsTitle: 'Un poco de cuidado. Cero drama.', tips: [['Empieza sencillo', 'Una rutina que puedes mantener le gana a diez pasos que abandonas el lunes.'], ['Compra con una razón', 'Antes de abrir otro enlace, piensa qué necesitas. Tu cajón de cosas olvidadas te lo agradecerá.'], ['Lee antes de elegir', 'Revisa características, instrucciones y condiciones en la tienda. El botón no se va a escapar.']], back: 'Volver al inicio', missing: 'Esta página no está disponible', missingText: 'Puedes seguir explorando las categorías de Gritskin.', productMissing: 'Producto no disponible', productMissingText: 'Este producto no forma parte de la selección confirmada. Explora las categorías para conocer el estado del catálogo.', view: 'Ver producto', offer: 'Ver oferta', at: 'en', details: 'Características', destination: 'Tienda de destino', noLink: 'Enlace de compra en preparación', noPhoto: 'Fotografía pendiente', hostPhoto: 'El retrato de Hamburgueso llegará pronto.', about: 'Hecho para días de verdad.', aboutText: 'Gritskin nace de la vida entre obra, logística y oficina. El cuidado personal también tiene lugar en los días largos: con información sencilla y decisiones propias.' },
  en: { shop: 'Shop', guides: 'Routines & guides', aboutPage: 'About Gritskin', home: 'Home', host: 'Hamburgueso & his tips', menu: 'Open menu', close: 'Close menu', eyebrow: 'GRIT SKIN · FOR REAL LIFE', title: 'Real care.', intro: 'Personal care, essentials and practical finds for men living life their way. A place to discover. You choose where to shop.', explore: 'Explore categories', meet: 'Meet Hamburgueso', categories: 'Find what fits your life.', categoryIntro: 'Four ways to care for yourself and simplify your day.', selection: 'THE GRIT CATALOG', catalog: 'Explore the selection', search: 'Search products', placeholder: 'Name, feature or store…', all: 'All categories', filter: 'Category', preparing: 'Selection in progress', preparingText: 'We’re preparing the catalog. You’ll find confirmed products and links here, with clear information to help you choose at your own pace.', noResults: 'No matches found', noResultsText: 'Try another search or change the category.', reset: 'Clear filters', results: 'products', affiliate: 'Transparency comes first', notice: 'This site uses affiliate links. If you buy through them, Gritskin may earn a commission at no additional cost to you. Check the destination store for purchases, pricing and availability.', footer: 'Real care. Thoughtful choices.', external: 'You buy directly from the destination store.', hostLabel: 'YOUR HOST', welcome: 'I’m Hamburgueso. Make yourself at home.', hostIntro: 'We’re here to take care of ourselves without overcomplicating things. I’ll help you explore the catalog and share quick ideas for everyday life. Good humor included.', hostQuote: '“Your routine can be short. Your list of excuses can be, too.”', tipsTitle: 'A little care. Zero drama.', tips: [['Keep it simple', 'A routine you can keep beats ten steps you give up on Monday.'], ['Shop with a reason', 'Before opening another link, think about what you need. Your drawer of forgotten things will thank you.'], ['Read before choosing', 'Check features, instructions and store terms. The button isn’t going anywhere.']], back: 'Back to home', missing: 'This page is unavailable', missingText: 'Keep exploring the Gritskin categories.', productMissing: 'Product unavailable', productMissingText: 'This product is not part of the confirmed selection. Explore the categories to see the catalog’s status.', view: 'View product', offer: 'View offer', at: 'at', details: 'Features', destination: 'Destination store', noLink: 'Purchase link in preparation', noPhoto: 'Photo pending', hostPhoto: 'Hamburgueso’s portrait is coming soon.', about: 'Made for real days.', aboutText: 'Gritskin comes from life across construction, logistics and the office. Personal care belongs in long days, too: with simple information and choices of your own.' }
};

function Link({ href, children, ...props }) {
  return <a href={href} {...props} onClick={event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (href !== location.pathname + location.search) { history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate')); }
  }}>{children}</a>;
}
function Header({ lang, setLang, page, path, t }) {
  const [menu, setMenu] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const headerRef = useRef(null);
  const shopRef = useRef(null);
  const shopButton = useRef(null);
  const menuButton = useRef(null);
  useEffect(() => { setMenu(false); setShopOpen(false); }, [path]);
  useEffect(() => {
    const outside = event => {
      if (!headerRef.current?.contains(event.target)) { setMenu(false); setShopOpen(false); }
      else if (!shopRef.current?.contains(event.target)) setShopOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);
  function escape(event) {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (shopOpen) { setShopOpen(false); shopButton.current?.focus(); }
    else if (menu) { setMenu(false); menuButton.current?.focus(); }
  }
  function shopKeys(event) {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    setShopOpen(true);
    requestAnimationFrame(() => {
      const links = shopRef.current?.querySelectorAll('a');
      (event.key === 'ArrowUp' ? links?.[links.length - 1] : links?.[0])?.focus();
    });
  }
  return <header ref={headerRef} className="header" onKeyDown={escape} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) { setMenu(false); setShopOpen(false); }
  }}>
    <Link href="/" className="brand" aria-label={lang === 'es' ? 'Gritskin · Inicio' : 'Gritskin · Home'}><img src="/images/grit-logo-white.png" alt="Grit Skin" width="1431" height="1099" /></Link>
    <button ref={menuButton} className="menu-button" aria-expanded={menu} aria-controls="main-nav" aria-label={menu ? t.close : t.menu} onClick={() => { setMenu(!menu); setShopOpen(false); }}>{menu ? '✕' : '☰'}</button>
    <nav id="main-nav" className={menu ? 'nav open' : 'nav'} aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'} onClick={event => {
      if (event.target.closest('a')) { setMenu(false); setShopOpen(false); }
    }}>
      <div className="shop-disclosure" ref={shopRef} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setShopOpen(false);
      }}>
        <button ref={shopButton} className="shop-toggle" aria-expanded={shopOpen} aria-controls="shop-links" data-active={page.type === 'shop' || page.type === 'category' || page.type === 'product' ? 'true' : undefined} onClick={() => setShopOpen(!shopOpen)} onKeyDown={shopKeys}>{t.shop}<span aria-hidden="true">{shopOpen ? '−' : '+'}</span></button>
        <div id="shop-links" className="shop-links" hidden={!shopOpen}>
          <Link href="/tienda" aria-current={page.type === 'shop' ? 'page' : undefined}>{t.catalog} <span aria-hidden="true">↗</span></Link>{categories.map(category => <Link key={category.id} href={`/${category.id}`} aria-current={page.category?.id === category.id ? 'page' : undefined}><span>{category.name}</span><span aria-hidden="true">↗</span></Link>)}
        </div>
      </div>
      <Link href="/rutinas-y-guias" aria-current={page.type === 'guides' ? 'page' : undefined}>{t.guides}</Link>
      <Link href="/hamburgueso" aria-current={page.type === 'host' ? 'page' : undefined}>Hamburgueso</Link>
    </nav>
    <div className="languages" aria-label={lang === 'es' ? 'Idioma' : 'Language'}>{['es', 'en'].map(language => <button key={language} lang={language} aria-label={language === 'es' ? 'Español' : 'English'} aria-pressed={lang === language} onClick={() => setLang(language)}>{language.toUpperCase()}</button>)}</div>
  </header>;
}
function MotionRibbons({ lang }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener?.('change', update);
    return () => preference.removeEventListener?.('change', update);
  }, []);
  const messages = lang === 'es'
    ? ['Cuidado real.', 'A tu manera.', 'Menos drama. Más cuidado.', 'Hamburgueso te acompaña.']
    : ['Real care.', 'Your way.', 'Less drama. More care.', 'Hamburgueso is here to help.'];
  const rows = [categories.map(category => category.name), messages];
  return <section className={`motion-ribbons${paused || reduced ? ' is-paused' : ''}`} aria-label={lang === 'es' ? 'El universo Gritskin' : 'The Gritskin universe'}>
    <div className="ribbon-controls"><span>{lang === 'es' ? 'GRIT SKIN · CUIDADO EN MOVIMIENTO' : 'GRIT SKIN · CARE IN MOTION'}</span><button type="button" className="ribbon-pause" aria-controls="grit-ribbons" aria-pressed={paused || reduced} disabled={reduced} onClick={() => setPaused(value => !value)}>{reduced ? (lang === 'es' ? 'Movimiento reducido activo' : 'Reduced motion enabled') : paused ? (lang === 'es' ? 'Reanudar cintas' : 'Resume ribbons') : (lang === 'es' ? 'Pausar cintas' : 'Pause ribbons')}</button></div>
    <p className="sr-only">{rows.flat().join(' · ')}</p>
    <div id="grit-ribbons" className="ribbon-stage" aria-hidden="true">{rows.map((items, row) => <div key={row} className={`ribbon-band ribbon-band-${row}`}><div className="ribbon-track">{[0, 1].map(copy => <div className="ribbon-group" key={copy}>{items.map(item => <React.Fragment key={item}><span className="ribbon-word">{item}</span><span className="ribbon-mark">✳</span></React.Fragment>)}<img className="ribbon-logo" src={row === 0 ? '/images/grit-logo-black.svg' : '/images/grit-logo-white.png'} alt="" width="100" height="77" /><span className="ribbon-mark">✳</span></div>)}</div></div>)}</div>
  </section>;
}
function CategoryBlocks({ lang }) {
  const grid = useRef(null);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('category-enter');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    grid.current?.querySelectorAll('.category-visual-card').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  return <div ref={grid} className="category-grid category-visual-grid">{categories.map(category => <Link key={category.id} href={`/${category.id}`} className="category-card category-visual-card">
    <div className="category-visual">{category.image ? <Photo src={category.image} alt={category.name} loading="lazy" /> : <><span className="category-display-number" aria-hidden="true">{category.number}</span><span className="category-image-pending">{lang === 'es' ? 'Fotografía de categoría pendiente' : 'Category photograph pending'}</span></>}</div>
    <div className="category-card-copy"><span className="kicker">GRIT SKIN / {category.number}</span><h3>{category.name}</h3><p>{category.description[lang]}</p><span className="category-action">{lang === 'es' ? 'Explorar categoría' : 'Explore category'} <span aria-hidden="true">↗</span></span></div>
  </Link>)}</div>;
}
function Photo({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return src && !failed ? <img src={src} alt={alt} onError={() => setFailed(true)} {...props} /> : <div className="photo-placeholder" role="img" aria-label={alt}>{alt}</div>;
}
function StoreLink({ product, t }) {
  const href = externalUrl(product.url);
  return href ? <a className="button primary" href={href} target="_blank" rel="sponsored noopener noreferrer">{product.cta === 'offer' ? t.offer : t.view} {t.at} {product.store} <span aria-hidden="true">↗</span></a> : <p className="muted">{t.noLink}</p>;
}
function Catalog({ lang, t, category, search }) {
  const params = new URLSearchParams(search);
  const query = params.get('q') || '';
  const selected = category?.id || params.get('category') || '';
  const needs = availableNeeds(products, selected);
  const need = params.get('need') || '';
  const shown = filterProducts(products, { query, category: selected, need }, lang);
  function update(key, value) {
    const next = new URLSearchParams(location.search);
    value ? next.set(key, value) : next.delete(key);
    if (key === 'category') next.delete('need');
    history.replaceState({}, '', location.pathname + (next.size ? `?${next}` : ''));
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  function reset() { history.replaceState({}, '', location.pathname); window.dispatchEvent(new PopStateEvent('popstate')); }
  return <section className="catalog section" id="catalogo" aria-labelledby="catalog-title">
    <div className="section-top"><div><p className="kicker">{t.selection}</p><h2 id="catalog-title">{category?.name || t.catalog}</h2></div><span className="count" aria-live="polite">{shown.length} {t.results}</span></div>
    {category && <p className="category-description">{category.description[lang]}</p>}
    {needs.length > 0 && <div className="needs"><p className="filter-heading">{lang === 'es' ? 'Explora por necesidad' : 'Explore by need'}</p><div className="need-options"><button type="button" aria-pressed={!need} onClick={() => update('need', '')}>{lang === 'es' ? 'Todas' : 'All'}</button>{needs.map(item => <button type="button" key={item.id} aria-pressed={need === item.id} onClick={() => update('need', item.id)}>{item.label[lang]}</button>)}</div></div>}
    <form className="filters" role="search" onSubmit={e => e.preventDefault()}><label>{t.search}<div className="search-field"><span aria-hidden="true">⌕</span><input type="search" value={query} placeholder={t.placeholder} onChange={e => update('q', e.target.value)} /></div></label><label>{t.filter}<select value={selected} onChange={e => update('category', e.target.value)} disabled={Boolean(category)}><option value="">{t.all}</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label></form>
    {shown.length ? <div className="product-grid">{shown.map(p => <article className="product-card" key={p.slug}><Link href={`/producto/${p.slug}`}><Photo src={p.photos[0]?.src} alt={p.photos[0]?.alt[lang] || t.noPhoto} /><p className="kicker">{categories.find(c => c.id === p.category)?.name}</p><h3>{p.name[lang]}</h3></Link><p>{p.description[lang]}</p><Link className="button outline" href={`/producto/${p.slug}`}>{t.view} →</Link><StoreLink product={p} t={t} /></article>)}</div> : <div className="empty-state"><span className="empty-icon" aria-hidden="true">◇</span><p className="kicker">GRIT SKIN</p><h3>{products.length ? t.noResults : t.preparing}</h3><p>{products.length ? t.noResultsText : t.preparingText}</p>{(query || need || (!category && selected)) && <button className="button outline" onClick={reset}>{t.reset}</button>}</div>}
  </section>;
}
function RoutineGuide({ lang }) {
  const steps = lang === 'es'
    ? [['Una cosa a la vez', 'Empieza por lo que quieres cuidar. Una rutina no necesita resolverlo todo de golpe.'], ['Hazle espacio en tu día', 'Elige un momento que te funcione. La mejor rutina es la que sí recuerdas.'], ['Elige con información', 'Cuando llegue la selección, revisa las características y las instrucciones en cada tienda.']]
    : [['One thing at a time', 'Start with what you want to care for. A routine doesn’t have to solve everything at once.'], ['Make room in your day', 'Choose a time that works for you. The best routine is one you actually remember.'], ['Choose with information', 'When the selection arrives, check the features and instructions at each store.']];
  return <section className="section routine-guide"><div className="routine-heading"><HostPose pose="guide" /><div className="routine-copy"><p className="kicker">{lang === 'es' ? 'UNA PAUSA CON HAMBURGUESO' : 'A MOMENT WITH HAMBURGUESO'}</p><h2>{lang === 'es' ? 'Menos pasos. Más constancia.' : 'Fewer steps. More consistency.'}</h2><p className="routine-intro">{lang === 'es' ? 'Que el ‘ahorita empiezo’ no cumpla otro año' : 'Don’t let “I’ll start in a minute” turn another year older'}</p></div></div><div className="routine-steps">{steps.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>;
}
function HostPose({ pose }) {
  const image = host.poses?.[pose];
  return image ? <Photo src={image} className={`host-inline-image host-pose-${pose}`} alt="Hamburgueso" width="1122" height="1402" loading="lazy" decoding="async" /> : null;
}
function Welcome({ lang }) {
  return <aside className="host-welcome"><HostPose pose="welcome" /><div className="welcome-copy"><span className="welcome-label">HAMBURGUESO</span><p>{lang === 'es' ? 'La cara de lunes no tiene que durar toda la semana' : 'Your Monday face doesn’t have to last all week'}</p><Link href="/hamburgueso" className="text-link">{lang === 'es' ? 'Un consejo y seguimos' : 'A quick tip before you go'} <span aria-hidden="true">→</span></Link></div></aside>;
}
const categoryHostNotes = {
  'skin-care': { es: 'Tu piel ya trabaja contigo todo el día. Dale un poco de atención; no hace falta convertir el baño en laboratorio.', en: 'Your skin works with you all day. Give it a little attention; your bathroom doesn’t need to become a laboratory.' },
  grooming: { es: 'Barba, cabello y detalles: a tu manera. El espejo puede esperar cinco minutos; las prisas no peinan.', en: 'Beard, hair and the details: your way. The mirror can wait five minutes; rushing never fixed a hairstyle.' },
  'mens-essentials': { es: 'Lo esencial es lo que sí usas. Si lleva meses esperando su gran momento en un cajón, quizá no era tan esencial.', en: 'Essentials are things you actually use. If it’s been waiting in a drawer for months, it might not be so essential.' },
  'smart-finds': { es: 'Un buen hallazgo resuelve algo. Si necesita tres tutoriales para explicar para qué sirve, vamos con calma.', en: 'A good find solves something. If it needs three tutorials to explain what it does, let’s take our time.' },
};
function CategoryHost({ lang, category }) {
  return <aside className="host-note" aria-label={lang === 'es' ? 'Hamburgueso te acompaña' : 'Hamburgueso is here to help'}><HostPose pose={category.id === 'skin-care' ? 'skin-care' : 'category'} /><p className="kicker">{lang === 'es' ? 'HAMBURGUESO TE DA LA BIENVENIDA' : 'A WELCOME FROM HAMBURGUESO'}</p><p>{categoryHostNotes[category.id][lang]}</p></aside>;
}
function ProductHostTip({ lang }) {
  return <aside className="product-host-tip"><HostPose pose="product-tip" /><p className="kicker">{lang === 'es' ? 'UN CONSEJO DE HAMBURGUESO' : 'A TIP FROM HAMBURGUESO'}</p><p>{lang === 'es' ? 'Antes de dar el salto, revisa instrucciones, disponibilidad y condiciones en la tienda. Comparar también cuenta como cuidarte; comprar con prisa no da puntos extra.' : 'Before you jump, check instructions, availability and terms at the store. Comparing is part of taking care of yourself; rushing earns no extra points.'}</p></aside>;
}
function About({ lang, t }) {
  return <section className="section about-page" aria-labelledby="about-title">
    <div className="about-heading"><p className="kicker">{t.aboutPage}</p><h1 id="about-title">{lang === 'es' ? 'Creado desde la experiencia.' : 'Created from experience.'}</h1></div>
    <div className="about-grid"><figure className="founder-portrait"><Photo src="/images/miguel-fierro-founder.jpeg" alt={lang === 'es' ? 'Miguel Fierro, fundador de Gritskin' : 'Miguel Fierro, founder of Gritskin'} /><figcaption>Miguel Fierro · {lang === 'es' ? 'Fundador de Gritskin' : 'Founder of Gritskin'}</figcaption></figure><div className="founder-story"><p className="kicker">{lang === 'es' ? 'UNA HISTORIA PERSONAL' : 'A PERSONAL STORY'}</p><h2>{t.about}</h2><p>{lang === 'es' ? 'Soy Miguel Fierro, fundador de Gritskin. He estado en ambientes de construcción, logística y oficina en Canadá, México, Sudamérica y algunas partes de Europa. Conozco de primera mano cómo el sol, el polvo, el frío, el sudor y el estrés forman parte del día a día de quienes trabajan.' : 'I’m Miguel Fierro, founder of Gritskin. I’ve experienced construction, logistics and office environments in Canada, Mexico, South America and parts of Europe. I know firsthand how sun, dust, cold, sweat and stress are part of everyday working life.'}</p><p>{t.aboutText}</p><p>{lang === 'es' ? 'Gritskin busca simplificar el cuidado personal: información clara, elecciones propias y productos confirmados que puedas consultar directamente en la tienda de destino.' : 'Gritskin aims to simplify personal care: clear information, choices of your own and confirmed products you can explore directly at the destination store.'}</p></div></div>
  </section>;
}
function Host({ t }) {
  const spanish = t.home === 'Inicio';
  return <section className="host-section section host-full"><div className="host-portrait"><Photo src={host.image} alt={spanish ? 'Hamburgueso presentando' : 'Hamburgueso presenting'} width="1122" height="1402" decoding="async" /></div><div className="host-copy"><p className="kicker">{t.hostLabel}</p><h1>{spanish ? 'Hamburgueso pa’ los compas.' : 'Hamburgueso, for the amigos.'}</h1><p>{spanish ? 'Las piernas venían en tamaño de muestra. El buen cotorreo viene de familia.' : 'The legs came in sample size. The good banter runs in the family.'}</p><p>{spanish ? 'Pásale, que aquí vamos a hablar de cuidarnos, encontrar cosas que sí sirvan y comprar con tantito criterio. Que todos tenemos por ahí una compra que mejor ni presumimos.' : 'Come on in. Let’s talk about taking care of ourselves, finding things that actually help and shopping with a little good sense. We all have a purchase we’d rather not brag about.'}</p><Link href="/rutinas-y-guias" className="button primary">{spanish ? 'Órale, ¿por dónde empezamos? →' : 'Alright, where do we start? →'}</Link></div></section>;
}
export default function App() {
  const [url, setUrl] = useState(() => location.pathname + location.search);
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('grit-language') === 'en' ? 'en' : 'es'; } catch { return 'es'; } });
  const t = texts[lang];
  const [path, search = ''] = url.split('?');
  const page = resolvePage(path);
  useEffect(() => { const handle = () => setUrl(location.pathname + location.search); window.addEventListener('popstate', handle); return () => window.removeEventListener('popstate', handle); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [path]);
  useEffect(() => { document.documentElement.lang = lang; try { localStorage.setItem('grit-language', lang); } catch {} }, [lang]);
  const product = page.type === 'product' ? products.find(p => p.slug === page.slug) : null;
  useEffect(() => { document.title = `${page.category?.name || (page.type === 'shop' ? t.shop : page.type === 'about' ? t.aboutPage : page.type === 'guides' ? t.guides : page.type === 'host' ? 'Hamburgueso' : product?.name[lang] || t.home)} | Gritskin`; }, [path, lang, product]);
  return <><a className="skip-link" href="#contenido">{lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a><div className="announcement">{lang === 'es' ? 'Cuidado personal. Esenciales. Buenas decisiones.' : 'Personal care. Essentials. Thoughtful choices.'}</div><Header lang={lang} setLang={setLang} page={page} path={path} t={t} />
    <main id="contenido">
      {page.type === 'home' && <><section className="hero"><picture className="hero-picture"><source type="image/webp" srcSet="/images/grit-hero-nine-friends-workbench.webp" /><img className="hero-photo" loading="eager" decoding="async" fetchPriority="high" width="2100" height="749" src="/images/grit-hero-nine-friends-workbench.png" alt={lang === 'es' ? 'Nueve amigos reunidos en un taller' : 'Nine friends together in a workshop'} /></picture><div className="hero-shade" aria-hidden="true" /><div className="hero-copy"><p className="kicker">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p><div className="hero-actions"><a href="#categorias" className="button primary">{t.explore} <span aria-hidden="true">↓</span></a><a href="#catalogo" className="button hero-secondary">{lang === 'es' ? 'Ver catálogo' : 'View catalog'} <span aria-hidden="true">→</span></a></div></div><span className="hero-caption">GRIT SKIN / EVERYDAY GRIT</span></section><MotionRibbons lang={lang} /><Welcome lang={lang} /><section className="section categories" id="categorias"><p className="kicker">{lang === 'es' ? 'ELIGE TU CAMINO' : 'CHOOSE YOUR WAY'}</p><h2>{t.categories}</h2><p className="muted">{t.categoryIntro}</p><CategoryBlocks lang={lang} /></section><Catalog t={t} lang={lang} search={search} /></>}
      {page.type === 'shop' && <><section className="section shop-intro"><HostPose pose="shop" /><div><p className="kicker">{t.selection}</p><h1>{t.shop}</h1><p>{lang === 'es' ? 'Encuentra lo que va contigo. Explora a tu ritmo y elige con información.' : 'Find what fits your life. Explore at your pace and make informed choices.'}</p><a className="text-link" href="#catalogo">{t.catalog} ↓</a></div></section><Catalog t={t} lang={lang} search={search} /></>}
      {page.type === 'category' && <><div className={`page-intro section ${page.category.id === 'skin-care' ? 'category-intro-preview' : ''}`}><Link className="text-link" href="/">{t.home} /</Link><p className="kicker">GRIT SKIN · {page.category.number}</p><h1>{page.category.name}</h1><p>{page.category.description[lang]}</p><CategoryHost lang={lang} category={page.category} /></div><Catalog t={t} lang={lang} category={page.category} search={search} /></>}
      {page.type === 'about' && <About lang={lang} t={t} />}
      {page.type === 'host' && <><Host t={t} /><section className="section host-guide-link"><p className="kicker">HAMBURGUESO</p><h2>{lang === 'es' ? 'Un consejo y seguimos.' : 'A quick tip before you go.'}</h2><Link className="button primary" href="/rutinas-y-guias">{t.guides} →</Link></section></>}
      {page.type === 'guides' && <><section className="section page-intro"><p className="kicker">{lang === 'es' ? 'APRENDE CON HAMBURGUESO' : 'LEARN WITH HAMBURGUESO'}</p><h1>{t.guides}</h1><p>{lang === 'es' ? 'Ideas sencillas para cuidarte, comparar y elegir a tu ritmo.' : 'Simple ideas to care for yourself, compare and choose at your own pace.'}</p></section><RoutineGuide lang={lang} /><section className="section tips"><p className="kicker">HAMBURGUESO</p><h2>{t.tipsTitle}</h2><div className="tips-grid">{t.tips.map(([title, text], i) => <article key={title}><span className="category-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="section manuals-pending"><p className="kicker">{lang === 'es' ? 'APRENDER A TU RITMO' : 'LEARN AT YOUR OWN PACE'}</p><h2>{lang === 'es' ? 'Manuales en preparación' : 'Manuals in preparation'}</h2><p>{lang === 'es' ? 'Todavía no hay manuales de Hotmart confirmados. Los incorporaremos aquí cuando contemos con el contenido y los enlaces verificados.' : 'No Hotmart manuals have been confirmed yet. We’ll add them here once the content and links have been verified.'}</p><p className="muted">{lang === 'es' ? 'Hamburgueso dice: primero leemos la letra pequeña; después hacemos espacio en la biblioteca.' : 'Hamburgueso says: first we read the fine print; then we make room on the bookshelf.'}</p></section></>}
      {page.type === 'product' && product && <section className="section product-detail"><Link className="text-link" href={`/${product.category}`}>← {categories.find(c => c.id === product.category)?.name}</Link><div className="detail-grid"><div className="product-photos">{product.photos.length ? product.photos.map(photo => <Photo key={photo.src} src={photo.src} alt={photo.alt[lang]} />) : <Photo alt={t.noPhoto} />}</div><div><p className="kicker">{t.selection}</p><h1>{product.name[lang]}</h1><h2>{lang === 'es' ? 'De un vistazo' : 'At a glance'}</h2><p>{product.description[lang]}</p><h2>{t.details}</h2><ul>{product.features[lang].map(feature => <li key={feature}>{feature}</li>)}</ul><p>{t.destination}: <strong>{product.store}</strong></p><StoreLink product={product} t={t} /><p className="muted">{t.external}</p><ProductHostTip lang={lang} /></div></div></section>}
      {(page.type === 'missing' || (page.type === 'product' && !product)) && <section className="section not-found"><p className="kicker">GRIT SKIN</p><h1>{page.type === 'product' ? t.productMissing : t.missing}</h1><p>{page.type === 'product' ? t.productMissingText : t.missingText}</p><Link href="/" className="button primary">{t.back} →</Link></section>}
    </main><aside className="affiliate section"><span aria-hidden="true">↗</span><div><p className="kicker">{lang === 'es' ? 'HAMBURGUESO TE RECUERDA' : 'A REMINDER FROM HAMBURGUESO'}</p><h2>{t.affiliate}</h2><p>{t.notice}</p></div></aside><footer className="footer section"><div><Link href="/" className="footer-brand" aria-label={lang === 'es' ? 'Gritskin · Inicio' : 'Gritskin · Home'}><img src="/images/grit-logo-white.png" alt="Grit Skin" width="1431" height="1099" loading="lazy" /></Link><p>{t.footer}</p></div><div className="footer-links"><Link href="/rutinas-y-guias">{t.guides}</Link><Link href="/sobre-gritskin" aria-current={page.type === 'about' ? 'page' : undefined}>{t.aboutPage}</Link><Link href="/hamburgueso">{t.host}</Link>{categories.map(c => <Link key={c.id} href={`/${c.id}`}>{c.name}</Link>)}</div><p className="copyright">© {new Date().getFullYear()} Gritskin</p></footer></>;
}
