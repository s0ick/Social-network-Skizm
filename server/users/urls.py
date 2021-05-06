from django.conf.urls import url
from users.views import *

urlpatterns = [
  url(r'^registration/$', user_registration),
  url(r'^user_login/$', user_login),

  url(r'^profile/(?P<username>[0-9a-zA-z]+)$', profile_action),

  url("add_post/", add_post),
  url(r'^delete_post/(?P<id>[0-9]+)$', delete_post),
  url(r'^update_post/(?P<id>[0-9]+)$', update_post),
  url(r'^get_posts/(?P<username>[0-9a-zA-z]+)$', get_posts_for_user),
  url(r'^get_posts_in_feed/$', get_posts_for_feed),

  url(r'^like_post/(?P<id>[0-9]+)$', like_post),
  url(r'^check_like/(?P<username>[0-9a-zA-z]+)$', check_like),
  

  url(r'^add_comment_post_on_id/(?P<id>[0-9]+)$', add_comment_post),
  url(r'^get_comment_post_on_id/(?P<id>[0-9]+)$', get_comments_for_post),

  url('add_photos/', add_avatar_or_back_photo),
  url(r'^get_avatar/(?P<username>[0-9a-zA-z]+)$', get_avatar_photo),
  url(r'^get_background/(?P<username>[0-9a-zA-z]+)$', get_background_photo),

  url(r'^tags/(?P<username>[0-9a-zA-z]+)$', tags_action),

  url(r'^update_tomato/(?P<username>[0-9a-zA-z]+)$', update_tomato),
  url(r'^update_rest_of_time/(?P<username>[0-9a-zA-z]+)$', update_tomato_rest_time),
]