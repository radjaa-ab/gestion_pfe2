<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CheckProposalDeadline
{
    public function handle(Request $request, Closure $next)
    {
        $deadline = Carbon::parse(config('pfe.proposal_deadline'));
        
        if (Carbon::now()->isAfter($deadline)) {
            return response()->json(['message' => 'The deadline for modifying proposals has passed.'], 403);
        }

        return $next($request);
    }
}