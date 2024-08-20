<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;

class ProblemsRepository {

    protected AthletesRepository $athletesRepository;

    public function __construct(
        AthletesRepository $athletesRepository
    ) {
        $this->athletesRepository = $athletesRepository;
    }

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
            ->selectRaw('CAST(tdp_problems.title AS UNSIGNED) as sortable_title')
            ->where('color_id', $colorId)
            ->orderBy('sortable_title')
            ->get();

        return $result->map(function($problem, $key) {
           //$score = $this->getProblemScore($problem->competition_id, $problem->id, $gender);
            return [
                'Id' => $problem->id,
                'Title' => $problem->title,
                'CompetitionId' => $problem->competition_id,
                'Color' => $problem->color,
                'Score' => 0, // $score,
               'SortableTitle' => $problem->sortable_title
            ];
        });
    }

    function getSpecialProblemsWinners(string $competitionId) {
        $problems = DB::table('problems')
            ->select('*')
            ->where('competition_id', $competitionId)
            ->where('problems.is_special', 1)
            ->get();

        return $problems->map(function($problem, $key) {
             $results = DB::table('sent_problems')
                ->join('competitions_registrations', 'competitions_registrations.id_registration', '=', 'sent_problems.athlete_id')
                ->select('*')
                ->where('problem_id', $problem->id)
                ->orderBy('send_datetime', 'asc')
                ->get();

            
            $sent = count($results) > 0;
            $athlete = null;
            $sendDateTime = null;

            if ($sent) {
                $first = $results[0];
                $athlete = [
                    "Id" => $first->id_registration,
                    "Name" => $first->name,
                    "Surname" => $first->surname
                ];

                $sendDateTime = $first->send_datetime;
            }

            return [
                "Title" => $problem->title,
                "Sent" =>$sent,
                "Athlete" => $athlete,
                "SendDateTime" => $sendDateTime
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
                'SendDateTime' => $sentProblem->send_datetime,
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

    function setSentProblemsToSpecialProblems($specialProblems, $sentProblems) {
        $problems = unserialize(serialize($specialProblems));

        for($i = 0; $i < count($problems); $i++) {
            $problem = $problems[$i];
            $isSent = $this->isSentSpecialProblem($problem['Id'], $sentProblems);
            $problem['Sent'] = $isSent != null;
            $problem['SendDateTime'] =  $isSent != null ? $isSent["SendDateTime"] : '';
            $problems[$i] = $problem;
        }
        
        return $problems;
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

     function isSentSpecialProblem($problemId, $sentProblems) {
        foreach($sentProblems as $problem) {
            $isSent = $problem['ProblemId'] == $problemId;
            if ($isSent) {
                return $problem;
            }
        }

        return null;
    }

    function getColorGroupsByCompetitionId(string $competitionId) {
        $colors = $this->getColorsByCompetitionId($competitionId);
        
        return $colors->map(function($color, $key) {
            $color['Problems'] = $this->getProblemsByColorId($color['Id']);
            return $color;
        });
    }

    function getSpecialProblemsByCompetitionId(string $competitionId) {
        $result = DB::Table('problems')
            ->select("*")
            ->where('is_special', 1)
            ->where('competition_id', $competitionId)
            ->orderBy('title')
            ->get();

        return $result->map(function($problem, $key) {
            return [
                'Id' => $problem->id,
                'Title' => $problem->title,
                'CompetitionId' => $problem->competition_id,
                'SortableTitle' => $problem->title
            ];
        });
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

     function storeSpecialProblem($competitionId, $problem) {
         $data = array(
                "title" => $problem["Title"],
                "competition_id" => $competitionId,
                "color_id" => -1,
                "is_special" => 1
            );

            DB::Table('problems')
                ->insert($data);
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

    function getProblemsScores($competitionId, string $gender) {
        $problems = DB::Table('problems')
            ->where('competition_id', $competitionId)
            ->where('is_special', 0)
            ->get();

        return $problems->map(function($problem, $key) use($gender) {
            $score = $this->getProblemScore($problem->competition_id, $problem->id, $gender); 
            return [
                'Id' => $problem->id,
                'CompetitionId' => $problem->competition_id,
                'Score' => $score
            ];
        });
    }

    private function getProblemScore($competitionId, $problemId, string $gender) {
        $score = 0;
        $timesSent = DB::Table('sent_problems')
            ->join('competitions_registrations', 'sent_problems.athlete_id', '=', 'competitions_registrations.id_registration')
            ->where('problem_id', $problemId)
            ->where('competition_id', $competitionId)
            ->where('competitions_registrations.gender', $gender)
            ->count();

        if ($timesSent > 0) {
            $score = 1000 / $timesSent;
        }   
        return round($score);
    }
}
