<?php

// app/Http/Controllers/IncomeDetailsController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IncomeDetail;

class IncomeDetailsController extends Controller
{
    public function create()
    {
        return view('income_details.create');
    }

    public function store(Request $request)
    {
        // Validate the incoming data
        $request->validate([
            'income_type' => 'required|string',
            'income_salary' => 'nullable|numeric|min:0',
            'income_investment' => 'nullable|numeric|min:0',
        ]);
    
        // Create a new IncomeDetail instance and store the data
        $incomeDetail = new IncomeDetail();
        $incomeDetail->user_id = auth()->id(); // Assign the logged-in user's ID
        $incomeDetail->income_salary = $request->income_type === 'salary' ? $request->income_salary : 0.00;
        $incomeDetail->income_investment = $request->income_type === 'investment' ? $request->income_investment : 0.00;
    
        // Save to the database
        $incomeDetail->save();
    
        // Redirect back with success message
        return redirect()->route('income_details.create')->with('success', 'Income details saved successfully!');
    }
    
}
