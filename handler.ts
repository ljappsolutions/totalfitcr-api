import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import { getCompanies } from './companies/handler';
import { getRoutineTemplates } from './routine-templates/handler';
import { getExercises } from './exercises/handler';
import { postUser, getUsers } from './users/handler';

if (process.env.IS_OFFLINE) {
  var credentials = new AWS.SharedIniFileCredentials({
    profile: 'ljapp-amplify',
  });
  AWS.config.credentials = credentials;
}

export {
  getCompanies,
  getRoutineTemplates,
  getExercises,
  postUser,
  getUsers,
};
