@props(['url' => '/', 'icon' => null])

<a href="{{ $url }}"
    class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
    <i class="fa-brands fa-{{ $icon }} fa-lg"></i>
</a>
