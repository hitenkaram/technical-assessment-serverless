import * as dynamoDbLib from "./libs/dynamodb-lib";
import { calculateUsage } from "./libs/usage-lib";

import {
  success,
  failure
} from "./libs/response-lib";

export async function main(event, context) {
  const message = JSON.parse(event.Records[0].Sns.Message);
  const params = {
    TableName: process.env.tableName,
    Key: {
      accountId: message.accountId
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);

    if (result.Item) {
      const usage = calculateUsage(Buffer.byteLength(message.logData, 'utf8'),result.Item.logUsage);
      const updatedparams = {
        TableName: process.env.tableName,
        Key: {
          accountId: message.accountId
        },
        UpdateExpression: "SET logUsage = :logUsage, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":logUsage": usage,
          ":updatedAt": Date.now()
        },
        ReturnValues: "ALL_NEW"
      };
      await dynamoDbLib.call("update", updatedparams);

      return success({
        status: true
      });
    } else {
      return failure({
        status: false,
        error: "Item not found."
      });
    }
  } catch (e) {
    return failure({
      status: false
    });
  }
}
