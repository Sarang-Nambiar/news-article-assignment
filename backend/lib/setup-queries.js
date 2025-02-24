const createTables = `
CREATE TABLE IF NOT EXISTS Article (
id INTEGER PRIMARY KEY AUTOINCREMENT,
Title TEXT NOT NULL,
Date TEXT NOT NULL,
Summary TEXT NOT NULL,
Publisher TEXT NOT NULL
)
`;

module.exports = createTables;