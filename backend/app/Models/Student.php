<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'option',
        'moyenne_m1',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pfes()
    {
        return $this->hasMany(PFE::class);
    }
    
}