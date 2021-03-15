<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;
use stdClass;

class QuestionGameController extends Controller
{
    public function index(Request $request) {
        $question = Question::first();

        return $this->showQuestionAndAnswers($question);
    }

    public function store(Answer $answer) {
        // Kasutaja saadab POST päringu koos secret_token'iga ning tagastatakse uus küsimus, kui see eksisteerib.
        // Route model bindingu abil pärib Eloquent automaatselt kasutaja poolt antud secret_token'iga Answer'i.
        $lastQuestionId = Question::latest('id')->first()->id;
        $nextQuestion = Question::where('id', '>', $answer->question->id)->orderBy('id','asc')->first();

        if ($nextQuestion->id == $lastQuestionId) {
            return $this->showQuestionAndAnswers($nextQuestion, true);
        }

        return $this->showQuestionAndAnswers($nextQuestion);
    }

    public function showQuestionAndAnswers(Question $question, $lastQuestion = false) {
        $questionAnswers = [];

        foreach ($question->answers as $answer) {
            $questionAnswer = new stdClass();

            $questionAnswer->secretId = $answer->secret_id;
            $questionAnswer->text = $answer->text;
            $questionAnswers[] = $questionAnswer;
        }

        return response()->json([
            'lastQuestion' => $lastQuestion,
            'question' => [
                'text' => $question->text,
                'answers' => $questionAnswers,
                'correctAnswer' => $question->correct_answer,
            ],
        ], 200);
    }
}
