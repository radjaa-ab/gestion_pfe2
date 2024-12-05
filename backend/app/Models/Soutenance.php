<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Soutenance extends Model
{
    use HasFactory;

    protected $fillable = [
        'pfe_id',
        'date',
        'heure',
        'salle',
        'president_id',
        'examinateur_id',
    ];

    public function pfe()
    {
        return $this->belongsTo(PFE::class);
    }

    public function president()
    {
        return $this->belongsTo(teacher::class, 'president_id');
    }

    public function examinateur()
    {
        return $this->belongsTo(teacher::class, 'examinateur_id');
    }
}