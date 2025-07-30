# Testes E2E - Plano de Avaliação

Projeto de testes automatizados end-to-end para o sistema do Planejamento Acadêmico, focado na funcionalidade de cadastro do Plano de Avaliação.

## 📋 Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- Acesso ao ambiente de desenvolvimento: `https://cloudapp-dev.animaeducacao.com.br`

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd test-plano-avaliacao-e2e
```

2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Execução dos Testes

### Modo Interativo (Cypress Dashboard)
```bash
npx cypress open
```

### Modo Headless (Terminal)
```bash
npx cypress run
```

### Executar teste específico
```bash
npx cypress run --spec "cypress/e2e/cadastroPage.js"
```

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── cadastroPage.js     # Testes principais
│   └── elements.js         # Seletores de elementos
├── fixtures/               # Dados de teste
├── support/               # Comandos customizados
└── videos/                # Gravações dos testes
```

## 🧪 Funcionalidades Testadas

- ✅ Acesso inicial ao sistema
- ✅ Navegação para Plano de Avaliação
- ✅ Configurações gerais do plano
- ✅ Seleção de avaliações (A1, A2, etc.)

## ⚙️ Configurações

O projeto está configurado para:
- **Base URL**: `https://cloudapp-dev.animaeducacao.com.br`
- **Timeout padrão**: 10-20 segundos
- **Suporte a iframes**: Comandos customizados implementados

## 🔧 Comandos Customizados

- `cy.getIframeBody()` - Acessa conteúdo dentro de iframes

## 📝 Observações

- Os testes utilizam `cy.wait()` para aguardar carregamento de elementos dinâmicos
- Elementos de dropdown requerem simulação de eventos de mouse (`mousedown`)
- Todos os testes são executados dentro de iframes

## 🐛 Troubleshooting

**Elemento não encontrado:**
- Verifique se está usando `cy.getIframeBody()` para elementos dentro do iframe
- Aumente o timeout se necessário

**Dropdown não funciona:**
- Use `trigger('mousedown')` em vez de `click()` para elementos de lista