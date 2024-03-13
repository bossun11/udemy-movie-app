<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
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
