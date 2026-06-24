import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';

type Props = PropsWithChildren<{
    title?: string;
    description?: string;
    panelSide?: 'left' | 'right';
}>;

export default function AuthSplitLayout({
    children,
    title,
    description,
    panelSide = 'right',
}: Props) {
    const panel = (
        <div className="relative hidden lg:flex h-full flex-col bg-zinc-950 p-10 text-white">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            <Link
                href={home()}
                className="relative z-10 flex items-center gap-2 text-lg font-medium"
            >
                <AppLogoIcon className="size-7 fill-current text-white" />
                Mesa Game Store
            </Link>

            <div className="relative z-10 mt-auto space-y-2">
                <p className="text-2xl font-medium leading-snug">
                    Your games,<br />your world.
                </p>
                <p className="text-sm text-zinc-400">
                    Discover, buy, and play thousands of games in one place.
                </p>
            </div>
        </div>
    );

    const form = (
        <div className="flex h-full items-center justify-center bg-zinc-900 p-6 md:p-10">
            <div className="w-full max-w-sm space-y-6">
                <Link
                    href={home()}
                    className="flex items-center justify-center gap-2 lg:hidden"
                >
                    <AppLogoIcon className="size-8 fill-current text-white" />
                    <span className="font-medium text-white">Mesa Game Store</span>
                </Link>

                <div className="space-y-1 text-center">
                    <h1 className="text-xl font-medium text-white">{title}</h1>
                    <p className="text-sm text-zinc-400">{description}</p>
                </div>

                {children}
            </div>
        </div>
    );

    return (
        <div className="grid min-h-svh lg:grid-cols-[1fr_2fr]">
            {panelSide === 'left' ? (
                <>
                    {panel}
                    {form}
                </>
            ) : (
                <>
                    {form}
                    {panel}
                </>
            )}
        </div>
    );
}