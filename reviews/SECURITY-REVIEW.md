# SECURITY-REVIEW.md

> Required for CRs touching auth, authorization, data access, or external integrations.

## Checklist

Authentication:
- [ ] All new endpoints require auth unless explicitly public in spec
- [ ] Token validation happens server-side
- [ ] Token expiry enforced

Authorization:
- [ ] Role-based access enforced at service layer
- [ ] Users cannot access other users' data

Input Validation:
- [ ] All external inputs validated against a schema
- [ ] No raw queries with user input

Data Exposure:
- [ ] Responses contain only fields in `specs/api.yaml`
- [ ] Error messages do not expose stack traces
- [ ] Sensitive fields never returned

Secrets:
- [ ] No hardcoded secrets
- [ ] `.env` files gitignored

Dependencies:
- [ ] New dependencies checked for CVEs
