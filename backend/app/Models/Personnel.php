<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;
    protected $fillable = [
        'cin',  
        'nom', 
        'prenom',
        'adress' , 
        'tel', 
        'photo',
        'email',
    ];

    public function responsable(){ 
        return $this->hasOne(Transport::class , 'responsable_id'); 
    } 

    public function chauffeur(){ 
        return $this->hasOne(Transport::class , 'chauffeur_id'); 
    } 
}
