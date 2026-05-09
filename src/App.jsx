import React from "react";

const imagePaths = {
  hero: "/images/grit-hero-workers.png",
  founder: "/images/miguel-fierro-founder.jpeg",
  logo: "/images/grit-logo.png"
};

const problemCards = [
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
];

const routines = [
  {
    number: "01",
    title: "Rutina esencial",
    description: "Lo básico para mantener tu piel limpia, hidratada y protegida.",
    steps: ["Limpia", "Hidrata", "Protege"],
    products: [
      { name: "Limpiador facial", detail: "Producto afiliado", price: "$0.00", link: "#" },
      { name: "Hidratante ligera", detail: "Producto afiliado", price: "$0.00", link: "#" },
      { name: "Protector solar", detail: "Producto afiliado", price: "$0.00", link: "#" }
    ]
  },
  {
    number: "02",
    title: "Rutina de recuperación",
    description: "Ideal después de jornadas intensas, rasurado, sol o polvo.",
    steps: ["Limpia", "Calma", "Hidrata"],
    products: [
      { name: "Limpiador suave", detail: "Producto afiliado", price: "$0.00", link: "#" },
      { name: "Tónico calmante", detail: "Producto afiliado", price: "$0.00", link: "#" },
      { name: "Gel hidratante", detail: "Producto afiliado", price: "$0.00", link: "#" }
    ]
  },
  {
    number: "03",
    title: "Rutina diaria",
    description: "Tu rutina rápida para el trabajo y la vida fuera de él.",
    steps: ["Limpia", "Hidrata", "Protege"],
    products: [
      { name: "Limpiador diario", detail: "Producto afiliado", price: "$0.00", link: "#" },
      { name: "Crema ligera", detail: "Producto afiliado", price: "$0.00", link: "#" },
      { name: "Protector sin brillo", detail: "Producto afiliado", price: "$0.00", link: "#" }
    ]
  }
];

const videos = [
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
];

const articles = [
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
];

const socials = [
  { name: "TikTok", handle: "@gritskin", link: "#" },
  { name: "Instagram", handle: "@gritskin", link: "#" },
  { name: "YouTube", handle: "/gritskin", link: "#" },
  { name: "Pinterest", handle: "/gritskin", link: "#" },
  { name: "Facebook", handle: "/gritskin", link: "#" }
];

function App() {
  return (
    <main className="site">
      <Header />
      <Hero />
      <ProblemSection />
      <FounderSection />
      <RoutinesSection />
      <VideosSection />
      <ArticlesSection />
      <CommunitySection />
      <Footer />
    </main>
  );
}

function Header() {
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
        <a href="#inicio">Inicio</a>
        <a href="#rutinas">Rutinas</a>
        <a href="#problemas">Problemas</a>
        <a href="#videos">Videos</a>
        <a href="#reviews">Reviews</a>
        <a href="#comunidad">Comunidad</a>
      </nav>

      <a href="#rutinas" className="navButton">
        Encuentra tu rutina
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div
        className="heroBackground"
        style={{ backgroundImage: `url(${imagePaths.hero})` }}
      />

      <div className="heroOverlay" />

      <div className="heroContent">
        <p className="eyebrow">Piel grit. Vida real.</p>

        <h1>
          Cuidado real
          <span>para piel de trabajo.</span>
        </h1>

        <p className="heroText">
          Para quienes viven entre construcción, logística, oficina, sol, polvo,
          sudor y clima extremo. Grit Skin nace para hombres que trabajan duro y
          también quieren cuidar su piel.
        </p>

        <div className="heroActions">
          <a href="#rutinas" className="buttonPrimary">
            Ver rutinas
          </a>
          <a href="#reviews" className="buttonSecondary">
            Explorar productos
          </a>
        </div>

        <div className="heroQuote">
          <span className="shieldIcon">◇</span>
          <p>
            Aunque tengamos cuero en vez de piel, también merece cuidárnosla.
          </p>
        </div>
      </div>

      <div className="heroBadge">
        <span className="badgeIcon">▱</span>
        <div>
          <small>Fundado por</small>
          <strong>Miguel Fierro</strong>
          <p>Fundador de Grit Skin</p>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problemas" className="problems sectionDark">
      <div className="sectionHeader">
        <p className="sectionKicker">Tu piel, tu entorno, tu rutina</p>
        <h2>Elige el problema principal y encuentra lo que tu piel necesita.</h2>
      </div>

      <div className="problemGrid">
        {problemCards.map((card) => (
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

function FounderSection() {
  return (
    <section className="founder">
      <div className="founderImageWrap">
        <img
          src={imagePaths.founder}
          alt="Miguel Fierro, fundador de Grit Skin"
          className="founderImage"
        />
      </div>

      <div className="founderText">
        <p className="smallLabel">Nuestra historia</p>
        <h2>Creado desde la experiencia.</h2>

        <p>
          Soy Miguel Fierro, fundador de Grit Skin. He estado en ambientes de
          construcción, logística y oficina en Canadá, México, Sudamérica y
          algunas partes de Europa. Conozco de primera mano cómo el sol, el
          polvo, el frío, el sudor y el estrés afectan la piel del hombre que
          trabaja.
        </p>

        <p>
          Grit Skin nace para simplificar el cuidado masculino con rutinas
          efectivas, productos confiables y educación real. Sin promesas vacías,
          sin complicaciones y sin hacer del cuidado personal algo ajeno al
          hombre.
        </p>

        <div className="trustGrid">
          <div className="trustItem">
            <span>★</span>
            <strong>Experiencia real</strong>
            <p>En obras, oficinas, logística y entornos de trabajo exigentes.</p>
          </div>

          <div className="trustItem">
            <span>◎</span>
            <strong>Asesorado por profesionales</strong>
            <p>Con apoyo de especialistas de belleza de Suiza, México y Colombia.</p>
          </div>

          <div className="trustItem">
            <span>◇</span>
            <strong>Soluciones simples</strong>
            <p>Rutinas prácticas para hombres reales y resultados visibles.</p>
          </div>

          <div className="trustItem">
            <span>▰</span>
            <strong>Confianza y calidad</strong>
            <p>Productos seleccionados por utilidad, experiencia y criterio.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutinesSection() {
  return (
    <section id="rutinas" className="routines sectionDark">
      <div className="sectionHeader">
        <p className="sectionKicker">Rutinas simples. Resultados reales.</p>
        <h2>Empieza con tres pasos. Después ajustamos según tu piel.</h2>
      </div>

      <div className="routineGrid">
        {routines.map((routine) => (
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
                  href={product.link}
                  key={product.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={`productShape productShape${index + 1}`} />
                  <strong>{product.name}</strong>
                  <small>{product.detail}</small>
                  <span>{product.price}</span>
                </a>
              ))}
            </div>

            <a href="#reviews" className="routineButton">
              Ver productos
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function VideosSection() {
  return (
    <section id="videos" className="videos sectionDark">
      <div className="sectionHeader">
        <p className="sectionKicker">Videos para hombres que quieren mejorar su piel</p>
        <h2>Espacios listos para YouTube Shorts, TikTok, Reels y Pinterest.</h2>
      </div>

      <div className="videoGrid">
        {videos.map((video) => (
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

function ArticlesSection() {
  return (
    <section id="reviews" className="articles">
      <div className="sectionHeader light">
        <p className="sectionKicker">Aprende. Aplica. Mejora tu piel.</p>
        <h2>Guías rápidas para vender con contenido, no con presión.</h2>
      </div>

      <div className="articleGrid">
        {articles.map((article, index) => (
          <article className="articleCard" key={article.title}>
            <div className={`articleImage articleImage${index + 1}`} />
            <div className="articleBody">
              <span>{article.tag}</span>
              <h3>{article.title}</h3>
              <p>{article.text}</p>
              <a href="#">Leer más →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section id="comunidad" className="community sectionDark">
      <div className="sectionHeader">
        <p className="sectionKicker">Únete a la comunidad Grit Skin</p>
        <h2>Contenido real. Hombres reales. Rutinas reales.</h2>
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

function Footer() {
  return (
    <footer className="footer">
      <div className="footerBrand">
        <div className="footerLogo">
          <strong>GRIT</strong>
          <em>Skin</em>
        </div>
        <p>
          Grit Skin es para hombres que trabajan duro y quieren cuidar su piel
          sin complicarse. Rutinas simples, productos útiles y educación real.
        </p>
      </div>

      <div className="footerColumns">
        <div>
          <h4>Navegación</h4>
          <a href="#inicio">Inicio</a>
          <a href="#rutinas">Rutinas</a>
          <a href="#problemas">Problemas</a>
          <a href="#videos">Videos</a>
          <a href="#reviews">Reviews</a>
        </div>

        <div>
          <h4>Información</h4>
          <a href="#">Sobre Grit Skin</a>
          <a href="#">Contacto</a>
          <a href="#">Política de privacidad</a>
          <a href="#">Términos y condiciones</a>
        </div>

        <div>
          <h4>Síguenos</h4>
          <a href="#">TikTok</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">Pinterest</a>
          <a href="#">Facebook</a>
        </div>
      </div>

      <div className="footerBottom">
        <p>© 2026 Grit Skin. Todos los derechos reservados.</p>
        <p>
          Algunos enlaces podrán ser de afiliado. Recomendamos productos por
          utilidad, criterio y experiencia.
        </p>
      </div>
    </footer>
  );
}

export default App;
