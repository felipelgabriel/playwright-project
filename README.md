# Playwright Cucumber Automation Framework

<p align="center">

**Framework de Automação de Testes Web e API**

Desenvolvido com Playwright, Cucumber, Gherkin e JavaScript.

</p>

<p align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Playwright](https://img.shields.io/badge/Playwright-Automation-45ba4b?logo=playwright)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

## Sobre o projeto

Este repositório apresenta o desenvolvimento de um framework de automação de testes utilizando **Playwright, Cucumber, Gherkin e JavaScript**, aplicando boas práticas de engenharia de qualidade de software e desenvolvimento orientado a comportamento (BDD).

O objetivo é demonstrar conhecimentos práticos em automação de testes moderna, contemplando testes de interface (Web UI), testes de APIs REST, testes de integração, arquitetura de automação e integração contínua.

A aplicação utilizada como objeto de teste é a [Restful Booker Platform](https://automationintesting.online/), uma plataforma de demonstração para gerenciamento de hospedagens e reservas.

O framework está sendo desenvolvido com foco em escalabilidade, manutenibilidade, reutilização de código e confiabilidade dos testes.

## Tecnologias e ferramentas

| Tecnologia | Finalidade |
|---|---|
| JavaScript (ES6+) | Linguagem de programação |
| Node.js | Ambiente de execução |
| npm | Gerenciamento de dependências |
| Playwright | Automação Web e API |
| Cucumber.js | Gerenciamento e execução dos testes BDD |
| Gherkin | Especificação dos cenários de teste |
| @playwright/test | Assertions do Playwright |
| WebStorm | IDE de desenvolvimento |
| Git / GitHub | Versionamento de código |

## Aplicação sob teste

**Restful Booker Platform**

- Aplicação Web: https://automationintesting.online/
- Documentação da API: [Postman Collection](https://www.postman.com/automation-in-testing/restful-booker-collections/documentation/ci13ds3/restful-booker-platform)
- Código-fonte: https://github.com/mwinteringham/restful-booker-platform

A aplicação disponibiliza funcionalidades de negócio que permitem desenvolver diferentes estratégias de testes, incluindo:

- Consulta e gerenciamento de quartos.
- Consulta de disponibilidade.
- Criação e gerenciamento de reservas.
- Autenticação e autorização administrativa.
- Envio e gerenciamento de mensagens.
- Operações por meio de APIs REST.

## Arquitetura do framework

O projeto utiliza uma arquitetura em camadas, separando as especificações funcionais, implementação dos passos, interações com a interface, comunicação com APIs e utilitários compartilhados.

```text
playwright-project/
│
├── features/
│   ├── web/
│   │   ├── home.feature
│   │   └── booking.feature
│   │
│   └── api/
│       ├── authentication/
│       ├── rooms/
│       └── booking/
│
├── step-definitions/
│   ├── web/
│   └── api/
│
├── pages/
│   └── HomePage.js
│
├── clients/
│
├── support/
│   ├── hooks.js
│   ├── world.js
│   └── fixtures/
│
├── utils/
│
├── reports/
│
├── cucumber.js
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidades das camadas

| Camada | Responsabilidade |
|---|---|
| Features | Cenários de negócio escritos em Gherkin |
| Step Definitions | Conectar os passos Gherkin ao código de automação |
| Pages | Implementação do Page Object Model |
| Clients | Camada de comunicação com APIs REST |
| Support | Hooks, World e gerenciamento do ciclo de vida dos testes |
| Fixtures | Gerenciamento de contexto e dependências |
| Utils | Funções auxiliares reutilizáveis |
| Reports | Relatórios e evidências das execuções |

## Padrões e boas práticas

O framework está sendo desenvolvido considerando os seguintes conceitos:

### Behavior-Driven Development (BDD)

Utilização de Gherkin para especificar comportamentos e regras de negócio em uma linguagem compreensível por profissionais técnicos e não técnicos.

### Page Object Model (POM)

Encapsulamento dos locators e das operações das páginas em classes específicas, promovendo reutilização, organização e facilidade de manutenção.

### API Client Pattern

Organização das comunicações HTTP em classes específicas, separando as operações de API dos cenários de negócio.

### Hooks e World

Utilização dos Hooks do Cucumber para gerenciamento do ciclo de vida dos testes e do World para compartilhamento isolado de contexto entre os passos de cada cenário.

### Gerenciamento de massa de testes

Utilização de dados dinâmicos e fábricas de dados para reduzir dependências entre cenários e evitar conflitos durante as execuções.

### Assertions confiáveis

Utilização das assertions do Playwright para validar comportamentos da aplicação, aproveitando mecanismos de espera automática e reduzindo problemas de sincronização.

## Estratégia e cobertura de testes

O framework está sendo desenvolvido para contemplar as seguintes áreas:

| Área de teste | Escopo | Status |
|---|---|---|
| Testes Web | Navegação e validação de páginas | Em desenvolvimento |
| Testes de Reservas | Disponibilidade e fluxo de reservas | Em desenvolvimento |
| Testes de API | Endpoints REST e respostas HTTP | Planejado |
| Autenticação | Login, tokens e autorização | Planejado |
| Testes de Integração | Integração entre Web e API | Planejado |
| Testes Negativos | Entradas inválidas e validações de negócio | Planejado |
| Testes de Regressão | Validação de funcionalidades existentes | Planejado |

## Configuração do ambiente

### Pré-requisitos

Antes de iniciar, certifique-se de possuir:

- Node.js 20 ou superior.
- npm.
- Git.
- WebStorm ou outra IDE compatível com JavaScript.

Verifique as versões instaladas:

```bash
node -v
npm -v
```

### Instalação

**1. Clonar o repositório**

```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

**2. Acessar o diretório do projeto**

```bash
cd playwright-project
```

**3. Instalar as dependências**

```bash
npm install
```

**4. Instalar os navegadores do Playwright**

```bash
npx playwright install
```

Após esses passos, o ambiente estará preparado para executar os testes.

## Executando os testes

O Cucumber.js é responsável pela execução dos cenários BDD, enquanto o Playwright realiza as interações com o navegador e as requisições HTTP.

### Executar todos os testes

```bash
npm test
```

### Executar testes Web

```bash
npm run test:web
```

### Executar testes de API

```bash
npm run test:api
```

### Executar cenários por tags

Executar somente cenários marcados com `@booking`:

```bash
npx cucumber-js --tags @booking
```

Executar cenários marcados com `@web`:

```bash
npx cucumber-js --tags @web
```

## Exemplo de cenário Gherkin

O exemplo abaixo demonstra a abordagem BDD utilizada no projeto.

```gherkin
# language: pt

@web @smoke
Funcionalidade: Página inicial

  Como visitante
  Quero acessar o site da pousada
  Para conhecer os serviços oferecidos

  Cenário: Acessar a página inicial com sucesso

    Dado que acesso a aplicação Restful Booker
    Então a página inicial deve ser carregada corretamente
```

## Execução dos testes

O Cucumber apresenta os resultados da execução dos cenários e dos respectivos passos.

Exemplo:

```text
2 hooks (2 passed)
1 scenario (1 passed)
4 steps (4 passed)
```

Relatórios detalhados, screenshots e outras evidências serão incorporados conforme a evolução do framework.

## Integração contínua (CI/CD)

Está prevista a integração com GitHub Actions para automatizar a execução dos testes por meio de pipelines de CI.

Entre os objetivos dessa integração estão:

- Execução automática em push e pull requests.
- Execução de testes de regressão.
- Publicação dos resultados das execuções.
- Armazenamento de evidências de falhas.
- Validação contínua do comportamento da aplicação.

## Roadmap do projeto

Evolução planejada do framework:

- [x] Configuração inicial do projeto.
- [x] Integração Playwright e Cucumber.
- [x] Configuração do Gherkin.
- [x] Gerenciamento do ciclo de vida do navegador com Hooks.
- [x] Primeiro cenário de automação Web.
- [x] Implementação inicial do Page Object Model.
- [ ] Evolução da arquitetura de Page Objects.
- [ ] Cenários de consulta de disponibilidade.
- [ ] Automação de reservas.
- [ ] Automação de APIs com Playwright APIRequestContext.
- [ ] Arquitetura de API Clients.
- [ ] Cenários de autenticação e autorização.
- [ ] Testes de integração Web + API.
- [ ] Gerenciamento dinâmico de massa de dados.
- [ ] Testes negativos e validações avançadas.
- [ ] Relatórios HTML e evidências de execução.
- [ ] Execução paralela.
- [ ] Integração com GitHub Actions.

## Princípios de engenharia

O desenvolvimento do framework segue os seguintes princípios:

- Código de automação reutilizável e de fácil manutenção.
- Separação de responsabilidades.
- Cenários independentes e isolados.
- Utilização de locators confiáveis.
- Gerenciamento dinâmico de massa de testes.
- Evitar esperas fixas desnecessárias.
- Padronização de nomenclaturas.
- Cobertura baseada em regras de negócio.
- Evolução contínua da arquitetura.

## Autor

**Felipe Gabriel**

QA Automation Engineer | Senior QA Analyst

Projeto desenvolvido como parte do meu portfólio profissional, demonstrando conhecimentos práticos em automação de testes, desenvolvimento de frameworks, BDD, Playwright, Cucumber, JavaScript, testes Web e APIs REST.

---

<p align="center">

**Desenvolvido com foco em Qualidade, Confiabilidade e Engenharia de Automação de Testes.**

</p>