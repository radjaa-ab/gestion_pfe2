<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\EmailSchedulingService;

class ScheduleEmails extends Command
{
    protected $signature = 'emails:schedule';
    protected $description = 'Schedule and send emails based on parameters';

    private $emailSchedulingService;

    public function __construct(EmailSchedulingService $emailSchedulingService)
    {
        parent::__construct();
        $this->emailSchedulingService = $emailSchedulingService;
    }

    public function handle()
    {
        $this->emailSchedulingService->scheduleEmails();
        $this->info('Emails have been scheduled and sent.');
    }
}

