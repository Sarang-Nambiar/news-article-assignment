const createTables = `
CREATE TABLE IF NOT EXISTS Article (
id INTEGER PRIMARY KEY AUTOINCREMENT,
Title TEXT DEFAULT NULL,
Date TEXT DEFAULT NULL,
Summary TEXT DEFAULT NULL,
Publisher TEXT DEFAULT NULL
)
`;

module.exports = createTables;