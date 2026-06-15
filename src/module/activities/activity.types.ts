import { activityStatus } from "@prisma/client";

export type CreateActivityPayload = {
  title: string;
  description: string;
  division: string;
  location: string;
  status?: activityStatus;
  event_start: string;
  event_end: string;
  created_by_user_id: string;
  photos?: string[];
};

export type UpdateActivityPayload = Partial<CreateActivityPayload>;