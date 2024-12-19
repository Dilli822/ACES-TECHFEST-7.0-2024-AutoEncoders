<?php

use App\Http\Controllers\Backend\AccountController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\EcategoryController;
use App\Http\Controllers\Backend\ExpenseController;
use App\Http\Controllers\Backend\IcategoryController;
use App\Http\Controllers\Backend\IncomeController;
use App\Http\Controllers\Backend\TcategoryController;
use App\Http\Controllers\Backend\CustomTransferController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IncomeDetailsController;
use App\Http\Controllers\CustomFinanceDetailsController;
use App\Http\Controllers\UserDetailController;
use App\Http\Controllers\MasterFinancialController;
use App\Http\Controllers\MasterFinancialAllController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\CustomExpensesDetails;
use App\Models\Dashboard;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpensesFullController;

Route::get('/', function () {
    return view('layout');
});

// Redirect authenticated users to 'masterfinancial' page when visiting '/dashboard' or '/' (home)
Route::get('/dashboard', function () {
    return auth()->check() 
        ? redirect()->route('financial.index')  // Redirect to masterfinancial if authenticated
        : redirect()->route('login');            // Redirect to login if not authenticated
})->middleware(['auth', 'verified'])->name('dashboard');

// Redirect authenticated users to 'masterfinancial' page when visiting the home page
Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('financial.index')  // Redirect to masterfinancial if authenticated
        : redirect()->route('login');           // Redirect to login if not authenticated
});

// Routes for authenticated users
Route::middleware('auth')->group(function () {
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');

    // Routes for the user dashboard
    Route::resource('/user/dashboard', MasterFinancialController::class)->names('financial.index');

    // Routes for income details
    Route::get('/income_details/create', [IncomeDetailsController::class, 'create'])->name('income_details.create');
    Route::post('/income_details', [IncomeDetailsController::class, 'store'])->name('income_details.store');

    // Routes for custom financial details
    Route::get('/custom_financial/create', [CustomFinanceDetailsController::class, 'create'])->name('custom_financial.create');
    Route::post('/custom_financial/store', [CustomFinanceDetailsController::class, 'store'])->name('custom_financial.store');

    // Routes for transfers
    Route::get('/transfers', [TransferController::class, 'index'])->name('transfers.create');
    Route::get('/transfers/create', [TransferController::class, 'create'])->name('transfers.create');
    Route::post('/transfers', [TransferController::class, 'store'])->name('transfers.store');

    // Route for master financial view
    Route::get('/masterfinancial', [MasterFinancialController::class, 'index'])->name('financial.index');
    Route::get('/masterfinancial/all', [MasterFinancialAllController::class, 'getFinancialData'])->name('financial.indexAll');
    // Routes for expenses
    Route::get('/expenses/create', [ExpensesFullController::class, 'create'])->name('expenses.create'); // Show create form
    Route::post('/expenses', [ExpensesFullController::class, 'store'])->name('expenses.store'); // Store expense
    Route::get('/expenses', [ExpensesFullController::class, 'index'])->name('expenses.index'); // List all expenses
    
});

require __DIR__ . '/auth.php';
