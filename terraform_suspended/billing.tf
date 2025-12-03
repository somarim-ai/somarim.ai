resource "aws_cloudwatch_metric_alarm" "monthly_billing" {
  alarm_name          = "somarim-monthly-billing"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "EstimatedCharges"
  namespace           = "AWS/Billing"
  period              = "21600"
  statistic           = "Maximum"
  threshold           = "10"
  alarm_description   = "Monthly billing estimate exceeded $10"

  dimensions = {
    Currency = "USD"
  }
}
