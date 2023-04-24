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
            $score = $this->getProblemScore($problem->competition_id, $problem->id);
            return [
                'Id' => $problem->id,
                'Title' => $problem->title,
                'CompetitionId' => $problem->competition_id,
                'Color' => $problem->color,
                'Score' => $score
            ];
        });
    }

    function getSentProblemsByAthlete($athleteId, $competitionId) {
        $result = DB::Table('sent_problems')
            ->where('athlete_id', $athleteId)
            ->where('competition_id', $competitionId)
            ->get();

        return $result->map(function($sentProblem, $key) { 
            return [
                'Id' => $sentProblem->id,
                'ProblemId' => $sentProblem->problem_id,
                'AthleteId' => $sentProblem->athlete_id,
                'CompetitionId' => $sentProblem->competition_id
            ];
        }); 
    }

    function setSentProblemsToProblemsGroups($problemsGroups, $sentProblems) {
        $groups = unserialize(serialize($problemsGroups));

        for($i = 0; $i < count($groups); $i++) {
            $group = $groups[$i];

            for($j = 0; $j < count($group['Problems']); $j++) {
                $problem = $group['Problems'][$j];
                $problem['Sent'] = $this->isSentProblem($problem['Id'], $sentProblems);
                $group['Problems'][$j] = $problem;
            }
        }
        return $groups;
    }

    function isSentProblem($problemId, $sentProblems) {
        foreach($sentProblems as $problem) {
            $isSent = $problem['ProblemId'] == $problemId;
            if ($isSent) {
                return true;
            }
        }

        return false;
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

    function deleteSentProblem(string $competitionId, string $problemId, string $athleteId) {
        $result = DB::Table('sent_problems')
        ->where('competition_id', $competitionId)
        ->where('problem_id', $problemId)
        ->where('athlete_id', $athleteId)
        ->delete();

        return $result > 0;
    }

    function setSent($competitionId, $problemId, $athleteId, $sent) {
        $this->deleteSentProblem($competitionId, $problemId, $athleteId);

        if ($sent) {
            $data = array(
                "athlete_id" => $athleteId,
                "competition_id" => $competitionId,
                "problem_id" => $problemId
            );

            $result = DB::Table('sent_problems')
                ->insert($data);
        }
    }

    function getProblemsScores($competitionId) {
        $problems = DB::Table('problems')
            ->where('competition_id', $competitionId)
            ->get();

        return $problems->map(function($problem, $key) {
            $score = $this->getProblemScore($problem->competition_id, $problem->id); 
            return [
                'Id' => $problem->id,
                'CompetitionId' => $problem->competition_id,
                'Score' => $score
            ];
        });
    }

    private function getProblemScore($competitionId, $problemId) {
        $score = 0;
        $timesSent = DB::Table('sent_problems')
            ->where('problem_id', $problemId)
            ->where('competition_id', $competitionId)
            ->count();

        if ($timesSent > 0) {
            $score = 1000 / $timesSent;
        }   
        return round($score);
    }
}
