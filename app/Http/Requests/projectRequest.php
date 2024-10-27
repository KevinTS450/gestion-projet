<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class projectRequest extends FormRequest
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
            'id' =>'integer' ,
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date_de_debut' => 'required|date',
            'date_de_fin_prevue' => 'required|date|after_or_equal:date_de_debut',
            'statut' => 'string|in:en cours,terminé,en retard,annulé',
            'priorite' => 'required|string|in:haute,moyenne,basse',
            'budget' => 'required|numeric',
            'cout_actuel' => 'nullable|numeric',
            'risques' => 'nullable|string',
            'objectifs' => 'nullable|string',
            'commentaires' => 'nullable|string',
        ];
    }
}
