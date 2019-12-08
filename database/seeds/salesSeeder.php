<?php

use Illuminate\Database\Seeder;

class salesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $complete = false;
        $salesJsonString = file_get_contents("./public/sales.json"); //or? /public/sales.json
        if($salesJsonString){
            $salesJsonObj = json_decode($salesJsonString, true);
            if($salesJsonObj){
                foreach($salesJsonObj as $sale){
                    DB::table('sales')->insert([
                        'name' => $sale["name"],
                        'imageUrl' => $sale["imageUrl"],
                        'status' => $sale["status"],
                        'price' => $sale["price"],
                        'buyerName' => isset($sale["transaction"]["buyerName"]) ? $sale["transaction"]["buyerName"] : "",
                        'salePrice' => isset($sale["transaction"]["salePrice"]) ? $sale["transaction"]["salePrice"] : ""
                    ]);
                }
                $complete = true;
            }
        }
    }
}
