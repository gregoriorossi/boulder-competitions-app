<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Problem;
use App\Models\Competition;
use App\Repositories\ProblemsRepository;

class ProblemsController extends Controller
{
    protected $problemsRepository;

    public function __construct(
        ProblemsRepository $problemsRepository
    ) {
        $this->problemsRepository = $problemsRepository;
    }

    public function getColorsByCompetitionId(string $competitionId) {
        $colors = $this->problemsRepository->getColorsByCompetitionId($competitionId);
        return response()->json($colors, 200);
    }

    public function getProblemsByCompetitionId(string $competitionId)
    {
        $colorGroups = $this->problemsRepository->getColorGroupsByCompetitionId($competitionId);
        return response()->json($colorGroups, 200);
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
}

