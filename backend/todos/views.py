# from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.order_by('-created_at')
    serializer_class = TodoSerializer
