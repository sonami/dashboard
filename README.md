# 🛡️ Enterprise Claims & Underwriting Intelligence Dashboard

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Griffel](https://img.shields.io/badge/Styling-Griffel%20CSS--in--JS-0078D4)](https://github.com/microsoft/griffel)
[![Vite](https://img.shields.io/badge/Build-Vite%208-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Webpack](https://img.shields.io/badge/Bundler-Webpack%205-8DD6F9?logo=webpack&logoColor=black)](https://webpack.js.org/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-orange)](https://oxc.rs/)

An enterprise-grade reinsurance underwriting and claims intelligence dashboard engineered for high-throughput portfolio exploration, role-based governance, and large-scale treaty document analytics (100MB – 1.2GB PDF schedules).

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. Claims & Customer Portfolio Grid](#1-claims--customer-portfolio-grid)
  - [2. Large-Scale Document Workspace Engine](#2-large-scale-document-workspace-engine)
  - [3. Granular Role-Based Access Control (RBAC)](#3-granular-role-based-access-control-rbac)
  - [4. Financial & Treaty Management](#4-financial--treaty-management)
- [Architecture & Tech Stack](#-architecture--tech-stack)
  - [Core Technologies](#core-technologies)
  - [Multi-Threaded Web Worker Pipeline](#multi-threaded-web-worker-pipeline)
  - [Design System & Griffel Styling](#design-system--griffel-styling)
  - [Dual Build System: Vite & Webpack 5](#dual-build-system-vite--webpack-5)
- [Role & Permissions Matrix](#-role--permissions-matrix)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)
  - [Linting & Code Quality](#linting--code-quality)
- [Available Scripts](#-available-scripts)
- [Performance & Optimization Highlights](#-performance--optimization-highlights)

---

## 🌟 Overview

The **Claims & Underwriting Intelligence Dashboard** solves the challenge of managing complex reinsurance portfolios and interacting with massive legal schedules and treaty documentation without sacrificing client-side responsiveness.

Built with **React 19**, **TypeScript**, and **Microsoft Griffel CSS-in-JS**, the application incorporates:
- **Instantaneous client-side filtering and pagination** across tens of thousands of customer and claim records.
- **Worker-offloaded document streaming and rendering** for 100MB+ multi-page treaty contracts.
- **Dynamic permission-driven UI gating** with live role switching for demonstration and auditing.
- **Dual bundler configuration** (Vite for rapid development and Webpack 5 for enterprise-tailored production chunking).

---

## 🚀 Key Features

### 1. Claims & Customer Portfolio Grid
- **High-Volume Data Engine**: Handles datasets of 20,000+ seeded records and scales seamlessly up to 256,000+ virtualized entries.
- **Live KPI Status Row**: At-a-glance telemetry displaying **Total Customers** (with monthly growth trend), **Active Members**, and **Active Now** real-time user stacks.
- **Dynamic Search & Sort**: Real-time multi-attribute search (Customer, Company, Email, Phone, Country) with fast sorting (Newest, Customer Name, Company, Status).
- **Interactive Action Cells**:
  - 📄 **Doc Launcher**: Instant context switch to the high-resolution Document Workspace.
  - ✏️ **Edit Claim & Reserves**: Update customer data, company, email, status, and financial reserves.
  - 👤 **Assign Analyst**: Route claims to specialized reinsurance underwriters and analysts.
  - ✓ **Approve Settlement**: Workflow approvals restricted to authorized roles.
  - 🗑️ **Archive / Delete**: Protected deletion pipeline gated by administrative privileges.

### 2. Large-Scale Document Workspace Engine
- **Massive PDF & Treaty Streaming**: Built specifically for heavy excess-of-loss schedules, casualty clash treaties, and loss adjuster assessments (100MB – 1.2GB).
- **Interactive Document Canvas**: Smooth zoom (50%–300%), 90-degree rotations, pagination jump controls, and thumbnail strip navigation.
- **Collaborative Annotation Layer**:
  - Color-coded highlights and point pins directly on treaty clauses.
  - Real-time commentary thread sidebar linked to specific document pages.
  - Full author attribution and timestamp tracking.
- **Document Page Operations**:
  - **Split Treaty**: Extract clauses and generate sub-documents.
  - **Merge Schedules**: Append endorsements and addenda.
  - **Reorder & Delete Pages**: Live structural modifications with instant viewport synchronization.

### 3. Granular Role-Based Access Control (RBAC)
- **5 Dedicated Persona Profiles**:
  - `Underwriter`: Read/Write claims, approve settlements, assign analysts, review and annotate documents.
  - `ClaimsAnalyst`: Full claims management, page-level document manipulation, and treaty merging.
  - `Actuary`: Read-only access to claims, document inspection, and data export.
  - `Admin`: Unrestricted governance, system configurations, and deletion rights.
  - `Auditor`: Compliance audit and export privileges with zero write access.
- **Interactive Role Switcher**: Header-level dropdown allowing real-time persona switching to test authorization boundaries, button states, and protected routes.
- **Declarative Gates**: `<AuthzGate />` component for granular element-level fallbacks and `<ProtectedRoute />` for route-level authorization.

### 4. Financial & Treaty Management
- **Income & Reserves Tracking**: Financial overviews for Gross Premium Income ($12.4M) and Paid Claims Reserve ($4.2M) with loss ratio trends.
- **Treaty & Product Catalog**: Dedicated coverage views across Property Cat, Casualty Clash, Life & Health, Cyber, Marine, and Aviation lines of business.

---

## 🏗️ Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    App Shell                       │
│  (AppLayout, Header with RBAC Switcher, Sidebar Navigation)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌───────────────────────────────┐     ┌───────────────────────────────┐
│     Claims Grid Feature       │     │  Document Workspace Engine    │
│  - KPI Statistics Row         │     │  - Document Canvas & Toolbar  │
│  - Virtualized Customer Table │     │  - Annotation Layer & Sidebar │
│  - Filter & Sort Controls     │     │  - Page Operations Modal      │
│  - Modals (Edit, Assign)      │     │  - Thumbnail Bar Navigator    │
└──────────────┬────────────────┘     └──────────────┬────────────────┘
               │                                     │
               │        ┌────────────────────────────┘
               ▼        ▼
┌─────────────────────────────────────────────────────────────┐
│                       Common Layer                          │
│  - AuthzGate / ProtectedRoute (RBAC Guarding)               │
│  - Design Tokens & Griffel CSS-in-JS Engine                  │
│  - UI Component Library (Button, Input, Select, Spinner)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│     Worker Pool (Threads)   │ │  In-Browser Edge Mock Layer │
│  - Multi-threaded PDF Ops   │ │  - Latency simulation (50ms)│
│  - Off-thread rasterization │ │  - 20k+ Mock Claims DB      │
└─────────────────────────────┘ └─────────────────────────────┘
```

### Core Technologies

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.2.8` | Component model, concurrent rendering, transitions, and suspense boundaries |
| **TypeScript** | `~6.0.2` | Static typing, strict null checks, and enterprise domain models |
| **@griffel/react** | `^1.7.7` | Zero-runtime CSS extraction, atomic CSS-in-JS, and predictable styling tokens |
| **Vite** | `^8.2.0` | Ultra-fast development server with instant Hot Module Replacement (HMR) |
| **Webpack** | `^5.109.2` | Production-grade asset compilation, chunk hashing, and bundle splitting |
| **Oxlint** | `^1.75.0` | Ultra-fast Rust-based linter for high code standards |

### Multi-Threaded Web Worker Pipeline
Document processing is computationally intensive. The `DocumentWorkerPool` (`src/features/document-workspace/workers/workerPool.ts`) distributes rasterization tasks across dedicated Web Worker threads (`pdf.worker.ts`), ensuring the browser's UI thread maintains 60 FPS during heavy scrolling and zooming operations.

### Design System & Griffel Styling
- Design tokens (`src/common/styles/tokens.ts`) define a consistent palette ( Navy `#0B2545`, Forest Green `#00AC4F`, Accent Coral `#EF476F`, Slate Neutral `#F8F9FB`).
- Atomic class generation eliminates style clashes, minimizes CSS bundle size, and supports theme transitions.

### Dual Build System: Vite & Webpack 5
This repository is configured with a dual build setup:
1. **Vite**: Ideal for modern developer experience, near-instant cold starts, and HMR.
2. **Webpack 5**: Configured with `HtmlWebpackPlugin`, `ts-loader` (`transpileOnly: true`), `style-loader`, `css-loader`, asset module hashing, and custom chunk splitting (`feature-claims-grid`, `feature-document-workspace`, `modal-edit-claim`, etc.).

---

## 🔐 Role & Permissions Matrix

| Permission | Description | Admin | Underwriter | ClaimsAnalyst | Actuary | Auditor |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `claims:read` | View claims & customer records | ✅ | ✅ | ✅ | ✅ | ✅ |
| `claims:write` | Modify customer data & reserves | ✅ | ✅ | ✅ | ❌ | ❌ |
| `claims:approve` | Authorize settlements & payouts | ✅ | ✅ | ❌ | ❌ | ❌ |
| `claims:assign` | Assign analysts to claims | ✅ | ✅ | ✅ | ❌ | ❌ |
| `claims:delete` | Archive or delete claim records | ✅ | ❌ | ❌ | ❌ | ❌ |
| `claims:export` | Export portfolio reports & CSVs | ✅ | ✅ | ✅ | ✅ | ✅ |
| `documents:read` | Open & read treaty PDF schedules | ✅ | ✅ | ✅ | ✅ | ✅ |
| `documents:annotate` | Create highlights & comments | ✅ | ✅ | ✅ | ❌ | ❌ |
| `documents:manage_pages` | Split, rotate & delete pages | ✅ | ❌ | ✅ | ❌ | ❌ |
| `documents:merge` | Merge addenda & endorsements | ✅ | ❌ | ✅ | ❌ | ❌ |
| `admin:access` | Access system configurations | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 📂 Project Directory Structure

```
swiss-re-dashboard/
├── public/
│   ├── favicon.svg
│   └── index.html                # HTML template for Webpack & Vite
├── src/
│   ├── app/                      # Application Shell & Core Infrastructure
│   │   ├── layout/               # AppLayout, Header, and Sidebar
│   │   ├── providers/            # AppProviders, ThemeProvider, Griffel Renderer
│   │   └── router/               # AppRouter, ProtectedRoute, Tab navigation
│   ├── common/                   # Reusable Building Blocks
│   │   ├── components/           # UI kit (Button, Input, Select, Badge, Spinner, Modal)
│   │   ├── hooks/                # useDebounce and shared custom hooks
│   │   ├── styles/               # Design tokens, color system, elevation
│   │   ├── types/                # Domain models (User, Claim, Document)
│   │   └── utils/                # Byte formatters, date helpers, error handling
│   ├── features/                 # Modular Domain Features
│   │   ├── auth/                 # Auth store, RBAC rules, permissions
│   │   ├── claims-grid/          # Claims table, KPI cards, filters, edit/assign modals
│   │   └── document-workspace/   # PDF Canvas, annotations, page operations, worker pool
│   ├── mocks/                    # In-Browser API & Data Simulation
│   │   ├── data/                 # 20,000+ seeded claims & mock treaties
│   │   ├── handlers/             # Latency-enabled query & mutation handlers
│   │   └── browser.ts            # Mock service client
│   ├── services/                 # Infrastructure Services
│   │   ├── http/                 # HTTP client wrapper
│   │   └── worker/               # Generic Web Worker promise bridge
│   ├── App.tsx                   # Top-level application component
│   ├── index.css                 # Global CSS & CSS variable resets
│   └── main.tsx                  # Application entrypoint
├── .oxlintrc.json                # Oxlint rules configuration
├── package.json                  # Dependencies and build scripts
├── tsconfig.app.json             # App TypeScript configuration
├── tsconfig.json                 # Project references config
├── vite.config.ts                # Vite 8 configuration
└── webpack.config.js             # Webpack 5 production & devServer configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (`v20+` recommended)
- **Package Manager**: `npm` (comes with Node.js) or `pnpm` / `yarn`

### Installation

Clone the repository and install all dependencies:

```bash
# Clone repository
git clone https://github.com/your-org/swiss-re-dashboard.git

# Navigate into project directory
cd swiss-re-dashboard

# Install dependencies
npm install
```

---

### Running the Application

You can choose either **Vite** or **Webpack** for your local development workflow:

#### Option A: Vite Dev Server (Recommended for Fast DX)
```bash
npm run dev
```
> Starts Vite development server at `http://localhost:5173` with instant HMR.

#### Option B: Webpack Dev Server
```bash
npm run serve:webpack
# or
npm start
```
> Starts Webpack 5 Dev Server at `http://localhost:3000` with hot reloading.

---

### Building for Production

#### Build with Vite
```bash
npm run build
```
> Type-checks via `tsc -b` and compiles optimized bundles into `dist/`.

#### Build with Webpack 5
```bash
npm run build:webpack
```
> Generates production-minified assets with content-hashed chunks in `dist/`.

#### Preview Production Build
```bash
npm run preview
```

---

### Linting & Code Quality

Run Oxlint to check the entire codebase against strict quality rules:

```bash
npm run lint
```

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts Vite local development server |
| `npm run build` | `tsc -b && vite build` | Type-checks and builds production bundle using Vite |
| `npm run serve:webpack` | `webpack serve --mode development --port 3000` | Starts Webpack Dev Server on port 3000 |
| `npm start` | `webpack serve --mode development --port 3000` | Alias for Webpack Dev Server |
| `npm run build:webpack` | `webpack --mode production` | Compiles production bundle with Webpack 5 |
| `npm run lint` | `oxlint` | Executes Oxlint static code analysis |
| `npm run preview` | `vite preview` | Previews production build locally |

---

## ⚡ Performance & Optimization Highlights

1. **On-Demand Code Splitting (`React.lazy` + Suspense)**:
   - Modals (`EditClaimModal`, `AssignAnalystModal`) and heavy sub-features (`PageOperationsModal`, `DocumentCanvas`, `ClaimsGrid`) are packaged into discrete bundles and loaded strictly on demand.
2. **Atomic CSS Zero-Runtime Overhead**:
   - Griffel compiles atomic style rules, avoiding style recalculation bottlenecks even when rendering complex table rows and document canvasses.
3. **Web Worker Thread Offloading**:
   - Intensive operations like PDF parsing, tile rasterization, and byte manipulation run in parallel worker threads, preventing UI lockups.
4. **Optimized Asset Pipeline**:
   - Dynamic asset module handling in Webpack & Vite with chunk hashing for long-term browser cacheability.

---

## 📄 License

Internal proprietary software developed for Swiss Re reinsurance workflows. All rights reserved.
