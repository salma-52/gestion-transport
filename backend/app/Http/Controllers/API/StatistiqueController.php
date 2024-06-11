<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use App\Models\Parents;
use App\Models\Personnel;
use App\Models\Transport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistiqueController extends Controller
{
    public function totalStat(){

        $nbEtudiant = Etudiant::get()->count();
        $nbPersonnel = Personnel::get()->count();
        $nbTransport = Transport::get()->count();
        $nbParents = Parents::get()->count();

        return response()->json([
            "data" => [
                "nbEtudiant" => $nbEtudiant,
                "nbPersonnel"=> $nbPersonnel,
                "nbTransport"=> $nbTransport,
                "nbParents" => $nbParents,
            ] 
         ] , 200);

    }

    public function transport(){
        
        $transports = DB::select(
            'SELECT transports.immatricule as label, COUNT(etudiants.id) as value
            FROM transports
            LEFT JOIN etudiants ON transports.id = etudiants.transport_id
            GROUP BY transports.immatricule'
        );

        return response()->json([
            "data" => $transports
         ] , 200);

        
    }
}
