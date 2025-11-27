import Header from "../_components/header";
import Footer from "../_components/footer";
import BookingItem from "../_components/booking-item";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
} from "../_components/ui/page";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <main>
        <Header />
        <PageContainer>
          <PageSection>
            <p className="text-muted-foreground">
              Faça login para ver seus agendamentos.
            </p>
          </PageSection>
        </PageContainer>
        <Footer />
      </main>
    );
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  const now = new Date();

  const confirmedBookings = bookings.filter(
    (booking) => new Date(booking.date) > now && !booking.cancelled,
  );

  const finishedBookings = bookings.filter(
    (booking) => new Date(booking.date) <= now || booking.cancelled,
  );

  // Buscar dados dos serviços e barbearias
  const serviceIds = [...new Set(bookings.map((b) => b.serviceId))];
  const barbershopIds = [...new Set(bookings.map((b) => b.barbershopId))];

  const [services, barbershops] = await Promise.all([
    prisma.barbershopService.findMany({
      where: {
        id: { in: serviceIds },
      },
    }),
    prisma.barbershop.findMany({
      where: {
        id: { in: barbershopIds },
      },
    }),
  ]);

  const servicesMap = new Map(services.map((s) => [s.id, s]));
  const barbershopsMap = new Map(barbershops.map((b) => [b.id, b]));

  return (
    <main>
      <Header />
      <PageContainer>
        {confirmedBookings.length > 0 && (
          <PageSection>
            <PageSectionTitle>Confirmados</PageSectionTitle>
            <div className="flex flex-col gap-3">
              {confirmedBookings
                .map((booking) => {
                  const service = servicesMap.get(booking.serviceId);
                  const barbershop = barbershopsMap.get(booking.barbershopId);
                  if (!service || !barbershop) return null;
                  return (
                    <BookingItem
                      key={booking.id}
                      serviceName={service.name}
                      barbershopName={barbershop.name}
                      barbershopImageUrl={barbershop.imageUrl}
                      date={new Date(booking.date)}
                      status="confirmed"
                    />
                  );
                })
                .filter(Boolean)}
            </div>
          </PageSection>
        )}

        {finishedBookings.length > 0 && (
          <PageSection>
            <PageSectionTitle>Finalizados</PageSectionTitle>
            <div className="flex flex-col gap-3">
              {finishedBookings
                .map((booking) => {
                  const service = servicesMap.get(booking.serviceId);
                  const barbershop = barbershopsMap.get(booking.barbershopId);
                  if (!service || !barbershop) return null;
                  return (
                    <BookingItem
                      key={booking.id}
                      serviceName={service.name}
                      barbershopName={barbershop.name}
                      barbershopImageUrl={barbershop.imageUrl}
                      date={new Date(booking.date)}
                      status="confirmed"
                    />
                  );
                })
                .filter(Boolean)}
            </div>
          </PageSection>
        )}

        {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
          <PageSection>
            <p className="text-muted-foreground">
              Você não possui agendamentos.
            </p>
          </PageSection>
        )}
      </PageContainer>
      <Footer />
    </main>
  );
};

export default BookingsPage;
