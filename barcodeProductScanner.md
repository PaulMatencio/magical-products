# BarcodeProductScanner Implementation

## Purpose

`BarcodeProductScanner` is an operator-facing tool for scanning a product barcode or QR payload and producing JSON that conforms to the `InitialProductData` interface in `src/types/types.ts`.

This JSON is intended for the product metadata/import workflow, not for direct persistence as a database `Product` row. The scanned barcode is mapped to `attributes.sku`.

The first implementation target is Android browser usage. It uses the browser-native `BarcodeDetector` API when available and falls back to manual barcode entry when camera scanning is unavailable.

---

## User Flow

1. Operator opens the Operator Dashboard.
2. Operator clicks **Barcode JSON**.
3. Scanner opens the rear camera when supported.
4. A barcode, UPC/EAN, Code 128, Code 39, or QR payload is captured.
5. The scanned value becomes the default `attributes.sku`.
6. Operator completes the `InitialProductData` metadata fields.
7. The tool generates formatted `InitialProductData` JSON.
8. Operator can copy or download the JSON file.

Required generation inputs:

- scanned barcode or manually entered code
- `name`
- `category`
- `description`

Other fields are generated from form values or empty/default metadata values.

---

## Clean Architecture Split

The feature follows the project's dependency rule:

```text
features/operator/BarcodeProductScanner.tsx
  -> presentation/hooks/useBarcodeProductScannerLogic.ts
    -> application/use-cases/operator/GenerateInitialProductDataUseCase.ts
      -> utils/productJsonBuilder.ts
      -> types/types.ts
```

### UI Layer

File:

- `src/features/operator/BarcodeProductScanner.tsx`

Responsibilities:

- Render camera preview.
- Render `InitialProductData` form fields.
- Render JSON preview.
- Wire buttons to hook callbacks.
- Avoid direct JSON-generation logic.

### Presentation Adapter

File:

- `src/presentation/hooks/useBarcodeProductScannerLogic.ts`

Responsibilities:

- Own React state for scanner status, errors, scanned code, and form draft.
- Manage browser camera lifecycle.
- Use `BarcodeDetector` and `navigator.mediaDevices`.
- Adapt the application use case to UI-friendly state.
- Execute browser-only commands such as clipboard copy and JSON file download.

This layer is allowed to know about React and browser APIs.

### Application Use Case

File:

- `src/application/use-cases/operator/GenerateInitialProductDataUseCase.ts`

Responsibilities:

- Create an initial metadata draft from loaded categories and brands.
- Apply scanned raw values or JSON QR payloads to the draft.
- Generate an `InitialProductData` object.
- Serialize generated JSON.
- Produce the download filename.

This layer does not use React, DOM APIs, camera APIs, or repository implementations.

### Pure Builder Utility

File:

- `src/utils/productJsonBuilder.ts`

Responsibilities:

- Build a valid `InitialProductData` object from primitive draft inputs.
- Parse scanned QR payloads that contain `InitialProductData` JSON.
- Provide small default helpers for category and brand display names.

This utility is pure TypeScript and covered by unit tests.

---

## Dependency Injection

The scanner use case is registered in the central DI container:

File:

- `src/context/DependenciesContext.tsx`

Registration:

```ts
const generateInitialProductDataUseCase = new GenerateInitialProductDataUseCase();
```

Consumers access it through:

```ts
const { generateInitialProductDataUseCase } = useDependencies();
```

This keeps construction centralized and prevents the feature component from instantiating use cases directly.

---

## Routing

The scanner is exposed through the `barcode_scanner` view state.

Files:

- `src/types/types.ts`
- `src/AppRouter.tsx`
- `src/features/operator/Dashboard.tsx`

Access rule:

- Operators can open it from the Operator Dashboard.
- Admins can access the route.
- Dev mode can access the route for local testing.

---

## Generated JSON Shape

The generated JSON targets:

```ts
export interface InitialProductData {
  name: string;
  category: string;
  description: string;
  brand: string;
  manufacturer: string;
  attributes: {
    color: string;
    size: string;
    material: string;
    weight: string;
    sku: string;
    dimensions: Dimensions;
  },
  durability_data: {
    life_span: string;
    reliability: string;
    reusability: string;
    refurbishment: string,
    recycled_content: string;
  },
  repairability_data: {
    ease_of_repair: string;
    spare_parts: string;
    maintenance_manual: string;
  },
  manufacturing_data: {
    origin: string;
    material_composition: string;
    substance_of_concern: string;
  },
  lifecycle_data: {
    carbon_footprint: string;
    environmental_footprint: string;
    water_usage: string;
  }
}
```

Current defaults:

- `attributes.sku`: defaults to scanned barcode.
- `attributes.dimensions.length`: defaults to `0`.
- `attributes.dimensions.width`: defaults to `0`.
- `attributes.dimensions.height`: defaults to `0`.
- `attributes.dimensions.unit`: defaults to `cm`.
- Category defaults to the first loaded category path/title/name.
- Brand defaults to the first loaded brand name.

---

## Barcode and QR Behavior

Normal barcode:

```text
0123456789012
```

Result:

- `attributes.sku = "0123456789012"` unless manually changed.

QR containing `InitialProductData` JSON:

```json
{
  "name": "Eco Speaker",
  "category": "Electronics > Speakers",
  "description": "Solar powered speaker",
  "brand": "Sun Audio",
  "manufacturer": "Sun Audio Ltd",
  "attributes": {
    "color": "green",
    "size": "small",
    "material": "recycled plastic",
    "weight": "500g",
    "sku": "SPK-1",
    "dimensions": {
      "length": 10,
      "width": 8,
      "height": 6,
      "unit": "cm"
    }
  }
}
```

Result:

- The draft form is prefilled from the payload.
- Missing fields remain editable.

---

## Android Runtime Notes

Camera scanning depends on browser support for:

- `BarcodeDetector`
- `navigator.mediaDevices.getUserMedia`
- secure context camera permissions

For Android testing:

- `localhost` works for local browser testing.
- Network device testing typically requires HTTPS.
- A future APK should wrap this screen with Capacitor or a native Android shell.

Manual entry remains available when native barcode detection is unsupported.

---

## Tests

Current test coverage:

- `src/utils/productJsonBuilder.test.ts`
- `src/application/use-cases/operator/GenerateInitialProductDataUseCase.test.ts`

Commands:

```bash
npm run lint
npm run test:run
npm run build
```

---

## Future Improvements

Recommended next steps:

- Add a Capacitor Android wrapper for APK distribution.
- Add HTTPS local dev instructions for Android camera testing.
- Add optional product lookup by barcode using a product catalog API.
- Add direct handoff to `ProductFormUseCase` for image/IPFS processing.
- Add schema validation for generated `InitialProductData` JSON before download.
