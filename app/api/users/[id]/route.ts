import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// This route handles GET requests to fetch a user by their ID.
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User");
  }

  try {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("User");
    }
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// This route handles PUT requests to update a user by their ID.
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User");
  }

  try {
    await dbConnect();
    const userData = await request.json();
    const validateData = UserSchema.safeParse(userData);
    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    const updatedUser = await User.findByIdAndUpdate(id, validateData, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundError("User");
    }
    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// This route handles DELETE requests to remove a user by their ID.
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User");
  }

  try {
    await dbConnect();
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundError("User");
    }
    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
