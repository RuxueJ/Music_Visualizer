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
(1, 'Ode to Joys', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'piano', './img/visualizer_bg.jpg', 'CSC 600', 'Dubstep Remix', '2023'),
(2, 'Twinkle Little Star', 'C5 C5 G5 G5 A5 A5 G5 F5 F5 E5 E5 D5 D5 C5 G5 G5 F5 F5 E5 E5 D5 G5 G5 F5 F5 E5 E5 D5 C5 C5 G5 G5 A5 A5 G5 F5 F5 E5 E5 D5 D5 C5', 'piano', './img/visualizer_bg.jpg', 'Team 009, Whoa!', 'Kids Songs', 'Dec 2023'),
(3, 'Marys Little Lamb', 'E5 D5 C5 D5 E5 E5 E5 D5 D5 D5 E5 E5 E5 E5 D5 C5 D5 E5 E5 E5 E5 D5 D5 E5 D5 C5', 'piano', './img/visualizer_bg.jpg', 'Team 009 Yay!', 'Childrens Songs', 'Fall 2023'),
(4, 'Jingle Bell', 'E6 E6 E6 E6 E6 E6 E6 G6 C6 D6 E6 F6 F6 F6 F6 F6 F6 E6 E6 E6 E6 G6 G6 F6 D6 C6', 'Anh_Xylophone', './img/visualizer_bg.jpg', 'Team 009 Yay!', 'Childrens Songs', 'Fall 2023'),
(5, 'Row Row Your Boat', 'D5 D5 D5 E5 Gb5 Gb5 E5 Gb5 G5 A5 D5 D5 A5 A5 Gb5 Gb5 Gb5 D5 D5 A5 G5 Gb5 E5 D5', 'piano', './img/visualizer_bg.jpg', 'Team 009 Nice!', 'Toddler Songs', 'Nov 2023'),
(6, 'I Love You, Barney', 'G5 E5 G5 G5 E5 G5 A5 G5 F5 E5 D5 E5 F5 E5 F5 G5 C5 C5 C5 C5 C5 D5 E5 F5 G5 G5 D5 D5 F5 E5 D5 C5', 'Ruxue_Zheng', './img/visualizer_bg.jpg', 'Team 009 Wow!', 'Barney Songs', 'Oct 2023');