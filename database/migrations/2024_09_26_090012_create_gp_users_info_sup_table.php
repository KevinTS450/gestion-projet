<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGpUsersInfoSupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gp_users_info_sup', function (Blueprint $table) {
          
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('user_id');
            $table->bigInteger('docs_size');
            $table->string('docs_name');
            $table->string('docs_path');
            $table->string('proffession')->nullable();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
       
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gp_users_info_sup');
    }
}
