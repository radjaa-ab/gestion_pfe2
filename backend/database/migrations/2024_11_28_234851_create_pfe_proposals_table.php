<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pfe_proposals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['classic', 'innovative', 'company']);
            $table->enum('master_option', ['GL', 'IA', 'RSD', 'SIC']);
            $table->json('technologies');
            $table->text('material_needs')->nullable();
            $table->foreignId('proposer_id')->constrained('users');
            $table->boolean('is_validated')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pfe_proposals');
    }
};
