

### Summary of Improvements Made:

1. **Domain Repository Layer Isolation**:
   * Updated the `IOrderRepository` interface in `src/domain/repositories/IOrderRepository.ts` to import and return the domain aggregate class `Order` (from `src/domain/entities/Order.ts`) instead of the UI-centric `Order` DTO interface.

2. **Domain Aggregate Enhancement**:
   * Modified `src/domain/entities/Order.ts` to incorporate all required persistent properties (`paymentMethod`, `isGuest`, and `statusHistory`).
   * Added a static `reconstruct` factory method. This allows infrastructure repositories to safely instantiate existing order aggregate roots from database payloads without triggering new-order domain validation errors or dispatching duplicate `OrderPlacedEvent` events.

3. **Infrastructure Boundary Mapping**:
   * Refactored both `SupabaseOrderRepository` and `AppwriteOrderRepository` to implement the updated aggregate-returning contract.
   * Created a private `toDomain` mapper inside the repository implementations to encapsulate the database-to-aggregate mapping logic.

4. **Use Case Boundary Mapping (BFF/Mapping)**:
   * Updated `ManageOrdersUseCase.ts` to act as the translation layer. The use case orchestrates the domain entities and mappings, converting the returned domain aggregates to UI-safe `OrderDTO` objects via a private `toDTO` mapper before handing them off to the presentation layer.
   * This isolates the UI components and custom hooks (like `useOrderLogic.ts`), preventing any changes to domain objects or value object structures from breaking the React frontend.

5. **Test Verification**:
   * Updated the mock configurations in `ManageOrders.integration.test.ts` to return mock `OrderAggregate` objects.
   * Ran code lints (`npm run lint`) and test suites (`npm run test:run`). All systems are green and passing with zero issues.