<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(CompetitionsRepository::class, function() {
            return new CompetitionsRepository();
        });

        $this->app->bind(ProblemsRepository::class, function() {
            return new ProblemsRepository();
        });

        $this->app->bind(AthletesRepository::class, function() {
            return new AthletesRepository();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if(config('app.env') === 'production') {
            \URL::forceScheme('https');
        }
    }
}
