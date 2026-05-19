/**
 * spec-validation.ts
 *
 * SCAFFOLD — Not yet implemented.
 *
 * Planned validations:
 *
 * 1. ENTITIES SPEC
 *    Validate specs/entities.yaml against specs/entities.meta.json
 *    Command: npx ajv-cli validate -s specs/entities.meta.json -d specs/entities.yaml
 *
 * 2. API SPEC
 *    Validate specs/api.yaml is valid OpenAPI 3.x
 *    Command: npx spectral lint specs/api.yaml
 *
 * 3. CROSS-SPEC CONSISTENCY
 *    Entities in api.yaml exist in entities spec.
 *    Flows in flows.md reference real entities and endpoints.
 *
 * Run all in CI on every commit that touches a spec file.
 */

export {};
