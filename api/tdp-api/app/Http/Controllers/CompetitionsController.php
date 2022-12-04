<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Competition;
use App\Models\Problem;

class CompetitionsController extends Controller
{
    public function index()
    {
        return Competition::all();
    }

    public function show(Competition $competition)
    {
        return $competition;
    }

    public function store(Request $request)
    {
        $competition = array(
            'title' => $request->input('title'),
            'event_date' => $request->input('event_date'),
            'state' => 1
        );

        $competition = Competition::create($competition);
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
}
