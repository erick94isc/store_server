# VGA admin system

- Node version: 6.9.2,
- External dependencies:
  - PostgreSQL version 9.6
  - Sequelize cli `npm install -g sequelize-cli`
- Configuration
  - DB creation: `npm run db:create`
  - DB initialization: `sequelize db:migrate && sequelize db:seed:all`
  - DB deletion: `npm run db:drop`

# Models

#### Every model has 'createdAt', 'updatedAt' and 'deletedAt' attributes, three of them are timestamps