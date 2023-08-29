import json
import boto3
import random

sns = boto3.client('sns')
carType = ['Compact', 'Mid-Size Sedan', 'Luxury']
carAccessories = ['GPS', 'Camera']
client = ['6050 University Avenue', '5670 Spring Garden Rd.', '476 Aurora Lane']


def lambda_handler(event, context):
    msg = {}
    msg['carType'] = random.choice(carType)
    msg['accessories'] = random.choice(carAccessories)
    msg['client'] = random.choice(client)
    msgStr = json.dumps(msg)
    response = sns.publish(TopicArn='arn:aws:sns:us-east-1:363707741195:HalifaxTaxi',Message=msgStr)
    print("Message published")
    return(response)
