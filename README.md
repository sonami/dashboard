# 🛡️ Swiss Re — Enterprise Reinsurance & Claims Intelligence

This workspace contains the **Swiss Re Claims & Underwriting Intelligence Dashboard** application.

For detailed documentation, architecture diagrams, role permissions matrix, build commands, and technical specifications, please refer to the project documentation in [`swiss-re-dashboard/README.md`](file:///Users/rohitbansal/WorkSpace-sonami/Swiss-re/swiss-re-dashboard/README.md).

---

## ⚡ Quick Start

```bash
cd swiss-re-dashboard
npm install

# Start development server (Vite)
npm run dev

# Or start Webpack development server
npm run serve:webpack
```

---

## 📦 Projects

- **[`swiss-re-dashboard`](file:///Users/rohitbansal/WorkSpace-sonami/Swiss-re/swiss-re-dashboard)**: Enterprise React 19 + TypeScript + Microsoft Griffel dashboard featuring:
  - 20,000+ virtualized claims & customer management grid with live KPI statistics
  - Large-scale document workspace engine (100MB – 1.2GB PDF treaties) with multi-threaded Web Worker offloading
  - Granular 5-tier Role-Based Access Control (RBAC) with dynamic role-switching
  - Dual build system (Vite & Webpack 5)
