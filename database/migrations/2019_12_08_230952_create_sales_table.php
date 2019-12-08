<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     *   "name":"Bob",
     *  "imageUrl":"www.sampleimage.com",
     *   "status" : "Open",
     *   "price" : "5.00",
     *   "transaction": { }
     *   }
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('imageUrl');
            $table->string('status');
            $table->string('price'); //string lets us use price like none or free or gratis etc...
            $table->string('buyerName');
            $table->string('salePrice');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
