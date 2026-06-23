import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <section className="mt-8">
                    <Carousel
                        className="w-full overflow-hidden rounded-3xl"
                        opts={{
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {games.map((game) => (
                                <CarouselItem key={game.id}>
                                    <div className="relative h-[600px] overflow-hidden rounded-3xl">
                                        <img
                                            src={game.banner}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

                                        <div className="relative z-10 flex h-full items-center">
                                            <div className="max-w-xl p-12">
                                                <p className="font-semibold text-primary">
                                                    New Release
                                                </p>

                                                <h1 className="mt-2 text-6xl font-bold">
                                                    {game.title}
                                                </h1>

                                                <p className="mt-6 text-zinc-300">
                                                    {game.description}
                                                </p>

                                                <div className="mt-8 flex gap-4">
                                                    <Button size="lg">
                                                        Buy Now
                                                    </Button>

                                                    <Button
                                                        variant="secondary"
                                                        size="lg"
                                                    >
                                                        Wishlist
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </section>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <h1 className="text-3xl font-bold text-white">
                        mesa game store
                    </h1>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
export const games = [
    {
        id: 1,
        title: 'Black Myth: Wukong',
        description: 'Embark on a journey to the west.',
        banner: '/games/wukong.jpg',
    },

    {
        id: 2,
        title: 'Cyberpunk 2077',
        description: 'Night City awaits.',
        banner: '/games/cyberpunk.jpg',
    },

    {
        id: 3,
        title: 'Ghost of Tsushima',
        description: 'Become the Ghost.',
        banner: '/games/ghost.jpg',
    },
];
