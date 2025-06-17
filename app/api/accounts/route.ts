import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

/**
 * This file handles the API routes for accounts.
 * It includes GET and POST methods to retrieve and create accounts.
 * The GET method retrieves all accounts, while the POST method creates a new account.
 */
export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();
    return NextResponse.json(
      {
        success: true,
        data: accounts,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validateData = AccountSchema.parse(body);

    const existingAccount = await Account.findOne({
      provider: validateData.provider,
      providerAccountId: validateData.providerAccountId,
    });
    if (existingAccount) {
      throw new ForbiddenError(
        "An account with this provider and provider account ID already exists."
      );
    }

    const newAccount = await Account.create(validateData);
    return NextResponse.json(
      {
        success: true,
        data: newAccount,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
