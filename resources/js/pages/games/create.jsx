import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        developer: '',
        publisher: '',
        release_date: '',
        genre: '',
        price: '',
        cover_image: null,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/games', {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                alert('Game berhasil ditambahkan!');
                reset();
            },

            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <>
            <Head title="Create Game" />

            <div className="mx-auto max-w-4xl p-8">
                <h1 className="mb-6 text-3xl font-bold">Create Game</h1>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="mb-2 block font-medium">Title</label>

                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />

                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            className="w-full rounded border p-2"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Developer
                        </label>

                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.developer}
                            onChange={(e) =>
                                setData('developer', e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Publisher
                        </label>

                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.publisher}
                            onChange={(e) =>
                                setData('publisher', e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Genre</label>

                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.genre}
                            onChange={(e) => setData('genre', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Release Date
                        </label>

                        <input
                            type="date"
                            className="w-full rounded border p-2"
                            value={data.release_date}
                            onChange={(e) =>
                                setData('release_date', e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Price</label>

                        <input
                            type="number"
                            step="0.01"
                            className="w-full rounded border p-2"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Cover Image
                        </label>

                        <input
                            type="file"
                            className="w-full rounded border p-2"
                            onChange={(e) =>
                                setData('cover_image', e.target.files[0])
                            }
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData('is_active', e.target.checked)
                            }
                        />

                        <label>Active</label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Game'}
                    </button>
                </form>
            </div>
        </>
    );
}
