const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "..", "recruitment.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.message);
    throw new Error(
      "Failed to connect to the recruitment database: " + err.message
    );
  }
  console.log("Connected to the recruitment database");

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            stage TEXT NOT NULL,
            applicationDate TEXT NOT NULL,
            overallScore REAL NOT NULL,
            referralStatus TEXT NOT NULL,
            assessmentStatus TEXT NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error("Error creating candidates table: " + err.message);
          throw new Error("Failed to create candidates table: " + err.message);
        }
        console.log("Candidates table created successfully or already exists");

        db.get("SELECT COUNT(*) AS count FROM candidates", (err, row) => {
          if (err) {
            console.error("Error checking candidates table: " + err.message);
            throw new Error("Failed to check candidates table: " + err.message);
          }
          console.log("Candidates table has data or is empty");
        });
      }
    );
  });
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database connection: " + err.message);
      throw new Error(
        "Failed to close the database connection: " + err.message
      );
    }
    console.log("Database connection closed");
    process.exit(0);
  });
});

module.exports = db;