<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PersonnelRequest;
use App\Http\Requests\PersonnelUpdateRequest;
use App\Models\Personnel as ModelsPersonnel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonnelContoller extends Controller
{
    public function allPersonnels(){
        $personnels  = ModelsPersonnel::with(['responsable' , 'chauffeur'])->get();
        return response()->json([
            "data" => $personnels
         ] , 200);
    }


    // add personnel 

    public function addPersonnel(PersonnelRequest $request){
        try {
            $formFields = $request->validated();
    
            if($request->hasFile('photo')){
                $formFields['photo'] = $request->file('photo')->store('images', 'public');
            }else{
                $formFields['photo'] = "images/avatar.jpg";
            }


            $personel = ModelsPersonnel::create($formFields);

            $result =  ModelsPersonnel::where("id" , "=" , $personel->id)->with(['responsable' , 'chauffeur'])->first();
            if($result){
                return response()->json(['data' => $result], 200);
            }else{
                return response()->json(['error' => "Erreur de création"], 500);
            }

        } catch (\Exception $e) {
         
            return response()->json([
                "error" => "erreur de Creation."
            ], 500);
        }
    }

    // update personnels 

    public function updatePersonnel (PersonnelUpdateRequest $request ,ModelsPersonnel  $personnel){
        try {
            $formFields = $request->validated();
            
            if(isset($formFields['photo']) && $formFields['photo'] !== 'null' ) {
                $formFields['photo'] = $request->file('photo')->store('images', 'public');
            }else{
                unset($formFields['photo']);
            }

            $personnel->fill($formFields);
            $personnel->save();
            $result =  ModelsPersonnel::where("id" , "=" , $personnel->id)->with(['responsable' , 'chauffeur'])->first();
           
            return response()->json([
                "data" => $result
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "error" => "Email deja existe" 
            ], 400);
        }
    }


    // delete personnel 

    public function deletePersonnel (ModelsPersonnel $personel){
      
        DB::beginTransaction();
        try {       
            if ($personel) {
                $personel->delete();     
            } else {
                return response()->json(['error' => "personnels Not Found"], 500);
            }
            DB::commit();
        } catch(\Exception $e) {
            DB::rollback();
            // Log or handle the exception as needed
            return response()->json(['error' => "impossible de supprimer personnel"], 500);
        }
        return response()->json(['id' => $personel->id], 200);
    }


}
