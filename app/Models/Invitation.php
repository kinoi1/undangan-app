<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $fillable = ['slug', 'title', 'date', 'template_name'];

    protected $dates = ['date']; // agar bisa gunakan format()

    public function template()
    {
        return $this->belongsTo(Template::class, 'template_name', 'name');
    }
}
