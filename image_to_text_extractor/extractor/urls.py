from django.urls import path
from . import views
from django.conf import settings  # Import settings

urlpatterns = [
    path('', views.upload_image, name='upload_image'),
]
