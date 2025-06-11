<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = ['name', 'path', 'preview_url'];

    // Jika ingin relasi (misalnya satu template bisa digunakan banyak invitation)
    public function invitations()
    {
        return $this->hasMany(Invitation::class, 'template_name', 'name');
    }
}
