from django.conf.urls import url
from users.views import *

urlpatterns = [
  url(r'^registration/$', user_registration),
  url(r'^user_login/$', user_login),

  url(r'^profile/(?P<username>[0-9a-zA-z]+)$', profile_action),

  url("add_post/", add_post),
  url(r'^get_posts/(?P<username>[0-9a-zA-z]+)$', get_posts_for_user),
  url(r'^get_posts_in_feed/$', get_posts_for_feed),

  url('add_photos/', add_avatar_or_back_photo),
  url(r'^get_avatar/(?P<username>[0-9a-zA-z]+)$', get_avatar_photo),
  url(r'^get_background/(?P<username>[0-9a-zA-z]+)$', get_background_photo),

  url(r'^tags/(?P<username>[0-9a-zA-z]+)$', tags_action)
]