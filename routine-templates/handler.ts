import { APIGatewayProxyHandler } from "aws-lambda";
import { Database } from "../shared/dbcontext";
import { getSuccessResponse } from "../shared/utils/http";

export const getRoutineTemplates: APIGatewayProxyHandler = async (_event) => {
  const context = await new Database().getContext();
  const routineTemplates = await context.routineTemplates.find();
  return getSuccessResponse(routineTemplates);
}