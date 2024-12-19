<?php

namespace App\Http\Controllers;

use App\Models\CustomFinancialEntry;
use Illuminate\Http\Request;

class FinancialController extends Controller
{
    /**
     * Show the form for creating a new custom financial entry.
     */
    public function create()
    {
        return view('income_details.create');
    }

    /**
     * Store a newly created custom financial entry in the database.
     */
    public function store(Request $request)
    {
        // Validate the incoming data
        $request->validate([
            'details' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'is_expense' => 'nullable|boolean',
            'is_income' => 'nullable|boolean',
            'is_transaction' => 'nullable|boolean',
        ]);

        // Ensure only one of the flags is true
        $trueFlags = collect([$request->is_expense, $request->is_income, $request->is_transaction])->filter(fn($value) => $value)->count();
        if ($trueFlags !== 1) {
            return redirect()->back()->withErrors(['error' => 'You must select only one type (Expense, Income, or Transaction).']);
        }

        // Create a new custom financial entry
        $entry = new CustomFinancialEntry();
        $entry->details = $request->details;
        $entry->amount = $request->amount;
        $entry->is_expense = $request->is_expense ?? 0;  // Default to 0 if not selected
        $entry->is_income = $request->is_income ?? 0;    // Default to 0 if not selected
        $entry->is_transaction = $request->is_transaction ?? 0;  // Default to 0 if not selected

        // Save the entry to the database
        $entry->save();

        // Redirect with success message
        return redirect()->route('income_details.create')->with('success', 'Financial entry added successfully!');
    }
}
