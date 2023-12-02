DROP TABLE IF EXISTS 'songs'; --prevent overwrite, insurance

CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	titleSong text,
	notes varchar NOT NULL,
	instrument text,
	imageLink text,
	author text,
	genre text,
	releaseDate text
	
);

-- ALTER TABLE songs ADD COLUMN mp3_path text;


INSERT INTO songs (id, titleSong, notes, instrument, imageLink, author, genre, releaseDate) 
VALUES 
(1, 'Ode to Joys', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'piano', './image/id_1.PNG', 'CSC 600', 'Dubstep Remix', '2023'),
(2, 'Twinkle Little Star', 'C5 C5 G5 G5 A5 A5 G5 F5 F5 E5 E5 D5 D5 C5 G5 G5 F5 F5 E5 E5 D5 G5 G5 F5 F5 E5 E5 D5 C5 C5 G5 G5 A5 A5 G5 F5 F5 E5 E5 D5 D5 C5', 'Xylephone', './image/id_1.PNG', 'Team 009', 'Kid Song', '2023'),
(3, 'Testing123...', 'D5 E4 E4 D5 D4', 'piano', './image/id_1.PNG', 'test', 'test', 'test'),
(4, 'Guitar test', 'E_note E_note A_note A_note D_note D_note', 'Electric_Guitar', './image/id_1.PNG', 'Kao Saephan', 'Test Song', '2023') ;
