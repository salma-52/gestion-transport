<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use App\Models\VerificationMail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::create([
            'email' => 'salma.rakikk34.com',
            'password' => "admin",
            'role' => 0,
        ]);

        VerificationMail::create([
            "code" => "0000" , 
            "email"=> "salma.rakikk34.com"
        ]);
    }
}
