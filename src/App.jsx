import React, { useState } from "react";

const imagePaths = {
  hero: "/images/grit-hero-workers.png",
  founder: "/images/miguel-fierro-founder.jpeg",
  logo: "/images/grit-logo.png"
};

const copy = {
  es: {
    nav: {
      inicio: "Inicio",
      rutinas: "Rutinas",
      problemas: "Problemas",
      videos: "Videos",
      reviews: "Reviews",
      comunidad: "Comunidad",
      cta: "Encuentra tu rutina"
    },
    hero: {
      eyebrow: "Piel grit. Vida real.",
      title1: "Cuidado real",
      title2: "para piel de trabajo.",
      text:
        "Para quienes viven entre construcción, logística, oficina, sol, polvo, sudor y clima extremo. Grit Skin nace para hombres que trabajan duro y también quieren cuidar su piel.",
      button1: "Ver rutinas",
      button2: "Explorar productos",
      quote: "Aunque tengamos cuero en vez de piel, también merece cuidárnosla.",
      foundedBy: "Fundado por",
      founder: "Miguel Fierro",
      founderRole: "Fundador de Grit Skin"
    },
    problems: {
      kicker: "Tu piel, tu entorno, tu rutina",
      title: "Elige el problema principal y encuentra lo que tu piel necesita.",
      cards: [
        {
          icon: "◒",
          title: "Piel grasa",
          text: "Para brillo, sudor y sensación pesada durante el día."
        },
        {
          icon: "⌁",
          title: "Después del rasurado",
          text: "Para ardor, irritación y granitos por rastrillo."
        },
        {
          icon: "☀",
          title: "Sol y obra",
          text: "Para quienes trabajan bajo sol, polvo y calor."
        },
        {
          icon: "▭",
          title: "Oficina y estrés",
          text: "Para piel cansada, opaca y con mala cara."
        },
        {
          icon: "❄",
          title: "Frío y resequedad",
          text: "Para climas duros, viento y piel tirante."
        },
        {
          icon: "✣",
          title: "Sudor y polvo",
          text: "Para jornadas largas, logística, manejo y trabajo físico."
        }
      ]
    },
    founder: {
      label: "Nuestra historia",
      title: "Creado desde la experiencia.",
      p1:
        "Soy Miguel Fierro, fundador de Grit Skin. He estado en ambientes de construcción, logística y oficina en Canadá, México, Sudamérica y algunas partes de Europa. Conozco de primera mano cómo el sol, el polvo, el frío, el sudor y el estrés afectan la piel del hombre que trabaja.",
      p2:
        "Grit Skin nace para simplificar el cuidado masculino con rutinas efectivas, productos confiables y educación real. Sin promesas vacías, sin complicaciones y sin hacer del cuidado personal algo ajeno al hombre.",
      trusts: [
        {
          icon: "★",
          title: "Experiencia real",
          text: "En obras, oficinas, logística y entornos de trabajo exigentes."
        },
        {
          icon: "◎",
          title: "Asesorado por profesionales",
          text: "Con apoyo de especialistas de belleza de Suiza, México y Colombia."
        },
        {
          icon: "◇",
          title: "Soluciones simples",
          text: "Rutinas prácticas para hombres reales y resultados visibles."
        },
        {
          icon: "▰",
          title: "Confianza y calidad",
          text: "Productos seleccionados por utilidad, experiencia y criterio."
        }
      ]
    },
    routines: {
      kicker: "Rutinas simples. Resultados reales.",
      title: "Empieza con tres pasos. Después ajustamos según tu piel.",
      button: "Ver productos",
      productLabel: "Producto afiliado",
      routines: [
        {
          number: "01",
          title: "Rutina esencial",
          description: "Lo básico para mantener tu piel limpia, hidratada y protegida.",
          steps: ["Limpia", "Hidrata", "Protege"],
          products: ["Limpiador facial", "Hidratante ligera", "Protector solar"]
        },
        {
          number: "02",
          title: "Rutina de recuperación",
          description: "Ideal después de jornadas intensas, rasurado, sol o polvo.",
          steps: ["Limpia", "Calma", "Hidrata"],
          products: ["Limpiador suave", "Tónico calmante", "Gel hidratante"]
        },
        {
          number: "03",
          title: "Rutina diaria",
          description: "Tu rutina rápida para el trabajo y la vida fuera de él.",
          steps: ["Limpia", "Hidrata", "Protege"],
          products: ["Limpiador diario", "Crema ligera", "Protector sin brillo"]
        }
      ]
    },
    videos: {
      kicker: "Videos para hombres que quieren mejorar su piel",
      title: "Espacios listos para YouTube Shorts, TikTok, Reels y Pinterest.",
      items: [
        {
          title: "Video 01",
          subtitle: "La verdad sobre el sol y tu piel",
          duration: "0:45"
        },
        {
          title: "Próximo Short",
          subtitle: "Rutina rápida antes del trabajo",
          duration: "0:30"
        },
        {
          title: "Rutina en 30 segundos",
          subtitle: "Simple, rápida y efectiva",
          duration: "0:30"
        },
        {
          title: "Después del trabajo",
          subtitle: "Lo que tu piel necesita al llegar a casa",
          duration: "0:30"
        }
      ]
    },
    articles: {
      kicker: "Aprende. Aplica. Mejora tu piel.",
      title: "Guías rápidas para vender con contenido, no con presión.",
      readMore: "Leer más →",
      items: [
        {
          tag: "Sol y trabajo",
          title: "Qué usar si trabajas bajo el sol",
          text: "Protege tu piel del sol, evita resequedad y reduce el aspecto cansado después de jornadas largas."
        },
        {
          tag: "Rasurado",
          title: "Cómo calmar la piel después del rasurado",
          text: "Evita ardor, irritación y granitos con una rutina sencilla antes y después del rastrillo."
        },
        {
          tag: "Rutina simple",
          title: "Cuidado facial para hombres que no quieren complicarse",
          text: "Tres pasos básicos para verte más limpio, fresco y cuidado sin usar diez productos."
        }
      ]
    },
    community: {
      kicker: "Únete a la comunidad Grit Skin",
      title: "Contenido real. Hombres reales. Rutinas reales."
    },
    footer: {
      text:
        "Grit Skin es para hombres que trabajan duro y quieren cuidar su piel sin complicarse. Rutinas simples, productos útiles y educación real.",
      nav: "Navegación",
      info: "Información",
      follow: "Síguenos",
      links: {
        about: "Sobre Grit Skin",
        contact: "Contacto",
        privacy: "Política de privacidad",
        terms: "Términos y condiciones"
      },
      rights: "© 2026 Grit Skin. Todos los derechos reservados.",
      affiliate:
        "Algunos enlaces podrán ser de afiliado. Recomendamos productos por utilidad, criterio y experiencia."
    }
  },
  en: {
    nav: {
      inicio: "Home",
      rutinas: "Routines",
      problemas: "Skin concerns",
      videos: "Videos",
      reviews: "Reviews",
      comunidad: "Community",
      cta: "Find your routine"
    },
    hero: {
      eyebrow: "Grit skin. Real life.",
      title1: "Real care",
      title2: "for working skin.",
      text:
        "For men who live between construction, logistics, office work, sun, dust, sweat, and harsh weather. Grit Skin was created for men who work hard and still want to take care of their skin.",
      button1: "See routines",
      button2: "Explore products",
      quote: "Even if our skin feels like leather, it still deserves care.",
      foundedBy: "Founded by",
      founder: "Miguel Fierro",
      founderRole: "Founder of Grit Skin"
    },
    problems: {
      kicker: "Your skin, your environment, your routine",
      title: "Choose your main concern and find what your skin needs.",
      cards: [
        {
          icon: "◒",
          title: "Oily skin",
          text: "For shine, sweat, and a heavy feeling throughout the day."
        },
        {
          icon: "⌁",
          title: "After shaving",
          text: "For razor burn, irritation, and post-shave bumps."
        },
        {
          icon: "☀",
          title: "Sun and worksite",
          text: "For men who work under sun, dust, and heat."
        },
        {
          icon: "▭",
          title: "Office and stress",
          text: "For tired, dull skin and a worn-out look."
        },
        {
          icon: "❄",
          title: "Cold and dryness",
          text: "For harsh climates, wind, and tight-feeling skin."
        },
        {
          icon: "✣",
          title: "Sweat and dust",
          text: "For long shifts, logistics, driving, and physical work."
        }
      ]
    },
    founder: {
      label: "Our story",
      title: "Built from experience.",
      p1:
        "I am Miguel Fierro, founder of Grit Skin. I have been in construction, logistics, and office environments across Canada, Mexico, South America, and parts of Europe. I know firsthand how sun, dust, cold, sweat, and stress affect the skin of men who work.",
      p2:
        "Grit Skin was created to simplify men’s skincare with effective routines, reliable products, and real education. No empty promises, no complications, and no making personal care feel foreign to men.",
      trusts: [
        {
          icon: "★",
          title: "Real experience",
          text: "Across worksites, offices, logistics, and demanding environments."
        },
        {
          icon: "◎",
          title: "Professionally advised",
          text: "Supported by beauty professionals from Switzerland, Mexico, and Colombia."
        },
        {
          icon: "◇",
          title: "Simple solutions",
          text: "Practical routines for real men and visible results."
        },
        {
          icon: "▰",
          title: "Trust and quality",
          text: "Products selected by usefulness, experience, and judgment."
        }
      ]
    },
    routines: {
      kicker: "Simple routines. Real results.",
      title: "Start with three steps. Then adjust based on your skin.",
      button: "See products",
      productLabel: "Affiliate product",
      routines: [
        {
          number: "01",
          title: "Essential routine",
          description: "The basics to keep your skin clean, hydrated, and protected.",
          steps: ["Cleanse", "Hydrate", "Protect"],
          products: ["Face cleanser", "Light moisturizer", "Sunscreen"]
        },
        {
          number: "02",
          title: "Recovery routine",
          description: "Ideal after intense shifts, shaving, sun exposure, or dust.",
          steps: ["Cleanse", "Calm", "Hydrate"],
          products: ["Gentle cleanser", "Calming toner", "Hydrating gel"]
        },
        {
          number: "03",
          title: "Daily routine",
          description: "Your quick routine for work and life outside of it.",
          steps: ["Cleanse", "Hydrate", "Protect"],
          products: ["Daily cleanser", "Light cream", "No-shine sunscreen"]
        }
      ]
    },
    videos: {
      kicker: "Videos for men who want better skin",
      title: "Slots ready for YouTube Shorts, TikTok, Reels, and Pinterest.",
      items: [
        {
          title: "Video 01",
          subtitle: "The truth about sun and your skin",
          duration: "0:45"
        },
        {
          title: "Next Short",
          subtitle: "Quick pre-work routine",
          duration: "0:30"
        },
        {
          title: "Routine in 30 seconds",
          subtitle: "Simple, fast, effective",
          duration: "0:30"
        },
        {
          title: "After work",
          subtitle: "What your skin needs when you get home",
          duration: "0:30"
        }
      ]
    },
    articles: {
      kicker: "Learn. Apply. Improve your skin.",
      title: "Quick guides that sell through content, not pressure.",
      readMore: "Read more →",
      items: [
        {
          tag: "Sun and work",
          title: "What to use if you work under the sun",
          text: "Protect your skin from sun exposure, avoid dryness, and reduce the tired look after long shifts."
        },
        {
          tag: "Shaving",
          title: "How to calm your skin after shaving",
          text: "Avoid burning, irritation, and bumps with a simple pre- and post-shave routine."
        },
        {
          tag: "Simple routine",
          title: "Skincare for men who do not want to overcomplicate it",
          text: "Three basic steps to look cleaner, fresher, and better cared for without using ten products."
        }
      ]
    },
    community: {
      kicker: "Join the Grit Skin community",
      title: "Real content. Real men. Real routines."
    },
    footer: {
      text:
        "Grit Skin is for men who work hard and want to care for their skin without overcomplicating it. Simple routines, useful products, and real education.",
      nav: "Navigation",
      info: "Information",
      follow: "Follow us",
      links: {
        about: "About Grit Skin",
        contact: "Contact",
        privacy: "Privacy policy",
        terms: "Terms and conditions"
      },
      rights: "© 2026 Grit Skin. All rights reserved.",
      affiliate:
        "Some links may be affiliate links. We recommend products based on usefulness, judgment, and experience."
    }
  }
};

const socials = [
  { name: "TikTok", handle: "@gritskin", link: "#" },
  { name: "Instagram", handle: "@gritskin", link: "#" },
  { name: "YouTube", handle: "/gritskin", link: "#" },
  { name: "Pinterest", handle: "/gritskin", link: "#" },
  { name: "Facebook", handle: "/gritskin", link: "#" }
];

function App() {
  const [lang, setLang] = useState("es");
  const t = copy[lang];

  return (
    <main className="site">
      <Header t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <ProblemSection t={t} />
      <FounderSection t={t} />
      <RoutinesSection t={t} />
      <VideosSection t={t} />
      <ArticlesSection t={t} />
      <CommunitySection t={t} />
      <Footer t={t} />
    </main>
  );
}

function Header({ t, lang, setLang }) {
  return (
    <header className="header">
      <a href="#inicio" className="brand" aria-label="Grit Skin inicio">
        <img
          src={imagePaths.logo}
          alt="Grit Skin"
          className="brandLogo"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span className="brandFallback">
          <strong>GRIT</strong>
          <em>Skin</em>
        </span>
      </a>

      <nav className="nav" aria-label="Navegación principal">
        <a href="#inicio">{t.nav.inicio}</a>
        <a href="#rutinas">{t.nav.rutinas}</a>
        <a href="#problemas">{t.nav.problemas}</a>
        <a href="#videos">{t.nav.videos}</a>
        <a href="#reviews">{t.nav.reviews}</a>
        <a href="#comunidad">{t.nav.comunidad}</a>
      </nav>

      <div className="headerActions">
        <div className="languageToggle" aria-label="Selector de idioma">
          <button
            type="button"
            className={lang === "es" ? "active" : ""}
            onClick={() => setLang("es")}
          >
            ES
          </button>
          <button
            type="button"
            className={lang === "en" ? "active" : ""}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>

        <a href="#rutinas" className="navButton">
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
}

function Hero({ t }) {
  return (
    <section id="inicio" className="hero">
      <div
        className="heroBackground"
        style={{ backgroundImage: `url(${imagePaths.hero})` }}
      />

      <div className="heroOverlay" />

      <div className="heroContent">
        <p className="eyebrow">{t.hero.eyebrow}</p>

        <h1>
          {t.hero.title1}
          <span>{t.hero.title2}</span>
        </h1>

        <p className="heroText">{t.hero.text}</p>

        <div className="heroActions">
          <a href="#rutinas" className="buttonPrimary">
            {t.hero.button1}
          </a>
          <a href="#reviews" className="buttonSecondary">
            {t.hero.button2}
          </a>
        </div>

        <div className="heroQuote">
          <span className="shieldIcon">◇</span>
          <p>{t.hero.quote}</p>
        </div>
      </div>

      <div className="heroBadge">
        <span className="badgeIcon">▱</span>
        <div>
          <small>{t.hero.foundedBy}</small>
          <strong>{t.hero.founder}</strong>
          <p>{t.hero.founderRole}</p>
        </div>
      </div>
    </section>
  );
}

function ProblemSection({ t }) {
  return (
    <section id="problemas" className="problems sectionDark">
      <div className="sectionHeader">
        <p className="sectionKicker">{t.problems.kicker}</p>
        <h2>{t.problems.title}</h2>
      </div>

      <div className="problemGrid">
        {t.problems.cards.map((card) => (
          <article className="problemCard" key={card.title}>
            <span className="problemIcon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FounderSection({ t }) {
  return (
    <section className="founder">
      <div className="founderImageWrap">
        <img
          src={imagePaths.founder}
          alt="Miguel Fierro, founder of Grit Skin"
          className="founderImage"
        />
      </div>

      <div className="founderText">
        <p className="smallLabel">{t.founder.label}</p>
        <h2>{t.founder.title}</h2>

        <p>{t.founder.p1}</p>
        <p>{t.founder.p2}</p>

        <div className="trustGrid">
          {t.founder.trusts.map((item) => (
            <div className="trustItem" key={item.title}>
              <span>{item.icon}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoutinesSection({ t }) {
  return (
    <section id="rutinas" className="routines sectionDark">
      <div className="sectionHeader">
        <p className="sectionKicker">{t.routines.kicker}</p>
        <h2>{t.routines.title}</h2>
      </div>

      <div className="routineGrid">
        {t.routines.routines.map((routine) => (
          <article className="routineCard" key={routine.title}>
            <div className="routineTop">
              <span>{routine.number}</span>
              <div>
                <h3>{routine.title}</h3>
                <p>{routine.description}</p>
              </div>
            </div>

            <div className="steps">
              {routine.steps.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="step">
                    <small>{index + 1}</small>
                    <strong>{step}</strong>
                  </div>
                  {index < routine.steps.length - 1 && <span className="arrow">›</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="productGrid">
              {routine.products.map((product, index) => (
                <a
                  className="productTile"
                  href="#"
                  key={product}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={`productShape productShape${index + 1}`} />
                  <strong>{product}</strong>
                  <small>{t.routines.productLabel}</small>
                  <span>$0.00</span>
                </a>
              ))}
            </div>

            <a href="#reviews" className="routineButton">
              {t.routines.button}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function VideosSection({ t }) {
  return (
    <section id="videos" className="videos sectionDark">
      <div className="sectionHeader">
        <p className="sectionKicker">{t.videos.kicker}</p>
        <h2>{t.videos.title}</h2>
      </div>

      <div className="videoGrid">
        {t.videos.items.map((video) => (
          <article className="videoCard" key={video.title}>
            <div className="playButton">▶</div>
            <span className="duration">{video.duration}</span>
            <div className="videoText">
              <h3>{video.title}</h3>
              <p>{video.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArticlesSection({ t }) {
  return (
    <section id="reviews" className="articles">
      <div className="sectionHeader light">
        <p className="sectionKicker">{t.articles.kicker}</p>
        <h2>{t.articles.title}</h2>
      </div>

      <div className="articleGrid">
        {t.articles.items.map((article, index) => (
          <article className="articleCard" key={article.title}>
            <div className={`articleImage articleImage${index + 1}`} />
            <div className="articleBody">
              <span>{article.tag}</span>
              <h3>{article.title}</h3>
              <p>{article.text}</p>
              <a href="#">{t.articles.readMore}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommunitySection({ t }) {
  return (
    <section id="comunidad" className="community sectionDark">
      <div className="sectionHeader">
        <p className="sectionKicker">{t.community.kicker}</p>
        <h2>{t.community.title}</h2>
      </div>

      <div className="socialGrid">
        {socials.map((social) => (
          <a
            href={social.link}
            className="socialCard"
            key={social.name}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{social.name}</strong>
            <span>{social.handle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footerBrand">
        <div className="footerLogo">
          <strong>GRIT</strong>
          <em>Skin</em>
        </div>
        <p>{t.footer.text}</p>
      </div>

      <div className="footerColumns">
        <div>
          <h4>{t.footer.nav}</h4>
          <a href="#inicio">{t.nav.inicio}</a>
          <a href="#rutinas">{t.nav.rutinas}</a>
          <a href="#problemas">{t.nav.problemas}</a>
          <a href="#videos">{t.nav.videos}</a>
          <a href="#reviews">{t.nav.reviews}</a>
        </div>

        <div>
          <h4>{t.footer.info}</h4>
          <a href="#">{t.footer.links.about}</a>
          <a href="#">{t.footer.links.contact}</a>
          <a href="#">{t.footer.links.privacy}</a>
          <a href="#">{t.footer.links.terms}</a>
        </div>

        <div>
          <h4>{t.footer.follow}</h4>
          <a href="#">TikTok</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">Pinterest</a>
          <a href="#">Facebook</a>
        </div>
      </div>

      <div className="footerBottom">
        <p>{t.footer.rights}</p>
        <p>{t.footer.affiliate}</p>
      </div>
    </footer>
  );
}

export default App;
