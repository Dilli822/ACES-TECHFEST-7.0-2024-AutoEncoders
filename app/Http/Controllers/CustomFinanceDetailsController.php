<?php

namespace App\Http\Controllers;

use App\Models\CustomFinanceDetails;
use Illuminate\Http\Request;

class CustomFinanceDetailsController extends Controller
{
    /**
     * Show the form for creating a new custom financial entry.
     */
    public function create()
    {
        return view('financial.customfinance');
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

        // Store the financial entry
        CustomFinanceDetails::create([
            'user_id' => auth()->id(),  // Assuming user is authenticated
            'details' => $request->details,
            'amount' => $request->amount,
            'is_expense' => $request->is_expense ?? 0,
            'is_income' => $request->is_income ?? 0,
            'is_transaction' => $request->is_transaction ?? 0,
        ]);

        return redirect()->route('custom_financial.create')->with('success', 'Financial entry added successfully!');
    }
}
