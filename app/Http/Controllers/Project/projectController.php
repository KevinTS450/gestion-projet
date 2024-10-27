<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\projectRequest;
use App\Service\projectService;
use App\Service\RoleService;
use App\Service\utils\response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class projectController extends Controller
{
    protected $projectService;
    protected $rolesService;

    public function __construct(projectService $projectService, RoleService $rolesService)
    {
        $this->projectService = $projectService;
        $this->rolesService = $rolesService;
    }


    public function createProject(projectRequest $request)
    {

        $data = [];

        $id = $request->query('id');

        $data['nom'] = $request->nom;
        $data['description'] = $request->description;
        $data['date_de_debut'] = $request->date_de_debut;
        $data['date_de_fin_prevue'] = $request->date_de_fin_prevue;
        $data['statut'] = 'en cours';
        $data['priorite'] = $request->priorite;
        $data['budget'] = $request->budget;
        $data['risques'] = $request->risques;
        $data['objectifs'] = $request->objectifs;

        if (!$id) {
            $res = $this->projectService->createProject($data);
            return response()->json(['data' => $res]);
        } else {

            $res =   $this->projectService->updateProjet($data, $id);
            return response()->json(['data' => $res]);
        }
    }


    public function listProject(Request $request)
    {
        $pageSize = $request->input('pageSize', 5);
        $currentPage = $request->input('page', 1);
        $showDeleted = $request->input('showDeleted') ? 1 : 0;
        $search = $request->input('search');


        $project = $this->projectService->listProject($currentPage, $pageSize, $showDeleted, $search);
        return response()->json(['data' => $project]);
    }

    public function deleteProject(Request $request)
    {
        $params = $request->query('params');
        $id = $request->query('id');

        $project = $this->projectService->deleteProject($params, $id);
        return response()->json(['data' => $project]);
    }

    public function getProjet(Request $request)
    {
        $id = $request->query('id');
        $project = $this->projectService->getProjet($id);
        return response()->json(['data' => $project]);
    }

    public function assignRoles(Request $request)
    {
        $id_users = $request->id_users;
        $roles = $request->roles;

        $this->rolesService->assignRoles($id_users, $roles);
    }
}
