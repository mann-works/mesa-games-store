import { Head, Link } from '@inertiajs/react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { UserMenuContent } from '@/components/user-menu-content';
interface WelcomeProps {
    auth: {
        user: any;
    };
}

export default function Welcome({ auth }: WelcomeProps) {
    const featuredGames = [1, 2, 3, 4];
    const games = [1, 2, 3];

    return (
        <>
            <Head title="Mesa Game Store" />

            <div className="min-h-screen bg-background">
                {/* Navbar */}
                <header className="border-b">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl font-bold">
                                Mesa Game Store
                            </h1>

                            <NavigationMenu>
                                <NavigationMenuList className="flex gap-2">
                                    <NavigationMenuItem>
                                        <Link
                                            href="/"
                                            className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                                        >
                                            Store
                                        </Link>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link
                                            href="/library"
                                            className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                                        >
                                            Library
                                        </Link>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link
                                            href="/community"
                                            className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                                        >
                                            Community
                                        </Link>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link
                                            href="/support"
                                            className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                                        >
                                            Support
                                        </Link>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        <div className="flex items-center gap-3">
                            <Input placeholder="Search..." className="w-52" />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <Avatar>
                                            {/* Menampilkan inisial nama jika user login, jika tidak tampil 'U' */}
                                            <AvatarFallback>
                                                {auth.user
                                                    ? auth.user.name
                                                          .substring(0, 2)
                                                          .toUpperCase()
                                                    : 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-48">
                                    {auth.user ? (
                                        // MENU JIKA USER SUDAH LOGIN
                                        <>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem asChild>
                                                    <Link href={'dashboard'}>
                                                        Dashboard
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Settings
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                {/* Menggunakan method POST/as="button" untuk logout Inertia */}
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    asChild
                                                >
                                                    <Link
                                                        href={'logout'}
                                                        method="post"
                                                        as="button"
                                                        className="w-full text-left"
                                                    >
                                                        Log out
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </>
                                    ) : (
                                        // MENU JIKA USER BELUM LOGIN
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem asChild>
                                                <Link href={'login'}>
                                                    Log in
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={'register'}>
                                                    Register
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto space-y-12 px-4 py-8">
                    {/* Hero Section */}
                    <section>
                        <h2 className="text-3xl font-bold">Featured Games</h2>
                        <p className="text-muted-foreground">
                            Discover new adventures
                        </p>

                        <Card className="mt-4">
                            <CardContent className="flex h-[400px] items-center justify-center">
                                <div className="text-center">
                                    <div className="mb-4 text-6xl">🎮</div>
                                    <h3 className="text-2xl font-bold">
                                        Featured Banner
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Carousel game promotion
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Featured Releases */}
                    <section>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {featuredGames.map((game) => (
                                <Card key={game}>
                                    <CardContent className="flex h-28 items-center justify-center">
                                        <Button variant="secondary">
                                            New Release
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Popular Games */}
                    <section>
                        <h2 className="text-3xl font-bold">Popular Games</h2>
                        <p className="text-muted-foreground">
                            Trending this week
                        </p>

                        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {games.map((game) => (
                                <Card key={game}>
                                    <CardContent className="flex gap-4 p-4">
                                        <div className="h-24 w-24 rounded-md bg-muted" />
                                        <div>
                                            <h3 className="font-semibold">
                                                Game Title
                                            </h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Explore vast worlds and exciting
                                                adventures. Build, craft and
                                                conquer enemies in this epic
                                                journey.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
