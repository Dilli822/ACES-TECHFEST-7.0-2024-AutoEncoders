<!DOCTYPE html>
<html lang="en">


<!-- index.html  21 Nov 2019 03:44:50 GMT -->

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
    <title>Mero Khutruke | Dashboard </title>
    <!-- General CSS Files -->
    <link rel="stylesheet" href="/assets/css/app.min.css">
    <!-- Template CSS -->
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="/assets/css/components.css">
    <!-- Custom style CSS -->
    <link rel="stylesheet" href="/assets/css/custom.css">
    <link rel='shortcut icon' type='image/x-icon' href='/assets/img/favicon.ico' />
    <style>
        .santo {

            padding-left: 15px;
            margin-bottom: 15px;
            transition: all 0.3s ease;
            /* Smooth transition for hover effect */
        }

        .santo:hover {
            transform: scale(1.2);
            /* Scale the element slightly when hovered */
        }

    </style>
</head>

<body>
    <div class="loader"></div>
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <nav class="navbar navbar-expand-lg main-navbar sticky">
                <div class="form-inline mr-auto">
                    <ul class="navbar-nav mr-3">
                        {{-- <li><a href="#" class="nav-link nav-link-lg fullscreen-btn">
                                <i data-feather="maximize"></i>
                            </a></li> --}}
                        {{-- <li class="d-flex justify-content-center">
                                <h5 style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif">Home</h5>
                            </li> --}}

                    </ul>
                </div>
                <ul class="navbar-nav navbar-right">
                    
                   
                  
          
                    <li class="dropdown">
                        <a href="#" data-toggle="dropdown"
                            class="nav-link dropdown-toggle nav-link-lg nav-link-user"> 
              
                            @if(Auth::user()->userDetail && Auth::user()->userDetail->profile_image)
                                <img alt="image" 
                                     src="{{ Storage::url('profile_images/' . Auth::user()->userDetail->profile_image) }}" 
                                     class="user-img-radious-style">
                            @else
                            <img alt="image" 
                                     src="https://static.vecteezy.com/system/resources/previews/016/079/150/non_2x/user-profile-account-or-contacts-silhouette-icon-isolated-on-white-background-free-vector.jpg" 
                                     class="user-img-radious-style">
                            @endif
                        <div class="dropdown-menu dropdown-menu-right pullDown">
                        <div class="dropdown-title">Hello, {{ Auth::user()->name }}!</div>
                           
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf

                                <x-dropdown-link :href="route('logout')"
                                    onclick="event.preventDefault();
                                    this.closest('form').submit();">
                                    <i class="fas fa-sign-out-alt"></i>
                                    {{ __('Log Out') }}
                                </x-dropdown-link>
                            </form>
                        </div>
                    </li>
                </ul>
            </nav>

            <x-sidebar />
            <!-- Main Content -->
            <div class="main-content">
                {{ $slot }}
            </div>

            <footer class="main-footer">
                <div class="footer-left">
                    ©copyright2024 Mero Khutruke
                </div>

                <div class="footer-right">
                </div>
            </footer>
        </div>
    </div>
    <!-- General JS Scripts -->
    <script src="/assets/js/app.min.js"></script>
    <!-- JS Libraies -->
    <script src="/assets/bundles/apexcharts/apexcharts.min.js"></script>
    <!-- Page Specific JS File -->
    <script src="/assets/js/page/index.js"></script>
    <!-- Template JS File -->
    <script src="/assets/js/scripts.js"></script>
    <!-- Custom JS File -->
    <script src="/assets/js/custom.js"></script>
</body>


<!-- index.html  21 Nov 2019 03:47:04 GMT -->

</html>
