<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('weddings', function (Blueprint $table) {
            DB::statement('ALTER TABLE weddings CHANGE bride_name nama_pria VARCHAR(255)');
            DB::statement('ALTER TABLE weddings CHANGE groom_name nama_wanita VARCHAR(255)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('weddings', function (Blueprint $table) {
            DB::statement('ALTER TABLE weddings CHANGE bride_name nama_pria VARCHAR(255)');
            DB::statement('ALTER TABLE weddings CHANGE groom_name nama_wanita VARCHAR(255)');
        });
    }
};
