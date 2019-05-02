from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response

from standapp_be.app.serializers import *
from .models import Progress

# class AppViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all()
#     serializer_class = AppSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

class ProgressViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

    def list(self, request, *args, **kwargs):
        progresses = Progress.objects.all()
        serializer = ProgressSerializer(progresses, many=True)
        return Response(serializer.data)

class StandupViewSet(viewsets.ModelViewSet):
    queryset = Standup.objects.all()
    serializer_class = StandupSerializer

    def list(self, request, *args, **kwargs):
        standup = Standup.objects.all()
        serializer = StandupSerializer(standup, many=True)
        return Response(serializer.data)
