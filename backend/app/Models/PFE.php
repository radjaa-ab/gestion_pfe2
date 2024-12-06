<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PFE extends Model
{
    use HasFactory;

    protected $table = 'p_f_e_s';

    protected $fillable = [
        'intitule',
        'type',
        'option',
        'description',
        'student_id',
        'encadrant_id',
        'company_id',
        'statut',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function encadrant()
    {
        return $this->belongsTo(Teacher::class, 'encadrant_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}

