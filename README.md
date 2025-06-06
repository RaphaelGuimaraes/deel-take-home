# Autocomplete Component Test

This project is a solution for a frontend technical test. The goal is to implement a fully functional and user-friendly autocomplete component using **React** and **TypeScript**, without relying on third-party libraries.

## 📌 About the Test

The test required creating an autocomplete input that:

- Is built with React functional components and hooks
- Uses TypeScript with proper types and interfaces
- Filters results asynchronously (mocked + optional real API)
- Handles edge cases (keyboard navigation, click outside, etc.)
- Highlights the matching part of each suggestion
- Does not rely on any external libraries (except React)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RaphaelGuimaraes/deel-take-home.git
cd autocomplete-component
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### Project Structure

```
src/
  components/
    AutoComplete/
      index.tsx
      autocomplete.module.css
  hooks/
    useDebouncedValue.ts
    useClickOutside.ts
  data/
    mockData.ts
    realAPI.ts
  types/
    User.d.ts
```

### Switching between Mock and Real API

In `App.tsx`, you can toggle between using a local mocked dataset or a real API:

```ts
// For mock data:
import { fetchUsersMock } from "@/data/mockData";

// For real API:
import { fetchUsersReal } from "@/data/realAPI";
```
