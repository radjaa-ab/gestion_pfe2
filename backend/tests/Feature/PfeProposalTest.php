<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class PfeProposalTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_pfe_proposal()
    {
        $this->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]); // Désactive la vérification CSRF
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/pfe-proposals', [
            'title' => 'Test Proposal',
            'summary' => 'This is a test proposal',
            'type' => 'classic',
            'option' => 'GL',
            'technologies' => 'Laravel, React',
            'material_needs' => 'Computer',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('pfe_proposals', ['title' => 'Test Proposal']);
    }
}