<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transports', function (Blueprint $table) {
            $table->id();        
            $table->unsignedBigInteger('chauffeur_id')->unique();
            $table->foreign('chauffeur_id')->references('id')->on('personnels')->onDelete('cascade');
            $table->unsignedBigInteger('responsable_id')->unique();
            $table->foreign('responsable_id')->references('id')->on('personnels')->onDelete('cascade');
            $table->string('immatricule')->unique();
            $table->string("photo");
            $table->integer('nb_places');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transports');
    }
};
