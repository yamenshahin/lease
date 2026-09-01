# 🏢 LeaseApp Monorepo

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Nx](https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

A full-stack, enterprise-grade multi-step lease creation platform. Designed with a strictly typed architecture, this application seamlessly bridges a Next.js React frontend with a NestJS GraphQL API using an Nx Workspace.

## ✨ Key Features

- **End-to-End Type Safety:** GraphQL code generation synchronizes backend schemas directly to frontend React hooks.
- **Robust Zod Validation:** Fully localized Arabic validation utilizing custom `refine` and `.min(1)` patterns to gracefully intercept framework quirks (like empty strings and `NaN` values).
- **Silent URL State Initialization:** Frontend intercepts `?leaseType=commercial` or `?leaseType=residential` on mount to strictly drive application state without breaking Next.js suspense boundaries.
- **Brand Consistency:** Strict UI implementation of primary brand colors (Green `#14723d` and Red `#ba2931`) via Tailwind CSS.
- **Code-First GraphQL:** Backend powered by NestJS and Mongoose, relying on heavily decorated DTOs (`@IsEnum`, `@ValidateNested`, `@IsNotEmpty`) to enforce strict API payloads.

---

## 🏗️ Architecture & Folder Structure

The workspace is divided into autonomous apps and shared domain libraries for maximum scalability.

```text
lease-workspace/
├── apps/
│   ├── api/                               # 🟢 NESTJS BACKEND (GraphQL + Mongoose)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── clients/               # Client identity domain
│   │   │   │   ├── leases/                # Lease logic & DTOs (create-lease.input.ts)
│   │   │   │   └── app.module.ts
│   │   │   ├── main.ts
│   │   │   └── schema.gql                 # ⚙️ Auto-generated GraphQL Schema
│   │   └── project.json
│   │
│   └── client/                            # 🔵 NEXT.JS FRONTEND (React + Tailwind + Zod)
│       ├── src/
│       │   ├── app/
│       │   │   └── lease/
│       │   │       └── page.tsx           # Entry point & URL param parser
│       │   └── features/
│       │       └── lease-form/            # Wizard Feature Module
│       │           ├── steps/             # Componentized form steps (1-4)
│       │           ├── lease-form-shell.tsx
│       │           ├── lease-form.types.ts
│       │           └── map-to-create-lease-input.ts # State -> GraphQL Transformer
│       ├── tailwind.config.js
│       └── project.json
│
├── libs/
│   └── shared/                            # 🟡 SHARED LIBRARIES
│       ├── data-access/                   # GraphQL Clients & Mutations/Queries
│       │   └── src/lib/graphql/
│       ├── types/                         # GraphQL Codegen & Shared Interfaces
│       │   └── src/generated/
│       ├── ui/                            # Reusable UI/Tailwind Components
│       └── utils/                         # Shared Helper Functions
│
├── codegen.ts                             # ⚙️ GRAPHQL CODEGEN CONFIGURATION
└── nx.json                                # Nx Workspace cache & config

```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install

```

### 2. Generate GraphQL Types

Whenever the backend `schema.gql` or frontend `.graphql` queries change, regenerate the shared types:

```bash
pnpm codegen
```

### 3. Run the Development Servers

**Start the NestJS API (Port 3050):**

```bash
pnpm exec nx run api:serve

```

**Start the Next.js Client (Port 3000):**

```bash
pnpm exec nx run client:dev

```

### 4. Testing the Application

Navigate to the client app in your browser and append a valid lease type to test the silent state initialization:

- **Commercial:** `http://localhost:3000/lease?leaseType=commercial`
- **Residential:** `http://localhost:3000/lease?leaseType=residential`

---

_Architected and engineered by Yamen Shahin._
