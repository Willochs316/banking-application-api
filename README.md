<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Title: Banking Application

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Description

This is a Banking Application built with NestJS. It offers essential functionality for handling deposits, withdrawals, transaction history, and user authentication/authorization in a secure and efficient manner. It serves as the core backend system for a basic digital banking platform.

## Key Features:

### User Authentication and Authorization:

- Secure user registration and login mechanisms.
- JWT (JSON Web Token) for secure and stateless authentication.

### Deposits:

- Users can initiate deposits to their accounts.
- Support for multiple deposit methods (e.g., cash, check, electronic transfer).

### Withdrawals:

- Users can request withdrawals from their accounts.
- Withdrawal requests are processed securely, with appropriate validation.
- Account balance adjustments after successful withdrawals.

### Transaction History:

- Users can retrieve their transaction history.
- Transaction history includes details like date, type (deposit or withdrawal), amount, and transaction ID.

## Frameworks and Libraries:

1. NestJS:

    - `@nestjs/common:` Common utilities and decorators for building NestJS applications.
    - `@nestjs/core:` Core functionalities of NestJS, including the application context and module system.
    - `@nestjs/jwt:` JWT (JSON Web Tokens) integration for authentication.
    - `@nestjs/mongoose:` Mongoose integration for MongoDB.
    - `@nestjs/passport:` Passport.js integration for authentication.
    - `@nestjs/platform-express:` Express platform integration for NestJS.
    - `@nestjs/swagger:` Swagger/OpenAPI documentation for the API.

2. Authentication and Security:

    - `@nestjs/jwt:` For generating and validating JWT tokens.
    - `@nestjs/passport:` For integrating Passport.js authentication strategies.
    - `passport:` Core Passport.js library for authentication.
    - `passport-jwt:` JWT strategy for Passport.js.
    - `bcrypt:` For hashing and verifying passwords.
    - `jsonwebtoken:` For generating and verifying JWT tokens.

3. Database:

    - `mongoose:` ODM (Object Data Modeling) library for MongoDB.

4. Validation and Transformation:

    - `class-transformer:` For transforming class instances to and from plain objects.
    - `class-validator:` For validating class instances using decorators.

5. Environment Variables:

    - `dotenv:` For loading environment variables from a `.env` file.

6. Testing:

    - `jest:` JavaScript testing framework.
    - `@types/jest:` TypeScript definitions for Jest.
    - `ts-jest:` Jest transformer for TypeScript.
    - `supertest:` Library for testing HTTP servers.
    - `@types/supertest:` TypeScript definitions for Supertest.

7. TypeScript:

    - `typescript:` TypeScript compiler.
    - `ts-loader:` Webpack loader for TypeScript.
    - `ts-node:` TypeScript execution and REPL for Node.js.
    - `tsconfig-paths:` TypeScript module resolution for Webpack and Node.js.

## Swagger Documentation:

- Access API documentation at http://localhost:5000/api/.
- Comprehensive Swagger documentation to understand API endpoints and usage.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Willochs Ojigbo](https://dev.to/willochs316)
- Linkedin - [@willochs316](https://www.linkedin.com/in/willochs316/)

## License

Nest is [MIT licensed](LICENSE).
