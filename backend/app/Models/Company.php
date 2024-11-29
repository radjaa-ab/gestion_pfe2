<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'contact_first_name',
        'contact_last_name',
        'contact_email'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
