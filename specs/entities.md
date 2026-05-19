# entities.md — Data Entities

> Define all business entities here.
> This is the source of truth for data models.
> No entity may appear in code that is not defined here.

## Entity: [Name]

Description: [What is this entity?]

Fields:
- id: string (uuid, required)
- [field]: [type] ([required/optional], [validation rules])
- createdAt: string (ISO 8601, required)

Relations:
- has_many: [Entity]
- belongs_to: [Entity]

Indexes:
- [field] (unique)
