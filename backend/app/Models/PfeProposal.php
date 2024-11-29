<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PfeProposal extends Model
{
    protected $fillable = [
        'title',
        'description',
        'type',
        'master_option',
        'technologies',
        'material_needs',
        'proposer_id',
        'is_validated'
    ];

    protected $casts = [
        'technologies' => 'array',
        'is_validated' => 'boolean'
    ];

    public function proposer()
    {
        return $this->belongsTo(User::class, 'proposer_id');
    }
}