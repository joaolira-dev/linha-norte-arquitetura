"use client";

import { FormEvent, useEffect } from "react";
import Image from "next/image";

const projects = [
  {
    name: "Casa Pátio",
    type: "Residencial",
    location: "Atibaia, SP",
    image: "/images/casa-patio.png",
    className: "project--wide",
  },
  {
    name: "Apartamento Lume",
    type: "Interiores",
    location: "São Paulo, SP",
    image: "/images/apartamento-lume.png",
    className: "project--portrait",
  },
  {
    name: "Clínica Essência",
    type: "Comercial",
    location: "Campinas, SP",
    image: "/images/clinica-essencia.png",
    className: "project--landscape",
  },
  {
    name: "Casa Brisa",
    type: "Residencial",
    location: "Ubatuba, SP",
    image: "/images/casa-brisa.png",
    className: "project--offset",
  },
  {
    name: "Loft Aurora",
    type: "Interiores",
    location: "São Paulo, SP",
    image: "/images/loft-aurora.png",
    className: "project--tall",
  },
];

const services = [
  ["01", "Projetos residenciais", "Casas que traduzem modos de viver, do primeiro traço à obra."],
  ["02", "Interiores", "Atmosferas, materiais e detalhes pensados em continuidade."],
  ["03", "Reformas", "Novos usos e possibilidades para espaços que já têm história."],
  ["04", "Projetos comerciais", "Ambientes que tornam a experiência da marca tangível."],
];

const steps = [
  ["01", "Conversa inicial", "Entendemos sua rotina, desejos, terreno ou espaço existente."],
  ["02", "Conceito", "Traduzimos a escuta em partido, atmosfera e primeiras escolhas."],
  ["03", "Desenvolvimento técnico", "Detalhamos cada decisão para uma execução clara e precisa."],
  ["04", "Acompanhamento", "Mantemos o projeto alinhado durante as etapas da obra."],
];

const faqs = [
  ["Vocês atendem reformas?", "Sim. Trabalhamos tanto com reformas completas quanto com intervenções pontuais, sempre a partir de um diagnóstico do espaço existente."],
  ["O projeto inclui acompanhamento?", "O acompanhamento pode ser incluído no escopo. A frequência e o formato são definidos conforme a complexidade, a localização e a fase da obra."],
  ["Como funciona o orçamento?", "Depois de uma conversa inicial, preparamos uma proposta personalizada considerando área, tipo de projeto, etapas e nível de detalhamento necessário."],
  ["Atendem de forma online?", "Sim. Parte do processo pode acontecer online, inclusive para projetos em outras cidades. Visitas e levantamentos são combinados conforme cada caso."],
];

export default function Home() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.location.hash === "#capture") {
      items.forEach((item) => item.classList.add("is-visible"));
      document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((image) => {
        image.loading = "eager";
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));

    const parallaxItems = document.querySelectorAll<HTMLElement>("[data-parallax]");
    let frame = 0;
    const updateParallax = () => {
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const shift = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.035;
        item.style.setProperty("--parallax", `${Math.max(-26, Math.min(26, shift))}px`);
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = [
      "Olá, Linha Norte Arquitetura.",
      `Meu nome é ${data.get("nome")}.`,
      `Tenho interesse em: ${data.get("tipo")}.`,
      `WhatsApp: ${data.get("whatsapp")}.`,
      `Mensagem: ${data.get("mensagem") || "Gostaria de conversar sobre o projeto."}`,
    ].join("\n");
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main id="capture">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Linha Norte Arquitetura — início">
          <span className="brand-mark" aria-hidden="true" />
          <span>Linha Norte</span>
          <small>Arquitetura</small>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#projetos">Projetos</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="header-cta" href="#contato">Fale com a gente <span>↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image image-shell">
          <div className="parallax-media" data-parallax>
            <Image
              src="/images/casa-patio.png"
              alt="Casa contemporânea com pátio, pedra natural e vegetação"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <span className="image-index">01 — 05</span>
        </div>
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">Arquitetura &amp; Interiores · São Paulo</p>
          <h1>Espaços pensados para a <em>vida acontecer.</em></h1>
          <div className="hero-bottom">
            <p>Arquitetura e interiores com identidade, técnica e sensibilidade.</p>
            <a className="round-link" href="#contato">
              <span>Iniciar um<br />projeto</span>
              <b aria-hidden="true">↘</b>
            </a>
          </div>
        </div>
      </section>

      <section className="manifesto section-pad">
        <div className="section-label" data-reveal><span>02</span> Manifesto</div>
        <div className="manifesto-copy" data-reveal>
          <p>Acreditamos que bons espaços não impressionam apenas na primeira visita. <em>Eles funcionam, acolhem e permanecem.</em></p>
          <div className="manifesto-note">
            <span>LINHA NORTE</span>
            <p>Um escritório conceitual de arquitetura e interiores que entende cada projeto como um encontro entre contexto, matéria e vida cotidiana.</p>
          </div>
        </div>
      </section>

      <section className="portfolio section-pad" id="projetos">
        <div className="portfolio-heading" data-reveal>
          <div className="section-label"><span>03</span> Projetos selecionados</div>
          <h2>Uma arquitetura<br /><em>feita para durar.</em></h2>
          <p>Residências, interiores e espaços comerciais desenhados com precisão e calma.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project ${project.className}`} key={project.name} data-reveal>
              <div className="project-image image-shell">
                <div className="parallax-media" data-parallax>
                  <Image
                    src={project.image}
                    alt={`Projeto fictício ${project.name}`}
                    fill
                    loading={index > 0 ? "lazy" : "eager"}
                    sizes="(max-width: 640px) 92vw, (max-width: 900px) 75vw, 65vw"
                  />
                </div>
                <span className="project-number">0{index + 1}</span>
              </div>
              <div className="project-caption">
                <h3>{project.name}</h3>
                <p>{project.type} · {project.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="services-intro" data-reveal>
          <div className="section-label light"><span>04</span> O que fazemos</div>
          <h2>Da primeira ideia<br />ao espaço <em>vivido.</em></h2>
        </div>
        <div className="service-list">
          {services.map(([number, title, description]) => (
            <article className="service-row" key={title} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <b aria-hidden="true">↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-pad">
        <div className="process-heading" data-reveal>
          <div className="section-label"><span>05</span> Como funciona</div>
          <h2>Um processo claro,<br /><em>do início ao fim.</em></h2>
        </div>
        <div className="timeline">
          {steps.map(([number, title, description]) => (
            <article className="timeline-step" key={title} data-reveal>
              <div className="timeline-number">{number}</div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="contato">
        <div className="contact-statement" data-reveal>
          <div className="section-label light"><span>06</span> Novo projeto</div>
          <h2>Cada projeto começa com <em>uma escuta.</em></h2>
          <p>Conte um pouco sobre o que você imagina. Retornamos em até dois dias úteis para uma primeira conversa.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <label>
            <span>Seu nome</span>
            <input name="nome" type="text" placeholder="Como podemos chamar você?" required />
          </label>
          <label>
            <span>WhatsApp</span>
            <input name="whatsapp" type="tel" placeholder="(11) 99999-9999" required />
          </label>
          <label>
            <span>Tipo de projeto</span>
            <select name="tipo" defaultValue="" required>
              <option value="" disabled>Selecione uma opção</option>
              <option>Projeto residencial</option>
              <option>Interiores</option>
              <option>Reforma</option>
              <option>Projeto comercial</option>
            </select>
          </label>
          <label>
            <span>Conte brevemente sobre o projeto</span>
            <textarea name="mensagem" rows={3} placeholder="Local, metragem, momento atual e o que deseja transformar..." />
          </label>
          <button type="submit">Enviar pelo WhatsApp <span>↗</span></button>
        </form>
      </section>

      <section className="faq section-pad">
        <div className="faq-heading" data-reveal>
          <div className="section-label"><span>07</span> Perguntas frequentes</div>
          <h2>Antes de<br /><em>começarmos.</em></h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} data-reveal>
              <summary><span>0{index + 1}</span>{question}<b aria-hidden="true">+</b></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-mark" aria-hidden="true" />
            <span>Linha Norte</span>
            <small>Arquitetura</small>
          </a>
          <p>Arquitetura que nasce da escuta,<br />do lugar e do tempo.</p>
          <a className="footer-project" href="#contato">Vamos conversar <span>↗</span></a>
        </div>
        <div className="footer-bottom">
          <div><span>Social</span><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
          <div><span>Contato</span><a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="mailto:contato@linhanorte.arq.br">contato@linhanorte.arq.br</a></div>
          <div><span>Estúdio</span><p>Rua do Horizonte, 128<br />Vila Madalena · São Paulo, SP</p></div>
          <p className="copyright">© 2026 Linha Norte<br />Escritório conceitual</p>
        </div>
      </footer>
    </main>
  );
}
