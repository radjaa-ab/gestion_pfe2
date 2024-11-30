<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePfeProposalsTable extends Migration
{
    public function up()
    {
        Schema::create('pfe_proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('summary');
            $table->enum('type', ['classic', 'innovative', 'internship']);
            $table->enum('option', ['GL', 'IA', 'RSD', 'SIC']);
            $table->string('technologies');
            $table->text('material_needs')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pfe_proposals');
    }
}