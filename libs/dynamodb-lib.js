import AWS from "aws-sdk";

export function call(action, params) {


  const isTest = process.env.JEST_WORKER_ID;
  const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

  if (!isTest) {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    return dynamoDb[action](params).promise();
  }
  else {
    return new AWS.DynamoDB.DocumentClient(config);
  }
}
