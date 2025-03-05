<?php

// app/Http/Controllers/ModelController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Model; // assuming you have a Model model for this table
use Illuminate\Database\Eloquent\Model as EloquentModel;

class ModelController extends Controller
{
    public function index()
    {
        $models = EloquentModel::all(); // Fetch all models from the database
        return response()->json($models);
    }
}

