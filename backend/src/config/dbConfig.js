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

          if (row.count === 0) {
            const candidates = [
              [
                "Amjana Senath",
                "Applying Period",
                "29 Oct 2024",
                3.5,
                "Referred",
                "Pending",
              ],
              [
                "Ashan Bandara",
                "Screening",
                "20 Oct 2024",
                3.5,
                "Not Referred",
                "Completed",
              ],
              [
                "Helith Jayasuriya",
                "Interview",
                "03 Sep 2024",
                4,
                "Not Referred",
                "Pending",
              ],
              [
                "Yasith Gunawardana",
                "Test",
                "03 Sep 2024",
                4.5,
                "Referred",
                "Completed",
              ],
            ];

            const insertStatement = db.prepare(
              "INSERT INTO candidates (name, stage, applicationDate, overallScore, referralStatus, assessmentStatus) VALUES (?, ?, ?, ?, ?, ?)"
            );
            candidates.forEach((candidate, index) => {
              insertStatement.run(candidate, (err) => {
                if (err) {
                  console.error(
                    "Error inserting candidate " +
                      candidate[0] +
                      ": " +
                      err.message
                  );
                  throw new Error(
                    "Failed to insert candidate " +
                      candidate[0] +
                      ": " +
                      err.message
                  );
                }
                console.log(
                  "Candidate " + candidate[0] + " inserted successfully"
                );
              });
            });
            insertStatement.finalize();
          } else {
            console.log("Candidates table already has data");
          }
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
