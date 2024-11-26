protected $routeMiddleware = [
    // ... other middlewares
    'role' => \App\Http\Middleware\CheckRole::class,
];