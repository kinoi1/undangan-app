<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wedding extends Model
{
    use HasFactory;
    // app/Models/Wedding.php
    protected $fillable = ['bride_name', 'groom_name', 'wedding_date', 'location', 'settings', 'wptemplateslug'];
    protected $casts = [
        'settings' => 'array',
    ];
}
