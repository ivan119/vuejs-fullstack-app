DROP TABLE IF EXISTS projects;

DROP TYPE IF EXISTS current_status;
CREATE TYPE current_status AS ENUM ('in-progress', 'completed');

CREATE TABLE projects (
                          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
                          created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
                          name TEXT NOT NULL,
                          slug TEXT UNIQUE NOT NULL,
                          status current_status DEFAULT 'in-progress' NOT NULL,
                          collaborators TEXT[] DEFAULT ARRAY[]::VARCHAR[] NOT NULL
);