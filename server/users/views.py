from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *

from .models import ProfileUser, Post, AvatarPhoto, BackgroundPhoto, Like, Comment, Task
from django.contrib.auth.models import User
from .service import *
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger




@api_view(['POST'])
def user_registration(request):
  serializer = UserSerializer(data = request.data)
  if serializer.is_valid():
    serializer.save()
    user = User.objects.last()
    profile = ProfileUser.objects.create(user = user)
    profile.tags = "#welcomeToSkizm"
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
def create_task(request):
  username = request.data["username"]
  message = request.data["message"]

  profile = ProfileUser.objects.get(user__username=username)

  Task.objects.create(profile_user=profile, message=message)
  return Response(status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def delete_task(request, id):
  task = Task.objects.get(id=id)
  task.delete()
  return Response(status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
def todo_action(request, username):
  
  try:
    user = User.objects.get(username=username)
  except ObjectDoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)


  profile = ProfileUser.objects.get(user=user)

  if request.method == 'GET':
    try:
      tasks = Task.objects.filter(profile_user=profile)
    except ObjectDoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(tasks, context={'request': request}, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  if request.method == 'PUT':
    key = request.data["id"]
    complete = request.data["completed"]
    date = request.data["dateCompleted"]

    task = Task.objects.get(profile_user=profile, id=key)
    task.completed = complete
    task.dateCompleted = date
    task.save()
    return Response(status=status.HTTP_200_OK)
    

@api_view(['GET'])
def get_tomato(request, username):
  timer = get_timer(request, username)

  return Response({'valueOnline': timer.valueOnline, 'valueOffline': timer.valueOffline,'blocked': timer.blocked,'lockUpDate': timer.lock_up_date,'restOnline': timer.rest_online})


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
  timer = update_timer(request, username)
  return Response(data=timer, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_tomato_rest_time(request, username):
  time = update_timer_rest_time(request, username)
  return Response(data=time, status=status.HTTP_200_OK)


@api_view(['PUT'])
def like_post(request, id):
  like_post_on_id(request, id)
  return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def add_comment_post(request, id):
  comment_post_on_id(request, id)
  return Response(status=status.HTTP_201_CREATED)

@api_view(['GET'])
def check_like(request, username):
  post_id = request.GET.get('id')
  try:
    like = Like.objects.get(username=username, post__pk=post_id)
    flag = True
  except ObjectDoesNotExist:
    flag = False

  return Response({"flag": flag}, status=status.HTTP_200_OK)  


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


@api_view(['GET'])
def get_comments_for_post(request, id):

  try:
    post = Post.objects.get(pk=id)
  except ObjectDoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  data = []
  nextPage = 1
  previousPage = 1
  comments = Comment.objects.filter(post=post)
  page = request.GET.get('page', 1)
  paginator = Paginator(comments, 8)

  try:
    data = paginator.page(page)
  except PageNotAnInteger:
    data = paginator.page(1)
  except EmptyPage:
    data = paginator.page(paginator.num_pages)

  serializer = CommentSerializer(data, context={'request': request}, many=True)

  if data.has_next():
    nextPage = data.next_page_number()
  if data.has_previous():
    previousPage = data.previous_page_number()

  return Response({'data': serializer.data , 'count': paginator.count})  
