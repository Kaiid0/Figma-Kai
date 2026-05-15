/**
 * EXEMPLO DE USO — Página made4isp
 * Execute: node example-made4isp.js > made4isp.html
 *
 * Este arquivo demonstra como usar o page-builder com a estrutura
 * observada nos prints do site. Substitua os textos e caminhos
 * de imagem pelos valores reais.
 */

const { buildPage } = require('./page-builder');
const fs = require('fs');

const config = {
  title: 'made4isp — Solução completa para provedores de internet | Made4IT',
  description: 'Gerencie clientes, rede e cobranças em uma única plataforma. made4isp é a solução da Made4IT para ISPs.',
  cssPath: '../src/styles.css',

  // ── 01 Navbar ──────────────────────────────────────────────
  navbar: {
    logoSrc: '../assets/logo-made4it.svg',
    logoAlt: 'Made4IT',
    links: [
      { label: 'Produtos',  href: '/produtos' },
      { label: 'Soluções',  href: '/solucoes' },
      { label: 'Empresa',   href: '/empresa' },
      { label: 'Blog',      href: '/blog' },
      { label: 'Contato',   href: '#contato' },
    ],
    cta: { label: 'Fale com um especialista', href: '#contato' },
  },

  // ── 02 Hero ────────────────────────────────────────────────
  hero: {
    badge: 'made4isp',
    headline: 'Gerencie seu provedor com eficiência,<br><span class="text-accent">do cliente à rede</span>',
    description: 'Uma plataforma completa para ISPs: gestão de clientes, autenticação, financeiro e suporte técnico integrados.',
    ctaLabel: 'Solicitar demonstração',
    ctaHref: '#contato',
    ctaSecondLabel: 'Ver planos',
    ctaSecondHref: '#planos',
    bgImage: '../assets/hero-isp.jpg',
    align: 'left',
  },

  // ── 03 Stats ───────────────────────────────────────────────
  stats: {
    variant: 'dark2',
    stats: [
      {
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        value: '+500',
        label: 'provedores ativos',
      },
      {
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>',
        value: '2M+',
        label: 'assinantes gerenciados',
      },
      {
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        value: '99,9%',
        label: 'uptime garantido',
      },
      {
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        value: '24/7',
        label: 'suporte técnico',
      },
    ],
  },

  // ── Seções ─────────────────────────────────────────────────
  sections: [
    // 04 — O que é o made4isp
    {
      type: 'product',
      config: {
        eyebrow: 'A plataforma',
        headline: 'O que é o made4isp e como ele transforma seu provedor?',
        description: `<p>O made4isp é uma solução de gestão desenvolvida especificamente para provedores de internet. Reúne em uma única interface todos os módulos que seu ISP precisa para operar com eficiência.</p>
                      <p style="margin-top:12px">Da ativação do cliente à gestão financeira, do controle de rede ao suporte técnico, tudo integrado e acessível em tempo real.</p>`,
        ctaLabel: 'Conhecer todos os módulos',
        ctaHref: '#modulos',
        imageSrc: '../assets/made4isp-dashboard.png',
        imageAlt: 'Dashboard made4isp',
        imagePosition: 'right',
        variant: 'dark',
      },
    },

    // 05 — Cards de funcionalidades
    {
      type: 'featureCards',
      config: {
        eyebrow: 'Funcionalidades',
        headline: 'Tudo que seu provedor precisa em um só lugar',
        description: 'Módulos completos, integrados e prontos para uso.',
        columns: 3,
        variant: 'dark2',
        cards: [
          {
            icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
            title: 'Gestão de Clientes',
            description: 'Cadastro completo, histórico de atendimentos, documentos e contratos em um único perfil.',
          },
          {
            icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>',
            title: 'Autenticação RADIUS',
            description: 'Integração nativa com servidores RADIUS para autenticação PPPoE e IPoE de alta disponibilidade.',
          },
          {
            icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
            title: 'Financeiro Integrado',
            description: 'Emissão de boletos, Pix, controle de inadimplência e régua de cobrança automatizada.',
          },
          {
            icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
            title: 'Monitoramento de Rede',
            description: 'Visibilidade completa da infraestrutura com alertas em tempo real e mapas de topologia.',
          },
          {
            icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
            title: 'Central de Suporte',
            description: 'Abertura e acompanhamento de chamados, base de conhecimento e SLA configurável.',
          },
          {
            icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
            title: 'Relatórios Gerenciais',
            description: 'Dashboards executivos com KPIs de crescimento, receita, churn e qualidade de rede.',
          },
        ],
      },
    },

    // 06 — Vídeo
    {
      type: 'video',
      config: {
        headline: 'Veja o made4isp em ação',
        description: 'Assista à demonstração completa da plataforma e veja como simplificamos a gestão do seu provedor.',
        thumbSrc: '../assets/video-thumb-isp.jpg',
        videoUrl: 'https://www.youtube.com/embed/SEU_VIDEO_ID',
        ctaLabel: 'Solicitar demo personalizada',
        ctaHref: '#contato',
      },
    },

    // 07 — Benefícios
    {
      type: 'benefits',
      config: {
        eyebrow: 'Por que escolher o made4isp',
        headline: 'Impacto direto na eficiência operacional e na experiência do assinante',
        description: 'Provedores que adotam o made4isp relatam redução significativa no tempo de ativação e inadimplência.',
        imagePosition: 'left',
        imageSrc: '../assets/benefits-isp.jpg',
        imageAlt: 'Equipe técnica de provedor',
        variant: 'dark',
        benefits: [
          'Ativação de clientes em minutos, não horas',
          'Redução de inadimplência com cobrança automatizada',
          'Diagnóstico de falhas antes que o cliente perceba',
          'Portal self-service reduz tickets de suporte em até 40%',
          'Integração com os principais equipamentos do mercado',
          'API aberta para conectar com seu ERP ou CRM existente',
        ],
        ctaLabel: 'Falar com um especialista',
        ctaHref: '#contato',
      },
    },

    // 09 — Planos / Tabela Comparativa
    {
      type: 'compareTable',
      config: {
        eyebrow: 'Planos',
        headline: 'Escolha o plano ideal para o tamanho do seu provedor',
        highlightCol: 1,
        variant: 'dark2',
        columns: ['Recurso', 'Starter', 'Professional', 'Enterprise'],
        rows: [
          { label: 'Clientes ativos',          values: ['até 500',    'até 5.000',  'Ilimitado'] },
          { label: 'Autenticação RADIUS',       values: ['✓',          '✓',           '✓'] },
          { label: 'Financeiro integrado',      values: ['✓',          '✓',           '✓'] },
          { label: 'Monitoramento de rede',     values: ['✗',          '✓',           '✓'] },
          { label: 'Portal do assinante',       values: ['✗',          '✓',           '✓'] },
          { label: 'API acesso completo',       values: ['✗',          '✗',           '✓'] },
          { label: 'SLA de suporte',            values: ['8x5',        '16x7',        '24x7'] },
          { label: 'Onboarding dedicado',       values: ['✗',          '✗',           '✓'] },
        ],
      },
    },

    // 10 — Logos de parceiros certificados
    {
      type: 'logosBar',
      config: {
        label: 'Parceiros certificados',
        variant: 'dark',
        logos: [
          { src: '../assets/logos/mikrotik.svg',  alt: 'MikroTik' },
          { src: '../assets/logos/huawei.svg',    alt: 'Huawei' },
          { src: '../assets/logos/datacom.svg',   alt: 'Datacom' },
          { src: '../assets/logos/intelbras.svg', alt: 'Intelbras' },
          { src: '../assets/logos/cisco.svg',     alt: 'Cisco' },
        ],
      },
    },

    // 11 — Formulário de contato
    {
      type: 'contactForm',
      config: {
        eyebrow: 'Fale conosco',
        headline: 'Pronto para transformar seu provedor?',
        description: 'Preencha o formulário e um especialista entrará em contato em até 1 dia útil.',
        submitLabel: 'Quero uma demonstração',
        variant: 'dark2',
        fields: [
          { name: 'name',     label: 'Nome',          type: 'text',  placeholder: 'Seu nome completo' },
          { name: 'email',    label: 'E-mail',         type: 'email', placeholder: 'seu@email.com' },
          { name: 'company',  label: 'Empresa / ISP',  type: 'text',  placeholder: 'Nome do seu provedor' },
          { name: 'phone',    label: 'Telefone',       type: 'tel',   placeholder: '(00) 00000-0000' },
          {
            name: 'clients', label: 'Número de clientes', type: 'select',
            placeholder: 'Selecione uma faixa',
            options: ['Até 500', '500 a 2.000', '2.000 a 10.000', 'Acima de 10.000'],
          },
          { name: 'message',  label: 'Mensagem',       type: 'textarea', placeholder: 'Conte um pouco sobre seu provedor e o que você precisa.', full: true },
        ],
      },
    },
  ],

  // ── 12 Footer ──────────────────────────────────────────────
  footer: {
    logoSrc: '../assets/logo-made4it.svg',
    logoAlt: 'Made4IT',
    tagline: 'Soluções de software para provedores de internet e operadoras de telecomunicações.',
    copyright: '&copy; 2025 Made4IT Tecnologia. Todos os direitos reservados.',
    social: [
      {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
        href: 'https://linkedin.com/company/made4it',
      },
      {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>',
        href: 'https://twitter.com/made4it',
      },
    ],
    columns: [
      {
        title: 'Produtos',
        links: [
          { label: 'made4isp',    href: '/made4isp' },
          { label: 'made4flow',   href: '/made4flow' },
          { label: 'made4graph',  href: '/made4graph' },
          { label: 'made4noc',    href: '/made4noc' },
          { label: 'made4radius', href: '/made4radius' },
        ],
      },
      {
        title: 'Empresa',
        links: [
          { label: 'Sobre nós',   href: '/empresa' },
          { label: 'Cases',       href: '/cases' },
          { label: 'Blog',        href: '/blog' },
          { label: 'Carreiras',   href: '/carreiras' },
        ],
      },
      {
        title: 'Suporte',
        links: [
          { label: 'Documentação', href: '/docs' },
          { label: 'Status',       href: '/status' },
          { label: 'Contato',      href: '#contato' },
          { label: 'Privacidade',  href: '/privacidade' },
        ],
      },
    ],
  },
};

const html = buildPage(config);
fs.writeFileSync('made4isp.html', html, 'utf8');
console.log('✅  made4isp.html gerado com sucesso!');
