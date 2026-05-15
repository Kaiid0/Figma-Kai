# Made4IT — Page Builder

Sistema de funções para gerar páginas de produto seguindo o design padrão do site Made4IT.

---

## Estrutura dos arquivos

```
src/
├── styles.css          ← CSS completo do design system
├── page-builder.js     ← Funções de construção de seções
├── example-made4isp.js ← Exemplo completo (made4isp)
└── COMO-USAR.md        ← Este arquivo
```

---

## Como gerar uma nova página

1. Crie um novo arquivo `minha-pagina.js`
2. Importe o `buildPage` do `page-builder.js`
3. Passe um objeto de configuração com os textos de cada seção
4. Execute o script para gerar o HTML

```js
const { buildPage } = require('./page-builder');
const fs = require('fs');

const html = buildPage({ /* sua config aqui */ });
fs.writeFileSync('minha-pagina.html', html, 'utf8');
```

---

## Anatomia de uma página

Cada página é composta por blocos na seguinte ordem padrão:

| # | Bloco            | Obrigatório | Função               |
|---|------------------|-------------|----------------------|
| 1 | Navbar           | Sim         | `buildNavbar`        |
| 2 | Hero             | Sim         | `buildHero`          |
| 3 | Stats Bar        | Recomendado | `buildStatsBar`      |
| 4 | Seção Produto    | Sim         | `buildProductSection`|
| 5 | Cards Features   | Sim         | `buildFeatureCards`  |
| 6 | Seção Vídeo      | Opcional    | `buildVideoSection`  |
| 7 | Benefícios       | Sim         | `buildBenefitsSection`|
| 8 | Highlight Banner | Opcional    | `buildHighlightBanner`|
| 9 | Tabela Comparativa| Opcional   | `buildCompareTable`  |
|10 | Barra de Logos   | Sim         | `buildLogosBar`      |
|11 | Formulário       | Sim         | `buildContactForm`   |
|12 | Footer           | Sim         | `buildFooter`        |

---

## Configuração de cada bloco

### Hero
```js
hero: {
  badge: 'made4isp',                  // Tag colorida acima do título
  headline: 'Título principal',        // Aceita HTML (<span>, <br>)
  subheadline: 'Complemento',          // Exibido em ciano abaixo do título
  description: 'Texto descritivo',
  ctaLabel: 'Solicitar demo',
  ctaHref: '#contato',
  ctaSecondLabel: 'Ver planos',        // Botão secundário (opcional)
  ctaSecondHref: '#planos',
  bgImage: '../assets/hero.jpg',
  align: 'left',                       // 'left' ou 'center'
}
```

### Stats Bar
```js
stats: {
  variant: 'dark2',                    // 'dark', 'dark2' ou 'light'
  stats: [
    { icon: '<svg>...</svg>', value: '+500', label: 'provedores ativos' },
  ]
}
```

### Seção Produto ("O que é")
```js
{
  type: 'product',
  config: {
    eyebrow: 'Texto pequeno acima',
    headline: 'Título da seção',
    description: '<p>Texto HTML</p>',
    ctaLabel: 'Saiba mais',
    ctaHref: '#',
    imageSrc: '../assets/dashboard.png',
    imagePosition: 'right',            // 'right' ou 'left'
    variant: 'dark',                   // 'dark' ou 'dark2'
  }
}
```

### Cards de Funcionalidades
```js
{
  type: 'featureCards',
  config: {
    eyebrow: 'Funcionalidades',
    headline: 'Tudo que você precisa',
    description: 'Subtítulo opcional',
    columns: 3,                        // 2, 3 ou 4
    variant: 'dark2',
    cards: [
      {
        icon: '<svg>...</svg>',
        title: 'Nome do recurso',
        description: 'Descrição breve do recurso.',
      },
    ]
  }
}
```

### Seção de Vídeo
```js
{
  type: 'video',
  config: {
    headline: 'Veja em ação',
    description: 'Texto opcional',
    thumbSrc: '../assets/thumb.jpg',
    videoUrl: 'https://youtube.com/embed/ID',
    ctaLabel: 'Solicitar demo',
    ctaHref: '#contato',
  }
}
```

### Benefícios
```js
{
  type: 'benefits',
  config: {
    eyebrow: 'Por que escolher',
    headline: 'Impacto real no seu negócio',
    description: 'Parágrafo opcional',
    imagePosition: 'left',             // 'left' ou 'right'
    imageSrc: '../assets/foto.jpg',
    variant: 'dark',
    benefits: [
      'Benefício 1',
      'Benefício 2',
    ],
    ctaLabel: 'Falar com especialista',
    ctaHref: '#contato',
  }
}
```

### Tabela Comparativa
```js
{
  type: 'compareTable',
  config: {
    eyebrow: 'Planos',
    headline: 'Escolha o plano ideal',
    highlightCol: 1,                   // Índice da coluna destacada (0=primeira col de dado)
    columns: ['Recurso', 'Starter', 'Pro', 'Enterprise'],
    rows: [
      { label: 'Clientes',   values: ['100',  '1.000',  'Ilimitado'] },
      { label: 'Suporte',    values: ['✓',    '✓',       '✓'] },
      { label: 'API',        values: ['✗',    '✗',       '✓'] },
    ]
  }
}
```

### Formulário de Contato
```js
{
  type: 'contactForm',
  config: {
    eyebrow: 'Fale conosco',
    headline: 'Pronto para começar?',
    description: 'Texto explicativo',
    submitLabel: 'Enviar mensagem',
    fields: [
      { name: 'name',    label: 'Nome',    type: 'text',  placeholder: 'Seu nome' },
      { name: 'email',   label: 'E-mail',  type: 'email', placeholder: 'email@empresa.com' },
      // type pode ser: 'text', 'email', 'tel', 'select', 'textarea'
      // Para select, adicione: options: ['Opção 1', 'Opção 2']
      // Para ocupar linha inteira, adicione: full: true
    ]
  }
}
```

---

## Paleta de cores (CSS variables)

| Variável             | Valor          | Uso                     |
|----------------------|----------------|-------------------------|
| `--accent-cyan`      | `#00d4ff`      | Destaques, CTAs, ícones |
| `--accent-blue`      | `#0066cc`      | Links, botões secundários|
| `--bg-dark`          | `#050a14`      | Fundo principal         |
| `--bg-dark-2`        | `#080f1e`      | Seções alternadas       |
| `--bg-dark-card`     | `#0d1627`      | Cards                   |
| `--text-white`       | `#ffffff`      | Títulos                 |
| `--text-light`       | `#c8d6e8`      | Corpo de texto          |
| `--text-muted`       | `#7a90aa`      | Legendas, meta textos   |

---

## Como pedir uma nova página

Forneça os textos neste formato e a página será gerada automaticamente:

```
Página: [nome-da-pagina]

Hero:
  - Badge: [texto do badge]
  - Headline: [título principal]
  - Subtítulo: [complemento em ciano]
  - Descrição: [parágrafo]
  - CTA: [texto do botão]

Stats: [número + label para cada métrica]

O que é (seção produto):
  - Título: ...
  - Descrição: ...

Cards de funcionalidades (3 ou 4 cards):
  - Card 1: Título + Descrição
  - Card 2: ...

Benefícios (lista com 4-6 itens):
  - ...

Tabela de planos:
  - Colunas: Starter / Pro / Enterprise
  - Linhas: [recurso + valores por plano]

Formulário: [campos necessários além dos padrão]
```
