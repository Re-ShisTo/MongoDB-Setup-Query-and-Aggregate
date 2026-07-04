use("novelty1");
// db.createCollection("users");

//single data insertion
// db.users.insertOne({
//   name: "Re_shista",
//   age: 24,
//   family: "Ranjan",
// });

// multiple data insertion
// db.users.insertMany([
//   {
//     name: "Sujan",
//     age: 40,
//     family: "Mazi",
//     assets: 1000,
//   },
//   {
//     name: "Arka",
//     age: 24,
//     family: "Khaled",
//     assets: 100000,
//   },
//   {
//     name: "Mehedi",
//     age: 26,
//     family: "Mandela"
//     owner: 1,
//     ownerName: "Arka",
//     assets: 1,
//     assetName: "Sun Tzu Book",
//   },
// ]);

// access all docs
// db.users.find({});

// access with conditions
// db.users.find({ family: "President" });

//Single entity data Conditional deleletion

// this method does not returns the entity that was deleted but only the number of data deleted
// db.users.deleteOne({ cucubine: null });

// this method returns the entity that was deleted
// db.users.findOneAndDelete({
//   name: "Shakib",
// });

// selection with projection for accessing specific key and value of an entity.
// db.users.find({}, { name: 1 });

// Single entity data update or creating new key and value
// db.users.updateMany({ family: "President" }, { $set: { assets: 10 } });

//logical query operatiors $and, $or, $not, $nor
// db.users.find({ $nor: [{ family: "President" }] });

// Comparison query operators $eq, $gt, $gte, $in, $lt, $lte, $ne, $nin
// db.users.find({
//   age: { $gte: 25 },
// });

// Element query operatrs $exists, $type
// db.users.find({ family: { $exists: true } });

// Evaluation Query Operators $expr, $jsonSchema, $mod, $regex, $text, $where
// db.users.find({ name: { $regex: "Re" } });

// Sort, Limit, Distinct & Row Count
// db.users.find().sort({ name: 1 }).limit(2);
// db.users.distinct("name", { assets: 10 });

// Aggregation Pipeline
db.users.aggregate([
  {
    $addFields: {
      power: {
        $sum: [
          { $toInt: { $ifNull: ["$age", 0] } },
          { $toInt: { $ifNull: ["$assets", 0] } },
          { $toInt: { $ifNull: ["$owner", 0] } },
        ],
      },
    },
  },
  {
    $sort: { power: -1 },
  },
]);
