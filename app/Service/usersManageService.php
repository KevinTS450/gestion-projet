<?php

namespace App\Service;

use App\Mail\EmailSender;
use App\Models\User;
use App\Models\gp_activation_users;
use App\Models\gp_users_info_sup;
use App\Models\gp_users_info_sups;
use App\Models\gp_users_role;
use App\Models\gp_users_roles_settings;
use App\Service\utils\utils;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class usersManageService
{

    protected $utils;
    protected $authService;

    public function __construct(utils $utils, AuthService $authService)
    {
        $this->utils = $utils;
        $this->authService = $authService;
    }


    public function  createUser(array $data, $files)
    {

        if (isset($data['password'])) {

            $data['password'] = bcrypt($data['password']);
        }

        $user = User::create([

            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'date_naissance' => $data['date_naissance'],
            'gender' => $data['gender']

        ]);

        if ($user) {

            $countUser = User::count();

            if ($countUser == 1) {

                $role_value = gp_users_roles_settings::where('key', 'ROLE_ADMIN')
                    ->select('value', 'id')
                    ->first();

                $roles = new gp_users_role();

                $roles->user_id = $user->id;
                $roles->id_settings = $role_value->id;
                $roles->save();
            }

            $code = $this->utils->generateCode();
            $data_activation = [];
            $data_activation['user_id'] = $user->id;
            $data_activation['gen_code'] = $code;


            $this->manageActivation($data_activation, 'add');



            if ($files) {

                $this->handleFileUploads($user->id, $files);
            }




            $subject = 'Bienvenu sur notre site de gestion de projet';


            $mail = new EmailSender($subject, $user->name, $code, $user->email, 'account');
            Mail::to($user->email)->send($mail);
        }



        return $user;
    }





    public function handleFileUploads($userId, $files)
    {

        foreach ($files as $file) {

            $destinationPath = public_path('pdf/users/');

            $fileName = $file->getClientOriginalName();

            $file->move($destinationPath, $fileName);

            $supInfo = new gp_users_info_sups();
            $supInfo->user_id = $userId;
            $supInfo->docs_path = 'pdf/users/' . $fileName;
            $supInfo->docs_name = $fileName;
            $supInfo->docs_size = filesize($supInfo->docs_path);

            $supInfo->save();
        }
    }
    public function manageActivation(array $data, $type)
    {


        if ($type == 'add') {

            $activation =  new gp_activation_users();
            $activation->user_id = $data['user_id'];
            $activation->gen_code = $data['gen_code'];


            $activation->save();

            return $activation;
        }


        if ($type == 'with_code') {

            $is_activate = gp_activation_users::updateActivation($data);

            if ($is_activate) {

                return true;
            } else {

                return false;
            }
        }



        if ($type == 'resend_code') {

            $newCode = $this->utils->generateCode();
            $data['new_code'] = $newCode;


            $resendCode = gp_activation_users::resendCode($data);
            $subject = "Nouveau code d'activation du compte";
            $mail = new EmailSender($subject, $resendCode->name, $newCode, $resendCode->email, 'new_code');

            Mail::to($resendCode->email)->send($mail);
            return $resendCode;
        }
    }


    public function showDocs($fileName)
    {
        $path = public_path('pdf/users/' . $fileName);

        if (file_exists($path)) {
            return $path;
        } else {
            abort(404);
        }
    }


    public function deleteDocs($id)
    {

        $docs = gp_users_info_sups::getDocs($id);

        $path = public_path('pdf/users/' . $docs->docs_name);

        if (file_exists($path)) {

            unlink($path);
            DB::table('gp_users_info_sups')->where('id', $id)->delete();
            return $docs;
        } else {
            abort(404);
        }
    }

    public function ListUsers($currentPage, $pageSize, $showDesactivate = false, $search = '')
    {

        $users = DB::table('users as u')
            ->leftJoin('gp_users_roles as roles', 'roles.user_id', '=', 'u.id')
            ->leftJoin('gp_users_roles_settings as rs', 'rs.id', '=', 'roles.id_settings')
            ->when($showDesactivate == 1, function ($query) {
                $query->whereIn('u.etat', [-1, 0]);
            }, function ($query) {
                $query->where('u.etat', 0);
            })
            ->when($showDesactivate == 0, function ($query) {
                $query->where('u.etat', '=', 0);
            })
            ->when($search != '', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->select(
                'u.email',
                'u.name',
                'u.gender',
                'u.date_naissance',
                'u.id',
                'rs.key',
                'rs.value',
                'rs.id as role_id'
            )
            ->paginate($pageSize, ['*'], 'page', $currentPage);

        $formattedUsers = [];

        foreach ($users as $userInfo) {
            if (!isset($formattedUsers[$userInfo->email])) {
                $formattedUsers[$userInfo->email] = [
                    'email' => $userInfo->email,
                    'id' => $userInfo->id,
                    'name' => $userInfo->name,
                    'gender' => $userInfo->gender,
                    'date_naissance' => $userInfo->date_naissance,
                    'roles' => []
                ];
            }

            if ($userInfo->key && $userInfo->value) {
                $formattedUsers[$userInfo->email]['roles'][] = [
                    'key' => $userInfo->key,
                    'value' => $userInfo->value,
                    'id' => $userInfo->role_id
                ];
            }
        }

        $finalUsers = array_values($formattedUsers);
        return [
            'data' => $finalUsers,
            'current_page' => $users->currentPage(),
            'last_page' => $users->lastPage(),
            'per_page' => $users->perPage(),
            'total' => $users->total(),
        ];
    }

    public function showProfile($id_users)
    {

        $user = User::where('id', $id_users)
                      ->first();
        $userWithInfo = $this->authService->showUsers($user);
        return $userWithInfo;
    }
}
