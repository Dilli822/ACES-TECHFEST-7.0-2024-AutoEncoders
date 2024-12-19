<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Models\CustomFinancialEntry;
use App\Models\IncomeDetail;
use App\Models\Expense;

class MasterFinancialController extends Controller
{
    public function index()
    {
        // Manually check if the user is authenticated
        if (!auth()->check()) {
            // If the user is not authenticated, redirect to login
            return redirect()->route('login')->with('error', 'Please log in to access your financial data.');
        }

        // Fetch data only for the authenticated user
        $userId = auth()->id(); // Get the authenticated user's ID

        $transfers = Transfer::where('user_id', $userId)->get();
        $customFinancialEntries = CustomFinancialEntry::where('user_id', $userId)->get();
        $incomeDetails = IncomeDetail::where('user_id', $userId)->get();
        $expenses = Expense::where('user_id', $userId)->get();

        // Pass the data to the view
        return view('financial.index', compact('transfers', 'customFinancialEntries', 'incomeDetails', 'expenses'));
    }
}
