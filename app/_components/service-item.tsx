import Image from "next/image";
import { BarbershopService } from "../generated/prisma/client";
import { Button } from "./ui/button";
import { formatPrice } from "@/app/helpers/format-price";

interface ServiceItemProps {
  service: BarbershopService;
}

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <div className="bg-card border-border flex w-full gap-3 rounded-2xl border p-3">
      <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[10px]">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex min-h-[110px] flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-card-foreground text-sm font-bold">
            {service.name}
          </p>
          <p className="text-muted-foreground text-sm leading-[1.4]">
            {service.description}
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-card-foreground text-sm font-bold">
            {formatPrice(service.priceInCents)}
          </p>
          <Button
            variant="default"
            size="sm"
            className="rounded-full px-4 py-2"
          >
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
}
