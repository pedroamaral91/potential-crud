### Developers CRUD

---

##### Aplicação web/api (ReactJS e NestJS)

Para executar a aplicação, faça o clone do projeto, acesse a pasta onde foi clonado e execute:
`yarn install`\
`docker-compose build`\
E após:\
`docker-compose up`

Criei uma estrutura **monorepo**, e para gerenciar os pacotes da aplicação, estou utilizando o **yarn workspaces** para fazer hoisting de todos os pacotes necessários.

A porta exposta pelo docker é\
`3000` - Frontend\
`3333` - Api\
`5551` - Postgres

### Testes

Criei um ambiente para testes de integração também, um banco identico utilizado no projeto, porém de teste. Criei utils para criar ambientes de testes e uma factory para ser utilizada como fixtures nos testes. Para executar teste de integração, ler a sessão **Comandos**

### Seeders

Criei um móduloo para seeder, caso queira adicionar dados fakes no banco de dados para facilitar o teste na hora de paginar, buscar por nome/idade, remoção. O comando para executar a seeder é: `yarn api:seed`. Eu adicionei na **factory** 25 developers fake. Fique a vontade para alterar o arquivo de seeder e adicionar quantos for necessário.

### Comandos

Adicionei alguns comandos no _package.json_ na raiz do projeto, segue alguns:

- `yarn api:test` - Roda testes de integração e unitários no backend
- `yarn api:test:integration` - Roda testes de integração no backend
- `yarn api:test:unit` - Roda testes unitários no backend
- `yarn web:test` - Roda testes no frontend

Os demais comandos foram utilizados na hora de desenvolvimento, caso necessite, estão todos no arquivo na área `scripts`.

##### Considerações

- Disponibilizei o `.env` no repositório para facilitar a vida para quem for rodar o projeto.
- Adicionei a flag `--network-timeout 100000` no `yarn bootstrap`. Isso foi devido a network do docker no macOS estar muito lenta. Segue uma issue sobre a questão: [Link da issue](https://github.com/docker/for-mac/issues/3497)
- Optei por utilizar o hook `useRef` em algumas situações para evitar a re-renderização do componente. Alguns estados não tem necessidade de forçar a renderização do componente.
