<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Dashboard;
use App\Models\User;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accounts = Account::all();
        $dashboards = Dashboard::all();
        $users = User::all();
        return view('backend.account.index',compact('accounts','dashboards','users'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $account = Account::all();
        $dashboards = Dashboard::all();
        $users = User::all();
        return view('backend.account.create',compact('account','dashboards','users'));
    }

    /*
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $account = new Account();
        $account->user_id = $request->user_id;
        $account->account_id = $request->account_id;
        $account->balance = $request->balance;
        $account->save();
        return redirect()->route('account.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $account = Account::find($id);
        $dashboard = Dashboard::find($id);
        $users = User::find($id);
        return view('backend.account.show',compact('account', 'dashboard','users'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $account = Account::find($id);
        $dashboards = Dashboard::all();
        $users = User::all();
        return view('backend.account.edit',compact('account', 'dashboards','users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $account = Account::find($id);
        $account->user_id = $request->user_id;
        $account->account_id = $request->account_id;
        $account->balance = $request->balance;
        $account->update();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $account = Account::find($id);
        $account->delete();
        return redirect()->back();
    }
}
