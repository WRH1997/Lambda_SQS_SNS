import json
import boto3
import time
import time


lambdaClient = boto3.client('lambda')

while True: 
    response = lambdaClient.invoke(
        FunctionName='arn:aws:lambda:us-east-1:363707741195:function:fulfillTaxiRequest'
    )
    currentTime = time.localtime()
    currTimeStr = time.strftime("%H:%M:%S", currentTime)
    print(currTimeStr)
    print(response)
    print("----------")
    time.sleep(120)

