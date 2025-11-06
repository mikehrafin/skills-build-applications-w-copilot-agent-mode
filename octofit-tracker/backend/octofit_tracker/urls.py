"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from octofit_tracker import models

# Placeholder viewsets for router registration
from rest_framework import viewsets, serializers

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = '__all__'
class TeamViewSet(viewsets.ModelViewSet):
    queryset = models.Team.objects.all()
    serializer_class = TeamSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'
class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = UserSerializer

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Activity
        fields = '__all__'
class ActivityViewSet(viewsets.ModelViewSet):
    queryset = models.Activity.objects.all()
    serializer_class = ActivitySerializer

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Workout
        fields = '__all__'
class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = models.Workout.objects.all()
    serializer_class = WorkoutSerializer

class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Leaderboard
        fields = '__all__'
class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = models.Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

router = routers.DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'users', UserViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboard', LeaderboardViewSet)

from django.http import HttpResponse
import os

def root_view(request):
    # Get the base URL dynamically
    codespace_name = os.environ.get('CODESPACE_NAME', '')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        base_url = f"http://{request.get_host()}"
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Root</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 40px; }}
            h1 {{ color: #333; }}
            ul {{ list-style-type: none; padding: 0; }}
            li {{ margin: 10px 0; }}
            a {{ color: #0066cc; text-decoration: none; font-size: 18px; }}
            a:hover {{ text-decoration: underline; }}
            .info {{ color: #666; font-size: 14px; margin-top: 20px; }}
        </style>
    </head>
    <body>
        <h1>API Root</h1>
        <p>Welcome to the OctoFit Tracker API! Choose an endpoint below:</p>
        <ul>
            <li><a href="{base_url}/api/">API Browser</a> - Browse all API endpoints</li>
            <li><a href="{base_url}/api/activities/">Activities</a> - View and manage activities</li>
            <li><a href="{base_url}/api/users/">Users</a> - View and manage users</li>
            <li><a href="{base_url}/api/teams/">Teams</a> - View and manage teams</li>
            <li><a href="{base_url}/api/workouts/">Workouts</a> - View and manage workouts</li>
            <li><a href="{base_url}/api/leaderboard/">Leaderboard</a> - View team leaderboard</li>
            <li><a href="{base_url}/admin/">Admin</a> - Django admin panel</li>
        </ul>
        <div class="info">Base URL: {base_url}</div>
    </body>
    </html>
    """
    return HttpResponse(html)

urlpatterns = [
    path('', root_view),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
