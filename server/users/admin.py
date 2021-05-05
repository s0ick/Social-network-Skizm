from django.contrib import admin
from .models import ProfileUser, Post, Comment, AvatarPhoto
from django.utils.safestring import mark_safe


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

  list_display = ('short', )

  def short(self, obj):
    return mark_safe(f"<span style='font-size:24px; color:#38921c'>{obj.short_text}</span>")


admin.site.register(ProfileUser)
admin.site.register(Comment)
admin.site.register(AvatarPhoto)