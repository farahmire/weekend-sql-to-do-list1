CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(80) NOT NULL,
	"mark_complete" VARCHAR(80)
);

INSERT INTO "tasks"
("task", "mark_complete")
VALUES
('Dishes','N'),
('Laundry', 'N'),
('Homework','N');
