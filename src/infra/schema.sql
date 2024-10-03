CREATE TABLE IF NOT EXISTS todo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed INTEGER DEFAULT 0
);

INSERT INTO todo (title) VALUES ('Web API入門');
INSERT INTO todo (title) VALUES ('React入門');
INSERT INTO todo (title) VALUES ('ドメイン設計入門');
