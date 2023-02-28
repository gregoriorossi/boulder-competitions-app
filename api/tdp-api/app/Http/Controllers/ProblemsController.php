<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Problem;
use App\Models\Competition;

class ProblemsController extends Controller
{
    public function show(Competition $competition)
    {
        $problems = $competition->problems()->get();
        return response()->json($problems, 200);
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

    public function delete(Problem $problem)
    {
        $res = $problem->delete();
        return response()->json(null, 204);
    }
}

