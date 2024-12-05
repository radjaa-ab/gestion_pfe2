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
        'etudiant_id',
        'encadrant_id',
        'entreprise_id',
        'statut',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function encadrant()
    {
        return $this->belongsTo(Enseignant::class, 'encadrant_id');
    }

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }

    public function soutenance()
    {
        return $this->hasOne(Soutenance::class);
    }
}