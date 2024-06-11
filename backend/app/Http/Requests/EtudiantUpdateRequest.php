<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EtudiantUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cne'=> 'required',
            'nom'=>'required|min:2|max:50',
            'prenom'=>'required|min:2|max:50',
            'tel'=>'required',
            'adress'=>'required',
            'photo'=> '',
            'heur_aller' => 'required',
            'heur_retour'=> 'required',
            'transport_id'=> 'required',
        ];
    }
}
