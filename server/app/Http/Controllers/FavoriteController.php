<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class FavoriteController extends Controller
{
    public function index()
    {
        $api_key = config('services.tmdb.api_key');
        $user = Auth::user();
        $favorites = $user->favorites;
        $details = [];

        foreach($favorites as $favorite) {
            $tmdb_api_key = "https://api.themoviedb.org/3/".$favorite->media_type."/".$favorite->media_id."?api_key=".$api_key;
            $response = Http::get($tmdb_api_key);
            if ($response->successful()) {
                $details[] = array_merge($response->json(), ['media_type' => $favorite->media_type]);
            }
        }

        return response()->json($details);

    }

    public function checkFavoriteStatus(Request $request)
    {
        $request->validate([
            'media_type' => 'required',
            'media_id' => 'required',
        ]);

        $favorite = Favorite::where('user_id', Auth::id())
            ->where('media_type', $request->media_type)
            ->where('media_id', $request->media_id)
            ->exists();

        return response()->json($favorite);
    }

    public function toggleFavorite(Request $request)
    {
        $request->validate([
            'media_type' => 'required',
            'media_id' => 'required',
        ]);

        $existingFavorite = Favorite::where('user_id', Auth::id())
            ->where('media_type', $request->media_type)
            ->where('media_id', $request->media_id)
            ->first();

        if ($existingFavorite) {
            $existingFavorite->delete();
            return response()->json(['status' => 'removed']);
        } else {
            Favorite::create([
                'user_id' => Auth::id(),
                'media_type' => $request->media_type,
                'media_id' => $request->media_id,
            ]);

            return response()->json(['status' => 'added']);
        }
    }
}
