<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense List</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 py-10">

    <div class="max-w-6xl mx-auto bg-white p-6 rounded-md shadow-lg">
        <h1 class="text-2xl font-semibold text-center mb-4">Expense List</h1>

        <table class="min-w-full table-auto">
            <thead>
                <tr>
                    <th class="px-4 py-2">#</th> <!-- Added a column for the index -->
                    <th class="px-4 py-2">Details</th>
                    <th class="px-4 py-2">Transportation</th>
                    <th class="px-4 py-2">Fooding</th>
                    <th class="px-4 py-2">Refreshment</th>
                    <th class="px-4 py-2">Shopping</th>
                    <th class="px-4 py-2">Created Date</th>
                    <th class="px-4 py-2">Updated Date</th>
                </tr>
            </thead>
            <tbody>
                @foreach($expenses as $expense)
                    <tr>
                        <td class="px-4 py-2">{{ $loop->iteration }}</td> <!-- Using $loop->iteration for the index -->
                        <td class="px-4 py-2">{{ $expense->details }}</td>
                        <td class="px-4 py-2">{{ $expense->expenses_transportation }}</td>
                        <td class="px-4 py-2">{{ $expense->expenses_fooding }}</td>
                        <td class="px-4 py-2">{{ $expense->expenses_refreshment }}</td>
                        <td class="px-4 py-2">{{ $expense->expenses_shopping }}</td>
                        <td class="px-4 py-2">{{ $expense->created_at->format('d M Y') }}</td>
                        <td class="px-4 py-2">{{ $expense->updated_at->format('d M Y') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

</body>
</html>
