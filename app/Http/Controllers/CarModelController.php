<?php


namespace App\Http\Controllers;

use App\Models\CarModel;
use Illuminate\Http\Request;

class CarModelController extends Controller
{
    /**
     * Display a listing of the car models.
     */
    public function index()
    {
        return CarModel::all();  // Return all car models from the database
    }
}

