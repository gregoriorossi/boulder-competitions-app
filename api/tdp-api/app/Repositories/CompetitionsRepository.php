<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

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

    function getInfoByPath(string $public_path) {
        $info = DB::table('competitions')
            ->where('public_path', $public_path)
            ->first();

        return [
            'Id' => $info->id,
            'Description' => $info->description,
            'EmailBody' => $info->email_body,
            'EmailSubject' => $info->email_subject,
            'EventDate' => $info->event_date,
            'PublicPath'=> $info->public_path,
            'State' => $info->state,
            'Title' => $info->title,
            'CoverImage' => asset("storage/" . $info->cover_image)
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
            'Title' => $info->title,
            'CoverImage' => asset("storage/" . $info->cover_image)
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
    
    function getAthleteById($competitionId, string $athleteId) {
        $athlete = DB::table('competitions_registrations')
            ->where('id_competition', $competitionId)
            ->where('id_registration', $athleteId)
            ->first();

        return $this->mapAthlete($athlete);
    }

    function getAthlete($competitionId, string $email) {
        $athlete = DB::table('competitions_registrations')
            ->where('id_competition', $competitionId)
            ->where('email', $email)
            ->first();

        return $this->mapAthlete($athlete);
    }

    function getAthletes($competitionId) {
        $result = DB::table('competitions_registrations')
            ->where('id_competition', $competitionId)
            ->orderBy('surname')
            ->orderBy('name')
            ->get();

        return $result->map(function($athlete, $key) {
            return $this->mapAthlete($athlete);
        });
    }

    function getAthletesByType($competitionId, string $type) {
        $athletes = $this->getAthletes($competitionId);

        if (strlen($type) == 0 || $type == "GENERAL") {
            return $athletes;
        }

        return $athletes->filter(function($athlete) use ($type) {
            return $athlete["Gender"] == $type;
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

    function getResultsByAthlete(string $competitionId, string $athleteId) {
        $athlete = $this->getAthleteById($competitionId, $athleteId);
        $problemsGroups = $this->problemsRepository->getColorGroupsByCompetitionId($competitionId);

        $sentProblems = $this->problemsRepository->getSentProblemsByAthlete($athleteId, $competitionId);
        $problemsGroupsWithSentProblems = $this->problemsRepository->setSentProblemsToProblemsGroups($problemsGroups, $sentProblems);

        return $problemsGroupsWithSentProblems;
    }

    function getRanking(string $competitionId, string $type = "") {
        $athletes = $this->getAthletesByType($competitionId, $type);

        $problemsScores = $this->problemsRepository->getProblemsScores($competitionId);
        $ranking = array();

        foreach($athletes as $currAthlete) {
            $athlete = unserialize(serialize($currAthlete));
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

    public function deleteCompetition(string $idCompetition) {
        DB::table('competitions')
            ->where('id', $idCompetition)
            ->delete();

        DB::table('competitions_colors')
            ->where('id_competition', $idCompetition)
            ->delete();

        DB::table('competitions_registrations')
            ->where('id_competition', $idCompetition)
            ->delete();

        DB::table('problems')
            ->where('competition_id', $idCompetition)
            ->delete();

        DB::table('sent_problems')
            ->where('competition_id', $idCompetition)
            ->delete();
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

    function sendRegistrationEmailToUser($registrationData) {
        $info = $this->getInfo($registrationData['id_competition']);

        $body = $info['EmailBody'];
        $subject = $info['EmailSubject'];

        $placeholders = ["{TitoloGara}", "{DataGara}", "{Partecipante}"];
        
        $partecipanteValue = $registrationData['name'] . " " . $registrationData['surname'];
        $values = [$info['Title'], $info['EventDate'], $partecipanteValue];
        
        $body = str_replace($placeholders, $values, $body);
        $subject = str_replace($placeholders, $values, $subject);

        $details = [
            'subject' => $subject,
            'body'=> $body
        ];

        Mail::to($registrationData['email'])->send(new \App\Mail\RegistrationMail($details));
    }

    function sendRegistrationEmailToTDP($registrationData) {
        $tdpEmail = getenv('TDP_EMAIL_ADDRESS');
        $info = $this->getInfo($registrationData['id_competition']);

        $body = "{Partecipante} si è iscritto alla gara {TitoloGara} del {DataGara}";;
        $subject = "Iscrizione {Partecipante} a {TitoloGara}";

        $placeholders = ["{TitoloGara}", "{DataGara}", "{Partecipante}"];
        
        $partecipanteValue = $registrationData['name'] . " " . $registrationData['surname'];
        $values = [$info['Title'], $info['EventDate'], $partecipanteValue];
        
        $body = str_replace($placeholders, $values, $body);
        $subject = str_replace($placeholders, $values, $subject);

        $details = [
            'subject' => $subject,
            'body'=> $body
        ];

        Mail::to($tdpEmail)->send(new \App\Mail\RegistrationMail($details));
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

    private function mapAthlete($athlete) {
        return [
            'Id' => $athlete->id_registration,
            'IdCompetition' => $athlete->id_competition,
            'Name' => $athlete->name,
            'Surname' => $athlete->surname,
            'BirthDate' => $athlete->birth_date,
            'Email'=> $athlete->email,
            'Gender' => $athlete->gender,
            'BirthPlace' => $athlete->birth_place,
            'BirthProvince' => $athlete->birth_province,
            'AddressCity' => $athlete->address_city,
            'AddressProvince' => $athlete->address_province,
            'AddressStreet' => $athlete->address_street,
            'AddressNumber' => $athlete->address_number,
            'IsMinor' => $athlete->is_minor === 1 ? true : false,
            'TutorSurname' => $athlete->tutor_surname,      
            'TutorName'           => $athlete->tutor_name,         
            'TutorBirthDate'      => $athlete->tutor_birth_date,    
            'TutorBirthPlace'     => $athlete->tutor_birth_place,   
            'TutorBirthProvince'  => $athlete->tutor_birth_province,
            'TutorAddressCity'    => $athlete->tutor_address_city,  
            'TutorAddressStreet'  => $athlete->tutor_address_street,
            'TutorAddressNumber'  => $athlete->tutor_address_number,
            'TutorAddressProvince'=> $athlete->tutor_address_province,
            'TutorTelephone' => $athlete->tutor_telephone
        ];
    }
}