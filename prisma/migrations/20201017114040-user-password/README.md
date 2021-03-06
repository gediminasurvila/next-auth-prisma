# Migration `20201017114040-user-password`

This migration has been generated by Gediminas Survila at 10/17/2020, 2:40:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."users" ADD COLUMN "password" text   

ALTER INDEX "public"."provider_account_id" RENAME TO "providerAccountId"

ALTER INDEX "public"."provider_id" RENAME TO "providerId"

ALTER INDEX "public"."user_id" RENAME TO "userId"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201017114040-user-password
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,64 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Account {
+  id                 Int       @default(autoincrement()) @id
+  compoundId         String    @unique @map(name: "compound_id")
+  userId             Int       @map(name: "user_id")
+  providerType       String    @map(name: "provider_type")
+  providerId         String    @map(name: "provider_id")
+  providerAccountId  String    @map(name: "provider_account_id")
+  refreshToken       String?   @map(name: "refresh_token")
+  accessToken        String?   @map(name: "access_token")
+  accessTokenExpires DateTime? @map(name: "access_token_expires")
+  createdAt          DateTime  @default(now()) @map(name: "created_at")
+  updatedAt          DateTime  @default(now()) @map(name: "updated_at")
+
+  @@index([providerAccountId], name: "providerAccountId")
+  @@index([providerId], name: "providerId")
+  @@index([userId], name: "userId")
+
+  @@map(name: "accounts")
+}
+
+model Session {
+  id           Int      @default(autoincrement()) @id
+  userId       Int      @map(name: "user_id")
+  expires      DateTime
+  sessionToken String   @unique @map(name: "session_token")
+  accessToken  String   @unique @map(name: "access_token")
+  createdAt    DateTime @default(now()) @map(name: "created_at")
+  updatedAt    DateTime @default(now()) @map(name: "updated_at")
+
+  @@map(name: "sessions")
+}
+
+model User {
+  id            Int       @default(autoincrement()) @id
+  name          String?
+  email         String?   @unique
+  emailVerified DateTime? @map(name: "email_verified")
+  password      String?
+  image         String?
+  createdAt     DateTime  @default(now()) @map(name: "created_at")
+  updatedAt     DateTime  @default(now()) @map(name: "updated_at")
+
+  @@map(name: "users")
+}
+
+model VerificationRequest {
+  id         Int      @default(autoincrement()) @id
+  identifier String
+  token      String   @unique
+  expires    DateTime
+  createdAt  DateTime  @default(now()) @map(name: "created_at")
+  updatedAt  DateTime  @default(now()) @map(name: "updated_at")
+
+  @@map(name: "verification_requests")
+}
```


