<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CompetitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = \Faker\Factory::create();

        
        return [
            'title' => $faker->sentence(5),
            'event_date' => $faker->date,
            'state' => rand(1, 3)
        ];
    }
}
