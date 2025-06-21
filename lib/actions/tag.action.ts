import { ActionResponse, PaginatedSearchParams, Tag } from "@/types/global";

export const getTags = async (
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: Tag[]; isNext: boolean }>> => {};
