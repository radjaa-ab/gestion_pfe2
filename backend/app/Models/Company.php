<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $table = 'companys';
    protected $fillable = [
        'user_id',
        'denomination',
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

