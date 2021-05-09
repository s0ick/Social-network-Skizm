# Generated by Django 3.1.6 on 2021-05-07 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0026_auto_20210507_1945'),
    ]

    operations = [
        migrations.RenameField(
            model_name='timer',
            old_name='date_blocked',
            new_name='lock_up_date',
        ),
        migrations.RemoveField(
            model_name='timer',
            name='rest_of_time',
        ),
        migrations.AddField(
            model_name='timer',
            name='rest_online',
            field=models.IntegerField(default=1200000, verbose_name='Rest of time in online (mill.)'),
        ),
    ]
