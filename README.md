
# IoT Monitoring Frontend

## Descrição do Projeto

Este projeto é o frontend da aplicação de monitoramento de dispositivos IoT. A aplicação permite que os usuários se autentiquem, visualizem dispositivos cadastrados, gerem comandos e visualizem dados de telemetria em gráficos interativos.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Material-UI**: Biblioteca de componentes React para um design limpo e responsivo.
- **Chart.js**: Biblioteca para criação de gráficos dinâmicos e interativos.
- **React Router**: Biblioteca para roteamento e navegação no React.
- **Fetch API**: Para fazer requisições HTTP ao backend.

## Funcionalidades

- **Autenticação de Usuários**: Login e logout seguros.
- **Visualização de Dispositivos**: Listagem e detalhamento de dispositivos IoT cadastrados.
- **Geração de Comandos**: Envio de comandos para dispositivos e exibição da resposta em tempo real.
- **Visualização de Dados**: Gráficos interativos para visualização dos dados de telemetria dos dispositivos.

## Configuração do Projeto

1. Clone o repositório:

   \`\`\`bash
   git clone https://github.com/giovannijvieira/IoTMonitoringFrontend
   \`\`\`
   \`\``
    cd IoTMonitoringFrontend
   \`\`\`

3. Instale as dependências:

   \`\`\`bash
   npm install
   \`\`\`

4. Inicie o servidor de desenvolvimento:

   \`\`\`bash
   npm start
   \`\`\`

5. Acesse a aplicação em seu navegador:

   \`\`\`
   http://localhost:3000
   \`\`\`

## Estrutura do Projeto

- **src/**
  - **components/**: Componentes reutilizáveis da aplicação.
  - **pages/**: Páginas principais da aplicação (Login, Dashboard, Device Selection).
  - **App.js**: Componente principal da aplicação.
  - **index.js**: Ponto de entrada da aplicação.

## Decisões de Design e Implementação

### Componentização

Optamos por dividir a aplicação em componentes reutilizáveis para melhorar a manutenibilidade e a reutilização de código. Os componentes estão organizados em pastas específicas conforme sua função na aplicação.

### Interface de Usuário

Utilizei o Material-UI para garantir uma interface de usuário moderna, responsiva e acessível. A biblioteca facilita a criação de componentes visuais consistentes e personalizáveis.

### Gráficos

Para visualização de dados, utilizamos o Chart.js integrado com React através do react-chartjs-2. Escolhi essa combinação devido à sua flexibilidade e capacidade de criar gráficos interativos.

### Roteamento

Implementei o roteamento com React Router para navegação entre diferentes páginas da aplicação. Isso permite uma experiência de usuário mais fluida e eficiente.

## Sugestões de Melhorias e Avanços Futuros

- **Testes Automatizados**: Adicionar testes unitários e de integração para garantir a qualidade do código.
- **Internacionalização**: Implementar suporte a múltiplos idiomas.
- **Otimização de Performance**: Melhorar a performance da aplicação através de técnicas como lazy loading e memorization.
- **Notificações em Tempo Real**: Integrar WebSockets para receber atualizações em tempo real dos dispositivos.
- **Dashboard Personalizável**: Permitir que os usuários personalizem a disposição e o tipo de gráficos exibidos no dashboard.

## Pontos Fortes

- **Modularidade**: Estrutura modular e bem organizada que facilita a manutenção e a escalabilidade.
- **Interface Atraente**: UI moderna e intuitiva utilizando Material-UI.
- **Visualização de Dados**: Gráficos interativos e dinâmicos que melhoram a visualização dos dados de telemetria.

## Configuração de Variáveis de Ambiente

Cria um arquivo `.env` na raiz do projeto com as variáveis de ambiente que será enviadas por e-mail.


Essas variáveis serão enviadas por email para garantir a segurança e a privacidade das informações sensíveis.

## Contato

Para mais informações ou dúvidas, entre em contato direto por favor.
