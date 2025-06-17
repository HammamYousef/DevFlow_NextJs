import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// This route handles GET requests to fetch an account by their ID.
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account");
  }

  try {
    await dbConnect();
    const account = await Account.findById(id);
    if (!account) {
      throw new NotFoundError("Account");
    }
    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// This route handles PUT requests to update an account by their ID.
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account");
  }

  try {
    await dbConnect();
    const accountData = await request.json();
    const validateData = AccountSchema.partial().safeParse(accountData);
    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }
    const updatedAccount = await Account.findByIdAndUpdate(id, validateData, {
      new: true,
    });
    if (!updatedAccount) {
      throw new NotFoundError("Account");
    }
    return NextResponse.json(
      {
        success: true,
        data: updatedAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// This route handles DELETE requests to remove an account by their ID.
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account");
  }

  try {
    await dbConnect();
    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) {
      throw new NotFoundError("Account");
    }
    return NextResponse.json(
      {
        success: true,
        message: "Account deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
