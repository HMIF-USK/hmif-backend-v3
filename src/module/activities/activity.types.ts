import { activityStatus } from "@prisma/client";

export type CreateActivityPayload = {
  title: string;
  description: string;
  division: string;
  /** Kegiatan Informatic Club tidak selalu punya lokasi — kolomnya diisi "" kalau kosong. */
  location?: string;
  status?: activityStatus;
  event_start: string;
  event_end: string;
  created_by_user_id: string;
  photos?: string[];
};

/** Pemilik record tidak boleh berpindah lewat update. */
export type UpdateActivityPayload = Partial<Omit<CreateActivityPayload, "created_by_user_id">>;