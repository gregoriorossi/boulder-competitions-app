<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;

class ProblemsRepository {

    function getColorsByCompetitionId(string $competitionId) {
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

    function getProblemsByColorId(string $colorId) {
        $result = DB::Table('problems')
            ->join('competitions_colors', 'problems.color_id', '=', 'competitions_colors.id_color')
            ->select('problems.*', 'competitions_colors.color')
            ->where('color_id', $colorId)
            ->get();

        return $result->map(function($problem, $key) {
            return [
                'Id' => $problem->id,
                'Title' => $problem->title,
                'CompetitionId' => $problem->competition_id,
                'Color' => $problem->color
            ];
        });
    }

    function getColorGroupsByCompetitionId(string $competitionId) {
        $colors = $this->getColorsByCompetitionId($competitionId);
        
        return $colors->map(function($color, $key) {
            $color['Problems'] = $this->getProblemsByColorId($color['Id']);
            return $color;
        });
    }

    function deleteProblem(string $competitionId, string $problemId) {
        $result = DB::Table('problems')
            ->where('id', $problemId)
            ->where('competition_id', $competitionId)
            ->delete();

        return $result > 0;
    }
}
