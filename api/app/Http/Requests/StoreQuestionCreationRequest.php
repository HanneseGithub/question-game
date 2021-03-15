<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionCreationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'question_text' => 'required|unique:questions,text|',
            'answer_one_text' => 'required',
            'answer_two_text' => 'required',
            'correct_answer' => 'required|integer|numeric|between:1,2',
        ];
    }


}
