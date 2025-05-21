// importallcsv.js
const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI;
console.log(uri, "uri");

const dbName = "visaDB";
const client = new MongoClient(uri);

const fileCollectionMap = {
  "passport-index-tidy.csv": "passportIndexTidy",
  "passport-index-tidy-iso2.csv": "passportIndexTidyIso2",
  "passport-index-tidy-iso3.csv": "passportIndexTidyIso3",
  "passport-index-matrix.csv": "passportIndexMatrix",
  "passport-index-matrix-iso2.csv": "passportIndexMatrixIso2",
  "passport-index-matrix-iso3.csv": "passportIndexMatrixIso3",
};

async function importCSVFiles() {
  try {
    await client.connect();
    const db = client.db(dbName);

    for (const [fileName, collectionName] of Object.entries(
      fileCollectionMap
    )) {
      const filePath = `./csv/${fileName}`;
      const results = [];

      if (!fs.existsSync(filePath)) {
        console.warn(`❌ File not found: ${fileName}`);
        continue;
      }

      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (row) => results.push(row))
          .on("end", async () => {
            const collection = db.collection(collectionName);
            await collection.deleteMany({});
            await collection.insertMany(results);
            console.log(
              `✅ Inserted ${results.length} records into ${collectionName}`
            );
            resolve();
          })
          .on("error", reject);
      });
    }

    await client.close();
    console.log("✅ All CSV files imported.");
  } catch (error) {
    console.error("❌ Error during CSV import:", error);
    await client.close();
  }
}

module.exports = importCSVFiles;
