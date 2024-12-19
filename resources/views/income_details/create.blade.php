<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Income Details</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script>
        // Function to toggle the input fields based on the selected option
        function toggleFields() {
            var selectedValue = document.getElementById('income_type').value;
            var salaryField = document.getElementById('income_salary');
            var investmentField = document.getElementById('income_investment');

            // Reset field validation and states
            salaryField.classList.remove('is-invalid');
            investmentField.classList.remove('is-invalid');

            // Enable/Disable fields based on selection
            if (selectedValue === 'salary') {
                salaryField.disabled = false;
                investmentField.disabled = true;
                investmentField.classList.add('is-invalid');
                investmentField.value = '0.00';
            } else if (selectedValue === 'investment') {
                investmentField.disabled = false;
                salaryField.disabled = true;
                salaryField.classList.add('is-invalid');
                salaryField.value = '0.00';
            } else {
                salaryField.disabled = true;
                investmentField.disabled = true;
                salaryField.classList.add('is-invalid');
                investmentField.classList.add('is-invalid');
                salaryField.value = '0.00';
                investmentField.value = '0.00';
            }
        }

        // Function to show success message for 3 seconds
        function showSuccessMessage() {
            var messageDiv = document.getElementById('messageDiv');
            messageDiv.classList.remove('d-none');
            setTimeout(function() {
                messageDiv.classList.add('d-none');
            }, 3000);
        }

        // Ensure only one input field is enabled on page load with default values set to 0.00
        window.onload = function () {
            var salaryField = document.getElementById('income_salary');
            var investmentField = document.getElementById('income_investment');

            // Set default values to 0.00
            salaryField.value = '0.00';
            investmentField.value = '0.00';

            // Disable the fields
            salaryField.disabled = true;
            investmentField.disabled = true;
        }
    </script>
</head>

<body class="bg-light py-5">
<x-app-layout>
    <div class="container">
        <div class="card mx-auto shadow" style="max-width: 500px;">
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Create Income Details</h2>

                <!-- Success Message -->
                @if(session('success'))
                    <div id="messageDiv" class="alert alert-success" role="alert">
                        {{ session('success') }}
                    </div>
                    <script>
                        showSuccessMessage();
                    </script>
                @endif

                <!-- Error Messages -->
                @if($errors->any())
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <!-- Form for Adding Income Details -->
                <form action="{{ route('income_details.store') }}" method="POST">
                    @csrf

                    <!-- Select Field for Choosing Income Type -->
                    <div class="mb-3">
                        <label for="income_type" class="form-label">Select Income Type:</label>
                        <select id="income_type" name="income_type" class="form-select" onchange="toggleFields()" required>
                            <option value="">-- Select --</option>
                            <option value="salary">Salary</option>
                            <option value="investment">Investment</option>
                        </select>
                    </div>

                    <!-- Salary Field -->
                    <div class="mb-3">
                        <label for="income_salary" class="form-label">Salary:</label>
                        <input type="number" name="income_salary" id="income_salary" step="0.01" value="{{ old('income_salary') }}" 
                            class="form-control" min="0" disabled>
                    </div>

                    <!-- Investment Field -->
                    <div class="mb-3">
                        <label for="income_investment" class="form-label">Investment:</label>
                        <input type="number" name="income_investment" id="income_investment" step="0.01" value="{{ old('income_investment') }}" 
                            class="form-control" min="0" disabled>
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