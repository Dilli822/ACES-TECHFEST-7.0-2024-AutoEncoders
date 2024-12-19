<?php
namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpensesFullController extends Controller
{
    /**
     * Show the form to create a new expense.
     */
    public function create()
    {
        return view('expenses.expensecreate');
    }

    /**
     * Store a new expense.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data (no nullable fields)
        $validated = $request->validate([
            'details' => 'string|max:255', // Details are required, but no nullable
            'expenses_transportation' => 'numeric|min:0', // Transportation is required
            'expenses_fooding' => 'numeric|min:0', // Fooding is required
            'expenses_refreshment' => 'numeric|min:0', // Refreshment is required
            'expenses_shopping' => 'numeric|min:0', // Shopping is required
        ]);

        // Set each field to 0.00 if not provided (handle missing fields manually)
        $validated['expenses_transportation'] = $request->has('expenses_transportation') ? $validated['expenses_transportation'] : 0.00;
        $validated['expenses_fooding'] = $request->has('expenses_fooding') ? $validated['expenses_fooding'] : 0.00;
        $validated['expenses_refreshment'] = $request->has('expenses_refreshment') ? $validated['expenses_refreshment'] : 0.00;
        $validated['expenses_shopping'] = $request->has('expenses_shopping') ? $validated['expenses_shopping'] : 0.00;

        // Create a new expense for the authenticated user
        Expense::create(array_merge($validated, ['user_id' => auth()->id()]));

        return redirect()->route('expenses.create')->with('success', 'Expense created successfully!');
    }

    /**
     * Display a list of all expenses.
     */
    public function index()
    {
        // Fetch expenses for the authenticated user
        $expenses = Expense::where('user_id', auth()->id())->get();

        return view('expenses.expensedetails', compact('expenses'));
    }

    /**
     * Show details of a specific expense.
     */
    public function show($id)
    {
        $expense = Expense::where('user_id', auth()->id())->findOrFail($id);

        return view('expenses.expensedetail', compact('expense'));
    }

    /**
     * Delete a specific expense.
     */
    public function destroy($id)
    {
        $expense = Expense::where('user_id', auth()->id())->findOrFail($id);

        $expense->delete();

        return redirect()->route('expenses.index')->with('success', 'Expense deleted successfully!');
    }
}
