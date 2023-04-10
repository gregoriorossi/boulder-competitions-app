<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;

class CompetitionsRepository {
    
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
            ->get(['id', 'title', 'state', 'event_date']);

        return $result->map(function($competition, $key) {
            return [
                'Id' => $competition->id,
                'Title' => $competition->title,
                'State' => $competition->state,
                'EventDate' => $competition->event_date
            ];
        });
    }

    function setState(string $competitionId, $stateId) {
        $data = array(
            "state" => $stateId
        );

        return DB::table('competitions')
            ->where('id', $competitionId)
            ->update($data);
    }

    function getInfo(string $competitionId) {
        $info = DB::table('competitions')
            ->where('id', $competitionId)
            ->first();

        return [
            'Id' => $info->id,
            'Description' => $info->description,
            'EmailBody' => $info->email_body,
            'EmailSubject' => $info->email_subject,
            'EventDate' => $info->event_date,
            'PublicId'=> $info->public_id,
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
}