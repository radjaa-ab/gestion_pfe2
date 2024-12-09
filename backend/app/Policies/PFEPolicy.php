<?php

namespace App\Policies;

use App\Models\PFE;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PFEPolicy
{
    use HandlesAuthorization;

    public function view(User $user, PFE $pfe)
    {
        return $user->id === $pfe->user_id;
    }

    public function update(User $user, PFE $pfe)
    {
        return $user->id === $pfe->user_id;
    }

    public function delete(User $user, PFE $pfe)
    {
        return $user->id === $pfe->user_id;
    }
}

