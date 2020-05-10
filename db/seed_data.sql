INSERT INTO Company (name, address)
VALUES ('TestGym', 'San Jose, CR');

INSERT INTO Exercise(name)
VALUES
('Deadlift'),
('Curl de Bíceps'),
('Sentadillas'),
('Extensión de rodillas'),
('Press plano de banca');

INSERT INTO CompanyExercise(company_id, exercise_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);

INSERT INTO CompanyExercise(company_id, exercise_id, name)
VALUES
(1, null, 'Bicho muerto');

INSERT INTO Person (identification, first_name, last_name, birth_date)
VALUES ('402070775', 'Juan', 'Sanchez', '1990-09-20');

INSERT INTO Employee (identification, company_id)
VALUES ('402070775', 1);

INSERT INTO RoutineTemplate (name, employee_identification, company_id)
VALUES ('Activación', '402070775', 1);

INSERT INTO RoutineTemplateExercise (routine_template_id, company_exercise_id)
VALUES (1, 6), (1, 3);