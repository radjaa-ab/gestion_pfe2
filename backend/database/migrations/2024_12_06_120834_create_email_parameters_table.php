<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('email_parameters', function (Blueprint $table) {
            $table->id();
            $table->string('email_type');
            $table->dateTime('send_date');
            $table->dateTime('reminder_date');
            $table->dateTime('closure_date');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('email_parameters');
    }
};

