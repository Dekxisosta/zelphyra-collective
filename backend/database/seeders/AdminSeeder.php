<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            "id" => "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            "email" => "admin@zenlesscollective.ph",
            "name" => "Dekxisosta",
            "password" => "Dekxi123",
            "role" => "admin",
        ]);

        User::create([
            "id" => "b4b2c3y7-e5f6-7890-abcd-ef1234567890",
            "email" => "racistadmin@zenlesscollective.ph",
            "name" => "Shubaruuu",
            "password" => "Shubaru123",
            "role" => "admin",
        ]);

        User::create([
            "id" => "b4c5d6e7-f8a9-0123-bcde-234567890123",
            "email" => "kafka@stellaron.hunt",
            "name" => "Kafka",
            "password" => "Kafka123",
            "role" => "admin",
        ]);

        User::create([
            "id" => "c9d0e1f2-a3b4-5678-cdef-789012345678",
            "email" => "ben.bigger@sons.ne",
            "name" => "Ben Bigger",
            "password" => "Bbigger123",
            "role" => "admin",
        ]);
    }
}
