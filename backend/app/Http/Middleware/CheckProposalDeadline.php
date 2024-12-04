<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CheckProposalDeadline
{
    public function handle(Request $request, Closure $next)
    {
        // Récupération de la date limite depuis la configuration
        $deadline = config('pfe.proposal_deadline');

        // Vérifier si la configuration de la date limite existe
        if (!$deadline) {
            return response()->json(['message' => 'Proposal deadline is not configured.'], 500);
        }

        // Tenter de parser la date limite
        try {
            $deadline = Carbon::parse($deadline);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid proposal deadline configuration.'], 500);
        }

        // Vérifier si la date actuelle dépasse la date limite
        if (Carbon::now()->isAfter($deadline)) {
            return response()->json(['message' => 'The deadline for modifying proposals has passed.'], 403);
        }

        // Continuer vers la requête suivante si tout est valide
        return $next($request);
    }
}
