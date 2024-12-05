<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Le namespace par défaut appliqué aux contrôleurs.
     *
     * @var string|null
     */
    protected $namespace = 'App\\Http\\Controllers';
   
    
    
   
    
        public const HOME = '/home';
    
    /**
     * Définissez les chemins d'accès pour votre application.
     */

    /**
     * Initialisation du fournisseur de services.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();
    
        $this->routes(function () {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));
    
            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
        });
    }
    

    
}
