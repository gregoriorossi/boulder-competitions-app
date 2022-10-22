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
            'id' => CompetitionState::DRAFT,
            'title' => 'DRAFT'
        ]);

        CompetitionState::create([
            'id' => CompetitionState::ONGOING,
            'title' => 'ONGOING'
        ]);

        CompetitionState::create([
            'id' => CompetitionState::CLOSED,
            'title' => 'CLOSED'
        ]);
    }
}
