<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\parentsRequest;
use App\Http\Requests\parentsUpdateRequest;
use App\Models\Etudiant;
use App\Models\Parents;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ParentsContoller extends Controller
{
    
    // All parents
    public function allParents(){
        $parents  = Parents::with(['fils'])->get();
        return response()->json([
            "data" => $parents
         ] , 200);
    }

    public function detailsParents(User $user){

        $parent = Parents::where('email', $user['email'])
        ->with(['fils.transport.responsable', 'fils.transport.chauffeur'])
        ->first();
    
        return response()->json([
            "data" => $parent
         ] , 200);
    }

    // ajouter 
    public function addParent(parentsRequest $request){

    
        DB::beginTransaction();
        try {
            $formFields = $request->validated();
            
            $id_etudiant = $formFields['etudiant_id'];
            $password = $formFields['password'];
            $idsFils = array_map('intval', explode(',', $id_etudiant));
            unset($formFields['etudiant_id']);
            unset($formFields['password']);
            //return response()->json(['data' => $formFields], 200);
            
            $parent = Parents::create($formFields);
            
            
            //$result =  Etudiant::where("id" , "=" , $etudiant->id)->with(['transport'])->first();
            if($parent){
                // create compte in user 
                User::create([
                    'email' => $formFields['email'],
                    'password' => $password,
                    'role' => 1,
                ]);

                foreach ($idsFils as $id_etud) {
                    $etudiant = Etudiant::find($id_etud);
        
                    if ($etudiant) {
                        $etudiant->parent_id = $parent->id;
                        $etudiant->save();
                    } else {
                        throw new \Exception("Étudiant non trouvé avec l'ID $id_etud");
                    }
                }

                DB::commit();

                $result =  Parents::where("id" , "=" , $parent->id)->with(['fils'])->first();
                return response()->json(['data' => $result], 200);
            }else{
                return response()->json(['error' => "Erreur de création"], 500);
            }

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                "error" => "erreur de creation ."
            ], 500);
        }
    }

     // update
    public function updateParent(parentsUpdateRequest $request , Parents $parents){
        DB::beginTransaction();
        try {
            $formFields = $request->validated();
            $id_etudiant = $formFields['etudiant_id'];
            $password = $formFields['password'];
            $idsFils = array_map('intval', explode(',', $id_etudiant));

            // recuperes fils Parens : 
            Etudiant::where('parent_id', $parents->id)->update(['parent_id' => null]);

            // return response()->json([
            //     "data" => $filsParents
            // ], 200);

            $user = User::where('email' , '=' , $formFields['email'])->first();

            if(isset($formFields['password'])){
               // modifier password user 
               $user->password = $password;
               $user->save();
               

            }

            unset($formFields['etudiant_id']);
            unset($formFields['password']);
            //return response()->json(['data' => $formFields], 200);
            
            $parents->fill($formFields);
            $parents->save();


            foreach ($idsFils as $id_etud) {
                $etudiant = Etudiant::find($id_etud);
    
                if ($etudiant) {
                    $etudiant->parent_id = $parents->id;
                    $etudiant->save();
                } else {
                    throw new \Exception("Étudiant non trouvé avec l'ID $id_etud");
                }
            }




            DB::commit();
            $result =  Parents::where("id" , "=" , $parents->id)->with(['fils'])->first();
            return response()->json([
                "data" => $result
            ], 200);
            

           
            
            

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                "error" => "erreur de creation ."
            ], 500);
        }
    }


    // delete 

    public function deleteParent(Parents $parents){
        DB::beginTransaction();
        
        try {       
            if ($parents) {
                $parents->delete();   

                $user = User::where('email' , '=' , $parents->email)->first();
                $user->delete();
                
                
            } else {
                return response()->json(['error' => "personnels Not Found"], 500);
            }
            DB::commit();
        } catch(\Exception $e) {
            DB::rollback();
            // Log or handle the exception as needed
            return response()->json(['error' => "impossible de supprimer un parent qui a encore  des fils dans l'ecole"], 500);
        }
        return response()->json(['id' => $parents->id], 200);


    }




}
