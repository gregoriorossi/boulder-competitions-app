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

        $competitionData = array(
            'title' => $title,
            'description' => $request->input('description'),
            'event_date' => Carbon::parse($request->input('event_date')),
            'email_subject' => $request->input('email_subject'),
            'email_body' => $request->input('email_body'),
            'public_path' => $public_path
        );
        
        $cover_image = $this->handleCoverImage($request);
        if (!empty($cover_image)) {
            $competitionData['cover_image'] = $cover_image;
        }

        $this->competitionsRepository->updateInfo($competitionId, $competitionData);
        return response()->json(null, 200);
    }    

    private function handleCoverImage(Request $request) {
        if ($request->cover_image !== null) {
            $request->validate([
                'cover_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $imageName = time().'.'.$request->cover_image->extension();
            $path = $request->file('cover_image')->store('images');

            return $path;
        } else {
            return "";
        }
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
            'birth_date' => $athlete["BirthDate"],
            'gender' => $athlete["Gender"]
        );

        $this->competitionsRepository->sendRegistrationEmailToUser($data);
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
                'birth_date' => Carbon::parse($request->input('BirthDate')),
                'gender' => $request->input('Gender')
            );

            $this->competitionsRepository->RegisterUserToCompetition($registrationData);
            $this->competitionsRepository->sendRegistrationEmailToUser($registrationData);
            $this->competitionsRepository->sendRegistrationEmailToTDP($registrationData);
            return response()->json(null, 204);
        } else {
            // già registrato
            return response()->json(null, 500);
        }
    }

    public function downloadAllConsents(string $competitionId) {
        $competition = $this->competitionsRepository->getInfo($competitionId);
        $athletes = $this->competitionsRepository->getAthletes($competitionId);

        for ($i = 0; $i < count($athletes); $i++) {
            $athlete = $this->FormatDatesForConsent($athletes[$i]);
            $athletes[$i] = $athlete;
        }

        $fileName = $competition["PublicPath"] . ".pdf";
        $data["athletes"] = $athletes;
        $viewName = "athlete_module_container";
        $pdf = Pdf::loadView($viewName,  $data);
        return $pdf->download($fileName);
    }
    
    public function downloadConsent(string $competitionId, string $athleteId) {
        $athlete = $this->competitionsRepository->getAthleteById($competitionId, $athleteId);
        $fileName = 'delibera_' . $athlete["Surname"] . "_" . $athlete["Name"] . ".pdf";

        $athlete = $this->FormatDatesForConsent($athlete);

        $athletes = [$athlete];
        $data["athletes"] = $athletes;
        $viewName = "athlete_module_container";
        $pdf = Pdf::loadView($viewName,  $data);
        return $pdf->download($fileName);
    }

    private function FormatDatesForConsent($originalAthlete) {
        $athlete = unserialize(serialize($originalAthlete));

        $birthDate = Carbon::parse($athlete["BirthDate"]);
        $tutorBirthDate = Carbon::parse($athlete["TutorBirthDate"]);
        $athlete["BirthDate"] = $birthDate->format('d-m-Y');
        $athlete["TutorBirthDate"] = $tutorBirthDate->format('d-m-Y');

        return $athlete;
    }
}
