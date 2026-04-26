<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();

            $table->decimal('price', 10, 2);
            $table->integer('discount')->default(null)->nullable();

            // TODO: REMOVE RATING AND REVIEWS COUNT 
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('reviews_count')->default(0);
            // TODO: REMOVE -> get from frontend uses joins
            $table->integer('sold')->default(0);
            $table->integer('stock')->default(0);

            $table->string('brand', 100)->nullable();
            $table->string('sku', 100)->unique()->nullable();

            // TODO: GET RID OF SPECFIC DIMENSIONS 
            $table->decimal('weight', 6, 2)->nullable();

            $table->decimal('width', 6, 2)->nullable();
            $table->decimal('height', 6, 2)->nullable();
            $table->decimal('depth', 6, 2)->nullable();

            // TODO: REMOVE FEE AND DAYS - VAGUE (needs external api) 
            $table->string('shipping_from', 150)->nullable();
            $table->decimal('shipping_fee', 10, 2)->nullable();
            $table->string('shipping_days', 20)->nullable();

            //? images will come from an external database
            $table->text('image');
            $table->text('hover_image')->nullable();

            // TODO: Rename pill to product pill
            $table->string('pill', 50)->nullable();

            //? contstained() func, assumes the foreign id belong to categories, onDelete(cascade) will be tampered if the primary key of the foreign key was deleted
            $table->foreignId('category_id')->constrained()->onDelete('cascade');

            //? creates both created_at and updated_at timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
