<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActivationRequest;
use App\Http\Requests\activationUsersRequest;
use App\Http\Requests\UploadRequest;
use App\Http\Requests\userManagerRequest;
use App\Service\usersManageService;
use App\Service\utils\response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class userManageController extends Controller
{
  protected  $userManageService;
  protected  $responseService;


  public function __construct(usersManageService $userManageService, response $response)

  {
    $this->responseService = $response;
    $this->userManageService = $userManageService;
  }


  public function createUsers(userManagerRequest $request)
  {

    $data = [];
    $data['name'] = $request->name;
    $data['email'] = $request->email;
    $data['password'] = $request->password;
    $data['date_naissance'] = $request->date_naissance;
    $data['gender'] = $request->gender;

    if ($request->hasFile('file')) {

      $files = $request->file('file');


      $user = $this->userManageService->createUser($data, $files);
    } else {

      $user = $this->userManageService->createUser($data, []);
    }


    return $this->responseService->sendResponse('user', $user);
  }

  public function ActivateUsers(ActivationRequest $request)
  {

    $code = $request->code;
    $user_id = $request->user_id;
    $type = $request->type;

    if ($code || $user_id) {

      $data = [];

      $data['user_id'] = $user_id;
      $data['gen_code'] = $code;


      if ($type == 'with_code') {

        $is_activate = $this->userManageService->manageActivation($data, $type);


        if ($is_activate) {

          $res = [
            'status' => 'success',
            'message' => 'account activated'
          ];

          return $this->responseService->sendResponse('data', $res);
        } else {

          $res = [
            'status' => 'error',
            'message' => 'the code is not the same'
          ];

          return $this->responseService->sendResponse('data', $res);
        }
      } else  if ($type == 'resend_code') {

        $code = $this->userManageService->manageActivation($data, $type);
        $res = [
          'status' => 'success',
          'message' => 'code envoyé'
        ];
        return $this->responseService->sendResponse('data', $res);
      }
    }
  }

  public function handleUploadDocs(UploadRequest $request)
  {

    $user_id = $request->user_id;



    if ($request->hasFile('file')) {

      $file = $request->file('file');
      $this->userManageService->handleFileUploads($user_id, $file);

      $res = [
        'status' => 'success',
      ];

      return $this->responseService->sendResponse('data', $res);
    }
  }



  public function showDocs(Request $request)
  {
    $fileName = $request->query('fileName');

    $docs = $this->userManageService->showDocs($fileName);

    return response()->file($docs);
  }

  public function deleteDocs(Request $request) {

    $id=$request->query('id');

      $docs = $this->userManageService->deleteDocs($id);

      $res = ['status' =>'success' 
             , 'docs' =>$docs];

         return $this->responseService->sendResponse('data' ,$res);    
    
  }

  public function ListUser () {

    $data = $this->userManageService->ListUsers(1 ,10);
    return response()->json(['data' => $data]);
  }

  

}
