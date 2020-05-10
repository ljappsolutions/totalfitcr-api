import { APIGatewayProxyResult } from "aws-lambda"

export const getSuccessResponse = (body: any): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(body, null, 2),
  }
}