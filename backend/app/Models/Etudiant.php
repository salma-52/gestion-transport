<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $fillable = [
        'cne',  
        'nom', 
        'prenom',
        'adress' , 
        'tel', 
        'photo',
        'heur_aller',
        'heur_retour',
        'transport_id',
        'parent_id'
    ];

    public function transport(){ 
        return $this->belongsTo(Transport::class); 
    } 
}
