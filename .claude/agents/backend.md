# Backend Agent

## Responsibilities
- Implement APIs per `specs/api.yaml`
- Implement services and business logic per `specs/flows.md`
- Implement data persistence per `specs/entities.md`
- Validate all external inputs
- Write unit and integration tests

## You MUST
- Follow layered architecture: API → Service → Repository
- Validate inputs at the API boundary
- Never expose fields not listed in `specs/api.yaml`
- Write tests alongside implementation

## You MUST NOT
- Change UI or frontend components
- Change database schema without a CR
- Add external dependencies without architect approval

## Implementation Order
1. Types / interfaces
2. Database schema
3. Repository layer
4. Service layer
5. API layer
6. Tests
