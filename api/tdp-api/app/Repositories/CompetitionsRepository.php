<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompetitionsRepository {
    
    protected ProblemsRepository $problemsRepository;

    public function __construct(
        ProblemsRepository $problemsRepository
    ) {
        $this->problemsRepository = $problemsRepository;
    }

    function CreateNewCompetition($data) {
        $competitionId = DB::Table('competitions')->insertGetId($data);
        
        $colors = array("#FFF", "#00F", "#0F0", "#FF0", "#F00", "#000");
        $i = 1;

        foreach($colors as $color) {
            $this->AddColorToCompetition($color, $competitionId, $i);
            $i++;
        }
    }

    function getAll() {
        $result = DB::table('competitions')
            ->orderBy('event_date', 'desc')
            ->get(['id', 'title', 'state', 'event_date', 'public_path']);

        return $result->map(function($competition, $key) {
            return [
                'Id' => $competition->id,
                'Title' => $competition->title,
                'State' => $competition->state,
                'EventDate' => $competition->event_date,
                'PublicPath' => $competition->public_path
            ];
        });
    }

    function updateInfo($competitionId, $competitionData) {
        return DB::table('competitions')
            ->where('id', $competitionId)
            ->update($competitionData);
    }

    function setState(string $competitionId, $stateId) {
        $data = array(
            "state" => $stateId
        );

        return DB::table('competitions')
            ->where('id', $competitionId)
            ->update($data);
    }

    function basicInfoByPath(string $public_path) {
        $info = DB::table('competitions')
            ->where('public_path', $public_path)
            ->first();

        return [
            'Id' => $info->id,
            'EventDate' => $info->event_date,
            'PublicPath'=> $info->public_path,
            'State' => $info->state,
            'Title' => $info->title
        ];
    }

    function getInfo(string $id) {
        $info = DB::table('competitions')
            ->where('id', $id)
            ->first();

        return [
            'Id' => $info->id,
            'Description' => $info->description,
            'EmailBody' => $info->email_body,
            'EmailSubject' => $info->email_subject,
            'EventDate' => $info->event_date,
            'PublicPath'=> $info->public_path,
            'State' => $info->state,
            'Title' => $info->title
            // immagine
        ];
    }

    function IsRegisteredToCompetition(string $competitionId, string $email) {
        $result = DB::table('competitions_registrations')
            ->where('id_competition', $competitionId)
            ->where('email', $email)
            ->count();
        return $result > 0;
    }

    function RegisterUserToCompetition($registrationData) {
        return DB::table('competitions_registrations')
            ->insert($registrationData);
    }
     
    function AddColorToCompetition(string $color, string $competitionId, int $order) {
        $data = array(
            "color" => $color,
            "id_competition" => $competitionId,
            "sort_order" => $order
        );
        DB::Table('competitions_colors')->insert($data);
    }
    
    function getAthletes($competitionId) {
        $result = DB::table('competitions_registrations')
            ->where('id_competition', $competitionId)
            ->orderBy('surname')
            ->orderBy('name')
            ->get();

        return $result->map(function($athlete, $key) {
            return [
                'Id' => $athlete->id_registration,
                'IdCompetition' => $athlete->id_competition,
                'Name' => $athlete->name,
                'Surname' => $athlete->surname,
                'BirthDate' => $athlete->birth_date,
                'Email'=> $athlete->email,
                'Telephone' => $athlete->telephone,
                'Gender' => $athlete->gender,
            ];
        });
    }

    function getResults(string $competitionId) {
        $athletes = $this->getAthletes($competitionId);
        $problemsGroups = $this->problemsRepository->getColorGroupsByCompetitionId($competitionId);

        return $athletes->map(function($athlete, $key) use ($problemsGroups, $competitionId) {
            $sentProblems = $this->problemsRepository->getSentProblemsByAthlete($athlete['Id'], $competitionId);
            $problemsGroupsWithSentProblems = $this->problemsRepository->setSentProblemsToProblemsGroups($problemsGroups, $sentProblems);

            return [
                'Athlete' => $athlete,
                'ProblemsGroups' => $problemsGroupsWithSentProblems
            ];
        });
    }

    function getRanking(string $competitionId) {
        $athletes = $this->getAthletes($competitionId);
        $problemsScores = $this->problemsRepository->getProblemsScores($competitionId);
        $ranking = array();

        for($i = 0; $i < count($athletes); $i++) {
            $athlete = $athletes[$i];
            $athlete['Score'] = $this->getTotalScore($competitionId, $athlete['Id'], $problemsScores);
            array_push($ranking, $athlete);
        }

        usort($ranking, fn($a, $b) => $b['Score'] <=> $a['Score']);

        for($i = 0; $i < count($ranking); $i++) {
            $ranking[$i]["Position"] = $i+1;
        }

        return $ranking;
    }

    function updateRegistration(string $competitionId, string $athleteId, $registrationData) {
        return DB::table('competitions_registrations')
            ->where('id_registration', $athleteId)
            ->where('id_competition', $competitionId)
            ->update($registrationData);
    }

    function deleteRegistration(string $competitionId, string $athleteId) {
        $result = DB::table('competitions_registrations')
            ->where('id_registration', $athleteId)
            ->where('id_competition', $competitionId)
            ->delete();

        return $result;
    }

    function toAvailableUrlFriendly(string $text, string $competitionId = "", int $number = 1) {
        $slug = Str::slug($text, "-");
        
        if ($number > 1) {
            $slug = $slug . "-" . $number;
        }

        $isAvailable = $this->IsPublicPathAvailable($slug, $competitionId);

        if ($isAvailable) {
            return $slug;
        } else {
            return $this->toAvailableUrlFriendly($text, $number + 1);
        }
    }

    private function IsPublicPathAvailable(string $path, string $competitionId) {
        $query = DB::table('competitions')
            ->where('public_path', $path);

        if (strlen($competitionId) > 0) {
            $query->where('id', '!=', $competitionId);
        }
         
        $result = $query->count();

        return $result == 0;
    }

    private function getTotalScore($competitionId, $athleteId, $problemsScores) {
        $sentProblems = $this->problemsRepository->getSentProblemsByAthlete($athleteId, $competitionId);
        $totalScore = 0;

        foreach($sentProblems as $problem) {
            $score = $this->getScore($problem['ProblemId'], $problemsScores);
            $totalScore += $score;
        }

        return $totalScore;
    }

    private function getScore($problemId, $problemsScores) {
     
        foreach($problemsScores as $score) {
            if ($problemId == $score["Id"]) {
                return $score["Score"];
            }
        }

        return 0;
    }
}