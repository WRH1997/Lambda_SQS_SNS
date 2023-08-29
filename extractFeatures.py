import json
import boto3

def lambda_handler(event, context):
    newFileKey = event['Records'][0]['s3']['object']['key']
    print(newFileKey)
    
    s3 = boto3.client('s3')
    data = s3.get_object(Bucket="sampledata-b00919848", Key=newFileKey)
    content = data['Body'].read().decode('utf-8') 
    print(content)
    
    wordList = content.split()
    print(wordList)
    namedEntities = {}
    for word in wordList:
        if word.istitle():
            if word in namedEntities:
                namedEntities[word] = namedEntities[word] + 1
            else:
                namedEntities[word] = 1
    print(namedEntities)
    newContent = json.dumps(namedEntities)
    print(newContent)
    
    newFileKey = newFileKey.split(".txt")[0] + "ne.txt"
    response = s3.put_object(Body=newContent, Bucket='tags-b00919848', Key=newFileKey)
    print(response)
    return response


