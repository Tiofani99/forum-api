/** instanbul ignore file */

const { createContainer } = require('instances-container')

/** Extenal agency */
const Jwt = require('@hapi/jwt')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const pool = require('./database/postgres/pool')

/** Internal agency */
const UserRepositoryPostgres = require('./repository/postgres/UserRepositoryPostgres')
const AuthenticationRepositoryPostgres = require('./repository/postgres/AuthenticationRepositoryPostgres')
const ThreadRepositoryPostgres = require('./repository/postgres/ThreadRepositoryPostgres')
const BcryptPasswordHash = require('./security/BcryptPasswordHash')
const JwtToken = require('./security/JwtToken')

/** use case */
const UserUseCase = require('../Applications/use_case/UserUseCase')
const UserRepository = require('../Domains/users/UserRepository')
const ThreadRepository = require('../Domains/threads/ThreadRepository')
const AuthenticationUseCase = require('../Applications/use_case/AuthenticationUseCase')
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository')
const PasswordHash = require('../Applications/security/PasswordHash')
const AuthTokenManager = require('../Applications/security/AuthTokenManager')
const ThreadUseCase = require('../Applications/use_case/ThreadUseCase')

const container = createContainer()

/** registering service and repositories */
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: uuidv4,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: uuidv4,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthTokenManager.name,
    Class: JwtToken,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
])

/** registering use case */
container.register([
  {
    key: UserUseCase.name,
    Class: UserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: AuthenticationUseCase.name,
    Class: AuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authTokenManager',
          internal: AuthTokenManager.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: ThreadUseCase.name,
    Class: ThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
])

module.exports = container
