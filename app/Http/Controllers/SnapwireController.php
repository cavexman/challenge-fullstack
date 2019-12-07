<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class SnapwireController extends Controller
{
    //
  public function testDBConnection(Request $request, $name){
    $sql = "
    select * from login.Login_Information A
    left join login.Login_Samples B on A.COC_ID=B.COC_ID and A.Sample=B.Sample
    left join login.Login_Subsets C on A.COC_ID=C.COC_ID and A.Subset=C.Subset
    left join login.Login_Constituents D on C.COC_ID=D.COC_ID and C.Subset=D.Subset
    left join results.Release_Results E on D.COC_ID=E.COC_ID and E.Chem_ID_Login=D.Chem_ID
    where A.COC_ID like ? and C.Method=?
    ";

    $results = DB::select($sql, ['SP_1900%','Soil']);


    $params = [
        'name' => $name,
        'results' => $results
    ];

    return view('hello')->with($params);
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
    $sales = file_get_contents( "sales.json");

    if($sales){
      return response($sales, 200)
              ->header('Content-Type', 'application/json');
    }
    else{
      return response()->json(['msg'=>'cannot read sales']);
    }
  }
    

  public function accepted_sales(Request $request, $id=null){
    return response()->json([
      [
          'name' => 'Bob',
          'imageUrl' => 'https://images.snapwi.re/aa27/53765186d79bb29c37976335.w314.jpg',
          'status' => 'Accepted',
          'price' => '999.00',
          'transaction' => new \ArrayObject()
      ],
      [
          'name' => 'Sally',
          'imageUrl' => 'https://images.snapwi.re/e337/5381b8015411150d2bcb63c1.w800.jpg',
          'status' => 'Accepted',
          'price' => '15.00',
          'transaction' => new \ArrayObject()
      ],
      [
          'name' => 'Bob',
          'imageUrl' => 'https://images.snapwi.re/e337/5381b8015411150d2bcb63c1.w800.jpg',
          'status' => 'Accepted',
          'price' => '5.00',
          'transaction' => new \ArrayObject()
          ],
          [
              'name' => 'Sally',
              'imageUrl' => 'https://images.snapwi.re/aa27/53765186d79bb29c37976335.w314.jpg',
              'status' => 'Accepted',
              'price' => '15.00',
              'transaction' => new \ArrayObject()
          ],
          [
              'name' => 'Bob',
              'imageUrl' => 'https://images.snapwi.re/aa27/53765186d79bb29c37976335.w314.jpg',
              'status' => 'Accepted',
              'price' => '5.00',
              'transaction' => new \ArrayObject()
              ],
              [
                  'name' => 'Sally',
                  'imageUrl' => 'https://images.snapwi.re/e337/5381b8015411150d2bcb63c1.w800.jpg',
                  'status' => 'Accepted',
                  'price' => '15.00',
                  'transaction' => new \ArrayObject()
              ],
  ]);
  }

  public function sold_sales(Request $request, $id=null){
    return response()->json([
        [
            'name' => 'Bob',
            'imageUrl' => 'https://images.snapwi.re/aa27/53765186d79bb29c37976335.w314.jpg',
            'status' => 'Sold',
            'price' => '999.00',
            'transaction' => [ 
              "buyerName" => "Jim",
              "salePrice" => "3.50"
            ]
        ],
        [
            'name' => 'Sally',
            'imageUrl' => 'https://images.snapwi.re/e337/5381b8015411150d2bcb63c1.w800.jpg',
            'status' => 'Sold',
            'price' => '15.00',
            'transaction' => [ 
              "buyerName" => "Jim",
              "salePrice" => "3.50"
            ]
        ],
        [
          'name' => 'Bob',
          'imageUrl' => 'https://images.snapwi.re/e337/5381b8015411150d2bcb63c1.w800.jpg',
          'status' => 'Sold',
          'price' => '5.00',
          'transaction' => [ 
            "buyerName" => "Jim",
            "salePrice" => "3.50"
          ]
        ],
        [
            'name' => 'Sally',
            'imageUrl' => 'https://images.snapwi.re/aa27/53765186d79bb29c37976335.w314.jpg',
            'status' => 'Sold',
            'price' => '15.00',
            'transaction' => [ 
              "buyerName" => "Jim",
              "salePrice" => "3.50"
            ]
        ],
        [
          'name' => 'Bob',
          'imageUrl' => 'https://images.snapwi.re/aa27/53765186d79bb29c37976335.w314.jpg',
          'status' => 'Sold',
          'price' => '5.00',
          'transaction' => [ 
            "buyerName" => "Jim",
            "salePrice" => "3.50"
          ]
        ],
        [
          'name' => 'Sally',
          'imageUrl' => 'https://images.snapwi.re/e337/5381b8015411150d2bcb63c1.w800.jpg',
          'status' => 'Sold',
          'price' => '15.00',
          'transaction' => [ 
            "buyerName" => "Jim",
            "salePrice" => "3.50"
          ]
        ],
    ]);
  }
}
