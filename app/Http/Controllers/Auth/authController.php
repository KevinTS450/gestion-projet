<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\loginRequest;
use App\Service\AuthService;
use App\Service\utils\response;
use Illuminate\Http\Request;

class authController extends Controller
{

  protected $authService;
  protected $responseService;

  public function __construct(AuthService $authService, response $response)
  {

    $this->authService = $authService;
    $this->responseService = $response;
  }


  public function handleLogin(loginRequest $request)
  {

    $email = $request->email;
    $password = $request->password;

    $data = [];

    $data['email'] = $email;
    $data['password'] = $password;
    $auth = $this->authService->handleLogin($data);



    return  $this->responseService->sendResponse('data', $auth);
  }

  public function handleLoGout()
  {

    $this->authService->logout();

    $res = [
      'status' => 'success',
      'message' => 'utilisateur deconnéter'

    ];
    return $this->responseService->sendResponse('data', $res);
  }


  protected function getUsers()
  {

    $users = $this->authService->getUsers();

    return $this->responseService->sendResponse('data', $users);
  }
}
