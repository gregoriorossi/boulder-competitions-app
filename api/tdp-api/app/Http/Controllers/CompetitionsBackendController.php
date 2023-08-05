<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CompetitionsRepository;
use App\Repositories\ProblemsRepository;
use Carbon\Carbon;
use App\Models\Exports\RankingExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class CompetitionsBackendController extends Controller {

    public function __construct(
        CompetitionsRepository $competitionsRepository,
        ProblemsRepository $problemsRepository
    ) {
        $this->competitionsRepository = $competitionsRepository;
        $this->problemsRepository = $problemsRepository;
    }
    
    public function index()
    {
        return $this->competitionsRepository->getAll();
    }

    public function createCompetition(Request $request)
    {
        $title = $request->input('title');
        $public_path = $this->competitionsRepository->toAvailableUrlFriendly($title);

        $competitionData = array(
            'title' => $title,
            'event_date' => $request->input('event_date'),
            'state' => 1,
            'public_path' => $public_path
        );

        $this->competitionsRepository->CreateNewCompetition($competitionData);
    }

    public function basicInfoByPublicPath(string $publicPath)
    {
        return $this->competitionsRepository->basicInfoByPath($publicPath);
    }

    public function info(string $id)
    {
        return $this->competitionsRepository->getInfo($id);
    }

    public function updateInfo(string $competitionId, Request $request)
    {
        $title = $request->input('title');
        $public_path = $this->competitionsRepository->toAvailableUrlFriendly($title, $competitionId);
        $cover_image = $this->handleCoverImage($request);

        $competitionData = array(
            'title' => $title,
            'description' => $request->input('description'),
            'event_date' => Carbon::parse($request->input('event_date')),
            'cover_image' => $cover_image,
            'email_subject' => $request->input('email_subject'),
            'email_body' => $request->input('email_body'),
            'public_path' => $public_path
        );
        
        $this->competitionsRepository->updateInfo($competitionId, $competitionData);
        return response()->json(null, 200);
    }    

    private function handleCoverImage(Request $request) {
        // try {
            $request->validate([
                'cover_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $imageName = time().'.'.$request->cover_image->extension();
            $path = $request->file('cover_image')->store('images');

            return $path;

        // } catch(Error $err) {
        //     return null;
        // }
    }

    public function delete(string $competitionId)
    {
        $this->competitionsRepository->deleteCompetition($competitionId);

        return response()->json(null, 204);
    }

    public function getRanking(string $competitionId, string $type) {
        return $this->competitionsRepository->getRanking($competitionId, $type);
    }

    public function getResults(string $competitionId) {
        return $this->competitionsRepository->getResults($competitionId);
    }

    public function downloadRanking(string $competitionId, string $type) {
        $ranking = $this->competitionsRepository->getRanking($competitionId, $type);
        $export = new RankingExport(collect($ranking));
        return Excel::download($export, 'classifica.xlsx');
    }

    public function sendRegistrationEmail(string $competitionId, Request $request) {
        $email = $request->input('email');
        $athlete = $this->competitionsRepository->getAthlete($competitionId, $email);

        if ($athlete == null) {
            return response()->json("athlete not found: " . $email, 500);
        }

        $data = array(
            'id_competition' => $athlete["IdCompetition"],
            'email' => $athlete["Email"],
            'name' => $athlete["Name"],
            'surname' => $athlete["Surname"],
            'telephone' => $athlete["Telephone"],
            'birth_date' => $athlete["BirthDate"],
            'gender' => $athlete["Gender"]
        );

        $this->competitionsRepository->sendRegistrationEmail($data);
        return response()->json($athlete, 200);
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
            $this->competitionsRepository->sendRegistrationEmail($registrationData);
            return response()->json(null, 204);
        } else {
            // già registrato
            return response()->json(null, 500);
        }
    }

    public function downloadConsent(string $competitionId, string $athleteId) {
        $athlete = $this->competitionsRepository->getAthleteById($competitionId, $athleteId);

        $fileName = 'delibera_' . $athlete["Surname"] . "_" . $athlete["Name"] . ".pdf";

        $birthDate = Carbon::parse($athlete["BirthDate"]);
        $tutorBirthDate = Carbon::parse($athlete["TutorBirthDate"]);
        $athlete["BirthDate"] = $birthDate->format('d-m-Y');
        $athlete["TutorBirthDate"] = $tutorBirthDate->format('d-m-Y');
        $viewName = $athlete["IsMinor"] ? 'athlete_module_minor' : 'athlete_module';
        $pdf = Pdf::loadView($viewName, $athlete);
        return $pdf->download($fileName);
    }
}