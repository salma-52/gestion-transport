<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransportRequest;
use App\Http\Requests\TransportUpdateRequest;
use App\Models\Transport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransportController extends Controller
{
    // all transport 
    public function allTransport(){
        $transport  = Transport::with(['chauffeur' , 'responsable' , 'etudiants'])->get();
        return response()->json([
            "data" => $transport
         ] , 200);
    }
    
    // add 

    public function addTransport(TransportRequest $request){
        try {
            $formFields = $request->validated();
    
            if($request->hasFile('photo')){
                $formFields['photo'] = $request->file('photo')->store('images', 'public');
            }else{
                $formFields['photo'] = "images/transport.jpg";
            }


            $transport =  Transport::create($formFields);

            $result =  Transport::where("id" , "=" , $transport->id)->with(['chauffeur' , 'responsable' , 'etudiants'])->first();
           
    
            if($result){
                return response()->json(['data' => $result], 200);
            }else{
                return response()->json(['error' => "Erreur de création "], 500);
            }

        } catch (\Exception $e) {
         
            return response()->json([
                "error" => "erreur de Creation."
            ], 500);
        }

    }


    //update 

    public function updateTransport (TransportUpdateRequest $request , Transport  $transport){
        try {
            $formFields = $request->validated();
            
            if(isset($formFields['photo']) && $formFields['photo'] !== 'null' ) {
                $formFields['photo'] = $request->file('photo')->store('images', 'public');
            }else{
                unset($formFields['photo']);
            }

            $transport->fill($formFields);
            $transport->save();

            $result =  Transport::where("id" , "=" , $transport->id)->with(['chauffeur' , 'responsable' , 'etudiants'])->first();
           
            return response()->json([
                "data" => $result
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "error" => " deja existe" 
            ], 400);
        }
    }


    // delete 

    public function deleteTransport(Transport  $transport){
        DB::beginTransaction();
        try {       
            if ($transport) {
                $transport->delete();     
            } else {
                return response()->json(['error' => "Transport Not Found"], 500);
            }
            DB::commit();
        } catch(\Exception $e) {
            DB::rollback();
            // Log or handle the exception as needed
            return response()->json(['error' => "impossible de supprimer Transport"], 500);
        }
        return response()->json(['id' => $transport->id], 200);
    }


    // transport to pdf 

    public function generatePDF(Transport $transport)
    {
        $result =  Transport::where("id" , "=" , $transport->id)->with(['chauffeur' , 'responsable' , 'etudiants'])->first();
        //return response()->json(['transport' => $result], 200); 

        
  
         $data = [
            'title' => 'Transport : '. $result->immatricule,
            'date' => date('m/d/Y'),
            'transport' => $result
        ]; 
            
        $pdf = Pdf::loadView('usersPdf', $data);
     
        return $pdf->download('itsolutionstuff.pdf');
    }


}
