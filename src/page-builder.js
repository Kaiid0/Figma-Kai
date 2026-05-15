/**
 * MADE4IT — Page Builder
 *
 * Funções para gerar seções HTML das páginas de produto.
 * Uso: importe buildPage(config) ou as funções individuais.
 *
 * Cada função recebe um objeto de configuração com os textos
 * e retorna uma string HTML pronta para inserir na página.
 */

// ============================================================
// 01 — NAVBAR
// ============================================================
/**
 * @param {object} cfg
 * @param {string} cfg.logoSrc        - Caminho para o logo
 * @param {string} cfg.logoAlt
 * @param {Array<{label:string, href:string}>} cfg.links
 * @param {{label:string, href:string}} cfg.cta
 */
function buildNavbar(cfg) {
  const links = (cfg.links || [])
    .map(l => `<a href="${l.href}">${l.label}</a>`)
    .join('');

  const cta = cfg.cta
    ? `<a href="${cfg.cta.href}" class="btn btn-primary" style="padding:9px 20px;font-size:0.85rem">${cfg.cta.label}</a>`
    : '';

  return `
<nav class="navbar">
  <a href="/" class="navbar-logo">
    <img src="${cfg.logoSrc}" alt="${cfg.logoAlt || 'Logo'}">
  </a>
  <div class="navbar-links">${links}</div>
  ${cta}
</nav>`.trim();
}

// ============================================================
// 02 — HERO
// ============================================================
/**
 * @param {object} cfg
 * @param {string} cfg.badge          - Texto do badge (ex: "made4isp")
 * @param {string} cfg.headline       - Título principal (aceita HTML para <span> colorido)
 * @param {string} cfg.subheadline    - Subtítulo / complemento da headline
 * @param {string} cfg.description    - Parágrafo de descrição
 * @param {string} cfg.ctaLabel       - Texto do botão primário
 * @param {string} cfg.ctaHref
 * @param {string} [cfg.ctaSecondLabel] - Botão secundário (opcional)
 * @param {string} [cfg.ctaSecondHref]
 * @param {string} cfg.bgImage        - URL da imagem de fundo
 * @param {'left'|'center'} [cfg.align='left']
 */
function buildHero(cfg) {
  const align = cfg.align || 'left';
  const overlayClass = align === 'center' ? 'hero-overlay-center' : 'hero-overlay';
  const textAlign = align === 'center' ? 'text-center' : '';
  const dividerAlign = align === 'center' ? 'center' : '';

  const badge = cfg.badge
    ? `<span class="product-badge">${cfg.badge}</span>`
    : '';

  const sub = cfg.subheadline
    ? `<p class="heading-lg" style="color:var(--accent-cyan);margin-top:4px">${cfg.subheadline}</p>`
    : '';

  const ctaSecond = cfg.ctaSecondLabel
    ? `<a href="${cfg.ctaSecondHref || '#'}" class="btn btn-outline">${cfg.ctaSecondLabel}</a>`
    : '';

  return `
<section style="position:relative;min-height:580px;display:flex;align-items:center;padding:120px 0 80px;overflow:hidden">
  <img src="${cfg.bgImage}" alt=""
       style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
  <div class="${overlayClass}" style="z-index:1"></div>
  <div class="container" style="position:relative;z-index:2">
    <div style="max-width:${align === 'center' ? '700px' : '580px'};${align === 'center' ? 'margin:0 auto' : ''}">
      <div class="${textAlign}">
        ${badge}
        <h1 class="heading-xl">${cfg.headline}</h1>
        ${sub}
        <div class="section-divider ${dividerAlign}"></div>
        <p class="text-body" style="max-width:500px;${align === 'center' ? 'margin:0 auto' : ''}margin-top:12px">${cfg.description}</p>
        <div class="flex-row" style="margin-top:28px;${align === 'center' ? 'justify-content:center' : ''}flex-wrap:wrap;gap:14px">
          <a href="${cfg.ctaHref || '#'}" class="btn btn-primary">${cfg.ctaLabel}</a>
          ${ctaSecond}
        </div>
      </div>
    </div>
  </div>
</section>`.trim();
}

// ============================================================
// 03 — BARRA DE STATS
// ============================================================
/**
 * @param {object} cfg
 * @param {Array<{icon:string, value:string, label:string}>} cfg.stats
 *   icon: SVG string ou URL de imagem
 * @param {'dark'|'dark2'|'light'} [cfg.variant='dark2']
 */
function buildStatsBar(cfg) {
  const variant = cfg.variant || 'dark2';
  const bgClass = variant === 'light' ? 'section-light' : `section-${variant}`;

  const items = (cfg.stats || []).map(s => {
    const icon = s.icon
      ? `<div style="margin-bottom:8px;color:var(--accent-cyan)">${s.icon}</div>`
      : '';
    return `
    <div class="stat-item">
      ${icon}
      <span class="stat-value">${s.value}</span>
      <span class="stat-label">${s.label}</span>
    </div>`;
  }).join('<div style="width:1px;background:var(--border-subtle);align-self:stretch"></div>');

  return `
<section class="${bgClass}" style="border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle)">
  <div class="container">
    <div style="display:flex;justify-content:space-around;flex-wrap:wrap;gap:8px">
      ${items}
    </div>
  </div>
</section>`.trim();
}

// ============================================================
// 04 — SEÇÃO "O QUE É" (produto + screenshot)
// ============================================================
/**
 * @param {object} cfg
 * @param {string} cfg.eyebrow        - Pequeno texto acima do título (opcional)
 * @param {string} cfg.headline
 * @param {string} cfg.description    - Parágrafos (pode conter HTML)
 * @param {string} [cfg.ctaLabel]
 * @param {string} [cfg.ctaHref]
 * @param {string} cfg.imageSrc       - Screenshot do produto
 * @param {string} [cfg.imageAlt]
 * @param {'left'|'right'} [cfg.imagePosition='right'] - Lado da imagem
 * @param {'dark'|'dark2'} [cfg.variant='dark']
 */
function buildProductSection(cfg) {
  const imgPos = cfg.imagePosition || 'right';
  const variant = cfg.variant || 'dark';

  const eyebrow = cfg.eyebrow
    ? `<p class="text-small" style="text-transform:uppercase;letter-spacing:.08em;color:var(--accent-cyan);margin-bottom:8px">${cfg.eyebrow}</p>`
    : '';

  const cta = cfg.ctaLabel
    ? `<a href="${cfg.ctaHref || '#'}" class="btn btn-outline" style="margin-top:24px">${cfg.ctaLabel}</a>`
    : '';

  const textCol = `
    <div>
      ${eyebrow}
      <h2 class="heading-lg">${cfg.headline}</h2>
      <div class="section-divider" style="margin-top:14px"></div>
      <div class="text-body" style="margin-top:16px">${cfg.description}</div>
      ${cta}
    </div>`;

  const imageCol = `
    <div style="border-radius:14px;overflow:hidden;border:1px solid var(--border-card)">
      <img src="${cfg.imageSrc}" alt="${cfg.imageAlt || ''}" style="width:100%;display:block">
    </div>`;

  const [left, right] = imgPos === 'right'
    ? [textCol, imageCol]
    : [imageCol, textCol];

  return `
<section class="section-${variant}" style="padding:var(--section-py) 0">
  <div class="container">
    <div class="grid-2">
      ${left}
      ${right}
    </div>
  </div>
</section>`.trim();
}

// ============================================================
// 05 — GRADE DE CARDS DE FUNCIONALIDADES
// ============================================================
/**
 * @param {object} cfg
 * @param {string} [cfg.eyebrow]
 * @param {string} cfg.headline
 * @param {string} [cfg.description]
 * @param {Array<{icon:string, title:string, description:string}>} cfg.cards
 *   icon: SVG string
 * @param {2|3|4} [cfg.columns=3]
 * @param {'dark'|'dark2'} [cfg.variant='dark2']
 */
function buildFeatureCards(cfg) {
  const cols = cfg.columns || 3;
  const variant = cfg.variant || 'dark2';

  const header = `
    <div class="text-center" style="max-width:640px;margin:0 auto 48px">
      ${cfg.eyebrow ? `<p class="text-small" style="text-transform:uppercase;letter-spacing:.08em;color:var(--accent-cyan);margin-bottom:8px">${cfg.eyebrow}</p>` : ''}
      <h2 class="heading-lg">${cfg.headline}</h2>
      <div class="section-divider center"></div>
      ${cfg.description ? `<p class="text-body" style="margin-top:12px">${cfg.description}</p>` : ''}
    </div>`;

  const cards = (cfg.cards || []).map(c => `
    <div class="card">
      <div class="card-icon">${c.icon}</div>
      <h3 class="heading-sm" style="margin-bottom:8px">${c.title}</h3>
      <p class="text-body" style="font-size:0.9rem">${c.description}</p>
    </div>`).join('');

  return `
<section class="section-${variant}" style="padding:var(--section-py) 0">
  <div class="container">
    ${header}
    <div class="grid-${cols}">${cards}</div>
  </div>
</section>`.trim();
}

// ============================================================
// 06 — SEÇÃO DE VÍDEO
// ============================================================
/**
 * @param {object} cfg
 * @param {string} cfg.headline
 * @param {string} [cfg.description]
 * @param {string} cfg.thumbSrc       - Imagem de thumbnail do vídeo
 * @param {string} cfg.videoUrl       - URL do vídeo (embed ou direto)
 * @param {string} [cfg.ctaLabel]
 * @param {string} [cfg.ctaHref]
 */
function buildVideoSection(cfg) {
  const cta = cfg.ctaLabel
    ? `<a href="${cfg.ctaHref || '#'}" class="btn btn-primary" style="margin-top:28px">${cfg.ctaLabel}</a>`
    : '';

  return `
<section class="section-dark2" style="padding:var(--section-py) 0">
  <div class="container">
    <div class="text-center" style="max-width:700px;margin:0 auto 40px">
      <h2 class="heading-lg">${cfg.headline}</h2>
      <div class="section-divider center"></div>
      ${cfg.description ? `<p class="text-body" style="margin-top:12px">${cfg.description}</p>` : ''}
    </div>
    <div class="video-placeholder" style="max-width:860px;margin:0 auto"
         onclick="this.innerHTML='<iframe style=width:100%;height:100%;position:absolute;inset:0 src=${cfg.videoUrl} frameborder=0 allowfullscreen></iframe>'">
      <img src="${cfg.thumbSrc}" alt="Video">
      <div class="play-btn">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </div>
    <div class="text-center">${cta}</div>
  </div>
</section>`.trim();
}

// ============================================================
// 07 — SEÇÃO BENEFÍCIOS (foto + lista)
// ============================================================
/**
 * @param {object} cfg
 * @param {string} cfg.eyebrow
 * @param {string} cfg.headline
 * @param {string} [cfg.description]
 * @param {string[]} cfg.benefits     - Lista de benefícios (texto simples)
 * @param {string} cfg.imageSrc
 * @param {string} [cfg.imageAlt]
 * @param {'left'|'right'} [cfg.imagePosition='left']
 * @param {string} [cfg.ctaLabel]
 * @param {string} [cfg.ctaHref]
 * @param {'dark'|'dark2'} [cfg.variant='dark']
 */
function buildBenefitsSection(cfg) {
  const imgPos = cfg.imagePosition || 'left';

  const items = (cfg.benefits || [])
    .map(b => `<li>${b}</li>`)
    .join('');

  const cta = cfg.ctaLabel
    ? `<a href="${cfg.ctaHref || '#'}" class="btn btn-primary" style="margin-top:24px">${cfg.ctaLabel}</a>`
    : '';

  const textCol = `
    <div>
      ${cfg.eyebrow ? `<p class="text-small" style="text-transform:uppercase;letter-spacing:.08em;color:var(--accent-cyan);margin-bottom:8px">${cfg.eyebrow}</p>` : ''}
      <h2 class="heading-lg">${cfg.headline}</h2>
      <div class="section-divider" style="margin-top:14px"></div>
      ${cfg.description ? `<p class="text-body" style="margin-top:14px;margin-bottom:20px">${cfg.description}</p>` : ''}
      <ul class="check-list">${items}</ul>
      ${cta}
    </div>`;

  const imageCol = `
    <div style="border-radius:14px;overflow:hidden">
      <img src="${cfg.imageSrc}" alt="${cfg.imageAlt || ''}" style="width:100%;object-fit:cover;border-radius:14px">
    </div>`;

  const [left, right] = imgPos === 'left'
    ? [imageCol, textCol]
    : [textCol, imageCol];

  return `
<section class="section-${cfg.variant || 'dark'}" style="padding:var(--section-py) 0">
  <div class="container">
    <div class="grid-2">${left}${right}</div>
  </div>
</section>`.trim();
}

// ============================================================
// 08 — FEATURE DESTAQUE (CTA banner centralizado)
// ============================================================
/**
 * @param {object} cfg
 * @param {string} cfg.headline
 * @param {string} [cfg.description]
 * @param {Array<{icon:string, title:string, text:string}>} [cfg.items]
 * @param {string} [cfg.ctaLabel]
 * @param {string} [cfg.ctaHref]
 * @param {string} [cfg.accentColor='var(--accent-cyan)']
 */
function buildHighlightBanner(cfg) {
  const items = (cfg.items || []).map(i => `
    <div style="display:flex;gap:14px;align-items:flex-start">
      <div class="card-icon" style="flex-shrink:0">${i.icon}</div>
      <div>
        <h4 class="heading-sm" style="margin-bottom:4px">${i.title}</h4>
        <p class="text-body" style="font-size:0.875rem">${i.text}</p>
      </div>
    </div>`).join('');

  const cta = cfg.ctaLabel
    ? `<a href="${cfg.ctaHref || '#'}" class="btn btn-primary" style="margin-top:28px">${cfg.ctaLabel}</a>`
    : '';

  return `
<section style="padding:var(--section-py) 0;background:linear-gradient(135deg,#080f1e 0%,#0d1a2e 100%);border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle)">
  <div class="container">
    <div class="text-center" style="max-width:640px;margin:0 auto 40px">
      <h2 class="heading-lg">${cfg.headline}</h2>
      <div class="section-divider center"></div>
      ${cfg.description ? `<p class="text-body" style="margin-top:12px">${cfg.description}</p>` : ''}
    </div>
    ${items ? `<div class="grid-2" style="max-width:900px;margin:0 auto;gap:28px">${items}</div>` : ''}
    <div class="text-center">${cta}</div>
  </div>
</section>`.trim();
}

// ============================================================
// 09 — TABELA COMPARATIVA
// ============================================================
/**
 * @param {object} cfg
 * @param {string} [cfg.eyebrow]
 * @param {string} cfg.headline
 * @param {string[]} cfg.columns      - Nomes das colunas (1ª = nome do item)
 * @param {number} [cfg.highlightCol] - Índice da coluna a destacar (0-based, sem contar a 1ª col)
 * @param {Array<{label:string, values:string[]}>} cfg.rows
 *   values: array alinhado com cfg.columns (sem o label)
 *   Use "✓" para check, "✗" para não disponível, ou texto livre
 * @param {'dark'|'dark2'|'light'} [cfg.variant='dark2']
 */
function buildCompareTable(cfg) {
  const variant = cfg.variant || 'dark2';
  const hi = cfg.highlightCol !== undefined ? cfg.highlightCol + 1 : -1; // +1 por causa da col de label

  const thead = cfg.columns.map((c, i) => {
    const cls = i === hi ? 'col-highlight' : '';
    return `<th class="${cls}">${c}</th>`;
  }).join('');

  const tbody = (cfg.rows || []).map(row => {
    const cells = row.values.map((v, i) => {
      const cls = (i + 1) === hi ? 'col-highlight' : '';
      const display = v === '✓'
        ? `<span class="check-yes">✓</span>`
        : v === '✗' || v === ''
          ? `<span class="check-no">—</span>`
          : v;
      return `<td class="${cls}">${display}</td>`;
    }).join('');
    return `<tr><td>${row.label}</td>${cells}</tr>`;
  }).join('');

  return `
<section class="section-${variant}" style="padding:var(--section-py) 0">
  <div class="container">
    <div class="text-center" style="max-width:640px;margin:0 auto 40px">
      ${cfg.eyebrow ? `<p class="text-small" style="text-transform:uppercase;letter-spacing:.08em;color:var(--accent-cyan);margin-bottom:8px">${cfg.eyebrow}</p>` : ''}
      <h2 class="heading-lg">${cfg.headline}</h2>
      <div class="section-divider center"></div>
    </div>
    <div style="overflow-x:auto;border-radius:12px;border:1px solid var(--border-card)">
      <table class="compare-table">
        <thead><tr>${thead}</tr></thead>
        <tbody>${tbody}</tbody>
      </table>
    </div>
  </div>
</section>`.trim();
}

// ============================================================
// 10 — BARRA DE PARCEIROS / LOGOS
// ============================================================
/**
 * @param {object} cfg
 * @param {string} [cfg.label]        - Texto acima dos logos (opcional)
 * @param {Array<{src:string, alt:string}>} cfg.logos
 * @param {'dark'|'dark2'|'light'} [cfg.variant='dark2']
 */
function buildLogosBar(cfg) {
  const variant = cfg.variant || 'dark2';
  const label = cfg.label
    ? `<p class="text-small text-center" style="margin-bottom:20px;text-transform:uppercase;letter-spacing:.08em">${cfg.label}</p>`
    : '';

  const logos = (cfg.logos || [])
    .map(l => `<img src="${l.src}" alt="${l.alt}">`)
    .join('');

  return `
<section class="section-${variant}" style="padding:var(--section-py-sm) 0;border-top:1px solid var(--border-subtle)">
  <div class="container">
    ${label}
    <div class="logos-bar">${logos}</div>
  </div>
</section>`.trim();
}

// ============================================================
// 11 — FORMULÁRIO DE CONTATO
// ============================================================
/**
 * @param {object} cfg
 * @param {string} [cfg.eyebrow]
 * @param {string} cfg.headline
 * @param {string} [cfg.description]
 * @param {string} [cfg.submitLabel='Enviar']
 * @param {string} [cfg.formAction]
 * @param {Array<{name:string, label:string, type?:string, placeholder?:string, full?:boolean, options?:string[]}>} [cfg.fields]
 * @param {'dark'|'dark2'|'light'} [cfg.variant='dark2']
 */
function buildContactForm(cfg) {
  const variant = cfg.variant || 'dark2';
  const defaultFields = [
    { name: 'name',    label: 'Nome',    type: 'text',  placeholder: 'Seu nome completo' },
    { name: 'email',   label: 'E-mail',  type: 'email', placeholder: 'seu@email.com' },
    { name: 'company', label: 'Empresa', type: 'text',  placeholder: 'Nome da empresa' },
    { name: 'phone',   label: 'Telefone',type: 'tel',   placeholder: '(00) 00000-0000' },
    { name: 'message', label: 'Mensagem',type: 'textarea', placeholder: 'Como podemos ajudar?', full: true },
  ];

  const fields = cfg.fields || defaultFields;

  const fieldsHtml = fields.map(f => {
    const fullClass = f.full ? ' full' : '';
    let input;
    if (f.type === 'textarea') {
      input = `<textarea name="${f.name}" placeholder="${f.placeholder || ''}"></textarea>`;
    } else if (f.type === 'select' && f.options) {
      const opts = f.options.map(o => `<option>${o}</option>`).join('');
      input = `<select name="${f.name}"><option value="" disabled selected>${f.placeholder || f.label}</option>${opts}</select>`;
    } else {
      input = `<input type="${f.type || 'text'}" name="${f.name}" placeholder="${f.placeholder || ''}">`;
    }
    return `
    <div class="form-group${fullClass}">
      <label>${f.label}</label>
      ${input}
    </div>`;
  }).join('');

  return `
<section class="section-${variant}" style="padding:var(--section-py) 0" id="contato">
  <div class="container">
    <div class="text-center" style="max-width:540px;margin:0 auto 40px">
      ${cfg.eyebrow ? `<p class="text-small" style="text-transform:uppercase;letter-spacing:.08em;color:var(--accent-cyan);margin-bottom:8px">${cfg.eyebrow}</p>` : ''}
      <h2 class="heading-lg">${cfg.headline}</h2>
      <div class="section-divider center"></div>
      ${cfg.description ? `<p class="text-body" style="margin-top:12px">${cfg.description}</p>` : ''}
    </div>
    <form action="${cfg.formAction || '#'}" method="POST"
          style="max-width:680px;margin:0 auto;background:var(--bg-dark-card);border:1px solid var(--border-card);border-radius:16px;padding:36px">
      <div class="form-grid">
        ${fieldsHtml}
        <div class="form-group full" style="margin-top:8px">
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
            ${cfg.submitLabel || 'Enviar'}
          </button>
        </div>
      </div>
    </form>
  </div>
</section>`.trim();
}

// ============================================================
// 12 — FOOTER
// ============================================================
/**
 * @param {object} cfg
 * @param {string} cfg.logoSrc
 * @param {string} [cfg.logoAlt]
 * @param {string} [cfg.tagline]
 * @param {Array<{title:string, links:{label:string, href:string}[]}>} cfg.columns
 * @param {string} [cfg.copyright]
 * @param {Array<{icon:string, href:string}>} [cfg.social]
 */
function buildFooter(cfg) {
  const cols = (cfg.columns || []).map(col => {
    const links = col.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('');
    return `
    <div class="footer-col">
      <h4>${col.title}</h4>
      <ul>${links}</ul>
    </div>`;
  }).join('');

  const social = (cfg.social || []).map(s =>
    `<a href="${s.href}" style="color:var(--text-muted);transition:color .2s" onmouseover="this.style.color='var(--accent-cyan)'" onmouseout="this.style.color='var(--text-muted)'">${s.icon}</a>`
  ).join('');

  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <img src="${cfg.logoSrc}" alt="${cfg.logoAlt || 'Logo'}" class="footer-logo">
        ${cfg.tagline ? `<p class="text-small" style="margin-top:8px;line-height:1.5">${cfg.tagline}</p>` : ''}
        ${social ? `<div class="flex-row" style="margin-top:16px;gap:12px">${social}</div>` : ''}
      </div>
      ${cols}
    </div>
    <div class="footer-bottom">
      <span>${cfg.copyright || '&copy; 2025 Made4IT. Todos os direitos reservados.'}</span>
    </div>
  </div>
</footer>`.trim();
}

// ============================================================
// ORQUESTRADOR — buildPage
// ============================================================
/**
 * Monta uma página completa a partir de uma configuração.
 *
 * @param {object} pageConfig
 * @param {string} pageConfig.title          - <title> do documento
 * @param {string} [pageConfig.description]  - Meta description
 * @param {string} [pageConfig.cssPath]      - Caminho para o CSS (default: 'styles.css')
 * @param {object} pageConfig.navbar
 * @param {object} pageConfig.hero
 * @param {object} [pageConfig.stats]
 * @param {Array<{type:string, config:object}>} pageConfig.sections
 *   Seções em ordem. type pode ser:
 *   'product' | 'featureCards' | 'video' | 'benefits' |
 *   'highlight' | 'compareTable' | 'logosBar' | 'contactForm' | 'custom'
 *   Para 'custom', config.html é inserido diretamente.
 * @param {object} pageConfig.footer
 * @returns {string} HTML completo da página
 */
function buildPage(pageConfig) {
  const sectionBuilders = {
    product:      buildProductSection,
    featureCards: buildFeatureCards,
    video:        buildVideoSection,
    benefits:     buildBenefitsSection,
    highlight:    buildHighlightBanner,
    compareTable: buildCompareTable,
    logosBar:     buildLogosBar,
    contactForm:  buildContactForm,
  };

  const nav   = pageConfig.navbar  ? buildNavbar(pageConfig.navbar)   : '';
  const hero  = pageConfig.hero    ? buildHero(pageConfig.hero)        : '';
  const stats = pageConfig.stats   ? buildStatsBar(pageConfig.stats)   : '';
  const foot  = pageConfig.footer  ? buildFooter(pageConfig.footer)    : '';

  const sectionsHtml = (pageConfig.sections || []).map(s => {
    if (s.type === 'custom') return s.config.html || '';
    const fn = sectionBuilders[s.type];
    return fn ? fn(s.config) : `<!-- unknown section type: ${s.type} -->`;
  }).join('\n\n');

  const cssPath = pageConfig.cssPath || 'styles.css';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageConfig.title}</title>
  ${pageConfig.description ? `<meta name="description" content="${pageConfig.description}">` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssPath}">
</head>
<body>

${nav}

<main>
${hero}
${stats}
${sectionsHtml}
</main>

${foot}

</body>
</html>`;
}

// ============================================================
// EXPORTS (CommonJS + browser global)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buildPage,
    buildNavbar,
    buildHero,
    buildStatsBar,
    buildProductSection,
    buildFeatureCards,
    buildVideoSection,
    buildBenefitsSection,
    buildHighlightBanner,
    buildCompareTable,
    buildLogosBar,
    buildContactForm,
    buildFooter,
  };
} else if (typeof window !== 'undefined') {
  window.PageBuilder = {
    buildPage,
    buildNavbar,
    buildHero,
    buildStatsBar,
    buildProductSection,
    buildFeatureCards,
    buildVideoSection,
    buildBenefitsSection,
    buildHighlightBanner,
    buildCompareTable,
    buildLogosBar,
    buildContactForm,
    buildFooter,
  };
}
