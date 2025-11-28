"use server";

import { prisma } from "@/lib/prisma";

export const getBarbershopAsc = async () => {
  return prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const getBarbershopDesc = async () => {
  return prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
};
