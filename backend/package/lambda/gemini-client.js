/**
 * @file Mock Gemini client for generating AWS SDK commands based on a text prompt.
 * This is a placeholder to simulate the behavior of a real AI model.
 */

class MockGeminiClient {
  /**
   * Simulates generating an AWS SDK command from a natural language prompt.
   * @param {string} prompt - The user's command, e.g., "Create an S3 bucket named 'my-bucket'".
   * @returns {Promise<string>} A JSON string representing the AWS command.
   */
  async generateCommand(prompt) {
    console.log(`MockGeminiClient received prompt: \"${prompt}\"`);

    // Simple keyword-based parsing for simulation
    if (prompt.toLowerCase().includes('create an s3 bucket')) {
      const bucketNameMatch = prompt.match(/'([^']+)'/);
      const bucketName = bucketNameMatch ? bucketNameMatch[1] : 'default-bucket-name';
      
      const command = {
        service: 'S3',
        action: 'createBucket',
        params: {
          Bucket: bucketName,
        },
      };
      return JSON.stringify(command);
    }
    
    // Add another example for creating a DynamoDB table
    if (prompt.toLowerCase().includes('create a dynamodb table')) {
        const tableNameMatch = prompt.match(/'([^']+)'/);
        const tableName = tableNameMatch ? tableNameMatch[1] : 'default-table-name';

        const command = {
            service: 'DynamoDB',
            action: 'createTable',
            params: {
                TableName: tableName,
                KeySchema: [
                    { AttributeName: 'id', KeyType: 'HASH' }
                ],
                AttributeDefinitions: [
                    { AttributeName: 'id', AttributeType: 'S' }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            }
        };
        return JSON.stringify(command);
    }

    // Fallback for unrecognized commands
    const errorCommand = {
      error: 'Command not recognized by MockGeminiClient.',
      originalPrompt: prompt,
    };
    return JSON.stringify(errorCommand);
  }
}

module.exports = { MockGeminiClient };