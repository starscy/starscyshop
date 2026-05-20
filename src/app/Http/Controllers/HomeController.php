<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Request;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $isMobile = preg_match('/mobile/i', Request::userAgent());
        $videoUrl = $isMobile
            ? '/videos/hero-bg-mobile.mp4'
            : '/videos/hero-bg.mp4';

        return Inertia::render('Home', [
            'videoUrl' => $videoUrl,
            'posterUrl' => '/images/hero-poster.jpg'
        ]);
    }
}
