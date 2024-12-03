<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateRoleColumnInUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Si vous voulez modifier la colonne existante
            $table->enum('role', ['admin', 'teacher', 'student', 'company'])->change();
            
            // Ou si vous voulez supprimer et recréer la colonne 
            // $table->dropColumn('role');
            // $table->enum('role', ['admin', 'teacher', 'student', 'company'])->after('email');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Si nécessaire, définissez ici comment annuler les changements
        });
    }
}