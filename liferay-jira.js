'use strict';

const JiraApi = require('jira').JiraApi;
const FIX_PACK_REGEXP = /liferay-fixpack-portal/;

class LiferayJira {

  constructor(config) {
    this.jira = new JiraApi(config.protocol || 'https',
        config.host || 'issues.liferay.com',
        config.port,
        config.user,
        config.password,
        config.version || 'latest');
  }

  findIssue(issue) {
    return new Promise((fulfill, reject) => {
      this.jira.findIssue(issue, (error, issue) => {
        if (error) reject(error);
        else fulfill(issue);
      })
    });
  }

  findLabels(issue) {
    return this.findIssue(issue).then(issue => issue.fields.labels);
  }

  findFixPackInfo(issue) {
    return this.findLabels(issue).then(labels => labels.filter(label => FIX_PACK_REGEXP.test(label)));
  }
}

module.exports = LiferayJira;
