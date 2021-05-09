from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import *
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

def get_timer(request, username):
  profile = ProfileUser.objects.get(user__username=username)

  try:
    timer = Timer.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    timer = Timer.objects.create(profile_user=profile)

  return timer

def update_timer(request, username):
  
  profile = ProfileUser.objects.get(user__username=username)

  try:
    timer = Timer.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    timer = Timer.objects.create(profile_user=profile)

  timer.valueOnline = request.data['valueOnline']
  timer.valueOffline = request.data['valueOffline']
  timer.blocked = request.data['blocked']
  timer.lock_up_date = request.data['lockUpDate']
  timer.save()

  return {
    "valueOnline": timer.valueOnline,
    "valueOffline": timer.valueOffline,
    "blocked": timer.blocked,
    "lockUpDate": timer.lock_up_date
  }

def update_timer_rest_time(request, username):

  profile = ProfileUser.objects.get(user__username=username)

  try:
    timer = Timer.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    timer = Timer.objects.create(profile_user=profile)

  timer.rest_online = request.data['restOnline']
  timer.save()
  return timer.rest_online


def like_post_on_id(request, id):
  post = Post.objects.get(pk=id)
  username = request.data['username']

  try:
    Like.objects.get(username=username, post__pk=post.pk).delete()
  except ObjectDoesNotExist:
    Like.objects.create(post=post, username=username)

  totalCount = Like.objects.filter(post=post).count()
  
  post.likes = totalCount
  post.save()


def comment_post_on_id(request, id):
  post = Post.objects.get(pk=id)
  username = request.data['username']
  message = request.data['comment']

  profile = ProfileUser.objects.get(user__username=username)
  
  try:
    avatarURL = AvatarPhoto.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    avatarURL = AvatarPhoto.objects.create(profile_user=profile, image="", imgURL="")

  Comment.objects.create(post=post, username=username, message=message, avatarURL=avatarURL)
  totalCount = Comment.objects.filter(post=post).count()
  post.comments = totalCount
  post.save()



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

  return model


def _create_instance_post(request):
  textBody = request.data['textBody']
  tags = request.data['tags']
  username = request.data['username']
  profile = ProfileUser.objects.get(user__username=username)

  try:
    backgroundURL = BackgroundPhoto.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    backgroundURL = BackgroundPhoto.objects.create(profile_user=profile, image="", imgURL="")

  try:
    avatarURL = AvatarPhoto.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    avatarURL = AvatarPhoto.objects.create(profile_user=profile, image="", imgURL="")

  post = Post.objects.create(profile_user=profile, text=textBody, tags=tags, author=username, avatarURL=avatarURL, backgroundURL=backgroundURL)
  return post


def _get_file_name(model, media):
  rand_string = _generate_random_string(6)
  return f"{media}_id_{model.id}_profile_id_{model.profile_user.id}_{rand_string}"


def _generate_random_string(length):
  letters = string.ascii_lowercase
  rand_string = ''.join(random.choice(letters) for i in range(length))
  return rand_string

