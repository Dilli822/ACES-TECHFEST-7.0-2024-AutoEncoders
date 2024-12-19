<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Ecategory;
use App\Models\Expense;
use Illuminate\Http\Request;

class EcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ecategories = Ecategory::all();
        $expenses = Expense::all();
        return view('backend.ecategory.index',compact('ecategories','expenses'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ecategory = Ecategory::all();
        $expense = Expense::all();
        return view('backend.ecategory.create', compact('ecategory','expense'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ecategory = new Ecategory();
        $ecategory->title = $request->title;
        $ecategory->save();
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $ecategory = Ecategory::find($id);
        return view('backend.ecategory.edit',compact('ecategory'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ecategory = Ecategory::find($id);
        $ecategory->title = $request->title;
        $ecategory->update();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ecategory = Ecategory::find($id);
        $ecategory->delete();
        return redirect()->back();
    }
}
