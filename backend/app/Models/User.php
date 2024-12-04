<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{

    use HasApiTokens, HasRoles , Notifiable,HasFactory;
    
 

    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];



    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function company()
    {
        return $this->hasOne(Company::class);
    }


    public function hasRole($role)
    {
        //Implementation to check if user has a specific role
        //This is a placeholder, replace with your actual role checking logic.
        return in_array($role, $this->roles); //Example: Assuming $this->roles is an array of roles.
    }

    public function roleModel()
    {
        if ($this->hasRole('teacher')) {
            return $this->teacher();
        } elseif ($this->hasRole('student')) {
            return $this->student();
        } elseif ($this->hasRole('company')) {
            return $this->company();
        }
        return null;
    }


}

