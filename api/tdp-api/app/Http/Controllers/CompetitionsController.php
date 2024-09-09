<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Competition;
use App\Models\CompetitionState;
use App\Models\Problem;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Repositories\CompetitionsRepository;
use App\Repositories\ProblemsRepository;
use App\Repositories\AthletesRepository;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Exports\AthletesExport;

use Illuminate\Support\Facades\Mail;

class CompetitionsController extends Controller
{
    protected $competitionsRepository;
    protected $problemsRepository;
    protected AthletesRepository $athletesRepository;

    public function __construct(
        CompetitionsRepository $competitionsRepository,
        ProblemsRepository $problemsRepository,
        AthletesRepository $athletesRepository
    ) {
        $this->competitionsRepository = $competitionsRepository;
        $this->problemsRepository = $problemsRepository;
        $this->athletesRepository = $athletesRepository;
    }

    public function getAll() {
        return $this->competitionsRepository->getAll();
    }

    public function isUserRegisteredToCompetition(string $competitionId, string $email) {
        $isRegisteredToCompetition = $this->competitionsRepository->IsRegisteredToCompetition($competitionId, $email);
        $publicPath = "";
        $athlete = null;

        if ($isRegisteredToCompetition) {
            $info = $this->competitionsRepository->getInfo($competitionId);
            $publicPath = $info["PublicPath"];

            $athlete = $this->athletesRepository->getAthlete($competitionId, $email);
        }

        $data = array(
            "IsRegistered" => $isRegisteredToCompetition,
            "PublicPath" => $publicPath,
            "Athlete" => $athlete
        );

        return response()->json($data, 200);
    }

    public function sendEmail()
    {
          $details = [
            'subject' => "Oggetto bello",
            'body'=> "Corpo ancora più bello"
        ];

        $result = Mail::to("gregorio.rossi89@gmail.com")->send(new \App\Mail\RegistrationMail($details));
        echo var_dump($result);
    }

    public function infoByPath(string $publicPath)
    {
        return $this->competitionsRepository->getInfoByPath($publicPath);
    }

    public function getAthletes(string $competitionId) {
        return $this->athletesRepository->getAthletes($competitionId);
    }

    public function downloadAthletes(string $competitionId) {
        $athletes = $this->athletesRepository->getAthletes($competitionId);
        $export = new AthletesExport($athletes);
        return Excel::download($export, 'partecipanti.xlsx');
    }
 
    public function getResults(string $competitionId, string $athleteId) {
        return $this->competitionsRepository->getResultsByAthlete($competitionId, $athleteId);
    }

    public function update(Request $request, Competition $competition)
    {
        $competition->update($request->all());

        return response()->json($competition, 200);
    }

    public function setState(Request $request)
    {
        $competitionId = $request->input('competitionId');
        $stateId = $request->input('state');
        $this->competitionsRepository->setState($competitionId, $stateId);

        return response()->json(null, 204);
    }

    public function getRanking(string $competitionId, string $gender) {
        $ranking = $this->competitionsRepository->getRanking($competitionId, $gender);
        $specialProblems = $this->problemsRepository->getSpecialProblemsWinners($competitionId);

        return array(
            "Ranking" => $ranking,
            "SpecialProblems" => $specialProblems
        );
    }

    public function register(string $competitionId, Request $request) {
        $email = trim($request->input('Email'));

        $competition = $this->competitionsRepository->getInfo($competitionId);
        if (!$competition['RegistrationsOpen']) {
             $data = array(
                'Status' => 'ERR_REGISTRATIONS_CLOSED'
            );
            return response()->json($data, 200);
        }

        $isRegisteredToCompetition = $this->competitionsRepository->IsRegisteredToCompetition($competitionId, $email);

        if (!$isRegisteredToCompetition) {
            $registrationData = array(
                'id_competition' => $competitionId,
                'email' => $email,
                'name' => $request->input('Name'),
                'surname' => $request->input('Surname'),
                'birth_date' => Carbon::parse($request->input('BirthDate')),
                'gender' => $request->input('Gender'),
                'birth_place' => $request->input('BirthPlace'),
                'birth_province' => $request->input('BirthProvince'),
                'address_city' => $request->input('AddressCity'),
                'address_number' => $request->input('AddressNumber'),
                'address_province' => $request->input('AddressProvince'),
                'address_street' => $request->input('AddressStreet'),
                'address_number' => $request->input('AddressNumber'),
                'is_minor' => $request->input('IsMinor'),
                'tutor_surname' => $request->input('TutorSurname'),               
                'tutor_name' => $request->input('TutorName'),
                'tutor_birth_date' => Carbon::parse($request->input('TutorBirthDate')),
                'tutor_birth_place' => $request->input('TutorBirthPlace'),               
                'tutor_birth_province' => $request->input('TutorBirthProvince'),
                'tutor_address_city' => $request->input('TutorAddressCity'),
                'tutor_address_street' => $request->input('TutorAddressStreet'),
                'tutor_address_number' => $request->input('TutorAddressNumber'),
                'tutor_address_province' => $request->input('TutorAddressProvince'),
                'tutor_telephone' => $request->input('TutorTelephone')
            );

            $this->competitionsRepository->RegisterUserToCompetition($registrationData);
            // $this->competitionsRepository->sendRegistrationEmailToUser($registrationData);
            //$this->competitionsRepository->sendRegistrationEmailToTDP($registrationData);

            $data = array(
                'Status' => 'OK'
            );
            return response()->json($data, 200);
        } else {
            $data = array(
                'Status' => 'ERR_USER_ALREADY_REGISTERED'
            );
            return response()->json($data, 200);
        }
    }
    
    public function updateRegistration(string $competitionId, string $athleteId, Request $request) {
        $email = trim($request->input('Email'));
        $isRegisteredToCompetition = $this->competitionsRepository->IsRegisteredToCompetition($competitionId, $email);

        $registrationData = array(
                'id_competition' => $competitionId,
                'email' => $email,
                'name' => $request->input('Name'),
                'surname' => $request->input('Surname'),
                'birth_date' => Carbon::parse($request->input('BirthDate')),
                'gender' => $request->input('Gender'),
                'birth_place' => $request->input('BirthPlace'),
                'birth_province' => $request->input('BirthProvince'),
                'address_city' => $request->input('AddressCity'),
                'address_number' => $request->input('AddressNumber'),
                'address_province' => $request->input('AddressProvince'),
                'address_street' => $request->input('AddressStreet'),
                'address_number' => $request->input('AddressNumber'),
                'is_minor' => $request->input('IsMinor'),
                'tutor_surname' => $request->input('TutorSurname'),               
                'tutor_name' => $request->input('TutorName'),
                'tutor_birth_date' => Carbon::parse($request->input('TutorBirthDate')),
                'tutor_birth_place' => $request->input('TutorBirthPlace'),               
                'tutor_birth_province' => $request->input('TutorBirthProvince'),
                'tutor_address_city' => $request->input('TutorAddressCity'),
                'tutor_address_street' => $request->input('TutorAddressStreet'),
                'tutor_address_number' => $request->input('TutorAddressNumber'),
                'tutor_address_province' => $request->input('TutorAddressProvince'),
                'tutor_telephone' => $request->input('TutorTelephone')
            );

        $this->competitionsRepository->updateRegistration($competitionId, $athleteId, $registrationData);
        return response()->json(null, 204);
    }

    public function deleteRegistration(string $competitionId, string $athleteId) {
        $this->competitionsRepository->deleteRegistration($competitionId, $athleteId);
        $this->problemsRepository->deleteSentProblems($competitionId, $athleteId);

        return response()->json(null, 204);
    }
}
