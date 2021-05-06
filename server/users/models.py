from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


def upload_path_handler(instance, filename):
  return "post/profile_id_{id}/{file}".format(id=instance.profile_user.id, file=filename)

def upload_path_for_avatar(instance, filename):
  return "avatar/profile_id_{id}/{file}".format(id=instance.profile_user.id, file=filename)  


class ProfileUser(models.Model):

  user = models.ForeignKey(User, on_delete=models.CASCADE)
  aboutMe = models.CharField('About me', max_length=255, null=True, blank=True)
  userStatus = models.CharField('User status', max_length=255, null=True, blank=True)
  job = models.CharField('User job', max_length=255, null=True, blank=True)
  country = models.CharField('Country', max_length=100, null=True, blank=True)
  city = models.CharField('City', max_length=100, null=True, blank=True)
  feedName = models.CharField('Ribbon name', max_length=255, null=True, blank=True)
  facebook = models.URLField(max_length=255, null=True, blank=True)
  my_site = models.URLField(max_length=255, null=True, blank=True)
  vk = models.URLField(max_length=255, null=True, blank=True)
  twitter = models.URLField(max_length=255, null=True, blank=True)
  instagram = models.URLField(max_length=255, null=True, blank=True)
  you_tube = models.URLField(max_length=255, null=True, blank=True)
  git_hub = models.URLField(max_length=255, null=True, blank=True)
  tags = models.TextField("Tags", null=True, blank=True)
  valueOnline = models.IntegerField("Time in online", default=20)
  valueOffline = models.IntegerField("Time in offline", default=5)
  blocked = models.BooleanField("Blocked app", default=False)
  date_blocked = models.DateTimeField(auto_now_add=False, editable=True, null=True, blank=True)
  rest_of_time = models.DateTimeField(auto_now_add=False, editable=True, null=True, blank=True)

  def __str__(self):
    return self.user.username

class AvatarPhoto(models.Model):
  profile_user = models.ForeignKey(ProfileUser, verbose_name="Author", on_delete=models.CASCADE)
  image = models.ImageField('Avatar', upload_to=upload_path_for_avatar, null=True, blank=True)
  imgURL = models.URLField(max_length=255, null=True, blank=True)

  def get_absolute_url_image(self):
    try:
      return f"http://{settings.TEMP_HOST}{self.image.url}"
    except:
      return f""

  def delete(self, using=None, keep_parents=False):
    self.image.storage.delete(self.image.url)
    super().delete()    

  def __str__(self):
    return self.profile_user.user.username

class BackgroundPhoto(models.Model):
  profile_user = models.ForeignKey(ProfileUser, verbose_name="Author", on_delete=models.CASCADE)
  image = models.ImageField('Background', upload_to=upload_path_for_avatar, null=True, blank=True)
  imgURL = models.URLField(max_length=255, null=True, blank=True)

  def get_absolute_url_image(self):
    try:
      return f"http://{settings.TEMP_HOST}{self.image.url}"
    except:
      return f""

  def delete(self, using=None, keep_parents=False):
    self.image.storage.delete(self.image.url)
    super().delete()    

  def __str__(self):
    return self.profile_user.user.username         

class Post(models.Model):
  profile_user = models.ForeignKey(ProfileUser, verbose_name="Author", on_delete=models.CASCADE)
  text = models.TextField("Message")
  tags = models.TextField("Tags")
  author = models.CharField("Author", max_length=100)
  avatarURL = models.ForeignKey(AvatarPhoto, verbose_name="AvatarURL", on_delete=models.CASCADE, null=True, blank=True)
  backgroundURL = models.ForeignKey(BackgroundPhoto, verbose_name="BackgroundURL", on_delete=models.CASCADE, null=True, blank=True)
  image = models.ImageField("Image", upload_to=upload_path_handler, null=True, blank=True)
  imgURL = models.URLField(max_length=255, null=True, blank=True)
  date = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
  likes = models.IntegerField("Like count", default=0)
  comments = models.IntegerField("Comment count", default=0)

  def getBackground(self):
    try:
      return self.backgroundURL.imgURL
    except:
      return ""

  def getAvatar(self):
    try:
      return self.avatarURL.imgURL
    except:
      return ""     

  @property
  def short_text(self):
    return "{}...".format(self.text[:50])
  
  def get_absolute_url_image(self):
    try:
      return f"http://{settings.TEMP_HOST}{self.image.url}"
    except:
      return f""  
  
  def __str__(self):
    return self.short_text

class Like(models.Model):
  post = models.ForeignKey(Post, verbose_name="Post", on_delete=models.CASCADE)
  username = models.CharField("User", max_length=100)

  def __str__(self):
    return self.username + " post_id: " + str(self.post.pk)

class Comment(models.Model):
  post = models.ForeignKey(Post, verbose_name="Post", on_delete=models.CASCADE)
  username = models.CharField("User", max_length=100)
  message = models.TextField("Comment")
  avatarURL = models.ForeignKey(AvatarPhoto, verbose_name="AvatarURL", on_delete=models.CASCADE, null=True, blank=True)
  date = models.DateTimeField(auto_now_add=True, editable=False)

  def getAvatarCommentator(self):
    try:
      return self.avatarURL.imgURL
    except:
      return "" 

  def __str__(self):
    return self.username + " post_id: " + str(self.post.pk)