#### MongoDB Database Set Up and User Manual

##### Required Materials:

- MogoDB Atlas
  or,
  [MongoDB community sever](https://www.mongodb.com/try/download/community-kubernetes-operator) with [Compass](https://www.mongodb.com/products/tools/compass) to control a server and database.
- Install MongoDB for VSCode extension to connect to the database.

##### File setup:

1. Create a file as `fileName.mongodb.js`
1. Create a connection with the MongoDB for VSCode with atlas or compass.
1. Create a database & collection:

```js
use("dbName");
db.createCollection("collectionName");
```

4. **_Single entity data insertion:_**

```js
db.collectionName.insertOne({
  Key: value,
});
```

5. _Remember to comment out the createCollection and data insert function before running any new insert function._

6. **_Multiple entity data insertion:_**

```js
db.collectionName.insertMany({
  Key: value,
});
```

7. **_Unconditional Access on data:_**

```js
db.collectionName.find({});
```

8. **_Conditional Access on data:_**

```js
db.collectionName.find({
  Key: value, // of the data requiring access
});
```

9. **_Single entity data Conditional deleletion:_**

```js
db.collectionName.deleteOne({
  key: value, // of the data requiring deletion
  //this method does not return the entity that was deleted but only the number of data deleted
});
```

or,

```js
db.collectionName.findOneAndDelete({
  key: value, // of the data requiring deletion
  //this method returns the entity object that was deleted
});
```

10. **_Selection with projection_** for accessing specific key and value of an entity. setting a key to 1 or true MongoDB shifts into "Inclusion Mode." It hides all other keys in the document and only displays the keys including its value you explicitly asked for.

```js
db.collectionName.find(
  {},
  {
    Key: 1, // of the specific requiring access
  },
);
```

11. **_Single entity data update:_**

```js
db.collectionName.updateOne(
  {
    _id: ObjectId(idNumber),
  },
  {
    key: valueToChange,
  },
);
```

12. **_Query Operators types:_**
    1. **Logical Query Operators:**
    - `$and`: Logical AND Operator
    - `$or`: Logical OR Operator
    - `$not`: Logical NOT operator
    - `$nor`: Logical NOR operator

    ```js
    db.collectionName.find({
      $nor: [{ key: value }],
    });
    ```

    2. **Comparison Query Operators:**
    - `$eq`: Equal To Operator
    - `$lt`: Less Than Operator
    - `$lte`: Less Than or Equal To Operator
    - `$gt`: Greater Than Operator
    - `$gte`: Greater Than or Equal To Operator
    - `$ne`: Not Equal To Operator
    - `$in`: In Operator
    - `$nin`: Not In Operator

    ```js
    db.collectionName.find({ key: { $gte: value } });
    ```

    3. **Element Query Operators:**
    - `$exists`: Matches documents that have the specified field.
    - `$type`: Selects documents if a field is of the specified type.

    ```js
    db.collectionName.find({
      key: { $exists: true },
    });
    ```

    4. **Evaluation Query Operators:**
    - `$expr`: Allows use of aggregation expressions within the query language.
    - `$jsonSchema`: Validate documents against the given JSON Schema.
    - `$mod`: Performs a modulo operation on the value of a field and selects documents with a specified result.
    - `$regex`: Selects documents where values match a specified regular expression.
    - `$text`: Performs text search.
    - `$where`: Matches documents that satisfy a JavaScript expression.

    ```js
    db.collectionName.find({
      key: { $regex: /value/ },
    });
    ```

    5. **Array Query Operators:**
    - `$all`: Matches arrays that contain all elements specified in the query.
    - `$size`: Selects documents if the array field is a specified size.

    ```js
    db.collectionName.find({
      key: { $size: value },
    });
    ```

    6. **Modification Operators:**
    - `$reset`: Resets the value of a field to its default value.
    - `$unset`: Removes the specified field from a document.
    - `$rename`: Renames a key.
    - `$set`: Sets the value of a field in a document.

    ```js
    db.collectionName.updateOne(
      {
        _id: ObjectId(idNumber),
      },
      {
        $rename: { oldKey: newKey },
      },
    );
    ```

13. **_Sort, Limit, Distinct & Row Count:_**

- `$sort`: Sorts thedocuments in ascending(1) or descending(-1) order based on the specified key.
- `$limit`: Limits the number of documents returned in the result set.
- `$distinct`: Returns an array of distinct values for the specified key.
- `$count`: Returns the number of documents that match the query.

```js
db.collectionName.find().sort({ key: 1 }).limit(2);
db.collectionName.distinct("key", { key: value });
db.collectionName.count({ key: value });
```

14. **_Aggregation pipeline:_** In MongoDB, `aggregate` is a powerful method used to process large amounts of data by passing it through a multi-stage sequence, known as an aggregation pipeline.
    Think of it exactly like an assembly line factory. You dump all your raw database documents into the front of the pipeline. The data then flows through individual Stages one by one. Each stage transforms the data slightly and passes the new result to the next stage until you get a finely tuned, finished product at the very end.
    **Aggregate stage operators:**
    - `$match` : Filters the documents to pass only those that match the specified condition(s) to the next pipeline stage.
    - `$group`: Groups input documents by a specified identifier expression and applies the accumulator expressions to each group.
    - `$project`: Reshapes each document in the stream, such as by adding new fields or removing existing fields.
    - `$sort`: Sorts all input documents and returns them to the pipeline in sorted order.
    - `$limit`: Limits the number of documents returned in the result set.
    - `$skip`: Skips a specified number of documents before returning the rest.
    - `$unwind`: Deconstructs an array field from the input documents to output a document for each element.
    - `$lookup`: Performs a left outer join with another collection to match documents based on a specified condition.
    - `$addFields`: Adds new fields to documents.
    - `$replaceRoot`: Replaces the input document with the specified document.
    - `$count`: Returns the number of documents in the pipeline.
    - `$facet`: Allows for multiple aggregation pipelines to be executed in parallel and their results to be combined into a single output.
    - `$bucket`: Categorizes input documents into groups, called buckets, based on a specified expression and bucket boundaries.
    - `$bucketAuto`: Automatically categorizes input documents into groups, called buckets, based on a specified expression and an automatic determination of bucket boundaries.
    - `$sortByCount`: Groups input documents by a specified expression and returns each unique value along with its count, sorted by count in descending order.
    - `$geoNear`: Performs a geospatial query to find documents near a specified location.

```js
db.collectionName.aggregate([{ stage1 }, { stage2 }, { stage3 }]);
// Here stages are different operators that can be used to transform the data in various ways.Such as:
db.users.aggregate([
  {
    $addFields: {
      power: {
        $sum: [
          // [Here $sum despite being a aggregate operator, it's not a stage .
          // Because it does not decide how the documents flow through the pipeline,
          // instead it decides how a field value is computed. These are what
          // we call "expressions". Such as: $add, $subtract, $ifNull, $toInt, $toString]
          { $toInt: { $ifNull: ["$key", 0] } }, // converts the value to an integer and if null, sets 0
          { $toInt: { $ifNull: ["$key", 0] } },
          { $toInt: { $ifNull: ["$key", 0] } },
          { $toInt: { $ifNull: ["$key", 0] } },
          { $toInt: { $ifNull: ["$key", 0] } },
          { $toInt: { $ifNull: ["$key", 0] } },
        ],
      },
    },
  },
  {
    $sort: { power: -1 },
  },
]);
```
