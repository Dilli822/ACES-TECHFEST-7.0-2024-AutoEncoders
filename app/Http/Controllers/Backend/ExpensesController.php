<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Category;
use Illuminate\Http\Request;

class ExpensesController extends Controller
{
    // Show the form to create a new expense
    public function create()
    {
        $categories = Category::all();
        return view('financial.expensecreate', compact('categories'));
    }

    // Store a new expense
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ecategory_id' => 'required|exists:categories,id', 
            'details' => 'nullable|string|max:255',
            'expenses_transportation' => 'nullable|numeric|min:0',
            'expenses_fooding' => 'nullable|numeric|min:0',
            'expenses_refreshment' => 'nullable|numeric|min:0',
            'expenses_shopping' => 'nullable|numeric|min:0',
        ]);

        Expense::create($validated);

        return redirect()->route('financial.expensecreate')->with('success', 'Expense created successfully!');
    }

    // List all expenses
    public function index()
    {
        $expenses = Expense::with('category')->get(); // Eager load category
        return view('financial.expensecreate', compact('expenses'));
    }
}
