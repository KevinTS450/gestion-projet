<?php

namespace App\Service;

use App\Models\gp_project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class projectService
{

    public function createProject(array $data)
    {

        return gp_project::createProject($data);
    }

    public function updateProjet(array $data, $id)
    {


        $project = gp_project::where('id', $id)
            ->first();
        if ($project) {

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

            Log::info('project ==>' . $project);

            return $project;
        }
    }

    public function ListProject($currentPage, $pageSize,  $showDeleted = false, $search)
    {
        $projects = gp_project::when($showDeleted == 1, function ($query) {
            $query->whereIn('etat', [-1, 0]);
        }, function ($query) {
            $query->where('etat', 0);
        })
            ->when($search, function ($query) use ($search) {
                $query->where('nom', 'like', '%' . $search . '%');
            })
            ->paginate($pageSize, ['*'], 'page', $currentPage);
        return $projects;
    }

    public function deleteProject($params, $id)
    {

        $idArray = is_array($id) ? array_map('intval', $id) : (int) $id;

        $check_etat = DB::table('gp_project')
            ->whereIn('id', $idArray)
            ->select('etat')
            ->get();

        if ($check_etat->isNotEmpty()) {


            foreach ($check_etat as $etat) {
                if ($params == 1) {

                    if ($etat->etat == -1) {
                        $projects =   DB::table('gp_project')
                            ->whereIn('id', $idArray)
                            ->delete();
                        break;
                    } else {
                        $projects = DB::table('gp_project')
                            ->whereIn('id', $idArray)
                            ->update(['etat' => -1]);
                        break;
                    }
                } else {
                    $projects = DB::table('gp_project')
                        ->whereIn('id', $idArray)
                        ->update(['etat' => 0]);
                    break;
                }
                return $projects;
            }
        }
    }


    public function getProjet($id)
    {

        return Db::table('gp_project')
            ->where('id', $id)
            ->first();
    }
}
