# Generated by Django 3.1.6 on 2021-03-06 20:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20210306_1507'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='AvatarBackgroundPhoto',
            new_name='AvatarPhoto',
        ),
    ]
