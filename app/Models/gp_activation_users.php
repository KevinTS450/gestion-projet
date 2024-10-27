<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class gp_activation_users extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'is_activate',
        'gen_code'
      ];

      public static function updateActivation (array $data) {
         
        $user_code = gp_activation_users::where('user_id' , '=' , $data['user_id'])
                                           ->select('gen_code')
                                           ->first();
          if($data['gen_code'] == $user_code->gen_code) {
          
          DB::table('gp_activation_users') 
           ->where('user_id', $data['user_id'])
           ->update(['is_active' => true]);

           DB::table('users')
           ->where('id' , $data['user_id'])
           ->update(['etat' => 0]);

            return true  ;
              

          }  else {
        
            return false ;
          }   
          
        
   
      }


      public static function resendCode (array $data) {
       
        $updateCode =  DB::table('gp_activation_users') 
        ->where('user_id', $data['user_id'])
        ->update(['gen_code' => $data['new_code']]);
        
        if($updateCode) {

          $user = User::where('id' ,$data['user_id'])
                        ->first();
           return $user;
        }
       
           
         
        

      }
}
