<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Wedding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class WeddingController extends Controller
{
    public function index()
    {
        $weddings = Wedding::all();
        return response()->json($weddings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pria' => 'required|string',
            'nama_wanita' => 'required|string',
            'wedding_date' => 'required|date',
            'location' => 'required|string',
            'link' => 'required|string|unique:weddings,link',
            'wptemplateslug' => 'nullable|string',
            'settings' => 'nullable|array', // validasi JSON sebagai array
            'settings.hideHeader' => 'nullable|boolean',
            'settings.hideBanner' => 'nullable|boolean',
            'settings.hideFooter' => 'nullable|boolean',

        ]);

       try {
            $wedding = Wedding::create($validated);

            if (!$wedding) {
                // Jika create gagal tapi tidak throw exception
                return response()->json([
                    'message' => 'Gagal menyimpan data wedding',
                ], 500);
            }

            return response()->json([
                'message' => 'Data wedding berhasil disimpan',
                'data' => $wedding
            ], 201);

        } catch (Exception $e) {
            // Tangani error query/database yang terjadi
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function invitationbyid($id){
         $wedding = Wedding::where('id',$id)->firstOrfail();
        $slug = $wedding->wptemplateslug;

        // Ambil konten dari WordPress berdasarkan slug
        $response = Http::get("http://localhost:8888/wordpress/wp-json/wp/v2/undangan_template?slug={$slug}");

        if ($response->failed() || count($response->json()) === 0) {
            return response('Template tidak ditemukan di WordPress', 404);
        }

        $content = $response->json()[0]['content']['rendered'];

        // Ganti placeholder dengan data undangan
        $content = str_replace([
            '{{bride_name}}',
            '{{groom_name}}',
            '{{wedding_date}}',
            '{{location}}'
        ], [
            $wedding->nama_pria,
            $wedding->nama_wanita,
            \Carbon\Carbon::parse($wedding->wedding_date)->translatedFormat('d F Y'),
            $wedding->location
        ], $content);

        // Cek settings (jika ada)
        $settings = json_encode($wedding->settings);
        $settings = json_decode($settings, true);
        if (is_array($settings)) {
            if (($settings['hideHeader'] ?? true)) {
                // Hapus elemen dengan id="header"
                $content = preg_replace('/<[^>]*id="section-header"[^>]*>[\s\S]*?<\/[^>]+>/', '', $content);
            }

            if (($settings['hideBanner'] ?? true)) {
                // Hapus elemen dengan id="banner"
                $content = preg_replace('/<[^>]*id="section-banner"[^>]*>[\s\S]*?<\/[^>]+>/', '', $content);
            }

            if (($settings['hideFooter'] ?? true)) {
                // Hapus elemen dengan id="footer"
                $content = preg_replace('/<[^>]*id="section-footer"[^>]*>[\s\S]*?<\/[^>]+>/', '', $content);
            }

        }

        return response($content);
    }

    public function edit($id){
        try{
            $wedding = Wedding::where('id',$id)->firstOrfail();
            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil.',
                'data' => $wedding
            ], 200);
        } catch (\Exception $e) {
            Log::error('Gagal mengambil data: ' . $e->getMessage());
            abort(500); // Atau sesuaikan dengan kebutuhan
        }
    }
    public function update(Request $request){
        $request->validate([
            'link' => 'required|string|unique:weddings,link,' . $id,
        ]);

    }
}
