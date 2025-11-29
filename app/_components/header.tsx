"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SidebarMenu from "./sidebar-menu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-6">
      <Link href="/">
        <Image
          // Cumulative Layout Shifting - Reserva o tamanho da imagem para mim,
          // Recebe tamanho de imagens otimizados para os tamanhos diferentes de tela
          src="/logo.svg"
          alt="Aparatus"
          width={100}
          height={26.09}
        />
      </Link>
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[370px] p-0">
            <SidebarMenu />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
