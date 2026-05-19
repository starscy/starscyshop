<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {

        return Inertia::render('Home', [
            'videoUrl' => '/videos/hero-bg.mp4',
            'posterUrl' => '/images/hero-poster.jpg',
        ]);
    }
}
