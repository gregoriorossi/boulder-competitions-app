<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionState extends Model
{
    const DRAFT = 1;
    const ONGOING = 2;
    const CLOSED = 3;
    
    use HasFactory;

    public function competition() {
        return $this->belongsTo(Competion::class);
    }
}
