# Generated by Django 3.1.6 on 2021-03-22 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_profileuser_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='backgroundURL',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.backgroundphoto', verbose_name='BackgroundURL'),
        ),
    ]
