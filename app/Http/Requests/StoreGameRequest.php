<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreGameRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
             'title'=>'required|max:255',

            'description'=>'required',

            'developer'=>'nullable|max:255',

            'publisher'=>'nullable|max:255',

            'release_date'=>'nullable|date',

            'genre'=>'required|max:100',

            'price'=>'required|numeric|min:0',

            'cover_image'=>'nullable|image|max:2048',

            'is_active'=>'boolean'

        ];
    }
}
