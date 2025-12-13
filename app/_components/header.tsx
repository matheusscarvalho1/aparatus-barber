"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon, MessageCircleIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SidebarMenu from "./sidebar-menu";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-background px-5 py-6">
      <Link href="/" className="cursor-pointer">
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
        <ThemeToggle />
          <Button variant="outline" size="icon" asChild>
            <Link href="/chat">
                <MessageCircleIcon />
              </Link>
          </Button>
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
