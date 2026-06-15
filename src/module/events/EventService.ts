import { PrismaClient } from "@prisma/client";
import { IEvent } from "./event.types";

const prisma = new PrismaClient();

class EventService {
  public async getAllEvents() {
    const events: IEvent[] = await prisma.proker.findMany({
      where: {
        status: {
          not: "ComingSoon"
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        event_start: true,
        event_end: true,
        location: true
      },
      orderBy: {
        event_start: "desc"
      }
    });

    return {
      message: "Success get events",
      data: events
    };
  }

  public async getEventById(id: string) {
    const event: IEvent | null = await prisma.proker.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        description: true,
        event_start: true,
        event_end: true,
        location: true
      }
    });

    if (!event) {
      throw new Error("Event tidak ditemukan");
    }

    return {
      message: "Success get event",
      data: event
    };
  }
}

export default new EventService();