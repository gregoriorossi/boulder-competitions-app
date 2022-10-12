<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Competition;

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
                
        for($i = 0; $i < 10; $i++) {
            Competition::create([
                'title' => $faker->sentence,
                'event_date' => $faker->date,
                'state' => rand(1, 3)
            ]);
        }
    }
}
