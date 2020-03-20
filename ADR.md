# Service to track the size of all logs sent from each customer.

|  |  |
|--|--|
| Stakeholders | Michael, Robert, Hiten |
| Status | In Progress|
| Date Updated | 20-03-2020 |


# Background
Platform bills customer based on the total size of logs processed (in bytes) for their account. Currently we receive the logs via SNS hence the entry point into this service is an SNS topic that broadcasts the following information:

const message = {
    accountId: string,
    logData: string,
}

###  Requirements

1.  All raw log data should be retained
2.  Users should be able to query the total usage for a customer based on accountId via a GET request

# Options

1. ** Seperate persistance and business logic lambdas **:


### Architecture diagram
![alt text](https://publicbucketobjects.s3.amazonaws.com/Serverless+Application+Architecture.png
"Fleet assessment diagram")


### Consequences
1. Performance - due to seperate persistance and logic to calculate the usage.
2. Maintainability - since unwanted Logs from S3 can be migrated to Glacier gradually.
3. Interoperability - S3 log files can be easily copied/shared to users S3(AWS) account.
