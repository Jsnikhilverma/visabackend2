const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

exports.getVisaRequirements = async (req, res) => {
  const { source, destination } = req.body;

  if (!source || !destination) {
    return res
      .status(400)
      .json({ error: "source and destination are required" });
  }

  const filePath = path.join(__dirname, "../csv/passport-index-tidy-iso2.csv"); // Put your CSV in /data folder

  let found = false;

  try {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Trim and normalize data
        const passport = row.Passport?.trim().toUpperCase();
        const dest = row.Destination?.trim().toUpperCase();

        if (
          passport === source.toUpperCase() &&
          dest === destination.toUpperCase()
        ) {
          found = true;
          results.push(row.Requirement);
        }
      })
      .on("end", () => {
        if (!found) {
          return res.status(404).json({ requirement: "Not Found" });
        }
        return res.json({ requirement: results[0] });
      });
  } catch (err) {
    console.error("❌ Visa Check Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
