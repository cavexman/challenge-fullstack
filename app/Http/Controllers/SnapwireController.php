<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class SnapwireController extends Controller
{  
  public function ingest(){
    //todo

  }


  protected function read($filter){
    $sales = array();
    $query = "select * from sales where status = '$filter';";
    $results = DB::select($query);
    if($results){
      foreach( $results as $row){
        $sales [] = [
          "name" => $row->name,
          "imageUrl" => $row->imageUrl,
          "status" => $row->status,
          "price" => $row->price,
          "transaction" => [
            'buyerName' => $row->buyerName,
            'salePrice' => $row->salePrice
          ]
        ];
      }
    }
    return response(json_encode($sales), 200)
    ->header('Content-Type', 'application/json');
  }

    // {
    //     "name":"Bob",
    //     "imageUrl":"www.sampleimage.com",
    //     "status" : "Open",
    //     "price" : "5.00",
    //     "transaction": { }
    //     }

  public function transactions(Request $request, $status){
    //TODO use the status in the where clause of the db search
    switch( $status ){
      case "Open":
        return $this->open_sales($request);
      break;
      case "Accepted":
        return $this->accepted_sales($request);
      break;
      case "Sold":
        return $this->sold_sales($request);
      break;
    }
  }

  public function open_sales(Request $request, $id=null){
    return $this->read("Open");
  }
    

  public function accepted_sales(Request $request, $id=null){
   return $this->read("Accepted");
  }

  public function sold_sales(Request $request, $id=null){
    return $this->read("Sold");
  }
}
