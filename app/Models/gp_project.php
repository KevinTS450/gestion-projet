<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gp_project extends Model
{
   
    protected $table='gp_project';
    protected $fillable = [
        'nom',                  
        'description',          
        'date_de_debut',       
        'date_de_fin_prevue',    
        'statut',                
        'priorite',              
        'budget',                
        'cout_actuel',         
        'risques',               
        'objectifs',            
        'commentaires'       
    ];
    use HasFactory;


    public static function createProject(array $data) {
       
        $project = new gp_project();

        $project->nom = $data['nom'];
        $project->description = $data['description'];
        $project->date_de_debut = $data['date_de_debut'];
        $project->date_de_fin_prevue = $data['date_de_fin_prevue'];
        $project->statut = $data['statut'];
        $project->priorite = $data['priorite'];
        $project->budget = $data['budget'];
        $project->objectifs = $data['objectifs'] ?? null; 
        $project->commentaires = $data['commentaires'] ?? null;

        $project->save(); 
    
        return $project; 

    }
}
