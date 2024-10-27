<?php

namespace App\Service;

use App\Models\gp_users_role;
use App\Models\gp_users_roles_settings;
use Illuminate\Support\Facades\DB;

class RoleService {


    public function getRoles() {

        $roles = gp_users_roles_settings::getRoles();
        return $roles;
    }

    public function assignRoles ($id_users , $roles) {
         
        foreach($id_users as $id) {
         
            $roles =  new gp_users_role();
            $roles->user_id = $id;
            $roles->id_settings = $roles;
            $roles->save();
    
        }
        

    }

}

?>