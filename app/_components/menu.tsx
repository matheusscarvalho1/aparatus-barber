"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Home, CalendarDays, LogOut, LogIn } from "lucide-react";
import { SheetTitle } from "./ui/sheet";

const Menu = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <div className="flex items-center justify-between">
        <SheetTitle className="text-foreground text-lg font-bold">
          Menu
        </SheetTitle>
      </div>

      <Separator />

      {/* Seção de Usuário */}
      {isLoggedIn ? (
        <div className="flex items-center gap-3 px-0">
          <Avatar className="size-12">
            {session?.user.image && (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name || ""}
              />
            )}
            <AvatarFallback>
              {session?.user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-foreground text-base leading-[1.4] font-semibold">
              {session?.user.name}
            </p>
            <p className="text-muted-foreground text-xs leading-[1.4]">
              {session?.user.email}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-0">
          <div className="flex flex-col">
            <p className="text-foreground text-base leading-[1.4] font-semibold">
              Olá. Faça seu login!
            </p>
          </div>
          <Button
            onClick={handleLogin}
            className="bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-semibold"
          >
            Login
            <LogIn className="size-4" />
          </Button>
        </div>
      )}

      <Separator />

      {/* Botões de Navegação */}
      <div className="flex flex-col gap-0">
        <Link href="/" className="w-full">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-[82px] px-5 py-3 text-sm font-medium"
          >
            <Home className="size-4" />
            Início
          </Button>
        </Link>
        <Link href="/bookings" className="w-full">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-[82px] px-5 py-3 text-sm font-medium"
          >
            <CalendarDays className="size-4" />
            Agendamentos
          </Button>
        </Link>
      </div>

      <Separator />

      {/* Categorias */}
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          className="h-10 w-full justify-start rounded-[82px] px-5 py-3 text-sm font-medium"
        >
          Cabelo
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full justify-start rounded-[82px] px-5 py-3 text-sm font-medium"
        >
          Barba
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full justify-start rounded-[82px] px-5 py-3 text-sm font-medium"
        >
          Acabamento
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full justify-start rounded-[82px] px-5 py-3 text-sm font-medium"
        >
          Sombrancelha
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full justify-start rounded-[82px] px-5 py-3 text-sm font-medium"
        >
          Massagem
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full justify-start rounded-[82px] px-5 py-3 text-sm font-medium"
        >
          Hidratação
        </Button>
      </div>

      <Separator />

      {/* Botão Sair */}
      {isLoggedIn && (
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="text-muted-foreground w-full justify-start gap-3 rounded-[82px] px-5 py-3 text-sm font-medium"
        >
          <LogOut className="size-4" />
          Sair da conta
        </Button>
      )}
    </div>
  );
};

export default Menu;
