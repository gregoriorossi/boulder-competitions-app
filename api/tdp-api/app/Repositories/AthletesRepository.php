<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;

class AthletesRepository {
    
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
            'TutorTelephone' => $athlete->tutor_telephone,
            'ConsentDownloaded' => $athlete->consent_downloaded > 0
        ];
    }
}
