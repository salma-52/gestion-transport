<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonnelRequest extends FormRequest
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
            'cin'=> 'required|unique:personnels',
            'nom'=>'required|min:3|max:50',
            'prenom'=>'required|min:3|max:50',
            'tel'=>'required',
            'adress'=>'required',
            'photo' => '',
            'email'=> 'required|email|unique:personnels'
           
        ];
    }
}
