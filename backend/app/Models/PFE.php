<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PFE extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'resume',
        'type',
        'option',
        'technologies',
        'besoins_materiels',
        'statut',
        'user_id',
        'encadrant_id',
        'co_encadrant_id',
        'student1_id',
        'student2_id',
        'company_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function encadrant()
    {
        return $this->belongsTo(User::class, 'encadrant_id');
    }

    public function coEncadrant()
    {
        return $this->belongsTo(User::class, 'co_encadrant_id');
    }

    public function student1()
    {
        return $this->belongsTo(User::class, 'student1_id');
    }

    public function student2()
    {
        return $this->belongsTo(User::class, 'student2_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}

