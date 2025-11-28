"use server";

import { actionClient } from "@/lib/action-client";
import { returnValidationErrors } from "next-safe-action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const inputSchema = z.object({
  bookingId: z.uuid(),
});

export const cancelBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { bookingId } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Reserva não encontrada"],
      });
    }

    if (booking.userId !== session?.user.id) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Você não tem permissão para cancelar esta reserva"],
      });
    }

    if (booking.cancelled) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Esta reserva já foi cancelada"],
      });
    }

    if (booking.date < new Date()) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Não é possível cancelar reservas passadas"],
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        cancelled: true,
        cancelledAt: new Date(),
      },
    });
    // Para garantir que quando eu cancelar o agendamento o dado é atualizado em tela
    revalidatePath("/bookings");
    return updatedBooking;
  });
