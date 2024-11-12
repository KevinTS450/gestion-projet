<?php

namespace App\Service;

use App\Models\gp_users_role;
use App\Models\gp_users_roles_settings;
use Illuminate\Support\Facades\DB;

class RoleService
{


    public function getRoles()
    {

        $roles = gp_users_roles_settings::getRoles();
        return $roles;
    }

    public function assignRoles($id_users, $roles, $state)
    {
        if (!is_array($roles)) {
            return;
        }

        foreach ($roles as $role_setting) {

            switch ($state) {
                case 'add':

                    $checkIfExist = gp_users_role::where('user_id', '=', $id_users)
                        ->where('id_settings', '=', $role_setting)
                        ->exists();

                    if (!$checkIfExist) {
                        $userRole = new gp_users_role();


                        $userRole->user_id = $id_users;
                        $userRole->id_settings = $role_setting;
                        $userRole->save();
                    }

                    break;

                case 'delete':
                    gp_users_role::where('user_id', $id_users)
                        ->where('id_settings', $role_setting)
                        ->delete();
                    break;

                default:
                    throw new \Exception('Invalid state provided');
            }
        }
    }


    public function getRolesOf($id_users)
    {
        $roles = DB::table('gp_users_roles as gp')->where('user_id', $id_users)
            ->join('gp_users_roles_settings as rs', 'rs.id', '=', 'gp.id_settings')
            ->select('rs.value', 'gp.user_id')
            ->get();

        if ($roles->isEmpty()) {

            return "Aucun roles assigner";
        } else {

            return $roles;
        }
    }
}
