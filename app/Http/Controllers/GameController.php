<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $games = Game::latest()->get();

        return Inertia::render('games/index', [
            'games' => $games,
        ]);
    }

    public function welcome()
    {
        $featured = Game::latest()->first();

        $newReleases = Game::latest()->take(4)->get();

        $popularGames = Game::orderBy('rating', 'desc')->take(6)->get();

        return Inertia::render('welcome', [
            'featured' => $featured,
            'newReleases' => $newReleases,
            'popularGames' => $popularGames,
        ]);
    }

    /**
     * Show the create page.
     */
    public function create()
    {
        return Inertia::render('games/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'developer' => 'nullable|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'release_date' => 'nullable|date',
            'genre' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'is_active' => 'boolean',
        ]);

        $image = null;

        if ($request->hasFile('cover_image')) {
            $image = $request
                ->file('cover_image')
                ->store('games', 'public');
        }

        Game::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'developer' => $request->developer,
            'publisher' => $request->publisher,
            'release_date' => $request->release_date,
            'genre' => $request->genre,
            'price' => $request->price,
            'cover_image' => $image,
            'rating' => 0,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()
            ->route('games.index')
            ->with('success', 'Game berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        //
    }

    /**
     * Show the edit page.
     */
    // public function edit(Game $game)
    // {
    //     return Inertia::render('games/edit', [
    //         'game' => $game,
    //     ]);
    // }

    /**
     * Update the specified resource.
     */
    public function update(Request $request, Game $game)
    {
        //
    }

    /**
     * Remove the specified resource.
     */
    public function destroy(Game $game)
    {
        $game->delete();

        return redirect()
            ->route('games.index')
            ->with('success', 'Game berhasil dihapus.');
    }
}
