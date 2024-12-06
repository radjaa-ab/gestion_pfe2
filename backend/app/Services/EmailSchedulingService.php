<?php

namespace App\Services;

use App\Models\EmailParameter;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailSchedulingService
{
    public function scheduleEmails()
    {
        $emailParameters = EmailParameter::all();

        foreach ($emailParameters as $parameter) {
            $this->scheduleEmail($parameter);
        }
    }

    private function scheduleEmail(EmailParameter $parameter)
    {
        $now = now();

        if ($now->gte($parameter->send_date) && $now->lt($parameter->reminder_date)) {
            $this->sendEmail($parameter, 'initial');
        } elseif ($now->gte($parameter->reminder_date) && $now->lt($parameter->closure_date)) {
            $this->sendEmail($parameter, 'reminder');
        }
    }

    private function sendEmail(EmailParameter $parameter, $type)
    {
        $users = $this->getUsersForEmailType($parameter->email_type);

        foreach ($users as $user) {
            $this->dispatchEmail($user, $parameter, $type);
        }
    }

    private function getUsersForEmailType($emailType)
    {
        switch ($emailType) {
            case 'teacher_proposal':
                return User::where('role', 'enseignant')->get();
            case 'student_proposal':
                return User::where('role', 'etudiant')->get();
            case 'company_proposal':
                return User::where('role', 'entreprise')->get();
            default:
                return collect();
        }
    }

    private function dispatchEmail($user, $parameter, $type)
    {
        // Here you would implement the actual email sending logic
        // For demonstration purposes, we'll just log the action
        \Log::info("Sending {$type} email for {$parameter->email_type} to {$user->email}");
    }
}

