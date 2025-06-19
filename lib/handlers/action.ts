"use server";

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "../http-errors";
import { Session } from "next-auth";
import { auth } from "@/auth";
import dbConnect from "../mongoose";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

// Check if the action is authorized and validate the parameters against the schema
// If validation fails, return a ValidationError
// If authorization fails, return an UnauthorizedError
// If everything is fine, return the session and params
async function action<T>({ params, schema, authorize }: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else return new Error("Schema validation failed");
    }
  }

  let session: Session | null = null;
  if (authorize) {
    session = await auth();
    if (!session) {
      return new UnauthorizedError();
    }
  }
  await dbConnect();
  return { session, params };
}

export default action;
