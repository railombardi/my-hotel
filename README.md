# MyHotel

Este é um sistema de reserva de hotéis desenvolvido com Vue.js, utilizando TypeScript, Vue Router, Pinia para gerenciamento de estado, Vuetify para os componentes de interface e json-server para simulação de API.

## Funcionalidades

1. **Pesquisa de Hotéis**

   - Permite ao usuário inserir critérios como destino, datas de check-in e check-out, número de quartos e número de hóspedes.
   - Exibe resultados da pesquisa ordenáveis por preço, avaliações e outros critérios.

2. **Comparação de Opções**

   - Permite seleção múltipla de hotéis para comparar características lado a lado.

3. **Reserva de Quartos**

   - Formulário para reserva de quarto em um hotel selecionado, solicitando nome do usuário, contato e detalhes de pagamento.

4. **Notificações**
   - Mecanismo de notificação para informar ao usuário sobre o status da reserva.

## Tecnologias Utilizadas

- **Vue.js** - Framework JavaScript progressivo para construção de interfaces de usuário.
- **TypeScript** - Superset JavaScript para desenvolvimento mais escalável.
- **Vue Router** - Gerenciamento de rotas para navegação na aplicação.
- **Pinia** - Estado global com reatividade e tipagem forte.
- **Vuetify** - Biblioteca de componentes Vue para uma interface de usuário rica e responsiva.
- **Mock Service APIs** - Simulação de chamadas de API para busca e reserva de hotéis.
- **Lazy Loading e Code Splitting** - Otimização de desempenho carregando componentes sob demanda.
- **GitHub Actions** - Pipeline básico de CI/CD configurado para automação de builds e testes.

## Instalação e Uso

### Pré-requisitos

- Node.js e npm instalados globalmente.

### Instalação

1. Clone o repositório do projeto:

```
git clone https://github.com/railombardi/my-hotel
```

2. Instale as dependências:

```
cd my-hotel
npm install
```

3. Rode o script para alimentar a api simulada:

```
node --experimental-modules generateHotels.mjs
```

### Execução

Para iniciar o servidor de desenvolvimento:

```
npm run dev
```

Para rodar a api simulada json-server:

```
json-server --watch db.json
```

Acesse a aplicação em `http://localhost:5173` (ou outra porta especificada no console).

### Build para Produção

Para compilar e minificar os arquivos para produção:

```
npm run build
```

### Testes

Para executar os testes unitários:

```
npm run test:unit
```

### Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
