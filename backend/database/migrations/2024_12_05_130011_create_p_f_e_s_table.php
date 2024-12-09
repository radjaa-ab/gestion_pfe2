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
            $table->string('titre');
            $table->text('resume');
            $table->enum('type', ['classique', 'innovant', 'stage']);
            $table->enum('option', ['GL', 'IA', 'RSD', 'SIC']);
            $table->string('technologies');
            $table->text('besoins_materiels')->nullable();
            $table->enum('statut', ['proposé', 'validé', 'refusé', 'en_cours', 'terminé'])->default('proposé');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('encadrant_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('co_encadrant_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('student1_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('student2_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('company_id')->nullable()->constrained('companys')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('p_f_e_s');
    }
};

