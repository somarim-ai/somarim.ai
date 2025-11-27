const AWS = require('aws-sdk');

class AWSActions {
  async execute(commands) {
    const results = [];
    for (const command of commands) {
      const { service: serviceName, action, params } = command;

      if (!AWS[serviceName]) {
        throw new Error(`Service '${serviceName}' is not a valid AWS service.`);
      }

      const service = new AWS[serviceName]();

      if (typeof service[action] !== 'function') {
        throw new Error(`Action '${action}' is not a valid method on service '${serviceName}'.`);
      }

      console.log(`Executing AWS command: ${serviceName}.${action} with params:`, params);
      const result = await service[action](params).promise();
      results.push(result);
    }
    return results;
  }
}

module.exports = { AWSActions };
