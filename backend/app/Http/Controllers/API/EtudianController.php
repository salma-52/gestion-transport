<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\EtudiantRequest;
use App\Http\Requests\EtudiantUpdateRequest;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EtudianController extends Controller
{
    public function allEtudiants(){

        $etudiants  = Etudiant::with(['transport'])->get();
        return response()->json([
            "data" => $etudiants
         ] , 200);
    }

    // ajouter 
    public function addEtudiant(EtudiantRequest $request){
        try {
            $formFields = $request->validated();
    
            if($request->hasFile('photo')){
                $formFields['photo'] = $request->file('photo')->store('images', 'public');
            }else{
                $formFields['photo'] = "images/avatar.jpg";
            }

           
            $etudiant = Etudiant::create($formFields);

            $result =  Etudiant::where("id" , "=" , $etudiant->id)->with(['transport'])->first();
            if($result){
                return response()->json(['data' => $result], 200);
            }else{
                return response()->json(['error' => "Erreur de création"], 500);
            }

        } catch (\Exception $e) {
         
            return response()->json([
                "error" => "erreur de creation ."
            ], 500);
        }


    }

    // update 
    public function updateEtudiant(EtudiantUpdateRequest $request , Etudiant $etudiant){
        try {
            $formFields = $request->validated();
            
            if(isset($formFields['photo']) && $formFields['photo'] !== 'null' ) {
                $formFields['photo'] = $request->file('photo')->store('images', 'public');
            }else{
                unset($formFields['photo']);
            }

            $etudiant->fill($formFields);
            $etudiant->save();
           
            $result =  Etudiant::where("id" , "=" , $etudiant->id)->with(['transport'])->first();
            return response()->json([
                "data" => $result
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "error" => "Email deja existe" 
            ], 400);
        }
    }

    //delete 
    public function deleteEtudiant (Etudiant $etudiant){
      
        DB::beginTransaction();
        try {       
            if ($etudiant) {
                $etudiant->delete();     
            } else {
                return response()->json(['error' => "personnels Not Found"], 500);
            }
            DB::commit();
        } catch(\Exception $e) {
            DB::rollback();
            // Log or handle the exception as needed
            return response()->json(['error' => "impossible de supprimer personnel"], 500);
        }
        return response()->json(['id' => $etudiant->id], 200);
    }



}
