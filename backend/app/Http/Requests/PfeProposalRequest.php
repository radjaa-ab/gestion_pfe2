<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PfeProposalRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'type' => 'required|in:classic,innovative,internship',
            'option' => 'required|in:GL,IA,RSD,SIC',
            'technologies' => 'required|string',
            'material_needs' => 'nullable|string',
        ];
    }
}