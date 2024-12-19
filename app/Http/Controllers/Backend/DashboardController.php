<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Dashboard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function profile()
    {
        $dashboard = Dashboard::where('user_id', Auth::user()->id)->first();
        if($dashboard){
            return redirect()->route('user.dashboard.index');
        }else{
            return redirect()->route('user.dashboard.create');
        }
    }

    public function index()
    {
        $dashboard = Dashboard::where('user_id', Auth::user()->id)->first();
        return view('backend.dashboard.index',compact('dashboard'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('backend.dashboard.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dashboard = new Dashboard();
        $dashboard->user_id = $request->user_id;
        $dashboard->username = $request->username;
        $dashboard->address = $request->address;
        $dashboard->contact = $request->contact;
        $dashboard->email = $request->email;
        uploadImage($request, $dashboard,"image");
        $dashboard->save();
        return redirect()->route('user.dashboard.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dashboard = Dashboard::find($id);
        return view('backend.dashboard.show',compact('dashboard'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $dashboard = Dashboard::find($id);
        return view('backend.dashboard.edit',compact('dashboard'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dashboard = Dashboard::find($id);
        $dashboard->user_id = $request->user_id;
        $dashboard->username = $request->username;
        $dashboard->address = $request->address;
        $dashboard->email = $request->email;
        uploadImage($request, $dashboard,"image");
        $dashboard->update();
        return redirect()->route('user.dashboard.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dashboard = Dashboard::find($id);
        $dashboard->delete();
        return redirect()->back();
    }
}
