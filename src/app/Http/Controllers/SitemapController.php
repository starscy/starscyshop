<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $products = Product::all();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Главная
        $xml .= '<url><loc>' . url('/') . '</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>';

        // Резюме
        $xml .= '<url><loc>' . url('/cv') . '</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>';

        // Контакты
        $xml .= '<url><loc>' . url('/contact') . '</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>';

        // Каталог
        $xml .= '<url><loc>' . url('/products') . '</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>';

        // Товары
        foreach ($products as $product) {
            $xml .= '<url><loc>' . route('web.products.show', $product) . '</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>';
        }

        $xml .= '</urlset>';

        return response($xml)->header('Content-Type', 'text/xml');
    }
}
