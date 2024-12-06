<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailParameter extends Model
{
    use HasFactory;

    protected $fillable = [
        'email_type',
        'send_date',
        'reminder_date',
        'closure_date',
    ];

    protected $casts = [
        'send_date' => 'datetime',
        'reminder_date' => 'datetime',
        'closure_date' => 'datetime',
    ];
}

