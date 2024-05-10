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
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Title: Banking Application

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Description

The Banking Application, built with NestJS, offers essential functionality for handling deposits, withdrawals, transaction history, and user authentication/authorization in a secure and efficient manner. It serves as the core backend system for a basic digital banking platform.

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

## Tech Stack:

- NestJS: For building a scalable and maintainable API.
- Node.js: The backend server is built on the Node.js runtime.
- TypeScript: TypeScript for strong typing and code maintainability.
- JWT: JSON Web Tokens for secure authentication.

## Swagger Documentation:

- Access API documentation at http://localhost:3000/api/.
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

Video For:

- [User Registeration](https://www.loom.com/share/cdfcb850bcfa4af9aaa46a8618394790?sid=61ed59d2-d492-4c3c-bd5f-1e4c6958be52)
- [Login User](https://www.loom.com/share/c694d18f56ed4b2ba84c3177c0ff688a?sid=c3f86a32-0f10-4946-afa0-681885ce32b6)
- [Deposit](https://www.loom.com/share/4e93f03258184db3bf6cd7233c91875e?sid=d891d1f8-1324-420e-85c4-1637ba8b727d)
- [Withdraw / Transaction History](https://www.loom.com/share/dceb59a854cf4e918a6566c9b5b6e6a8?sid=0c7bc924-db8e-4b25-b1e1-57bd967dd4c1)

## Stay in touch

- Author - [Willochs Ojigbo](https://kamilmysliwiec.com)
- Linkedin - [@willochs316](https://www.linkedin.com/in/willochs316/)

## License

Nest is [MIT licensed](LICENSE).
