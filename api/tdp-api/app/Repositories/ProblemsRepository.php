<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;

class ProblemsRepository {

    function GetColorsByCompetitionId(string $competitionId) {
        $result = DB::Table('competitions_colors')
            ->where('id_competition', $competitionId)
            ->orderBy('sort_order')
            ->get();

        return $result->map(function($color, $key) {
            return [
                'Id' => $color->id_color,
                'IdCompetition' => $color->id_competition,
                'Color' => $color->color,
                'SortOrder' => $color->sort_order
            ];
        });
    }
}