CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(80) NOT NULL,
	"mark_complete" BOOLEAN NOT NULL DEFAULT FALSE 
);

INSERT INTO "tasks"
("task", "mark_complete")
VALUES
('Dishes','N'),
('Laundry', 'N'),
('Homework','N');
