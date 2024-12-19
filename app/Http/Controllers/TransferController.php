<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    /**
     * Display the form to create a new transfer.
     */
    public function create()
    {
        return view('transfers.create');
    }

    /**
     * Store a new transfer record in the database.
     */
    public function store(Request $request)
    {
        // Validate input data
        $validated = $request->validate([
            'cash_to_cash' => 'nullable|numeric|min:0', // Optional, must be numeric and non-negative
            'bank_to_bank' => 'nullable|numeric|min:0', // Optional, must be numeric and non-negative
        ]);

        // Create a transfer for the authenticated user
        Transfer::create(array_merge($validated, ['user_id' => auth()->id()]));

        // Redirect with a success message
        return redirect()->route('transfers.create')->with('success', 'Transfer record created successfully!');
    }

    /**
     * Display a list of all transfers for the authenticated user.
     */
    public function index()
    {
        // Fetch transfers for the authenticated user
        $transfers = Transfer::where('user_id', auth()->id())->get();

        return view('transfers.index', compact('transfers'));
    }

    /**
     * Show details of a specific transfer.
     */
    public function show($id)
    {
        // Fetch transfer belonging to the authenticated user
        $transfer = Transfer::where('user_id', auth()->id())->findOrFail($id);

        return view('transfers.show', compact('transfer'));
    }

    /**
     * Delete a specific transfer record.
     */
    public function destroy($id)
    {
        // Fetch and delete the transfer belonging to the authenticated user
        $transfer = Transfer::where('user_id', auth()->id())->findOrFail($id);

        $transfer->delete();

        return redirect()->route('transfers.create')->with('success', 'Transfer record deleted successfully!');
    }
}
