<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyIpAddressFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('created_at_ip', 100)->change();
            $table->string('updated_at_ip', 100)->change();

            // $table->string('created_at_ip', 45)->nullable()->change();
            // $table->renameColumn('name', 'category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('created_at_ip', 45)->change();
            $table->string('updated_at_ip', 45)->change();
        });
    }
}
