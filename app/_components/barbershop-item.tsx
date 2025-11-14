import Image from "next/image";
import { Barbershop } from "../generated/prisma/client";

interface BarbershopItemProps {
 barbershop: Barbershop
 
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
 return ( 
 <div className="relative rounded-xl min-h-[200px] min-w-[290px]">
  <div className="absolute top-0 left-0 h-full w-full bg-linear-to-t from-black to-transparent rounded-lg  z-10"/>
  <Image
   src={barbershop.imageUrl}
   alt={barbershop.name}
   fill // Faz com que a imagem ocupe 100% da largura e altura da div pai, que esta com a classe 'relative'
   className="rounded-xl object-cover"
   />
   <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
    <h3 className="text-background text-lg font-bold">{barbershop.name}</h3>
    <p className="text-background text-xs">{barbershop.address}</p>
   </div>
 </div> 
 );
}
 
export default BarbershopItem;