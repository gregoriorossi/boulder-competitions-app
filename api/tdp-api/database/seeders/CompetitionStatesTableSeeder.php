<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompetitionState;

class CompetitionStatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CompetitionState::truncate();

        CompetitionState::create([
            'title' => 'DRAFT'
        ]);

        CompetitionState::create([
            'title' => 'ONGOING'
        ]);

        CompetitionState::create([
            'title' => 'CLOSED'
        ]);
    }
}
