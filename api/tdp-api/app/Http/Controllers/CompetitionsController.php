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
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Exports\AthletesExport;

class CompetitionsController extends Controller
{
    protected $competitionsRepository;
    protected $problemsRepository;

    public function __construct(
        CompetitionsRepository $competitionsRepository,
        ProblemsRepository $problemsRepository
    ) {
        $this->competitionsRepository = $competitionsRepository;
        $this->problemsRepository = $problemsRepository;
    }

    public function getAthletes(string $competitionId) {
        return $this->competitionsRepository->getAthletes($competitionId);
    }

    public function downloadAthletes(string $competitionId) {
        $athletes = $this->competitionsRepository->getAthletes($competitionId);
        $export = new AthletesExport($athletes);
        return Excel::download($export, 'partecipanti.xlsx');
    }
 
    public function getResults(string $competitionId) {
        return $this->competitionsRepository->getResults($competitionId);
    }

    public function update(Request $request, Competition $competition)
    {
        $competition->update($request->all());

        return response()->json($competition, 200);
    }

    public function delete(Competition $competition)
    {
        $competition->delete();

        return response()->json(null, 204);
    }

    public function setState(Request $request)
    {
        $competitionId = $request->input('competitionId');
        $stateId = $request->input('state');
        $this->competitionsRepository->setState($competitionId, $stateId);

        return response()->json(null, 204);
    }

    public function register(string $competitionId, Request $request) {
        $email = trim($request->input('Email'));

        $isRegisteredToCompetition = $this->competitionsRepository->IsRegisteredToCompetition($competitionId, $email);

        if (!$isRegisteredToCompetition) {
            $registrationData = array(
                'id_competition' => $competitionId,
                'email' => $email,
                'name' => $request->input('Name'),
                'surname' => $request->input('Surname'),
                'telephone' => $request->input('Telephone'),
                'birth_date' => Carbon::parse($request->input('BirthDate')),
                'gender' => $request->input('Gender')
            );

            $this->competitionsRepository->RegisterUserToCompetition($registrationData);
            return response()->json(null, 204);
        } else {
            // già registrato
            return response()->json(null, 500);
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
            'telephone' => $request->input('Telephone'),
            'birth_date' => Carbon::parse($request->input('BirthDate')),
            'gender' => $request->input('Gender')
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
