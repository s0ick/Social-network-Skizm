# Generated by Django 3.1.6 on 2021-04-15 14:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0021_auto_20210415_1712'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='like',
            name='flag',
        ),
        migrations.AlterField(
            model_name='like',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.post', verbose_name='Post'),
        ),
    ]
