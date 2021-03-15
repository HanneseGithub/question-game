<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreQuestionCreationRequest;

class QuestionCreationController extends Controller
{
    public function store(StoreQuestionCreationRequest $request) {

        $validated = $request->validated();

        $transaction = DB::transaction(function() use ($request) {
            $question = Question::create([
                'text' => $request->input('question_text')
            ]);

            $answerOne = Answer::create([
                'text' => $request->input('answer_one_text'),
                'question_id' => $question->id,
                'secret_id' => Str::uuid()
            ]);

            $answerTwo = Answer::create([
                'text' => $request->input('answer_two_text'),
                'question_id' => $question->id,
                'secret_id' => Str::uuid()
            ]);

            $answers = [];
            array_push($answers, $answerOne, $answerTwo);

            // Change questions correct_answer once it's decided.
            $question->correct_answer = $answers[$request->input('correct_answer') - 1]->secret_id;
            $question->save();
        });

        return response()->json([
                'message' => 'Küsimus koos vastustega edukalt koostatud!'
        ], 201);
    }
}
