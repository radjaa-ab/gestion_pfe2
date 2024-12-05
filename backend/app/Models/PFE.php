<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PFE extends Model
{
    use HasFactory;

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
        return $this->belongsTo(student::class);
    }

    public function encadrant()
    {
        return $this->belongsTo(teacher::class, 'encadrant_id');
    }

    public function company()
    {
        return $this->belongsTo(company::class);
    }

    public function soutenance()
    {
        return $this->hasOne(Soutenance::class);
    }
}