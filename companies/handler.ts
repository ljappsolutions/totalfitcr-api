import { APIGatewayProxyHandler } from "aws-lambda";
import { Database } from "../shared/dbcontext";
import { getSuccessResponse } from "../shared/utils/http";

export const getCompanies: APIGatewayProxyHandler = async (_event) => {
  const context = await new Database().getContext();
  const companies = await context.companies.find();
  return getSuccessResponse(companies);
}