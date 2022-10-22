<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'event_date'];
    protected $attributes = [
        'state' => CompetitionState::DRAFT
    ];

    public function state() {
        return $this->hasOne(CompetitionState::class);
    }

    public function problems() {
        return $this->hasMany(Problem::class);
    }
}
