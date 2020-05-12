<p align="center"><img alt="Logotipo do Projeto" title="GoBarber" src=".github/logo.svg" width="400px" /></p>

# GoBarber Back-end

<p align="center">Autor: Jobson Gilberto Barros Amorim &lt;jobsonita@gmail.com&gt;</p>

Baseado nas aulas do curso [GoStack](https://rocketseat.com.br/gostack) (turma 11) da Rocketseat.

<p align="center"><img alt="Cobertura dos testes" title="Cobertura dos testes" src=".github/coverage.png" width="800px" /></p>

## Sobre este projeto

Este projeto demonstra a aplicação dos princípios de DDD e TDD em um back-end em NodeJS. Neste projeto, é utilizada a biblioteca jest.

Este repositório continua o desenvolvimento do back-end iniciado em [jobsonita/rocketseat-bootcamp-nivel02-modulo01](https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo01) e continuado em [jobsonita/rocketseat-bootcamp-nivel02-modulo02](https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo02).

Para maiores detalhes sobre o passo-a-passo da configuração do projeto, utilize a seção "Comandos utilizados na construção do projeto" deste readme em conjunto com o detalhamento dos [commits](https://github.com/jobsonita/rocketseat-bootcamp-nivel04-modulo01/commits/master) deste repositório.

Este projeto pode ser usado em conjunto com o front-end disponibilizado em [jobsonita/rocketseat-bootcamp-nivel03-modulo02](https://github.com/jobsonita/rocketseat-bootcamp-nivel03-modulo02).

## Dependências Globais

É necessário ter [Node](https://github.com/nvm-sh/nvm) e [Yarn](https://yarnpkg.com) instalados.

## Bibliotecas e ferramentas utilizadas

- express
- typescript
- eslint + prettier (padronização de código)
- typeorm (com PostgreSQL, biblioteca pg)
- jsonwebtoken (autenticação)
- multer (configurado para armazenamento local)
- tsyringe (injeção de dependências)
- jest (testes automatizados)
- [VS Code](https://code.visualstudio.com) (editor de código preferido)
- Docker (gerenciador de contêiners)
- Contêiner postgres (através do Docker)
- Postbird ou DBeaver (PostgreSQL GUI client)
- Insomnia (simulação de requisições HTTP REST)

## Instalação e execução

Com um terminal aberto na raiz do projeto, execute:

```
yarn
```

Após a instalação das bibliotecas, instale o Docker em sua máquina e crie uma réplica do contêiner postgres no docker:

```
docker run --name gostack_postgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres:11
```

O contêiner será ativado por padrão, mas confira usando a primeira linha abaixo e, se o contâiner não estiver ativo, execute a segunda linha para ativá-lo:

```
docker ps -a
docker start gostack_postgres
```

Após a criação do banco de dados, use um cliente sql de sua preferência (como Postbird ou DBeaver) para se conectar ao docker e crie um banco de dados chamado "gobarber". Em seguida, faça uma copia do arquivo .env.example com o nome .env e preencha os dados de conexão:

```
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_PORT = 5432
TYPEORM_USERNAME = postgres
TYPEORM_PASSWORD = your_password
TYPEORM_DATABASE = gobarber
TYPEORM_LOGGING = true
TYPEORM_ENTITIES_DIR = src/models
TYPEORM_MIGRATIONS_DIR = src/database/migrations
TYPEORM_ENTITIES = src/models/*.ts
TYPEORM_MIGRATIONS = src/database/migrations/*.ts
```

Com o terminal aberto na raiz do projeto, execute a migração das tabelas:

```
yarn typeorm migration:run
```

Finalmente, com um terminal aberto na raiz do projeto, execute:

```
yarn dev:server
```

Utilize uma ferramenta como o Insomnia para fazer requisições nas rotas descritas nos arquivos da pasta src/routes.

```
GET 'http://localhost:3333/appointments'
```

## Comandos utilizados na construção do projeto

Caso deseje configurar um projeto seguindo os passos dos commits, listo abaixo os comandos executados nesta terceira parte da configuração. Este projeto utiliza como base a branch nivel03modulo02 de [jobsonita/rocketseat-bootcamp-nivel02-modulo02](https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo02).

### Sessão 01

#### Aula 05

Configurar os caminhos dos imports no arquivo tsconfig.json:

```
"baseUrl": "./src",
"paths": {
  "@modules/*": ["modules/*"],
  "@config/*": ["config/*"],
  "@shared/*": ["shared/*"],
},
```

Atualizar os caminhos de migrations e entities no .env:

```
TYPEORM_ENTITIES_DIR = src/**/typeorm/entities
TYPEORM_MIGRATIONS_DIR = src/**/typeorm/migrations
TYPEORM_ENTITIES = src/**/typeorm/entities/*.ts
TYPEORM_MIGRATIONS = src/**/typeorm/migrations/*.ts
```

Configurar a lib que irá tratar os caminhos definidos acima

```
yarn add tsconfig-paths -D
```

Alterar os scripts dev:server e start do package.json adicionando o argumento:

```
-r tsconfig-paths/register
```

#### Aula 09

Alterei os caminhos de migrations e entities para ser um pouco mais específico:

```
TYPEORM_ENTITIES_DIR = src/modules/*/infra/typeorm/entities
TYPEORM_MIGRATIONS_DIR = src/shared/infra/typeorm/migrations
TYPEORM_ENTITIES = src/modules/*/infra/typeorm/entities/*.ts
TYPEORM_MIGRATIONS = src/shared/infra/typeorm/migrations/*.ts
```

#### Aula 10

```
yarn add tsyringe
```

Para evitar que o eslint reclame sobre `no-useless-constructor`, adicionar a linha abaixo às regras no eslintrc:

```
"no-useless-constructor": "off",
```

ou reescrever o código de um modo mais verboso:

```
  private appointmentsRepository: IAppointmentsRepository

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository
  ) {
    this.appointmentsRepository = appointmentsRepository
  }
```

### Sessão 02

#### Aula 02

```
yarn add jest -D
```
Se durante os testes o ts-jest avisar sobre incompatibilidade com a versão do jest, execute:

```
yarn remove jest -D
yarn add jest@<26.0.0 -D
```

Configurações do jest:

```
yarn jest --init
```

```
? Would you like to use Jest when running "test" script in "package.json"
> y
? Choose the test environment that will be used for testing
> node
? Do you want Jest to add coverage reports?
> n
? Automatically clear mock calls and instances between every test?
> y
```

Compatibilidade com typescript e tipagem:

```
yarn add ts-jest -D
yarn add @types/jest -D
```

#### Aula 04

Configurar `moduleNameMapper` no arquivo jest.config.js para utilizar os caminhos dos imports do arquivo tsconfig.json
