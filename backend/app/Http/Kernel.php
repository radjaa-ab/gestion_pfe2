<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        \App\Http\Middleware\TrustProxies::class,

        \Fruitcake\Cors\HandleCors::class, // Permet de gérer les CORS pour les API
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class, // Mode maintenance
        \Illuminate\Http\Middleware\ValidatePostSize::class, // Validation de la taille des requêtes POST
        \App\Http\Middleware\LoadConfiguration::class, // Chargement de la configuration
        \Illuminate\Session\Middleware\StartSession::class, // Démarrage de la session (si utilisé dans les API)
        \Illuminate\View\Middleware\ShareErrorsFromSession::class, // Partage des erreurs de session
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class, // Gestion des cookies
        \Illuminate\Cookie\Middleware\EncryptCookies::class, // Chiffrement des cookies
        \Illuminate\Middleware\AuthenticateWithBasicAuth::class, // Authentification basique
        \Illuminate\Http\Middleware\HandleCors::class,

        \Fruitcake\Cors\HandleCors::class,
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\LoadConfiguration::class,
        \Illuminate\Cookie\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,

    ];

    protected $middlewareGroups = [
   'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
    'api' => [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        
    ],

        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

    ];

    protected $routeMiddleware = [

        'auth' => \App\Http\Middleware\Authenticate::class, // Middleware d'authentification
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class, // Authentification basique
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class, // Liaison des paramètres de route
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class, // Gestion des en-têtes de cache
        'can' => \Illuminate\Auth\Middleware\Authorize::class, // Autorisation des actions
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class, // Redirection des utilisateurs authentifiés
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class, // Confirmation du mot de passe
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class, // Validation de la signature de l'URL
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class, // Limitation du nombre de requêtes
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class, // Vérification de l'email
        'check.proposal.deadline' => \App\Http\Middleware\CheckProposalDeadline::class,
        'verify.csrf' => \App\Http\Middleware\VerifyCsrfToken::class,
        

        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,

    ];
}

