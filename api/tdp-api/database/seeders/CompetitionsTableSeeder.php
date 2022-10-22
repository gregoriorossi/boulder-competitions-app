<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Competition;
use App\Models\Problem;

class CompetitionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Competition::truncate();

        $faker = \Faker\Factory::create();

        Competition::factory()->count(5)->create()->each(function($competition) {
             $problems = [];

             $colors = ["#000", "#FFF", "#F00", "#0F0", "#00F"];

             for($difficulty = 1; $difficulty <= 5; $difficulty++) {
                 for($title = 1; $title <= 8; $title++) {
                     $color = $colors[$difficulty-1];
                     $problem = Problem::create([
                        'title' => $title,
                        'difficulty' => $difficulty,
                        'color' => $color
                    ]);
                    array_push($problems, $problem);
                 }
             }
             $competition->problems()->saveMany($problems);
        });

       
    }
}
