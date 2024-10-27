<?php
namespace App\Service\utils;

class response {

    public function sendResponse ($message , $data) {
  
         return response()->json([$message => $data]);

    }
}

?>