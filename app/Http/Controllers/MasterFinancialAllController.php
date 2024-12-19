<?php 
namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Models\CustomFinancialEntry;
use App\Models\IncomeDetail;
use App\Models\Expense;

class MasterFinancialAllController extends Controller
{
    public function getFinancialData()
    {
        // Fetch all data from the tables
        $transfers = Transfer::all();
        $customFinancialEntries = CustomFinancialEntry::all();
        $incomeDetails = IncomeDetail::all();
        $expenses = Expense::all();
    
        // Check if data is fetched correctly
        if (!$transfers || !$customFinancialEntries || !$incomeDetails || !$expenses) {
            abort(500, 'Failed to fetch financial data.');
        }
    
        // Get authenticated user
        $user = auth()->user();

        // Return data to the view, including the authenticated user
        return view('financial.indexAll', compact('transfers', 'customFinancialEntries', 'incomeDetails', 'expenses', 'user'));
    }
}
