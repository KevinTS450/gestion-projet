<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class gp_users_info_sups extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'docs_size',
    'docs_name',
    'docs_path',

  ];

  public static function getDocs($id)
  {
    $docs = gp_users_info_sups::where('id', $id)
      ->select('docs_name')
      ->first();
    return $docs;
  }
}
