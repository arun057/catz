➜  catz ecs-cli  configure
FATA[0000] region can not be empty
➜  catz ecs-cli configure profile --profile-name arundev --access-key AKIAIGLLOL3THMGHTHDQ --secret-key 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
INFO[0000] Saved ECS CLI profile configuration arundev.
➜  catz ecs-cli configure --cluster catz --default-launch-type Fargate --region us-west-2 --config-name catz
FATA[0000] Supported launch types are 'EC2' and 'FARGATE'; Fargate is not a valid launch type.
➜  catz ecs-cli configure --cluster catz --default-launch-type FARGATE --region us-west-2 --config-name catz
INFO[0000] Saved ECS CLI cluster configuration catz.
➜  catz mkdir webserver
➜  catz touch webserver/Dockerfile
➜  catz ecs-cli up --cluster-config catz --ecs-profile arundev
INFO[0001] Created cluster                               cluster=catz region=us-west-2
INFO[0002] Waiting for your cluster resources to be created...
INFO[0002] Cloudformation stack status                   stackStatus=CREATE_IN_PROGRESS
INFO[0063] Cloudformation stack status                   stackStatus=CREATE_IN_PROGRESS
VPC created: vpc-08bd7c0204bfc9ad5
Subnet created: subnet-0b251aed7fa770ab9
Subnet created: subnet-0c9280c189414b03d
Cluster creation succeeded.



Default output format [None]:
➜  catz aws ec2 describe-security-groups --filters Name=vpc-id,Values=vpc-08bd7c0204bfc9ad5 --region us-west-2
{
    "SecurityGroups": [
        {
            "Description": "default VPC security group",
            "GroupName": "default",
            "IpPermissions": [
                {
                    "IpProtocol": "-1",
                    "IpRanges": [],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "UserIdGroupPairs": [
                        {
                            "GroupId": "sg-0dcb757c1fc131464",
                            "UserId": "318279325500"
                        }
                    ]
                }
            ],
            "OwnerId": "318279325500",
            "GroupId": "sg-0dcb757c1fc131464",
            "IpPermissionsEgress": [
                {
                    "IpProtocol": "-1",
                    "IpRanges": [
                        {
                            "CidrIp": "0.0.0.0/0"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "UserIdGroupPairs": []
                }
            ],
            "VpcId": "vpc-08bd7c0204bfc9ad5"
        }
    ]
}


➜  catz aws ec2 authorize-security-group-ingress --group-id sg-0dcb757c1fc131464 --protocol tcp --port 80 --cidr 0.0.0.0/0 --region us-west-2


