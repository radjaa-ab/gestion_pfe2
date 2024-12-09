<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'grade',
        'date_recrutement',
    ];

    protected $casts = [
        'date_recrutement' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pfesEncadres()
    {
        return $this->hasMany(PFE::class, 'encadrant_id');
    }
}

