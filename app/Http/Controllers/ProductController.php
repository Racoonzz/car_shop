<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Display the list of products
    public function index()
    {
        if (request()->wantsJson()) {
            return response()->json(Product::with('category')->get());
        }

        return Inertia::render('Admin/ManageProducts', [
            'products' => Product::with('category')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:products',
            'categoryId' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'models' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Check if validation failed
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            // Handle image upload if exists
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('img', 'public');
            }

            // Create product in the database
            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'categoryId' => $request->categoryId,
                'models' => $request->models,
                'price' => $request->price,
                'quantity' => $request->quantity,
                'pictureUrl' => $imagePath,
            ]);

            // Return success response
            return response()->json($product, 201);
        } catch (\Exception $e) {
            // Return error response if something goes wrong
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::with('category')->find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // Include 'categoryId' and 'quantity' in the validation
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:0',
            'categoryId' => 'required|exists:categories,id',
        ]);

        // Handle image upload if exists
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('img', 'public');
            $validated['pictureUrl'] = $imagePath; // Update the pictureUrl field
        }

        // Update the product with categoryId and other validated data
        $product->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'categoryId' => $validated['categoryId'],
            'pictureUrl' => $validated['pictureUrl'] ?? $product->pictureUrl,
        ]);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete product image if it exists
        if ($product->pictureUrl) {
            \Storage::disk('public')->delete($product->pictureUrl);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Admin/EditProduct', [
            'product' => $product,
        ]);
    }
}
