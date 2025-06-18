import boto3
from datetime import datetime
from botocore.exceptions import ClientError

//# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='eu-north-1')
table = dynamodb.Table('JobApplications')

//# Initialize AWS SES
ses = boto3.client('ses', region_name='eu-north-1')

//# Replace with your SES-verified email
SENDER = "1da22cs162.cs@drait.edu.in"
RECIPIENT = "1da22cs162.cs@drait.edu.in"  
SUBJECT = "⏰ Job Application Deadline Alert"

def send_email(job):
    """Send an email using AWS SES."""
    body_html = f"""
    <html>
    <head></head>
    <body>
      <h2>Deadline Reached for a Job Application</h2>
      <p><strong>Company:</strong> {job['company']}</p>
      <p><strong>Role:</strong> {job['role']}</p>
      <p><strong>Deadline:</strong> {job['deadline']}</p>
      <p>Please take necessary action immediately.</p>
    </body>
    </html>
    """

    try:
        response = ses.send_email(
            Source=SENDER,
            Destination={"ToAddresses": [RECIPIENT]},
            Message={
                "Subject": {"Data": SUBJECT},
                "Body": {"Html": {"Data": body_html}}
            }
        )
        print(f"✅ Email sent for jobId: {job['jobId']}")
    except ClientError as e:
        print(f"❌ Failed to send email: {e.response['Error']['Message']}")

def check_deadlines():
    """Scan all jobs and send alerts for deadlines matching today."""
    today = datetime.today().strftime('%Y-%m-%d')
    print(f"🔍 Checking deadlines for: {today}")

    response = table.scan()
    jobs = response.get('Items', [])

    for job in jobs:
        if 'deadline' in job and job['deadline'] == today:
            print(f"📬 Deadline reached for job: {job['jobId']}")
            send_email(job)

if __name__ == "__main__":
    check_deadlines()
