from aws_cdk import (
    aws_s3 as s3,
    aws_s3_deployment as s3_deploy,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    RemovalPolicy,
    CfnOutput
)
from constructs import Construct

class CostOptimizedFrontend(Construct):
    def __init__(self, scope: Construct, construct_id: str):
        super().__init__(scope, construct_id)
        
        # S3 Bucket
        self.bucket = s3.Bucket(
            self, "FrontendBucket",
            bucket_name=f"somarim-frontend-{self.node.addr[-8:]}",
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            removal_policy=RemovalPolicy.DESTROY,
            auto_delete_objects=True
        )
        
        # 🚀 CloudFront with price optimization
        self.distribution = cloudfront.Distribution(
            self, "Distribution",
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3Origin(self.bucket),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
                compress=True
            ),
            default_root_object="index.html",
            price_class=cloudfront.PriceClass.PRICE_CLASS_100,  # 🚀 North America/Europe only
            enable_logging=False  # 🚀 Save $2-3/month
        )
        
        # Deploy frontend
        s3_deploy.BucketDeployment(
            self, "FrontendDeployment",
            sources=[s3_deploy.Source.asset("../frontend/dist")],
            destination_bucket=self.bucket,
            distribution=self.distribution,
            distribution_paths=["/*"],
            prune=True
        )
        
        self.distribution_url = f"https://{self.distribution.domain_name}"
        self.distribution_id = self.distribution.distribution_id
