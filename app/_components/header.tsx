import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
 return ( 
 <header className="flex items-center justify-between px-5 py-6">
  <Image
   // Cumulative Layout Shifting - Reserva o tamanho da imagem para mim, 
   // Recebe tamanho de imagens otimizados para os tamanhos diferentes de tela
    src="/logo.svg"
    alt="Aparatus"
    width={100}
    height={26.09}
  />
  <Button variant="outline" size="icon">
   <MenuIcon />
  </Button>
 </header> 
 );
}
 
export default Header;