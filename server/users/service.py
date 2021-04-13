from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import ProfileUser, Post, AvatarPhoto, BackgroundPhoto
from django.core.files.base import ContentFile
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

import base64
import random
import string

def create_post(request):
  return _create_instance_post(request)


def create_post_with_image(request):
  post = _create_instance_post(request)
  _add_image_to_model(post, request, 'post')
  return post


def update_post_on_id(request, id):
  post = Post.objects.get(pk=id)

  if request.data['photo']:
    post.image.delete(save=True)
    _add_image_to_model(post, request, 'post')
    
  if request.data['textBody']:
    post.text = request.data['textBody']

  if request.data['tags']:
    post.tags = request.data['tags']
  post.save()

def update_timer(request, username):
  
  try:
    user = User.objects.get(username=username)
  except ObjectDoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  profile = ProfileUser.objects.get(user=user) 
  profile.valueOnline = request.data['valueOnline']
  profile.valueOffline = request.data['valueOffline']
  profile.disabled = request.data['disabled']
  profile.blocked = request.data['blocked']
  profile.date_blocked = request.data['dateBlocked']
  profile.save()

  return {
    "valueOnline": profile.valueOnline,
    "valueOffline": profile.valueOffline,
    "disabled": profile.disabled,
    "blocked": profile.blocked,
    "dateBlocked": profile.date_blocked
  }        

def create_background_or_avatar(model, request, media):
  username = request.data['username']
  profile = ProfileUser.objects.get(user__username=username)

  if model.objects.all().count() == 0:
    photo = model.objects.create(profile_user=profile)
  elif model.objects.get(profile_user=profile):
    photo = model.objects.get(profile_user=profile)
  else: 
    photo = model.objects.create(profile_user=profile)

  return _add_image_to_model(photo, request, media)




def _add_image_to_model(model, request, media):
  if media == 'avatar' or media == 'background':
    model.image.delete()

  username = request.data['username']
  profile = ProfileUser.objects.get(user__username=username)  
    
  filename = _get_file_name(model, media)
  image_base64 = request.data['photo']
  format, image_base64 = image_base64.split(";base64,")
  ext = format.split('/')[-1]
  data = ContentFile(base64.b64decode(image_base64))  
  file_name = f"{filename}.{ext}"
  model.image.save(file_name, data, save=True)
  model.imgURL = model.get_absolute_url_image()
  model.save()

  if media == 'avatar':
    posts = Post.objects.filter(profile_user=profile)
    for post in posts:
      post.avatarURL = model.get_absolute_url_image()
      post.save()

  return model


def _create_instance_post(request):
  textBody = request.data['textBody']
  tags = request.data['tags']
  username = request.data['username']
  avatarURL = request.data['avatarURL']

  profile = ProfileUser.objects.get(user__username=username)

  try:
    backgroundURL = BackgroundPhoto.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    backgroundURL = BackgroundPhoto.objects.create(profile_user=profile, image="", imgURL="")

  post = Post.objects.create(profile_user=profile, text=textBody, tags=tags, author=username, avatarURL=avatarURL, backgroundURL=backgroundURL)
  return post


def _get_file_name(model, media):
  rand_string = _generate_random_string(6)
  return f"{media}_id_{model.id}_profile_id_{model.profile_user.id}_{rand_string}"


def _generate_random_string(length):
  letters = string.ascii_lowercase
  rand_string = ''.join(random.choice(letters) for i in range(length))
  return rand_string

