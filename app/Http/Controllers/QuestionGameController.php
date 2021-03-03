<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionGameController extends Controller
{
    public function index(Request $request) {
        $question = Question::first();

        return $this->showQuestionAndAnswers($question);
    }

    public function store(Answer $answer) {
        // Kasutaja saadab POST päringu koos secret_token'iga, mida ta õigeks peab.
        // Route model bindingu abil pärib Eloquent automaatselt kasutaja poolt antud secret_token'iga Answer'i.
        $answerSecretToken = $answer->secret_id;
        $correctQuestionAnswer = $answer->question->correct_answer;

        if ($answerSecretToken !== $correctQuestionAnswer) {
            $message = "Vale vastus - vaata korra hoolikalt veel küsimus üle!";

            return $this->showQuestionAndAnswers($answer->question, $message);
        }

        $nextQuestion = Question::where('id', '>', $answer->question->id)->orderBy('id','asc')->first();

        if (!$nextQuestion) {
            return response()->json([
                'message' => 'Te võitsite selle mängu!'
            ], 200);
        }

        $message = "Vastasite õigesti!";
        return $this->showQuestionAndAnswers($nextQuestion, $message);
    }

    public function showQuestionAndAnswers(Question $question, $message = '') {
        $questionAnswers = [];

        foreach ($question->answers as $answer) {
            $questionAnswers[$answer->secret_id] = $answer->text;
        }

        return response()->json([
            'message' => $message,
            'data' => [
                'question' => $question->text,
                'answers' => $questionAnswers
            ],
        ], 200);
    }
}
