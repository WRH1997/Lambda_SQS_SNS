import os
import json
import boto3
import time

s3 = boto3.resource('s3')

for filename in os.listdir('./tech'):
    if filename == '.DS_store':
        continue
    print(filename)
    response = s3.meta.client.upload_file(os.path.join(os.getcwd(), "tech/"+filename), 'sampledata-b00919848', filename)
    time.sleep(0.1)


