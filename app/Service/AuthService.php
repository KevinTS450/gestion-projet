<?php

namespace App\Service;

use App\Models\gp_activation_users;
use App\Models\gp_users_info_sups;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use Tymon\JWTAuth\Exceptions\JWTException;

class AuthService
{

    public function handleLogin(array $data)
    {

        $credentials = [
            'email' => $data['email'],
            'password' => $data['password'],
        ];

        $user = User::getUserByEmail($data['email']);

        if (!$user) {

            return  $error = [
                'status' => 'error',
                'access' => 'not_found',
                'message' => "cette adresse email n'existe pas"
            ];
        }

        if ($user->is_active == false) {
            return  $user = [
                'status' => 'error',
                'access' => "account_desactivate",
                'user' => $user
            ];
        }




        $token = Auth::attempt($credentials);

        if (!$token) {

            $error = [
                'status' => 'error',
                'access' => 'Unauthorized',
                'message' => 'mot de passe ou email incorrecte'
            ];

            return $error;
        }



        $dataToSend = [
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ],
            'status' => 'Success',

        ];

        return $dataToSend;
    }



    public function getUsers()
    {

        $user = JWTAuth::parseToken()->authenticate();

        $userWithInfo =$this->showUsers($user);

        return $userWithInfo;
    }

    public function showUsers($user) {

        $userWithInfo = User::with(['userInfo'])
        ->leftJoin('gp_users_roles', 'gp_users_roles.user_id', '=', 'users.id')
        ->leftJoin('gp_users_roles_settings', 'gp_users_roles_settings.id', '=', 'gp_users_roles.id_settings')
        ->where('users.id', $user->id)
        ->select(
            'gp_users_roles_settings.value as role_value',
            'gp_users_roles_settings.key as role_key',
            'users.*'
        )
        ->get(); 
    
    Log::info("user info => " . json_encode($userWithInfo));
    
    if ($userWithInfo->isNotEmpty()) {
        $userFormatted = [
            'users' => $user,
            'roles' => $userWithInfo->map(function ($role) {
                return [
                    'key' => $role->role_key,
                    'value' => $role->role_value,
                ];
            }),
            'attachement' => $userWithInfo->first()->userInfo, 
        ];
        return $userFormatted;

    }
    

    }



    public function logout()
    {
        Auth::logout();
    }
}
