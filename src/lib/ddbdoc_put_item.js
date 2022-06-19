import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./ddbDocClient.js";

// Set the parameters.
const params = {
  TableName: "Music",
  /*
    Convert the key JavaScript object you are adding to the
    required Amazon DynamoDB record. The format of values specifies
    the datatype. The following list demonstrates different
    datatype formatting requirements:
    String: "String",
    NumAttribute: 1,
    BoolAttribute: true,
    ListAttribute: [1, "two", false],
    MapAttribute: { foo: "bar" },
    NullAttribute: null
     */
  Item: {
    'Artist': "Jordan", // For example, 'Season': 2
    'SongTitle': "The Reason", // For example,  'Episode': 2 (only required if table has sort key)
    'Reproductions': 15428 //For example 'Title': 'The Beginning'
  },
};

export const run = async () => {
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();