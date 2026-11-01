# Concepts you'll meet

Your learning log is empty, so everything is listed. Focus concepts for this app are marked ⭐.

| Concept                          | In plain words                                                | Salesforce equivalent                            | Where it shows up                                                    |
| -------------------------------- | ------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| ⭐ NestJS modules                | One folder per domain area, wired together by a module file   | Grouping related classes in a package            | `places`, `lists` modules                                            |
| ⭐ Dependency injection          | A class asks for what it needs, and the framework provides it | Passing a selector into a service, but automatic | Google client inside the search service, swapped for a fake in tests |
| ⭐ Controllers and services      | Controllers handle HTTP, services hold logic                  | `@RestResource` calling an Apex service class    | Every endpoint                                                       |
| ⭐ DTOs and validation           | Checks the shape of input before your code runs               | Validation rules                                 | `POST /places/search`                                                |
| ⭐ Prisma schema                 | Tables defined in a code file                                 | Custom objects and fields                        | `schema.prisma`                                                      |
| ⭐ Migrations                    | Tracked, repeatable database changes                          | Metadata deploys                                 | Every schema change                                                  |
| ⭐ Prisma relations              | Links between tables, with delete behaviour                   | Lookup and Master-Detail                         | List to SavedPlace                                                   |
| ⭐ Owner filtering               | Each query only touches your rows                             | Sharing rules, but you write them                | All list queries                                                     |
| Monorepo                         | Several apps in one repo sharing code                         | One SFDX project with several packages           | `apps/web`, `apps/api`, `packages/shared`                            |
| Shared Zod schemas               | One definition of a shape, checked at runtime by both apps    | Shared Apex wrapper class plus validation        | Search request and response                                          |
| Server and Client Components     | Some components run only on the server, some in the browser   | No direct equivalent, closest is Apex versus LWC | Map and filters are client components                                |
| React Query                      | Fetches and caches data in the browser                        | Lightning Data Service                           | Search results                                                       |
| Browser Geolocation              | The browser asks permission and gives a location              | LWC location service in the mobile app           | First search                                                         |
| Field masks                      | You list the fields you want, and pay by the richest one      | SOQL field list, but with a price                | Google client                                                        |
| Fan-out and deduplication        | One user search makes several calls, then merges results      | Several SOQL queries merged in a Map by ID       | Search service                                                       |
| Rate limiting and budgets        | Limits you must set yourself                                  | Governor limits                                  | ADR 006                                                              |
| Same-origin proxy, CORS, cookies | Why the browser treats two addresses as strangers             | Remote Site Settings and CORS allowlist          | ADR 004                                                              |
| Sessions and magic links         | A signed-in state, started from an emailed link               | Login session, passwordless login                | Stage 2                                                              |
| Cold starts                      | A sleeping server takes time to wake                          | No equivalent, the platform is always on         | ADR 005                                                              |
| Docker image                     | A packaged, runnable copy of the app                          | No equivalent                                    | API deploy to Render                                                 |
| CI/CD, staging, preview deploys  | Automated checks and safe test copies                         | Sandbox plus change sets, automated              | Every PR                                                             |
| Error monitoring                 | The app reports its own failures                              | Exception emails and debug logs, always on       | Sentry                                                               |
| Decision records                 | A few lines on why we chose X                                 | Design notes                                     | `decisions/`                                                         |
| Walking skeleton                 | The thinnest slice that runs end to end                       | A one-field deploy through to production         | Issue 1                                                              |
| Test levels                      | Unit, integration, end-to-end                                 | Test classes, with no browser-level equivalent   | Issues throughout                                                    |
