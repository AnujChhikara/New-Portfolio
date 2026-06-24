# GitHub Contributions & Projects — Anuj Chhikara

**GitHub:** [anuj-jumbo](https://github.com/anuj-jumbo) | **Organization:** [joinjumbo](https://github.com/joinjumbo)  
**Account Created:** September 9, 2025 | **Last Active:** June 24, 2026  
**Email:** dinesh@joinjumbo.com  

---

## Profile Summary

- Full-stack software engineer at JoinJumbo (fintech/gaming startup)
- Member of the JoinJumbo engineering team
- Primarily works in TypeScript (NestJS, React, Bun), Go, and infrastructure tooling
- Active across backend microservices, admin dashboards, real-time systems, and financial reconciliation
- Org has 25+ engineers; anuj is a core backend contributor across multiple critical services
- Active contribution window: **Sep 2025 – Jun 2026** (10 months)

---

## JoinJumbo Organization — Repository Inventory

The joinjumbo GitHub org has **100+ repositories** spanning backend services, frontend apps, infrastructure, and tooling. Below are all repos with their primary language, status, and Anuj's involvement.

### Backend Services (Microservice Architecture)

| Repository | Language | Description | Anuj's Involvement |
|---|---|---|---|
| `server` | TypeScript (NestJS) | Primary monolith — handles all core API requests for web/mobile | **Major contributor** — 100+ commits |
| `fantasy-service` | TypeScript | Fantasy sports platform — fixtures, contests, leaderboards, tournaments | **Major contributor** — 100+ commits |
| `digigold-service` | TypeScript | DigiGold buy/sell backend (gold trading for users) | **Major contributor** — 71 commits, 5 PRs |
| `recon-service` | TypeScript (Bun) | Financial reconciliation — 47+ BQ checks across all money flows | **Primary author** — built from scratch, 100+ commits |
| `socket-service-2.0` | Go | High-performance WebSocket service with epoll + NATS | **Primary author** — built from scratch, 77 commits, 10 PRs |
| `horizon` | TypeScript | Opinion trading/prediction market platform | **Major contributor** — 100+ commits, 60+ PRs |
| `payment-service` | TypeScript | Payment processing service | Contributor — 6 commits |
| `identity-service` | TypeScript | KYC and bank verification service | Contributor — 1 PR |
| `aviator-service` | TypeScript | Aviator crash game backend | Contributor — 4 commits (socket integration) |
| `atlas` | Go | Vault service for monetary operations (gRPC) | Referenced/integrated |
| `promoter-dashboard-service` | Go | Promoter onboarding, referral tracking system | Repo member |
| `aggregator-service` | TypeScript | Aggregator service | Repo member |
| `oms-core-service` | Java (Spring Boot 17) | Order management system | Repo member |
| `order-service` | Java | Order management | Repo member |
| `game-core` | — | Shared GSaaS infrastructure (PostgreSQL, Redis, JWT, game module registration) | Repo member |
| `game-service` | TypeScript | LevelUp service | Repo member |
| `invoice-service` | TypeScript | Invoice generation | Repo member |
| `invoice-generator` | TypeScript | Invoice generator | Repo member |
| `lambda-central` | TypeScript | Mono-repo for all AWS Lambda functions | 1 commit |
| `ingestion-service` | TypeScript | Data ingestion service | Repo member |
| `watch-tower` | JavaScript | Monitoring/visualization service | Repo member |
| `nats-emitter` | Go | NATS message emitter utility | Repo member |
| `signoz-logger` | TypeScript | Observability library for SigNoz (logs, traces, metrics) | Repo member |
| `fantasy-worker` | Go | Golang consumer for Fantasy Service post-APIs | Repo member |
| `socket-service` | TypeScript | Original WebSocket service (v1) | Repo member |

### Frontend Apps

| Repository | Language | Description | Anuj's Involvement |
|---|---|---|---|
| `consumer-app` | TypeScript (React Native) | Mobile app — savings schemes, jackpot, user interaction | Repo member |
| `jumbo-admin-dashboard` | TypeScript (React) | Internal admin panel for operations | **Major contributor** — 100+ commits |
| `cherry-app` | TypeScript | Cherry app frontend | Repo member |
| `novo-frontend` | TypeScript | Novo frontend | Repo member |
| `promoter-tooling-web` | TypeScript | Promoter tooling web view | Repo member |
| `cherry-web` | Astro | Cherry web (Astro) | Repo member |
| `fantasy-landing` | TypeScript | Fantasy landing page | Repo member |
| `novo-landing` | TypeScript | Novo landing page | Repo member |
| `app-download` | TypeScript | App download page | Repo member |
| `oms-partner-portal` | TypeScript | OMS partner portal | Repo member |
| `jumbo-storefront-api` | JavaScript | Storefront API | Repo member |

### Infrastructure & DevOps

| Repository | Language | Description | Anuj's Involvement |
|---|---|---|---|
| `jumbo-gitops` | — | Argo CD GitOps config | Repo member |
| `jumbo-azure-infra` | TypeScript | Terraform infra for Azure cloud | Repo member |
| `gcp-pulumi` | TypeScript | GCP Pulumi IaC | Repo member |
| `pulumi-socket-service` | TypeScript | Pulumi IaC for socket-service-2 (NATS, deployments, HPAs, Ingress) | Repo member |
| `iac` | TypeScript | Infrastructure as code | Repo member |

### Games & Mini-Services

| Repository | Language | Description |
|---|---|---|
| `plinko-game` | Svelte | Plinko game (public) |
| `coin-flip` | TypeScript | Coin flip game (public) |
| `MineRush` | TypeScript | Mines game clone (public) |
| `Aviator-Crash` | TypeScript | Aviator crash game full-stack (public) |
| `aviator-backend` | JavaScript | Aviator backend |
| `aviator-frontend` | PHP | Aviator frontend |
| `mines` | — | Mines game for GSaaS |
| `knife-hit` | TypeScript | Knife hit game |
| `email-verifier` | Go | Go library for email verification without sending emails (public) |

---

## Detailed Contribution Breakdown

---

### 1. `server` — Primary Backend Monolith

**Stack:** TypeScript · NestJS · PostgreSQL · Redis  
**Period:** Nov 2025 – Jun 2026  
**Commits by Anuj:** 100+ (API paginates at 100; actual count higher)

#### Key Features Built

**Feature Flags (GrowthBook + OpenFeature) — Jun 2026**
- PR #3793: Integrated GrowthBook via OpenFeature SDK across the entire server codebase
- Replaces hardcoded flags with runtime-configurable feature gates

**APK Version Management — Nov 2025**
- Built `/apk` module from scratch: `ApkVersion` entity, upload/version endpoints, status tracking, release notes, unique constraints
- Client info API linking APK versions from `apk_version` table

**Wallet Summary Endpoint — Mar 2026**
- Added `/wallet/summary` route and database query for wallet summaries
- SQL fix: switched `gdi` vs `winnings` for correct `credit_diamond` calculation

**Transfer History Enhancements — Nov–Dec 2025**
- Added DigiGold gift card support in transfer history
- Enhanced stepper steps with source data for improved failure messaging
- Added referenceId to transfer details, UTR masking fixes, status details by query ID

**Risk Check Module — Dec 2025**
- Implemented novo order approval handling and gift card redemption
- Bulk incident update functionality, enhanced wallet update logic, order mapping improvements
- Streamlined query selection and counting logic

**Admin Authentication (Google OAuth) — Dec 2025**
- Full Google OAuth flow: login, callback, refresh, logout endpoints
- Access token expiration management, non-production environment handling
- Commented audience validation for ID token in `AuthAdminService`

**Product Management — Nov–Dec 2025**
- Added `productMrp`, `buyPrice`, `dimensions`, `weight` fields to product DTO and service
- `sellerName` filter in product queries, brand retrieval optimization
- `ProductEntity` metadata field, `productCategoryStatus` to `ProductCategoriesMap`

**Winning Conversion — Nov 2025**
- Bulk reject functionality for conversions
- `FAILED` status added to `ConversionStatus` enum

**Influencer/Promoter — Dec 2025**
- Paginated promoters retrieval for influencer details section

**CI/CD & Tooling — Dec 2025**
- Added PR checks workflow (automated linting and building)
- Husky configuration in Dockerfile and package.json

**Banner & UI Data — Mar 2026**
- Added Trading Pause Banner to `bannerStoreDump`
- Removed stale banners (Ind vs Eng)

**Other:**
- `earn tokens` endpoint and configuration (Feb 2026)
- Gift card status validation before acknowledgment (Novo flow)
- Client version retrieval supporting multiple platforms
- Tour context support in upload processing
- S3 folder setup for leaderboard and merch
- Refund `refund_gt` calculation in transaction database service

---

### 2. `fantasy-service` — Fantasy Sports Platform

**Stack:** TypeScript · PostgreSQL · Redis · CDN caching  
**Period:** Nov 2025 – Mar 2026  
**Commits by Anuj:** 100+ 

#### Key Features Built

**CDN APIs Layer — Jan 2026**
- Built entire CDN API layer for serving high-traffic fantasy data with proper `Cache-Control` headers
- `cdnFixtureList` — fixture listing with improved caching and data retrieval
- `cdnPlayerList` — player data with role filtering, caching
- `cdnContestList` — contest list, filtering available contests, contest group details, contest hide
- `fixtureConst` — fixture constants retrieval
- `fixtureMeta` — fixture metadata endpoint
- `fixtureState` — fixture state endpoint
- Scorecard, comms, and filter CDN APIs (PR #680)

**Leaderboard System — Dec 2025 – Jan 2026**
- `leaderboardDetails` and `userRank` APIs with pagination
- `leaderboard_image_url` in tour leaderboard response
- `leaderboardImageUrl` and `userId` in leaderboard schema

**Merchandise Management — Dec 2025**
- Built full `MerchandiseEntity` and CRUD management APIs
- Availability filtering for merchandise list

**Tournament Header Priority — Jan 2026**
- `header_priority` field on `TourEntity`
- Validation for header priority in tournament updates
- Priority handling across tournament APIs

**Contest Hide / User Contest Visibility — Jan 2026**
- `contestHide` API endpoint
- Map-based caching of fixture contest data
- `getMaxSeqByFixture` for user team sequences by fixture
- Active fixed/recurring contest filtering library method

**Authentication for Admin Routes — Dec 2025**
- Bearer token verification middleware for admin routes

**Fixture Delay Handling — Dec 2025**
- POSTPONE logic fix to prevent past start times

**Tournament Sync — Dec 2025 – Mar 2026**
- `syncFixtureEntity` API for synchronizing fixture data
- `tournamentSyncFromVendor` refactored to use context for user ID
- TBA match handling logic fixes

**Scorecard Aggregation — Nov 2025**
- Enhanced aggregation logic for batting, bowling, and fielding stats

**Player Image URL — Nov 2025**
- Added `playerImgUrl` to response data structure (PR #579)

---

### 3. `digigold-service` — DigiGold Trading Backend

**Stack:** TypeScript · Express · PostgreSQL · SQS · CleverTap  
**Period:** Dec 2025 – Apr 2026  
**Commits by Anuj:** 71 | **PRs:** 5

#### Key Features Built

**CleverTap Analytics Integration — Dec 2025**
- Integrated CleverTap event tracking across buy/sell/verify routes
- SQS-based async event tracking
- Tracked: sell quantity (in milligrams), lifetime gold stats, gold tax, sell price precision (4 decimal places)
- `CleverTapService` with `userId` extraction from properties
- Added `CleverTap` tracking route

**Authentication & Session Management — Dec 2025**
- JWT refresh token implementation and enhanced session handling
- `sessionId` field on `User` entity
- Removed `LoginSessionRepository`, improved session validation

**Identity / KYC Refactor — Dec 2025**
- KYC and BANK constants for improved clarity
- Identity data structure with status checks for active identity and bank
- Enhanced payout eligibility logic, 403 for unverified KYC (was 400)
- New column for storing identity meta data

**Encryption for Sensitive Data — Dec 2025**
- Hashing configuration and encryption/decryption for sensitive user data across buy/sell routes

**Daily Sell Limit — Dec 2025**
- Implemented daily sell limit check in sell route
- Restored limit check after refactoring

**Order Listing Performance — Dec 2025**
- Added composite index on `(userId, createdAt)` in `OrderB2C` entity
- Index on `Payment.orderId`
- Database configuration improvements

**Gold Rate Precision — Dec 2025**
- Gold rate formatting to 4 decimal places in buy/sell/user-home routes
- Per-milligram display consistency
- Gold value precision and payment method logic in order routes

**OTP Rate Limiting — Dec 2025**
- Rate limiting middleware for OTP requests and verification

**Sell Configuration API — Dec 2025 (PR #4)**
- Sell route enhancements: user bank account details, vault handling, response structure

**Clevertap Event Fix — Apr 2026 (PR #26)**
- Fixed duplicate trigger issue for CleverTap events in Novo sell DigiGold flow

**Minimum Amount Change — Apr 2026**
- Changed minimum sell amount from 5 to 8

---

### 4. `recon-service` — Financial Reconciliation System

**Stack:** TypeScript (Bun) · BigQuery · PostgreSQL · Kubernetes · Slack  
**Period:** Jun 2026  
**Commits by Anuj:** 100+ | **PRs:** 2 | **Primary author — built from scratch**

> This service was built entirely by Anuj in June 2026. It runs 47+ reconciliation checks across all financial flows, querying BigQuery daily tables and alerting on Slack.

#### Architecture

- BigQuery-backed reconciliation using `jj-anl.public` dataset
- Daily snapshot tables (`recon.*_daily`) for cost-bounded queries
- `RECON_ENABLED` master switch to hard-gate BigQuery access
- Scheduler with tick re-entrancy protection, adaptive timeout, 2-min stagger between checks
- Daily email digest + Slack alerts with readable format

#### Reconciliation Flows Implemented (47 checks)

**Wallet Recon (`wallet/i1–i5`)**
- `i1`: Running-balance recon — per-currency opening/closing balance vs transaction ledger
- `i5`: Opening/closing balance running-balance recon with daily table migration (372 MB → 25 MB)
- Cross-flow wallet↔ledger reconciliation

**Payment Recon (`payment/i1–i7`)**
- `i1`: Captured zero-sum check
- `i2`: Orphan payment check
- `i3`: Orphan credit check / PROMO_REWARD orphans
- `i5`: Coupon reward consistency
- `i7`: `first_payment_done` flag integrity (redesigned from BQ evidence)
- JioPay null-flow topup coverage (₹47L gems leak fix)

**Orders Recon (`orders/i1–i6`)**
- `i1`: Zero-sum check
- `i2`: Orphan order check
- `i3`: Orphan deduction check
- `i4`: Refund consistency
- `i5–i6`: RTO fault visibility, gift-card/bundle refund prevention (excludes internal QA roles)
- Scoped to orders created ≥ 2026-03-01 (when `origin_id` linkage started)

**DigiGold Recon (`digigold/i1–i16`)**
- `i1–i3`: Monolith-internal claim checks
- `i4–i8`: Cross-system + vault conservation (face_value=0 leak fix)
- `i9–i12`: Sell-side + house/vendor hedge
- `i14`: Vault-empty payout check
- `i15`: TDS >₹50L watchdog (FY start auto-computed, most recent April 1 IST)
- `i16`: GST decomposition
- Unsellable sell-all dust detection, paisa GST drift

**Fantasy Recon (`fantasy/i1–i4`)**
- `i1`: Matrix-vs-users authoritative payout check (COMPLETED fixtures only)
- `i4`: Orphan GAME_REWARD credit check

**Conversion Recon (`conversion/i1–i4`)**
- `i1`: Zero-sum + count-parity aggregate headline
- `i2`: Orphan conversion
- `i3`: Orphan debit
- `i4`: Stuck conversion check

**Promoter Recon (`promoter/i1–i6`)**
- `i1`: Count-parity aggregate
- `i5–i6`: Conversion→wallet cross-system + earnings integrity
- Money-out (withdrawal+conversion) recon suite

**Infra Recon (`infra/i1`)**
- Day-end system snapshot recorder

**Additional flows:** Referral, giftcard, deals, aviator, spin (`spin/i1`: reward credit integrity)

#### Performance Optimizations
- Migrated all checks to daily tables from live scans
- `payment/i7 + infra/i1`: 477 MB → 50 MB
- `promoter/i5 + wallet/i4`: 3.9 GB → 188 MB
- `horizon order reads`: 8.2 GB → 133 MB
- `conversion/i4` (stuck conversion): 372 MB → 25 MB

---

### 5. `socket-service-2.0` — Real-Time WebSocket Service (Go)

**Stack:** Go · NATS JetStream · Redis · Kubernetes · Datadog · OpenTelemetry  
**Period:** Apr – May 2026  
**Commits by Anuj:** 77 | **PRs:** 10 | **Built from scratch**

> This service was designed and built entirely by Anuj. It is the real-time backbone for Horizon's trading platform, serving live order updates, wallet notifications, and market data to browser clients.

#### Architecture

```
Frontend (browser)
    |
    wss://ws.test.joinjumbo.com/ws?token=<JWT>
    |
[ GCP Load Balancer + Ingress ]
    |
[ ws-service pod(s) ]  ← Backend services push via HTTP API
    |           |
  [ NATS ]   [ Redis ]
```

#### Key Technical Achievements

**Epoll-based Connection Handling**
- Built custom epoll event loop to handle thousands of concurrent WebSocket connections
- Fixed epoll read loop stalls blocking all sockets
- Fixed race condition in force disconnect sending frame to wrong device
- Fixed WebSocket stale-session disconnect deadlock
- Prevented per-connection epoll fd extraction issues using `syscall.Conn`

**NATS Integration (Cross-instance Messaging)**
- Per-connection NATS user subscriptions replaced with a single wildcard subscription (performance improvement)
- Multi-user rooms with JetStream durable event log (PR #10)
- NATS-based broadcasting: targeted, force-disconnect, channel fan-out

**Redis Distributed State**
- Session registry across pods: connection tracking, channel membership
- Fixed deduplication of NATS subscriptions and channel member storage

**Blue-Green Deployments**
- Full GCP blue-green deploy workflow (CI/CD)
- Deploy to private GKE cluster using GCP Connect Gateway
- Fixed CI lint and security failures

**Observability**
- Integrated Datadog for prod (PR #3, #7)
- OpenTelemetry integration with SigNoz (traces, spans)
- Per-connection debug toggles, request ID tracking
- Cohort fields, disconnect classification, delivery metrics, fanout traces (PR #7)

**Auth & Security**
- JWT authentication (matches existing Jumbo token format)
- API key authentication
- Bearer token prefix parsing + client metadata from WS query params
- Predefined channels with channel validation

**Go Standards & Tooling**
- Golangci-lint, CI pipeline setup
- Docker + K8s manifests for test/staging/prod namespaces
- Version injection, security scan, editorconfig
- Go toolchain bumped to 1.26.3

---

### 6. `horizon` — Opinion Trading / Prediction Market Platform

**Stack:** TypeScript · Bun · PostgreSQL · Redis · NATS · gRPC  
**Period:** May – Jun 2026  
**Commits by Anuj:** 100+ | **PRs:** 60+

> Horizon is an opinion trading platform where users buy YES/NO positions on real-world events. Prices scale 1–9, YES+NO=10. Built on a two-level order system with a matching engine.

#### Key Features Built

**Partial Exit v2 + Exit↔Exit Matching (May–Jun 2026)**
- Built full partial exit v2 feature: `order_exit` schema, contracts, scaffolding
- Exit↔exit matching: users can exit positions against each other (not just entry orders)
- Settlement aggregates for exit-level payouts
- Fixed: clamp exit-fill to prevent exit-cancel poison loop (PR #313)
- Fixed: no spurious price-improvement refund on exit matches (PR #314)
- Fixed: split mixed exit+entry match batches so entry trades aren't dropped (PR #308)
- Fixed: credit price-improvement `OT_ROLLBACK` on exit matches (PR #310)
- Fixed: event-level exit should exit remaining qty when open partial-exit slice exists
- Fixed: reset parent `l2_quantity` on exit re-place after full cancel
- Fixed: mount `exitRoutes` (v2 exit endpoints were unreachable in prod, PR #305)
- Fixed: clamp `l1_cancelled` on match-persist for cancel/match race (PR #?)
- `orders/v2` listing endpoint with per-cycle exit rows + socket parity (PR #293)
- `todayRewards` in portfolio response, settlement-aggregates fix (PR #303)

**gRPC Atlas Integration (Jun 2026)**
- Migrated `@horizon/atlas` client from `txn.v1` to `atlas.v1`
- Added gRPC debit/credit endpoints (PR #306–307)
- Full `vault → atlas` rename across package, env, and RPC wrappers (PR #299–300)

**Feature Flags — GrowthBook (May 2026)**
- Replaced Flagsmith with GrowthBook `@horizon/flags`
- Feature flags for FTUX and market order flows (PR #280)

**NATS Socket Migration (May 2026)**
- Migrated all socket pushes from HTTP to NATS (PR #273 area)
- Exit socket events added

**Matching Engine — Market Orders (May 2026)**
- Market order support with hard-guard against cancel refunds
- Fixed: correct depth side for `MARKET-on-exit-slice` match
- Fixed: use stock side for `MARKET-vs-exit-slice` position delta
- Fixed: route no-match payloads (market refunds) to normal path

**Marketing Events (May 2026)**
- Partial-match events, exit chronology, currency property (PR #273)
- `exitLevel` property derived from partial-match quantity
- Exit event currency based on profit/loss
- Cached entity reads in Redis for marketing events

**User Metrics (May 2026)**
- In-flight buy/exit progress fractions (`user_metrics.event_status`)
- Seed `user_metrics.event_status` from event on insert
- Exclude pending exit qty from matched investment
- `GET /user/topics/participated` endpoint
- Event settle metric filters API

**Testing Infrastructure (May 2026)**
- Isolated Testcontainers integration harness + sharded CI (PR #287)
- NATS added to test infra for socket-emitter migration
- Fixed flaky tests

**Zero-Downtime Deploys (May 2026)**
- Rolling deploys for `api-service`, `admin-service`, `order-engine` (PR #285)

**Recon System (May 2026)**
- Replaced BigQuery recon with Postgres read replica
- Fixed: read event status from primary (not replica) to avoid stale reads (PR #296–297)

**OTel Auto-Instrumentation (May 2026)**
- Registered OpenTelemetry auto-instrumentations with preload on Bun (PR #276)

**E2E Test Worker (May 2026)**
- HTTP-triggered Go worker for end-to-end scenarios (PR #279)

**Admin AI Rule Generation Fix**
- Fixed Vertex AI endpoint (global vs regional) to resolve prod 429 errors (PR #286)

---

### 7. `jumbo-admin-dashboard` — Internal Admin Panel

**Stack:** TypeScript · React · REST APIs  
**Period:** Jan – May 2026  
**Commits by Anuj:** 100+

#### Key Features Built

**Horizon Module — Jan 2026 (PR #343)**
- Full Horizon module: categories, topics, events management in the admin dashboard
- Player scorecard and point update UI

**Support Dashboard — Jan 2026**
- Built complete support dashboard with user management, transaction history, escalation
- Escalate issue module: list, create, update status
- Date filter, table pagination, search input handling
- Transaction purpose ID, updated filters

**Fixture Management UI — Mar–Apr 2026**
- Enhanced fixture management with new components and styles
- Sync tour fixtures functionality

**Leaderboard Rank Sync — Jan 2026**
- Leaderboard rank sync functionality
- Point leaderboard type support

**Access Control — Jan–May 2026**
- Access control for support dashboard
- Added multiple team members to Horizon/KYC access lists

**Cricket Scorecard Tests — Jan 2026 (PR #266)**
- Comprehensive tests for scorecard calculations and updates

**CI/CD — Mar 2026**
- Fixed `react-hooks/purity` lint error
- Added test branch to CI
- PR checks workflow

**Product Image Validation — Mar 2026**
- 100 KB max file size validation for product images

**Horizon API Integration — Feb 2026**
- Integrated Horizon API base URL configuration for categories

**Other**
- Aviator transaction endpoint update
- Fixture time tooltip (exact times)
- Shopping credits calculation in user profile section
- Player scorecard update with `update player point meta`

---

### 8. `signoz-logger` — Observability Library

**Stack:** TypeScript · SigNoz · OpenTelemetry  
**Status:** Public npm package  
**Description:** TypeScript observability library for SigNoz (logs, traces, metrics)  
**Repo member** — setup workflows for CI (tests Node.js 16.x, 18.x, 20.x) and npm publish on release

---

## Contribution Statistics

### Commits by Repository (Author: anuj-jumbo)

| Repository | Commits (Author) | Notes |
|---|---|---|
| `server` | 100+ | Pagination limit hit; actual higher |
| `fantasy-service` | 100+ | Pagination limit hit; actual higher |
| `recon-service` | 100+ | Pagination limit hit; actual higher |
| `jumbo-admin-dashboard` | 100+ | Pagination limit hit; actual higher |
| `horizon` | 100+ | Pagination limit hit; actual higher |
| `digigold-service` | 71 | |
| `socket-service-2.0` | 77 | Primary author |
| `payment-service` | 6 | |
| `aviator-service` | 4 | |
| `identity-service` | 1 | |
| `lambda-central` | 1 | |

**Estimated Total Commits (author):** 600+ across tracked repos

### Pull Requests by Repository

| Repository | PRs Authored |
|---|---|
| `horizon` | 60+ |
| `socket-service-2.0` | 10 |
| `digigold-service` | 5 |
| `jumbo-admin-dashboard` | multiple (100+ commits) |
| `recon-service` | 2 |
| `server` | 1 (+ many direct commits) |

### Languages Used

| Language | Repos |
|---|---|
| TypeScript | server, fantasy-service, digigold-service, recon-service, horizon, jumbo-admin-dashboard, signoz-logger |
| Go | socket-service-2.0, (atlas, fantasy-worker) |
| JavaScript | legacy/utility repos |
| SQL / PLpgSQL | server (database queries) |
| Dockerfile / Shell | All services |
| Java | oms-core-service, order-service (team repos) |

### Active Period

- **Start:** September 2025
- **Most Active:** November 2025 – June 2026
- **Last Active:** June 24, 2026

---

## Key Technical Contributions

### 1. Built Socket Service v2 from Scratch (Go)
Designed and implemented a production-grade WebSocket service in Go for the Horizon trading platform. Key innovations: epoll-based connection handling (thousands of concurrent WS connections), NATS JetStream for durable cross-instance message delivery, Redis for distributed session state, blue-green Kubernetes deployments, Datadog + OpenTelemetry observability. Solved multiple race conditions in the connection lifecycle. **Stack: Go, NATS, Redis, GKE, Datadog, OTel.**

### 2. Built Reconciliation Service from Scratch (47+ BQ checks)
Designed and built a financial reconciliation system covering every money flow in the Jumbo platform. 47 checks across wallet, payment, orders, fantasy, DigiGold, conversion, promoter, referral, giftcard, deals, aviator, and spin. Implemented per-check daily-table routing to reduce BigQuery costs from GBs to MBs per check. Added daily email digest + Slack alerts. **Stack: TypeScript/Bun, BigQuery, PostgreSQL, GKE.**

### 3. Partial Exit v2 + Exit↔Exit Matching (Horizon)
Designed and implemented the partial exit feature for the opinion trading platform — allowing users to exit their YES/NO positions before event settlement. Built exit↔exit matching (positions trade against each other), price-improvement rollback credits, cancel/match race condition fixes, and v2 order listing with per-cycle exit rows. 20+ PRs in a 3-week sprint.

### 4. CDN API Layer for Fantasy (100k+ users scale)
Built the entire CDN-cached API layer for fantasy sports: fixture list, player list, contest list, scorecard, comms, filter, and metadata APIs. Implemented proper `Cache-Control` headers, `stale-while-revalidate`, and caching strategy for high-traffic match-day scenarios.

### 5. DigiGold Backend (Full Feature Ownership)
Owned the DigiGold buy/sell backend: CleverTap analytics integration, daily sell limits, JWT session management, identity/KYC refactor (KYC + BANK constants), encryption for sensitive user data, gold rate precision (4 decimal places), OTP rate limiting. 71 commits over a 3-month ownership period.

### 6. GrowthBook Feature Flag Integration
Integrated GrowthBook via the OpenFeature SDK in both `server` (NestJS monolith) and `horizon` (Bun service), replacing ad-hoc hardcoded flags with runtime-configurable feature gates across the platform.

### 7. Admin Dashboard — Support & Horizon Modules
Built the support dashboard (user management, escalation, transaction history, date filtering) and the Horizon module (categories, topics, events management) in the internal React admin panel.

---

## Skills Demonstrated

### Backend Engineering
- **NestJS (TypeScript)** — Large-scale modular monolith; entities, services, controllers, DTOs
- **Bun + TypeScript** — Recon service and Horizon trading platform
- **Go** — Socket service (epoll, goroutines, channels, interfaces, testing)
- **REST API design** — Pagination, caching, CDN headers, versioning
- **gRPC** — Atlas vault service integration

### Data & Databases
- **PostgreSQL** — Complex queries, migrations, indexing, composite indexes, PLpgSQL
- **Redis** — Session storage, API response caching, distributed state
- **BigQuery** — Cost-bounded reconciliation queries, daily table routing
- **Database performance** — Query optimization, index strategy, bounded scans

### Real-Time Systems
- **WebSocket** — Epoll-based connection handling at scale
- **NATS / JetStream** — Cross-instance messaging, durable event logs, room management
- **Event-driven architecture** — SQS, NATS, socket pushes via message queues

### Infrastructure & DevOps
- **Kubernetes (GKE)** — Deployments, HPAs, Ingress, secrets, namespaces, blue-green
- **Docker** — Multi-stage Dockerfiles, efficient image builds
- **GitHub Actions** — CI/CD pipelines, linting, deploy workflows
- **Argo CD** — GitOps deployment (team repo: `jumbo-gitops`)
- **Pulumi / Terraform** — IaC (Azure infra, socket-service Pulumi config)
- **GCP** — Cloud SQL, BigQuery, Artifact Registry, GKE, Vertex AI

### Observability
- **Datadog** — APM, traces, child spans for API breakdown
- **OpenTelemetry** — Auto-instrumentation, custom spans
- **SigNoz** — Logs, traces, metrics via `signoz-logger` library

### Financial Systems
- **Reconciliation** — Zero-sum checks, orphan detection, cross-system integrity
- **Payment flows** — Razorpay, Slice, JioPay integrations
- **Gold trading** — Buy/sell/payout flows, tax calculation (TDS, GST)
- **Opinion trading** — Order matching engine, settlement, price improvement

### Frontend
- **React (TypeScript)** — Admin dashboard, data tables, forms, access control
- **React Native (TypeScript)** — Consumer mobile app (team codebase)

### Testing
- **Testcontainers** — Isolated integration test harness for Horizon
- **Unit tests** — Scorecard calculation tests, matching engine tests

### Analytics & Marketing
- **CleverTap** — Event tracking integration for DigiGold user actions
- **SQS** — Async event queue for analytics

---

## Organization Context

**JoinJumbo** is a fintech/gaming startup offering:
- **Fantasy sports** (cricket fantasy leagues)
- **DigiGold** (digital gold buy/sell platform)
- **Horizon** (opinion trading / prediction market)
- **Aviator & Games** (crash games, mines, coin flip, plinko)
- **Consumer mobile app** (savings, jackpot, referrals)

**Team size:** 25+ engineers (Engineering team + Intern team)

**Anuj's position:** Core backend engineer contributing to multiple revenue-critical services simultaneously.

---

## Public Repositories (Personal Contributions)

| Repository | Language | Description |
|---|---|---|
| `plinko-game` | Svelte | Plinko game built with Svelte 5 |
| `coin-flip` | TypeScript | Coin flip game |
| `MineRush` | TypeScript | Mines game clone (Stake Casino) |
| `Aviator-Crash` | TypeScript | Full-stack Aviator crash game |
| `email-verifier` | Go | Go library for email verification without sending emails |
| `cf-workflow` | TypeScript | Cloudflare workflow |
| `test-go` | Go | Go experiments |

---

*Generated: 2026-06-24 | Source: GitHub API (joinjumbo org + anuj-jumbo user)*
