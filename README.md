# DDD Pattern Nest Typescript
    src/
    ├── common/
    │   ├── decorators/
    │   ├── filters/
    │   ├── guards/
    │   ├── interceptors/
    │   └── pipes/
    ├── config/
    ├── modules/
    │   ├── auth/
    │   │   ├── controllers/
    │   │   ├── dtos/
    │   │   ├── services/
    │   │   └── auth.module.ts
    │   ├── users/
    │   │   ├── controllers/
    │   │   ├── dtos/
    │   │   ├── entities/
    │   │   ├── repositories/
    │   │   ├── services/
    │   │   └── users.module.ts
    │   └── other-module/
    ├── shared/
    │   ├── dtos/
    │   ├── entities/
    │   ├── repositories/
    │   ├── services/
    │   └── utils/
    ├── app.module.ts
    ├── main.ts



# Create Migration
- npx typeorm migration:create -n CreateEmployeeTable
