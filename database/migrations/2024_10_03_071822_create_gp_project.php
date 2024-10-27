<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGpProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gp_project', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nom'); 
            $table->text('description'); 
            $table->date('date_de_debut'); 
            $table->date('date_de_fin_prevue');
            $table->enum('statut', ['en cours', 'terminé', 'en retard', 'annulé']); 
            $table->enum('priorite', ['haute', 'moyenne', 'basse']); 
            $table->decimal('budget', 10, 2); 
            $table->decimal('cout_actuel', 10, 2)->default(0); 
            $table->text('risques')->nullable(); 
            $table->text('objectifs')->nullable(); 
            $table->text('commentaires')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gp_project');
    }
}
