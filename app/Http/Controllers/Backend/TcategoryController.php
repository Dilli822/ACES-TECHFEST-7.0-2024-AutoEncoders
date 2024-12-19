<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Tcategory;
use Illuminate\Http\Request;

class TcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Tcategories = Tcategory::all();
        return view('backend.tcategory.index',compact('Tcategories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $Tcategory = Tcategory::all();
        return view('backend.tcategory.create', compact('Tcategory'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $Tcategory = new Tcategory();
        $Tcategory->title = $request->title;
        $Tcategory->save();
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
        $Tcategory = Tcategory::find($id);
        return view('backend.tcategory.edit',compact('Tcategory'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Tcategory = Tcategory::find($id);
        $Tcategory->title = $request->title;
        $Tcategory->update();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Tcategory = Tcategory::find($id);
        $Tcategory->delete();
        return redirect()->back();
    }
}
