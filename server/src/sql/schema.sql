CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text,
	notes varchar NOT NULL,
	instrument text,
	image_link text,
	author text,
	genre text,
	public_time text
);

-- ALTER TABLE songs ADD COLUMN mp3_path text;


INSERT INTO songs (id, song_title, notes, instrument, image_link, author, genre, public_time, mp3_path) 
VALUES 
(1, 'Ode to Joy', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'piano', './image/id_1.PNG', 'N/A', 'Dubstep Remix', 'N/A'),
(2, 'Twinkle Little Star', 'C5 C5 G5 G5 A5 A5 G5 F5 F5 E5 E5 D5 D5 C5 G5 G5 F5 F5 E5 E5 D5 G5 G5 F5 F5 E5 E5 D5 C5 C5 G5 G5 A5 A5 G5 F5 F5 E5 E5 D5 D5 C5', 'piano', './image/id_1.PNG', 'N/A', 'N/A', 'N/A'),
(3, 'Testing...', 'D5 E4 E4 D5 D4', 'piano', './image/id_1.PNG', 'test', 'test', 'test');
