<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\PfeProposal;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class PfeProposalTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_pfe_proposal()
{
    $user = User::factory()->create();
    Sanctum::actingAs($user, ['*']);

    $proposalData = [
        'title' => 'Test Proposal',
        'summary' => 'This is a test proposal',
        'type' => 'classic',
        'option' => 'GL',
        'technologies' => 'Laravel, React',
        'material_needs' => 'Computer',
    ];

    $response = $this->postJson('/api/pfe-proposals', $proposalData);

    // Add this line for debugging
    dd($response->getContent());

    $response->assertStatus(201)
             ->assertJsonFragment($proposalData);

    $this->assertDatabaseHas('pfe_proposals', $proposalData);
}
}