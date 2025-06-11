<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Invitation;
use App\Models\Template;

class InvitationRenderController extends Controller
{

public function render($slug)
{
    $inv = Invitation::where('slug', $slug)->firstOrFail();
    $template = Template::where('name', $inv->template_name)->firstOrFail();
    $html = Storage::get($template->path . '/index.html');

    // Replace all {{key}} dynamically
    $replaced = preg_replace_callback('/\{\{(.*?)\}\}/', function ($matches) use ($inv) {
        $key = trim($matches[1]);
        return $inv->$key ?? '';
    }, $html);

    return response($replaced);
}

}
