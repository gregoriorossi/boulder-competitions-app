<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'event_date'];
    protected $attributes = [
        'state' => 1 //draft
    ];

    public function state()
    {
        return $this->hasOne(CompetitionState::class);
    }
}
