"use server";

import { actionClient } from "@/lib/action-client";
import { returnValidationErrors } from "next-safe-action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fromZonedTime } from "date-fns-tz";

const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
});

export const createBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }
    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
    });
    if (!service) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Service not found"],
      });
    }
    
    const utcDate = fromZonedTime(date, "America/Sao_Paulo");

    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date: utcDate,
      },
    });

    if (existingBooking) {
      console.error("Já existe um agendamento para essa data");
      return returnValidationErrors(inputSchema, {
        _errors: ["Já existe um agendamento para essa data"],
      });
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date,
        userId: session?.user.id,
        barbershopId: service.barbershopId,
      },
    });
    return booking;
  });
