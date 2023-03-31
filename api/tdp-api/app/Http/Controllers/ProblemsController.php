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

    public function update(Request $request, Problem $problem)
    {
        $problem->update($request->all());

        return response()->json($problem, 200);
    }

    public function store(Request $request)
    {
        $competitionId = $request->input('competitionId');
        $competition = Competition::findOrFail($competitionId);

        $problem = array(
            'title' => $request->input('title'),
            'color' => $request->input('color'),
            'difficulty' => $request->input('difficulty'),
        );

        $problem = Problem::create($problem);
        $competition->problems()->save($problem);
    }

    public function storeMultiple(Request $request)
    {
        $competitionId = $request->input('competitionId');
        $competition = Competition::findOrFail($competitionId);

        $problems = $request->problems;
        
        foreach($problems as $problem) {
            $competition->problems()->save(Problem::create($problem));
        }
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

