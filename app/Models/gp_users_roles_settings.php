<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gp_users_roles_settings extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'id_setting'];


 public static function getRoles () {
    return gp_users_roles_settings::
      where('key' ,'!=' ,'ROLE_ADMIN')
      ->select('value' ,'id')
    ->get();
 }

}
