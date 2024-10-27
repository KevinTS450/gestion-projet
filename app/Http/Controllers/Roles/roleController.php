<?php

namespace App\Http\Controllers\Roles;

use App\Http\Controllers\Controller;
use App\Service\RoleService;
use App\Service\utils\response;
use Illuminate\Http\Request;

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
}
