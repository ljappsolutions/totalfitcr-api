import { APIGatewayProxyHandler } from "aws-lambda";
import { getSuccessResponse } from "../shared/utils/http";
import * as AWS from 'aws-sdk';
import { UserDto } from "../shared/dto/user";

export const getUsers: APIGatewayProxyHandler = async (event) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const response = await cognito.listUsers({
    UserPoolId: 'us-east-1_k6ka2yoSi',
  }).promise();
  return getSuccessResponse(response.Users.map(x => 
    new UserDto().fromCognito(x)));
}

export const postUser: APIGatewayProxyHandler = async (event) => {
  console.log(event.body);
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const params = {
    UserPoolId: 'us-east-1_k6ka2yoSi',
    Username: 'juanda2003@msn.com',
    MessageAction: 'SUPPRESS',
    UserAttributes: [
      {
        Name: "name",
        Value: "Juan"
      },
      {
        Name: "family_name",
        Value: "Sanchez"
      },
      {
        Name: "email",
        Value: "juanda2003@msn.com"
      },
      {
        Name: "custom:company",
        Value: "1"
      },
      {
        Name: "custom:id",
        Value: "402070775"
      }
    ],
  };
  const response = await cognito.adminCreateUser(params).promise();
  console.log(response);
  const responseConfirm = await cognito.adminSetUserPassword({
    UserPoolId: 'us-east-1_k6ka2yoSi',
    Username: 'juanda2003@msn.com',
    Password: 'pass1234$Abc',
    Permanent: true,
  }).promise();
  console.log(responseConfirm);
  return getSuccessResponse({
    response,
    responseConfirm
  });
}