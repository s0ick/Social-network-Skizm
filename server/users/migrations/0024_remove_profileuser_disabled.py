# Generated by Django 3.1.6 on 2021-05-06 11:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0023_auto_20210505_1510'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profileuser',
            name='disabled',
        ),
    ]
