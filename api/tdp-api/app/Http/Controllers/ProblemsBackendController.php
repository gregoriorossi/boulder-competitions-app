<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CompetitionsRepository;
use App\Repositories\ProblemsRepository;
use Carbon\Carbon;
use App\Models\Exports\RankingExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class ProblemsBackendController extends Controller {

     protected $competitionsRepository;
    protected $problemsRepository;

    public function __construct(
        CompetitionsRepository $competitionsRepository,
        ProblemsRepository $problemsRepository
    ) {
        $this->competitionsRepository = $competitionsRepository;
        $this->problemsRepository = $problemsRepository;
    }

    public function storeSpecialProblem(Request $request)
    {
        $competitionId = $request->input('CompetitionId');
        $problem = $request->Problem;
 
        $colors = $this->problemsRepository->storeSpecialProblem($competitionId, $problem);
        return response()->json(null, 204);
    }
}
