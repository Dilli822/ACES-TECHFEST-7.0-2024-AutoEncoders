<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Dashboard;
use App\Models\Icategory;
use App\Models\Income;
use App\Models\User;
use Illuminate\Http\Request;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $incomes = Income::all();
        $icategories = Icategory::all();
        return view('backend.income.index',compact('incomes', 'icategories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $income = Income::all();
        $icategories = Icategory::all();
        return view('backend.income.create',compact('income','icategories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $income = new Income();
        $income->icategory_id = $request->icategory_id;
        $income->salary = $request->salary;
        $income->description = $request->description;
        $income->date = $request->date;
        $income->save();
        return redirect()->route('income.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $income = Income::find($id);
        return view('backend.income.show',compact('income'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $income = Income::find($id);
        return view('backend.income.edit',compact('income'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $income = Income::find($id);
        $income->icategory_id = $request->icategory_id;
        $income->salary = $request->salary;
        $income->description = $request->description;
        $income->date = $request->date;
        $income->update();
        return redirect()->route('income.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $income = Income::find($id);
        $income->delete();
        return redirect()->back();
    }
}
