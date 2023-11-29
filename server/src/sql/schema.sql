CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	instrument text,
	image_link text,
	author text,
	genre text,
	public_time text
);

INSERT INTO songs (id, song_title, notes, instrument, image_link, author, genre, public_time) 
VALUES 
(1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'piano', './image/id_1.PNG', 'N/A', 'Remix', 'N/A'),
(2, 'some note', 'D5 E4 E4 D5 D4', 'piano', './image/id_1.PNG', 'sample', 'testing', 'test');