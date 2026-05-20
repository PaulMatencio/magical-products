/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { AppRouter } from "./AppRouter";

/**
 * App Component
 * 
 * In our Clean Architecture refactor, App.tsx has been slimmed down 
 * from a "God Component" to a simple entry point. 
 * 
 * - State management is handled by Context Providers in main.tsx.
 * - Routing and view orchestration is handled by AppRouter.tsx.
 * - Business logic is extracted into domain hooks and services.
 */
export default function App() {
  return <AppRouter />;
}
