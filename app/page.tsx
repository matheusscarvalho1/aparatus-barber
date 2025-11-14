import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from '../public/banner.png'
import BookingItem from "./_components/booking-item";

export default function Home() {
  return (
    <main>
      <Header/>
      <div className="px-5 space-y-4">
        <SearchInput/>
        <Image
         src={banner}
         alt="Agende agora!" 
         sizes="100vh" 
         className="h-auto w-full"
        />
        <h2 className="text-xs text-foreground font-semibold uppercase">Agendamentos</h2>
        <BookingItem
          serviceName="Corte de cabelo"
          barbershopName="Barbearia do João"
          barbershopImageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
          date={new Date()}
        />
      </div>
    </main>
  );
}
