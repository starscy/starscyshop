<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class TrackUserOnline
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $expiresAt = now()->addMinutes(5);
            Cache::put('user-online-' . Auth::id(), true, $expiresAt);

            // Считаем онлайн пользователей
            $onlineUsers = collect(Cache::get('online-users', []));
            $onlineUsers->push(Auth::id());
            $onlineUsers = $onlineUsers->unique();
            $onlineUsers = $onlineUsers->filter(function ($userId) {
                return Cache::has('user-online-' . $userId);
            });

            Cache::put('online-users', $onlineUsers->values(), now()->addMinutes(5));
            Cache::put('online_users', $onlineUsers->count(), now()->addMinutes(5));
        }

        return $next($request);
    }
}
