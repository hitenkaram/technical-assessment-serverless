# Technical assessment serverless

This repo is for the serverless backend API, build only for technical assessment.

Refer [Design Document](https://github.com/hitenkaram/technical-assessment-serverless/blob/master/ADR.md)

#### Usage

To use this repo locally you need to have the [Serverless framework](https://serverless.com) installed.

``` bash
$ npm install serverless -g
```

Clone this repo and install the NPM packages.

``` bash
$ git clone --
$ npm install
```

Run this to deploy to your AWS account.

``` bash
$ serverless deploy
```

Create a record(like below) in DynamoDb table(created by above serverless deploy command).

``` bash
{
  "accountId": "1cc0b498-69cb-11ea-bc55-0242ac130003",
  "createdAt": 1584663544729,
  "logUsage": 195,
  "updatedAt": 1584663544729
}
```

Run get account usage API on local.

``` bash
$ serverless invoke local --function get-account-usage --path mocks/get-account-usage-event.json
```

Where, `event.json` contains the request event info and looks something like this.

``` json
{
  "pathParameters": {
    "accountId": "1cc0b498-69cb-11ea-bc55-0242ac130003"
  }
}
```

Run update function on local.

``` bash
$ serverless invoke local --function update-account-usage --path mocks/update-account-usage-event.json
```

Where, `event.json` contains the request event info and looks something like this.

``` json
{
    "Records": [
        {
            "EventSource": "aws:sns",
            "EventVersion": "1.0",
            "EventSubscriptionArn": "arn:aws:sns:x:x:x:x",
            "Sns": {
                "Type": "Notification",
                "MessageId": "3ce4935c-cda2-5d96-84fc-c5b1ace5fed6",
                "TopicArn": "arn:aws:sns:x:x:x",
                "Subject": null,
                "Message": "{\n  \"accountId\":\"1cc0b498-69cb-11ea-bc55-0242ac130003\",\n   \"logData\":\"Some new logs for the given accountId\"\n}",
                "Timestamp": "2020-03-19T12:01:11.941Z",
                "SignatureVersion": "1",
                "Signature": "Erig12GSr9DJtUPTcJ+vNESlRcktCK8AFAnTbBumcSHkgd/PRr2v8e2DSKDEFjB7CybHpWzCxF3SVOoPjRScx/QBGb4cHCodzy8+2EqUM9MpH1GdVULDFZbBq1VmGx1oOrfjLuLANeZByoIFKiVu//cI3HclrJtPNUx4IVveP+M+2SGW6EfWww1BDbh3w1hvCEDT0XSGoE3GkUhSx/183QgS6AUhSEVgrLrQw1KQ6HREd304LVX9nXUryz3/rHA+vO8DqqYetF+8KqSNwHfz1T0GQPJHt4EuKqG6hyhr3uoyI/8Rh0/MISJljHwcVAZj7iOARAMoazq0NRyMgjqRuw==",
                "SigningCertUrl": "https://sns.x.amazonaws.com/SimpleNotificationService-x.pem",
                "UnsubscribeUrl": "https://sns.x.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:x:x:x:x",
                "MessageAttributes": {}
            }
        }
    ]
}

```
Run unit test.

``` bash
$ npm test
```

#### Not part of the repo
Code for persisting logs to S3 & Unit tests for DB - CRUD layer
Create and Delete feature service(only read and update are part of this repo)
API docuementation - Validate requests at API level, declare request/response models
API to Lambda - Non-Proxy Integration
Caching at different layers - Cloudfront, API, Lambda, DAX, Elasticache
Middlewares like Middy or dazn-lambda-powertools
Creation of table, SNS and Subscriptio of Lambda to SNS
Kinesis to stream data entry events
Prod readiness - Authentication/API key(throttling/quota/usage), WAF, Cloudfront, Route53 
