import { APIGatewayProxyHandler } from "aws-lambda";
import { Database } from "../shared/dbcontext";
import { getSuccessResponse } from "../shared/utils/http";

export const getExercises: APIGatewayProxyHandler = async (_event) => {
  const context = await new Database().getContext();
  const exercises = await context.exercises.find();
  return getSuccessResponse(exercises);
}