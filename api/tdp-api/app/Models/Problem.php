<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Competition;

class Problem extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'color', 'difficulty'];
    protected $attributes = [
        'competition_id' => 0
    ];

    public function color() {
        return $this->hasOne(Color::class);
    }
 
    public function competition() {
        return $this->belongsTo(\App\Models\Competition::class);
    }
}
