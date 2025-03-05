# API NestJS - Relatório de Posts
Esta API foi desenvolvida para gerenciar posts e gerar relatórios com informações como título, número de comentários, visualizações, curtidas e não curtidas. Abaixo estão detalhes sobre a stack utilizada, as escolhas tecnológicas e como configurar o projeto.

## 🛠️ Stack Utilizada
Linguagem de Programação
-Node.js (v23.7.0)
  Escolhido por sua ampla adoção, suporte a operações assíncronas e grande ecossistema de pacotes.

- TypeScript (v5.x)
  Adotado para adicionar tipagem estática ao JavaScript, melhorando a segurança e a manutenção do código.

Framework
- NestJS (v10.x)
  Escolhido por ser um framework progressivo e escalável, que combina elementos de programação orientada a objetos, programação funcional e programação reativa. Ele também oferece suporte nativo ao TypeScript e uma arquitetura modular.

Banco de Dados
- PostgreSQL (v17.x)
  Escolhido por ser um banco de dados relacional robusto, com suporte a transações ACID e ampla adoção em aplicações críticas.

- TypeORM (v0.3.x)
  Utilizado como ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados e mapear entidades para tabelas.

Autenticação e Autorização
- @nestjs/passport (v11.x)  
  Utilizado para implementar autenticação via JWT (JSON Web Tokens).

- argon (v0.41.x)
  Utilizado para criptografar senhas antes de armazená-las no banco de dados.

Validação de Dados
- class-validator (v0.14.x)
  Utilizado para validar dados de entrada com decorators.

- class-transformer (v0.5.x)
  Utilizado para transformar objetos (por exemplo, de DTOs para entidades).


Outros Pacotes
- multer (v1.4.x)
  Utilizado para manipular uploads de arquivos (por exemplo, imagens para posts).

- serve-static (v1.15.x)
  Utilizado para servir arquivos estáticos (por exemplo, imagens armazenadas no servidor).

## 🚀 Por que NestJS?
- O NestJS foi escolhido por ser um framework moderno e altamente escalável, que combina as melhores práticas de desenvolvimento de software. Ele oferece:

- Arquitetura Modular: Facilita a organização do código em módulos independentes.
- Suporte a TypeScript: Melhora a segurança e a manutenção do código com tipagem estática.
- Integração com ORMs: Facilita a interação com bancos de dados.
- Documentação Automática: Com o Swagger, é fácil gerar e manter a documentação da API.
- Ecossistema Robustos: Integração com ferramentas populares como Passport, TypeORM e Jest.

## 🗃️ Banco de Dados
- PostgreSQL
Escolha: PostgreSQL foi escolhido por ser um banco de dados relacional robusto, com suporte a transações ACID e ampla adoção em aplicações críticas.

Configuração:
```
Host: localhost
Porta: 5432
Usuário: postgres
Senha: Definida no arquivo .env
Banco de Dados: posts_db
```

- TypeORM
Escolha: TypeORM foi escolhido por ser um ORM que suporta TypeScript e facilita o mapeamento de entidades para tabelas no banco de dados.

Configuração:
As entidades são definidas como classes TypeScript e mapeadas automaticamente para tabelas no banco de dados.


## 📦 Pacotes Adicionais
Dependências Principais
@nestjs/core: Core do NestJS.
@nestjs/platform-express: Integração com o Express.
@nestjs/jwt: Suporte a JWT para autenticação.
@nestjs/passport: Integração com Passport.js.
@nestjs/swagger: Geração de documentação automática da API.
typeorm: ORM para interação com o banco de dados.
pg: Driver do PostgreSQL para TypeORM.


## Funcionalidades implementadas
- Autenticação (accessToken, refreshToken)
- CRUD Post
- CRUD Comment
- Relatório de postagem (titulo, numero de comentarios, likes)
- A postagem tem a possibilidade de adicionar uma imagem
- A postagem tem um contador de curtidas 

- Validações de segurança 
  1. Usuário só pode editar ou excluir o seu próprio post
  2. Usuário ou responsavel pelo post pode excluir o post
  3. Apenas o próprio usuário pode editar ou excluir as postagens
  4. Usuário da postagem também pode remover o comentário



## 🛠️ Configuração do Projeto
Pré-requisitos
- Node.js (v18.x ou superior)
- PostgreSQL (v15.x ou superior)
- npm ou yarn

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/nestjs-posts-api.git
cd nestjs-posts-api
```

2. Instale as dependências:
```
npm install
```

3. Configure o arquivo .env:
```
Modificar as variaveis na pasta src/main/app.module

JWT_ACCESS_SECRET=chave_secreta
JWT_REFRESH_SECRET=sua_chave_secreta
```

4. Inicie o servidor:
```
npm run start
```