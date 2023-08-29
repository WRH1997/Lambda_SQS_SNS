import json
import boto3

def lambda_handler(event, context):

    sqs = boto3.client('sqs')
    carTypeRes = sqs.receive_message(
        QueueUrl="https://sqs.us-east-1.amazonaws.com/363707741195/CarType",
        MaxNumberOfMessages = 1,
        WaitTimeSeconds = 10
    )

    accessoriesRes = sqs.receive_message(
        QueueUrl="https://sqs.us-east-1.amazonaws.com/363707741195/Accessories",
        MaxNumberOfMessages = 1,
        WaitTimeSeconds = 10
    )
    
    addressRes = sqs.receive_message(
        QueueUrl="https://sqs.us-east-1.amazonaws.com/363707741195/Address",
        MaxNumberOfMessages = 1,
        WaitTimeSeconds = 10
    )
    
    print(carTypeRes)
    ct1 = json.loads(carTypeRes['Messages'][0]['Body'])
    ct2 = json.loads(ct1['Message'])
    carType = ct2['carType']
    
    print(accessoriesRes)
    ar1 = json.loads(accessoriesRes['Messages'][0]['Body'])
    ar2 = json.loads(ar1['Message'])
    accessories = ar2['accessories']
    
    print(addressRes)
    adr1 = json.loads(addressRes['Messages'][0]['Body'])
    adr2 = json.loads(adr1['Message'])
    address = adr2['client']

    emailStr = "New Order!\nCar Type: " + carType + "\nAccessories: " + accessories + "\nClient Address: " + address
    
    emailSNS = boto3.client('sns')
    emailSNSResponse = emailSNS.publish(
        TargetArn = 'arn:aws:sns:us-east-1:363707741195:SendEmailNotification',
        Message = emailStr,
        MessageStructure = 'text'
    )
      
    return {
      'statusCode': 200,
      'body': json.dumps(emailSNSResponse)
    }


