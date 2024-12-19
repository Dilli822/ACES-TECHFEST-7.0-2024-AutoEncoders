
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Create Transfer</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script>
        // JavaScript function to toggle the visibility of fields based on selected option
        function toggleFields() {
            // Get selected value
            var selectedOption = document.querySelector('input[name="transfer_type"]:checked').value;

            // Hide both fields by default
            document.getElementById('cash_to_cash_field').style.display = 'none';
            document.getElementById('bank_to_bank_field').style.display = 'none';

            // Show the selected field
            if (selectedOption === 'cash_to_cash') {
                document.getElementById('cash_to_cash_field').style.display = 'block';
            } else if (selectedOption === 'bank_to_bank') {
                document.getElementById('bank_to_bank_field').style.display = 'block';
            }
        }

        // JavaScript function to hide the message after 3 seconds
        window.onload = function() {
            var successMessage = document.querySelector('.success-message');
            var errorMessage = document.querySelector('.error-message');
            
            // Hide success message after 3 seconds
            if (successMessage) {
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 3000);
            }

            // Hide error message after 3 seconds
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
    <div class="card shadow-sm mx-auto" style="max-width: 600px;">
        <div class="card-body">
            <h2 class="card-title text-center mb-4">Create Transfer</h2>

            <!-- Success Message -->
            @if(session('success'))
                <div class="alert alert-success text-center success-message">
                    {{ session('success') }}
                </div>
            @endif

            <!-- Error Messages -->
            @if($errors->any())
                <div class="alert alert-danger error-message">
                    <ul class="mb-0">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('transfers.store') }}" method="POST">
                @csrf

                <!-- Radio Buttons to select transfer type -->
                <div class="mb-3">
                    <label class="form-label">Select Transfer Type:</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="cash_to_cash_radio" name="transfer_type" value="cash_to_cash" onclick="toggleFields()" checked>
                        <label class="form-check-label" for="cash_to_cash_radio">Cash to Cash</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="bank_to_bank_radio" name="transfer_type" value="bank_to_bank" onclick="toggleFields()">
                        <label class="form-check-label" for="bank_to_bank_radio">Bank to Bank</label>
                    </div>
                </div>

                <!-- Cash to Cash Field (initially visible) -->
                <div class="mb-3" id="cash_to_cash_field" style="display: block;">
                    <label for="cash_to_cash" class="form-label">Cash to Cash:</label>
                    <input type="number" name="cash_to_cash" id="cash_to_cash" step="0.01" value="{{ old('cash_to_cash', 0.00) }}" 
                        class="form-control" min="0">
                </div>

                <!-- Bank to Bank Field (hidden initially) -->
                <div class="mb-3" id="bank_to_bank_field" style="display: none;">
                    <label for="bank_to_bank" class="form-label">Bank to Bank:</label>
                    <input type="number" name="bank_to_bank" id="bank_to_bank" step="0.01" value="{{ old('bank_to_bank', 0.00) }}" 
                        class="form-control" min="0">
                </div>

                <!-- Submit Button -->
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Submit Transfer</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

    </x-app-layout>