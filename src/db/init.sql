-- src/db/init.sql
-- Aquí irán los registros iniciales

-- Insertar datos en la tabla periods
INSERT INTO periods (year, start_date, end_date, is_current) VALUES
('2023-2024', '2023-09-01', '2024-06-30', true),
('2022-2023', '2022-09-01', '2023-06-30', false);

-- Insertar datos en la tabla trimesters
INSERT INTO trimesters (period_id, name, start_date, end_date, is_current) VALUES
(1, 'Primer Trimestre', '2023-09-01', '2023-12-15', true),
(1, 'Segundo Trimestre', '2024-01-08', '2024-03-22', false),
(1, 'Tercer Trimestre', '2024-04-01', '2024-06-30', false);

-- Insertar datos en la tabla evaluations
INSERT INTO evaluations (trimester_id, name, evaluation_number, is_final, start_date, end_date) VALUES
(1, 'Evaluación 1', 1, false, '2023-10-15', '2023-10-20'),
(1, 'Evaluación 2', 2, false, '2023-11-15', '2023-11-20'),
(1, 'Evaluación Final', 3, true, '2023-12-08', '2023-12-15');

-- Insertar datos en la tabla users
INSERT INTO users (username, email, password, role, is_active) VALUES
('admin', 'admin@example.com', 'password', 'director', true),
('teacher1', 'teacher1@example.com', 'password', 'docente', true),
('student1', 'student1@example.com', 'password', 'estudiante', true);

-- Insertar datos en la tabla teachers
INSERT INTO teachers (user_id, first_name, last_name) VALUES
(2, 'Profesor', 'Uno');

-- Insertar datos en la tabla grades
INSERT INTO grades (name, level_number) VALUES
('Primero de Secundaria', 1),
('Segundo de Secundaria', 2);

-- Insertar datos en la tabla sections
INSERT INTO sections (grade_id, name, period_id) VALUES
(1, 'A', 1),
(2, 'B', 1);

-- Insertar datos en la tabla students
INSERT INTO students (user_id, first_name, last_name) VALUES
(3, 'Estudiante', 'Uno');

-- Insertar datos en la tabla courses
INSERT INTO courses (name, code) VALUES
('Matemáticas', 'MAT101'),
('Lenguaje', 'LEN101');

-- Insertar datos en la tabla enrollments
INSERT INTO enrollments (student_id, section_id, period_id, enrollment_date, status) VALUES
(1, 1, 1, '2023-09-01', 'active');

-- Insertar datos en la tabla grade_courses
INSERT INTO grade_courses (grade_id, course_id, hours_per_week) VALUES
(1, 1, 5),
(2, 2, 4);

-- Insertar datos en la tabla teacher_assignments
INSERT INTO teacher_assignments (teacher_id, course_id, section_id, period_id) VALUES
(1, 1, 1, 1),
(1, 2, 2, 1);

-- Insertar datos en la tabla themes
INSERT INTO themes (course_id, name, description, order_index) VALUES
(1, 'Números Naturales', 'Introducción a los números naturales', 1),
(2, 'La Comunicación', 'Conceptos básicos de la comunicación', 1);

-- Insertar datos en la tabla materials
INSERT INTO materials (theme_id, title, description, type, content_url, is_required, created_by) VALUES
(1, 'Guía de Números Naturales', 'Guía para aprender sobre números naturales', 'documento', 'url', true, 1),
(2, 'Video sobre la Comunicación', 'Video explicativo sobre la comunicación', 'video', 'url', true, 1);

-- Insertar datos en la tabla grades_records
INSERT INTO grades_records (student_id, course_id, evaluation_id, teacher_id, grade_value) VALUES
(1, 1, 1, 1, 'A');

-- Insertar datos en la tabla attendance
INSERT INTO attendance (student_id, section_id, course_id, date, status) VALUES
(1, 1, 1, '2023-10-16', 'present');

-- Insertar datos en la tabla schedules
INSERT INTO schedules (section_id, course_id, teacher_id, day_of_week, start_time, end_time) VALUES
(1, 1, 1, 1, '08:00', '09:00');

-- Insertar datos en la tabla notifications
INSERT INTO notifications (user_id, title, message, notification_type) VALUES
(1, 'Bienvenido', 'Bienvenido a la plataforma', 'general');
