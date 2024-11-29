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
        Schema::create('student_binomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student1_id')->constrained('students');
            $table->foreignId('student2_id')->constrained('students');
            $table->foreignId('pfe_proposal_id')->constrained('pfe_proposals');
            $table->boolean('is_confirmed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_binomes');
    }
};
