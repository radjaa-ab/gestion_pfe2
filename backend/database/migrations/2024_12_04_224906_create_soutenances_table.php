<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('soutenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pfe_id')->constrained('p_f_e_s')->onDelete('cascade');
            $table->date('date');
            $table->time('heure');
            $table->string('salle');
            $table->foreignId('president_id')->constrained('enseignants')->onDelete('cascade');
            $table->foreignId('examinateur_id')->constrained('enseignants')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('soutenances');
    }
};