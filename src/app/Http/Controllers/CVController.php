<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CVController extends Controller
{
    public function index(): Response
    {

        return Inertia::render('CV', [
        ]);
    }
}
