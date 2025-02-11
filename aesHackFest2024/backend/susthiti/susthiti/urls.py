"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# project/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sushtiti/account/', include('account.urls')),  
    path('sushtiti/community/', include('community.urls')),  
    path('sushtiti/diabetes/', include('diabetes.urls')),  
    path('sushtiti/report/', include('reportTranslator.urls')),  
    path('sushtiti/cancer/', include('cancer.urls')),  
    path('sushtiti/dengue/', include('dengue.urls')),  
    path('sushtiti/report/', include('reportTranslator.urls')),  
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)