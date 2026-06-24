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
import { ShoppingCart, Star } from 'lucide-react';

// ---- TYPE ----
interface Game {
    id: number;
    title: string;
    slug: string;
    description: string;
    developer: string;
    publisher: string;
    genre: string;
    price: number;
    cover_image: string | null;
    rating: number;
    release_date: string;
    is_active: boolean;
}

interface WelcomeProps {
    auth: { user: any };
    featured: Game | null;
    newReleases: Game[];
    popularGames: Game[];
}

// ---- HELPERS ----
function coverUrl(path: string | null): string | null {
    if (!path) return null;
    return `/storage/${path}`;
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
}

// ---- COMPONENT ----
export default function Welcome({ auth, featured, newReleases, popularGames }: WelcomeProps) {
    return (
        <>
            <Head title="Mesa Game Store" />
            <div className="min-h-screen bg-background">

                {/* Navbar */}
                <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl font-bold tracking-tight">Mesa Game Store</h1>
                            <NavigationMenu>
                                <NavigationMenuList className="flex gap-1">
                                    {[
                                        { label: 'Store', href: '/' },
                                        { label: 'Library', href: '/library' },
                                        { label: 'Community', href: '/community' },
                                        { label: 'Support', href: '/support' },
                                    ].map((item) => (
                                        <NavigationMenuItem key={item.label}>
                                            <Link
                                                href={item.href}
                                                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                                            >
                                                {item.label}
                                            </Link>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        <div className="flex items-center gap-3">
                            <Input placeholder="Search games..." className="w-52" />
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="h-5 w-5" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="text-xs">
                                                {auth.user
                                                    ? auth.user.name.substring(0, 2).toUpperCase()
                                                    : 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48">
                                    {auth.user ? (
                                        <>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem asChild>
                                                    <Link href="dashboard">Dashboard</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem variant="destructive" asChild>
                                                <Link href="logout" method="post" as="button" className="w-full text-left">
                                                    Log out
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    ) : (
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem asChild>
                                                <Link href="login">Log in</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="register">Register</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto space-y-12 px-4 py-8">

                    <section>
    <h2 className="mb-4 text-2xl font-bold">Featured</h2>
    <div className="relative overflow-hidden rounded-xl">
        <img
            src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg"
            alt="Elden Ring"
            className="h-[420px] w-full object-cover brightness-50"
        />
        {/* Gradient overlay biar teks lebih terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
            <span className="mb-2 w-fit rounded bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                Action RPG
            </span>
            <h3 className="text-4xl font-bold text-white">Elden Ring</h3>
            <p className="mt-2 max-w-lg text-sm text-zinc-300">
                Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.
            </p>
            <div className="mt-4 flex items-center gap-3">
                <span className="text-2xl font-bold text-white">Rp 599.000</span>
                <Button>Add to Cart</Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    More Info
                </Button>
            </div>
        </div>
    </div>
</section>

                    {/* New Releases */}
                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">New Releases</h2>
                            <Link href="/store" className="text-sm text-muted-foreground hover:underline">
                                See all
                            </Link>
                        </div>
                        {newReleases.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {newReleases.map((game) => (
                                    <Card key={game.id} className="overflow-hidden transition hover:ring-1 hover:ring-primary cursor-pointer gap-0 py-0">
                                        {coverUrl(game.cover_image) ? (
                                            <img
                                                src={coverUrl(game.cover_image)!}
                                                alt={game.title}
                                                className="h-36 w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-36 items-center justify-center bg-zinc-800 text-xs text-muted-foreground">
                                                No Image
                                            </div>
                                        )}
                                        <CardContent className="p-3">
                                            <p className="text-xs text-muted-foreground">{game.genre}</p>
                                            <h3 className="font-semibold leading-tight">{game.title}</h3>
                                            <p className="mt-2 text-sm font-bold">{formatPrice(game.price)}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Belum ada game tersedia.</p>
                        )}
                    </section>

                    {/* Popular Games */}
                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Popular This Week</h2>
                            <Link href="/store" className="text-sm text-muted-foreground hover:underline">
                                See all
                            </Link>
                        </div>
                        {popularGames.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {popularGames.map((game) => (
                                    <Card key={game.id} className="overflow-hidden transition hover:ring-1 hover:ring-primary cursor-pointer">
                                        <CardContent className="flex gap-4 p-4">
                                            {coverUrl(game.cover_image) ? (
                                                <img
                                                    src={coverUrl(game.cover_image)!}
                                                    alt={game.title}
                                                    className="h-24 w-32 rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-24 w-32 items-center justify-center rounded-md bg-zinc-800 text-xs text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">{game.genre}</p>
                                                    <h3 className="font-semibold">{game.title}</h3>
                                                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                        {game.description}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="flex items-center gap-1 text-xs text-green-500">
                                                        <Star className="h-3 w-3 fill-green-500" />
                                                        {game.rating}
                                                    </div>
                                                    <span className="ml-auto text-sm font-bold">
                                                        {formatPrice(game.price)}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Belum ada game tersedia.</p>
                        )}
                    </section>

                </main>

                <footer className="mt-12 border-t py-8 text-center text-sm text-muted-foreground">
                    © 2025 Mesa Game Store. All rights reserved.
                </footer>
            </div>
        </>
    );
}