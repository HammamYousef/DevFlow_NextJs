import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// This route handles GET requests to fetch all users.
export async function GET() {
  try {
    await dbConnect();

    const users = await User.find();
    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create a new user
export async function POST(request: Request) {
  try {
    await dbConnect();

    const userData = await request.json();
    const validateData = UserSchema.safeParse(userData);
    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }
    const { email, username } = validateData.data;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email.");
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error(
        "Username already exists. Please choose a different one."
      );
    }

    // Create a new user
    const newUser = await User.create(validateData.data);

    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
