import { prokerStatus } from "@prisma/client";

export interface IEvent {
  id: string;
  name: string;
  description: string;
  event_start: Date;
  event_end: Date;
  location: string;
  status: prokerStatus;
  departement: { id: string; name: string; description: string };
  fotoProkers: { id: string; url: string }[];
}
