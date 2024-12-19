<div>
    <div class="main-sidebar sidebar-style-2" style="background-color: rgb(214, 212, 210)">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <a href="#">
                    <span style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif">Mero Khutruke</span>
                    <span style="font-size: 10px!important; text-transform: lowercase!important;">{{ Auth::user()->email }}</span>
                </a>
              
            </div>
            <ul class="sidebar-menu">
                <li class="menu-header"></li>
                
                <!-- Dashboard Section -->
                <li class="dropdown santo">
                    <a href="{{ route('financial.index') }}" class="nav-link"><i data-feather="home"></i><span style="color: midnightblue">Dashboard</span></a>
                </li>
                
                <!-- Profile Section -->
                <li class="dropdown santo">
                    <a href="#" class="nav-link"><i data-feather="user-check"></i><span style="color: midnightblue">Profile</span></a>
                </li>

                <!-- Income Section -->
                <li class="dropdown santo">
                    <a href="#" class="menu-toggle nav-link has-dropdown">
                        <i data-feather="dollar-sign"></i><span>Income</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="nav-link" href="{{ route('income_details.create') }}">Investment</a></li>
                        <li><a class="nav-link" href="{{ route('income_details.create') }}">Salary</a></li>
                    </ul>
                </li>

                <!-- Expense Section -->
                <li class="dropdown santo">
                    <a href="#" class="menu-toggle nav-link has-dropdown">
                        <i data-feather="minus-circle"></i><span>Expense</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="nav-link" href="{{ route('expenses.create') }}">Transportation</a></li>
                        <li><a class="nav-link" href="{{ route('expenses.create') }}">Shopping</a></li>
                        <li><a class="nav-link" href="{{ route('expenses.create') }}">Fooding</a></li>
                        <li><a class="nav-link" href="{{ route('expenses.create') }}">Refreshment</a></li>
                    </ul>
                </li>

                <!-- Transfer/Transaction Section -->
                <li class="dropdown santo">
                    <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="arrow-right-circle"></i><span>Transfer</span></a>
                    <ul class="dropdown-menu">
                        <li><a class="nav-link" href="{{ route('transfers.create') }} ">Bank-to-Bank Transfer</a></li>
                        <li><a class="nav-link" href="{{ route('transfers.create') }}">Cash-to-Cash Transfers</a></li>
                    </ul>
                </li>

                <!-- Custom Finance Section -->
                <li class="dropdown santo">
                    <a href="{{ route('custom_financial.create') }}" class="nav-link">
                      <i data-feather="credit-card"></i><span style="color: midnightblue">
                        Custom Finance
                      </span></a>
                </li>

                <!-- Statistics Section -->
                <li class="dropdown santo">
                    <a href="{{ route('financial.indexAll') }}" class="nav-link"><i data-feather="globe"></i><span style="color: midnightblue">Transactions</span></a>
                </li>
            </ul>
        </aside>
    </div>
</div>
