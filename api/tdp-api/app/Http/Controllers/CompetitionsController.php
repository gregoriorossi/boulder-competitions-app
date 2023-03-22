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

class CompetitionsController extends Controller
{
    protected $competitionsRepository;

    public function __construct(
        CompetitionsRepository $competitionsRepository
    ) {
        $this->competitionsRepository = $competitionsRepository;
    }

    public function index()
    {
        return DB::table('competitions')
            ->orderBy('event_date', 'desc')
            ->get(['id', 'title', 'state', 'event_date']);
    }

    public function show(string $competitionId)
    {
        return DB::table('competitions')
            ->where('id', $competitionId)
            ->first(['id', 'title', 'state', 'event_date']);
    }

    public function fullInfo(string $competitionId)
    {
        $result = DB::table('competitions')
            ->where('id', $competitionId)
            ->first();

        return $result;
    }

    public function updateInfo(string $competitionId, Request $request)
    {
        $competitionData = array(
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'event_date' => Carbon::parse($request->input('event_date')),
            //'cover_image' => $request->input('cover_image'),
            'email_subject' => $request->input('email_subject'),
            'email_body' => $request->input('email_body')
        );
        
        DB::table('competitions')
            ->where('id', $competitionId)
            ->update($competitionData);

        return response()->json(null, 200);
    }

    public function store(Request $request)
    {
        $competitionData = array(
            'title' => $request->input('title'),
            'event_date' => $request->input('event_date'),
            'state' => 1,
            'public_id' => Str::uuid()->toString()
        );

        $this->competitionsRepository->CreateNewCompetition($competitionData);
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
        $competition = Competition::findOrFail($competitionId);

        $stateId = $request->input('state');
        $state = CompetitionState::findOrFail($stateId);
        $competition->state = $stateId;
        $competition->save();
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
}
