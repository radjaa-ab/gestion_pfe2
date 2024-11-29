<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Le nom du namespace pour les routes.
     *
     * @var string
     */
    protected $namespace = 'App\\Http\\Controllers';

    /**
     * Enregistrer les routes pour l'application.
     *
     * @return void
     */
    public function boot()
    {
        $this->routes(function () {
            $this->mapApiRoutes();  // Ici, tu appelles mapApiRoutes()
            $this->mapWebRoutes();  // Appelle aussi la méthode mapWebRoutes() si tu as des routes web
        });
    }

    /**
     * Enregistrer les routes API pour l'application.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }

    /**
     * Enregistrer les routes web pour l'application.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Enregistrer les routes pour l'application.
     *
     * @return void
     */
    public function map()
    {
        //
    }
}
