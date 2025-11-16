# **Energy Bazaar – Project Architecture & Development Guide**

Welcome to **Energy Bazaar**, a modern Angular-powered simulation platform representing an interplanetary energy trading network.  
This document provides a full overview of the architectural decisions, tooling choices, security model, and best practices used throughout the project.

---

# 🚀 **1. Project Architecture**

The project is built using **Angular Standalone Components** (Angular v16+), removing the need for traditional NgModules and enabling a more modular, maintainable, and scalable system.

---

## **1.1 Standalone Components**

All UI blocks (pages, shared components, features) are implemented as standalone:

- Faster bootstrapping  
- Clear dependency tree  
- Better code-splitting & lazy-loading  
- Cleaner architecture with fewer framework artefacts  

Example:

```ts
@Component({
  standalone: true,
  selector: 'app-header',
  imports: [...],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
```

## **1.2 Feature-Based Folder Structure**
src/
 └── app/
      ├── core/              # Authentication, guards, directives, global services
      ├── shared/            # Reusable UI components, pipes, directives
      ├── features/
      │     ├── dashboard/
      │     ├── proposals/
      │     ├── trades/
      │     ├── planets/
      │     └── admin/
      └── app.component.ts

This feature-first structure ensures that each domain (proposals, trades, planets, admin…) evolves independently and remains maintainable as the project grows.

## **1.3 Angular Signals for Local State**
Angular signals power most of the reactive state in the application:

    - Clear and declarative
    - Fine-grained change detection
    - Better DX vs RxJS for local state

Example:
```ts
planet = signal<Planet | null>(null);
activeTab = signal<'overview' | 'risk' | 'financials'>('overview');
```

## **1.4 Services for Business Logic**
Heavy logic (streaming, trade events, API calls, proposal processing) is centralized inside services.
Components stay lightweight and focused on UI only.


## **1.5 Lazy Loaded Routes**
Every feature page is lazy-loaded using standalone route definitions, improving first-load performance.


# ⚡ **2. Why PNPM Instead of NPM**
pnpm is used as the primary package manager due to its advantages:

## 2.1 Faster Installation

pnpm uses a global content-addressable store → drastically faster installs than npm.

## 2.2 More Disk Efficient

Dependencies are shared across projects through symlinks instead of duplicating entire folders.

## **2.3 Strict node_modules Resolution**

pnpm prevents “phantom dependencies,” ensuring:

deterministic builds

no accidental reliance on indirect dependencies

## **2.4 Better for CI/CD**

GitHub Actions cache + pnpm is significantly more efficient and reliable than npm in large projects.

## 🔐 **3. Why JWT Authentication Was Used**
The project uses a JWT-based authentication system.

Reasons for choosing JWT:

✔ Stateless auth — no session storage on the server
✔ Easy to decode on the client to obtain roles, permissions
✔ Lightweight and transportable
✔ Perfect for Angular guards
✔ Scalable across multiple devices & environments

The JWT contains user metadata such as:
- username
- roles
- permissions

This allows the app to instantly reconstruct the user's authorization context on login.

## 🛡 **4. Security Layers: Auth, Roles, Permissions**
Energy Bazaar uses a multi-layered security system.

## **4.1 Authentication Guard (authGuard)**

Protects all authenticated routes.
If the user has no valid token → redirect to /login.

## **4.2 Role-Based Access Control (canActivate([...roles]))**

Routes are protected with role-based guards:

```ts
canActivate: [canActivate(['trader', 'admin'])]
```

Used for:
- /proposals
- /admin
- restricted operational areas

## **4.3 Permission-Based UI Control (*hasPermission)**
A custom permission directive enables fine-grained UI access:
```ts
<button *hasPermission="['trade:approve']">
  Approve Proposal
</button>
```

Benefits:
- Dynamic, context-based UI rendering
- No need for permission checks inside templates
- Decoupled + testable authorization logic

## 🧭 **5. Best Practices Followed**
The project applies multiple best practices to ensure quality, scalability, and maintainability:

## **✔ 5.1 Standalone Components Everywhere**
Cleaner module-free architecture.

## **✔ 5.2 Strict TypeScript Mode**
Prevents runtime errors and undefined states.

## **✔ 5.3 Separation of Concerns**
Components → UI only
- Services → logic
- Guards → routing logic
- Directives → permission control

## **✔ 5.4 Signals Instead of RxJS for Local State**
Improved performance and readability.

## **✔ 5.5 Localization With ngx-translate**
Supports multilingual UI:
- English
- Spanish
- Language switcher included in the header.

## **✔ 5.6 Feature-Based Folder Organization**
Each feature fully encapsulated.

## **✔ 5.7 Extensive Unit Testing**
Tests implemented for:
- Components
- Services
- Directives
- Guards

Using mocks for:
- ActivatedRoute
- AuthService
- PlanetsService
- TranslateService

## **✔ 5.8 GitHub Actions Deployment**
CI/CD pipeline:
- Builds with pnpm
- Deploys automatically to GitHub Pages
- Resulting URL: https://alvarogonzalezcans.github.io/energy-bazaar/

## 🌐 **6. Deployment With GitHub Actions**
The project is deployed automatically through a GitHub Actions workflow:
- Build → dist/energy-bazaar/browser
- Upload artifact
- Deploy to GitHub Pages

Ensures continuous delivery with every push to master.

## 📦 **7. How to Run Locally**
pnpm install
pnpm start

App runs at: http://localhost:4200/
