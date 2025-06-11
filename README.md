# Company and Product Management API

A RESTful API for managing companies and products built with NestJS, Prisma ORM, and PostgreSQL, following best development practices.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Features](#features)
- [Configuration](#configuration)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Data Validation](#data-validation)
- [CORS](#cors)
- [Tests](#tests)
- [API Documentation](#api-documentation)
- [Database Structure](#database-structure)

## Overview

This project implements a RESTful API for managing companies and their products. The application allows registration of companies with CNPJ validation and recording products associated with these companies. The system uses PostgreSQL as the database, Prisma ORM for data access, and provides documentation via Swagger UI.

## Technologies

- **NestJS**: Framework for building efficient and scalable server-side applications
- **TypeScript**: Main programming language
- **PostgreSQL**: Relational database
- **Prisma**: ORM for database access and manipulation
- **Class Validator**: Input data validation
- **Swagger**: API documentation
- **CPF/CNPJ Validator**: Library for validating Brazilian documents

## Project Structure

The application follows a modular architecture, separating responsibilities into distinct modules:

```
src/
├── common/                # Shared utilities
│   ├── decorators/        # Custom decorators
│   └── validators/        # Custom validators
├── config/                # Application configurations
│   ├── app.config.ts      # General configurations
│   └── cors.config.ts     # CORS configuration
├── prisma/                # Database access layer
│   ├── prisma.module.ts   # Prisma module
│   └── prisma.service.ts  # Prisma service
├── company/               # Company module
│   ├── company.controller.ts
│   ├── company.module.ts
│   ├── company.service.ts
│   └── dto/
│       ├── create-company.dto.ts
│       └── update-company.dto.ts
├── product/               # Product module
│   ├── product.controller.ts
│   ├── product.module.ts
│   ├── product.service.ts
│   └── dto/
│       ├── create-product.dto.ts
│       └── update-product.dto.ts
├── app.module.ts          # Main module
└── main.ts                # Application entry point
```

## Features

- **Company Management**: Complete CRUD for companies with CNPJ validation
- **Product Management**: Complete CRUD for products with relation to a specific company
- **Data Validation**: Input validation using class-validator and custom decorators
- **Documentation**: Complete API documentation via Swagger UI
- **Configurable CORS**: CORS configuration via environment variables

## Configuration

Application settings are managed through environment variables. Create an `.env` file in the project root following the example below:

```env
# Database connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/products_db?schema=public"

# CORS configuration (comma-separated list of allowed origins)
CORS_ORIGINS="http://localhost:3000,http://localhost:5173,http://localhost:4200"

# Application port
PORT=3000
```

## Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Apply migrations
npm run prisma:migrate:dev
```

## Running the Project

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod

# View database (Prisma Studio)
npm run prisma:studio
```

## API Endpoints

### Companies

- `GET /companies` - List all companies
- `GET /companies/:id` - Get a specific company
- `POST /companies` - Create a new company
- `PATCH /companies/:id` - Update a company
- `DELETE /companies/:id` - Delete a company

### Products

- `GET /products` - List all products
- `GET /products/:id` - Get a specific product
- `GET /products/company/:id` - List a company's products
- `POST /products` - Create a new product
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## Data Validation

The application implements strict data validation:

- **CNPJ**: Format validation and check digit verification
- **Required Fields**: Verification of required fields like name, price, etc.
- **Data Types**: Validation of types (strings, numbers, etc.)

Example of CNPJ validator:

```typescript
@IsNotEmpty()
@IsString()
@IsCnpj({ message: 'Invalid CNPJ' })
cnpj: string;
```

## CORS

CORS configuration is managed via the `CORS_ORIGINS` environment variable, which accepts:

- A comma-separated list of origins
- `*` to allow any origin
- Combinations of specific origins and wildcards

## Tests

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

Swagger documentation is available during development at:

```
http://localhost:3000/api
```

## Database Structure

### Table: companies

| Column     | Type     | Description                     |
|------------|----------|---------------------------------|
| id         | Int      | Primary ID, auto-incremental    |
| name       | String   | Company name                    |
| cnpj       | String   | CNPJ, unique                    |
| address    | String?  | Address (optional)              |
| created_at | DateTime | Creation date                   |
| updated_at | DateTime | Update date                     |

### Table: products

| Column      | Type     | Description                      |
|-------------|----------|----------------------------------|
| id          | Int      | Primary ID, auto-incremental     |
| name        | String   | Product name                     |
| description | String?  | Description (optional)           |
| price       | Float    | Price                            |
| stock       | Int      | Quantity in stock                |
| company_id  | Int      | Company ID (foreign key)         |
| created_at  | DateTime | Creation date                    |
| updated_at  | DateTime | Update date                      |
