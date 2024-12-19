<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Icategory;
use App\Models\Income;
use Illuminate\Http\Request;

class IcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $icategories = Icategory::all();
        $incomes = Income::all();
        return view('backend.icategory.index',compact('icategories', 'incomes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $icategories = Icategory::all();
        $income = Income::all();
        return view('backend.icategory.create',compact('icategories', 'income'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $icategory = new Icategory();
        $icategory->name = $request->name;
        $icategory->save();
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
        $icategory = Icategory::find($id);
        return view('backend.icategory.edit',compact('icategory'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $icategory =Icategory::find($id);
        $icategory->name = $request->name;
        $icategory->update();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $icategory = Icategory::find($id);
        $icategory->delete();
        return redirect()->route('icategory.index');
    }
}
