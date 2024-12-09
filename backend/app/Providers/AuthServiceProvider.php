<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\PFE;
use App\Policies\PFEPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        PFE::class => PFEPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();
    }
}

