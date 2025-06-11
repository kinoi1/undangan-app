<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TemplateController extends Controller
{
    public function index()
    {
        $response = Http::get(env('WORDPRESS_URL'));

        if ($response->failed()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data dari WordPress.'
            ], 500);
        }

        $templates = collect($response->json())->map(function ($item) {
            return [
                'title' => $item['title']['rendered'],
                'slug' => $item['slug'],
                'preview' => $item['acf']['preview_url'] ?? null,
                'html' => $item['acf']['template_html'] ?? null,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $templates
        ]);
    }
}

