<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'university_email',
        'master_option',
        'master1_average'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function binomes()
    {
        return $this->hasMany(StudentBinome::class, 'student1_id')
            ->orWhere('student2_id', $this->id);
    }
}