# nfr.md — Non-Functional Requirements

## Performance
- API p95 latency: [target, e.g. < 200ms]
- Page load time: [target]
- Concurrent users: [target]

## Security
- Authentication: [method, e.g. JWT with RS256]
- Authorization: [model, e.g. RBAC]
- Rate limiting: [requests per minute per user]
- Encryption at rest: [yes/no]
- Encryption in transit: [TLS version]

## Availability
- Uptime target: [e.g. 99.9%]
- RTO (Recovery Time Objective): [e.g. 1 hour]
- RPO (Recovery Point Objective): [e.g. 15 minutes]

## Observability
- Logging: structured JSON
- Tracing: [tool, e.g. OpenTelemetry]
- Metrics: [tool, e.g. Prometheus]
- Alerting thresholds: [define per metric]

## Tech Stack
- Runtime: [e.g. Node.js 20]
- Database: [e.g. PostgreSQL 16]
- Frontend: [e.g. React 18]
- Cloud: [e.g. AWS]
- Infrastructure: [e.g. serverless / containers]
- CI/CD: [e.g. GitHub Actions]
