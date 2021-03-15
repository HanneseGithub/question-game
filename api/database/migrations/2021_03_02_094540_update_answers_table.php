<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('answers', function (Blueprint $table) {
            $table->dropForeign(['new_question']);
            $table->dropColumn('new_question');
            $table->dropColumn('secret_token');
            $table->uuid('secret_id')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('answers', function (Blueprint $table) {
            $table->foreignId('new_question')->nullable()->constrained('questions');
            $table->string('secret_token', 5);
            $table->dropColumn('secret_id');
        });
    }
}
