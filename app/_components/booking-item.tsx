import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";

interface BookingItemProps {
  serviceName: string;
  barbershopName: string;
  barbershopImageUrl: string;
  date: Date;
  status?: "confirmed" | "finished" | "cancelled";
}

const BookingItem = ({
  serviceName,
  barbershopName,
  barbershopImageUrl,
  date,
  status,
}: BookingItemProps) => {
  return (
    <Card className="flex w-full min-w-full flex-row items-center justify-between p-0">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Badge
          className={
            status === "confirmed"
              ? "bg-primary/10 text-primary uppercase"
              : "bg-muted text-muted-foreground uppercase"
          }
        >
          {status === "confirmed" ? "Confirmado" : "Finalizado"}
        </Badge>
        <div className="flex flex-col gap-2">
          <p className="font-bold">{serviceName}</p>
          <div className="5 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={barbershopImageUrl} />
            </Avatar>
            <p className="text-muted-foreground text-sm">{barbershopName}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-l p-4 py-3">
        <p className="text-xs capitalize">
          {date.toLocaleDateString("pt-BR", { month: "long" })}
        </p>
        <p>{date.toLocaleDateString("pt-BR", { day: "2-digit" })}</p>
        <p className="text-xs capitalize">
          {date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </Card>
  );
};

export default BookingItem;
