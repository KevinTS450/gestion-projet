<?php

namespace App\Http\Controllers\Roles;

use App\Http\Controllers\Controller;
use App\Service\RoleService;
use App\Service\utils\response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class roleController extends Controller

{

    protected $roleService;
    protected $responseService;

    public function __construct(RoleService $roleService, response $responseService)
    {
        $this->roleService = $roleService;
        $this->responseService = $responseService;
    }


    public function getRole()
    {
        $role = $this->roleService->getRoles();

        $res = [
            'status' => 'success',
            'roles' => $role
        ];
       
        return $this->responseService->sendResponse('data', $res);
    }

    public function assignRoles(Request $request)
    {
        Log::info('all request =>' .json_encode($request->all()));
        $id_users = $request->id_users;
        $roles = $request->id_roles_setting;
        $state = $request->state;

        $this->roleService->assignRoles($id_users, $roles ,$state);
    }


    public function getRolesOfUsers (Request $request) {
    
        $id_users = $request->query('id_users');

        $roles = $this->roleService->getRolesOf($id_users);

        return response()->json(['data' => $roles]);


    }
}
