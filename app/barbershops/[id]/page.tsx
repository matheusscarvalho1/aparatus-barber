import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Smartphone } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { PageSectionTitle } from "@/app/_components/ui/page";
import { Separator } from "@/app/_components/ui/separator";
import { ServiceItem } from "@/app/_components/service-item";
import { CopyPhoneButton } from "@/app/_components/copy-phone-button";
import Footer from "@/app/_components/footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BarbershopPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id: id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <main>
      <div className="relative h-[297px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-6 left-5 z-10">
          <Link href="/">
            <Button
              variant="secondary"
              size="icon"
              className="bg-background rounded-full"
            >
              <ChevronLeft className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-background relative z-20 -mt-6 rounded-t-[24px]">
        <div className="px-5">
          <div className="flex items-start gap-[6px] pt-6">
            <Avatar className="size-[30px] rounded-full">
              <AvatarImage src={barbershop.imageUrl} alt={barbershop.name} />
            </Avatar>
            <div className="flex flex-col gap-1">
              <h1 className="text-foreground text-xl leading-normal font-bold">
                {barbershop.name}
              </h1>
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-sm leading-[1.4]">
                  {barbershop.address}
                </p>
              </div>
            </div>
          </div>

          <div className="py-6">
            <Separator />
          </div>
          <div className="flex flex-col gap-3 py-0">
            <PageSectionTitle>Sobre Nós</PageSectionTitle>
            <p className="text-foreground text-sm leading-[1.4] whitespace-pre-wrap">
              {barbershop.description}
            </p>
          </div>
          <div className="py-6">
            <Separator />
          </div>
          <div className="flex flex-col gap-3 py-0">
            <PageSectionTitle>Serviços</PageSectionTitle>
            <div className="flex flex-col gap-3">
              {barbershop.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </div>
          </div>
          <div className="py-6">
            <Separator />
          </div>
          <div className="flex flex-col gap-3 py-0">
            <PageSectionTitle>Contato</PageSectionTitle>
            <div className="flex flex-col gap-3">
              {barbershop.phones.map((phone, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="text-foreground size-6" />
                    <p className="text-foreground text-sm leading-[1.4]">
                      {phone}
                    </p>
                  </div>
                  <CopyPhoneButton phone={phone} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-[60px]">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default BarbershopPage;
