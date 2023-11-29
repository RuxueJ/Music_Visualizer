CREATE TABLE IF NOT EXISTS songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	instrument varchar NOT NULL,
	notes varchar NOT NULL,
	imageLink varchar
);

INSERT OR IGNORE INTO songs (id, song_title, instrument, notes) 
-- VALUES (1, 'Ode to Joy (Dubstep Remix)',  'piano','E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');
VALUES (1, 'Ode to Joy (Dubstep Remix)',  'piano','D4 E4 E4 D4 D4');