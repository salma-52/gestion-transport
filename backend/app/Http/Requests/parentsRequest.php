<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class parentsRequest extends FormRequest
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
            "nom" => "required",
            "prenom" => "required",
            "email" => "required|email|unique:users",
            "cin" => "required|unique:parents",
            "adress" => "required",
            "tel" => "required",
            "etudiant_id" => "required",
            "password" => "required",
        ];
    }
}
