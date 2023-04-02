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
            ->orderBy('title')
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

    function updateProblem(string $competitionId, string $problemId, string $title) {
        $data = array(
            "title" => $title
        );

        $result = DB::Table('problems')
            ->where('id', $problemId)
            ->where('competition_id', $competitionId)
            ->update($data);

        return $result > 0;
    }

    function deleteProblem(string $competitionId, string $problemId) {
        $result = DB::Table('problems')
            ->where('id', $problemId)
            ->where('competition_id', $competitionId)
            ->delete();

        return $result > 0;
    }

    function storeMultiple($competitionId, $colorId, $problems) {
        foreach($problems as $problem) {
            print_r($problem);
            $data = array(
                "title" => $problem["Title"],
                "competition_id" => $competitionId,
                "color_id" => $colorId
            );

            DB::Table('problems')
                ->insert($data);
        }
    }

    function deleteSentProblems(string $competitionId, string $athleteId) {
        $result = DB::Table('sent_problems')
        ->where('competition_id', $competitionId)
        ->where('athlete_id', $athleteId)
        ->delete();

        return $result > 0;
    }
}
