from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ProfileUser, Post, BackgroundPhoto, Comment

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'email', 'password')
  

class UserSerializer2(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('pk', 'username', 'email', 'password')


class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProfileUser
    fields = ('pk', 'aboutMe', 'userStatus', 'job', 'country', 'city', 'feedName', 'facebook', 'my_site', 'vk', 'twitter', 'instagram', 'you_tube', 'git_hub', 'valueOnline', 'valueOffline', 'blocked', 'date_blocked')


class PostSerializer(serializers.ModelSerializer):
  getBackground = serializers.ReadOnlyField()
  getAvatar = serializers.ReadOnlyField()

  class Meta:
    model = Post
    fields = ('pk', 'text', 'tags', 'imgURL', 'author', 'getAvatar', 'getBackground', 'date', 'likes', 'comments')


class CommentSerializer(serializers.ModelSerializer):
  getAvatarCommentator = serializers.ReadOnlyField()

  class Meta:
    model = Comment
    fields = ('id', 'username', 'message', 'getAvatarCommentator', 'date')