--used for uuid_generate_v4
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TYPE ticket_priority AS ENUM (
  'low',
  'medium',
  'high',
  'immediate'
);

CREATE TYPE ticket_types AS ENUM (
  'issue',
  'bug',
  'error',
  'feature request',
  'other'
);

CREATE TYPE ticket_status AS ENUM (
  'in progress',
  'new',
  'open',
  'resolved',
  'additional info required'
);

CREATE TYPE user_authority AS ENUM (
  'admin',
  'project manager',
  'developer',
  'guest admin',
  'guest project manager',
  'guest developer'
);

CREATE TABLE "users" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "first_name" VARCHAR(50) NOT NULL,
  "last_name" VARCHAR(50) NOT NULL,
  "phone" VARCHAR(15) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password_salt" VARCHAR(255) NOT NULL,
  "user_authority" user_authority NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE "projects" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR(50) NOT NULL,
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE "user_projects" (
  "project_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects (id),
  FOREIGN KEY ("user_id") REFERENCES users (id)
);

CREATE TABLE "tickets" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "title" VARCHAR(50) NOT NULL,
  "project_id" uuid NOT NULL,
  "description" TEXT,
  "author_id" uuid NOT NULL,
  "assigned_dev_id" uuid NOT NULL,
  "priority" ticket_priority,
  "type" ticket_types,
  "status" ticket_status,
  "time_estimate" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES projects (id),
  FOREIGN KEY (author_id) REFERENCES users (id),
  FOREIGN KEY (assigned_dev_id) REFERENCES users (id)
);

CREATE TABLE "comments" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "author_id" uuid NOT NULL,
  "ticket_id" uuid NOT NULL,
  "comment" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (author_id) REFERENCES users (id),
  FOREIGN KEY (ticket_id) REFERENCES tickets (id)
);

CREATE TABLE "ticket_history" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "ticket_id" uuid NOT NULL,
  "property_altered" VARCHAR(60) NOT NULL,
  "prev_val" VARCHAR(60) NOT NULL,
  "new_val" VARCHAR(60) NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (ticket_id) REFERENCES tickets (id)
);

-- ALTER TABLE "user_projects" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

-- ALTER TABLE "user_projects" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- ALTER TABLE "tickets" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

-- ALTER TABLE "tickets" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

-- ALTER TABLE "tickets" ADD FOREIGN KEY ("assigned_dev_id") REFERENCES "users" ("id");

-- ALTER TABLE "comments" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

-- ALTER TABLE "comments" ADD FOREIGN KEY ("ticket_id") REFERENCES "tickets" ("id");

-- ALTER TABLE "ticket_history" ADD FOREIGN KEY ("ticket_id") REFERENCES "tickets" ("id");
