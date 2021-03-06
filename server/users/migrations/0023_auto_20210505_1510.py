# Generated by Django 3.1.6 on 2021-05-05 12:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0022_auto_20210415_1748'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='comments',
            field=models.IntegerField(default=0, verbose_name='Comment count'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, verbose_name='User')),
                ('message', models.TextField(verbose_name='Comment')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('avatarURL', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.avatarphoto', verbose_name='AvatarURL')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.post', verbose_name='Post')),
            ],
        ),
    ]
