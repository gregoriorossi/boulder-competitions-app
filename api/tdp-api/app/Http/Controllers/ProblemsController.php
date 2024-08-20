<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Problem;
use App\Models\Competition;
use App\Repositories\ProblemsRepository;
use App\Repositories\CompetitionsRepository;
use App\Models\CompetitionState;

class ProblemsController extends Controller
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

    public function getColorsByCompetitionId(string $competitionId) {
        $colors = $this->problemsRepository->getColorsByCompetitionId($competitionId);
        return response()->json($colors, 200);
    }

    public function getProblemsByCompetitionId(string $competitionId)
    {
        $colorGroups = $this->problemsRepository->getColorGroupsByCompetitionId($competitionId);
        $specialProblems =  $this->problemsRepository->getSpecialProblemsByCompetitionId($competitionId);

        $response = array(
            "ColorGroups" => $colorGroups,
            "SpecialProblems" => $specialProblems
        );
        return response()->json($response, 200);
    }

    public function updateProblem(string $competitionId, string $problemId, Request $request)
    {
        $title = $request->input('Title');
        $this->problemsRepository->updateProblem($competitionId, $problemId, $title);
        return response()->json(null, 204);
    }

    public function storeMultiple(Request $request)
    {
        $competitionId = $request->input('CompetitionId');
        $colorId = $request->input('ColorId');
        $problems = $request->Problems;
 
        $colors = $this->problemsRepository->storeMultiple($competitionId, $colorId, $problems);
        return response()->json(null, 204);
    }

    public function deleteProblem(Request $request)
    {
        $competitionId = $request->input('competitionId');
        $problemId = $request->input('problemId');

        $result = $this->problemsRepository->deleteProblem($competitionId, $problemId);

        if ($result) {
            return response()->json(null, 204);
        } else {
            return response()->json(null, 500);
        }
    }

    public function setSent(string $competitionId, Request $request)
    {
        $competition = $this->competitionsRepository->getInfo($competitionId);
        if ($competition["State"] !== CompetitionState::ONGOING) {

            $data = array(
                "Status" => "ERR_COMPETITION_NOT_ONGOING"
            );

            return response()->json($data, 200);
        }

        $athleteId = $request->input('AthleteId');
        $problemId = $request->input('ProblemId');
        $sent = $request->input('Sent');
        $this->problemsRepository->setSent($competitionId, $problemId, $athleteId, $sent);

        $data = array(
            "Status" => "OK"
        );

        return response()->json($data, 200);
    }
}

