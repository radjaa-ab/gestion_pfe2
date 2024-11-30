<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PfeProposal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'summary',
        'type',
        'option',
        'technologies',
        'material_needs',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}