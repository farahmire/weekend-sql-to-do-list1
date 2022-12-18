
INSERT INTO "list"
("task")
VALUES
('Dishes'),
('Laundry'),
('Homework');

CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(80) NOT NULL,
	"mark_complete" BOOLEAN NOT NULL DEFAULT FALSE 
);
