import json
import boto3


def lambda_handler(event, context):
    
    newFileKey = event['Records'][0]['s3']['object']['key']
    s3 = boto3.client('s3')
    data = s3.get_object(Bucket="tags-b00919848", Key=newFileKey)
    content = json.loads(data['Body'].read().decode('utf-8') )
    
    ddb = boto3.resource('dynamodb')
    table = ddb.Table("namedEntities")

    for entity in content:
        value = content[entity]
        try:
            response = table.get_item(Key={'entity': entity})
            table.update_item(Key={'entity':entity}, UpdateExpression="set tally=if_not_exists(tally, :init) + :addX", ExpressionAttributeValues={':init':value, ':addX':value})
        except Exception as e:
            response = table.put_item(Item={"entity":entity, "tally":value})
    
    return response
    
