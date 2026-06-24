import { Head, Link } from '@inertiajs/react';

export default function Index({ games }) {
    return (
        <>
            <Head title="Games" />

            <div className="p-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Game List</h1>

                    <Link
                        href="/games/create"
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                    >
                        + Create Game
                    </Link>
                </div>

                <table className="w-full border border-gray-300">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="border p-2">Cover</th>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Genre</th>
                            <th className="border p-2">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {games.map((game) => (
                            <tr key={game.id}>
                                <td className="border p-2">
                                    {game.cover_image ? (
                                        <img
                                            src={`/storage/${game.cover_image}`}
                                            alt={game.title}
                                            className="h-24 w-16 rounded object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400">
                                            No Image
                                        </span>
                                    )}
                                </td>

                                <td className="border p-2">{game.title}</td>

                                <td className="border p-2">{game.genre}</td>

                                <td className="border p-2">
                                    Rp{' '}
                                    {Number(game.price).toLocaleString('id-ID')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
