<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('p_f_e_s', function (Blueprint $table) {
            $table->id();
            $table->string('intitule');
            $table->enum('type', ['classique', 'innovant', 'stage']);
            $table->string('option');
            $table->text('description');
            $table->foreignId('etudiant_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('encadrant_id')->nullable()->constrained('enseignants')->onDelete('set null');
            $table->foreignId('entreprise_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('statut', ['proposé', 'validé', 'refusé', 'en_cours', 'terminé']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('p_f_e_s');
    }
};