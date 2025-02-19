<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Facades\File;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        
        $categories =[
            ['name' => 'külső kiegészítők'],
            ['name' => 'belső kiegészítők'],
            ['name' => 'alkatrészek'],
        ];

      foreach ($categories as $category) {
          Category::create($category);
      }

      $json = File::get(database_path('data/products.json'));
        $products = json_decode($json, true);

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}



