<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parents extends Model
{
    use HasFactory;
    protected $fillable = [
        'cin',  
        'nom', 
        'prenom',
        'adress' , 
        'tel', 
        'email',
    ];

    public function fils(){ 
        return $this->hasMany(Etudiant::class , 'parent_id'); 
    } 
}
