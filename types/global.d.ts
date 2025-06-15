import { NextResponse } from "next/server";

interface Tag {
  id: string;
  name: string;
}

interface Author {
  id: string;
  name: string;
  profilePictureUrl?: string;
}

interface Question {
  id: string;
  title: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]> | undefined;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };

type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;

type APISuccessResponse<T = null> =
  | NextResponse<SuccessResponse<T>>
  | ErrorResponse;
