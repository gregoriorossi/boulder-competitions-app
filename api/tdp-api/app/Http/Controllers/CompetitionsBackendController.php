<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CompetitionsRepository;
use App\Repositories\ProblemsRepository;
use Carbon\Carbon;
use App\Models\Exports\RankingExport;
use Maatwebsite\Excel\Facades\Excel;

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
            //'cover_image' => $request->input('cover_image'),
            'email_subject' => $request->input('email_subject'),
            'email_body' => $request->input('email_body'),
            'public_path' => $public_path
        );
        
        $this->competitionsRepository->updateInfo($competitionId, $competitionData);
        return response()->json(null, 200);
    }    

    public function delete(string $competitionId)
    {
        $this->competitionsRepository->deleteCompetition($competitionId);

        return response()->json(null, 204);
    }

    function getRanking(string $competitionId, string $type) {
        return $this->competitionsRepository->getRanking($competitionId, $type);
    }

    public function downloadRanking(string $competitionId, string $type) {
        $ranking = $this->competitionsRepository->getRanking($competitionId, $type);
        $export = new RankingExport(collect($ranking));
        return Excel::download($export, 'classifica.xlsx');
    }
}