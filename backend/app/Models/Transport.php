<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transport extends Model
{
    use HasFactory;

    protected $fillable = [
        'chauffeur_id',  
        'responsable_id', 
        'immatricule',
        'photo' , 
        'nb_places', 
    ];

    public function chauffeur()
    {
        return $this->belongsTo(Personnel::class, 'chauffeur_id');
    }

    public function responsable()
    {
        return $this->belongsTo(Personnel::class, 'responsable_id');
    }

    public function etudiants(){ 
        return $this->hasMany(Etudiant::class); 
    } 
 
}
