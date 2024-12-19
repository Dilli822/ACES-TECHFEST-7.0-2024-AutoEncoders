<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="//unpkg.com/alpinejs" defer></script>
    <title>{{ $title ?? 'Mero Khutruke | Personal Finance Manager' }}</title>
</head>

<body>
    <x-header></x-header>

    <main>
        <x-hero></x-hero>
        <x-about></x-about>
        <x-features></x-features>
        <x-blogs></x-blogs>
        <x-contact></x-contact>
    </main>

    <x-footer></x-footer>
</body>

</html>
