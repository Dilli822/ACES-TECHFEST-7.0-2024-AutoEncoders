<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Create Custom Financial Entry</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <script>
      // Function to handle the checkbox logic
function handleCheckboxChange(selected) {
    const expenseCheckbox = document.getElementById('is_expense');
    const incomeCheckbox = document.getElementById('is_income');
    const transactionCheckbox = document.getElementById('is_transaction');

    expenseCheckbox.checked = false;
    incomeCheckbox.checked = false;
    transactionCheckbox.checked = false;

    selected.checked = true;
    autofillFields();
}

function autofillFields() {
    const expenseField = document.getElementById('expense');
    const incomeField = document.getElementById('income');
    const transactionField = document.getElementById('transaction');

    expenseField.disabled = true;
    incomeField.disabled = true;
    transactionField.disabled = true;

    expenseField.value = "0.00";
    incomeField.value = "0.00";
    transactionField.value = "0.00";

    if (document.getElementById('is_expense').checked) {
        expenseField.disabled = false;
        expenseField.value = "1.00";
    } else if (document.getElementById('is_income').checked) {
        incomeField.disabled = false;
        incomeField.value = "1.00";
    } else if (document.getElementById('is_transaction').checked) {
        transactionField.disabled = false;
        transactionField.value = "1.00";
    }
}

function copyAmountToSelectedField() {
    const amountField = document.getElementById('amount');
    const expenseField = document.getElementById('expense');
    const incomeField = document.getElementById('income');
    const transactionField = document.getElementById('transaction');

    const amountValue = amountField.value;

    if (!expenseField.disabled) {
        expenseField.value = amountValue;
    } else if (!incomeField.disabled) {
        incomeField.value = amountValue;
    } else if (!transactionField.disabled) {
        transactionField.value = amountValue;
    }
}

window.onload = function() {
    autofillFields();
    const amountField = document.getElementById('amount');
    amountField.addEventListener('input', copyAmountToSelectedField);
};

window.onload = function() {
    var successMessage = document.querySelector('.success-message');
    var errorMessage = document.querySelector('.error-message');

    if (successMessage) {
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 3000);
    }

    if (errorMessage) {
        setTimeout(function() {
            errorMessage.style.display = 'none';
        }, 3000);
    }
};
    </script>
</head>
<body class="bg-light py-5">
<x-app-layout>
    <div class="container">
        <div class="card mx-auto shadow-lg" style="max-width: 500px;">
            <div class="card-body">
                <h2 class="card-title text-center">Create Custom Financial Entry</h2>

                <!-- Success Message -->
                @if(session('success'))
                    <div class="alert alert-success text-center" id="success-message">
                        {{ session('success') }}
                    </div>
                @endif

                <!-- Error Messages -->
                @if($errors->any())
                    <div class="alert alert-danger" id="error-messages">
                        <ul>
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('custom_financial.store') }}" method="POST">
                    @csrf

                    <!-- Details Field -->
                    <div class="mb-3">
                        <label for="details" class="form-label">Details:</label>
                        <input type="text" name="details" id="details" value="{{ old('details') }}" required 
                            class="form-control">
                    </div>

                    <!-- Amount Field -->
                    <div class="mb-3">
                        <label for="amount" class="form-label">Amount:</label>
                        <input type="number" name="amount" id="amount" step="0.01" value="{{ old('amount') }}" required
                            class="form-control" min="0">
                    </div>

                    <!-- Expense Checkbox -->
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" name="is_expense" id="is_expense" value="1" 
                            {{ old('is_expense') ? 'checked' : '' }} onclick="handleCheckboxChange(this)">
                        <label class="form-check-label" for="is_expense">Expense</label>
                    </div>

                    <!-- Income Checkbox -->
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" name="is_income" id="is_income" value="1" 
                            {{ old('is_income') ? 'checked' : '' }} onclick="handleCheckboxChange(this)">
                        <label class="form-check-label" for="is_income">Income</label>
                    </div>

                    <!-- Transaction Checkbox -->
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" name="is_transaction" id="is_transaction" value="1" 
                            {{ old('is_transaction') ? 'checked' : '' }} onclick="handleCheckboxChange(this)">
                        <label class="form-check-label" for="is_transaction">Transaction</label>
                    </div>

                    <!-- Hidden Fields -->
                    <div style="display: none;">
                        <div class="mb-3">
                            <label for="expense" class="form-label">Expense Amount:</label>
                            <input type="number" name="expense" id="expense" step="0.01" value="{{ old('expense') }}" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label for="income" class="form-label">Income Amount:</label>
                            <input type="number" name="income" id="income" step="0.01" value="{{ old('income') }}" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label for="transaction" class="form-label">Transaction Amount:</label>
                            <input type="number" name="transaction" id="transaction" step="0.01" value="{{ old('transaction') }}" class="form-control">
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
</x-app-layout>