from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *

from .models import ProfileUser, Post, AvatarPhoto, BackgroundPhoto
from django.contrib.auth.models import User
from .service import create_post, create_post_with_image, create_background_or_avatar, update_post_on_id, update_timer
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger




@api_view(['POST'])
def user_registration(request):
  serializer = UserSerializer(data = request.data)
  if serializer.is_valid():
    serializer.save()
    user = User.objects.last()
    profile = ProfileUser.objects.create(user = user)
    profile.tags = "#welcome #to #skizm"
    profile.save()
    return Response(serializer.data, status = status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_login(request):
  response = request.data
  try:
    user = User.objects.get(username=response['username'], password=response['password'])
  except ObjectDoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  serializer = UserSerializer2(user, context={'request': request}) 
  return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def profile_action(request, username):

  try:
    user = User.objects.get(username=username)
  except ObjectDoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  profile = ProfileUser.objects.get(user=user)    

  if request.method == 'GET':
    serializer = ProfileSerializer(profile, context={'request': request})
    return Response(serializer.data)

  if request.method == 'PUT':

    serializer = ProfileSerializer(profile, data=request.data, context={'request': request})
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
  

@api_view(['POST'])
def add_post(request):
  
  if request.data["photo"] != "":
    post = create_post_with_image(request)
  else:
    post = create_post(request)

  return Response({"seccess": True})

@api_view(['DELETE'])
def delete_post(request, id):
  post = Post.objects.get(pk=id)
  post.image.delete(save=True)
  post.delete()
  return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def update_post(request, id):
  update_post_on_id(request, id)
  return Response(status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_tomato(request, username):
  obj = update_timer(request, username)
  return Response(data=obj, status=status.HTTP_200_OK)  


@api_view(['POST'])
def add_avatar_or_back_photo(request):

  if request.data["flag"] == "avatar":
    avatar = create_background_or_avatar(AvatarPhoto, request, 'avatar')
    return Response({"avatarURL": avatar.imgURL}, status=status.HTTP_200_OK)
  elif request.data["flag"] == "background":
    background = create_background_or_avatar(BackgroundPhoto, request, 'background')
    return Response({" ": background.imgURL}, status=status.HTTP_200_OK)
  else: Response(status=status.HTTP_400_BAD_REQUEST)  


@api_view(['GET'])
def get_avatar_photo(request, username):

  try:
    user = User.objects.get(username=username)
    profile = ProfileUser.objects.get(user=user)
    avatar = AvatarPhoto.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    return Response({"avatarURL": ""})

  return Response({"avatarURL": avatar.imgURL})
   

@api_view(['GET'])
def get_background_photo(request, username):

  try:
    user = User.objects.get(username=username)
    profile = ProfileUser.objects.get(user=user)
    background = BackgroundPhoto.objects.get(profile_user=profile)
  except ObjectDoesNotExist:
    return Response({"backgroundURL": ""})

  return Response({"backgroundURL": background.imgURL})
  
  
@api_view(['GET'])
def get_posts_for_user(request, username):

  try:
    user = User.objects.get(username=username)
  except ObjectDoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  profile = ProfileUser.objects.get(user=user)
  
  data = []
  nextPage = 1
  previousPage = 1
  posts = Post.objects.filter(profile_user__id=profile.pk).order_by("-id")
  page = request.GET.get('page', 1)
  paginator = Paginator(posts, 5)

  try:
    data = paginator.page(page)
  except PageNotAnInteger:
    data = paginator.page(1)
  except EmptyPage:
    data = paginator.page(paginator.num_pages)

  serializer = PostSerializer(data, context={'request': request}, many=True)

  if data.has_next():
    nextPage = data.next_page_number()
  if data.has_previous():
    previousPage = data.previous_page_number()

  return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': f"/api/reactive/users/get_posts/{username}?page=" + str(nextPage), 'prevlink': f"/api/reactive/users/get_posts/{username}?page=" + str(previousPage)})  

@api_view(['GET', 'PUT'])
def tags_action(request, username):
  try:
    user = User.objects.get(username=username)
  except ObjectDoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  profile = ProfileUser.objects.get(user=user)

  if request.method == 'GET':
    return Response({"tags": profile.tags})

  if request.method == 'PUT':
    profile.tags = request.data["tags"]
    profile.save()
    return Response({"tags": profile.tags})


@api_view(['POST'])
def get_posts_for_feed(request):
  if request.data["tags"] == "":
    return Response({'data': {} , 'count': 0, 'numpages' : 1})

  tags = request.data["tags"].split(" ")

  list_ids = []

  for tag in tags:
    local_posts = Post.objects.filter(tags__contains=tag)
    ids = list(local_posts.values_list("id", flat=True))
    list_ids.extend(ids)
  posts = Post.objects.filter(id__in=list_ids).distinct().order_by("-id")


  data = []
  nextPage = 1
  previousPage = 1
  page = request.GET.get('page', 1)
  paginator = Paginator(posts, 5)

  try:
    data = paginator.page(page)
  except PageNotAnInteger:
    data = paginator.page(1)
  except EmptyPage:
    data = paginator.page(paginator.num_pages)

  serializer = PostSerializer(data, context={'request': request}, many=True)

  if data.has_next():
    nextPage = data.next_page_number()
  if data.has_previous():
    previousPage = data.previous_page_number()

  return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages})  


